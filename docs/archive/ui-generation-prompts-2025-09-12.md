# SmartHire AI - Enhanced UI Generation Prompts

**Document Purpose**: Tech-stack aligned AI design prompts for SuperDesign extension and Lovable.dev  
**Target Tools**: SuperDesign, Lovable.dev, v0.dev  
**Created**: 2025-01-07  
**Tech Stack Version**: Next.js 14 + TypeScript + Tailwind CSS v4 + shadcn/ui

---

## 🎯 Technical Stack Specification

**Core Technologies**:

- **Framework**: Next.js 14 with App Router and TypeScript strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Database**: Supabase PostgreSQL with pgvector for semantic search
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **Storage**: Supabase Storage for file uploads
- **State Management**: React Server Components + Server Actions
- **PWA**: Progressive Web App with offline capabilities

**Design System**:

```css
/* Primary Colors */
--brand-blue: #2563eb;
--success-green: #16a34a;
--warning-amber: #f59e0b;
--error-red: #dc2626;

/* Supporting Colors */
--cool-gray-900: #111827;
--cool-gray-600: #475569;
--cool-gray-100: #f1f5f9;
--pure-white: #ffffff;
```

**Component Requirements**:

- Mobile-first responsive design (min-width breakpoints)
- WCAG 2.1 AA accessibility compliance
- Touch-friendly targets (min 44px)
- Progressive Web App patterns
- Server Action integration for form handling

---

## 📱 Enhanced AI Design Prompts by Category

### A. Authentication & Landing (4 Screens)

#### Screen 1: Landing Page

```
Create a modern B2B SaaS landing page for "SmartHire AI" recruitment platform using Next.js 14 App Router with TypeScript. Design a hero section with headline "Professional recruitment platform that makes hiring decisions smarter, faster, and completely free" and subheading about AI-powered CV matching in 30 seconds.

TECHNICAL REQUIREMENTS:
- Use shadcn/ui components: Button, Card, Badge, Container
- Implement Tailwind CSS v4 with custom properties
- Mobile-first responsive design with breakpoints: sm:768px, md:1024px, lg:1280px
- PWA-ready with proper meta tags and manifest integration
- Server Components for static content, Client Components for interactive elements

COMPONENT STRUCTURE:
- Hero section with gradient background using Tailwind v4 syntax
- Feature cards showing "AI CV Matching", "Batch Processing", "Zero Cost Operation"
- Testimonial section with shadcn/ui Card components
- CTA buttons using shadcn/ui Button with proper loading states
- TypeScript interfaces for all props and data structures

STYLING SPECIFICATIONS:
- Primary color: #2563eb (brand-blue)
- Success indicators: #16a34a (success-green)
- Typography: Inter font family with proper font-display: swap
- Card shadows: Tailwind v4 shadow utilities
- Hover effects: Transform and transition utilities
- Accessibility: Focus rings, proper heading hierarchy, alt text

PERFORMANCE REQUIREMENTS:
- Lazy load images with Next.js Image component
- Core Web Vitals optimized (LCP <2.5s, FID <100ms, CLS <0.1)
- Progressive enhancement for JavaScript-disabled users
- SEO optimized with proper meta tags and structured data
```

#### Screen 2: Login Screen

```
Design a clean B2B SaaS login screen using Next.js 14 App Router with TypeScript and shadcn/ui components. Center-aligned authentication form with Supabase Auth integration.

TECHNICAL REQUIREMENTS:
- Use shadcn/ui components: Form, Input, Button, Card, Label
- Implement form handling with Server Actions
- Supabase Auth integration with proper error handling
- TypeScript strict mode with proper type definitions
- Mobile-first responsive design with touch-friendly inputs

COMPONENT STRUCTURE:
interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

AUTHENTICATION FLOW:
- Server Action for form submission with validation
- Supabase signInWithPassword integration
- Error states with proper error boundaries
- Loading states during authentication
- Redirect handling after successful login

STYLING SPECIFICATIONS:
- shadcn/ui form components with proper validation styling
- Professional blue (#2563eb) for primary elements
- Input focus states with proper contrast ratios
- Card component with subtle shadow and border radius
- Responsive padding and spacing using Tailwind v4 spacing scale

ACCESSIBILITY REQUIREMENTS:
- ARIA labels for all form elements
- Proper form validation messages
- Keyboard navigation support
- Screen reader compatible error announcements
- Focus management during state changes

PWA CONSIDERATIONS:
- Works offline with cached authentication state
- Proper meta tags for mobile app appearance
- Touch-optimized button sizes (min 44px height)
```

#### Screen 3: Registration Screen

```
Create a professional B2B SaaS registration form for SmartHire AI using Next.js 14 App Router, TypeScript, and Supabase Auth integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Form, Input, Button, Card, Checkbox, Select
- Server Actions for form submission and validation
- Supabase Auth signUp with email confirmation
- TypeScript interfaces for user registration data
- Real-time form validation with React Hook Form integration

COMPONENT STRUCTURE:
interface RegisterFormData {
  fullName: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  companySize?: string;
}

FORM FEATURES:
- Password strength indicator with visual feedback
- Email format validation with real-time feedback
- Company size dropdown with predefined options
- Terms of service checkbox with proper legal language
- Social proof elements: "Join 1000+ companies using AI for recruitment"

SUPABASE INTEGRATION:
- User profile creation in users table with RLS policies
- Email confirmation flow with proper redirect handling
- Error handling for duplicate email addresses
- Company profile initialization with default values

STYLING SPECIFICATIONS:
- Card-based layout with professional styling
- Primary button using brand-blue (#2563eb)
- Form validation states with appropriate colors
- Progress indicators for multi-step registration
- Responsive design with proper mobile form layouts

ACCESSIBILITY & UX:
- Form labels properly associated with inputs
- Error messages announced to screen readers
- Logical tab order for keyboard navigation
- Password visibility toggle with proper ARIA states
- Success states with clear next steps
```

#### Screen 4: Password Reset

```
Design a password reset flow screen for B2B SaaS platform using Next.js 14 App Router with Supabase Auth integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Form, Input, Button, Card, Alert
- Server Actions for password reset request
- Supabase Auth resetPasswordForEmail integration
- TypeScript interface for email validation
- Multi-step flow with proper state management

COMPONENT STRUCTURE:
interface PasswordResetState {
  step: 'email' | 'sent' | 'reset' | 'success';
  email: string;
  isLoading: boolean;
  error?: string;
}

FLOW IMPLEMENTATION:
1. Email input with validation
2. Success state showing email confirmation
3. Password reset form (when accessed via email link)
4. Final success confirmation

SUPABASE INTEGRATION:
- resetPasswordForEmail with proper redirect URL
- Handle email confirmation callbacks
- Update password with new credentials
- Proper error handling for expired tokens

STYLING SPECIFICATIONS:
- Minimal, professional design with shadcn/ui components
- Clear instructions and helpful messaging
- Success states with checkmark icons
- Loading states with proper spinner components
- Back to login navigation with proper routing

UX ENHANCEMENTS:
- Helpful text about checking spam folder
- Expected delivery time indication (2-5 minutes)
- Clear error messages with actionable solutions
- Mobile-optimized form layouts
- Progressive disclosure of information
```

### B. Onboarding Sequence (5 Screens)

#### Screen 5: Welcome Screen

```
Create a welcoming B2B SaaS onboarding screen for SmartHire AI using Next.js 14 App Router with TypeScript and progressive onboarding flow.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Progress, Badge
- Server Components for static content with Client Components for interactions
- Supabase user profile data fetching with RLS
- TypeScript interfaces for onboarding state management
- Progress tracking with persistent state

COMPONENT STRUCTURE:
interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  userProfile: {
    fullName: string;
    email: string;
    companyName?: string;
  };
}

ONBOARDING FLOW:
- Step 1: Company Profile Setup
- Step 2: First Job Description
- Step 3: Upload CV Demo
- Step 4: First AI Match
- Progress persistence in Supabase user profile

DESIGN ELEMENTS:
- Welcome message with user's name from Supabase auth
- Checkmark icon indicating successful registration
- Progress indicator showing "Step 1 of 4"
- Overview cards explaining each upcoming step
- Encouraging copy about 5-minute setup process

TECHNICAL INTEGRATION:
- Fetch user data from Supabase users table
- Update onboarding progress in user profile
- Server Action for continuing to next step
- Proper loading states during data fetching
- Error boundaries for failed data loads

STYLING SPECIFICATIONS:
- Card-based layout with professional blue accents (#2563eb)
- Progress bar component with animated transitions
- Proper spacing using Tailwind v4 spacing utilities
- Mobile-responsive design with touch-friendly buttons
- Celebration micro-interactions for completed steps
```

#### Screen 6: Company Profile Setup

```
Design a company profile setup form for recruitment platform using Next.js 14 with Supabase database integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Form, Select, Textarea, Button, Card
- Server Actions for form submission with Supabase RLS
- TypeScript interface for company profile data
- Real-time form validation and auto-save functionality
- Progress indicator integration

COMPONENT STRUCTURE:
interface CompanyProfile {
  companySize: 'startup' | 'small' | 'medium' | 'enterprise';
  industry: string;
  description?: string;
  useCase?: string;
  teamSize?: number;
}

FORM FEATURES:
- Company Size dropdown: "1-10", "11-50", "51-200", "200+ employees"
- Industry searchable dropdown with common options
- Optional company description textarea
- Skip option for quick setup workflow
- Auto-save progress every 30 seconds

SUPABASE INTEGRATION:
- Update user profile with company information
- RLS policies ensuring user can only edit own profile
- Optimistic updates with proper error rollback
- Form validation with Supabase schema constraints

STYLING & UX:
- Clean form design with proper field spacing
- Progress indicator showing "Step 2 of 4"
- Helpful tooltips explaining AI matching improvements
- Loading states during auto-save operations
- Success feedback for completed sections

ACCESSIBILITY REQUIREMENTS:
- Proper form labels and descriptions
- Keyboard navigation between form elements
- Screen reader announcements for auto-save status
- Error messages with clear correction guidance
- Focus management during form interactions
```

#### Screen 7: First Job Description Upload

```
Create a guided job description creation interface for recruitment platform onboarding using Next.js 14 with file upload and text extraction.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Input, Textarea, Alert, Progress
- Supabase Storage integration for file uploads
- Server Actions for file processing and text extraction
- TypeScript interfaces for job description data
- Drag-and-drop file upload with progress tracking

COMPONENT STRUCTURE:
interface JobDescriptionData {
  title: string;
  company: string;
  description: string;
  requirements: string[];
  skills: string[];
  experienceLevel: string;
  fileUrl?: string;
  extractedText?: string;
}

FILE UPLOAD FEATURES:
- Drag-and-drop zone with visual feedback
- Support for PDF, DOC, TXT formats (max 5MB)
- File preview with extracted text display
- Progress indicators for upload and processing
- Error handling for unsupported formats

TEXT EXTRACTION:
- Server-side PDF/Word text extraction
- AI-powered skill detection from job descriptions
- Automatic form population from extracted content
- Manual editing capabilities for extracted data
- Validation of required fields

SUPABASE INTEGRATION:
- File upload to job-descriptions bucket
- Store job description in database with RLS
- Real-time progress updates during processing
- Proper error handling and retry mechanisms

STYLING SPECIFICATIONS:
- Large upload area with dotted border styling
- Professional blue (#2563eb) for primary actions
- File format indicators with proper icons
- Preview area with syntax highlighting
- Mobile-responsive upload interface

UX ENHANCEMENTS:
- Helpful examples and template suggestions
- Tooltips explaining each field requirement
- Progress indicator showing "Step 3 of 4"
- Encouraging copy about job description creation
- Quick action buttons for common job templates
```

#### Screen 8: First CV Upload

```
Design a CV upload tutorial screen with batch processing capability using Next.js 14, Supabase Storage, and file processing pipeline.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Progress, Badge, Alert
- Supabase Storage integration with proper file handling
- Server Actions for batch file processing and validation
- TypeScript interfaces for CV processing state
- Real-time upload progress with multiple file support

COMPONENT STRUCTURE:
interface CVUploadState {
  files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    progress: number;
    extractedData?: CVData;
    error?: string;
  }>;
  totalProgress: number;
  isProcessing: boolean;
}

BATCH UPLOAD FEATURES:
- Multiple file selection (up to 5 CVs for demo)
- Drag-and-drop with visual feedback zones
- Individual file progress indicators
- File type validation (PDF, Word, images)
- File size limits (5MB per file) with clear messaging

FILE PROCESSING PIPELINE:
- Parallel upload to Supabase Storage
- Text extraction using PDF.js/Mammoth.js
- Skill detection and data parsing
- Thumbnail generation for preview
- Duplicate detection and warnings

SUPABASE INTEGRATION:
- Upload to candidates bucket with user-specific paths
- Store candidate records with extracted information
- RLS policies for user data isolation
- Real-time progress updates via Supabase subscriptions
- Proper cleanup for failed uploads

STYLING & UX:
- Visual feedback for drag-and-drop states
- Success green (#16a34a) for completed uploads
- Progress bars with smooth animations
- File preview thumbnails with extracted data
- Mobile-optimized touch interfaces

TUTORIAL ELEMENTS:
- Progress indicator showing "Step 4 of 4"
- Helpful tips about supported formats
- Example file naming conventions
- Batch processing benefits explanation
- Next step preview with AI matching demo
```

#### Screen 9: First AI Match Demo

```
Create an AI matching demo screen showing impressive CV-to-job match analysis with real-time processing animation using Next.js 14 and AI integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Progress, Badge, Button, Alert
- Server Actions for AI processing with OpenRouter/DeepSeek
- TypeScript interfaces for match results and processing state
- Real-time processing updates with WebSocket/polling
- Performance monitoring with 30-second SLA tracking

COMPONENT STRUCTURE:
interface MatchDemoResult {
  matchPercentage: number;
  confidence: number;
  processingTime: number;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  concerns: string[];
  aiReasoning: string;
  recommendation: 'strong_match' | 'potential_fit' | 'not_recommended';
}

PROCESSING ANIMATION:
- 30-second countdown timer with progress bar
- Real-time status messages: "Analyzing skills...", "Evaluating experience..."
- Animated processing indicators with smooth transitions
- Cancel option with proper cleanup handling
- Success celebration with confetti or similar effect

AI INTEGRATION:
- OpenRouter API integration with fallback to DeepSeek
- Structured JSON response parsing
- Error handling with graceful degradation
- Cost tracking and processing time monitoring
- Cache integration for repeated analyses

RESULTS DISPLAY:
- Large percentage score (e.g., 87%) with color-coded background
- Success green (#16a34a) for high matches (80%+)
- Skill matching with checkmark icons
- Missing skills with warning indicators
- AI reasoning section with detailed explanation

STYLING SPECIFICATIONS:
- Engaging animations using Tailwind v4 transitions
- Professional presentation building trust in AI
- Card-based layout with proper information hierarchy
- Mobile-responsive design with touch-friendly interactions
- Loading states with skeleton components

UX FLOW:
- Impressive demo results to showcase platform value
- "Continue to Dashboard" button with proper navigation
- Success metrics highlighting AI accuracy
- Trust-building elements showing methodology transparency
- Smooth transition to main application workflow
```

### C. Main Dashboard (2 Screens)

#### Screen 10: Dashboard Home

```
Design a comprehensive B2B SaaS recruitment dashboard homepage using Next.js 14 with Server Components, Supabase data integration, and real-time analytics.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Progress, Badge, Table, Chart
- Server Components for data fetching with Supabase RLS
- TypeScript interfaces for dashboard metrics and data
- Real-time updates using Supabase subscriptions
- Responsive data visualization with proper accessibility

COMPONENT STRUCTURE:
interface DashboardMetrics {
  totalCVsProcessed: number;
  activeJobDescriptions: number;
  monthlyMatches: number;
  avgProcessingTime: number;
  usageStats: {
    analysesUsed: number;
    analysesLimit: number;
    resetDate: string;
  };
  recentActivity: ActivityItem[];
}

KEY METRICS CARDS:
- Total CVs Processed with trend indicator
- Active Job Descriptions with quick actions
- This Month's Matches with success rate
- Processing Time Average with performance trend
- Usage limits with visual progress bars

DATA VISUALIZATION:
- Recent activity feed with match percentages
- Processing time trends with Chart.js integration
- Success rate indicators with color coding
- Monthly usage limits with progress visualization
- Quick action shortcuts for common workflows

SUPABASE INTEGRATION:
- Real-time data fetching with RLS policies
- Aggregated metrics from cv_jd_matches table
- User-specific data filtering automatically
- Performance metrics tracking and display
- Subscription updates for live data

QUICK ACTIONS SECTION:
- "Upload CV" with file upload integration
- "Create Job" with form modal or navigation
- "Run Match" with job/CV selection
- "View Reports" with analytics navigation
- Mobile-optimized action buttons

STYLING SPECIFICATIONS:
- Card-based layout with consistent spacing
- Professional blue (#2563eb) for primary elements
- Data visualization with accessible color palette
- Clean typography hierarchy with proper contrast
- Mobile-responsive grid system

PERFORMANCE REQUIREMENTS:
- Server-side data fetching for initial load
- Incremental updates for real-time metrics
- Optimized queries with proper indexing
- Loading states with skeleton components
- Error boundaries with retry mechanisms

UX ENHANCEMENTS:
- Dashboard suitable for daily HR workflow
- Quick navigation to frequently used features
- Progress tracking for ongoing processes
- Success celebrations for completed matches
- Contextual help and onboarding hints
```

#### Screen 11: Matching Dashboard (Screen 27 from original)

```
Create an AI matching dashboard showing comprehensive match statistics and processing queue management using Next.js 14 with real-time data updates.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Table, Progress, Button, Badge, Chart
- Server Components with Client Components for real-time updates
- Supabase subscriptions for live processing queue updates
- TypeScript interfaces for matching metrics and queue state
- Performance monitoring dashboard with SLA tracking

COMPONENT STRUCTURE:
interface MatchingDashboard {
  monthlyStats: {
    totalMatches: number;
    averageProcessingTime: number;
    successRate: number;
    costEfficiency: number;
  };
  activeQueue: ProcessingItem[];
  recentMatches: MatchResult[];
  systemPerformance: PerformanceMetrics;
  dailyUsage: UsageMetrics[];
}

STATISTICS OVERVIEW:
- Total matches run this month with comparison
- Average processing time with improvement trends
- Success rate (95%+) with confidence indicators
- Cost per analysis with optimization metrics
- Daily usage patterns with limit tracking

PROCESSING QUEUE:
- Real-time active processing queue
- Individual progress bars for each analysis
- Estimated completion times with accuracy
- Queue management controls (pause/resume/cancel)
- Error handling with retry mechanisms

PERFORMANCE MONITORING:
- System performance transparency dashboard
- Processing time trends with SLA compliance
- AI provider performance comparison
- Cost optimization recommendations
- Alert indicators for system issues

SUPABASE INTEGRATION:
- Real-time subscriptions for queue updates
- Performance metrics storage and aggregation
- User-specific data with RLS enforcement
- Batch processing status tracking
- Historical data for trend analysis

QUICK MATCH INITIATION:
- Prominent "Run New Match" button
- Quick CV and JD selection dropdowns
- Batch processing options with file selection
- Template matching for common scenarios
- Recent combinations for easy re-running

STYLING SPECIFICATIONS:
- Data-dense but digestible layout
- Professional blue (#2563eb) for AI-related elements
- Color-coded performance indicators
- Card-based sections with clear hierarchy
- Mobile-responsive data tables

CONFIDENCE METRICS:
- AI confidence scores with explanations
- System reliability indicators
- Processing accuracy metrics
- User feedback integration for improvements
- Transparency in AI decision-making process

UX OPTIMIZATIONS:
- Control center feel for match management
- Real-time feedback during processing
- Clear status indicators for all operations
- Contextual actions based on current state
- Professional dashboard suitable for business users
```

### D. Job Description Management (3 Screens)

#### Screen 13: JD List View

```
Create a comprehensive job descriptions list view for recruitment platform using Next.js 14 with Supabase data management and advanced filtering capabilities.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Table, Card, Button, Input, Select, Badge, Dropdown
- Server Components for data fetching with Client Components for interactions
- Supabase database integration with RLS and optimized queries
- TypeScript interfaces for job description data and filters
- Advanced search and filtering with URL state management

COMPONENT STRUCTURE:
interface JobDescription {
  id: string;
  title: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'draft' | 'archived';
  totalMatches: number;
  lastUsed?: string;
  tags: string[];
  experienceLevel: string;
}

TABLE/CARD HYBRID LAYOUT:
- Responsive design: table on desktop, cards on mobile
- Job title with company name and creation date
- Status badges with color coding (active=green, draft=amber)
- Total matches count with clickable navigation
- Last used timestamp for activity tracking
- Quick action buttons (View, Edit, Duplicate, Archive)

SEARCH AND FILTERING:
- Real-time search for job titles and companies
- Filter by status (Active, Draft, Archived)
- Sort by: Date Created, Alphabetical, Most Used, Last Modified
- Experience level filtering (Junior, Mid, Senior)
- Date range filtering for created/modified dates
- Tag-based filtering with autocomplete

SUPABASE INTEGRATION:
- Efficient queries with pagination (10 items per page)
- RLS policies ensuring user can only see own jobs
- Optimistic updates for status changes
- Search indexing for full-text search capabilities
- Related data fetching for match counts

BULK ACTIONS:
- Multi-select functionality with checkbox selection
- Bulk status updates (activate/deactivate multiple)
- Bulk tagging and categorization
- Export selected job descriptions
- Delete confirmation with proper warnings

STYLING SPECIFICATIONS:
- Clean table design with shadcn/ui styling
- Hover effects for interactive elements
- Status badges with consistent color scheme
- Responsive breakpoints for mobile optimization
- Loading states with skeleton components

UX ENHANCEMENTS:
- Prominent "Create New Job" button
- Quick filters for common scenarios
- Job posting status with visual indicators
- Match history preview on hover
- Keyboard shortcuts for power users
- Empty state with encouraging messaging

PERFORMANCE OPTIMIZATIONS:
- Virtual scrolling for large datasets
- Debounced search input
- Cached filter results
- Progressive loading for additional data
- Optimized re-renders with React.memo
```

#### Screen 14: JD Detail View

```
Design a detailed job description view with comprehensive information display and match history integration using Next.js 14 and Supabase.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Badge, Tabs, Table, Dialog
- Server Components for data fetching with dynamic routes
- Supabase integration for job details and related matches
- TypeScript interfaces for detailed job data structure
- Navigation and breadcrumb integration

COMPONENT STRUCTURE:
interface DetailedJobDescription {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  experienceLevel: string;
  metadata: {
    createdAt: string;
    lastModified: string;
    status: string;
    timesUsed: number;
    lastUsed?: string;
  };
  relatedMatches: MatchSummary[];
  analytics: JobAnalytics;
}

CONTENT SECTIONS:
- Job Overview with formatted description
- Requirements section with bullet points
- Responsibilities with clear categorization
- Required skills with proficiency levels
- Experience level and other qualifications
- Company information and culture details

METADATA PANEL:
- Creation and modification timestamps
- Current status with edit capabilities
- Usage statistics (times used, last used)
- Performance metrics (average match scores)
- Tags and categorization
- Version history tracking

ACTION BUTTONS:
- "Edit" with navigation to edit form
- "Duplicate" with pre-filled form
- "Find New Matches" with matching interface
- "Archive/Activate" with status toggle
- "Export" with multiple format options
- "Share" with link generation

RELATED MATCHES SECTION:
- Candidate previews with match percentages
- Recent matches with timestamps
- Top matching candidates with quick actions
- Match history timeline with trends
- Click-through to detailed match results
- Filter matches by date range or score

SUPABASE INTEGRATION:
- Dynamic route with job ID parameter
- Related data fetching with optimized queries
- Real-time updates for match additions
- RLS enforcement for data security
- Analytics aggregation for performance metrics

STYLING SPECIFICATIONS:
- Clean typography hierarchy with proper spacing
- Card-based sections with consistent styling
- Professional layout with clear information architecture
- Mobile-responsive design with collapsible sections
- Loading states with content skeletons

NAVIGATION:
- Breadcrumb navigation (Jobs > Job Title)
- Back to list with preserved filter state
- Next/Previous job navigation
- Quick actions in header area
- Mobile-optimized navigation patterns

ACCESSIBILITY:
- Proper heading hierarchy (h1-h6)
- ARIA labels for complex interactions
- Keyboard navigation support
- Screen reader optimizations
- Focus management for dynamic content
```

#### Screen 15: Create New JD

```
Create a comprehensive step-by-step job description builder using Next.js 14 with form handling, AI assistance, and template system integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Form, Input, Textarea, Button, Card, Tabs, Dialog
- Server Actions for form submission and validation
- Supabase integration for job storage and templates
- TypeScript interfaces for form data and validation
- Multi-step form with progress tracking and auto-save

COMPONENT STRUCTURE:
interface JobDescriptionForm {
  basicInfo: {
    title: string;
    company: string;
    department?: string;
    location: string;
    employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
    salaryRange?: string;
  };
  description: {
    overview: string;
    responsibilities: string[];
    requirements: string[];
    qualifications: string[];
  };
  skills: {
    requiredSkills: string[];
    preferredSkills: string[];
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
    yearsExperience?: number;
  };
}

MULTI-STEP WORKFLOW:
- Step 1: Basic Information (title, company, type, location)
- Step 2: Job Description (overview, responsibilities, requirements)
- Step 3: Skills & Qualifications (required/preferred skills, experience)
- Step 4: Review & Publish (preview, validation, save options)
- Progress indicator with step navigation

FORM FEATURES:
- Rich text editor for job description with formatting
- Skills input with autocomplete and tag system
- Template suggestions based on job title
- AI-powered content generation for common roles
- Real-time validation with helpful error messages
- Auto-save functionality every 30 seconds

TEMPLATE SYSTEM:
- Pre-built templates for common roles (Developer, Designer, Marketing)
- Industry-specific templates with role variations
- Custom template creation and saving
- Template preview with customization options
- Import from existing job descriptions

AI ASSISTANCE:
- Job title suggestions based on input
- Automatic skill extraction from description
- Responsibility generation based on role type
- Requirement suggestions from industry standards
- Content optimization recommendations

SUPABASE INTEGRATION:
- Form data persistence with auto-save
- Template storage and retrieval
- Job description creation with proper validation
- RLS policies for user data security
- Draft saving with version management

VALIDATION & ERROR HANDLING:
- Client-side validation with immediate feedback
- Server-side validation with comprehensive checks
- Required field highlighting with clear messaging
- Duplicate detection with merge suggestions
- Form recovery after network errors

STYLING SPECIFICATIONS:
- Clean step-by-step interface with clear progress
- Form validation states with appropriate colors
- Mobile-responsive form layouts
- Rich text editor with professional styling
- Preview mode with job posting appearance

UX ENHANCEMENTS:
- Helpful tooltips explaining form fields
- Preview functionality showing final appearance
- Template quick-start options
- Content suggestions and examples
- Save as draft with easy retrieval
- Cancel confirmation with data preservation

ACCESSIBILITY:
- Proper form labeling and descriptions
- Keyboard navigation between form steps
- Screen reader support for complex interactions
- Focus management during step transitions
- Error announcements for validation failures
```

### E. Candidate Management (3 Screens)

#### Screen 19: Candidates List

```
Create a comprehensive candidates list view with advanced data table functionality using Next.js 14, Supabase integration, and professional data management features.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Table, Card, Button, Input, Select, Badge, Avatar, Dropdown
- Server Components with Client Components for interactions
- Supabase database integration with optimized queries and RLS
- TypeScript interfaces for candidate data and filtering
- Advanced search, filtering, and sorting capabilities

COMPONENT STRUCTURE:
interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  keySkills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  uploadDate: string;
  lastModified: string;
  highestMatchScore?: number;
  matchCount: number;
  status: 'new' | 'reviewed' | 'shortlisted' | 'archived';
  avatar?: string;
  location?: string;
}

ADVANCED DATA TABLE:
- Sortable columns: Name, Skills, Experience, Upload Date, Match Score
- Responsive design: full table on desktop, card view on mobile
- Virtual scrolling for large datasets (1000+ candidates)
- Column visibility controls and customization
- Row selection with bulk action capabilities
- Expandable rows for quick candidate preview

SEARCH & FILTERING:
- Global search across name, skills, and experience
- Advanced filtering panel with multiple criteria:
  - Experience level multi-select
  - Skills tag filtering with autocomplete
  - Upload date range picker
  - Match score range slider
  - Status filtering
  - Location-based filtering
- Saved search profiles for common queries

CANDIDATE DATA DISPLAY:
- Professional avatar images with fallback initials
- Skill tags with color coding by category
- Experience level badges with consistent styling
- Match score indicators with color coding
- Upload date with relative time formatting
- Contact information with privacy controls

BULK OPERATIONS:
- Multi-select with "select all" functionality
- Bulk status updates (review, shortlist, archive)
- Bulk tagging and categorization
- Export selected candidates to various formats
- Bulk match running against specific jobs
- Delete confirmation with proper warnings

SUPABASE INTEGRATION:
- Efficient pagination with cursor-based queries
- RLS policies ensuring data privacy
- Full-text search with PostgreSQL capabilities
- Aggregated match data from related tables
- Real-time updates for new candidate additions

PERFORMANCE OPTIMIZATIONS:
- Debounced search with loading indicators
- Lazy loading for candidate avatars
- Optimized re-renders with React.memo
- Cached filter results with invalidation
- Progressive data loading

STYLING SPECIFICATIONS:
- shadcn/ui table components with custom styling
- Skill tags with category-based colors
- Hover effects for interactive elements
- Mobile-responsive breakpoints
- Loading states with skeleton components

UX ENHANCEMENTS:
- Quick action buttons on row hover
- Contextual menus for individual candidates
- Keyboard shortcuts for power users
- Empty states with encouraging messaging
- Recent activity indicators
- Candidate favoriting system

ACCESSIBILITY:
- Proper table headers and ARIA labels
- Keyboard navigation support
- Screen reader announcements for table updates
- High contrast mode support
- Focus indicators for all interactive elements
```

#### Screen 20: Candidate Profile

```
Design a comprehensive candidate profile page with detailed information display, match history, and interaction tracking using Next.js 14 and Supabase.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Badge, Tabs, Avatar, Dialog, Timeline
- Server Components for data fetching with Client Components for interactions
- Supabase integration for candidate data and document storage
- TypeScript interfaces for comprehensive candidate profile
- Document viewer integration for CV display

COMPONENT STRUCTURE:
interface CandidateProfile {
  personalInfo: {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedinProfile?: string;
    portfolio?: string;
    avatar?: string;
  };
  professionalSummary: {
    summary: string;
    currentRole?: string;
    totalExperience: number;
    careerObjective?: string;
    salaryExpectation?: string;
  };
  skills: {
    technical: SkillItem[];
    soft: SkillItem[];
    certifications: Certification[];
    languages: Language[];
  };
  workExperience: WorkExperience[];
  education: Education[];
  matchHistory: MatchResult[];
  interactions: InteractionLog[];
  documents: Document[];
}

PROFILE SECTIONS:
- Personal information with contact details
- Professional summary with career highlights
- Skills organized by category with proficiency levels
- Work experience in chronological timeline format
- Education and certifications with verification status
- Portfolio items with links and descriptions

DOCUMENT MANAGEMENT:
- CV viewer panel with PDF/Word support
- Document version history tracking
- Multiple CV versions comparison
- File download capabilities
- Document annotations and notes
- Privacy controls for sensitive information

MATCH HISTORY:
- Comprehensive match history with all job applications
- Match scores with detailed breakdowns
- Timeline view of all matching activities
- Performance trends over time
- Success rate analytics
- Quick re-match capabilities

INTERACTION TRACKING:
- Timeline of all user interactions
- Email communications log
- Interview scheduling and notes
- Status change history
- User feedback and ratings
- Activity timestamps with user attribution

ACTION BUTTONS:
- "Run New Match" with job selection
- "Add to Favorites" with personal lists
- "Schedule Interview" with calendar integration
- "Send Message" with email templates
- "Update Status" with workflow tracking
- "Export Profile" with format options

SUPABASE INTEGRATION:
- Comprehensive data fetching with joins
- Document storage with secure access controls
- Match history aggregation with analytics
- Real-time updates for new interactions
- RLS enforcement for data privacy

PRIVACY & SECURITY:
- Sensitive information masking options
- Contact information access controls
- Document viewing permissions
- GDPR compliance features
- Data export and deletion options

STYLING SPECIFICATIONS:
- Professional layout with clear information hierarchy
- Card-based sections with consistent spacing
- Timeline components with visual progression
- Document viewer integration with proper styling
- Mobile-responsive design with collapsible sections

UX ENHANCEMENTS:
- Quick navigation between profile sections
- Contextual actions based on candidate status
- Smart suggestions for next actions
- Integration with external tools (LinkedIn, etc.)
- Comparison mode for multiple candidates
- Print-friendly profile layouts

PERFORMANCE:
- Lazy loading for document previews
- Optimized queries for related data
- Caching for frequently accessed profiles
- Progressive enhancement for advanced features
- Error boundaries for document loading failures
```

#### Screen 21: CV Upload

```
Create a comprehensive CV upload interface with advanced batch processing, file validation, and extraction capabilities using Next.js 14 and Supabase Storage.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Button, Progress, Badge, Alert, Dialog, Tabs
- Supabase Storage integration with secure file handling
- Server Actions for file processing and data extraction
- TypeScript interfaces for upload state and processing results
- Advanced file validation and security scanning

COMPONENT STRUCTURE:
interface CVUploadManager {
  activeUploads: UploadItem[];
  completedUploads: ProcessedCV[];
  failedUploads: FailedUpload[];
  totalProgress: number;
  processingQueue: ProcessingItem[];
  extractionResults: ExtractionResult[];
}

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'queued' | 'uploading' | 'processing' | 'completed' | 'failed';
  extractedData?: CVData;
  duplicateWarning?: DuplicateInfo;
  errors?: ValidationError[];
}

BATCH UPLOAD FEATURES:
- Simultaneous upload of up to 10 files
- Large, prominent drag-and-drop zone with visual feedback
- File selection dialog with multi-select capability
- Progress tracking for individual files and overall batch
- Queue management with pause/resume/cancel options
- Retry mechanisms for failed uploads

FILE VALIDATION:
- Comprehensive file type validation (PDF, Word, images)
- File size limits (5MB per file) with clear messaging
- Virus scanning integration for security
- Duplicate detection with intelligent matching
- Content validation for actual CV documents
- Filename sanitization and security checks

EXTRACTION PIPELINE:
- Multi-format text extraction (PDF.js, Mammoth.js, OCR)
- AI-powered skill detection and categorization
- Contact information extraction with validation
- Work experience parsing and structuring
- Education and certification detection
- Language and proficiency level identification

PROCESSING STATES:
- Upload phase: File transfer with progress bars
- Extraction phase: Text and data parsing
- Analysis phase: Skill detection and categorization
- Validation phase: Data quality checks
- Completion phase: Database storage and indexing

SUPABASE INTEGRATION:
- Secure file upload to candidates bucket
- User-specific storage paths with RLS
- Metadata storage with extracted information
- Real-time progress updates via subscriptions
- Cleanup mechanisms for failed uploads
- Duplicate detection against existing candidates

PREVIEW & VALIDATION:
- Document preview with thumbnail generation
- Extracted data preview with editing capabilities
- Skill detection results with confidence scores
- Contact information validation with formatting
- Data quality indicators and recommendations
- Approval workflow for processed candidates

ERROR HANDLING:
- Comprehensive error messages with solutions
- Retry mechanisms for transient failures
- Partial success handling for batch uploads
- Recovery options for interrupted uploads
- User-friendly error explanations
- Support contact for complex issues

STYLING SPECIFICATIONS:
- Large, visually appealing drag-and-drop zones
- Progress bars with smooth animations
- Success states with celebration elements
- Error states with clear visual indicators
- Mobile-responsive upload interfaces
- Loading states with engaging animations

UX ENHANCEMENTS:
- Helpful tips about supported formats
- Example file naming conventions
- Best practices for CV preparation
- Batch processing benefits explanation
- Integration with existing candidate database
- Quick actions for processed candidates

PERFORMANCE OPTIMIZATIONS:
- Parallel processing for multiple files
- Optimized file reading and parsing
- Efficient progress tracking
- Memory management for large files
- Network retry logic with exponential backoff
- Background processing for large batches

SECURITY FEATURES:
- File content validation beyond extension
- Virus scanning integration
- Secure filename generation
- Access logging for audit trails
- Data encryption for sensitive information
- Privacy compliance with data handling regulations
```

### F. AI Matching System (3 Screens)

#### Screen 28: Run New Match

```
Design the core matching interface with intuitive CV-to-JD selection and real-time processing using Next.js 14 with AI integration and performance monitoring.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Select, Button, Card, Progress, Alert, Dialog, Badge
- Server Actions for AI processing with OpenRouter/DeepSeek integration
- TypeScript interfaces for matching state and results
- Real-time progress tracking with WebSocket/polling
- Performance monitoring with 30-second SLA compliance

COMPONENT STRUCTURE:
interface MatchingInterface {
  selectedCV?: {
    id: string;
    candidateName: string;
    skills: string[];
    experience: string;
    uploadDate: string;
    filePreview: string;
  };
  selectedJob?: {
    id: string;
    title: string;
    company: string;
    keyRequirements: string[];
    experienceLevel: string;
    createdDate: string;
  };
  processingState: {
    status: 'idle' | 'processing' | 'completed' | 'error';
    progress: number;
    currentStep: string;
    timeRemaining: number;
    startTime: Date;
  };
}

SELECTION INTERFACE:
- CV selector with searchable dropdown and preview
- Candidate information display with key skills
- Job description selector with requirements preview
- Quick filters for recent CVs and active jobs
- Batch mode toggle for multiple CV processing
- Validation checks before processing initiation

CV PREVIEW PANEL:
- Candidate name and contact information
- Key skills extraction with proficiency indicators
- Experience summary with role highlights
- Upload date and document status
- Quick edit options for candidate information
- Match history with previous job applications

JD PREVIEW PANEL:
- Job title and company information
- Key requirements and qualifications
- Experience level expectations
- Skills requirements with priority levels
- Creation date and usage statistics
- Related matches and success rates

PROCESSING VISUALIZATION:
- 30-second countdown timer with progress bar
- Real-time status messages with engaging copy:
  - "Analyzing candidate skills and experience..."
  - "Evaluating role requirements alignment..."
  - "Calculating compatibility scores..."
  - "Generating detailed explanations..."
- Processing animation with smooth transitions
- Cancel option with proper cleanup handling
- Performance metrics display (processing time, queue position)

AI INTEGRATION:
- OpenRouter API with Claude 3.5 Haiku primary model
- DeepSeek fallback for cost optimization
- Structured prompt engineering for consistent results
- Error handling with multiple fallback strategies
- Cost tracking and budget management
- Processing time monitoring with SLA alerts

REAL-TIME UPDATES:
- WebSocket connection for live progress updates
- Server-sent events for processing status
- Optimistic UI updates with rollback capability
- Queue position and estimated wait time
- System load indicators and processing capacity
- Auto-retry logic for failed connections

SUPABASE INTEGRATION:
- Real-time processing status in database
- Match results storage with detailed breakdown
- User-specific processing queue management
- Analytics data collection for performance monitoring
- Cost tracking per user and analysis
- Historical processing data for optimization

STYLING SPECIFICATIONS:
- Professional blue (#2563eb) for processing states
- Engaging animations using Tailwind v4 transitions
- Large, prominent "Analyze Match" button
- Card-based layout with clear visual hierarchy
- Mobile-responsive design with touch optimization
- Loading states with skeleton components

UX ENHANCEMENTS:
- Quick selection from recent combinations
- Template matching for common scenarios
- Processing queue visibility and management
- Success celebration with results preview
- Error recovery with helpful suggestions
- Performance feedback and system status

PERFORMANCE MONITORING:
- Real-time SLA compliance tracking
- Processing time analytics and trends
- System performance indicators
- Queue management and load balancing
- Error rate monitoring with alerts
- User experience metrics collection

ACCESSIBILITY:
- Screen reader announcements for processing status
- Keyboard navigation for all interactions
- High contrast support for progress indicators
- Focus management during state changes
- ARIA live regions for dynamic updates
- Alternative input methods for file selection
```

#### Screen 29: Match Results

```
Create a comprehensive match results page with detailed AI analysis, explainable scoring, and actionable insights using Next.js 14 and professional data visualization.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Badge, Button, Progress, Table, Chart, Dialog
- TypeScript interfaces for detailed match results and analytics
- Data visualization with Chart.js or similar for score breakdowns
- Server Components for results display with Client Components for interactions
- Supabase integration for results storage and historical tracking

COMPONENT STRUCTURE:
interface MatchResult {
  matchPercentage: number;
  confidence: number;
  processingTime: number;
  aiProvider: string;
  analysis: {
    matchingSkills: SkillMatch[];
    missingSkills: SkillGap[];
    strengths: string[];
    concerns: string[];
    experienceAlignment: ExperienceAnalysis;
    culturalFit?: number;
  };
  recommendation: 'strong_match' | 'potential_fit' | 'not_recommended';
  aiReasoning: string;
  actionableInsights: string[];
  metadata: MatchMetadata;
}

SCORE DISPLAY:
- Large, prominent percentage score (e.g., 87%) as hero element
- Color-coded background based on score ranges:
  - Green (#16a34a) for 80%+ (strong match)
  - Amber (#f59e0b) for 60-79% (potential fit)
  - Red (#dc2626) for <60% (not recommended)
- Confidence indicator with explanation
- Processing time and performance metrics
- Comparative scoring against role benchmarks

DETAILED ANALYSIS SECTIONS:
- Matching Skills with proficiency alignment
- Missing Skills with importance and learnability ratings
- Experience Analysis with role requirements comparison
- Strengths highlighting with specific examples
- Areas of Concern with impact assessment
- Cultural Fit indicators (if available)

SKILL ANALYSIS:
- Visual skill mapping with proficiency indicators
- Required vs. actual skill comparison charts
- Skill gap analysis with learning recommendations
- Technology stack alignment visualization
- Industry-specific skill relevance scoring
- Transferable skills identification

EXPLAINABLE AI:
- Detailed reasoning section with methodology explanation
- Score calculation transparency with weight factors
- Decision tree visualization for match logic
- Confidence intervals and uncertainty indicators
- Comparative analysis with similar candidates
- AI model information and version tracking

ACTIONABLE INSIGHTS:
- Specific recommendations for candidate development
- Interview focus areas and question suggestions
- Skills development roadmap if hired
- Red flags and areas requiring further investigation
- Onboarding considerations and timeline
- Compensation alignment recommendations

ACTION BUTTONS:
- "Save This Match" with tagging and categorization
- "Schedule Interview" with calendar integration
- "Send to Hiring Manager" with sharing options
- "Generate Interview Questions" (future feature)
- "Find Similar Candidates" with search refinement
- "Export Results" with multiple format options

SUPABASE INTEGRATION:
- Match results storage with detailed breakdown
- Historical match tracking for trends
- User feedback collection for AI improvement
- Related candidate suggestions based on results
- Performance analytics for match quality
- Integration with candidate and job tables

DATA VISUALIZATION:
- Score breakdown charts with interactive elements
- Skills radar chart comparing requirements vs. candidate
- Experience timeline with role alignment
- Comparative scoring against role averages
- Match confidence visualization
- Historical performance trends

STYLING SPECIFICATIONS:
- Professional layout with clear information hierarchy
- Color-coded sections for easy information parsing
- Interactive elements with hover states and transitions
- Mobile-responsive design with collapsible sections
- Print-friendly layout for offline review
- Accessibility-compliant color schemes

UX ENHANCEMENTS:
- Progressive disclosure of detailed information
- Contextual help explaining AI scoring methodology
- Quick actions for common next steps
- Bookmarking and favoriting capabilities
- Comparison mode with multiple candidates
- Historical match reference and learning

TRUST BUILDING:
- Transparent AI methodology explanation
- Confidence indicators with uncertainty ranges
- Human oversight recommendations
- Bias detection and mitigation indicators
- Data source attribution and freshness
- Appeal process for disputed results

PERFORMANCE OPTIMIZATION:
- Lazy loading for detailed analysis sections
- Cached results with proper invalidation
- Optimized chart rendering with progressive enhancement
- Image optimization for visual elements
- CDN integration for static assets
- Progressive web app caching strategies

ANALYTICS INTEGRATION:
- Match result interaction tracking
- Time spent on different sections
- Action completion rates
- User satisfaction feedback
- AI accuracy tracking over time
- System performance monitoring
```

#### Screen 30: Batch Matching

```
Design a comprehensive batch matching interface for processing multiple CVs against a single job description using Next.js 14 with parallel processing and queue management.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Table, Card, Button, Progress, Select, Checkbox, Badge
- Server Actions for batch AI processing with queue management
- TypeScript interfaces for batch processing state and results
- Real-time updates for processing progress across multiple items
- Performance optimization for concurrent AI processing

COMPONENT STRUCTURE:
interface BatchMatchingInterface {
  selectedJob: JobDescription;
  candidateSelection: {
    availableCandidates: CandidatePreview[];
    selectedCandidates: string[];
    selectionCriteria: SelectionFilter;
    totalSelected: number;
  };
  processingQueue: {
    queueItems: BatchProcessingItem[];
    overallProgress: number;
    estimatedCompletion: Date;
    activeProcessing: number;
    completed: number;
    failed: number;
  };
  results: BatchMatchResult[];
}

JOB SELECTION:
- Job description selector with detailed preview
- Job requirements and key skills display
- Experience level and qualification requirements
- Historical batch processing performance for this job
- Success rate indicators and benchmarks
- Quick edit options for job criteria

CANDIDATE SELECTION:
- Multi-select table with candidate information
- Bulk selection options (all, none, filtered subset)
- Smart selection based on basic criteria matching
- Candidate preview with key skills and experience
- Upload date and processing status indicators
- Exclude already processed candidates option

SELECTION FILTERS:
- Experience level filtering (entry, mid, senior, lead)
- Skills-based filtering with AND/OR logic
- Upload date range for recent candidates
- Previous match score thresholds
- Location-based filtering if relevant
- Availability status filtering

BATCH PROCESSING QUEUE:
- Visual queue showing all selected candidates
- Individual progress bars for each candidate
- Processing status indicators (queued, processing, completed, failed)
- Estimated completion time for each item
- Real-time updates for processing progress
- Queue management controls (pause, resume, cancel)

PARALLEL PROCESSING:
- Concurrent AI processing (up to 5 simultaneous)
- Load balancing across available AI providers
- Intelligent queue ordering based on processing complexity
- Resource management and throttling controls
- Error handling with automatic retry logic
- Performance monitoring and optimization

RESULTS DISPLAY:
- Ranked list sorted by match percentage
- Color-coded match scores with consistent theming
- Quick comparison view across all candidates
- Filter and sort results by various criteria
- Bulk actions for high-scoring candidates
- Export options for sharing results

REAL-TIME UPDATES:
- WebSocket connections for live progress updates
- Server-sent events for batch processing status
- Optimistic UI updates with error recovery
- Processing queue position and wait times
- System performance and capacity indicators
- Auto-refresh for completed results

SUPABASE INTEGRATION:
- Batch processing job creation and tracking
- Individual match results storage with relationships
- Processing queue state persistence
- Analytics collection for batch performance
- Cost tracking and budget management
- Historical batch data for optimization

PERFORMANCE MONITORING:
- Processing time analytics per candidate
- Queue throughput and efficiency metrics
- AI provider performance comparison
- Error rate tracking and analysis
- Cost per match calculation and trends
- User experience satisfaction metrics

STYLING SPECIFICATIONS:
- Clean data table design with responsive breakpoints
- Progress visualizations with smooth animations
- Status indicators with consistent color coding
- Mobile-optimized interface with touch-friendly controls
- Loading states with engaging progress displays
- Success celebrations for completed batches

UX ENHANCEMENTS:
- Smart defaults for candidate selection
- Processing time estimates based on historical data
- Pause and resume functionality for long batches
- Priority processing for urgent candidates
- Notification system for batch completion
- Quick actions for high-scoring results

QUEUE MANAGEMENT:
- Visual queue representation with drag-and-drop reordering
- Priority levels for urgent processing
- Batch size recommendations based on system capacity
- Processing window scheduling for optimal performance
- Resource allocation and capacity planning
- Emergency stop functionality with proper cleanup

ACCESSIBILITY:
- Screen reader support for complex table interactions
- Keyboard navigation for batch selection
- Progress announcements for processing updates
- High contrast support for status indicators
- Alternative interaction methods for selection
- Focus management during dynamic updates

ERROR HANDLING:
- Individual item failure without stopping batch
- Detailed error reporting with resolution suggestions
- Automatic retry logic with exponential backoff
- Partial batch completion with result preservation
- Recovery options for interrupted processing
- Support escalation for persistent failures

ANALYTICS & REPORTING:
- Batch processing performance reports
- Match quality distribution analysis
- Cost efficiency metrics and optimization
- Historical trend analysis
- System utilization reporting
- User behavior and satisfaction tracking
```

### G. Settings & Account Management (2 Screens)

#### Screen 40: User Profile

```
Design a comprehensive user profile settings page with account management, preferences, and privacy controls using Next.js 14 and Supabase Auth integration.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Form, Input, Button, Card, Select, Switch, Avatar, Tabs
- Server Actions for profile updates with Supabase Auth integration
- TypeScript interfaces for user profile and preferences data
- File upload for profile photos with Supabase Storage
- Real-time validation and auto-save functionality

COMPONENT STRUCTURE:
interface UserProfile {
  personalInfo: {
    id: string;
    fullName: string;
    email: string;
    profilePhoto?: string;
    jobTitle?: string;
    company: string;
    phone?: string;
    location?: string;
    timezone: string;
  };
  accountPreferences: {
    emailNotifications: NotificationSettings;
    matchingPreferences: MatchingSettings;
    defaultJobTemplates: string[];
    dataRetention: RetentionSettings;
    privacyLevel: 'public' | 'private' | 'team';
  };
  securitySettings: {
    passwordLastChanged: Date;
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    loginHistory: LoginSession[];
    connectedAccounts: ConnectedAccount[];
  };
  usageStatistics: UsageStats;
}

PERSONAL INFORMATION SECTION:
- Profile photo upload with crop and resize functionality
- Editable personal details with real-time validation
- Company information with role and department
- Contact information with privacy controls
- Timezone selection for proper scheduling
- Professional links (LinkedIn, portfolio, etc.)

ACCOUNT PREFERENCES:
- Email notification granular controls
- Matching algorithm preferences and weights
- Default job description templates
- Data retention and cleanup preferences
- Privacy level settings (public profile, team visibility)
- Interface customization options

NOTIFICATION SETTINGS:
- Email notifications for match completions
- Weekly summary reports toggle
- System maintenance and update notifications
- Security alerts and login notifications
- Marketing and feature announcement preferences
- Digest frequency controls (immediate, daily, weekly)

MATCHING PREFERENCES:
- Default analysis depth (quick, standard, comprehensive)
- AI model preferences and fallback options
- Confidence threshold settings for recommendations
- Skill weighting preferences by category
- Cultural fit analysis enable/disable
- Custom scoring criteria for specific roles

SECURITY MANAGEMENT:
- Password change functionality with strength validation
- Two-factor authentication setup and management
- Active session monitoring and termination
- Login history with device and location information
- Connected accounts (Google, LinkedIn, etc.) management
- Account deletion and data export options

USAGE STATISTICS:
- Monthly processing usage with historical trends
- Successful matches and placement rates
- Cost efficiency metrics and savings calculations
- Feature usage patterns and recommendations
- Performance benchmarks against similar users
- ROI calculations for recruitment efficiency

SUPABASE INTEGRATION:
- User profile updates with proper validation
- Profile photo storage in Supabase Storage bucket
- Real-time synchronization with auth metadata
- Preference storage with encrypted sensitive data
- Audit logging for security-related changes
- GDPR compliance with data export and deletion

AUTO-SAVE FUNCTIONALITY:
- Real-time form validation with debounced saving
- Visual indicators for save status and conflicts
- Optimistic updates with error recovery
- Form state preservation during navigation
- Conflict resolution for concurrent edits
- Manual save options for batch updates

STYLING SPECIFICATIONS:
- Clean form design with proper field grouping
- Professional styling consistent with app theme
- Responsive design with mobile-optimized layouts
- Visual feedback for save states and validation
- Accessibility-compliant form elements
- Progressive disclosure for advanced settings

UX ENHANCEMENTS:
- Form sections with clear navigation tabs
- Preview functionality for profile appearance
- Smart defaults based on user behavior
- Helpful tooltips and inline documentation
- Import/export functionality for settings
- Customization recommendations based on usage

PRIVACY & COMPLIANCE:
- Clear data usage explanations
- Granular privacy controls with explanations
- GDPR-compliant data handling and export
- Cookie preferences and tracking controls
- Third-party data sharing transparency
- Account deletion with proper data cleanup

ACCESSIBILITY:
- Proper form labeling and descriptions
- Keyboard navigation between form sections
- Screen reader support for complex interactions
- High contrast mode for visual elements
- Voice input support where applicable
- Focus management during form interactions

VALIDATION & ERROR HANDLING:
- Real-time validation with helpful error messages
- Email format and uniqueness validation
- Phone number format validation by region
- Password strength requirements with feedback
- Required field validation with clear indicators
- Server-side validation with client-side mirrors

PERFORMANCE OPTIMIZATION:
- Lazy loading for non-critical profile sections
- Optimized image handling for profile photos
- Efficient form state management
- Cached user preferences with TTL
- Progressive enhancement for advanced features
- Background sync for auto-saved changes
```

#### Screen 42: API Usage & Limits (Updated from Screen 42)

```
Design a comprehensive API usage dashboard with transparent usage tracking, billing information, and performance analytics using Next.js 14 and Supabase analytics.

TECHNICAL REQUIREMENTS:
- shadcn/ui components: Card, Chart, Progress, Table, Badge, Button, Select
- Server Components for analytics data with Client Components for interactions
- Supabase analytics queries with proper aggregation and filtering
- TypeScript interfaces for usage metrics and billing data
- Real-time usage tracking with alert system

COMPONENT STRUCTURE:
interface UsageDashboard {
  currentUsage: {
    monthlyAnalyses: { used: number; limit: number; resetDate: string };
    cvStorage: { used: number; limit: number; unit: 'count' | 'MB' };
    processingTime: { average: number; target: number; unit: 'seconds' };
    apiCalls: { used: number; limit: number; period: 'monthly' };
  };
  billing: {
    currentPlan: 'free' | 'starter' | 'professional' | 'enterprise';
    monthlySpend: number;
    projectedSpend: number;
    costPerAnalysis: number;
    savings: number;
  };
  analytics: {
    usageHistory: UsageHistoryItem[];
    performanceMetrics: PerformanceMetric[];
    costTrends: CostTrendItem[];
    efficiencyMetrics: EfficiencyMetric[];
  };
}

CURRENT USAGE OVERVIEW:
- Visual progress bars for all usage categories
- CV Processing usage (7/10 matches used) with renewal date
- Total CVs Stored (23/50) with storage optimization tips
- Processing Time Performance (averaging 18 seconds) vs SLA
- API rate limits and current consumption
- Real-time usage updates with WebSocket integration

USAGE VISUALIZATION:
- Monthly usage trends with interactive charts
- Daily usage patterns showing peak processing times
- Cost breakdown by feature and processing type
- Performance metrics with SLA compliance tracking
- Efficiency trends showing improvement over time
- Comparative analytics against plan benchmarks

BILLING & COST TRANSPARENCY:
- Current month spend: "$0 spent" for free tier
- Projected costs based on current usage patterns
- Cost per analysis with trend indicators
- Potential savings from plan optimization
- Upgrade recommendations with ROI calculations
- Billing history with detailed breakdowns

PERFORMANCE ANALYTICS:
- Processing time trends with historical data
- Success rate metrics with quality indicators
- AI provider performance comparison
- System reliability and uptime statistics
- Queue wait times and processing efficiency
- Error rate tracking with resolution metrics

ALERT SYSTEM:
- Usage threshold alerts (80%, 90%, 95% of limits)
- Performance degradation notifications
- Cost spike detection and warnings
- Quota approaching notifications
- System maintenance and update alerts
- Custom alert configuration options

PLAN MANAGEMENT:
- Current plan details with feature comparison
- Usage optimization recommendations
- Upgrade path suggestions with benefit analysis
- Cost calculator for different usage patterns
- Feature unlock previews for higher plans
- Downgrade impact analysis and warnings

SUPABASE INTEGRATION:
- Real-time usage tracking with database triggers
- Analytics aggregation with efficient queries
- Cost calculation with proper attribution
- Historical data retention with optimization
- Performance metrics collection and analysis
- Billing integration with payment providers

USAGE OPTIMIZATION:
- Intelligent caching recommendations
- Batch processing efficiency suggestions
- Cost optimization tips and best practices
- Usage pattern analysis with recommendations
- Resource allocation suggestions
- Performance tuning recommendations

STYLING SPECIFICATIONS:
- Professional dashboard with clear data visualization
- Color-coded progress bars with intuitive meanings
- Interactive charts with hover states and tooltips
- Mobile-responsive design with priority information
- Clean typography for numerical data display
- Consistent styling with main application theme

UX ENHANCEMENTS:
- Usage forecasting based on historical patterns
- Smart notifications for approaching limits
- Quick actions for common usage adjustments
- Educational content about features and benefits
- Comparison tools for plan selection
- Integration with billing and payment systems

DATA VISUALIZATION:
- Interactive usage charts with drill-down capability
- Cost trend analysis with projection modeling
- Performance benchmarking against industry standards
- Usage efficiency metrics with improvement tracking
- Historical comparison with previous periods
- Export functionality for usage reports

ACCESSIBILITY:
- Screen reader support for chart and graph data
- Keyboard navigation for interactive elements
- High contrast support for data visualization
- Alternative text descriptions for visual charts
- Focus indicators for all interactive components
- ARIA labels for complex data relationships

PERFORMANCE MONITORING:
- Real-time usage updates without page refresh
- Efficient data aggregation for large datasets
- Caching strategies for frequently accessed metrics
- Progressive loading for historical data
- Error boundaries for analytics failures
- Fallback displays for missing or delayed data

COMPLIANCE & TRANSPARENCY:
- Clear explanation of usage calculation methods
- Data retention policies and practices
- Privacy compliance for usage analytics
- Transparent billing practices and calculations
- User control over data collection and analytics
- Export capabilities for personal data management
```

---

## 🚀 Implementation Guidelines for AI Tools

### For SuperDesign Extension:

1. Copy the specific screen prompt you need
2. Paste into SuperDesign prompt field
3. Specify "Next.js 14 with TypeScript" as framework
4. Add "shadcn/ui components" as component library
5. Include "Tailwind CSS v4" for styling

### For Lovable.dev:

1. Select "Next.js" as your framework
2. Choose "TypeScript" as language preference
3. Copy the enhanced prompt for your target screen
4. Include Supabase integration requirements
5. Specify mobile-first responsive design

### Quality Assurance Checklist:

- [ ] Next.js 14 App Router patterns implemented
- [ ] TypeScript strict mode compliance
- [ ] shadcn/ui components properly integrated
- [ ] Tailwind CSS v4 classes used correctly
- [ ] Supabase integration (Auth, Database, Storage)
- [ ] Mobile-first responsive design
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Progressive Web App features included
- [ ] Performance optimization implemented
- [ ] Error handling and loading states

---

_These enhanced prompts align perfectly with your SmartHire AI technical stack and are optimized for modern AI design tools. Each prompt includes specific technical requirements, component specifications, and integration patterns for consistent, professional results._
