# SmartHire AI Project - AI Workflow Instructions

## 🤖 AI Workflow Template

**INSTRUCTIONS FOR AI**: When user updates the "Current Issues/Todos" section below, follow this exact workflow:

### Step 1: Archive Current Documentation

1. Create timestamp: `YYYY-MM-DD` (e.g., `2025-08-16`)
2. Archive to `/docs/archive/` with timestamp suffix:
   - `IMPROVEMENT-TASK-TRACKING.md` → `improvement-task-tracking-{timestamp}.md`
   - `/docs/completed-tasks.md` → `completed-tasks-{timestamp}.md`
   - `/docs/ui-improvement-plan.md` → `ui-improvement-plan-{timestamp}.md`
     If not exist, can skip

### Step 2: Create New Documentation Structure

1. **Strategic Plan** (`/docs/develop-plan.md`):
   - High-level strategy for addressing current issues
   - Epic structure planning and agent role distribution
   - Technical solution architecture overview
   - Success metrics and validation criteria

2. **Task Tracking** (`/docs/IMPROVEMENT-TASK-TRACKING.md`):
   - Create new Epic (increment from last epic number)
   - Break down each issue into detailed, AI-agent-ready tasks
   - Include: Status, Agent assignments, Dependencies, Acceptance criteria (GIVEN/WHEN/THEN), Implementation details, Technical requirements, Testing requirements
   - Follow established Epic format (reference archived versions for consistency)

3. **Implementation Archive** (`/docs/completed-tasks.md`):
   - Reset with new template structure
   - Include placeholder anchors for new epic tasks
   - Maintain reference links to archived documentation

### Step 3: Update This Instruction File

- Update "Last Epic Processed" number
- Move completed issues to "Resolved Issues Archive"
- Update completion timestamps and epic numbers

---

## 🎯 Current Issues/Todos (Epic 2) ✅ COMPLETED

**EDIT THIS SECTION** to add new bugs/todos. AI will automatically process into epic tasks.

### Epic 2 Implementation Status: ✅ COMPLETED (2025-09-12)

All 9 SuperDesign UI templates have been successfully processed into Epic 2 tasks:

**✅ Epic 2 Tasks Created:**
- E2-T1: Landing Page Implementation (`smarthire_landing.html` + CSS)
- E2-T2: Login Page Implementation (`b2b_login_screen.html` + CSS)  
- E2-T3: Password Reset Flow (`password_reset_flow.html` + `password_reset_theme.css`)
- E2-T4: Registration Screen (`smarthire_registration_1.html` + `smarthire_registration_theme.css`)
- E2-T5: AI Matching CV/JD Screen (`ai_matching_demo.html` + CSS)
- E2-T6: Company Input Screen (`company_profile_form_1.html` + `company_form_theme_1.css`)
- E2-T7: Upload Job Description (`job_description_1.html` + `job_description_theme_1.css`)
- E2-T8: Upload CV Screen (`cv_upload_tutorial_1.html` + `cv_upload_theme_1.css`)
- E2-T9: Dashboard Screen (`recruitment_dashboard_1.html` + `recruitment_dashboard_theme_1.css`)

**✅ Documentation Structure Created:**
- Complete Epic 2 task tracking with MCP server integration requirements
- Agent assignments for @ux-expert, @architect, @dev collaboration
- Pixel-perfect SuperDesign template matching requirements
- Component extraction strategy for global/common files
- Mobile-first responsive design specifications

### Future Issues/Todos (Epic 3+)

**Add new issues here** - AI will process them into the next epic:

### User Interface Issues

- (Add future UI issues here)

### API/Backend Issues

- (Add future API issues here)

### Script/Configuration Issues

- (Add future script issues here)

### Feature Requests

- (Add future feature requests here)

### Bug Reports

- (Add future bugs here)

---

## 📊 Project Status

### Last Epic Processed: **Epic 2** (2025-09-12)

**Status**: Documentation completed, ready for implementation
**Tasks**: E2-T1 through E2-T9 (9 SuperDesign UI implementation tasks)

### Documentation Structure

- ✅ **Strategic Plan**: `docs/develop-plan.md`
- ✅ **Task Tracking**: `IMPROVEMENT-TASK-TRACKING.md`
- ✅ **Implementation Archive**: `docs/completed-tasks.md`
- ✅ **Archive Directory**: `docs/archive/`

---

## 🤖 AI TASK EXECUTION PROMPT TEMPLATE

**INSTRUCTIONS FOR AI**: Use this compact format when generating execution prompts for Epic tasks from IMPROVEMENT-TASK-TRACKING.md to prevent context overflow while maintaining all necessary information.

### Compact Prompt Format (Context-Optimized)

Generate execution prompts using this exact format:

```
**Execution Prompt**:
Use the template from `docs/Build _from_epic_to_task_tracking.md` file to execute {TASK_ID}. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines {LINE_RANGE} for {TASK_ID} specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @{PRIMARY_AGENT} (primary) = .bmad-core/agents/{AGENT_FILE}.md + @{SUPPORTING_AGENTS} collaboration.
```

### Template Variables for Compact Generation

**Task Information**:

- `{TASK_ID}` - Task identifier (e.g., E14-T1, E15-T3)
- `{LINE_RANGE}` - Task specification line numbers (e.g., 44-114, 118-167)
- `{PRIMARY_AGENT}` - Main responsible agent name (architect, dev, po, ux-expert, sm)
- `{AGENT_FILE}` - Primary agent filename (architect, dev, po, qa)
- `{SUPPORTING_AGENTS}` - Additional agents with .bmad-core/agents/ references

**Agent Mapping Examples**:

- `@architect (primary) = .bmad-core/agents/architect.md + @dev = .bmad-core/agents/dev.md + @po collaboration`
- `@dev (primary) = .bmad-core/agents/dev.md + @ux-expert + @architect = .bmad-core/agents/architect.md collaboration`
- `@po (primary) + @dev = .bmad-core/agents/dev.md + @sm collaboration`

### Context Management Rationale

**Why Compact Format**:

- **Prevents Context Overflow**: Full templates consume 80-100 lines per task
- **Maintains Information**: All task details remain in specification sections
- **References Template**: AI can access full structure from this template file
- **Enables Processing**: Tasks remain within AI context limits
- **Preserves Quality**: Same 5-section structure via template reference

### Template Variables (Auto-populated from IMPROVEMENT-TASK-TRACKING.md)

**Epic Information**:

- `{EPIC_NUMBER}` - Epic number (e.g., E13)
- `{EPIC_TITLE}` - Epic title and priority
- `{EPIC_GOAL}` - High-level epic objective

**Task Information**:

- `{TASK_ID}` - Task identifier (e.g., E13-T3)
- `{TASK_TITLE}` - Full task title
- `{TASK_PRIORITY}` - Priority level (P1-CRITICAL, P2-HIGH, etc.)
- `{PRIMARY_AGENT}` - Main responsible agent
- `{SUPPORTING_AGENTS}` - Additional collaborating agents

**Implementation Details**:

- `{ACCEPTANCE_CRITERIA}` - GIVEN/WHEN/THEN specifications
- `{DEPENDENCIES}` - Prerequisite tasks
- `{FILES_TO_MODIFY}` - Specific file paths
- `{TECHNICAL_REQUIREMENTS}` - Technology and framework needs
- `{TESTING_REQUIREMENTS}` - Validation and testing specs

### Template Usage Instructions

1. **Context First**: Always establish project context before diving into technical details
2. **Modular Structure**: Each section serves a specific cognitive purpose
3. **Progressive Disclosure**: Information flows from general to specific
4. **Clear Dependencies**: Prerequisites explicitly stated upfront
5. **Validation Built-in**: Success criteria and quality gates embedded
6. **Error Resilience**: Fallback procedures for common issues

### Example: Format Evolution - Run-on → Full Template → Compact

**❌ ORIGINAL PROBLEMATIC (Run-on Sentence)**:

```
"As @dev, @ux-expert, @qa: read CLAUDE.md 1–136 (AI Task Workflow), 138–155 (UI v2 Workflow), and 274–331 (Task Status Updates); read IMPROVEMENT-TASK-TRACKING.md 923–1018 (E12-T3 complete specification); follow AI Task Workflow exactly; do E12-T3 Edit Member Modal (v2)..."
```

_Problems_: 1,247 characters, cognitive overload, buried information

**⚠️ INTERMEDIATE (Full Template) - CAUSES CONTEXT OVERFLOW**:

```markdown
## 🎯 CONTEXT ESTABLISHMENT

**Project**: SmartHire AI Application
**Epic**: E12 - UI v2 Enhancement...
[80-100 lines of template content]
```

_Problems_: 80-100 lines per task, context overflow, redundant information

**✅ OPTIMIZED COMPACT FORMAT (Current Standard)**:

```
**Execution Prompt**:
Use the template from `docs/Build _from_epic_to_task_tracking.md` file to execute E14-T1. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 44-114 for E14-T1 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @architect (primary) = .bmad-core/agents/architect.md + @dev = .bmad-core/agents/dev.md + @po collaboration.
```

_Benefits_: 3-4 lines, maintains all information, prevents context overflow, references template structure

### Compact Format Examples by Task Type

**Backend/Database Task (E14-T3)**:

```
**Execution Prompt**:
Use the template from `docs/Build _from_epic_to_task_tracking.md` file to execute E14-T3. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 171-220 for E14-T3 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @architect (primary) = .bmad-core/agents/architect.md + @dev = .bmad-core/agents/dev.md + @po collaboration.
```

**UI/Frontend Task (E14-T2)**:

```
**Execution Prompt**:
Use the template from `docs/Build _from_epic_to_task_tracking.md` file to execute E14-T2. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 118-167 for E14-T2 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @dev (primary) = .bmad-core/agents/dev.md + @ux-expert + @architect = .bmad-core/agents/architect.md collaboration.
```

**Documentation Task (E14-T6)**:

```
**Execution Prompt**:
Use the template from `docs/Build _from_epic_to_task_tracking.md` file to execute E14-T6. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 334-381 for E14-T6 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @po (primary) + @dev = .bmad-core/agents/dev.md + @sm collaboration.
```

### Key Improvements in Compact Format

1. **📈 95% Context Reduction**: 3-4 lines vs 80-100 line templates
2. **🔗 Template Reference**: AI accesses full structure from this file
3. **📊 Information Preservation**: All task details remain in specification sections
4. **⚡ Processing Efficiency**: Enables AI processing within context limits
5. **🎯 Agent Clarity**: Clear primary/supporting agent roles and file mappings
6. **📋 Workflow Compliance**: Maintains 5-section structure via template reference

### Compact Prompt Generation Guidelines for AI

**When Creating COMPACT Execution Prompts from IMPROVEMENT-TASK-TRACKING.md Tasks:**

1. **Use Compact Format Only**:
   - Generate ONLY the compact execution prompt format (3-4 lines)
   - DO NOT create full markdown templates (causes context overflow)
   - Reference this template file for 5-section structure
   - Keep all task details in the specification sections

2. **Line Range Calculation**:
   - Calculate exact line numbers for task specification
   - Include from task header to end of "Testing Requirements" or "Files to Create/Modify"
   - Example: E14-T1 spans lines 44-114, E14-T2 spans lines 118-167
   - Verify line ranges are accurate for AI reading

3. **Agent Mapping**:
   - Map primary agent to correct .bmad-core/agents/{agent}.md file
   - Include supporting agents with proper collaboration syntax
   - Use exact agent names: architect, dev, po, ux-expert, sm, qa
   - Follow the agent mapping examples provided above

4. **Context Efficiency**:
   - Maintain all necessary information in task specification sections
   - Use template reference for execution structure
   - Prevent redundant content duplication
   - Enable AI processing within context limits

### Compact Prompt Quality Validation Checklist

**Before Using Any Generated Compact Prompt:**

**✅ Format Compliance**:

- [ ] Uses exact compact format (3-4 lines maximum)
- [ ] References `docs/Build _from_epic_to_task_tracking.md` template file
- [ ] Includes all required CLAUDE.md section references (1–136, 138–155, 156-170, 274–331)
- [ ] Contains accurate IMPROVEMENT-TASK-TRACKING.md line ranges

**✅ Line Range Accuracy**:

- [ ] Line range starts from task header (### E{X}-T{Y})
- [ ] Line range ends at last relevant content (Testing Requirements or Files to Create/Modify)
- [ ] Line numbers are accurate for AI reading
- [ ] Range covers complete task specification

**✅ Agent Mapping**:

- [ ] Primary agent correctly identified
- [ ] Primary agent mapped to correct .bmad-core/agents/{agent}.md file
- [ ] Supporting agents listed with proper collaboration syntax
- [ ] Agent roles match task requirements

**✅ Template Reference**:

- [ ] References template structure (Context → Workflow → Task → Technical → Quality)
- [ ] All task details remain in specification sections (no duplication)
- [ ] Template file provides 5-section structure guidance
- [ ] Maintains quality without redundancy

**✅ Context Efficiency**:

- [ ] Prevents context overflow (compact format used)
- [ ] All necessary information accessible via references
- [ ] No redundant content duplication
- [ ] Enables AI processing within limits

**✅ Execution Readiness**:

- [ ] Task specification contains all implementation details
- [ ] Template file provides execution structure
- [ ] Agent files contain role-specific guidance
- [ ] CLAUDE.md sections provide workflow compliance

### Common Prompt Anti-Patterns to Avoid

**❌ AVOID THESE**:

- Run-on sentences exceeding 100 words
- Burying critical information in parentheses
- Mixed abstraction levels in same section
- Unclear agent role assignments
- Missing error handling procedures
- Unmeasurable success criteria
- Dependencies hidden in technical details
- Poor information hierarchy

**✅ USE THESE INSTEAD**:

- Modular sections with clear headers
- Progressive information disclosure
- Consistent abstraction levels within sections
- Explicit agent roles and collaboration patterns
- Built-in error handling and fallback procedures
- Testable, measurable success criteria
- Dependencies clearly stated upfront
- Logical information flow and hierarchy

### Template Testing: Multiple Epic Task Examples

**Example 1: API/Backend Task (E13-T3)**

```markdown
## 🎯 CONTEXT ESTABLISHMENT

**Project**: SmartHire AI Application
**Epic**: E13 - Critical UI & API Fixes
**Task**: E13-T3 - API Fetch Error Resolution in v2/view (P1-CRITICAL)
**Agents**: @architect (Winston - Primary API debugging) + @dev (James - Frontend fixes) + @qa (Quinn - Error testing)

## 📋 MANDATORY WORKFLOW COMPLIANCE

**Pre-Execution Requirements**:

- [ ] Read CLAUDE.md: AI Task Workflow sections
- [ ] Read IMPROVEMENT-TASK-TRACKING.md: lines 126-176 (E13-T3 specification)
- [ ] Analyze browser console stack traces and network request logs
- [ ] Validate API endpoint availability and routing configuration

## 🛠️ TASK SPECIFICATION

**Primary Objective**: Resolve "Failed to fetch" errors in /v2/view that prevent family tree data loading and interactive features.

**Success Criteria** (GIVEN/WHEN/THEN format):

- GIVEN a user navigates to `/v2/view`
- WHEN the page loads and attempts API calls
- THEN all fetch requests complete successfully with no console errors
- AND family tree data loads and displays correctly
- AND all interactive features (add, edit, delete) function properly
```

**Example 2: UI/UX Task (E13-T1)**

```markdown
## 🎯 CONTEXT ESTABLISHMENT

**Project**: SmartHire AI Application
**Epic**: E13 - Critical UI & API Fixes
**Task**: E13-T1 - v2 Login Page Sizing & Responsive Fix (P1-CRITICAL)
**Agents**: @ux-expert (Sally - Primary responsive design) + @dev (James - Implementation) + @qa (Quinn - Cross-device testing)

## 📋 MANDATORY WORKFLOW COMPLIANCE

**Pre-Execution Requirements**:

- [ ] Read CLAUDE.md: UI v2 Workflow sections
- [ ] Read IMPROVEMENT-TASK-TRACKING.md: lines 47-85 (E13-T1 specification)
- [ ] Analyze `login-screen-prompt` HTML/CSS for exact specifications
- [ ] Review current `family-tree/app/v2/login/page.tsx` implementation

## 🛠️ TASK SPECIFICATION

**Primary Objective**: Fix v2 login page sizing to match login-screen-prompt specifications exactly across all viewport sizes.

**Success Criteria** (GIVEN/WHEN/THEN format):

- GIVEN the v2 login page is accessed at `/v2/login`
- WHEN viewed on desktop (1024px+), tablet (768px), and mobile (360px+)
- THEN the page layout matches `login-screen-prompt` visual specifications
- AND warm color theme tokens (mint, peach, lilac, sage) are applied correctly
- AND no horizontal scrolling occurs at any supported viewport size
```

**Example 3: Development/Scripting Task (E13-T2)**

```markdown
## 🎯 CONTEXT ESTABLISHMENT

**Project**: SmartHire AI Application
**Epic**: E13 - Critical UI & API Fixes
**Task**: E13-T2 - Admin Script Path Resolution (P1-CRITICAL)
**Agents**: @dev (James - Primary path resolution) + @po (Sarah - Documentation) + @architect (Winston - Build system)

## 📋 MANDATORY WORKFLOW COMPLIANCE

**Pre-Execution Requirements**:

- [ ] Read CLAUDE.md: Script execution and path handling sections
- [ ] Read IMPROVEMENT-TASK-TRACKING.md: lines 87-124 (E13-T2 specification)
- [ ] Investigate actual file location: `family-tree/scripts/seed-admin.mjs`
- [ ] Analyze current error: double `family-tree` directory nesting

## 🛠️ TASK SPECIFICATION

**Primary Objective**: Fix admin seed script path error preventing password management functionality execution.

**Success Criteria** (GIVEN/WHEN/THEN format):

- GIVEN the command `node family-tree/scripts/seed-admin.mjs --password=admin`
- WHEN run from project root directory
- THEN the script executes successfully without path errors
- AND admin password is updated in users.json
- AND script can be run from any directory with proper relative paths
```

### Template Scalability Validation

**✅ Template Successfully Handles**:

- **Different Task Types**: API/Backend, UI/UX, Development/Scripting
- **Various Priorities**: P1-CRITICAL, P2-HIGH, P2-MEDIUM
- **Multiple Agent Combinations**: Primary + 1-2 supporting agents
- **Different Complexity Levels**: 200-1200+ word task specifications
- **Diverse Technical Requirements**: React components, Node.js scripts, API endpoints

**✅ Consistent Quality Across All Examples**:

- Clear context establishment in every case
- Modular structure maintained regardless of task type
- Progressive information disclosure preserved
- Built-in quality gates and validation steps
- Error handling and fallback procedures included

---

## 🔄 AI Workflow Standards

### Task Creation Guidelines

- **Complexity Scaling**: 200-1200+ words based on task difficulty
- **Agent Assignments**: Primary + supporting agents based on expertise
- **Acceptance Criteria**: GIVEN/WHEN/THEN format for clarity
- **Dependencies**: Clear task sequencing and prerequisites
- **Testing**: Comprehensive validation requirements

### Agent Role Definitions

- **@sm (Bob)**: Epic breakdown, story preparation, agile facilitation
- **@po (Sarah)**: Quality validation, acceptance criteria, process adherence
- **@architect (Winston)**: System design, API architecture, technical strategy
- **@ux-expert (Sally)**: UI/UX design, prompt alignment, user experience
- **@dev (James)**: Code implementation, debugging, development execution
- **@qa (Quinn)**: Testing, code review, quality assurance, validation

### Quality Standards

- **Token Efficiency**: Use cross-references, avoid duplication
- **Agent Clarity**: Clear role assignments and collaboration patterns
- **Implementation Ready**: Detailed technical requirements and file specifications
- **Testing Coverage**: Comprehensive validation procedures
- **Documentation Links**: Proper anchor linking and cross-references

### Epic Naming Convention

- **Format**: `Epic [Number]: [Brief Description]`
- **Example**: `Epic 14: Performance Optimization & Bug Fixes`
- **Tasks**: `E[Number]-T[Task]: [Task Title] (P[Priority]-[Level])`

---

## 📚 Resolved Issues Archive

### Epic 2: SuperDesign UI Implementation ✅ (2025-09-12)

**Completed Issues**:

1. ✅ 9 SuperDesign Template Implementation → Epic 2: Created comprehensive task breakdown for SmartHire AI SuperDesign UI implementation
   - Landing Page Implementation (E2-T1): `smarthire_landing.html` with pixel-perfect responsive design
   - Login Page Implementation (E2-T2): `b2b_login_screen.html` with Supabase auth integration
   - Password Reset Flow Implementation (E2-T3): `password_reset_flow.html` + `password_reset_theme.css` multi-step flow
   - Registration Screen Implementation (E2-T4): `smarthire_registration_1.html` + `smarthire_registration_theme.css` comprehensive onboarding
   - AI Matching Demo Implementation (E2-T5): `ai_matching_demo.html` with progress indicators and results visualization
   - Company Profile Implementation (E2-T6): `company_profile_form_1.html` + `company_form_theme_1.css` with file upload
   - Job Description Upload Implementation (E2-T7): `job_description_1.html` + `job_description_theme_1.css` multi-input support
   - CV Upload Tutorial Implementation (E2-T8): `cv_upload_tutorial_1.html` + `cv_upload_theme_1.css` with batch processing
   - Dashboard Implementation (E2-T9): `recruitment_dashboard_1.html` + `recruitment_dashboard_theme_1.css` comprehensive interface

**Epic Status**: Documentation created, ready for agent implementation (@ux-expert, @architect, @dev collaboration)
**Archive Location**: `docs/archive/improvement-task-tracking-2025-09-12.md`

### Previous Archived Epics

### Epic 14: Phase 1 Foundation - Sprint 1.1 Project Infrastructure ✅ (2025-08-24)

**Completed Issues**:

1. ✅ Sprint 1.1 Task Creation → E14: Created comprehensive task breakdown for SmartHire AI Phase 1 Foundation
   - Next.js 14 Foundation Setup (E14-T1): TypeScript strict mode, project structure, mobile-first optimization
   - shadcn/ui + Tailwind Integration (E14-T2): Design system with mobile-first responsive components
   - Supabase Database & Schema Setup (E14-T3): PostgreSQL with pgvector, AI processing optimization
   - Supabase Authentication & Storage (E14-T4): Email/password auth, secure file storage for CVs
   - Development Pipeline & CI/CD (E14-T5): ESLint, Prettier, GitHub Actions, automated testing
   - Documentation & Dev Environment (E14-T6): Setup guides, workflow documentation, onboarding

**Epic Status**: Documentation created, ready for agent implementation
**Archive Location**: `docs/archive/improvement-task-tracking-2025-08-24.md`

### Previous Archived Epics

### Epic 13: Critical UI & API Fixes ✅ (2025-08-16) - Family Tree Project

**Completed Issues**:

1. ✅ v2 Login Page Sizing → E13-T1: Fixed responsive behavior to match `login-screen-prompt`
2. ✅ Admin Script Path Error → E13-T2: Fixed path resolution for admin script
3. ✅ API Fetch Errors in /v2/view → E13-T3: Resolved "Failed to fetch" errors
4. ✅ v2 View UI Misalignment → E13-T4: Aligned components with `home-screen-prompt`
5. ✅ Modal Content Missing → E13-T5: Implemented proper Add/Help modal content
6. ✅ Button Styling Issues → E13-T6: Fixed Add/Export/Help button styling
7. ✅ Context Menu Missing → E13-T7: Implemented right-click functionality
8. ✅ Member Detail Modal → E13-T8: Enhanced modal to match `member-detail-prompt`
9. ✅ QA Validation → E13-T9: Comprehensive testing and regression prevention

**Epic Status**: Documentation created, ready for agent implementation
**Archive Location**: `docs/archive/improvement-task-tracking-2025-08-16.md` (Family Tree project)

---

## 🎯 Usage Instructions for Humans

### To Add New Issues/Todos:

1. **Edit "Current Issues/Todos" section** above with your new bugs/features
2. **Specify issue type** (UI, API, Script, Feature, Bug)
3. **Provide context**: Reference files, error messages, expected behavior
4. **Run AI workflow**: AI will automatically create new epic and tasks

### Example Issue Format:

```markdown
### User Interface Issues

- Login button not responsive on mobile devices (reference: login-screen-prompt)
- Add modal missing validation error states

### API/Backend Issues

- GET /api/members returns 500 error intermittently
- Authentication tokens expire too quickly

### Feature Requests

- Export family tree as PDF format
- Add dark mode toggle for entire application
```

### AI Will Automatically:

1. ✅ Archive current documentation with timestamps
2. ✅ Create new epic with incremented number
3. ✅ Break down issues into detailed, agent-ready tasks
4. ✅ Assign appropriate AI agents to each task
5. ✅ Generate comprehensive implementation documentation
6. ✅ Update this instruction file with new epic information

---

_This instruction file serves as the master template for AI-driven project improvement workflows. Simply update the "Current Issues/Todos" section and AI will handle the complete documentation restructure and task planning process._
