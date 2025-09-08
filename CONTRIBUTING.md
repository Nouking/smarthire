# Contributing to SmartHire AI 🤝

Welcome to SmartHire AI! We're excited you're interested in contributing. This guide will help you understand our development standards and contribution workflow.

---

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js**: Version 18.17 or later
- **npm**: Version 9.6.7 or later
- **Git**: For version control
- **Code Editor**: VS Code recommended with TypeScript and Prettier extensions

### Development Setup

1. **Fork & Clone**

   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/smarthire.git
   cd smarthire

   # Add upstream remote
   git remote add upstream https://github.com/[main-org]/smarthire.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Copy and configure environment variables
   cp .env.local.example .env.local
   # Edit .env.local with your development values
   ```

4. **Verify Setup**
   ```bash
   # Run quality checks to ensure everything works
   npm run quality
   npm run dev
   ```

---

## 🏗️ Development Workflow

### Branch Strategy

We use a feature branch workflow with the following naming conventions:

#### Epic Tasks (E14-TX format)

```bash
dev-e{epic}-t{task}-{kebab-case-description}
```

**Examples:**

- `dev-e14-t1-nextjs-foundation-setup`
- `dev-e14-t6-documentation-dev-environment`

#### General Development

```bash
feature/{kebab-case-name}        # New features
fix/{kebab-case-description}     # Bug fixes
docs/{kebab-case-topic}         # Documentation updates
chore/{kebab-case-task}         # Maintenance tasks
```

### Commit Standards

We follow [Conventional Commits](https://www.conventionalcommits.org/) with this format:

```
type(scope): description

[optional body]

[optional footer(s)]
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without feature changes
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

#### Examples

```bash
feat(auth): implement enhanced signup validation
fix(ui): resolve mobile responsive grid layout
docs(readme): update API configuration section
refactor(database): optimize user query performance
test(auth): add comprehensive signup form tests
```

---

## 📋 Code Standards

### TypeScript Requirements

- **Strict Mode**: All code must pass TypeScript strict mode compilation
- **Type Safety**: No `any` types allowed (use `unknown` or specific types)
- **Interface Definitions**: Create interfaces for all data structures
- **Generic Types**: Use generics for reusable components and utilities

```typescript
// ✅ Good: Explicit typing
interface User {
  id: string;
  email: string;
  name: string | null;
}

const fetchUser = async (id: string): Promise<User> => {
  // Implementation
};

// ❌ Bad: Using any
const fetchUser = async (id: any): Promise<any> => {
  // Implementation
};
```

### Component Standards

#### React Components

```typescript
// ✅ Good: Proper component structure
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ variant, children, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium',
        variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

#### shadcn/ui Usage

- **Consistent Components**: Use shadcn/ui components for all UI elements
- **Proper Variants**: Utilize component variants for consistent styling
- **Accessibility**: Ensure all components meet AA accessibility standards

```typescript
// ✅ Good: Using shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ❌ Bad: Custom styled elements without accessibility
<div className="clickable-div" onClick={handleClick}>
  Custom Button
</div>
```

### File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route groups
│   ├── dashboard/         # Feature-based organization
│   └── api/              # API routes (if needed)
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── feature-name/     # Feature-specific components
│   └── common/           # Shared components
├── lib/
│   ├── auth/             # Authentication utilities
│   ├── database/         # Database operations
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── __tests__/            # Test utilities
```

### Styling Guidelines

#### Tailwind CSS Best Practices

```typescript
// ✅ Good: Mobile-first responsive design
<div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
  <div className="w-full md:w-1/2">Content</div>
  <div className="w-full md:w-1/2">Content</div>
</div>

// ✅ Good: Using utility classes with cn()
import { cn } from '@/lib/utils';

<button className={cn(
  'px-4 py-2 rounded-md',
  isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
)}>
```

#### Component Variants

Use `class-variance-authority` for component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

---

## 🧪 Testing Requirements

### Test Coverage Standards

- **Components**: All UI components must have tests
- **Utilities**: All utility functions must be tested
- **Hooks**: Custom hooks require comprehensive tests
- **Integration**: Key user workflows need integration tests

### Testing Framework

We use **Jest** with **React Testing Library**:

```typescript
// ✅ Good: Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

---

## 🔍 Quality Assurance

### Mandatory Quality Gates

Before submitting any pull request, ALL quality gates must pass:

```bash
# 1. TypeScript compilation (zero errors)
npm run type-check

# 2. ESLint checks (zero warnings)
npm run lint

# 3. Production build (successful)
npm run build

# 4. All tests pass
npm test

# Run all quality checks at once
npm run quality
```

### Pre-commit Hooks

We use Husky with lint-staged for automated quality checks:

```bash
# Automatically runs on git commit
- TypeScript type checking
- ESLint with auto-fix
- Prettier formatting
- Test execution for changed files
```

If pre-commit hooks fail, fix the issues before committing.

---

## 📝 Pull Request Process

### PR Preparation

1. **Update Your Branch**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Quality Gates**

   ```bash
   # Ensure all checks pass
   npm run quality
   ```

3. **Clear Commit History**
   ```bash
   # Squash commits if necessary
   git rebase -i HEAD~n
   ```

### PR Description Template

```markdown
## Description

Brief description of changes made

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to change)
- [ ] Documentation update

## Testing

- [ ] All quality gates pass (`npm run quality`)
- [ ] New tests added for new functionality
- [ ] All existing tests pass
- [ ] Manual testing completed

## Checklist

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Commented any hard-to-understand areas
- [ ] Documentation updated if needed
- [ ] No console.log statements left in code

## Screenshots (if applicable)

Add screenshots of UI changes

## Related Issues

Closes #(issue number)
```

### Review Process

1. **Automated Checks**: All CI/CD checks must pass
2. **Code Review**: At least one approving review required
3. **Quality Gates**: Manual verification of quality gate compliance
4. **Documentation**: Ensure documentation is updated if needed

---

## 🏗️ Architecture Guidelines

### Next.js App Router Patterns

```typescript
// ✅ Good: Server Component with proper typing
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UserPage({ params, searchParams }: PageProps) {
  const user = await getUser(params.id);

  return (
    <div>
      <h1>{user.name}</h1>
      {/* Component content */}
    </div>
  );
}
```

### Database Patterns

```typescript
// ✅ Good: Supabase with proper error handling
export async function getUser(id: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}
```

### Authentication Patterns

```typescript
// ✅ Good: Server-side auth check
import { createClient } from '@/lib/auth/server';

export async function getServerUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return user;
}
```

---

## 📚 Resources & Documentation

### Essential Reading

- **[Technical Design](docs/core/smarthire_technical_design.md)**: Complete architecture specification
- **[Development Workflow](docs/development/development-workflow.md)**: Detailed development procedures
- **[Project Structure](docs/development/project-structure.md)**: Codebase organization guide
- **[Component Patterns](docs/development/component-patterns.md)**: shadcn/ui usage guidelines

### External Resources

- **[Next.js Documentation](https://nextjs.org/docs)**: Framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)**: Styling framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Component library
- **[Supabase Docs](https://supabase.com/docs)**: Database and auth platform
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**: TypeScript reference

---

## 🚨 Common Issues & Solutions

### Development Issues

**Issue**: TypeScript compilation errors

```bash
# Solution: Check types and run diagnostics
npm run type-check
npx tsc --noEmit --diagnostics
```

**Issue**: ESLint warnings/errors

```bash
# Solution: Auto-fix where possible
npm run lint:fix
```

**Issue**: Supabase connection issues

```bash
# Solution: Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Build Issues

**Issue**: Production build fails

```bash
# Solution: Check for dynamic imports and environment variables
npm run build 2>&1 | grep ERROR
```

**Issue**: Tests failing

```bash
# Solution: Run tests with verbose output
npm test -- --verbose
```

---

## 📞 Getting Help

### Support Channels

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check [docs/development/](docs/development/) for guides
- **Code Review**: Ask questions in pull request comments

### Development Environment Issues

If you encounter setup issues:

1. Check [docs/development/troubleshooting.md](docs/development/troubleshooting.md)
2. Verify all prerequisites are installed correctly
3. Ensure environment variables are properly configured
4. Try the reinstall command: `npm run reinstall`

---

## 🎯 Contribution Goals

Our contribution goals align with the SmartHire AI mission:

- **Quality First**: Maintain high code quality and test coverage
- **Performance Focus**: Optimize for the 30-second processing SLA
- **Mobile-First**: Ensure excellent mobile user experience
- **Cost Efficiency**: Keep operational costs under $8/month target
- **Security Priority**: Maintain enterprise-grade security standards

---

**Thank you for contributing to SmartHire AI! 🚀**

Together, we're building the future of intelligent recruitment technology.
