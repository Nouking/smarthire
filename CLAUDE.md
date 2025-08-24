# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## AI Task Workflow

### 1. Project Understanding (Mandatory - Updated for Consolidated Documentation)
Before starting any task, you MUST read and understand the following documents to grasp the project's goals, scope, and current state.

**📋 Master Documents (Start Here)**:
- **Project Overview**: PROJECT-OVERVIEW.md (consolidated project vision, architecture, and status)
- **Task Management**: IMPROVEMENT-TASK-TRACKING.md (integrated task tracking for all development phases)
- **Documentation Hub**: family-tree/docs/index.md (AI-optimized navigation and quick start)

**🔧 Supporting References**:
- **Success Criteria**: family-tree/docs/success-criteria.md (quality standards and acceptance criteria)
- **Implementation Archive**: family-tree/docs/completed-tasks.md (historical patterns and examples)
- **UI v2 Plan**: family-tree/docs/ui-improvement-plan.md (Epic 12 source of truth for v2 UI work)

### 2. Task-Specific Instructions (Enhanced for Multi-Phase Development)
For any given task ID (e.g., "Task 3.1", "E2-T3"), you MUST:

**For Original Development Tasks (Task X.Y format)**:
1. Read UNIFIED-TASK-TRACKING.md section "Original Development Phases"
2. Check the specific phase (1-4) for task details and dependencies
3. Review family-tree/docs/completed-tasks.md for related implementation patterns

**For Improvement Plan Tasks (EX-TY format)**:
1. Read IMPROVEMENT-TASK-TRACKING.md section "Improvement Plan Epics"  
2. Check the specific epic (E1-E4) for task details and agent assignments
3. Review IMPROVEMENT-TASK-TRACKING.md for detailed acceptance criteria

**For Both Task Types**:
4. Understand task description, status, dependencies, and acceptance criteria
5. Check agent assignments and role-specific requirements
6. Verify prerequisites are met before proceeding
7. Only proceed with implementation after confirming complete understanding

## Task Detail Location Guide

**Before starting any task, follow this lookup flow:**

1. **Task Assignment**: "Do Task 2.2 (P1-CRITICAL): Global State Management"
2. **Quick Status Check**: Read UNIFIED-TASK-TRACKING.md for current status
3. **Get Full Details**:
   - **Original Tasks (Task X.Y)**: Read family-tree/docs/task-tracking.md
   - **Improvement Tasks (EX-TY)**: Read IMPROVEMENT-TASK-TRACKING.md
4. **Proceed**: Only start implementation after reading full acceptance criteria

**Example Command Flow**:
```
"Read CLAUDE.md, follow the task workflow, then do Task 3.1"
```

**Detail Lookup Examples**:
- Task 2.2 details → family-tree/docs/task-tracking.md (lines 110-127)
- Task 3.1 details → family-tree/docs/task-tracking.md (lines 249-260)
- E1-T5 details → IMPROVEMENT-TASK-TRACKING.md (lines 307-326)
- E3-T1 details → IMPROVEMENT-TASK-TRACKING.md (lines 467-485)
- Epic 12 (UI v2) tasks → family-tree/docs/ui-improvement-plan.md

### 3. Task Status Updates (MANDATORY - DO NOT SKIP)
**CRITICAL**: You MUST complete ALL steps below in EXACT ORDER. Do NOT proceed to git operations without completing documentation updates first.

**Required Steps (Must Complete in Order):**
- [ ] **Step 1 - Complete Code Implementation**: Finish writing all code changes for the task.
- [ ] **Step 2 - Update Documentation (MANDATORY BEFORE GIT)**: After code is complete but BEFORE any git operations, you MUST update the following:
  - [ ] Update the task's status in `IMPROVEMENT-TASK-TRACKING.md`
  - [ ] Update Improvement Plan entries in `IMPROVEMENT-TASK-TRACKING.md` for any E?-T? task you completed using the standardized completed-task format (see template below)
  - [ ] Add or update the completed task in `family-tree/docs/completed-tasks.md` with an anchor and a FULL summary of work done (key changes, files edited/added, tests updated/added, acceptance verification). You may reference other completed tasks in this file with links when related.
  - [ ] If UI v2 work affected screen plans or utilities, update `family-tree/docs/ui-improvement-plan.md` status notes and examples accordingly
  - [ ] Use the exact Completed entry structure for Improvement tasks, mirroring the E11‑T6 style:
    - In `IMPROVEMENT-TASK-TRACKING.md` under the task:
      - `### E{epic}-T{task}: {Title} (P{priority}-{level}) ✅`
      - `- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}``
      - `- Summary: {One–two lines; what changed and impact}`
      - `- Details: See Completed Log → [E{epic}-T{task}](family-tree/docs/completed-tasks.md#e{epic}-t{task})`
    - In `family-tree/docs/completed-tasks.md` add/update the matching anchor and header:
      - `<a id="e{epic}-t{task}"></a>` then
      - `#### E{epic}-T{task}: {Title} (P{priority}-{level})`
      - `- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}``
      - `- Summary: {Full detail of work done: key edits, files changed/added, tests, verification against acceptance criteria; include links to related completed tasks when useful}`
  - [ ] Document any issues encountered or deviations from the original plan
  - [ ] Update documentation with your latest achievements
- [ ] **Step 3 - Perform Git Operations**: ONLY after ALL documentation is updated, proceed with git commits and pushes.

**WARNING**: Skipping Step 2 documentation updates is a critical workflow violation. Always verify documentation is updated before any git commit.

#### Standard Format for Improvement Tasks (Completed)
When an Improvement task (E?-T?) is marked Completed, enforce this structure in `IMPROVEMENT-TASK-TRACKING.md` and mirror a concise entry in `family-tree/docs/completed-tasks.md`:

```
### E{epic}-T{task}: {Title} (P{priority}-{level}) ✅
- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}`
- Summary: {One–two lines; what changed and impact}
- Details: See Completed Log → [E{epic}-T{task}](family-tree/docs/completed-tasks.md#e{epic}-t{task})
```

In `completed-tasks.md`, ensure an anchor exists:

```
<a id="e{epic}-t{task}"></a>
#### E{epic}-T{task}: {Title} (P{priority}-{level})
- Status: Completed - {YYYY-MM-DD} | Branch: `{branch-name}`
- Summary: {Concise result}
- {Optional sections}: Implementation Notes | Verification Notes | PO Sign-off Notes
```

Notes:
- Prefer concise summaries in the archive when `IMPROVEMENT-TASK-TRACKING.md` already contains full details.
- The `IMPROVEMENT-TASK-TRACKING.md` format should match the style used by entries like `E9-T8` (Title + Priority + ✅, followed by Status | Branch, Summary, and Details link).

## Working Directory

The main application code is located in the `family-tree/` subdirectory. Always run commands from `family-tree/` (project-root/family-tree) when working with the app and use repository-relative paths in docs and scripts.

## Development Workflow

### Git Workflow (Mandatory)
- NEVER automatically add AI attribution signatures like:
  "🤖 Generated with [Claude Code]"
  "Co-Authored-By: Claude noreply@anthropic.com"
  Any AI tool attribution or signature
- Create clean, professional commit messages without AI references. Use conventional commit format.
1. **Create a Branch**: Before writing any code, create a feature branch.
   - **For Improvement Plan tasks**: `improvement-e{epic}-t{task}-{kebab-case-description}`
     - Example: `improvement-e12-t1-v2-home`
   - **For original Task X.Y items**: `task{ID}-{kebab-case-description}`
     - Example: `task1-1-setup-nextjs-project`
2. **Commit Changes**: Write clear and concise commit messages.
   - **Format**: `type(scope): description`
   - **Example**: `feat(auth): implement jwt token generation`
3. **Create a Pull Request**: After pushing your changes, create a PR. The description should include task details and not mention Claude


## Development Commands & Architecture

For development commands, tech stack details, and architecture overview, refer to:
- **Development Commands**: See `family-tree/README.md` - Getting Started section
- **Architecture Overview**: See `family-tree/docs/project-overview.md` - comprehensive tech stack and structure
- **Project Goals**: See `project-goal.md` - detailed technical architecture and data models

## UI v2 Workflow (Epic 12 & 13)

When working on v2 UI tasks, follow this streamlined flow:

- Read: `IMPROVEMENT-TASK-TRACKING.md` → Epic section, and `family-tree/docs/ui-improvement-plan.md`
- Branch: `improvement-e{epic}-t{task}-<kebab-summary>` (e.g., `improvement-e13-t4-v2-view-alignment`)
- **CSS Architecture (MANDATORY)**: All v2 styling MUST use `family-tree/app/v2/v2-styles.css`
  - Import pattern: `import '../v2-styles.css'` from v2 pages, `import '../../v2-styles.css'` from v2 components
  - **DO NOT** modify `family-tree/app/globals.css` for v2-specific styling
  - **DO NOT** use global CSS classes for v2-specific styling (use `v2-` prefixed classes)
  - All v2 components must be self-contained with v2 CSS architecture
- Implement: v2-only in `family-tree/app/v2/` and `family-tree/app/components-v2/`; do not modify v1 routes/components unless explicitly required
- Tests: add/update v2 tests alongside existing suites (keep v1 green)
- Documentation updates (mandatory after implementation, before git):
  - Update status in `IMPROVEMENT-TASK-TRACKING.md` (Epic task)
  - Append a concise summary with anchor in `family-tree/docs/completed-tasks.md`
  - If applicable, update `family-tree/docs/ui-improvement-plan.md` status notes/examples

### v2 CSS Architecture Standards (Epic 13 Requirement)
**CRITICAL**: E13-T10 must be completed before any v2 CSS-dependent tasks

- **Single Source of Truth**: All v2 styles in `family-tree/app/v2/v2-styles.css`
- **Import Requirements**: Every v2 component/page must import v2-styles.css with relative path
- **Naming Convention**: All v2-specific classes use `v2-` prefix (e.g., `v2-button`, `v2-modal`, `v2-panel`)
- **No Global Dependencies**: v2 components cannot depend on globals.css for v2-specific styling
- **Token-Driven**: Use CSS custom properties within v2 system for consistency
- **Conflict Prevention**: Clean architectural separation prevents v1/v2 style conflicts

Acceptance checkpoints for v2 work:
- Visual parity to prompt direction; AA contrast; APG semantics; reduced-motion respected
- No overlap at mobile sizes; connectors layer beneath nodes (where relevant)
- **CSS Architecture**: All styles contained in v2-styles.css with proper imports
- v1 remains fully functional until parity; no regressions in existing tests

## Task Status Values
- `Pending`: Not yet started
- `In Progress`: Currently being worked on
- `Completed`: Finished successfully
- `Blocked`: Unable to proceed
- `Error`: Task failed and needs resolution

## Documentation Structure
- **Project Documentation**: family-tree/docs/
  - index.md: Main documentation hub
  - project-overview.md: Project summary, tech stack, and architecture
  - task-tracking.md: Current tasks and their status
  - completed-tasks.md: Archive of finished tasks with implementation notes
  - implementation-notes.md: Technical implementation details
  - success-criteria.md: Project goals and metrics for success
- **Documentation Archive**: Previous project notes and reference materials

## Task Reference Format
- **Git Branch Name Format**: `task{ID}-{kebab-case-description}`
  - *Example*: `task1-1-setup-nextjs-project`
- **Task Reference Format**: "Task [ID] - [Title]"
  - *Example*: "Task 1.1 - Setup Next.js Project"