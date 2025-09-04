# SmartHire AI: Complete UI/UX Design Guide with AI Prompts
*Based on 2025 Recruitment Platform & B2B SaaS UX Research*

## 🎨 Sally's Research-Driven Design Strategy

### Design Philosophy: AI-Transparent B2B SaaS

**Primary Design Direction: "Professional AI-First Recruitment with Human Trust"**

Based on comprehensive research of 2025 UX trends, our design philosophy centers on:
- **AI Transparency**: Users see exactly how AI makes decisions with percentage scores and reasoning
- **Small Business Professional**: Enterprise-grade features with SMB-friendly interfaces  
- **Processing-Centric**: Real-time feedback during the critical 30-second AI processing window
- **Data-Dense but Digestible**: Dashboard-style information architecture for recruitment workflows

### Core Design System Specifications

**Color Palette (Research-Based)**
```
Primary Colors:
- Brand Blue: #2563eb (Professional B2B trust)
- Success Green: #16a34a (High match scores 80%+)
- Warning Amber: #f59e0b (Medium matches 60-79%)
- Error Red: #dc2626 (Low matches <60%)

Supporting Colors:
- Cool Gray 900: #111827 (Headers, primary text)
- Cool Gray 600: #475569 (Secondary text)
- Cool Gray 100: #f1f5f9 (Background surfaces)
- Pure White: #ffffff (Card backgrounds)

Semantic Colors:
- Processing Blue: #3b82f6 (AI analysis in progress)
- Success Background: #dcfce7 (Completed processes)
- Warning Background: #fef3c7 (Pending actions)
```

**Typography Scale**
```
Display: 3.5rem (56px) - Hero sections
Heading 1: 2.25rem (36px) - Page titles
Heading 2: 1.875rem (30px) - Section headers
Heading 3: 1.5rem (24px) - Card titles
Body Large: 1.125rem (18px) - Primary content
Body: 1rem (16px) - Standard text
Small: 0.875rem (14px) - Metadata
Caption: 0.75rem (12px) - Helper text
```

**Spacing System (8px Grid)**
```
xs: 4px    (0.5rem)  - Icon spacing
sm: 8px    (1rem)    - Component padding
md: 16px   (2rem)    - Card spacing
lg: 24px   (3rem)    - Section spacing
xl: 32px   (4rem)    - Page spacing
2xl: 48px  (6rem)    - Layout spacing
3xl: 64px  (8rem)    - Hero spacing
```

### Global Design Keywords for AI Tools

**Use these EXACT keywords when prompting v0, Lovable, or other AI design tools:**

```
MASTER PROMPT KEYWORDS:
"Modern B2B SaaS recruitment platform with AI-transparent design, professional blue (#2563eb) primary color, success green (#16a34a) for matches, clean card-based layout, dashboard-style information display, small business friendly interface, percentage-based visual scoring, real-time AI processing indicators, explainable AI results sections, document upload interfaces, candidate pipeline management, shadcn/ui components, professional typography, accessibility-compliant design"

STYLE MODIFIERS:
- Clean professional recruitment interface
- AI decision transparency focus
- Small business workflow optimization  
- Document-heavy application design
- Progress-oriented user experience
- Trust-building interface elements
- Dashboard-style data presentation
- Percentage-based visual feedback

COMPONENT STYLES:
- Card-based content organization
- Clean shadcn/ui design system
- Professional B2B color scheme
- Rounded corners (8px radius)
- Subtle drop shadows
- Icon-driven navigation
- Progress indicators everywhere
- Explainable AI sections
```

---

## Complete Screen Architecture: 47 Screens with AI Prompts

### A. Authentication Flow (4 Screens)

#### Screen 1: Landing Page
**Purpose**: Hero + features showcase to convert visitors
**AI Design Prompt**:
```
Create a modern B2B SaaS landing page for "SmartHire AI" recruitment platform. Design a hero section with headline "Professional recruitment platform that makes hiring decisions smarter, faster, and completely free" and subheading about AI-powered CV matching in 30 seconds. Include feature cards showing "AI CV Matching", "Interview Question Generation", and "Zero Cost Operation". Use professional blue (#2563eb) primary color, clean card-based layout, and call-to-action buttons. Add testimonial section and pricing tiers. Make it feel premium but accessible to small businesses.
```

#### Screen 2: Login Screen  
**Purpose**: User authentication with professional appearance
**AI Design Prompt**:
```
Design a clean B2B SaaS login screen using shadcn/ui style components. Center-aligned form with email and password fields, "Remember me" checkbox, "Forgot password?" link, and primary login button. Include company logo, clean typography, and subtle background pattern. Use professional blue (#2563eb) for primary elements. Add "Don't have an account? Sign up" link at bottom. Make it feel trustworthy for HR professionals and small business owners.
```

#### Screen 3: Registration Screen
**Purpose**: Simple signup optimized for business users  
**AI Design Prompt**:
```
Create a professional B2B SaaS registration form for SmartHire AI. Include fields for Full Name, Email, Company Name, and Password with strength indicator. Use clean shadcn/ui form components with proper validation states. Add terms of service checkbox and privacy policy link. Include social proof elements like "Join 1000+ companies" and feature highlights during signup. Use card-based layout with professional blue (#2563eb) primary button. Make onboarding feel quick and business-focused.
```

#### Screen 4: Password Reset
**Purpose**: Email-based recovery with clear steps
**AI Design Prompt**:
```
Design a password reset flow screen for B2B SaaS platform. Show email input field with clear instructions "Enter your email address and we'll send you a password reset link". Include back to login link, clean form validation, and success state showing "Check your email for reset instructions". Use minimal, professional design with shadcn/ui components. Add helpful text about checking spam folder and expected email delivery time.
```

### B. Onboarding Sequence (5 Screens)

#### Screen 5: Welcome Screen  
**Purpose**: Account setup confirmation and next steps
**AI Design Prompt**:
```
Create a welcoming B2B SaaS onboarding screen for SmartHire AI. Show "Welcome to SmartHire AI" with user's name, checkmark icon indicating successful registration. Include progress indicator showing "Step 1 of 4" and overview of setup process: "Company Profile → First Job Description → Upload CV → First AI Match". Use card-based layout with professional blue accents and encouraging copy about getting started with AI-powered recruitment. Add "Continue Setup" primary button.
```

#### Screen 6: Company Profile Setup
**Purpose**: Gather business context for better AI matching  
**AI Design Prompt**:
```
Design a company profile setup form for recruitment platform. Include fields for Company Size (dropdown: 1-10, 11-50, 51-200, 200+ employees), Industry (searchable dropdown), and Company Description (textarea). Use clean form design with shadcn/ui components. Add progress indicator showing "Step 2 of 4" and helpful text explaining how this information helps improve AI matching accuracy. Include skip option and primary "Save & Continue" button. Make it feel quick and optional.
```

#### Screen 7: First Job Description Upload
**Purpose**: Guided JD creation to demonstrate core feature
**AI Design Prompt**:
```
Create a guided job description creation interface for recruitment platform onboarding. Show large upload area with drag-and-drop functionality for PDF/Word files, plus manual entry option with fields for Job Title, Company, Description, and Required Skills. Include helpful examples and tooltips. Use progress indicator "Step 3 of 4" and encouraging copy about creating your first job description. Add file format indicators (PDF, DOC, TXT supported) and preview area. Use professional blue (#2563eb) for primary elements.
```

#### Screen 8: First CV Upload  
**Purpose**: Tutorial for core CV processing workflow
**AI Design Prompt**:
```
Design a CV upload tutorial screen showing drag-and-drop interface with visual feedback. Include batch upload capability with progress indicators, supported file formats (PDF, Word, images), and file size limits. Show preview thumbnails and automatic text extraction preview. Add progress indicator "Step 4 of 4" with encouraging copy about uploading candidate CVs. Include helpful tips about batch processing and automatic skill extraction. Use card-based layout with success green (#16a34a) for completed uploads.
```

#### Screen 9: First AI Match Demo
**Purpose**: Demonstrate platform capabilities and value  
**AI Design Prompt**:
```
Create an AI matching demo screen showing first CV-to-job match analysis. Display percentage match score (e.g., 87%) with color-coded visualization, matching skills list with checkmarks, missing skills with warning indicators, and AI reasoning section explaining "Why this is a strong match". Include "Generate Interview Questions" button and "Save This Match" option. Use success green (#16a34a) for high match percentage and clear call-to-action to continue exploring the platform.
```

### C. Main Dashboard (3 Screens)

#### Screen 10: Dashboard Home
**Purpose**: Overview with key metrics and quick actions
**AI Design Prompt**:
```
Design a B2B SaaS recruitment dashboard homepage with key metrics cards showing: Total CVs (42), Active Jobs (8), This Week's Matches (23), and Interview Questions Generated (156). Include recent activity feed, quick action buttons for "Upload CV", "Create Job", and "Run Match". Use card-based layout with clean data visualization. Add progress bars for API usage limits and recent matches list with percentage scores. Use professional blue (#2563eb) for primary elements and dashboard-style information display suitable for HR managers.
```

#### Screen 11: Activity Feed
**Purpose**: Recent actions and notifications timeline  
**AI Design Prompt**:
```
Create an activity feed interface for recruitment platform showing chronological timeline of recent actions. Include entries like "CV uploaded: John Smith - Software Developer", "New match: 89% compatibility with Frontend Role", "Interview questions generated for Senior Designer position". Use clean timeline design with icons for different action types, timestamps, and clickable entries leading to detailed views. Include filtering options and mark as read functionality. Use subtle gray backgrounds and professional typography.
```

#### Screen 12: Quick Actions Panel
**Purpose**: Fast access to common recruitment tasks
**AI Design Prompt**:
```
Design a quick actions floating panel or sidebar for recruitment platform. Include large action buttons for: "Upload New CV" (with upload icon), "Create Job Description" (with document icon), "Run AI Match" (with AI/brain icon), "Generate Questions" (with question mark icon). Use card-based design with hover effects and keyboard shortcuts indicators. Make buttons prominent with professional blue (#2563eb) backgrounds and clear iconography suitable for daily workflow efficiency.
```

### D. Job Description Management (6 Screens)

#### Screen 13: JD List View  
**Purpose**: All job descriptions with search and filters
**AI Design Prompt**:
```
Create a job descriptions list view for recruitment platform using table/card hybrid layout. Show job cards with Title, Company, Posted Date, Status (Active/Closed), and Match Count. Include search bar, filters for status/department/date, and sorting options. Use shadcn/ui table components with pagination. Add "Create New Job" button and batch actions. Display job posting status with color-coded badges and quick action buttons (Edit, Duplicate, Archive) on each row. Use clean professional styling.
```

#### Screen 14: JD Detail View
**Purpose**: Complete job description display with metadata  
**AI Design Prompt**:
```
Design a detailed job description view showing full job posting with sections for Overview, Requirements, Responsibilities, and Skills. Include metadata panel showing Created Date, Status, View Count, and Application Count. Add action buttons for Edit, Duplicate, Archive, and "Find Matches". Show related matches section with candidate previews. Use clean typography hierarchy with professional styling and card-based sections. Include breadcrumb navigation and back to list option.
```

#### Screen 15: Create New JD
**Purpose**: Step-by-step job description builder
**AI Design Prompt**:
```
Create a step-by-step job description builder with progress indicator showing steps: Basic Info, Requirements, Skills, Review. Include form fields for Job Title, Company, Department, Employment Type, Salary Range, Location, and Description (rich text editor). Add AI-powered suggestions for skills and requirements based on job title. Use clean form design with validation states, helpful tooltips, and auto-save functionality. Include template options and preview mode.
```

#### Screen 16: Edit JD  
**Purpose**: Inline editing with change tracking
**AI Design Prompt**:
```
Design an inline job description editor showing original vs modified content with change tracking highlights. Include sidebar showing edit history, unsaved changes indicator, and revert options. Use form components with clear validation states and auto-save confirmation. Add collaboration features showing who made recent changes. Include preview mode toggle and publish/save draft options. Make editing feel safe and trackable for HR teams.
```

#### Screen 17: JD Upload
**Purpose**: File upload with intelligent parsing
**AI Design Prompt**:
```
Create a job description upload interface with large drag-and-drop zone supporting PDF, Word, and text files. Show upload progress with file parsing status, automatic text extraction preview, and editable extracted fields. Include batch upload capability and duplicate detection warnings. Use progress indicators for processing stages: Upload → Parse → Extract → Review. Add manual cleanup options for extracted data and template matching suggestions.
```

#### Screen 18: JD Templates  
**Purpose**: Pre-built templates for common roles
**AI Design Prompt**:
```
Design a job description templates library showing categorized template cards (Engineering, Marketing, Sales, Design, Operations). Include template previews, usage statistics, and customization options. Show template cards with role title, description preview, and "Use This Template" button. Add search functionality, industry filters, and recently used templates section. Include option to save custom templates and share with team members.
```

### E. Candidate Management (8 Screens)

#### Screen 19: Candidates List
**Purpose**: Comprehensive candidate database with search
**AI Design Prompt**:
```
Create a candidates list view using advanced data table with columns for Name, Email, Skills, Experience, Upload Date, and Match Score (if available). Include powerful search and filtering options for skills, experience level, location, and application date. Add bulk selection capabilities for batch operations. Use shadcn/ui table components with sorting, pagination, and row actions (View, Edit, Archive). Include candidate avatars, skill tags, and quick match indicators.
```

#### Screen 20: Candidate Profile
**Purpose**: Detailed candidate information and history
**AI Design Prompt**:
```
Design a comprehensive candidate profile page with sections for Personal Info, Professional Summary, Skills, Work Experience, Education, and Match History. Include CV viewer panel, notes section for internal comments, and timeline of interactions. Add action buttons for "Generate Interview Questions", "Find Similar Candidates", and "Add to Shortlist". Use clean layout with professional typography and easy navigation between profile sections.
```

#### Screen 21: CV Upload  
**Purpose**: Drag-and-drop with batch processing support
**AI Design Prompt**:
```
Create a CV upload interface with large drag-and-drop zone supporting batch uploads of up to 10 files simultaneously. Show individual upload progress bars, file type validation (PDF, Word, images), and processing status for each file. Include automatic text extraction preview and skill detection results. Add retry options for failed uploads and duplicate candidate detection warnings. Use progress indicators and success/error states with clear messaging.
```

#### Screen 22: CV Viewer
**Purpose**: PDF/document viewer with annotation tools  
**AI Design Prompt**:
```
Design a CV viewer interface showing PDF/document in main panel with annotation tools sidebar. Include zoom controls, page navigation, text highlighting for skills/experience, and note-taking functionality. Add extracted information overlay showing detected skills, contact info, and experience summary. Include print and download options, plus integration with matching and question generation features. Use clean document viewer design with professional tools.
```

#### Screen 23: Candidate Compare
**Purpose**: Side-by-side candidate comparison
**AI Design Prompt**:
```
Create a candidate comparison interface showing up to 3 candidates side-by-side with key information: photo, contact info, skills matrix, experience level, education, and match scores for different positions. Include interactive elements for expanding sections, adding notes, and marking preferences. Use clean columnar layout with clear visual hierarchy and color-coding for strengths/weaknesses comparison. Add export and sharing options.
```

#### Screen 24: Candidate Notes
**Purpose**: Internal team notes and candidate tags  
**AI Design Prompt**:
```
Design a candidate notes and tagging system showing chronological notes feed with author attribution and timestamps. Include rich text editor for adding new notes, tag management interface with custom and predefined tags (e.g., "Phone Screened", "Technical Interview", "Culture Fit"). Add note sharing and privacy controls, plus integration with calendar for interview scheduling. Use clean commenting interface similar to modern collaboration tools.
```

#### Screen 25: Candidate History
**Purpose**: Application and interaction timeline  
**AI Design Prompt**:
```
Create a candidate interaction timeline showing all touchpoints: application date, CV updates, interview scheduling, feedback notes, match results, and status changes. Use vertical timeline layout with clear date stamps, action types, and involved team members. Include filtering options for activity types and date ranges. Add quick action buttons for next steps and integration with interview scheduling and feedback collection.
```

#### Screen 26: Bulk Import  
**Purpose**: CSV/Excel candidate import with mapping
**AI Design Prompt**:
```
Design a bulk candidate import interface showing upload area for CSV/Excel files, column mapping interface matching import columns to candidate fields, and data preview table. Include validation results showing successful imports vs errors, duplicate detection, and cleanup suggestions. Add import progress tracking and rollback options. Use step-by-step wizard design with clear error handling and data transformation options.
```

### F. AI Matching System (7 Screens)

#### Screen 27: Matching Dashboard
**Purpose**: Match overview and processing queue  
**AI Design Prompt**:
```
Create an AI matching dashboard showing match statistics: total matches run, average processing time, success rate, and daily usage limits. Include active processing queue with real-time updates, recent matches with percentage scores, and trending job-candidate combinations. Add quick match initiation and batch processing options. Use card-based layout with data visualizations and professional blue (#2563eb) for AI-related elements.
```

#### Screen 28: Run New Match  
**Purpose**: CV-to-JD matching interface with real-time progress
**AI Design Prompt**:
```
Design the core matching interface with dropdown selectors for choosing CV and Job Description, "Analyze Match" button, and real-time processing display. Show 30-second countdown timer, processing status messages ("Analyzing skills compatibility...", "Evaluating experience alignment...", "Calculating culture fit..."), and progress bar. Include cancel option and estimated completion time. Use engaging animations and professional blue (#2563eb) for processing states.
```

#### Screen 29: Match Results
**Purpose**: Detailed AI analysis with explainable results
**AI Design Prompt**:
```
Create a comprehensive match results page showing large percentage score (e.g., 87%) with color-coded background (green for high, amber for medium, red for low). Include sections for Matching Skills (checkmark list), Missing Skills (warning icons), Strengths analysis, Concerns/Gaps, and AI Reasoning explaining the score. Add action buttons for "Generate Interview Questions", "Save Match", and "Find Similar Candidates". Use clean data visualization with explainable AI focus.
```

#### Screen 30: Batch Matching
**Purpose**: Multiple CVs against single job description  
**AI Design Prompt**:
```
Design batch matching interface showing job description selector at top and candidate selection area with multi-select table. Include processing queue showing match progress for each candidate with individual progress bars and estimated completion times. Display results in ranked list format with percentage scores and quick comparison options. Add bulk actions for saving matches and generating interview questions for top candidates.
```

#### Screen 31: Match History
**Purpose**: Previous matches with search and trends
**AI Design Prompt**:
```
Create match history view using filterable table showing Date, Candidate, Job Position, Match Score, and Status columns. Include search functionality, date range filtering, and score range sliders. Add trending analysis showing match score distributions, most successful combinations, and performance over time. Use data visualization with charts showing matching patterns and success metrics for continuous improvement insights.
```

#### Screen 32: Match Comparison  
**Purpose**: Compare multiple match results
**AI Design Prompt**:
```
Design a match comparison interface showing up to 3 matches side-by-side with key metrics: percentage scores, matching skills overlap, unique strengths, and AI reasoning summaries. Include interactive elements for expanding detailed analysis and marking preferred matches. Use clean columnar layout with color-coded comparisons and export options for decision-making documentation. Add notes functionality for team collaboration.
```

#### Screen 33: AI Explanations
**Purpose**: Detailed AI reasoning and transparency  
**AI Design Prompt**:
```
Create an AI transparency page showing detailed explanation of matching algorithm: skill weighting methodology, experience level calculations, cultural fit indicators, and confidence scores. Include expandable sections for each analysis component, visual representations of decision factors, and feedback options for improving accuracy. Use educational design approach with clear explanations suitable for HR professionals who need to understand AI decision-making.
```

### G. Interview Questions (6 Screens)

#### Screen 34: Questions Dashboard
**Purpose**: Generated questions overview and management
**AI Design Prompt**:
```
Design an interview questions dashboard showing question bank statistics: total questions generated, categories breakdown (Technical, Behavioral, Situational), difficulty levels, and usage analytics. Include recent question sets, favorite questions collection, and quick generation options. Add question effectiveness tracking and team sharing features. Use card-based layout with question preview capabilities and search functionality.
```

#### Screen 35: Generate Questions  
**Purpose**: AI-powered question creation with customization
**AI Design Prompt**:
```
Create an AI question generation interface with options for Question Type (Technical, Behavioral, Situational), Difficulty Level (Junior, Mid, Senior), Topic/Skills focus, and Number of Questions. Include real-time generation with progress indicator, preview of generated questions, and customization options. Add regeneration capabilities and manual editing features. Show estimated interview time and question quality indicators with export options.
```

#### Screen 36: Question Bank
**Purpose**: Organized collection of all questions  
**AI Design Prompt**:
```
Design a question bank interface using categorized card layout showing questions organized by Type, Difficulty, and Topic. Include search functionality, filtering options, and tagging system. Show question cards with preview text, usage statistics, effectiveness ratings, and quick actions (Edit, Duplicate, Delete). Add folder organization, sharing capabilities, and import/export options for team collaboration and question management.
```

#### Screen 37: Question Templates  
**Purpose**: Role-based question sets for consistency
**AI Design Prompt**:
```
Create a question templates library showing pre-built question sets for common roles (Software Developer, Marketing Manager, Sales Representative, etc.). Include template cards with role description, question count, estimated interview time, and "Use This Template" buttons. Add customization options, template effectiveness metrics, and option to create custom templates. Show template previews and sharing capabilities for team standardization.
```

#### Screen 38: Question Editor
**Purpose**: Manual question creation and editing tools  
**AI Design Prompt**:
```
Design a question editor interface with rich text editor for question text, expected answer guidelines, follow-up questions suggestions, and evaluation criteria fields. Include difficulty level selector, category tagging, and skill association options. Add preview mode, collaboration features for team review, and version history tracking. Use clean form design with auto-save functionality and validation states.
```

#### Screen 39: Interview Preparation
**Purpose**: Print-ready question sets with interviewer guidance
**AI Design Prompt**:
```
Create an interview preparation page showing selected questions in print-ready format with interviewer instructions, scoring rubrics, and note-taking areas. Include customization options for question order, formatting preferences, and additional materials. Add PDF generation, interview timing guidelines, and candidate evaluation forms. Design for professional printing with clean typography and adequate spacing for handwritten notes.
```

### H. Settings & Administration (5 Screens)

#### Screen 40: User Profile
**Purpose**: Personal account and preference management  
**AI Design Prompt**:
```
Design a user profile settings page with sections for Personal Information (name, email, photo), Account Preferences (notifications, language, timezone), Security Settings (password change, 2FA), and Usage Statistics (API calls, storage used). Include profile photo upload, account deletion option, and data export functionality. Use clean form design with proper validation states and privacy controls suitable for business users.
```

#### Screen 41: Company Settings
**Purpose**: Organization-wide preferences and branding  
**AI Design Prompt**:
```
Create company settings interface showing Organization Details (company name, logo, industry), Team Management (user invitations, role assignments), Branding Options (color scheme, logo placement), and Integration Settings (email signatures, calendar connections). Include team member list with permission management and billing information access. Use professional layout suitable for admin users with proper permission controls.
```

#### Screen 42: API Usage  
**Purpose**: Usage tracking and limits monitoring
**AI Design Prompt**:
```
Design API usage dashboard showing current usage vs limits with visual progress bars for CV Processing (45/100), Question Generation (123/500), and Storage Used (2.1GB/5GB). Include usage history charts, monthly trends, and upgrade prompts when approaching limits. Add cost breakdown, usage optimization suggestions, and alert settings for limit notifications. Use data visualization with clear limit indicators and professional styling.
```

#### Screen 43: Integrations
**Purpose**: Third-party connections and API access  
**AI Design Prompt**:
```
Create integrations page showing available connections: Email Providers (Gmail, Outlook), Calendar Systems (Google Calendar, Outlook Calendar), Job Boards (LinkedIn, Indeed), and ATS Systems (future). Include connection status indicators, setup instructions, and disconnection options. Add API key management section and webhook configuration for developers. Use card-based layout with clear setup workflows and troubleshooting guides.
```

#### Screen 44: Billing (Future)
**Purpose**: Subscription management and usage-based billing  
**AI Design Prompt**:
```
Design billing and subscription page showing current plan details (Free/Pro/Enterprise), usage-based charges breakdown, payment method management, and billing history. Include upgrade/downgrade options, usage forecasting, and cost optimization suggestions. Add invoice downloads, billing alerts, and payment failure notifications. Use clean financial interface with clear pricing tiers and transparent cost calculations suitable for business decision-makers.
```

### I. Mobile Responsive Views (3 Screens)

#### Screen 45: Mobile Dashboard  
**Purpose**: Touch-optimized overview for mobile users
**AI Design Prompt**:
```
Create a mobile-optimized dashboard for recruitment platform with key metrics cards arranged in single column, swipeable recent activity section, and prominent action buttons for Upload CV and Create Match. Include collapsible navigation menu, quick search functionality, and finger-friendly touch targets. Use card-based design optimized for mobile screens with clear typography and adequate spacing for thumb navigation. Prioritize most important actions for mobile workflow.
```

#### Screen 46: Mobile CV Review
**Purpose**: Swipeable candidate evaluation interface  
**AI Design Prompt**:
```
Design mobile CV review interface with full-screen candidate cards supporting swipe gestures (left/right for next/previous, up for details). Show candidate photo, key skills, match percentage, and quick action buttons (Save, Interview, Reject). Include pull-to-refresh functionality and smooth transitions between candidates. Use mobile-native interaction patterns with clear visual feedback and optimized performance for rapid candidate screening on-the-go.
```

#### Screen 47: Mobile Quick Match
**Purpose**: Simplified matching for mobile users  
**AI Design Prompt**:
```
Create simplified mobile matching interface with streamlined dropdowns for CV and Job selection, large "Analyze Match" button, and mobile-optimized progress indicator. Show processing status with appropriate mobile animations and haptic feedback. Display results in mobile-friendly format with swipeable sections for different analysis components. Include quick actions suitable for mobile usage and easy sharing of results via mobile platforms.
```

---

## Advanced Design Patterns & Components

### AI Processing States
**Real-time Progress Indicators**
```
PROCESSING STATES:
1. Idle: "Ready to analyze" with upload icons
2. Processing: "Analyzing..." with animated spinner (30s countdown)
3. Success: "Analysis complete" with checkmark and results
4. Error: "Analysis failed" with retry option and error explanation
```

### Data Visualization Patterns  
**Match Score Displays**
```
HIGH MATCH (80%+): Success green background with checkmark
MEDIUM MATCH (60-79%): Warning amber background with caution icon
LOW MATCH (<60%): Error red background with X icon
```

### Loading States & Empty States
**Empty State Messages**
```
No CVs: "Upload your first CV to get started with AI matching"
No Jobs: "Create a job description to find the perfect candidates"  
No Matches: "Run your first AI match to see compatibility scores"
```

### Accessibility & Performance Standards

**WCAG 2.1 AA Compliance**
- All interactive elements have 44px minimum touch targets
- Color contrast ratios meet 4.5:1 minimum standards
- Full keyboard navigation support throughout
- Screen reader compatibility with proper ARIA labels
- Focus indicators on all interactive elements

**Performance Targets**
- Initial page load: <2 seconds
- File upload feedback: <500ms
- AI processing initiation: <3 seconds  
- Screen transitions: <300ms
- Mobile touch response: <100ms

**Responsive Breakpoints**
```
Mobile: 320px - 767px (Touch-first design)
Tablet: 768px - 1023px (Hybrid interactions)  
Desktop: 1024px+ (Mouse/keyboard optimized)
Large Desktop: 1440px+ (Multi-panel layouts)
```

---

## Implementation Priority & Phasing

### Phase 1: Core Workflow (Weeks 1-2)
Screens 1, 2, 3, 10, 15, 21, 28, 29
*Essential user journey from signup to first match*

### Phase 2: Complete Features (Weeks 3-4)  
Screens 13-20, 27, 30-33, 34-36
*Full candidate and job management with AI features*

### Phase 3: Advanced Features (Weeks 5-6)
Screens 37-44, 45-47
*Templates, settings, and mobile optimization*

This comprehensive design guide provides specific, research-based prompts for creating a cohesive, professional recruitment platform that leverages AI transparency and modern B2B SaaS design patterns while maintaining accessibility and performance standards throughout.