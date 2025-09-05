# Family Tree Improvement Task Tracking

> Policy: This tracker keeps full details only for Pending/In Progress tasks. Completed tasks are summarized here and linked to their full write-ups in `family-tree/docs/completed-tasks.md` to prevent file bloat.

> **Agent-Ready Implementation Plan** - Structured for @pm, @po, @sm workflow integration

This document tracks Epic 13: Critical UI & API Fixes based on reported issues in the `@Instruction` file. All reported problems have been mapped to specific, actionable tasks that AI agents can execute following the established project workflow.

## 📋 Task Status Legend

- **Pending**: Not yet started
- **In Progress**: Currently being worked on
- **Completed**: Finished successfully
- **In Review**: Ready for testing and review
- **Blocked**: Unable to proceed due to external factors
- **Error**: Task failed with issues that need resolution

## 🎯 Agent Workflow Integration

### Git Branch Naming Convention

- **Format**: `dev-{epic-id}-{task-id}-{kebab-case-description}`
- **Example**: `dev-e13-t1-v2-login-sizing-fix`

### Agent Responsibilities & Capabilities

**Core Project Management:**

- **@pm (John)**: Epic planning, PRD validation, strategic decisions, feature prioritization
- **@po (Sarah)**: Task validation, quality assurance, acceptance criteria verification, process adherence
- **@sm (Bob)**: Story creation, task breakdown, developer handoff preparation, agile facilitation

**Technical Implementation:**

- **@analyst (Mary)**: Market research, project discovery, competitive analysis, brainstorming sessions
- **@architect (Winston)**: System design, technology selection, architecture documentation, technical strategy
- **@dev (James)**: Code implementation, debugging, refactoring, development execution
- **@qa (Quinn)**: Code review, test planning, quality assurance, senior mentoring
- **@ux-expert (Sally)**: UI/UX design, wireframes, prototypes, user experience optimization

**Multi-Role Collaboration:**
Tasks are assigned primary agents with supporting agents based on expertise overlap. Complex tasks leverage 2-3 agents working together for comprehensive coverage.

---

## Epic 13: Critical UI & API Fixes 🚨

**Priority**: P1-CRITICAL | **Estimated Timeline**: 1-2 weeks
**Goal**: Resolve all reported issues from @Instruction file while maintaining existing functionality
**Success Criteria**: 100% visual parity with prompt files, zero API errors, enhanced UX functionality

### E13-T10: v2 CSS Architecture Consolidation (P0-BLOCKING) ✅

- **Status**: Completed - 2025-01-18 | Branch: `improvement-e13-t10-v2-css-consolidation`
- **Summary**: Successfully consolidated all v2-specific CSS into v2-styles.css, updated component imports, established v2- prefixed class naming architecture, and removed v2 dependencies from globals.css
- **Details**: See Completed Log → [E13-T10](family-tree/docs/completed-tasks.md#e13-t10)
- **Primary Agent**: @architect (Winston - CSS architecture and system design) - `.cursor/rules/architect.mdc`
- **Supporting Agents**: @dev (James - Implementation and file refactoring) - `.cursor/rules/dev.mdc`, @qa (Quinn - Visual regression testing) - `.cursor/rules/qa.mdc`
- **Description**: Consolidate all v2-specific CSS into dedicated `family-tree/app/v2/v2-styles.css` file to prevent conflicts and establish clean architectural separation from v1 styling system
- **Dependencies**: None (becomes prerequisite for all other v2 CSS-dependent tasks)
- **Reference Files**:
  - **Target CSS File**: `family-tree/app/v2/v2-styles.css` (consolidation destination)
  - **Source Files**: `family-tree/app/globals.css` (extract v2 styles), all v2 components for import updates
  - **Architecture Goal**: Complete separation between v1 and v2 styling systems
- **Acceptance Criteria**:
  - GIVEN all v2 components and pages exist
  - WHEN CSS architecture consolidation is complete
  - THEN all v2-specific styles are contained in `family-tree/app/v2/v2-styles.css`
  - AND no v2 component depends on `globals.css` for v2-specific styling
  - AND all v2 components import `v2-styles.css` using relative imports
  - AND no style conflicts exist between v1 and v2 systems
  - AND visual parity is maintained for all existing v2 components
  - AND clean architectural boundaries are established for future v2 development
- **Implementation Details**:
  - Audit `globals.css` to identify all v2-specific styles (warm theme tokens, v2 utilities)
  - Move v2-specific CSS custom properties and utility classes to `v2-styles.css`
  - Organize `v2-styles.css` with clear sections: tokens, utilities, components, responsive
  - Update all v2 component imports to use `import '../v2-styles.css'` or appropriate relative path
  - Replace global class dependencies with v2-specific class names (prefix with `v2-`)
  - Eliminate duplicate styles between global and v2 systems
  - Establish v2 CSS naming conventions and architectural standards
  - Ensure all v2 pages and components load styling correctly
- **CSS Architecture Requirements**:
  - All v2 styles must be self-contained in `v2-styles.css`
  - Use `v2-` prefix for all v2-specific CSS classes
  - Import pattern: `import '../v2-styles.css'` from v2 pages, `import '../../v2-styles.css'` from v2 components
  - No modification of `globals.css` for v2-specific needs
  - Maintain token-driven design system within v2 architecture
  - Preserve responsive design and accessibility features
- **Technical Requirements**:
  - CSS custom properties scoped to v2 system
  - Proper import hierarchy to prevent conflicts
  - Performance optimization (no duplicate CSS loading)
  - Cross-browser compatibility maintained
  - Build system integration (ensure CSS is properly bundled)
  - Documentation of v2 CSS patterns for future development
- **Files to Create/Modify**:
  - `family-tree/app/v2/v2-styles.css` (consolidation destination, enhance existing)
  - `family-tree/app/globals.css` (remove v2-specific styles)
  - All v2 components in `family-tree/app/components-v2/` (update imports)
  - All v2 pages in `family-tree/app/v2/` (update imports)
  - Documentation files (update CSS architecture guidelines)
- **Testing Requirements**:
  - Visual regression testing for all v2 components
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Responsive design validation across all viewport sizes
  - Performance testing (CSS load times and rendering)
  - Build system testing (ensure proper CSS bundling)
  - Accessibility testing (contrast, focus indicators maintained)
- **Branch**: `improvement-e13-t10-v2-css-architecture-consolidation`

- **Execution Prompt**:

```
Use the template from @Instruction file to execute E13-T10. Read CLAUDE.md sections 1–136, 138–155, 156-170, 274–331 and IMPROVEMENT-TASK-TRACKING.md lines 47-102 for E13-T10 specification. Follow the template structure: Context Establishment → Workflow Compliance → Task Specification → Technical Implementation → Quality Assurance. Execute as @architect (primary) = @.cursor\rules\architect.mdc + @dev = @.cursor\rules\dev.mdc + @qa = @.cursor\rules\qa.mdc collaboration. Consolidate all v2 CSS into family-tree/app/v2/v2-styles.css, update component imports, establish clean architectural separation from v1 system. Remove v2 dependencies from globals.css, use v2- prefixing, ensure visual parity maintained. Implement v2 CSS Architecture Standards from CLAUDE.md (156-170). This is BLOCKING task - all other v2 CSS-dependent tasks depend on clean CSS architecture. Complete in order: code → docs → git.
```
