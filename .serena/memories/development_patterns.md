# SmartHire AI - Development Patterns and Guidelines

## Component Development Patterns

### React Component Structure
```typescript
// Standard functional component pattern
export default function ComponentName({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="responsive-classes">
      {children}
    </div>
  );
}
```

### Responsive Design Pattern
```tsx
// Mobile-first with progressive enhancement
<div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
  <div className="mx-auto max-w-2xl text-center">
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Content
    </h1>
  </div>
</div>
```

## Performance Patterns

### Image Optimization
- Use Next.js Image component for automatic optimization
- Support for AVIF and WebP formats
- Responsive sizing with device-specific breakpoints

### Font Loading
```typescript
// Optimal font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

### Security Headers
Implemented in `next.config.ts`:
- X-DNS-Prefetch-Control: on
- X-Content-Type-Options: nosniff  
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## TypeScript Patterns

### Strict Type Safety
- No `any` types allowed
- Explicit prop types for components
- Interface definitions for data structures
- Type imports using `import type`

### Metadata Pattern
```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "SEO description",
  keywords: ["relevant", "keywords"],
};
```

## CSS/Styling Patterns

### Tailwind Utility Classes
- **Layout**: `flex`, `grid`, `min-h-screen`
- **Spacing**: `p-4`, `sm:p-8`, `mb-8`, `space-y-4`
- **Typography**: `text-4xl`, `font-bold`, `tracking-tight`
- **Colors**: `text-gray-900`, `text-blue-600`, `bg-blue-50`
- **Responsive**: `sm:text-6xl`, `sm:grid-cols-2`, `lg:grid-cols-3`

### Color Scheme
- **Primary**: Blue (`text-blue-600`, `bg-blue-50`)
- **Text**: Gray scale (`text-gray-900`, `text-gray-600`)
- **Backgrounds**: Subtle grays and whites
- **Borders**: `border-gray-200`

## Architecture Decisions
- **App Router**: Next.js 13+ App Router over Pages Router
- **Server Components**: Default to server components, client when needed
- **Turbopack**: Used for both development and production builds
- **Mobile-First**: All responsive design starts with mobile breakpoint