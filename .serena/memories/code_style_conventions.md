# SmartHire AI - Code Style and Conventions

## TypeScript Configuration

- **Strict Mode**: Enabled for maximum type safety
- **Target**: ES2017 with modern library support
- **Module Resolution**: Bundler (Next.js optimized)
- **JSX**: Preserve (handled by Next.js)
- **Path Aliases**: Use `@/*` for `src/*` imports

## Code Style Standards

### File Naming

- **React Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (App Router convention)
- **Utilities**: camelCase (e.g., `apiHelpers.ts`)
- **Types**: PascalCase interfaces/types (e.g., `UserData.ts`)

### React Component Conventions

```typescript
// Functional components with TypeScript
export default function ComponentName({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {children}
    </div>
  );
}
```

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities (using `@/` alias)
4. CSS imports (last)

### CSS/Styling Conventions

- **Tailwind CSS**: Primary styling method with utility-first approach
- **Mobile-First**: Responsive design starting with mobile breakpoints
- **Class Names**: Use Tailwind utilities, avoid custom CSS when possible
- **Responsive**: `sm:`, `md:`, `lg:` breakpoint modifiers

### TypeScript Patterns

- **Strict Types**: No `any` usage, prefer explicit types
- **Interface over Type**: Use interfaces for object shapes
- **Props Types**: Inline prop types for simple components
- **Export Types**: Export types when reused across files

## ESLint Rules

- **Next.js Rules**: `next/core-web-vitals` and `next/typescript`
- **Automatic Fixing**: Many style issues auto-fixed on save
- **TypeScript Integration**: Full TypeScript error checking

## Performance Guidelines

- **Image Optimization**: Use Next.js Image component
- **Bundle Size**: Monitor and minimize client-side JavaScript
- **Server Components**: Prefer server components when possible
- **Lazy Loading**: Use dynamic imports for heavy components

## Architecture Patterns

- **App Router**: Use Next.js 13+ App Router architecture
- **Server/Client Components**: Clear separation of server vs client logic
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Utility Functions**: Centralize common functions in `lib/`
