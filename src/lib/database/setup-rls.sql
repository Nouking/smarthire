-- SmartHire AI - Row Level Security (RLS) Setup
-- This file contains SQL commands to set up Row Level Security policies

-- Enable RLS on all user data tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Candidates table policies
CREATE POLICY "Users can view their own candidates" ON candidates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own candidates" ON candidates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own candidates" ON candidates
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own candidates" ON candidates
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all candidates" ON candidates
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all candidates" ON candidates
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Job descriptions table policies
CREATE POLICY "Users can view their own job descriptions" ON job_descriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job descriptions" ON job_descriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job descriptions" ON job_descriptions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job descriptions" ON job_descriptions
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all job descriptions" ON job_descriptions
    FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage all job descriptions" ON job_descriptions
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Matches table policies
CREATE POLICY "Users can view their own matches" ON matches
    FOR SELECT USING (
        auth.uid() = (SELECT user_id FROM candidates WHERE id = candidate_id)
        OR auth.uid() = (SELECT user_id FROM job_descriptions WHERE id = job_description_id)
    );

CREATE POLICY "System can insert matches" ON matches
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own matches" ON matches
    FOR UPDATE USING (
        auth.uid() = (SELECT user_id FROM candidates WHERE id = candidate_id)
        OR auth.uid() = (SELECT user_id FROM job_descriptions WHERE id = job_description_id)
    );

CREATE POLICY "Users can delete their own matches" ON matches
    FOR DELETE USING (
        auth.uid() = (SELECT user_id FROM candidates WHERE id = candidate_id)
        OR auth.uid() = (SELECT user_id FROM job_descriptions WHERE id = job_description_id)
    );

CREATE POLICY "Admins can manage all matches" ON matches
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Storage bucket policies (applied via Supabase Dashboard or Storage API)
-- These are for reference and documentation

/*
-- CV uploads bucket policies:

1. "Users can upload their own CVs"
   Operation: INSERT
   Policy: (storage.foldername(name))[1] = auth.uid()::text

2. "Users can view their own CVs"
   Operation: SELECT  
   Policy: (storage.foldername(name))[1] = auth.uid()::text

3. "Users can update their own CVs"
   Operation: UPDATE
   Policy: (storage.foldername(name))[1] = auth.uid()::text

4. "Users can delete their own CVs"
   Operation: DELETE
   Policy: (storage.foldername(name))[1] = auth.uid()::text

5. "Admins can access all CVs"
   Operation: ALL
   Policy: auth.jwt() ->> 'role' = 'admin'
*/

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT COALESCE(auth.jwt() ->> 'role', '') = 'admin';
$$;

-- Create function to get current user ID
CREATE OR REPLACE FUNCTION auth.current_user_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT auth.uid();
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT EXECUTE ON FUNCTION auth.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION auth.current_user_id() TO authenticated;