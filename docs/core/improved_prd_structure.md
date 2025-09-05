# SmartHire AI - Product Requirements Document

**Document Type:** Product Requirements Document (PRD)  
**Version:** 3.0  
**Owner:** John (Product Manager)  
**Status:** Draft  
**Last Updated:** August 24, 2025

---

## 📋 Document Overview

**Purpose:** Define WHAT we're building and WHY for SmartHire AI MVP  
**Audience:** Engineering, Design, Business stakeholders  
**Scope:** MVP features only (Iterations 1-2)  
**Related Documents:**

- [Technical Design Document](link)
- [Implementation Plan](link)
- [Market Research Report](link)

---

## 🎯 Executive Summary

### The Opportunity

Small businesses (2-20 employees) spend **5-10 hours per hire** on manual CV screening with **poor hiring outcomes**. Current solutions are either:

- **Too expensive**: Enterprise tools ($25K+/year)
- **Too basic**: Spreadsheets and email workflows
- **No AI capabilities**: Manual pattern matching only

### Our Solution

**SmartHire AI** provides enterprise-grade CV-to-job matching for small teams at **zero cost**, with a unique **30-second processing guarantee** and explainable AI results.

### Success Metrics (6 months)

- **100+ active teams** using the platform monthly
- **70% time reduction** in candidate screening
- **4.5/5 user satisfaction** with AI transparency
- **$0 operational costs** maintained through smart architecture

---

## 👥 Target Market & Users

### Primary Market

**Small Business Owners & HR Managers** at companies with 2-20 employees who:

- Hire 1-5 people per quarter
- Lack dedicated recruiting resources
- Need professional hiring processes
- Are cost-conscious but value-driven

### User Personas

#### 1. Technical Hiring Manager (Primary)

- **Who**: Senior developers/CTOs who hire technical talent
- **Pain**: Screening 50+ CVs manually for each role
- **Goal**: Quickly identify top candidates with confidence
- **Success**: Reduce screening time from 4 hours to 45 minutes

#### 2. Small Business Owner (Secondary)

- **Who**: Entrepreneurs hiring their first 5-15 employees
- **Pain**: No hiring experience, afraid of bad hires
- **Goal**: Professional recruitment process without HR expertise
- **Success**: Structured hiring with clear candidate comparisons

---

## 🚀 Product Vision & Strategy

### Vision Statement

_"Make professional recruitment accessible to every growing business through AI-powered tools that are free, fast, and transparent."_

### Strategic Principles

1. **Free First**: Sustainable free tier that delivers real value
2. **Speed Matters**: 30-second processing as competitive moat
3. **Transparency**: Users understand and trust AI decisions
4. **Mobile-Ready**: Optimized for recruiting on-the-go
5. **MVP Focus**: Core workflow over feature breadth

### Competitive Differentiation

| Competitor    | Price      | Processing Time | AI Transparency    | Mobile           |
| ------------- | ---------- | --------------- | ------------------ | ---------------- |
| **Lever**     | $35K/year  | 2-5 minutes     | ❌ Black box       | ❌ Desktop-first |
| **JazzHR**    | $420/month | Manual          | ❌ No AI           | ⚠️ Limited       |
| **SmartHire** | **$0**     | **<30 seconds** | ✅ **Explainable** | ✅ **Native**    |

---

## ⭐ Core Features (MVP)

### Feature Priority Matrix

```
HIGH IMPACT + HIGH EFFORT:
🎯 AI CV-JD Matching with 30s guarantee
🎯 Explainable AI results with confidence scores

HIGH IMPACT + LOW EFFORT:
✅ File upload & storage (CVs + Job Descriptions)
✅ Basic candidate management & notes

LOW IMPACT + LOW EFFORT:
📋 User authentication & team workspaces
📋 Usage tracking & limits dashboard

FUTURE (Out of MVP scope):
❌ Interview question generation
❌ Advanced analytics & reporting
❌ Integrations with job boards
```

### MVP Feature Specifications

#### 1. Intelligent CV-JD Matching 🎯

**User Story**: _As a hiring manager, I want to quickly identify the best CV matches for my job opening with clear reasoning so I can focus my interview time on top candidates._

**Core Functionality:**

- Upload multiple CVs (batch processing)
- Create/edit job descriptions with templates
- AI matching with percentage scores (0-100%)
- **30-second processing guarantee**
- Explainable results showing:
  - Matching skills found
  - Missing key requirements
  - Overall recommendation (Strong/Maybe/No)

**Acceptance Criteria:**

- ✅ Process 5-20 CVs against 1 JD within 30 seconds
- ✅ Display match percentages with color coding (Green 80%+, Yellow 60-79%, Red <60%)
- ✅ Show "Why this score?" explanation with specific examples
- ✅ Export results as PDF for sharing with team

#### 2. Document Management 📁

**User Story**: _As a recruiter, I want to organize my CVs and job descriptions so I can easily re-run analyses and track candidate progress._

**Core Functionality:**

- Drag-and-drop file upload (PDF, DOC, DOCX)
- Candidate profiles with extracted information
- Job description library with reusable templates
- Search and filter capabilities

**Acceptance Criteria:**

- ✅ Upload up to 10MB files with progress indicator
- ✅ Auto-extract candidate name, email, phone, skills
- ✅ Store unlimited candidates and JDs (within free tier)
- ✅ Mobile-optimized file management interface

#### 3. Results Dashboard 📊

**User Story**: _As a business owner, I want a clear overview of my hiring pipeline so I can track progress and make data-driven decisions._

**Core Functionality:**

- Dashboard with key metrics (candidates, matches, usage)
- Recent activity feed
- Quick action buttons (Upload, Match, Export)
- Usage tracking against free tier limits

---

## 🔧 Technical Requirements

### Performance Standards

- **Processing Speed**: 95% of matches complete within 30 seconds
- **Page Load**: <2 seconds for dashboard and key workflows
- **Mobile Performance**: <300ms response for touch interactions
- **Uptime**: 99.5% availability during business hours

### Security & Compliance

- **Data Privacy**: GDPR compliant with consent management
- **File Security**: Encrypted storage, virus scanning
- **Access Control**: Team-based permissions with audit logs
- **Data Retention**: User-controlled deletion with automated cleanup

### Scalability Targets

- **Concurrent Users**: 50 active users simultaneously
- **Data Storage**: 100 candidates + 20 JDs per user
- **API Limits**: Smart rate limiting with graceful degradation
- **Cost Management**: <$0.15 per CV analysis all-in

---

## 📈 Success Metrics & KPIs

### User Adoption (Month 3 Targets)

- **Registered Users**: 200+ small business teams
- **Monthly Active Users**: 100+ (50% activation rate)
- **Feature Usage**: 80% use CV matching, 60% upload multiple CVs
- **Session Quality**: 12+ minute average session duration

### Product Performance

- **Processing Speed**: 95% meet 30-second SLA
- **User Satisfaction**: 4.3/5 rating for AI explanations
- **Time Savings**: 65% reduction in screening time (user survey)
- **Match Accuracy**: 80% of "strong matches" proceed to interview

### Business Metrics

- **Cost Per User**: <$8/month operational costs (first 500 users)
- **Retention Rate**: 70% month-over-month active usage
- **Conversion Intent**: 15% express interest in premium features
- **NPS Score**: 50+ (good for B2B tools)

---

## ⚠️ Key Assumptions & Risks

### Critical Assumptions

1. **AI Processing Speed**: Can achieve <30s with current OpenRouter API performance
2. **Free Tier Sustainability**: 10 matches/user/month fits within $8 monthly budget
3. **User Behavior**: Small businesses will trust AI recommendations with explanations
4. **Market Size**: 500+ small businesses will adopt within 6 months

### High-Risk Areas

| Risk                   | Impact | Probability | Mitigation                                        |
| ---------------------- | ------ | ----------- | ------------------------------------------------- |
| **30s SLA Breach**     | High   | Medium      | Parallel processing, fallback to keyword matching |
| **AI Cost Explosion**  | High   | Medium      | Multi-provider setup, intelligent caching         |
| **User Trust Issues**  | Medium | Low         | Extensive explanation UI, user testing            |
| **Slow User Adoption** | Medium | Medium      | Strong onboarding, referral program               |

### Success Dependencies

- ✅ OpenRouter API reliability and cost stability
- ✅ Supabase free tier sufficient for storage needs
- ✅ User willingness to trust AI-assisted hiring decisions
- ✅ Ability to achieve 30-second processing consistently

---

## 🎯 Out of Scope (V1)

**Features explicitly NOT included in MVP:**

- Interview question generation (V2 feature)
- Advanced analytics and reporting dashboards
- Integration with LinkedIn, Indeed, other job boards
- Video interview capabilities or scheduling
- Multi-language support beyond English
- Advanced team collaboration features
- Custom AI model training or bias detection

**Why excluded**: MVP focuses on core workflow validation. These features add complexity without validating core value proposition.

---

## ✅ Definition of Done

**MVP is complete when:**

1. ✅ User can upload CVs and JDs through web interface
2. ✅ AI matching produces results within 30 seconds 95% of the time
3. ✅ Results include explainable reasoning that users understand
4. ✅ Dashboard shows usage against free tier limits
5. ✅ Mobile interface works for core workflows (upload, review results)
6. ✅ System handles 25 concurrent users without degradation
7. ✅ GDPR compliance implemented (consent, deletion, audit)

**Launch Criteria:**

- 20 beta users complete full workflow successfully
- Average user satisfaction rating 4.0+ on core features
- System performance meets all technical requirements
- Legal review completed for privacy compliance

---

## 📋 Next Steps

**Week 1**: Finalize MVP scope with engineering team  
**Week 2**: Create technical design document based on this PRD
**Week 3**: Begin implementation with user auth and file upload
**Week 4**: Integrate AI matching pipeline and test processing speed

---

_This PRD focuses on WHAT we're building and WHY. See Technical Design Document for HOW we'll build it, and Implementation Plan for WHEN it will be delivered._
