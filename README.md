# SmartHire AI 🚀

## Overview

SmartHire AI is an intelligent recruitment platform that matches candidates with job opportunities using advanced AI processing. Built for HR professionals who need fast, accurate candidate screening and job matching capabilities.

### Key Features

- **⚡ 30-Second Processing**: AI-powered CV analysis and job matching in under 30 seconds
- **🎯 Intelligent Matching**: Advanced semantic search using pgvector and OpenRouter AI models
- **📱 Mobile-First Design**: Responsive web application optimized for all devices
- **🔒 Enterprise Security**: Supabase authentication with Row Level Security (RLS)
- **💰 Cost-Effective**: Designed to operate under $8/month for 100+ users

---

## 🚀 Quick Start (< 30 minutes)

### Prerequisites

- **Node.js**: Version 18.17 or later
- **npm**: Version 9.6.7 or later
- **Git**: For version control

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/[your-org]/smarthire.git
cd smarthire

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your values (see Configuration section below)
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application running.

---

## 🛠️ Technology Stack

### Core Technologies

- **Framework**: Next.js 15 with App Router and TypeScript strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui component library
- **Database**: Supabase PostgreSQL with pgvector for semantic search
- **Authentication**: Supabase Auth with email/password
- **Storage**: Supabase Storage for CV file uploads
- **AI Processing**: OpenRouter API with DeepSeek fallback models
- **Deployment**: Vercel with automated CI/CD via GitHub Actions

### Development Tools

- **Type Checking**: TypeScript with strict mode enabled
- **Linting**: ESLint with Next.js and Prettier configurations
- **Testing**: Jest with React Testing Library
- **Git Hooks**: Husky with lint-staged for pre-commit quality checks

---

## ⚙️ Configuration

### Required Environment Variables

Update your `.env.local` file with the following variables:

```bash
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI/OpenRouter Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
DEEPSEEK_API_KEY=your_deepseek_fallback_key

# Development Configuration
NODE_ENV=development
```

### Getting Supabase Keys

1. Visit [Supabase Dashboard](https://app.supabase.com)
2. Create a new project or select existing project
3. Go to **Settings** > **API**
4. Copy the **Project URL** and **anon public** key
5. Copy the **service_role** key for server-side operations

### Getting AI API Keys

- **OpenRouter**: Sign up at [openrouter.ai](https://openrouter.ai) for cost-effective AI processing
- **DeepSeek**: Register at [deepseek.com](https://deepseek.com) for fallback capability

---

## 📦 Available Scripts

### Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Preview production build locally
npm run build && npm start
```

### Quality Assurance Commands

```bash
# Run all quality checks
npm run quality

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Testing
npm test
npm run test:watch
npm run test:coverage
npm run test:ci
```

### Utility Commands

```bash
# Clean build artifacts
npm run clean

# Reinstall dependencies
npm run reinstall

# Prepare git hooks
npm run prepare
```

---

## 📁 Project Structure

```
smarthire/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router pages
│   │   ├── auth/                 # Authentication pages
│   │   ├── dashboard/            # Main application pages
│   │   ├── onboarding/           # User onboarding flow
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles and Tailwind imports
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components
│   │   └── providers/            # React context providers
│   ├── lib/                      # Utility libraries
│   │   ├── auth/                 # Authentication utilities
│   │   ├── database/             # Database operations
│   │   ├── storage/              # File storage utilities
│   │   └── validation/           # Form validation schemas
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript type definitions
│   └── __tests__/                # Test utilities and setup
├── docs/                         # Documentation
│   ├── core/                     # Core project documentation
│   ├── development/              # Development guides
│   └── completed-tasks.md        # Implementation history
├── public/                       # Static assets
├── .bmad-core/                   # Build automation configs
└── Configuration files           # Package.json, tsconfig, etc.
```

---

## 🔧 Development Workflow

### Branch Naming Convention

- **Epic Tasks**: `dev-e{epic}-t{task}-{kebab-case-description}`
- **Features**: `feature/{kebab-case-name}`
- **Bug Fixes**: `fix/{kebab-case-description}`
- **Documentation**: `docs/{kebab-case-topic}`

### Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): implement enhanced signup flow
fix(ui): resolve mobile responsive issues
docs(readme): update setup instructions
```

### Quality Gates (Required)

Before any pull request, ensure all quality gates pass:

```bash
# All checks must pass ✅
npm run type-check    # TypeScript compilation with zero errors
npm run lint          # ESLint with zero warnings
npm run build         # Production build succeeds
npm run test          # All tests pass
```

---

## 🏗️ Architecture Highlights

### Mobile-First Design

- **Responsive Grid**: Automatic layout adaptation from mobile (360px) to desktop (1200px+)
- **Touch-Optimized**: All interactive elements sized for touch interaction
- **Progressive Web App**: Installable with offline capabilities

### Performance Optimization

- **30-Second SLA**: Optimized processing pipeline for sub-30-second CV analysis
- **Edge Caching**: Vercel Edge Network for global performance
- **Database Indexing**: pgvector indexes for semantic search performance
- **Cost Monitoring**: Built-in usage tracking to maintain $8/month budget

### Security Features

- **Row Level Security**: Database-level access control via Supabase RLS
- **CSRF Protection**: Server Actions provide built-in CSRF protection
- **Input Validation**: Zod schemas for type-safe form validation
- **File Upload Security**: Secure CV storage with access controls

---

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link GitHub repository to Vercel
2. **Environment Variables**: Add production environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on push to `main` branch

### Production Environment Variables

Ensure these are set in your production environment:

```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_SUPABASE_URL=your_prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_key
OPENROUTER_API_KEY=your_prod_openrouter_key
DEEPSEEK_API_KEY=your_prod_deepseek_key
NODE_ENV=production
```

---

## 📚 Documentation

- **[Technical Design](docs/core/smarthire_technical_design.md)**: Complete architecture specification
- **[Implementation Plan](docs/core/smarthire_implementation_plan.md)**: 16-week development timeline
- **[Product Requirements](docs/core/smarthire_mvp_prd.md)**: Business requirements and user stories
- **[Development Guides](docs/development/)**: Detailed setup and workflow documentation
- **[Contributing](CONTRIBUTING.md)**: Contribution guidelines and standards

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup and workflow
- Code standards and quality requirements
- Pull request process and review guidelines
- Testing requirements and procedures

---

## 📞 Support & Contact

- **Issues**: Report bugs and feature requests via [GitHub Issues](https://github.com/[your-org]/smarthire/issues)
- **Documentation**: Find detailed guides in the [`docs/`](docs/) directory
- **Development**: See [Development Workflow](docs/development/development-workflow.md)

---

## 🏷️ Version & License

- **Version**: 0.1.0 (MVP Development Phase)
- **License**: [LICENSE](LICENSE)
- **Node.js**: >= 18.17.0
- **npm**: >= 9.6.7

---

**Built with ❤️ by the SmartHire AI team**