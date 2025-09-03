# SmartHire AI - Task Completion Workflow

## Mandatory Task Completion Steps

### 1. Code Implementation
- Complete all code changes for the assigned task
- Follow TypeScript strict mode requirements
- Use Tailwind CSS for styling with mobile-first approach
- Ensure responsive design across all screen sizes

### 2. Quality Assurance (Required Before Git Operations)
```bash
# Lint the code
npm run lint

# Build to check for TypeScript/build errors  
npm run build

# Fix any linting or build errors before proceeding
```

### 3. Documentation Updates (MANDATORY BEFORE GIT)
**CRITICAL**: Must be completed in this exact order BEFORE any git operations:

- [ ] Update task status in relevant tracking document:
  - For Task X.Y format: Update in `family-tree/docs/task-tracking.md`
  - For EX-TY format: Update in `IMPROVEMENT-TASK-TRACKING.md`
- [ ] Add completed task entry to `family-tree/docs/completed-tasks.md`
- [ ] Document implementation notes and verification steps
- [ ] Update any affected architecture or design documents

### 4. Git Operations (ONLY After Documentation Updates)
```bash
# Create feature branch (if not already created)
git checkout -b task{ID}-{kebab-case-description}
# OR for improvement tasks:
git checkout -b improvement-e{epic}-t{task}-{kebab-case-description}

# Add changes
git add .

# Commit with conventional commit format
git commit -m "type(scope): description"

# Push changes
git push origin branch-name
```

### 5. Pull Request Creation
- Use GitHub CLI or web interface
- Include task details in PR description
- Link to relevant documentation
- DO NOT mention AI assistance in commit messages or PRs

## Branch Naming Conventions
- **Original Tasks**: `task{ID}-{kebab-case-description}`
- **Improvement Tasks**: `improvement-e{epic}-t{task}-{kebab-case-description}`

## Commit Message Format
```
type(scope): description

Examples:
feat(auth): implement user authentication
fix(ui): resolve mobile layout issues
docs(readme): update installation instructions
```

## Quality Standards
- **TypeScript**: No type errors allowed
- **ESLint**: No linting errors
- **Build**: Must complete successfully
- **Mobile**: Responsive design verified
- **Performance**: 3-second page load target maintained