# SmartHire AI - Technology Stack

## Core Technologies

- **Next.js 15.5.2**: React framework with App Router architecture
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5+**: Strict mode enabled for type safety
- **Tailwind CSS v4**: Utility-first CSS framework with PostCSS integration

## Development Tools

- **ESLint 9+**: Code linting with Next.js TypeScript configuration
- **Turbopack**: Fast bundler for development and builds (--turbopack flag)
- **PostCSS**: CSS processing with Tailwind integration

## Configuration Files

- `tsconfig.json`: TypeScript configuration with strict mode, ES2017 target
- `next.config.ts`: Next.js configuration with performance optimizations
- `eslint.config.mjs`: ESLint flat config format with Next.js rules
- `postcss.config.mjs`: PostCSS configuration for Tailwind
- `tailwindcss`: v4 configuration (modern architecture)

## Path Aliases

- `@/*`: Maps to `./src/*` for clean imports

## Performance Optimizations

- **Image Optimization**: AVIF, WebP formats with responsive sizing
- **Security Headers**: XSS protection, content type sniffing prevention
- **Compression**: Enabled for production builds
- **DNS Prefetch**: Enabled for faster resource loading
- **PWA Foundation**: Headers and configuration ready for PWA implementation

## Project Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
└── types/         # TypeScript type definitions
```
