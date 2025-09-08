# Development Environment Setup Guide

## Overview

This guide provides detailed instructions for setting up your local development environment for SmartHire AI. Follow these steps to get your development environment running in under 30 minutes.

---

## Prerequisites

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+ recommended)
- **RAM**: Minimum 8GB, 16GB recommended for optimal performance
- **Storage**: At least 2GB free space for dependencies and build artifacts

### Required Software

#### 1. Node.js & npm

**Minimum Versions:**

- Node.js: 18.17.0 or later
- npm: 9.6.7 or later

**Installation:**

**macOS (using Homebrew):**

```bash
brew install node
```

**Windows:**

1. Download from [nodejs.org](https://nodejs.org/)
2. Run the installer with default settings
3. Restart your terminal

**Linux (Ubuntu/Debian):**

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verification:**

```bash
node --version    # Should be v18.17.0 or later
npm --version     # Should be 9.6.7 or later
```

#### 2. Git

**Installation:**

**macOS:**

```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

**Windows:**

1. Download from [git-scm.com](https://git-scm.com/)
2. Install with default settings
3. Use Git Bash or Command Prompt

**Linux:**

```bash
sudo apt-get install git
```

**Configuration:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### 3. Code Editor (Recommended)

**Visual Studio Code** with these extensions:

- TypeScript and JavaScript Language Features
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- GitLens

**Installation:**

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install recommended extensions when prompted

---

## Project Setup

### 1. Repository Setup

**Fork the Repository:**

1. Visit the SmartHire AI repository on GitHub
2. Click "Fork" to create your own copy
3. Clone your fork locally:

```bash
# Replace YOUR_USERNAME with your GitHub username
git clone https://github.com/YOUR_USERNAME/smarthire.git
cd smarthire

# Add upstream remote for syncing
git remote add upstream https://github.com/[main-org]/smarthire.git

# Verify remotes
git remote -v
```

### 2. Dependency Installation

**Install Project Dependencies:**

```bash
# Install all dependencies (this may take 2-5 minutes)
npm install

# Verify installation
npm list --depth=0
```

**Common Installation Issues:**

**Issue:** Permission errors on macOS/Linux

```bash
# Solution: Use npm's built-in fix
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

**Issue:** Network timeout errors

```bash
# Solution: Increase timeout and try alternative registry
npm config set timeout 60000
npm install --registry https://registry.npmjs.org/
```

### 3. Environment Configuration

**Copy Environment Template:**

```bash
cp .env.local.example .env.local
```

**Edit `.env.local` with your values:**

```bash
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI/OpenRouter Configuration (for future use)
OPENROUTER_API_KEY=your_openrouter_api_key
DEEPSEEK_API_KEY=your_deepseek_fallback_key

# Development Configuration
NODE_ENV=development
```

---

## Service Configuration

### Supabase Setup

#### 1. Create Supabase Project

1. Visit [app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose organization and provide project details:
   - **Name**: smarthire-dev-[yourname]
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your location

#### 2. Get API Keys

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### 3. Database Schema (Optional for Development)

The database schema will be automatically set up when you run the application, but you can manually run migrations if needed:

```bash
# Future: Run database migrations
npm run db:migrate
```

### AI Service Setup (Optional)

For local AI development (optional during initial setup):

#### OpenRouter API

1. Visit [openrouter.ai](https://openrouter.ai)
2. Sign up for an account
3. Generate API key in dashboard
4. Add to `.env.local` as `OPENROUTER_API_KEY`

#### DeepSeek API (Fallback)

1. Visit [deepseek.com](https://deepseek.com)
2. Create account and generate API key
3. Add to `.env.local` as `DEEPSEEK_API_KEY`

---

## Development Server

### Start the Development Server

```bash
# Start the development server
npm run dev
```

**Expected Output:**

```
  ▲ Next.js 15.5.2
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.XXX:3000

 ✓ Ready in 2.3s
```

### Verify Setup

1. **Open Browser**: Navigate to [http://localhost:3000](http://localhost:3000)
2. **Check Console**: Ensure no error messages in browser console
3. **Test Navigation**: Verify all pages load correctly

### Development Features

**Hot Reload**: Changes to code automatically refresh the browser
**Fast Refresh**: React components update without losing state
**Error Overlay**: Detailed error information appears in the browser
**TypeScript Checking**: Real-time type checking in the editor

---

## Quality Tools Setup

### Pre-commit Hooks

Install Git hooks for automated quality checks:

```bash
# Install Husky (pre-commit hooks)
npm run prepare

# Verify installation
ls -la .git/hooks/
```

### IDE Integration

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

## Testing Your Setup

### Run Quality Checks

```bash
# Run all quality checks (should all pass ✅)
npm run quality

# Individual checks
npm run type-check    # TypeScript compilation
npm run lint          # ESLint checks
npm run build         # Production build
npm test              # Test execution
```

**Expected Results:**

- ✅ TypeScript: No compilation errors
- ✅ ESLint: No warnings or errors
- ✅ Build: Successful production build
- ✅ Tests: All tests passing

### Development Workflow Test

1. **Create Test Branch:**

   ```bash
   git checkout -b test-setup
   ```

2. **Make a Small Change:**

   ```bash
   # Edit src/app/page.tsx to add a comment
   # Commit the change
   git add .
   git commit -m "test: verify development setup"
   ```

3. **Quality Gates:**
   - Pre-commit hooks should run automatically
   - All checks should pass

4. **Cleanup:**
   ```bash
   git checkout main
   git branch -D test-setup
   ```

---

## Troubleshooting

### Common Setup Issues

**Issue**: "npm ERR! permission denied"

```bash
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
```

**Issue**: "Port 3000 already in use"

```bash
# Solution: Kill process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

**Issue**: "Module not found" errors

```bash
# Solution: Clear cache and reinstall
npm run clean
npm run reinstall
```

**Issue**: TypeScript compilation errors

```bash
# Solution: Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server
# Or run manual check
npx tsc --noEmit
```

**Issue**: Supabase connection errors

```bash
# Solution: Verify environment variables
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)"
```

### Performance Issues

**Slow Installation:**

- Use `npm ci` for faster, clean installs
- Clear npm cache: `npm cache clean --force`
- Check network connection and try different registry

**Slow Development Server:**

- Ensure sufficient RAM (8GB+)
- Close unnecessary applications
- Use `npm run dev` instead of `npm run dev --turbo` if issues persist

### Environment-Specific Issues

**Windows-Specific:**

- Use Git Bash for Unix-like commands
- Ensure Windows Defender isn't scanning node_modules
- Use `npm run` instead of direct binary calls

**macOS-Specific:**

- Install Xcode Command Line Tools if missing
- Use Homebrew for package management
- Check file permissions in project directory

**Linux-Specific:**

- Install build-essential: `sudo apt-get install build-essential`
- Ensure proper Node.js permissions
- Check firewall settings for port 3000

---

## Next Steps

Once your environment is set up:

1. **Read Documentation**: Review [project structure guide](project-structure.md)
2. **Development Workflow**: Learn our [development workflow](development-workflow.md)
3. **Component Patterns**: Study [component patterns](component-patterns.md)
4. **Make Your First Contribution**: Check [CONTRIBUTING.md](../../CONTRIBUTING.md)

---

## Environment Validation Checklist

Use this checklist to verify your setup:

### Prerequisites ✅

- [ ] Node.js 18.17+ installed and verified
- [ ] npm 9.6.7+ installed and verified
- [ ] Git installed and configured
- [ ] VS Code installed with recommended extensions

### Project Setup ✅

- [ ] Repository cloned with upstream remote
- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Development server starts without errors

### Quality Tools ✅

- [ ] Pre-commit hooks installed and working
- [ ] All quality checks pass (`npm run quality`)
- [ ] IDE integration working (formatting, linting)
- [ ] Test suite runs successfully

### Service Integration ✅

- [ ] Supabase project created and configured
- [ ] Database connection verified
- [ ] Authentication flow accessible
- [ ] File storage accessible (if applicable)

### Development Workflow ✅

- [ ] Can create and switch branches
- [ ] Hot reload working in development
- [ ] Build process successful
- [ ] Can make commits with quality checks

**Setup Time Target**: < 30 minutes for experienced developers

---

**🎉 Congratulations! Your development environment is ready.**

Continue with the [Development Workflow Guide](development-workflow.md) to start contributing.
