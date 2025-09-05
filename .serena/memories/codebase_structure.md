# SmartHire AI - Codebase Structure

## Project Root Structure

```
/Users/nouking/Workspace/SmartHR/smarthire/
├── .serena/              # Serena MCP configuration
├── .claude/              # Claude Code settings
├── src/                  # Main application source code
├── docs/                 # Project documentation
├── public/               # Static assets
├── web-bundles/          # Web bundle configurations
├── .bmad-core/           # Build/deployment configurations
├── package.json          # Node.js dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
└── CLAUDE.md             # AI assistant instructions
```

## Source Code Structure (src/)

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   └── favicon.ico       # Application icon
├── components/           # Reusable React components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── types/                # TypeScript type definitions
```

## Key Files Analysis

### Layout (src/app/layout.tsx)

- **Font**: Inter font with CSS variable setup
- **Metadata**: SEO-optimized with SmartHire branding
- **Viewport**: Mobile-responsive configuration
- **Structure**: Minimal layout with main content area

### Homepage (src/app/page.tsx)

- **Hero Section**: SmartHire AI branding with blue accent
- **Features**: Three-column grid showcasing AI matching, speed, and mobile design
- **Status**: Development phase indicator
- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS display

## Documentation Structure

Based on CLAUDE.md references:

- **Main Docs**: Located in `family-tree/docs/` subdirectory
- **Master Documents**: PROJECT-OVERVIEW.md, IMPROVEMENT-TASK-TRACKING.md
- **Task Tracking**: Dual system for original tasks and improvement plan tasks
- **Completion Archive**: `family-tree/docs/completed-tasks.md`

## Working Directory Conventions

- **Commands**: Always run from project root
- **Paths**: Use repository-relative paths in documentation
- **Main App**: Core application logic in `family-tree/` subdirectory (if applicable)
