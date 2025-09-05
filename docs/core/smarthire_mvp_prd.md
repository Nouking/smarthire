# SmartHire AI - MVP Product Requirements Document

**Document Type:** Product Requirements Document (PRD)  
**Version:** 3.0 - MVP Focused  
**Owner:** John (Product Manager)  
**Status:** Review Ready  
**Created:** August 24, 2025  
**Timeline:** 12-16 weeks (realistic scope)

---

## 📋 Document Overview & Scope

**Purpose:** Define WHAT we're building and WHY for SmartHire AI MVP  
**Audience:** Engineering, Design, Business stakeholders  
**MVP Scope:** Core CV-JD matching functionality only  
**Related Documents:**

- [Technical Design Document](smarthire_technical_design.md)
- [Implementation Plan](smarthire_implementation_plan.md)
- [Future Roadmap](smarthire_roadmap.md)

**Out of MVP Scope:** Interview questions, advanced analytics, team collaboration, mobile apps, integrations

---

## 🎯 Executive Summary

### The Core Problem

Small businesses hiring 1-5 people per quarter spend **5-10 hours manually screening CVs** for each role with **inconsistent results**. Our user interviews reveal that technical founders and HR managers struggle with:

- **Time Intensive**: Manual CV review takes 2-5 minutes per candidate
- **Inconsistent Decisions**: No standardized evaluation criteria
- **Overwhelm**: 50+ applications for technical roles create analysis paralysis
- **Lack of Confidence**: Unsure if they're missing good candidates or pursuing poor fits

### Our MVP Solution

**SmartHire AI** provides **AI-powered CV-to-job matching** that processes batches of CVs in **under 30 seconds** with **explainable results**, helping small teams make confident hiring decisions without the manual overhead.

**Core Value Proposition:** _"Turn 4 hours of CV screening into 30 minutes of reviewing AI-ranked matches with clear reasoning."_

### Success Definition (6 months)

- **75+ small businesses** actively using the platform monthly
- **65% time reduction** in candidate screening (validated via user surveys)
- **4.2/5 user satisfaction** with AI match explanations
- **$0 operational costs** through intelligent architecture and usage limits

---

## 👥 Target Users & Market

### Primary User Persona: Technical Hiring Manager

**Demographics:**

- Senior developers, CTOs, or technical leads at companies with 5-25 employees
- Hiring 1-3 technical roles per quarter (developers, designers, product managers)
- Currently spend 4-8 hours per role on initial CV screening

**Pain Points (Validated through 8 user interviews):**

- _"I get 60+ applications but only 5-10 are actually qualified"_
- _"I waste hours reading CVs that clearly don't match the job requirements"_
- _"I'm not sure if my gut instinct about candidates is reliable"_
- _"I need help prioritizing which candidates to interview first"_

**Jobs to be Done:**

1. **Primary:** Quickly identify top 3-5 candidates from large applicant pools
2. **Secondary:** Validate hiring instincts with objective analysis
3. **Tertiary:** Create consistent evaluation criteria across roles

### Secondary Persona: Small Business Owner

**Demographics:**

- Entrepreneurs hiring their first 5-15 employees across various functions
- No dedicated HR resources or formal recruitment experience
- Cost-conscious but understand the importance of good hires

**Pain Points:**

- _"I don't know how to evaluate candidates consistently"_
- _"Bad hires are expensive mistakes I can't afford"_
- _"I need professional recruitment tools without enterprise costs"_

### Market Size & Opportunity

**Addressable Market:**

- **Primary:** 15,000+ tech startups with 5-25 employees in North America
- **Secondary:** 45,000+ small businesses actively hiring technical talent
- **Growth:** Market expanding 12% annually as remote work increases talent pool complexity

**Competitive Landscape:**

- **Enterprise Tools:** Lever ($35K+), Greenhouse ($25K+) - too expensive
- **Basic Tools:** JazzHR ($420/month), BambooHR ($99/month) - no AI capabilities
- **Ad-hoc Solutions:** ChatGPT, spreadsheets - inconsistent and time-intensive

**Our Positioning:** Professional AI-powered recruitment for teams who need enterprise capabilities at startup budgets

---

## 🚀 Product Vision & Strategy

### Product Vision

_"Make professional recruitment accessible to every growing business through AI that explains its reasoning and saves time."_

### Strategic Principles

#### 1. MVP-First Approach

Focus ruthlessly on core workflow: Upload CVs → Get ranked matches → Understand reasoning → Make decisions  
**Hypothesis:** If we can't prove value with basic matching, advanced features won't matter

#### 2. Web-First, Mobile-Optimized

Build responsive web application optimized for mobile use rather than native apps  
**Rationale:** Faster development, easier iteration, sufficient for MVP validation

#### 3. Transparent AI from Day One

Users must understand WHY the AI ranked candidates as it did  
**Rationale:** Trust is critical for hiring decisions; black-box recommendations will fail

#### 4. Sustainable Free Tier

Provide genuine value at $0 cost while building toward sustainable business model  
**Rationale:** Reduce adoption friction, prove value before asking for payment

### Competitive Differentiation Matrix

| Feature              | SmartHire MVP | Lever        | JazzHR     | ChatGPT       |
| -------------------- | ------------- | ------------ | ---------- | ------------- |
| **Processing Speed** | <30 seconds   | 2-5 minutes  | Manual     | Varies        |
| **Batch Analysis**   | ✅ 20 CVs     | ✅ Unlimited | ❌ Manual  | ❌ One-by-one |
| **Explainable AI**   | ✅ Detailed   | ❌ Black box | ❌ No AI   | ⚠️ Basic      |
| **Cost**             | **$0**        | $35K/year    | $420/month | $20/month     |
| **Setup Time**       | 5 minutes     | 2-4 weeks    | 1-2 weeks  | Immediate     |

---

## ⭐ Core MVP Features

### Feature Prioritization Framework

**MUST HAVE (MVP Core):**
🎯 AI CV-JD Matching with explanations  
🎯 Batch CV upload and processing  
🎯 Match results with confidence scores  
🎯 Basic job description creation

**SHOULD HAVE (Post-MVP):**  
📋 Advanced filtering and search  
📋 Candidate profile management  
📋 Export capabilities  
📋 Usage analytics dashboard

**COULD HAVE (Future):**
❌ Interview question generation  
❌ Team collaboration features  
❌ Advanced reporting  
❌ Integrations with job boards

### MVP Feature Specifications

#### 1. Intelligent CV-JD Matching 🎯

**User Story:** _"As a technical hiring manager, I want to upload multiple CVs and get them ranked against my job requirements with clear explanations, so I can focus my time on interviewing the most promising candidates."_

**Core Functionality:**

- Upload 5-20 CVs simultaneously (PDF, DOC, DOCX format)
- Create job descriptions using guided template or free-form text
- Process all CVs within 30-second guarantee
- Display results ranked by match percentage (0-100%)
- Show detailed reasoning for each match score

**Acceptance Criteria:**

- ✅ **Processing Speed:** 95% of batches (≤20 CVs) complete within 30 seconds
- ✅ **Match Accuracy:** Display percentage with color coding (Green 80%+, Yellow 60-79%, Red <60%)
- ✅ **Explainable Results:** Show matching skills, missing requirements, and recommendation
- ✅ **Batch Handling:** Process multiple CVs against single job description
- ✅ **Error Handling:** Graceful failures with clear user messaging

**Technical Requirements:**

- Support files up to 5MB per CV
- Extract text from PDFs, Word docs, and scanned images
- Parallel processing to meet speed requirements
- Intelligent caching for duplicate analyses

#### 2. Job Description Builder 📝

**User Story:** _"As a small business owner, I want to create professional job descriptions quickly so I can attract qualified candidates without spending hours on job posting creation."_

**Core Functionality:**

- Template-based job description creation (5 common roles: Developer, Designer, Marketing, Sales, Operations)
- Free-form job description input with guided prompts
- Save and reuse job descriptions for similar roles
- Basic validation to ensure key information is included

**Acceptance Criteria:**

- ✅ **Template Quality:** Professional templates for 5 core roles
- ✅ **Customization:** Easy editing of all template sections
- ✅ **Reusability:** Save descriptions for future use
- ✅ **Validation:** Prompt for missing critical information (skills, experience, etc.)

#### 3. Results Dashboard 📊

**User Story:** _"As a hiring manager, I want to see match results clearly organized so I can quickly identify top candidates and understand the AI's reasoning."_

**Core Functionality:**

- Ranked list of candidates with match percentages
- Expandable details showing matching skills, gaps, and reasoning
- Quick actions: "Interested," "Maybe," "Pass" for each candidate
- Export results as PDF for team sharing

**Acceptance Criteria:**

- ✅ **Clear Ranking:** Candidates sorted by match percentage with visual indicators
- ✅ **Detailed Explanations:** Expandable reasoning for each candidate
- ✅ **Quick Decisions:** Simple interface for marking candidate interest level
- ✅ **Export Capability:** Generate PDF summary for team review

**UI Requirements:**

- Mobile-responsive design (works well on tablets and phones)
- Touch-friendly interface with 44px+ button targets
- Progressive disclosure of information (summary → details on demand)

#### 4. Usage Management 📋

**User Story:** _"As a user, I want to understand my usage limits and system performance so I can manage my hiring workflow effectively within the free tier."_

**Core Functionality:**

- Dashboard showing monthly usage against limits (10 analyses/month free)
- Processing history with timestamps and performance metrics
- Clear indication when approaching limits
- Basic account management (profile, preferences)

**Acceptance Criteria:**

- ✅ **Usage Tracking:** Clear display of current month usage (X/10 analyses)
- ✅ **History:** Previous analyses with basic details and timestamps
- ✅ **Performance:** Show actual processing times for transparency
- ✅ **Account:** Basic profile management and preferences

---

## 🔧 Technical Requirements (Overview)

### Performance Standards

- **Processing Speed:** 95% of CV analyses complete within 30 seconds
- **Page Load Time:** <3 seconds for dashboard and key workflows
- **Mobile Performance:** Responsive design works well on tablets/phones (not native app quality)
- **Availability:** 99% uptime during business hours (9 AM - 6 PM local time)

### Security & Privacy

- **Data Privacy:** GDPR-basic compliance (consent, deletion on request)
- **File Security:** Encrypted storage, automatic deletion after 90 days
- **Access Control:** User-based access with secure authentication
- **Audit Trail:** Basic logging of user actions for debugging

### Scale & Cost Targets (MVP)

- **Concurrent Users:** Handle 25 active users simultaneously
- **Data Storage:** Up to 50 candidates + 10 job descriptions per user
- **Monthly Limits:** 10 CV analyses per user (sustainable within $8/month operational cost)
- **Geographic Scope:** North America initially (English language only)

_Detailed technical specifications available in [Technical Design Document](smarthire_technical_design.md)_

---

## 📈 Success Metrics & Validation

### User Adoption Metrics (Month 3 Targets)

**Acquisition:**

- **Registered Users:** 100+ small business users
- **Monthly Active Users:** 60+ (60% activation rate)
- **Feature Usage:** 90% use CV matching, 70% create multiple job descriptions

**Engagement:**

- **Session Duration:** 12+ minutes average (sufficient for meaningful usage)
- **Return Usage:** 40% of users return within 30 days
- **Completion Rate:** 85% of started analyses complete successfully

### Product Performance Metrics

**Core Functionality:**

- **Processing Speed:** 95% meet 30-second SLA (critical competitive advantage)
- **Match Quality:** 75% of users rate AI explanations as "helpful" or "very helpful"
- **User Satisfaction:** 4.0/5 rating on core matching functionality
- **Error Rate:** <5% of CV uploads fail or produce unusable results

**Business Impact:**

- **Time Savings:** 60%+ reduction in screening time (user survey validation)
- **Decision Confidence:** 70% report increased confidence in candidate selection
- **Process Consistency:** 80% use platform for multiple hiring decisions

### Technical Excellence

**Performance:**

- **Web Vitals:** "Good" scores across desktop and mobile
- **Uptime:** 99%+ availability during business hours
- **Cost Efficiency:** <$10/user/month operational costs including AI processing

**Quality:**

- **Bug Rate:** <2 critical bugs per month in production
- **Security:** Zero security incidents or data breaches
- **Scalability:** Handle 3x user growth without architectural changes

---

## ⚠️ Key Assumptions & Risks

### Critical Assumptions Requiring Validation

#### User Behavior Assumptions

1. **AI Trust:** Small business owners will trust AI recommendations for hiring decisions with proper explanations
   - **Validation:** User testing with explanation UI, feedback surveys
   - **Risk Mitigation:** Extensive user testing, clear disclaimers, human-final-decision messaging

2. **Time Investment:** Users willing to spend 10-15 minutes setting up job descriptions for time savings
   - **Validation:** User interview validation, onboarding flow testing
   - **Risk Mitigation:** Streamlined templates, clear value demonstration

3. **Usage Patterns:** 10 analyses/user/month sufficient for most small business hiring needs
   - **Validation:** Track actual usage patterns, user feedback
   - **Risk Mitigation:** Flexible limit adjustments, upgrade path messaging

#### Technical Assumptions

4. **Processing Speed:** Can consistently achieve <30 second processing with OpenRouter API
   - **Validation:** Load testing, performance monitoring in production
   - **Risk Mitigation:** Parallel processing, fallback to keyword matching, multiple AI providers

5. **Cost Model:** $8/month operational costs sustainable for 100+ users at described usage levels
   - **Validation:** Real usage monitoring, cost tracking dashboard
   - **Risk Mitigation:** Intelligent caching, usage limits, cost optimization strategies

### High-Risk Areas

| Risk                      | Impact | Probability | Mitigation Strategy                                          |
| ------------------------- | ------ | ----------- | ------------------------------------------------------------ |
| **30-second SLA failure** | High   | Medium      | Parallel processing, fallback algorithms, multiple providers |
| **Low user adoption**     | High   | Medium      | Strong onboarding, referral program, user interview insights |
| **AI cost explosion**     | Medium | Low         | Usage limits, intelligent caching, cost monitoring alerts    |
| **Inaccurate matching**   | Medium | Low         | Continuous AI prompt optimization, user feedback loops       |

### Success Dependencies

**External Dependencies:**

- ✅ OpenRouter API reliability and pricing stability
- ✅ Supabase free tier capacity sufficient for user growth
- ✅ File parsing accuracy for various CV formats

**Internal Execution:**

- ✅ Ability to build intuitive explanation UI that users understand
- ✅ Consistent 30-second processing performance
- ✅ Effective user acquisition through organic channels initially

---

## 🎯 Out of MVP Scope

### Features Explicitly Excluded from MVP

**Advanced Features (Future Versions):**

- Interview question generation and templates
- Team collaboration and approval workflows
- Advanced analytics and hiring funnel reporting
- Integration with LinkedIn, Indeed, or other job boards
- Video interview scheduling or management
- Candidate communication automation

**Technical Capabilities (Future Versions):**

- Native mobile applications (iOS/Android)
- Multi-language support beyond English
- Custom AI model training or bias detection
- Advanced security features (SSO, SAML)
- White-label or multi-tenant capabilities

**Why Excluded:** MVP must prove core value proposition (AI-assisted CV screening saves time and improves decisions) before adding complexity. Each excluded feature represents 2-4 weeks of additional development time.

### Scope Boundaries

**Geographic:** North America only (English CVs and job descriptions)
**Company Size:** 1-50 employees (larger organizations likely need enterprise features)  
**Role Types:** Knowledge worker roles (developers, designers, marketers, sales, operations)
**Volume:** Individual hiring managers (not enterprise recruitment teams)

---

## ✅ Definition of Done

### MVP Launch Criteria

**Core Functionality Complete:**

1. ✅ User can upload 5-20 CVs and receive ranked results within 30 seconds
2. ✅ Match explanations are clear and actionable (validated through user testing)
3. ✅ Job description templates work for 5 core role types
4. ✅ Results can be exported as PDF for team sharing
5. ✅ Usage tracking accurately shows limits and consumption

**Quality Standards Met:** 6. ✅ 20 beta users complete full workflow successfully  
7. ✅ Average user satisfaction rating 4.0+ on core features 8. ✅ System handles 25 concurrent users without performance degradation 9. ✅ 95% of analyses complete within 30-second SLA 10. ✅ <5% file upload failure rate across supported formats

**Business Requirements:** 11. ✅ GDPR-basic compliance implemented (consent, deletion requests) 12. ✅ Cost tracking confirms <$10/user/month operational expenses 13. ✅ Legal review completed for terms of service and privacy policy

### Success Validation

**Month 1 Post-Launch:**

- 25+ registered users with 15+ monthly active users
- 4.0+ average rating on core matching functionality
- 60%+ of users report time savings in screening process

**Month 3 Post-Launch:**

- 75+ registered users with 45+ monthly active users
- 65% reduction in screening time (user survey validation)
- 70% of users have completed multiple hiring workflows

---

## 📋 Next Steps & Implementation

### Week 1: Scope Finalization

- **Tuesday:** Engineering review of technical requirements and 30-second SLA feasibility
- **Wednesday:** Design review of explainable AI interface mockups
- **Thursday:** Stakeholder alignment on MVP scope and timeline (12-16 weeks)
- **Friday:** Final PRD approval and handoff to technical design phase

### Week 2-3: Technical Design

- Create detailed [Technical Design Document](smarthire_technical_design.md)
- Prototype AI processing pipeline for speed validation
- Design database schema and API specifications
- Plan deployment and monitoring infrastructure

### Week 4: Development Sprint Planning

- Break MVP into 2-week development sprints
- Identify critical path items for 30-second processing guarantee
- Set up development environment and CI/CD pipeline
- Begin with user authentication and file upload functionality

---

## 🔗 Related Documentation

- **[Technical Design Document](smarthire_technical_design.md)** - Architecture, APIs, database design
- **[Implementation Plan](smarthire_implementation_plan.md)** - Timeline, resources, milestones
- **[Future Roadmap](smarthire_roadmap.md)** - Post-MVP features and growth strategy
- **User Research Summary** - Interview insights and persona validation _(to be created)_

---

_This PRD focuses exclusively on MVP scope and core value validation. Technical implementation details are covered in the Technical Design Document. Timeline and resource planning covered in Implementation Plan._

**Document Status:** Ready for stakeholder review and technical design phase  
**Next Review:** After technical design completion (Week 3)
