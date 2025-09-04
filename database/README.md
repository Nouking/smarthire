# SmartHire Database Setup

This directory contains the complete database setup for SmartHire AI application, including schema migrations, utility functions, and testing tools.

## 📁 Directory Structure

```
database/
├── migrations/           # Database schema and function definitions
│   ├── 001_enhanced_schema.sql      # Core tables and indexes
│   ├── 002_cleanup_functions.sql    # Maintenance and utility functions  
│   └── 003_vector_functions.sql     # pgvector similarity search functions
├── seeds/               # Sample data for testing
│   └── 001_sample_data.sql         # Sample users, jobs, and candidates
├── test-connection.js   # Database connectivity and validation tests
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Wait for the database to be provisioned
4. Note down your project URL and keys

### 2. Enable pgvector Extension

In your Supabase project:
1. Go to Database → Extensions
2. Search for "vector" and enable the `vector` extension
3. This enables semantic search capabilities

### 3. Configure Environment Variables

Copy the environment template:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Database Migrations

Execute the migration files in order in your Supabase SQL Editor:

1. **001_enhanced_schema.sql** - Creates core tables and indexes
2. **002_cleanup_functions.sql** - Adds maintenance functions  
3. **003_vector_functions.sql** - Adds semantic search functions

### 5. (Optional) Load Sample Data

For testing purposes:

**Option 1 - Supabase SQL Editor (Recommended):**
1. Open `database/seeds/001_sample_data.sql`
2. Copy the entire SQL content
3. Paste into Supabase SQL Editor
4. Execute the SQL

**Option 2 - Local psql client:**
```bash
psql "your-supabase-connection-string" -f database/seeds/001_sample_data.sql
```

### 6. Test Connection

Verify everything is working:
```bash
node database/test-connection.js
```

## 📊 Database Schema

### Core Tables

#### `users`
- User accounts with subscription and usage tracking
- Supports free/basic/premium/enterprise tiers
- Monthly usage limits and reset dates

#### `job_descriptions`
- Job postings with AI-optimized fields
- Vector embeddings for semantic search
- Usage tracking and skill extraction

#### `candidates`
- CV/resume data with extracted information
- Vector embeddings for similarity matching
- Automatic expiration for data retention

#### `cv_jd_matches`
- AI analysis results linking candidates to jobs
- Match percentages, skills analysis, and recommendations
- User feedback collection for continuous improvement

### Key Features

- **🔍 Semantic Search**: pgvector enables finding similar CVs and job descriptions
- **🔐 Row Level Security**: Multi-tenant data isolation
- **⚡ Performance Optimized**: Indexes for common query patterns
- **🧹 Automated Cleanup**: Scheduled data retention and cost management
- **📈 Usage Tracking**: Monitor API usage and costs per user

## 🛠️ Database Functions

### Utility Functions
- `cleanup_expired_data()` - Removes expired records and resets usage counters
- `increment_user_usage(uuid)` - Tracks user API usage
- `check_user_usage_limit(uuid, int)` - Validates usage limits

### Vector Search Functions
- `match_candidates(vector, float, int, uuid)` - Find similar candidates
- `match_job_descriptions(vector, float, int, uuid)` - Find similar jobs
- `find_best_cv_jd_matches(uuid, float, int)` - Best candidate matches for a job

### Management Functions
- `update_cv_embedding(uuid, vector)` - Update candidate embeddings
- `update_jd_embedding(uuid, vector)` - Update job description embeddings
- `get_embedding_stats()` - Monitor embedding coverage

## 🧪 Testing

### Connection Test
```bash
node database/test-connection.js
```

This validates:
- ✅ Basic database connectivity
- ✅ Table existence and accessibility  
- ✅ pgvector extension availability
- ✅ CRUD operations functionality
- ✅ Database functions presence

### Manual Testing
```sql
-- Test vector similarity (requires embeddings)
SELECT * FROM match_candidates('[0.1,0.2,...]'::vector, 0.8, 5, 'user-id');

-- Check embedding coverage
SELECT * FROM get_embedding_stats();

-- Test cleanup function
SELECT cleanup_expired_data();
```

## 📈 Performance Considerations

### Indexes
- **Vector indexes**: ivfflat for embedding similarity search
- **Query indexes**: User-based filtering and time-based sorting
- **Expiration indexes**: Efficient cleanup operations

### Scalability
- Designed for MVP scale (thousands of users, tens of thousands of candidates)
- Vector indexes optimized for similarity search performance
- Automated cleanup prevents unlimited data growth

### Cost Management
- 90-day automatic data expiration
- Usage limits by subscription tier
- Efficient query patterns to minimize compute costs

## 🔒 Security

### Row Level Security (RLS)
All tables enforce user-based access control:
- Users can only access their own data
- No cross-tenant data leakage
- Admin functions require service role

### Data Privacy
- Automatic data expiration
- No sensitive data in logs
- Proper foreign key constraints

## 🚨 Troubleshooting

### Common Issues

**Connection Failures**
- Verify environment variables are set
- Check Supabase project is active
- Ensure service role key has correct permissions

**pgvector Not Working**  
- Enable vector extension in Supabase dashboard
- Re-run migration 001_enhanced_schema.sql
- Check extension status: `SELECT * FROM pg_extension WHERE extname = 'vector';`

**Performance Issues**
- Ensure vector indexes are created after inserting data
- Monitor query performance in Supabase dashboard
- Consider adjusting ivfflat index parameters

**Data Cleanup Issues**
- Check `cleanup_expired_data()` function exists
- Verify scheduled job configuration
- Monitor storage usage in Supabase dashboard

### Support
For issues specific to SmartHire database setup, refer to:
- Supabase documentation
- pgvector documentation  
- Project issue tracker

## 📝 Migration Checklist

When deploying to production:

- [ ] Create Supabase project
- [ ] Enable pgvector extension
- [ ] Set environment variables
- [ ] Run migrations in order
- [ ] Test database connection
- [ ] Configure automated backups
- [ ] Set up monitoring alerts
- [ ] Schedule cleanup job (if using pg_cron)
- [ ] Load initial data (if needed)
- [ ] Verify RLS policies are active