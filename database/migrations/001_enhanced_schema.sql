-- Enhanced SmartHire Database Schema
-- Optimized for AI processing, cost management, and MVP scalability

-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Enhanced schema optimized for performance and cost
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    company VARCHAR(255),
    
    -- MVP-focused fields
    subscription_tier VARCHAR(20) DEFAULT 'free',
    monthly_usage_count INTEGER DEFAULT 0,
    usage_reset_date DATE DEFAULT CURRENT_DATE,
    
    -- Preferences
    preferred_analysis_depth VARCHAR(20) DEFAULT 'standard',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_descriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    
    -- AI optimization fields
    description_embedding vector(1536), -- For semantic search
    key_skills TEXT[] DEFAULT '{}',
    experience_level VARCHAR(20), -- 'junior', 'mid', 'senior'
    
    -- Usage tracking
    times_used INTEGER DEFAULT 0,
    last_used_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic info (extracted from CV)
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    
    -- CV content and metadata
    original_filename VARCHAR(255) NOT NULL,
    cv_text TEXT NOT NULL,
    cv_summary TEXT, -- AI-generated summary
    extracted_skills TEXT[] DEFAULT '{}',
    
    -- AI processing fields  
    cv_embedding vector(1536), -- For semantic similarity
    experience_level VARCHAR(20),
    
    -- File management
    file_url TEXT NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    file_size_bytes INTEGER,
    
    -- Lifecycle management
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '90 days'),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cv_jd_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    job_description_id UUID REFERENCES job_descriptions(id) ON DELETE CASCADE,
    
    -- Core matching results
    match_percentage DECIMAL(5,2) NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL,
    processing_time_ms INTEGER NOT NULL,
    
    -- Structured AI analysis
    matching_skills TEXT[],
    missing_skills TEXT[],
    strengths TEXT[],
    concerns TEXT[],
    recommendation VARCHAR(20) NOT NULL, -- 'strong_match', 'potential_fit', 'not_recommended'
    ai_reasoning TEXT NOT NULL,
    
    -- User feedback (for continuous improvement)
    user_rating INTEGER, -- 1-5 scale
    user_feedback TEXT,
    user_decision VARCHAR(20), -- 'interview', 'maybe', 'pass'
    
    -- Cost tracking
    ai_provider VARCHAR(50),
    processing_cost_usd DECIMAL(8,4) DEFAULT 0.0000,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes for MVP scale
CREATE INDEX idx_candidates_user_embedding ON candidates USING ivfflat (cv_embedding vector_cosine_ops);
CREATE INDEX idx_jd_user_embedding ON job_descriptions USING ivfflat (description_embedding vector_cosine_ops);
CREATE INDEX idx_matches_user_created ON cv_jd_matches(user_id, created_at DESC);
CREATE INDEX idx_candidates_expires ON candidates(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_candidates_user_id ON candidates(user_id);
CREATE INDEX idx_job_descriptions_user_id ON job_descriptions(user_id);

-- Row Level Security for multi-tenant data isolation
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_jd_matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can only see own data" ON candidates
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see own job descriptions" ON job_descriptions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only see own matches" ON cv_jd_matches  
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access their own profile" ON users
    FOR ALL USING (auth.uid() = id);