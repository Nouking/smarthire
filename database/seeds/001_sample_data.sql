-- Sample data for SmartHire database
-- This script creates sample users, job descriptions, and candidates for testing

-- Sample users (for testing purposes only)
INSERT INTO users (id, email, full_name, company, subscription_tier, monthly_usage_count, preferred_analysis_depth) VALUES
    ('11111111-1111-1111-1111-111111111111', 'demo@smarthire.com', 'Demo User', 'SmartHire Demo', 'premium', 5, 'comprehensive'),
    ('22222222-2222-2222-2222-222222222222', 'hr@techcorp.com', 'Sarah Johnson', 'TechCorp', 'basic', 3, 'standard'),
    ('33333333-3333-3333-3333-333333333333', 'recruiter@startupinc.com', 'Mike Chen', 'StartupInc', 'free', 8, 'basic');

-- Sample job descriptions
INSERT INTO job_descriptions (id, user_id, title, company, description, requirements, key_skills, experience_level, times_used) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Senior Full Stack Developer', 'TechCorp', 
     'We are seeking an experienced Full Stack Developer to join our innovative team. You will be responsible for developing and maintaining web applications using modern technologies.',
     'Bachelor''s degree in Computer Science or related field. 5+ years of experience in full-stack development. Proficiency in React, Node.js, and PostgreSQL. Experience with cloud platforms.',
     ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'REST APIs'], 'senior', 12),
    
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'Frontend Developer', 'StartupInc',
     'Join our growing startup as a Frontend Developer. You''ll work on exciting user-facing features and help shape our product''s future.',
     '3+ years of frontend development experience. Strong skills in React, CSS, and JavaScript. Experience with modern build tools and version control.',
     ARRAY['React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Webpack'], 'mid', 8),
    
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Data Scientist', 'TechCorp',
     'We''re looking for a Data Scientist to help us make data-driven decisions and build ML models for our products.',
     'MS/PhD in Data Science, Statistics, or related field. Experience with Python, R, and SQL. Knowledge of machine learning algorithms and statistical analysis.',
     ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'TensorFlow'], 'senior', 5);

-- Sample candidates
INSERT INTO candidates (id, user_id, full_name, email, phone, original_filename, cv_text, cv_summary, extracted_skills, experience_level, file_url, file_type, file_size_bytes, processed_at, expires_at) VALUES
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'Alex Rodriguez', 'alex.rodriguez@email.com', '+1-555-0101',
     'alex_rodriguez_cv.pdf', 
     'ALEX RODRIGUEZ | Senior Full Stack Developer | alex.rodriguez@email.com | +1-555-0101
     
     EXPERIENCE:
     Senior Full Stack Developer at InnovaTech (2019-2024)
     - Developed and maintained multiple web applications using React, Node.js, and PostgreSQL
     - Led a team of 4 developers in building a customer portal that increased user engagement by 40%
     - Implemented CI/CD pipelines using AWS and Docker
     - Technologies: React, Node.js, PostgreSQL, AWS, TypeScript, REST APIs, GraphQL
     
     Full Stack Developer at WebSolutions (2017-2019)
     - Built responsive web applications using React and Express.js
     - Optimized database queries resulting in 30% performance improvement
     - Technologies: React, Express.js, MongoDB, JavaScript, HTML, CSS
     
     EDUCATION:
     Bachelor of Science in Computer Science, State University (2017)
     
     SKILLS:
     React, Node.js, PostgreSQL, AWS, TypeScript, JavaScript, HTML, CSS, Docker, Git',
     'Experienced Senior Full Stack Developer with 7+ years building web applications. Strong expertise in React, Node.js, and PostgreSQL. Proven leadership experience and cloud platform knowledge.',
     ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'JavaScript', 'Docker', 'Git', 'REST APIs', 'GraphQL'], 'senior',
     'https://example.com/files/alex_rodriguez_cv.pdf', 'pdf', 245680, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '90 days'),
    
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'Emma Thompson', 'emma.thompson@email.com', '+1-555-0202',
     'emma_thompson_cv.pdf',
     'EMMA THOMPSON | Frontend Developer | emma.thompson@email.com | +1-555-0202
     
     EXPERIENCE:
     Frontend Developer at DesignStudio (2021-2024)
     - Developed responsive user interfaces using React and modern CSS frameworks
     - Collaborated with UX/UI designers to implement pixel-perfect designs
     - Improved website performance by 25% through optimization techniques
     - Technologies: React, JavaScript, CSS, HTML, Sass, Webpack, Git
     
     Junior Frontend Developer at WebCraft (2019-2021)
     - Built interactive web components using vanilla JavaScript and CSS
     - Maintained and updated existing websites
     - Technologies: JavaScript, HTML, CSS, jQuery, Bootstrap
     
     EDUCATION:
     Bachelor of Arts in Web Design, Arts University (2019)
     
     SKILLS:
     React, JavaScript, CSS, HTML, Sass, Webpack, Git, Responsive Design, UI/UX',
     'Talented Frontend Developer with 4+ years experience building responsive user interfaces. Strong skills in React, JavaScript, and modern CSS. Focus on performance optimization and user experience.',
     ARRAY['React', 'JavaScript', 'CSS', 'HTML', 'Sass', 'Webpack', 'Git', 'Responsive Design'], 'mid',
     'https://example.com/files/emma_thompson_cv.pdf', 'pdf', 198430, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '90 days'),
    
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'David Kim', 'david.kim@email.com', '+1-555-0303',
     'david_kim_cv.pdf',
     'DAVID KIM | Data Scientist | david.kim@email.com | +1-555-0303
     
     EXPERIENCE:
     Senior Data Scientist at DataTech (2020-2024)
     - Built and deployed machine learning models for predictive analytics
     - Analyzed large datasets using Python, R, and SQL
     - Improved model accuracy by 15% through feature engineering and hyperparameter tuning
     - Technologies: Python, R, SQL, TensorFlow, Pandas, Scikit-learn, AWS
     
     Data Analyst at Analytics Pro (2018-2020)
     - Performed statistical analysis and created data visualizations
     - Developed automated reporting systems using Python
     - Technologies: Python, SQL, Tableau, Excel, Statistics
     
     EDUCATION:
     Master of Science in Data Science, Tech University (2018)
     Bachelor of Science in Mathematics, State College (2016)
     
     SKILLS:
     Python, R, SQL, Machine Learning, TensorFlow, Pandas, Statistics, Tableau, AWS',
     'Experienced Data Scientist with 6+ years in machine learning and statistical analysis. Expert in Python, R, and SQL. Proven track record of building and deploying ML models in production.',
     ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'Statistics', 'Tableau', 'AWS'], 'senior',
     'https://example.com/files/david_kim_cv.pdf', 'pdf', 267890, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '90 days');

-- Sample CV-JD matches
INSERT INTO cv_jd_matches (user_id, candidate_id, job_description_id, match_percentage, confidence_score, processing_time_ms, matching_skills, missing_skills, strengths, concerns, recommendation, ai_reasoning, ai_provider, processing_cost_usd) VALUES
    ('11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 92.5, 0.95, 2340,
     ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'REST APIs'], 
     ARRAY['GraphQL experience could be stronger'],
     ARRAY['Strong leadership experience', '7+ years relevant experience', 'Cloud platform expertise', 'Full technology stack match'],
     ARRAY['Limited GraphQL experience mentioned'],
     'strong_match',
     'Excellent match with 92.5% compatibility. Candidate has all required core skills and exceeds experience requirements. Strong leadership background aligns well with senior role expectations. Only minor gap in GraphQL experience which can be easily addressed.',
     'claude-3', 0.0023),
    
    ('11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 88.0, 0.90, 1890,
     ARRAY['React', 'JavaScript', 'CSS', 'HTML', 'Git', 'Webpack'],
     ARRAY[]::text[],
     ARRAY['Perfect skill match', 'Strong frontend focus', 'Performance optimization experience', 'Design collaboration experience'],
     ARRAY['Only 4 years experience vs 3+ requirement - minimal concern'],
     'strong_match',
     'Very strong match at 88% compatibility. Candidate perfectly aligns with frontend developer requirements and exceeds minimum experience. Strong focus on performance optimization and UI/UX collaboration makes this an excellent fit.',
     'claude-3', 0.0019),
    
    ('22222222-2222-2222-2222-222222222222', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 94.0, 0.96, 2680,
     ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow'],
     ARRAY['Pandas mentioned but could be stronger'],
     ARRAY['Advanced degree in relevant field', '6+ years ML experience', 'Production model deployment', 'Strong statistical background'],
     ARRAY[]::text[],
     'strong_match',
     'Outstanding match with 94% compatibility. Candidate exceeds all requirements with MS in Data Science and 6+ years of hands-on ML experience. Proven track record of building and deploying models in production environments. Perfect alignment with role requirements.',
     'claude-3', 0.0027);

-- Update usage statistics to reflect the matches
UPDATE users SET monthly_usage_count = 2 WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE users SET monthly_usage_count = 1 WHERE id = '22222222-2222-2222-2222-222222222222';

-- Update job description usage counters
UPDATE job_descriptions SET times_used = times_used + 1, last_used_at = CURRENT_TIMESTAMP 
WHERE id IN ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc');