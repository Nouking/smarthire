# Project Structure Guide

## Overview

SmartHire AI follows a modern Next.js 15 App Router architecture with TypeScript, organized for scalability and maintainability. This guide explains our project structure and organizational principles.

---

## Root Directory Structure

```
smarthire/
├── .bmad-core/              # Build automation configs
├── .git/                    # Git repository data
├── .next/                   # Next.js build output (auto-generated)
├── .vscode/                 # VS Code workspace settings
├── docs/                    # Project documentation
├── node_modules/            # Dependencies (auto-generated)
├── public/                  # Static assets
├── src/                     # Source code (main development directory)
├── .env.local.example       # Environment variables template
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore patterns
├── CLAUDE.md               # AI development instructions
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # Project license
├── README.md               # Project overview and setup
├── jest.config.js          # Jest testing configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Source Code Organization (`src/`)

### Directory Overview

```
src/
├── app/                     # Next.js App Router (pages and layouts)
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries and configurations
├── types/                   # TypeScript type definitions
├── __tests__/               # Global test utilities and setup
└── middleware.ts            # Next.js middleware
```

### Detailed Structure

```
src/
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Route group for authentication
│   │   ├── signin/
│   │   │   └── page.tsx                   # Sign-in page
│   │   └── signup/
│   │       ├── enhanced/
│   │       │   └── page.tsx               # Enhanced signup page
│   │       └── page.tsx                   # Basic signup page
│   ├── auth/                              # Auth-related pages (legacy structure)
│   ├── dashboard/                         # Main application dashboard
│   │   └── page.tsx                       # Dashboard home page
│   ├── onboarding/                        # User onboarding flow
│   │   ├── components/                    # Onboarding-specific components
│   │   ├── actions.ts                     # Server actions for onboarding
│   │   └── page.tsx                       # Onboarding page
│   ├── favicon.ico                        # Site favicon
│   ├── globals.css                        # Global styles and Tailwind imports
│   ├── layout.tsx                         # Root layout component
│   └── page.tsx                           # Home page
├── components/                             # Reusable UI components
│   ├── ui/                                # shadcn/ui components
│   │   ├── __tests__/                     # UI component tests
│   │   ├── alert.tsx                      # Alert component
│   │   ├── button.tsx                     # Button component
│   │   ├── card.tsx                       # Card component
│   │   ├── dialog.tsx                     # Dialog component
│   │   ├── form.tsx                       # Form components
│   │   ├── input.tsx                      # Input component
│   │   ├── label.tsx                      # Label component
│   │   └── ...                            # Other UI components
│   ├── auth/                              # Authentication components
│   │   ├── __tests__/                     # Auth component tests
│   │   ├── enhanced-signup-form.tsx      # Enhanced signup form
│   │   ├── signin-form.tsx                # Sign-in form
│   │   ├── signup-form.tsx                # Basic signup form
│   │   └── registration-success.tsx       # Success message component
│   ├── layout/                            # Layout components
│   │   ├── mobile-container.tsx           # Mobile container wrapper
│   │   ├── mobile-stack.tsx               # Mobile stack layout
│   │   ├── responsive-grid.tsx            # Responsive grid system
│   │   └── index.ts                       # Layout component exports
│   ├── providers/                         # React context providers
│   │   └── auth-provider.tsx              # Authentication context
│   └── test/                              # Test utility components
│       └── mobile-test.tsx                # Mobile testing utilities
├── hooks/                                 # Custom React hooks
│   └── useAuth.ts                         # Authentication hook
├── lib/                                   # Utility libraries
│   ├── auth/                              # Authentication utilities
│   │   ├── actions.ts                     # Auth server actions
│   │   ├── client.ts                      # Client-side auth utilities
│   │   ├── client-exports.ts              # Client auth exports
│   │   ├── enhanced-actions.ts            # Enhanced auth actions
│   │   ├── index.ts                       # Auth library exports
│   │   ├── server.ts                      # Server-side auth utilities
│   │   └── validation.ts                  # Auth validation schemas
│   ├── database/                          # Database operations
│   │   ├── candidates.ts                  # Candidate data operations
│   │   ├── index.ts                       # Database exports
│   │   ├── job-descriptions.ts            # Job description operations
│   │   ├── matches.ts                     # Matching operations
│   │   ├── setup-rls.sql                  # Row Level Security setup
│   │   ├── supabase.ts                    # Supabase client configuration
│   │   ├── users.ts                       # User data operations
│   │   └── validation.ts                  # Database validation schemas
│   ├── storage/                           # File storage utilities
│   │   ├── client.ts                      # Storage client utilities
│   │   ├── config.ts                      # Storage configuration
│   │   └── index.ts                       # Storage exports
│   ├── validation/                        # Validation schemas
│   │   ├── company.ts                     # Company validation
│   │   └── password.ts                    # Password validation
│   ├── __tests__/                         # Library tests
│   │   └── utils.test.ts                  # Utility function tests
│   └── utils.ts                           # General utility functions
├── types/                                 # TypeScript type definitions
│   ├── database.ts                        # Database type definitions
│   ├── onboarding.ts                      # Onboarding type definitions
│   └── registration.ts                    # Registration type definitions
├── __tests__/                             # Global test configuration
│   └── setup.test.ts                      # Jest setup and configuration
└── middleware.ts                          # Next.js middleware for auth
```

---

## Architectural Principles

### 1. Feature-Based Organization

Components and utilities are organized by feature domain:

```
src/components/
├── ui/          # Generic UI components (buttons, inputs, etc.)
├── auth/        # Authentication-specific components
├── layout/      # Layout and responsive components
├── providers/   # React context providers
└── test/        # Testing utilities
```

### 2. Separation of Concerns

Clear separation between different layers:

- **`app/`**: Pages and routing logic
- **`components/`**: UI presentation layer  
- **`lib/`**: Business logic and utilities
- **`hooks/`**: Stateful logic and side effects
- **`types/`**: Type definitions and interfaces

### 3. Co-location of Related Files

Related files are kept close together:

```
src/components/auth/
├── __tests__/                    # Tests next to components
├── enhanced-signup-form.tsx      # Component implementation
├── signin-form.tsx
└── signup-form.tsx
```

---

## Next.js App Router Structure

### Route Organization

```
src/app/
├── (auth)/              # Route group (doesn't affect URL)
│   ├── signin/         # /signin
│   └── signup/         # /signup
├── dashboard/          # /dashboard
├── onboarding/         # /onboarding
├── layout.tsx          # Root layout (applies to all routes)
└── page.tsx           # Home page (/)
```

### File Conventions

- **`page.tsx`**: Creates a route segment
- **`layout.tsx`**: Shared UI for a segment and its children
- **`loading.tsx`**: Loading UI for a segment  
- **`error.tsx`**: Error UI for a segment
- **`not-found.tsx`**: Not found UI for a segment

### Route Groups

Route groups `(folder)` organize routes without affecting URL structure:

```
app/
├── (auth)/             # Grouping for auth pages
│   ├── signin/page.tsx # /signin
│   └── signup/page.tsx # /signup
└── (dashboard)/        # Grouping for app pages  
    └── profile/page.tsx # /profile
```

---

## Component Organization

### shadcn/ui Components (`src/components/ui/`)

Pre-built, customizable UI components:

```
src/components/ui/
├── button.tsx          # Button variants and sizes
├── card.tsx           # Card container component  
├── dialog.tsx         # Modal dialog component
├── form.tsx           # Form wrapper and field components
├── input.tsx          # Input field component
├── label.tsx          # Form label component
└── ...               # Other UI primitives
```

**Usage Pattern:**
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Title</h2>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Action</Button>
      </CardContent>
    </Card>
  );
}
```

### Feature Components

Domain-specific components organized by feature:

```
src/components/auth/
├── enhanced-signup-form.tsx    # Complex signup form
├── signin-form.tsx             # Sign-in form
├── signup-form.tsx             # Basic signup form  
└── registration-success.tsx     # Success state component
```

### Layout Components

Responsive layout utilities:

```
src/components/layout/
├── mobile-container.tsx        # Mobile-optimized container
├── mobile-stack.tsx           # Vertical stacking for mobile
├── responsive-grid.tsx        # Responsive grid system
└── index.ts                   # Centralized exports
```

---

## Library Organization (`src/lib/`)

### Authentication (`src/lib/auth/`)

Authentication-related utilities and configurations:

```
src/lib/auth/
├── actions.ts              # Server actions for auth operations
├── client.ts              # Client-side auth utilities
├── enhanced-actions.ts    # Enhanced auth operations
├── server.ts             # Server-side auth utilities
├── validation.ts         # Auth validation schemas
└── index.ts             # Public auth API exports
```

**Usage Pattern:**
```typescript
// Client-side
import { useAuth } from '@/lib/auth/client';

// Server-side
import { getServerUser } from '@/lib/auth/server';

// Actions
import { signInAction } from '@/lib/auth/actions';
```

### Database (`src/lib/database/`)

Database operations and utilities:

```
src/lib/database/
├── candidates.ts          # Candidate CRUD operations
├── job-descriptions.ts    # Job description operations
├── matches.ts            # AI matching operations
├── users.ts              # User profile operations
├── supabase.ts           # Supabase client configuration
├── validation.ts         # Database validation schemas
└── index.ts             # Database API exports
```

### Storage (`src/lib/storage/`)

File storage operations:

```
src/lib/storage/
├── client.ts             # Storage client operations
├── config.ts            # Storage configuration
└── index.ts            # Storage API exports
```

---

## Type Definitions (`src/types/`)

Centralized TypeScript type definitions:

```
src/types/
├── database.ts           # Database schema types
├── onboarding.ts        # Onboarding flow types
└── registration.ts      # Registration form types
```

**Type Organization Pattern:**
```typescript
// database.ts
export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export interface JobDescription {
  id: string;
  title: string;
  requirements: string[];
  user_id: string;
}
```

---

## Testing Organization

### Test Co-location

Tests are placed next to the components they test:

```
src/components/ui/
├── __tests__/
│   ├── button.test.tsx
│   └── card.test.tsx
├── button.tsx
└── card.tsx
```

### Test Types

- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction testing
- **Utility Tests**: Library function testing

### Test Naming Convention

```
ComponentName.test.tsx        # Component tests
functionName.test.ts         # Utility function tests
featureName.integration.test.tsx # Integration tests
```

---

## Configuration Files

### Next.js Configuration (`next.config.ts`)

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
};

export default nextConfig;
```

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Tailwind Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
```

---

## Import Conventions

### Path Aliases

Use TypeScript path aliases for clean imports:

```typescript
// ✅ Good: Using alias
import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/database/users';

// ❌ Bad: Relative paths
import { Button } from '../../components/ui/button';
import { getUser } from '../../../lib/database/users';
```

### Import Organization

Organize imports in this order:

```typescript
// 1. External packages
import React from 'react';
import { NextRequest } from 'next/server';

// 2. Internal utilities
import { cn } from '@/lib/utils';

// 3. Internal components
import { Button } from '@/components/ui/button';

// 4. Relative imports (if necessary)
import './styles.css';
```

---

## File Naming Conventions

### Component Files
- **PascalCase**: `SignupForm.tsx`, `UserProfile.tsx`
- **kebab-case**: `signup-form.tsx`, `user-profile.tsx` (preferred)

### Utility Files
- **camelCase**: `authUtils.ts`, `formatHelpers.ts`
- **kebab-case**: `auth-utils.ts`, `format-helpers.ts` (preferred)

### Page Files (App Router)
- **Always**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`

### Directory Names
- **kebab-case**: `user-profile/`, `job-descriptions/`
- **camelCase**: `userProfile/`, `jobDescriptions/` (acceptable)

---

## Adding New Features

### 1. Create Feature Structure

```bash
# Create feature directory
mkdir -p src/components/feature-name
mkdir -p src/components/feature-name/__tests__
mkdir -p src/lib/feature-name
```

### 2. Add Components

```typescript
// src/components/feature-name/main-component.tsx
export function MainComponent() {
  // Component implementation
}

// src/components/feature-name/index.ts
export { MainComponent } from './main-component';
```

### 3. Add Business Logic

```typescript
// src/lib/feature-name/operations.ts
export async function performOperation() {
  // Business logic
}

// src/lib/feature-name/index.ts
export { performOperation } from './operations';
```

### 4. Add Types

```typescript
// src/types/feature-name.ts
export interface FeatureData {
  id: string;
  name: string;
}
```

### 5. Add Tests

```typescript
// src/components/feature-name/__tests__/main-component.test.tsx
import { render, screen } from '@testing-library/react';
import { MainComponent } from '../main-component';

describe('MainComponent', () => {
  it('renders correctly', () => {
    render(<MainComponent />);
    // Test assertions
  });
});
```

---

## Best Practices

### 1. Single Responsibility

Each file should have a single, clear responsibility:

```typescript
// ✅ Good: Single component per file
// signup-form.tsx
export function SignupForm() { /* ... */ }

// ❌ Bad: Multiple components in one file
// forms.tsx  
export function SignupForm() { /* ... */ }
export function LoginForm() { /* ... */ }
export function ProfileForm() { /* ... */ }
```

### 2. Clear Naming

Use descriptive, unambiguous names:

```typescript
// ✅ Good: Descriptive names
getUserById(id: string): Promise<User>
validateEmailAddress(email: string): boolean
createJobDescription(data: JobDescriptionData): Promise<JobDescription>

// ❌ Bad: Vague names
get(id: string): Promise<any>
validate(input: string): boolean
create(data: any): Promise<any>
```

### 3. Consistent Export Patterns

Use consistent export patterns across the application:

```typescript
// ✅ Good: Named exports for utilities
export function formatCurrency(amount: number): string { /* ... */ }
export function parseDate(date: string): Date { /* ... */ }

// ✅ Good: Default exports for components
export default function HomePage() { /* ... */ }

// ✅ Good: Index files for public APIs
// src/lib/auth/index.ts
export { signIn, signOut } from './client';
export { getServerUser } from './server';
```

---

## Migration Guidelines

When refactoring or adding new features:

### 1. Follow Existing Patterns

Study existing code structure before adding new files:

```bash
# Examine existing patterns
ls src/components/auth/
ls src/lib/database/
```

### 2. Update Index Files

When adding new components or utilities, update index files:

```typescript
// src/components/ui/index.ts
export { Button } from './button';
export { Card, CardContent, CardHeader } from './card';
export { NewComponent } from './new-component'; // Add new exports
```

### 3. Maintain Test Coverage

Add tests for new components and utilities:

```bash
# Test structure should mirror source structure
src/components/auth/signup-form.tsx
src/components/auth/__tests__/signup-form.test.tsx
```

---

This project structure is designed to scale with the application while maintaining clarity and ease of navigation. Follow these conventions to ensure consistency across the codebase.