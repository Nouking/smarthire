-- Vector similarity search functions for SmartHire
-- These functions enable semantic search capabilities using pgvector

-- Function to find similar candidates based on CV embeddings
CREATE OR REPLACE FUNCTION match_candidates(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.8,
  match_count int DEFAULT 10,
  filter_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  full_name text,
  email text,
  phone text,
  original_filename text,
  cv_text text,
  cv_summary text,
  extracted_skills text[],
  experience_level text,
  file_url text,
  file_type text,
  file_size_bytes int,
  processed_at timestamp,
  expires_at timestamp,
  created_at timestamp,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.user_id,
    c.full_name,
    c.email,
    c.phone,
    c.original_filename,
    c.cv_text,
    c.cv_summary,
    c.extracted_skills,
    c.experience_level,
    c.file_url,
    c.file_type,
    c.file_size_bytes,
    c.processed_at,
    c.expires_at,
    c.created_at,
    1 - (c.cv_embedding <=> query_embedding) as similarity
  FROM candidates c
  WHERE 
    (filter_user_id IS NULL OR c.user_id = filter_user_id)
    AND c.cv_embedding IS NOT NULL
    AND 1 - (c.cv_embedding <=> query_embedding) > match_threshold
    AND c.expires_at > CURRENT_TIMESTAMP
  ORDER BY c.cv_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to find similar job descriptions based on description embeddings
CREATE OR REPLACE FUNCTION match_job_descriptions(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.8,
  match_count int DEFAULT 10,
  filter_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  title text,
  company text,
  description text,
  requirements text,
  key_skills text[],
  experience_level text,
  times_used int,
  last_used_at timestamp,
  created_at timestamp,
  updated_at timestamp,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    jd.id,
    jd.user_id,
    jd.title,
    jd.company,
    jd.description,
    jd.requirements,
    jd.key_skills,
    jd.experience_level,
    jd.times_used,
    jd.last_used_at,
    jd.created_at,
    jd.updated_at,
    1 - (jd.description_embedding <=> query_embedding) as similarity
  FROM job_descriptions jd
  WHERE 
    (filter_user_id IS NULL OR jd.user_id = filter_user_id)
    AND jd.description_embedding IS NOT NULL
    AND 1 - (jd.description_embedding <=> query_embedding) > match_threshold
  ORDER BY jd.description_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Function to find the best candidate-job matches using vector similarity
CREATE OR REPLACE FUNCTION find_best_cv_jd_matches(
  job_description_id uuid,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 20
)
RETURNS TABLE (
  candidate_id uuid,
  candidate_name text,
  candidate_email text,
  similarity_score float,
  skill_overlap text[],
  experience_match boolean
)
LANGUAGE plpgsql
AS $$
DECLARE
  jd_embedding vector(1536);
  jd_skills text[];
  jd_experience text;
  job_user_id uuid;
BEGIN
  -- Get job description details
  SELECT description_embedding, key_skills, experience_level, user_id
  INTO jd_embedding, jd_skills, jd_experience, job_user_id
  FROM job_descriptions 
  WHERE id = job_description_id;

  -- Return matching candidates
  RETURN QUERY
  SELECT
    c.id as candidate_id,
    c.full_name as candidate_name,
    c.email as candidate_email,
    (1 - (c.cv_embedding <=> jd_embedding)) as similarity_score,
    ARRAY(
      SELECT unnest(c.extracted_skills)
      INTERSECT
      SELECT unnest(jd_skills)
    ) as skill_overlap,
    (c.experience_level = jd_experience OR 
     (jd_experience = 'senior' AND c.experience_level IN ('senior', 'mid')) OR
     (jd_experience = 'mid' AND c.experience_level IN ('senior', 'mid'))) as experience_match
  FROM candidates c
  WHERE 
    c.user_id = job_user_id
    AND c.cv_embedding IS NOT NULL
    AND c.expires_at > CURRENT_TIMESTAMP
    AND (1 - (c.cv_embedding <=> jd_embedding)) > match_threshold
  ORDER BY (c.cv_embedding <=> jd_embedding)
  LIMIT match_count;
END;
$$;

-- Function to update embedding and trigger recomputation
CREATE OR REPLACE FUNCTION update_cv_embedding(
  candidate_id uuid,
  new_embedding vector(1536)
) RETURNS void AS $$
BEGIN
  UPDATE candidates 
  SET cv_embedding = new_embedding
  WHERE id = candidate_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update job description embedding
CREATE OR REPLACE FUNCTION update_jd_embedding(
  job_id uuid,
  new_embedding vector(1536)
) RETURNS void AS $$
BEGIN
  UPDATE job_descriptions 
  SET description_embedding = new_embedding,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = job_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get embedding statistics for monitoring
CREATE OR REPLACE FUNCTION get_embedding_stats()
RETURNS TABLE (
  table_name text,
  total_records bigint,
  records_with_embedding bigint,
  embedding_coverage_percent numeric
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'candidates'::text as table_name,
    COUNT(*)::bigint as total_records,
    COUNT(cv_embedding)::bigint as records_with_embedding,
    ROUND((COUNT(cv_embedding)::numeric / COUNT(*) * 100), 2) as embedding_coverage_percent
  FROM candidates
  
  UNION ALL
  
  SELECT 
    'job_descriptions'::text as table_name,
    COUNT(*)::bigint as total_records,
    COUNT(description_embedding)::bigint as records_with_embedding,
    ROUND((COUNT(description_embedding)::numeric / COUNT(*) * 100), 2) as embedding_coverage_percent
  FROM job_descriptions;
END;
$$;

-- Create indexes for vector similarity search (if not already created)
-- Note: These should be created after inserting some data for better performance

-- Example index creation commands (run manually after data population):
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_candidates_cv_embedding 
-- ON candidates USING ivfflat (cv_embedding vector_cosine_ops) WITH (lists = 100);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_descriptions_embedding 
-- ON job_descriptions USING ivfflat (description_embedding vector_cosine_ops) WITH (lists = 100);