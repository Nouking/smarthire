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

## 🔄 Git Workflow

### Branch Naming Convention

- `main`/`master` - Production branch
- `dev` - Development branch
- `feature/feature-name` - Feature branches
- `bugfix/bug-description` - Bug fix branches
- `hotfix/critical-fix` - Critical hotfix branches

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

---

_This documentation is maintained as part of the SmartHire AI development pipeline. Keep it updated as workflows evolve._
