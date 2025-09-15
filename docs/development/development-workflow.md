# SmartHire AI - Development Workflow Guide

## 🚀 Quick Start for New Developers

### Prerequisites

- Node.js 20+ installed
- Git configured
- Code editor with TypeScript support (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd smarthire

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

## 📋 Development Pipeline Overview

Our development pipeline ensures code quality, consistency, and reliability through automated checks and deployments.

### Pipeline Components

1. **Code Quality**: ESLint + Prettier + TypeScript
2. **Testing**: Jest + React Testing Library
3. **Pre-commit Hooks**: Husky + lint-staged
4. **CI/CD**: GitHub Actions + Vercel
5. **Performance**: Build optimization and monitoring

## 🔧 Available Scripts

### Core Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build production application
npm run start        # Start production server locally
```

### Code Quality Commands

```bash
npm run lint         # Run ESLint with error reporting
npm run lint:fix     # Run ESLint and auto-fix issues
npm run format       # Format all files with Prettier
npm run format:check # Check if files are properly formatted
npm run type-check   # Run TypeScript type checking
```

### Testing Commands

```bash
npm test             # Run Jest tests
npm run test:watch   # Run Jest in watch mode
npm run test:coverage # Run tests with coverage report
npm run test:ci      # Run tests for CI (no watch, with coverage)
```

### Quality Assurance Commands

```bash
npm run quality      # Run all quality checks (type-check + lint + format:check)
npm run quality:fix  # Run all quality fixes (type-check + lint:fix + format)
npm run pre-commit   # Run pre-commit checks manually
```

### Utility Commands

```bash
npm run clean        # Clean build artifacts (.next, out, build, dist)
npm run reinstall    # Clean reinstall of all dependencies
```

## 🔄 Daily Development Workflow

### 1. Start Your Development Day

**Sync with Latest Changes:**

```bash
# Switch to main branch
git checkout main

# Pull latest changes from upstream
git pull upstream main

# Push updates to your fork
git push origin main
```

**Update Dependencies (if needed):**

```bash
# Check for updates
npm outdated

# Update dependencies if necessary
npm update

# Verify everything works
npm run quality
```

### 2. Pick Up New Work

**Review Available Tasks:**

- Check [IMPROVEMENT-TASK-TRACKING.md](../IMPROVEMENT-TASK-TRACKING.md) for assigned tasks
- Review GitHub Issues for bug reports or feature requests
- Coordinate with team on Slack/Discord for task assignment

**Create Feature Branch:**

```bash
# For Epic tasks (E14-TX format)
git checkout -b dev-e14-t6-documentation-dev-environment

# For general features
git checkout -b feature/user-profile-enhancements

# For bug fixes
git checkout -b fix/mobile-responsive-layout
```

### 3. Development Process

**Start Development Server:**

```bash
npm run dev
```

**Make Changes:**

- Follow project structure guidelines
- Implement features incrementally
- Test changes frequently in the browser
- Write unit tests as you develop

**Quality Checks During Development:**

```bash
# Run individual checks as needed
npm run type-check    # TypeScript validation
npm run lint          # Code quality checks
npm test -- --watch  # Run tests in watch mode
```

### 4. Commit Your Changes

**Stage Changes:**

```bash
# Stage specific files
git add src/components/ui/button.tsx
git add src/components/ui/__tests__/button.test.tsx

# Or stage all changes (be careful!)
git add .
```

**Commit with Conventional Format:**

```bash
git commit -m "feat(ui): add button component with variants

- Add primary, secondary, and destructive variants
- Include size options (sm, md, lg)
- Add comprehensive test coverage
- Update component documentation"
```

**Pre-commit Hooks Verification:**

- Husky automatically runs quality checks
- Fix any issues that arise before commit completes
- Hooks run: ESLint, Prettier, TypeScript, Tests

### 5. Push and Create Pull Request

**Push to Your Fork:**

```bash
git push origin feature-branch-name
```

**Create Pull Request:**

1. Visit GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template
5. Request review from team members

## 🔄 Git Workflow

### Branch Naming Convention

**Epic Tasks (E14-TX format):**

```bash
dev-e14-t1-nextjs-foundation-setup
dev-e14-t6-documentation-dev-environment
dev-e15-t2-ai-processing-pipeline
```

**Feature Development:**

```bash
feature/user-authentication
feature/cv-upload-processing
feature/dashboard-analytics
```

**Bug Fixes:**

```bash
fix/mobile-responsive-layout
fix/authentication-token-refresh
fix/file-upload-validation
```

**Documentation:**

```bash
docs/api-documentation-update
docs/contributing-guidelines
docs/deployment-procedures
```

**Chores/Maintenance:**

```bash
chore/dependency-updates
chore/eslint-configuration
chore/test-setup-improvements
```

### Commit Message Convention

We use conventional commits for clear, standardized commit messages:

```
type(scope): description

Examples:
feat(auth): add JWT token validation
fix(ui): resolve mobile responsive layout issue
docs(readme): update installation instructions
test(utils): add unit tests for helper functions
```

### Commit Types

- **feat**: New feature for the user
- **fix**: Bug fix for the user
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring (no new features or bug fixes)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build process, etc.)

### Pre-commit Quality Gates

Automatic checks run before each commit:

- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Tests**: Affected tests (optional)

If any check fails, the commit is blocked until issues are resolved.

## 🚨 Quality Standards

### ESLint Configuration

Our ESLint setup includes:

- **Next.js rules**: Framework-specific best practices
- **TypeScript rules**: Type safety and consistency
- **Accessibility rules**: WCAG compliance (jsx-a11y)
- **Import rules**: Module organization and dependency management

### Code Formatting (Prettier)

- **Line width**: 100 characters
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS/TS, double quotes for JSX
- **Semicolons**: Always required
- **Trailing commas**: ES5 compatible
- **Tailwind CSS**: Automatic class sorting

### TypeScript Standards

- **Strict mode**: Enabled for maximum type safety
- **No `any` types**: Use specific types or `unknown`
- **Explicit return types**: For exported functions
- **Import organization**: Grouped and sorted automatically

## 🧪 Testing Strategy

### Testing Framework Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Extended DOM matchers
- **User Event**: User interaction simulation

### Testing Patterns

```typescript
// Component test example
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Coverage Requirements

- **Minimum coverage**: 70% for branches, functions, lines, and statements
- **Test location**: `__tests__` directories or `.test.ts/.spec.ts` files
- **Test patterns**: Component tests, utility tests, integration tests

### Mandatory Quality Gates

Before any code review or merge, ensure ALL quality gates pass:

```bash
# Run complete quality check suite
npm run quality
```

**Individual Quality Checks:**

```bash
# 1. TypeScript Compilation (MUST PASS ✅)
npm run type-check
# Expected: No compilation errors

# 2. ESLint Validation (MUST PASS ✅)
npm run lint
# Expected: No warnings or errors

# 3. Production Build (MUST PASS ✅)
npm run build
# Expected: Successful build completion

# 4. Test Suite (MUST PASS ✅)
npm test
# Expected: All tests passing
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

Our pipeline runs on every push and pull request:

1. **Quality Check Job**:
   - Install dependencies
   - Run ESLint
   - Check Prettier formatting
   - Perform TypeScript type checking
   - Execute test suite
   - Build application

2. **Security Audit Job**:
   - Check for known vulnerabilities
   - Audit dependencies
   - Security compliance checks

3. **Deploy Job** (conditional):
   - **Preview deployments**: For pull requests
   - **Production deployments**: For main/master branch pushes

### Vercel Integration

- **Automatic deployments**: Connected to GitHub repository
- **Preview URLs**: Generated for each pull request
- **Production deployments**: Triggered by main branch updates
- **Environment variables**: Managed through Vercel dashboard

### Required Secrets (GitHub Repository)

```
VERCEL_TOKEN          # Vercel authentication token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
```

## 🔧 Development Best Practices

### Code Organization

```
src/
├── app/                 # Next.js 15 App Router pages
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

### Component Development

- **Use TypeScript**: All components should have proper typing
- **Props interface**: Define clear prop interfaces
- **Default exports**: Use default exports for components
- **Accessibility**: Include proper ARIA attributes and semantic HTML
- **Testing**: Write tests for component behavior and user interactions

### Import Organization

```typescript
// 1. Node modules
import React from 'react';
import { NextPage } from 'next';

// 2. Internal modules
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { AuthService } from '@/lib/auth';

// 3. Types
import type { User } from '@/types/user';
```

### Environment Variables

- **Development**: Use `.env.local` (not committed)
- **Production**: Configure through Vercel dashboard
- **Type safety**: Define environment variables in `next.config.ts`

## 📝 Code Review Process

### Submitting Pull Requests

**PR Title Format:**

```
type(scope): Brief description of changes
```

**PR Description Template:**

```markdown
## Summary

Brief description of what this PR accomplishes.

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Changes Made

- Specific change 1
- Specific change 2
- Specific change 3

## Testing

- [ ] All quality gates pass (`npm run quality`)
- [ ] New tests added for new functionality
- [ ] All existing tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)
- [ ] Mobile testing (if applicable)

## Screenshots (if applicable)

[Add screenshots of UI changes]

## Quality Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Hard-to-understand areas commented
- [ ] Documentation updated if needed
- [ ] No console.log statements left in code
- [ ] Error handling implemented where needed

## Related Issues

Closes #123
Relates to #456
```

### Review Guidelines for Reviewers

**Review Focus Areas:**

1. **Functionality**: Does the code work as intended?
2. **Quality**: Is the code well-structured and maintainable?
3. **Testing**: Are there adequate tests for new functionality?
4. **Performance**: Are there any performance concerns?
5. **Security**: Are there any security vulnerabilities?
6. **Accessibility**: Does UI code meet accessibility standards?

### Addressing Review Feedback

**Responding to Comments:**

1. Read all feedback carefully
2. Ask for clarification if comments are unclear
3. Make requested changes in separate commits
4. Reply to comments explaining your changes
5. Re-request review when ready

**Making Changes:**

```bash
# Make changes based on feedback
git add modified-files
git commit -m "address: implement suggested validation improvements"

# Push updates
git push origin feature-branch-name
```

## 🔧 Debugging Workflow

### Development Debugging

**Browser DevTools:**

- Use React Developer Tools for component inspection
- Check Network tab for API calls
- Review Console for errors and warnings
- Use Application tab for localStorage/sessionStorage

**VS Code Debugging:**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Common Debugging Scenarios

**TypeScript Errors:**

```bash
# Get detailed type information
npx tsc --noEmit --diagnostics

# Check specific file
npx tsc --noEmit src/components/problem-component.tsx
```

**ESLint Issues:**

```bash
# Auto-fix what's possible
npm run lint:fix

# Check specific file
npx eslint src/components/problem-component.tsx
```

**Build Failures:**

```bash
# Clean build cache and retry
npm run clean
npm run build

# Debug with verbose output
npm run build 2>&1 | tee build-output.log
```

**Test Failures:**

```bash
# Run specific test file
npm test -- button.test.tsx

# Run tests with detailed output
npm test -- --verbose

# Run tests and open in browser for debugging
npm test -- --debug
```

## 🚀 Deployment Workflow

### Development Deployment

**Vercel Integration:**

- Every PR automatically gets a preview deployment
- Preview URL is posted in PR comments
- Use preview deployments for testing and review

**Manual Preview:**

```bash
# Install Vercel CLI (one-time setup)
npm i -g vercel

# Deploy preview
vercel

# Deploy to production (main branch only)
vercel --prod
```

### Production Deployment

**Automated via GitHub Actions:**

- Pushes to `main` branch trigger production deployment
- All quality gates must pass before deployment
- Automatic rollback on deployment failures

## 🚨 Troubleshooting

### Common Issues

**ESLint errors after setup:**

```bash
npm run lint:fix
```

**Prettier formatting conflicts:**

```bash
npm run format
```

**TypeScript compilation errors:**

```bash
npm run type-check
```

**Test failures:**

```bash
npm run test:watch
```

**Pre-commit hook failures:**

```bash
npm run quality:fix
```

**Build failures:**

```bash
npm run clean
npm run build
```

### Pipeline Failures

**GitHub Actions failing:**

1. Check the Actions tab in GitHub repository
2. Review error logs for specific failure points
3. Common fixes:
   - Update dependencies: `npm run reinstall`
   - Fix linting issues: `npm run lint:fix`
   - Resolve test failures: `npm run test`
   - Fix TypeScript errors: `npm run type-check`

**Vercel deployment issues:**

1. Check Vercel dashboard for deployment logs
2. Verify environment variables are set correctly
3. Ensure build succeeds locally: `npm run build`

### Git Issues

**Merge Conflicts:**

```bash
# Pull latest changes
git pull upstream main

# Resolve conflicts in your editor
# Stage resolved files
git add resolved-files
git commit -m "resolve: merge conflicts with main"
```

**Wrong Branch:**

```bash
# If you committed to wrong branch
git checkout correct-branch
git cherry-pick commit-hash

# Switch back and remove wrong commit
git checkout wrong-branch
git reset --hard HEAD~1
```

**Lost Work:**

```bash
# Find lost commits
git reflog

# Recover lost work
git checkout lost-commit-hash
git checkout -b recovery-branch
```

### Development Issues

**Port Already in Use:**

```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

**Cache Issues:**

```bash
# Clear Next.js cache
npm run clean

# Clear npm cache
npm cache clean --force

# Clear node_modules and reinstall
npm run reinstall
```

**Permission Issues:**

```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm

# Fix project permissions
sudo chown -R $(whoami) project-directory
```

## ⚡ Workflow Optimization Tips

### Development Efficiency

**VS Code Extensions:**

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- GitLens
- Thunder Client (for API testing)

**Keyboard Shortcuts:**

```bash
# VS Code
Cmd/Ctrl + ` : Toggle terminal
Cmd/Ctrl + P : Quick file open
Cmd/Ctrl + Shift + P : Command palette
F12 : Go to definition
Shift + F12 : Find references
```

**Terminal Aliases:**

```bash
# Add to ~/.bashrc or ~/.zshrc
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrt="npm test"
alias nrq="npm run quality"

alias gco="git checkout"
alias gst="git status"
alias gpl="git pull"
alias gps="git push"
```

### Time Management

**Focus Blocks:**

- Use Pomodoro technique (25min work, 5min break)
- Turn off notifications during deep work
- Batch similar tasks (all testing, all documentation, etc.)

**Daily Planning:**

- Review tasks at start of day
- Estimate time for each task
- Plan break points for commits and pushes
- Leave buffer time for unexpected issues

## 📞 Getting Help

### Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Testing Library Docs**: https://testing-library.com/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **shadcn/ui Components**: https://ui.shadcn.com/

### Team Support

- Review this documentation first
- Check existing issues and PRs
- Ask questions in team channels
- Pair program for complex features

### Collaboration Workflow

**Communication Channels:**

- Share progress on current tasks
- Identify blockers and dependencies
- Coordinate on shared components or APIs

**Code Reviews:**

- Provide constructive feedback
- Learn from others' implementations
- Share knowledge and best practices

**Documentation Updates:**

- Update docs when changing APIs or workflows
- Provide clear examples and use cases
- Keep troubleshooting guides current

---

_This comprehensive development workflow guide ensures consistent, high-quality development practices while maintaining team coordination and code quality standards for SmartHire AI._
