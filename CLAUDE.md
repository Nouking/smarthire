# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in the SmartHire AI repository.

## AI Task Workflow

## Core Development Principles

- **KISS (Keep it simple, stupid)**: Make solutions as simple as possible. Use existing methods and patterns rather than creating complex new ones.
- **YAGNI (You aren't gonna need it)**: Don't add features, methods, or complexity until actually needed. If existing functionality covers the requirement, use it.

### 1. Project Understanding (Mandatory - SmartHire AI Project)

Before starting any task, you MUST read and understand the following documents to grasp the project's goals, scope, and current state.

**📋 Master Documents (Start Here)**:

- **Task Management**: docs/IMPROVEMENT-TASK-TRACKING.md (Epic 14 task tracking for all development phases)
- **Implementation Archive**: docs/completed-tasks.md (historical patterns and implementation examples)
- **Technical Design**: docs/core/smarthire_technical_design.md (architecture and system specifications)

**🔧 Supporting References**:

- **Implementation Plan**: docs/core/smarthire_implementation_plan.md (16-week development timeline)
- **Product Requirements**: docs/core/smarthire_mvp_prd.md (business requirements and user stories)
- **Project Summary**: docs/core/smarthire_project_summary.md (high-level project overview)

### 2. Task-Specific Instructions (Epic 14 Development)

For any given task ID (e.g., "E14-T1", "E14-T3"), you MUST:

**For Epic 14 Tasks (E14-TX format)**:

1. Read docs/IMPROVEMENT-TASK-TRACKING.md section "Epic 14: Phase 1 Foundation"
2. Check the specific task for details, dependencies, and acceptance criteria
3. Review docs/completed-tasks.md for related implementation patterns and examples

**Task Workflow Requirements**: 4. Understand task description, status, dependencies, and acceptance criteria 5. Check agent assignments and role-specific requirements (@architect, @dev, @po, etc.) 6. Verify prerequisites are met before proceeding 7. Only proceed with implementation after confirming complete understanding 8. Follow the git branch naming convention: `dev-e14-t{task}-{kebab-case-description}`

## Task Detail Location Guide

**Before starting any task, follow this lookup flow:**

1. **Task Assignment**: "Do E14-T2 (P1-CRITICAL): shadcn/ui + Tailwind CSS Integration"
2. **Quick Status Check**: Read docs/IMPROVEMENT-TASK-TRACKING.md for current status
3. **Get Full Details**: Read docs/IMPROVEMENT-TASK-TRACKING.md for complete task specification
4. **Proceed**: Only start implementation after reading full acceptance criteria

**Example Command Flow**:

```
"Read CLAUDE.md, follow the task workflow, then do E14-T2"
```

**Detail Lookup Examples**:

- E14-T1 details → docs/IMPROVEMENT-TASK-TRACKING.md (Next.js Foundation Setup)
- E14-T2 details → docs/IMPROVEMENT-TASK-TRACKING.md (shadcn/ui Integration)
- E14-T3 details → docs/IMPROVEMENT-TASK-TRACKING.md (Supabase Database Setup)
- Completed examples → docs/completed-tasks.md (implementation patterns)

### 3. Task Status Updates (MANDATORY - DO NOT SKIP)

**CRITICAL**: You MUST complete ALL steps below in EXACT ORDER. Do NOT proceed to git operations without completing documentation updates first.

**Required Steps (Must Complete in Order):**

- [ ] **Step 1 - Complete Code Implementation**: Finish writing all code changes for the task.
- [ ] **Step 1.5 - MVP Quality Gates Verification (MANDATORY)**: Before proceeding to documentation updates, you MUST verify all essential quality gates pass:
  - ✅ **ESLint checks**: Run `npm run lint` - ensures code quality and syntax standards
  - ✅ **TypeScript compilation**: Run `npx tsc --noEmit` - verifies type safety with zero errors
  - ✅ **Build process**: Run `npm run build` - confirms deployability without errors
  - These gates align with our optimized CI/CD pipeline and are non-negotiable for task completion
- [ ] **Step 2 - Update Documentation (MANDATORY BEFORE GIT)**: After code is complete AND quality gates pass, but BEFORE any git operations, you MUST update the following:
  - [ ] Update the task's status in `docs/IMPROVEMENT-TASK-TRACKING.md`
  - [ ] Update Epic 14 entries in `docs/IMPROVEMENT-TASK-TRACKING.md` for any E14-T? task you completed using the standardized completed-task format (see template below)
  - [ ] Add or update the completed task in `docs/completed-tasks.md` with an anchor and a FULL summary of work done (key changes, files edited/added, tests updated/added, acceptance verification). You may reference other completed tasks in this file with links when related.
  - [ ] Document any issues encountered or deviations from the original plan
  - [ ] Use the exact Completed entry structure for Epic 14 tasks, following the E14-T1 and E14-T3 style:
    - In `IMPROVEMENT-TASK-TRACKING.md` under the task:
      - `### E{epic}-T{task}: {Title} (P{priority}-{level}) ✅`
      - `- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}``
      - `- Summary: {One–two lines; what changed and impact}`
      - `- Details: See Completed Log → [E{epic}-T{task}](docs/completed-tasks.md#e{epic}-t{task})`
    - In `docs/completed-tasks.md` add/update the matching anchor and header:
      - `<a id="e{epic}-t{task}"></a>` then
      - `#### E{epic}-T{task}: {Title} (P{priority}-{level})`
      - `- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}``
      - `- Summary: {Full detail of work done: key edits, files changed/added, tests, verification against acceptance criteria; include links to related completed tasks when useful}`
  - [ ] Document any issues encountered or deviations from the original plan
  - [ ] Update documentation with your latest achievements
- [ ] **Step 3 - Perform Git Operations**: ONLY after ALL documentation is updated, proceed with git commits and pushes.

**WARNING**: Skipping Step 2 documentation updates is a critical workflow violation. Always verify documentation is updated before any git commit.

#### Standard Format for Improvement Tasks (Completed)

When an Improvement task (E?-T?) is marked Completed, enforce this structure in `IMPROVEMENT-TASK-TRACKING.md` and mirror a concise entry in `/docs/completed-tasks.md`:

```
### E{epic}-T{task}: {Title} (P{priority}-{level}) ✅
- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}`
- Summary: {One–two lines; what changed and impact}
- Details: See Completed Log → [E{epic}-T{task}](docs/completed-tasks.md#e{epic}-t{task})
```

In `docs/completed-tasks.md`, ensure an anchor exists:

```
<a id="e{epic}-t{task}"></a>
#### E{epic}-T{task}: {Title} (P{priority}-{level})
- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}`
- Summary: {Concise result}
- {Optional sections}: Implementation Notes | Verification Notes | PO Sign-off Notes
```

Notes:

- Prefer concise summaries in the archive when `docs/IMPROVEMENT-TASK-TRACKING.md` already contains full details.
- The `docs/IMPROVEMENT-TASK-TRACKING.md` format should match the style used by completed entries like `E14-T1` and `E14-T3` (Title + Priority + ✅, followed by Status | Branch, Summary, and Details link).

## Working Directory

The SmartHire AI application code is located in the root directory. Always run commands from the project root and use relative paths for files and scripts. The main application code is in the `src/` directory with supporting files at the root level.

## Development Workflow

### Git Workflow (Mandatory)

- NEVER automatically add AI attribution signatures like:
  "🤖 Generated with [Claude Code]"
  "Co-Authored-By: Claude noreply@anthropic.com"
  Any AI tool attribution or signature
- Create clean, professional commit messages without AI references. Use conventional commit format.

1. **Create a Branch**: Before writing any code, create a feature branch.
   - **For Epic 14 tasks**: `dev-e14-t{task}-{kebab-case-description}`
     - Example: `dev-e14-t2-shadcn-tailwind-integration`
   - **For other Epic tasks**: `dev-e{epic}-t{task}-{kebab-case-description}`
     - Example: `dev-e15-t1-user-authentication`
2. **Commit Changes**: Write clear and concise commit messages.
   - **Format**: `type(scope): description`
   - **Example**: `feat(auth): implement jwt token generation`
3. **Create a Pull Request**: After pushing your changes, create a PR. The description should include task details and not mention Claude

## Development Commands & Architecture

For development commands, tech stack details, and architecture overview, refer to:

- **Development Commands**: See `package.json` scripts section - dev, build, start, lint commands
- **Architecture Overview**: See `docs/core/smarthire_technical_design.md` - comprehensive tech stack and structure
- **Project Goals**: See `docs/core/smarthire_project_summary.md` - detailed technical architecture and data models
- **Implementation Plan**: See `docs/core/smarthire_implementation_plan.md` - 16-week development timeline

## SmartHire AI Development Workflow

When working on SmartHire AI tasks, follow this streamlined flow:

- Read: `docs/IMPROVEMENT-TASK-TRACKING.md` → Epic 14 section for current task details
- Branch: `dev-e14-t{task}-{kebab-summary}` (e.g., `dev-e14-t2-shadcn-tailwind-integration`)
- **CSS Architecture**: Use Tailwind CSS v4 with shadcn/ui components for consistent styling
  - Import pattern: Tailwind CSS via `src/app/globals.css`
  - shadcn/ui components in `src/components/ui/`
  - Custom components in `src/components/`
  - Mobile-first responsive design approach
- Implement: Follow Next.js 14 App Router patterns in `src/app/` and component organization in `src/components/`
- Tests: Add appropriate tests as development progresses
- **MVP Quality Gates (MANDATORY BEFORE COMPLETION)**: Verify all essential checks pass before marking task complete:
  - Run `npm run lint` - ensures code quality and syntax standards
  - Run `npx tsc --noEmit` - verifies TypeScript type safety with zero errors
  - Run `npm run build` - confirms deployability and successful compilation
  - These align with our optimized CI/CD pipeline and are required for all task completions
- Documentation updates (mandatory after implementation AND quality gates pass, before git):
  - Update status in `docs/IMPROVEMENT-TASK-TRACKING.md` (Epic 14 task)
  - Append a concise summary with anchor in `docs/completed-tasks.md`
  - Update any relevant technical documentation as needed

### SmartHire AI Technology Stack

**Current Foundation**: Epic 14 establishes the core technology stack

- **Framework**: Next.js 15 with App Router and TypeScript strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Database**: Supabase PostgreSQL with pgvector for semantic search
- **Authentication**: Supabase Auth with email/password
- **Storage**: Supabase Storage for CV file uploads
- **Deployment**: Vercel with automated CI/CD via GitHub Actions

Acceptance checkpoints for SmartHire AI work:

- **MVP Quality Gates**: ESLint passes (`npm run lint`), TypeScript compiles clean (`npx tsc --noEmit`), build succeeds (`npm run build`)
- Mobile-first responsive design; AA contrast; proper semantic HTML
- 3-second page load performance target
- TypeScript strict mode compilation without errors
- Supabase integration for data persistence and authentication
- Proper error handling and user experience patterns

## Task Status Values

- `Pending`: Not yet started
- `In Progress`: Currently being worked on
- `Completed`: Finished successfully
- `Blocked`: Unable to proceed
- `Error`: Task failed and needs resolution

## Documentation Structure

- **Project Documentation**: docs/
  - IMPROVEMENT-TASK-TRACKING.md: Epic 14 tasks and their status
  - completed-tasks.md: Archive of finished tasks with implementation notes
  - develop-plan.md: Strategic development planning
  - core/: Core project documentation
    - smarthire_technical_design.md: Complete architecture specifications
    - smarthire_implementation_plan.md: 16-week development timeline
    - smarthire_mvp_prd.md: Product requirements and user stories
    - smarthire_project_summary.md: High-level project overview
- **Documentation Archive**: docs/archive/ - Previous task tracking versions with timestamps

## Task Reference Format

- **Git Branch Name Format**: `dev-e{epic}-t{task}-{kebab-case-description}`
  - _Example_: `dev-e14-t2-shadcn-tailwind-integration`
- **Task Reference Format**: "E{epic}-T{task} - [Title]"
  - _Example_: "E14-T2 - shadcn/ui + Tailwind CSS Integration"

## Important Instruction Reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
