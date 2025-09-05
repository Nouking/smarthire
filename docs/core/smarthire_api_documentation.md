# SmartHire AI - API Documentation

**Document Type:** API Specification & Developer Guide  
**Version:** 1.0  
**Owner:** Winston (Technical Architect)  
**Status:** Draft  
**Created:** August 24, 2025  
**Base URL:** `https://api.smarthire.ai/v1`

---

## 📋 API Overview

**Architecture:** RESTful API built on Next.js 14 Server Actions  
**Authentication:** Supabase Auth with JWT tokens  
**Rate Limiting:** 100 requests per minute per user  
**Response Format:** JSON with consistent error handling

**Key Principles:**

- **Security-First:** All endpoints protected by RLS policies
- **Performance-Optimized:** Sub-500ms response times for CRUD operations
- **Mobile-Friendly:** Lightweight payloads optimized for mobile connections
- **Consistent:** Standardized request/response patterns across endpoints

---

## 🔐 Authentication

### Authentication Flow

All API endpoints require authentication except public endpoints explicitly marked as such.

**Headers Required:**

```http
Authorization: Bearer <supabase_jwt_token>
Content-Type: application/json
```

**Getting Auth Token:**

```typescript
// Client-side auth
const {
  data: { user },
  error,
} = await supabase.auth.getUser();
const token = user?.access_token;

// Use in API calls
const response = await fetch('/api/candidates', {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### Error Responses

**Authentication Errors:**

```json
{
  "error": "unauthorized",
  "message": "Authentication required",
  "status": 401
}
```

**Authorization Errors:**

```json
{
  "error": "forbidden",
  "message": "Access denied to this resource",
  "status": 403
}
```

---

## 👤 User Management

### GET /api/user/profile

Get current user profile information.

**Response:**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "company": "Acme Corp",
  "subscription_tier": "free",
  "monthly_usage_count": 3,
  "usage_reset_date": "2025-09-01",
  "preferred_analysis_depth": "standard",
  "created_at": "2025-08-01T10:00:00Z",
  "updated_at": "2025-08-20T14:30:00Z"
}
```

### PUT /api/user/profile

Update user profile information.

**Request Body:**

```json
{
  "full_name": "John Smith",
  "company": "New Company Inc",
  "preferred_analysis_depth": "detailed"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Smith",
    "company": "New Company Inc",
    "updated_at": "2025-08-24T15:45:00Z"
  }
}
```

### GET /api/user/usage

Get current month usage statistics.

**Response:**

```json
{
  "current_month": {
    "analyses_used": 7,
    "analyses_limit": 10,
    "analyses_remaining": 3,
    "reset_date": "2025-09-01T00:00:00Z"
  },
  "this_week": {
    "analyses_count": 3,
    "candidates_processed": 45,
    "avg_processing_time_ms": 18500
  }
}
```

---

## 📄 Job Description Management

### POST /api/job-descriptions

Create a new job description.

**Request Body:**

```json
{
  "title": "Senior React Developer",
  "company": "Acme Corp",
  "description": "We are looking for an experienced React developer...",
  "requirements": "5+ years React experience, TypeScript, Node.js...",
  "experience_level": "senior",
  "key_skills": ["React", "TypeScript", "Node.js", "GraphQL"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "jd-550e8400-e29b-41d4-a716-446655440000",
    "title": "Senior React Developer",
    "company": "Acme Corp",
    "description": "We are looking for an experienced React developer...",
    "requirements": "5+ years React experience, TypeScript, Node.js...",
    "experience_level": "senior",
    "key_skills": ["React", "TypeScript", "Node.js", "GraphQL"],
    "times_used": 0,
    "created_at": "2025-08-24T16:00:00Z"
  }
}
```

### GET /api/job-descriptions

Get all job descriptions for authenticated user.

**Query Parameters:**

- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `search` (optional): Search in title or description

**Response:**

```json
{
  "data": [
    {
      "id": "jd-550e8400-e29b-41d4-a716-446655440000",
      "title": "Senior React Developer",
      "company": "Acme Corp",
      "experience_level": "senior",
      "key_skills": ["React", "TypeScript", "Node.js"],
      "times_used": 3,
      "last_used_at": "2025-08-20T14:30:00Z",
      "created_at": "2025-08-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

### GET /api/job-descriptions/:id

Get specific job description by ID.

**Response:**

```json
{
  "data": {
    "id": "jd-550e8400-e29b-41d4-a716-446655440000",
    "title": "Senior React Developer",
    "company": "Acme Corp",
    "description": "Full job description text...",
    "requirements": "Detailed requirements...",
    "experience_level": "senior",
    "key_skills": ["React", "TypeScript", "Node.js", "GraphQL"],
    "times_used": 3,
    "last_used_at": "2025-08-20T14:30:00Z",
    "created_at": "2025-08-15T10:00:00Z",
    "updated_at": "2025-08-15T10:00:00Z"
  }
}
```

### PUT /api/job-descriptions/:id

Update job description.

**Request Body:**

```json
{
  "title": "Senior React Developer (Updated)",
  "requirements": "Updated requirements...",
  "key_skills": ["React", "TypeScript", "Node.js", "GraphQL", "AWS"]
}
```

### DELETE /api/job-descriptions/:id

Delete job description (soft delete).

**Response:**

```json
{
  "success": true,
  "message": "Job description deleted successfully"
}
```

---

## 👥 Candidate Management

### POST /api/candidates/upload

Upload and process candidate CV files.

**Request:** Multipart form data

```
Content-Type: multipart/form-data

files: File[] (up to 20 files, 5MB each max)
job_description_id: string (optional, for immediate matching)
```

**Response:**

```json
{
  "success": true,
  "data": {
    "batch_id": "batch-550e8400-e29b-41d4-a716-446655440000",
    "uploaded_files": 5,
    "processing_status": "in_progress",
    "estimated_completion": "2025-08-24T16:01:30Z"
  }
}
```

### GET /api/candidates/upload/:batchId/status

Check processing status for uploaded batch.

**Response:**

```json
{
  "batch_id": "batch-550e8400-e29b-41d4-a716-446655440000",
  "status": "completed",
  "progress": {
    "total_files": 5,
    "processed": 5,
    "failed": 0,
    "processing_time_ms": 18500
  },
  "candidates": [
    {
      "id": "cand-550e8400-e29b-41d4-a716-446655440000",
      "full_name": "Alice Johnson",
      "email": "alice@example.com",
      "status": "processed",
      "processing_time_ms": 3200
    }
  ]
}
```

### GET /api/candidates

Get all candidates for authenticated user.

**Query Parameters:**

- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `search` (optional): Search in name, email, or skills
- `experience_level` (optional): Filter by experience level
- `skills` (optional): Comma-separated list of required skills

**Response:**

```json
{
  "data": [
    {
      "id": "cand-550e8400-e29b-41d4-a716-446655440000",
      "full_name": "Alice Johnson",
      "email": "alice@example.com",
      "phone": "+1-555-123-4567",
      "extracted_skills": ["React", "TypeScript", "Python", "AWS"],
      "experience_level": "senior",
      "cv_summary": "Senior full-stack developer with 7 years experience...",
      "original_filename": "alice_johnson_resume.pdf",
      "processed_at": "2025-08-24T16:00:30Z",
      "created_at": "2025-08-24T16:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}
```

### GET /api/candidates/:id

Get specific candidate details.

**Response:**

```json
{
  "data": {
    "id": "cand-550e8400-e29b-41d4-a716-446655440000",
    "full_name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1-555-123-4567",
    "cv_text": "Full extracted CV text content...",
    "cv_summary": "AI-generated summary of candidate...",
    "extracted_skills": ["React", "TypeScript", "Python", "AWS", "Docker"],
    "experience_level": "senior",
    "original_filename": "alice_johnson_resume.pdf",
    "file_type": "pdf",
    "file_size_bytes": 245760,
    "file_url": "https://storage.supabase.co/candidates/user123/alice_cv.pdf",
    "processed_at": "2025-08-24T16:00:30Z",
    "expires_at": "2025-11-22T16:00:30Z",
    "created_at": "2025-08-24T16:00:00Z"
  }
}
```

### DELETE /api/candidates/:id

Delete candidate and associated files.

**Response:**

```json
{
  "success": true,
  "message": "Candidate deleted successfully"
}
```

---

## 🤖 AI Matching Engine

### POST /api/matching/analyze

Perform AI-powered CV to job description matching.

**Request Body:**

```json
{
  "candidate_ids": [
    "cand-550e8400-e29b-41d4-a716-446655440000",
    "cand-660e8400-e29b-41d4-a716-446655440001"
  ],
  "job_description_id": "jd-770e8400-e29b-41d4-a716-446655440002",
  "analysis_depth": "standard"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "analysis_id": "analysis-880e8400-e29b-41d4-a716-446655440003",
    "status": "processing",
    "estimated_completion": "2025-08-24T16:01:30Z",
    "processing_guarantee_ms": 30000
  }
}
```

### GET /api/matching/analyze/:analysisId/status

Check analysis processing status.

**Response (In Progress):**

```json
{
  "analysis_id": "analysis-880e8400-e29b-41d4-a716-446655440003",
  "status": "processing",
  "progress": {
    "total_candidates": 15,
    "processed": 8,
    "estimated_completion": "2025-08-24T16:01:15Z",
    "elapsed_time_ms": 12000
  }
}
```

**Response (Completed):**

```json
{
  "analysis_id": "analysis-880e8400-e29b-41d4-a716-446655440003",
  "status": "completed",
  "processing_time_ms": 18500,
  "total_candidates": 15,
  "results_available": true,
  "cost_usd": 0.0485
}
```

### GET /api/matching/results/:analysisId

Get completed matching results.

**Response:**

```json
{
  "analysis_id": "analysis-880e8400-e29b-41d4-a716-446655440003",
  "job_description": {
    "id": "jd-770e8400-e29b-41d4-a716-446655440002",
    "title": "Senior React Developer",
    "company": "Acme Corp"
  },
  "results": [
    {
      "candidate_id": "cand-550e8400-e29b-41d4-a716-446655440000",
      "candidate_name": "Alice Johnson",
      "match_percentage": 87.5,
      "confidence_score": 0.92,
      "recommendation": "strong_match",
      "matching_skills": ["React", "TypeScript", "Node.js", "AWS"],
      "missing_skills": ["GraphQL"],
      "strengths": [
        "7+ years React experience exceeds 5-year requirement",
        "Strong TypeScript background with enterprise projects",
        "AWS certification demonstrates cloud expertise"
      ],
      "concerns": [
        "No GraphQL experience mentioned in CV",
        "Limited fintech experience (role is for fintech company)"
      ],
      "ai_reasoning": "Alice is an excellent match for this role. Her 7 years of React experience significantly exceeds the 5-year requirement, and her TypeScript expertise aligns perfectly with the tech stack. The AWS certification demonstrates cloud competency. The main gaps are GraphQL experience and fintech domain knowledge, but these are learnable skills for someone of her experience level.",
      "processing_time_ms": 3200,
      "ai_provider": "anthropic/claude-3.5-haiku",
      "created_at": "2025-08-24T16:01:18Z"
    }
  ],
  "summary": {
    "total_analyzed": 15,
    "strong_matches": 3,
    "potential_fits": 7,
    "not_recommended": 5,
    "avg_match_percentage": 64.2,
    "processing_time_ms": 18500
  }
}
```

### GET /api/matching/history

Get user's matching analysis history.

**Query Parameters:**

- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**

```json
{
  "data": [
    {
      "analysis_id": "analysis-880e8400-e29b-41d4-a716-446655440003",
      "job_title": "Senior React Developer",
      "candidates_analyzed": 15,
      "strong_matches": 3,
      "processing_time_ms": 18500,
      "cost_usd": 0.0485,
      "created_at": "2025-08-24T16:00:00Z"
    }
  ],
  "pagination": {
    "total": 8,
    "limit": 20,
    "offset": 0,
    "has_more": false
  }
}
```

---

## 📊 Analytics & Reporting

### GET /api/analytics/dashboard

Get dashboard metrics for authenticated user.

**Response:**

```json
{
  "current_month": {
    "analyses_completed": 7,
    "candidates_processed": 105,
    "average_match_score": 72.3,
    "strong_matches_found": 18,
    "time_saved_hours": 24.5
  },
  "this_week": {
    "analyses_completed": 2,
    "candidates_processed": 30,
    "average_processing_time_ms": 19200
  },
  "performance_metrics": {
    "avg_processing_time_ms": 18750,
    "sla_compliance_percentage": 96.4,
    "user_satisfaction_rating": 4.3,
    "ai_accuracy_score": 0.847
  }
}
```

### GET /api/analytics/performance

Get detailed performance analytics.

**Query Parameters:**

- `period` (optional): "week", "month", "quarter" (default: "month")
- `include_trends` (optional): Include trend data (default: false)

**Response:**

```json
{
  "period": "month",
  "date_range": {
    "start": "2025-08-01T00:00:00Z",
    "end": "2025-08-24T23:59:59Z"
  },
  "metrics": {
    "total_analyses": 12,
    "total_candidates": 180,
    "total_processing_time_ms": 225000,
    "average_processing_time_ms": 18750,
    "sla_compliance_rate": 0.964,
    "cost_efficiency": {
      "total_cost_usd": 0.485,
      "cost_per_analysis": 0.04,
      "cost_per_candidate": 0.0027
    }
  },
  "quality_metrics": {
    "user_feedback_ratings": {
      "average_rating": 4.3,
      "total_ratings": 28,
      "rating_distribution": {
        "5": 12,
        "4": 11,
        "3": 4,
        "2": 1,
        "1": 0
      }
    },
    "ai_accuracy": {
      "precision_score": 0.847,
      "user_agreement_rate": 0.789,
      "false_positive_rate": 0.123
    }
  }
}
```

---

## 📤 Export & Integration

### POST /api/export/matches/:analysisId

Export matching results as PDF report.

**Request Body:**

```json
{
  "format": "pdf",
  "include_sections": ["summary", "top_matches", "detailed_analysis"],
  "branding": {
    "company_name": "Acme Corp",
    "logo_url": "https://example.com/logo.png"
  }
}
```

**Response:**

```json
{
  "success": true,
  "export_id": "export-990e8400-e29b-41d4-a716-446655440004",
  "download_url": "https://api.smarthire.ai/exports/matches_report_20250824.pdf",
  "expires_at": "2025-08-31T16:00:00Z"
}
```

### GET /api/export/:exportId/download

Download exported file.

**Response:** Binary file download with appropriate headers

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename="matches_report_20250824.pdf"
Content-Length: 245760
```

---

## ⚠️ Error Handling

### Standard Error Response Format

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": "Additional context if available",
  "status": 400,
  "timestamp": "2025-08-24T16:00:00Z",
  "path": "/api/candidates/upload"
}
```

### Common Error Codes

#### 400 - Bad Request

```json
{
  "error": "validation_error",
  "message": "Request validation failed",
  "details": {
    "field": "email",
    "reason": "Invalid email format"
  },
  "status": 400
}
```

#### 402 - Payment Required (Usage Limits)

```json
{
  "error": "usage_limit_exceeded",
  "message": "Monthly analysis limit reached",
  "details": {
    "current_usage": 10,
    "limit": 10,
    "reset_date": "2025-09-01T00:00:00Z"
  },
  "status": 402
}
```

#### 429 - Too Many Requests

```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "details": {
    "limit": 100,
    "window": "1 minute",
    "retry_after": 45
  },
  "status": 429
}
```

#### 503 - Service Unavailable (Processing Issues)

```json
{
  "error": "processing_timeout",
  "message": "Analysis processing exceeded 30-second guarantee",
  "details": {
    "processing_time_ms": 32000,
    "fallback_available": true
  },
  "status": 503
}
```

---

## 🔧 Development Guidelines

### API Design Principles

#### 1. Consistent Naming

- **Resources:** Plural nouns (`/candidates`, `/job-descriptions`)
- **Actions:** HTTP verbs (GET, POST, PUT, DELETE)
- **Parameters:** Snake_case for consistency with database

#### 2. Response Structure

```typescript
// Success Response
interface ApiResponse<T> {
  success: true;
  data: T;
  pagination?: PaginationInfo;
}

// Error Response
interface ApiError {
  error: string;
  message: string;
  details?: any;
  status: number;
  timestamp: string;
  path: string;
}
```

#### 3. Input Validation

```typescript
// Example validation schema
const CreateJobDescriptionSchema = {
  title: { required: true, maxLength: 255 },
  description: { required: true, maxLength: 5000 },
  requirements: { required: true, maxLength: 3000 },
  experience_level: { enum: ['junior', 'mid', 'senior'] },
  key_skills: { type: 'array', items: { type: 'string' }, maxItems: 20 },
};
```

### Performance Requirements

#### Response Time Targets

- **CRUD Operations:** <500ms for 95% of requests
- **File Upload:** <5s for files up to 5MB
- **AI Processing:** <30s for batches up to 20 CVs
- **Export Generation:** <10s for PDF reports

#### Rate Limiting

- **Authenticated Users:** 100 requests/minute
- **File Uploads:** 10 uploads/minute
- **AI Processing:** 5 analyses/minute
- **Export Generation:** 3 exports/minute

### Security Considerations

#### Input Sanitization

- All user inputs validated and sanitized
- File uploads scanned for malware
- SQL injection prevention through parameterized queries
- XSS prevention through output encoding

#### Access Control

- Row Level Security (RLS) enforced at database level
- JWT token validation on every request
- Resource ownership verification
- Audit logging for sensitive operations

---

## 📋 Testing & Validation

### API Testing Strategy

#### Unit Tests

- Request/response validation
- Business logic correctness
- Error handling scenarios
- Edge cases and boundary conditions

#### Integration Tests

- Database operations with RLS
- File upload and processing pipeline
- AI provider integration with fallbacks
- External service dependencies

#### Performance Tests

- Load testing for concurrent users
- 30-second SLA validation for AI processing
- Rate limiting enforcement
- Database query optimization

### Example Test Cases

```typescript
// Performance test example
describe('AI Processing Performance', () => {
  test('should complete 20 CV analysis within 30 seconds', async () => {
    const start = Date.now();
    const mockCandidates = generateMockCandidates(20);
    const mockJobDescription = generateMockJobDescription();

    const response = await request(app)
      .post('/api/matching/analyze')
      .send({
        candidate_ids: mockCandidates.map((c) => c.id),
        job_description_id: mockJobDescription.id,
      });

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(30000);
    expect(response.status).toBe(200);
  });
});

// Security test example
describe('API Security', () => {
  test('should reject requests without authentication', async () => {
    const response = await request(app).get('/api/candidates').send();

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('unauthorized');
  });
});
```

---

## 🔗 Related Documentation

- **[Technical Design Document](smarthire_technical_design.md)** - Overall system architecture
- **[Implementation Plan](smarthire_implementation_plan.md)** - Development timeline and milestones
- **[User Research Summary](smarthire_user_research.md)** - User needs and feature validation

---

This API documentation provides complete specifications for implementing the SmartHire AI MVP. All endpoints are designed to support the 30-second processing guarantee while maintaining security, performance, and scalability requirements.

**Next Steps:** Review with development team, validate endpoint designs against user workflows, and begin implementation following the documented specifications.
