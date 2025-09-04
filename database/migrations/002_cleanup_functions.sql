-- Automated Data Retention & Cost Management Functions
-- Daily cleanup job to manage storage costs

-- Create cleanup function
CREATE OR REPLACE FUNCTION cleanup_expired_data() RETURNS void AS $$
BEGIN
    -- Delete expired candidate files from storage
    DELETE FROM candidates WHERE expires_at < CURRENT_TIMESTAMP;
    
    -- Clean up orphaned match records
    DELETE FROM cv_jd_matches 
    WHERE candidate_id NOT IN (SELECT id FROM candidates);
    
    -- Reset monthly usage counters for users whose reset date has passed
    UPDATE users 
    SET monthly_usage_count = 0, usage_reset_date = CURRENT_DATE 
    WHERE usage_reset_date < CURRENT_DATE - INTERVAL '30 days';
    
    -- Log cleanup activity
    RAISE NOTICE 'Expired data cleanup completed at %', CURRENT_TIMESTAMP;
    
END;
$$ LANGUAGE plpgsql;

-- Create function to update user usage tracking
CREATE OR REPLACE FUNCTION increment_user_usage(user_uuid UUID) RETURNS void AS $$
BEGIN
    UPDATE users 
    SET monthly_usage_count = monthly_usage_count + 1
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Create function to check user usage limits
CREATE OR REPLACE FUNCTION check_user_usage_limit(user_uuid UUID, tier_limit INTEGER) RETURNS BOOLEAN AS $$
DECLARE
    current_usage INTEGER;
BEGIN
    SELECT monthly_usage_count INTO current_usage
    FROM users 
    WHERE id = user_uuid;
    
    RETURN current_usage < tier_limit;
END;
$$ LANGUAGE plpgsql;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_descriptions_updated_at 
    BEFORE UPDATE ON job_descriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: For production deployment with Supabase, schedule cleanup using cron:
-- SELECT cron.schedule('cleanup-expired-data', '0 2 * * *', 'SELECT cleanup_expired_data();');
-- This requires the pg_cron extension which may need to be enabled in Supabase dashboard