# Setup Validation Guide

## Overview

This guide provides validation procedures and checklists to ensure your SmartHire AI development environment is properly configured and ready for development.

---

## Quick Validation Script

Run this comprehensive validation to check your entire setup:

```bash
#!/bin/bash
# validate-setup.sh - SmartHire AI Environment Validation

echo "🔍 SmartHire AI Development Environment Validation"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validation tracking
TOTAL_CHECKS=0
PASSED_CHECKS=0

validate_check() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

# System Prerequisites
echo -e "\n${YELLOW}📋 System Prerequisites${NC}"
echo "------------------------"

# Check Node.js version
node_version=$(node --version 2>/dev/null | cut -c2-)
if [ "$(printf '%s\n' "18.17.0" "$node_version" | sort -V | head -n1)" = "18.17.0" ]; then
    echo -e "${GREEN}✅ Node.js version: $node_version (>= 18.17.0)${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Node.js version: $node_version (need >= 18.17.0)${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Check npm version
npm_version=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ npm version: $npm_version${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ npm not found or not working${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Check Git
git --version > /dev/null 2>&1
validate_check "Git installation"

# Project Setup
echo -e "\n${YELLOW}🏗️ Project Setup${NC}"
echo "-------------------"

# Check if in project root
if [ -f "package.json" ] && grep -q "smarthire\|SmartHire" package.json; then
    echo -e "${GREEN}✅ In SmartHire AI project directory${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Not in SmartHire AI project directory${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Check node_modules
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependencies installed (node_modules exists)${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Dependencies not installed (run: npm install)${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Check package.json dependencies
if npm list > /dev/null 2>&1; then
    echo -e "${GREEN}✅ All dependencies resolved correctly${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Dependency issues detected (run: npm install)${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Environment Configuration
echo -e "\n${YELLOW}⚙️ Environment Configuration${NC}"
echo "------------------------------"

# Check .env.local
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local file exists${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))

    # Check essential variables
    if grep -q "NEXT_PUBLIC_SUPABASE_URL=" .env.local; then
        echo -e "${GREEN}✅ Supabase URL configured${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ Supabase URL not configured${NC}"
    fi
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local; then
        echo -e "${GREEN}✅ Supabase anon key configured${NC}"
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    else
        echo -e "${RED}❌ Supabase anon key not configured${NC}"
    fi
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

else
    echo -e "${RED}❌ .env.local file missing (copy from .env.local.example)${NC}"
    TOTAL_CHECKS=$((TOTAL_CHECKS + 3))
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Quality Tools
echo -e "\n${YELLOW}🔧 Quality Tools${NC}"
echo "------------------"

# TypeScript compilation
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✅ TypeScript compilation passes${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ TypeScript compilation errors${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# ESLint
if npm run lint > /dev/null 2>&1; then
    echo -e "${GREEN}✅ ESLint checks pass${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ ESLint errors or warnings${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Build process
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Production build succeeds${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Production build fails${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Test suite
if npm test > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Test suite passes${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Test suite fails${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Development Server
echo -e "\n${YELLOW}🚀 Development Server${NC}"
echo "----------------------"

# Check if port 3000 is available
if ! lsof -i:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Port 3000 available${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️ Port 3000 in use (development server may already be running)${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Git Setup
echo -e "\n${YELLOW}📝 Git Configuration${NC}"
echo "----------------------"

# Check git config
if git config user.name > /dev/null 2>&1 && git config user.email > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Git user configured${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${RED}❌ Git user not configured${NC}"
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Check for upstream remote
if git remote | grep -q upstream; then
    echo -e "${GREEN}✅ Upstream remote configured${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
else
    echo -e "${YELLOW}⚠️ Upstream remote not configured (recommended for contributions)${NC}"
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
fi
TOTAL_CHECKS=$((TOTAL_CHECKS + 1))

# Summary
echo -e "\n${YELLOW}📊 Validation Summary${NC}"
echo "======================"
echo -e "Total checks: $TOTAL_CHECKS"
echo -e "Passed: ${GREEN}$PASSED_CHECKS${NC}"
echo -e "Failed: ${RED}$((TOTAL_CHECKS - PASSED_CHECKS))${NC}"

if [ $PASSED_CHECKS -eq $TOTAL_CHECKS ]; then
    echo -e "\n${GREEN}🎉 All validations passed! Your development environment is ready.${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️ Some validations failed. Please address the issues above.${NC}"
    exit 1
fi
```

Save this script as `validate-setup.sh` and run it:

```bash
chmod +x validate-setup.sh
./validate-setup.sh
```

---

## Step-by-Step Validation Checklist

### Prerequisites Validation

**System Requirements** ✅

- [ ] **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- [ ] **RAM**: Minimum 8GB, 16GB recommended
- [ ] **Storage**: At least 2GB free space
- [ ] **Network**: Stable internet connection for package downloads

**Required Software** ✅

- [ ] **Node.js**: Version 18.17.0 or later
  ```bash
  node --version  # Should show v18.17.0+
  ```
- [ ] **npm**: Version 9.6.7 or later
  ```bash
  npm --version   # Should show 9.6.7+
  ```
- [ ] **Git**: Any recent version
  ```bash
  git --version   # Should work without errors
  ```

### Project Setup Validation

**Repository Setup** ✅

- [ ] **Fork Created**: Your fork exists on GitHub
- [ ] **Clone Successful**: Repository cloned to local machine
- [ ] **Remotes Configured**:
  ```bash
  git remote -v
  # Should show both 'origin' (your fork) and 'upstream' (main repo)
  ```

**Dependencies Installation** ✅

- [ ] **Package Installation**:
  ```bash
  npm install  # Should complete without errors
  ```
- [ ] **Dependencies Resolved**:
  ```bash
  npm list --depth=0  # Should show installed packages
  ```
- [ ] **No Security Vulnerabilities**:
  ```bash
  npm audit  # Should show no high-severity issues
  ```

### Environment Configuration Validation

**Environment Variables** ✅

- [ ] **File Exists**: `.env.local` copied from `.env.local.example`
- [ ] **Basic Variables Set**:
  ```bash
  # Check these variables exist in .env.local:
  grep "NEXT_PUBLIC_APP_URL" .env.local
  grep "NODE_ENV" .env.local
  ```

**Supabase Configuration** ✅ (if available)

- [ ] **Project Created**: Supabase project exists
- [ ] **URL Configured**: `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- [ ] **Keys Configured**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **Connection Test**:
  ```bash
  # This should not error (after completing Supabase setup)
  node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
  ```

### Development Server Validation

**Server Startup** ✅

- [ ] **Port Available**: Port 3000 is free
  ```bash
  lsof -i:3000  # Should show no output
  ```
- [ ] **Server Starts**:
  ```bash
  npm run dev  # Should start without errors
  ```
- [ ] **Browser Access**: http://localhost:3000 loads successfully
- [ ] **Hot Reload**: File changes trigger browser refresh

**Development Features** ✅

- [ ] **Fast Refresh**: React components update without losing state
- [ ] **Error Overlay**: Syntax errors show detailed information
- [ ] **Source Maps**: Debugging shows original source files

### Quality Tools Validation

**MVP Quality Gates** ✅ (All must pass)

- [ ] **TypeScript Compilation**:
  ```bash
  npm run type-check  # Must pass with zero errors
  ```
- [ ] **ESLint Validation**:
  ```bash
  npm run lint        # Must pass with zero warnings
  ```
- [ ] **Production Build**:
  ```bash
  npm run build       # Must succeed
  ```
- [ ] **Test Suite**:
  ```bash
  npm test            # All tests must pass
  ```

**Pre-commit Hooks** ✅

- [ ] **Husky Installed**:
  ```bash
  ls -la .git/hooks/  # Should show pre-commit hook
  ```
- [ ] **Hooks Work**: Make a test commit to verify hooks run
- [ ] **Auto-fixing**: ESLint and Prettier automatically fix issues

### IDE Integration Validation

**VS Code Setup** ✅ (recommended)

- [ ] **Extensions Installed**:
  - TypeScript and JavaScript Language Features
  - Prettier - Code formatter
  - ESLint
  - Tailwind CSS IntelliSense
  - GitLens
- [ ] **Settings Configured**: Workspace settings for formatting and linting
- [ ] **IntelliSense Working**: Auto-completion and type checking active

### Git Workflow Validation

**Git Configuration** ✅

- [ ] **User Configured**:
  ```bash
  git config --global user.name   # Should show your name
  git config --global user.email  # Should show your email
  ```
- [ ] **SSH/HTTPS Access**: Can push and pull from GitHub
- [ ] **Branch Creation**:
  ```bash
  git checkout -b test-validation
  git checkout main
  git branch -D test-validation
  ```

### Performance Validation

**Build Performance** ✅

- [ ] **Development Build**: `npm run dev` starts in < 10 seconds
- [ ] **Production Build**: `npm run build` completes in < 2 minutes
- [ ] **Hot Reload Speed**: File changes reflect in < 3 seconds
- [ ] **Memory Usage**: Development server uses < 1GB RAM

---

## Common Validation Failures

### Node.js Version Issues

**Issue**: Node.js version too old

```bash
# Solution: Update Node.js
# macOS (Homebrew)
brew install node

# Windows: Download from nodejs.org
# Linux: Use NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Dependency Installation Issues

**Issue**: npm install fails with permission errors

```bash
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

**Issue**: Package conflicts or version mismatches

```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

### Environment Variable Issues

**Issue**: .env.local variables not loading

```bash
# Solution: Verify file and restart server
ls -la .env.local              # File should exist
cat .env.local                 # Check contents
npm run dev                    # Restart server
```

### TypeScript/ESLint Issues

**Issue**: Type checking or linting fails

```bash
# Solution: Check specific issues and fix
npm run type-check -- --diagnostics  # Detailed TS errors
npm run lint -- --debug             # Detailed ESLint errors
```

### Build Failures

**Issue**: Production build fails

```bash
# Solution: Clear cache and retry
rm -rf .next
npm run clean
npm run build
```

---

## Automated Validation

### GitHub Actions Validation

Create `.github/workflows/validation.yml` for automated checks:

```yaml
name: Environment Validation
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18.17.0'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Validate TypeScript
        run: npm run type-check

      - name: Validate ESLint
        run: npm run lint

      - name: Validate Build
        run: npm run build

      - name: Validate Tests
        run: npm test
```

### Package.json Scripts

Add validation scripts to `package.json`:

```json
{
  "scripts": {
    "validate": "npm run type-check && npm run lint && npm run build && npm test",
    "validate:quick": "npm run type-check && npm run lint",
    "validate:full": "npm run clean && npm install && npm run validate"
  }
}
```

### Pre-push Hook

Create `.git/hooks/pre-push`:

```bash
#!/bin/bash
# Pre-push validation

echo "🔍 Running pre-push validation..."

# Run quality checks
npm run validate:quick

if [ $? -ne 0 ]; then
    echo "❌ Pre-push validation failed. Push cancelled."
    exit 1
fi

echo "✅ Pre-push validation passed!"
exit 0
```

---

## Validation Metrics

### Setup Time Benchmarks

**Target Times** (for experienced developers):

- **Initial Setup**: < 30 minutes
- **First Build**: < 5 minutes
- **Quality Checks**: < 2 minutes
- **Test Suite**: < 1 minute

**Performance Indicators**:

- Development server startup: < 10 seconds
- Hot reload response: < 3 seconds
- TypeScript checking: < 30 seconds
- Build process: < 2 minutes

### Success Criteria

**Minimum Requirements** (all must pass):

- [ ] All quality gates pass (TypeScript, ESLint, Build, Tests)
- [ ] Development server runs without errors
- [ ] Hot reload functions correctly
- [ ] Pre-commit hooks work properly
- [ ] Environment variables load correctly

**Recommended Optimizations**:

- [ ] IDE integration working (VS Code extensions)
- [ ] Git remotes properly configured
- [ ] Performance metrics within target ranges
- [ ] All documentation accessible
- [ ] Team collaboration tools set up

---

## Troubleshooting Validation Issues

If validation fails, follow this escalation process:

1. **Check Common Issues**: Review [troubleshooting guide](troubleshooting.md)
2. **Clean Install**: Try `npm run reinstall`
3. **Environment Reset**: Delete and recreate `.env.local`
4. **System Requirements**: Verify Node.js, npm, Git versions
5. **Ask for Help**: Create GitHub issue with validation output

---

**🎉 Once all validations pass, your environment is ready for development!**

Continue with the [Development Workflow Guide](development-workflow.md) to start contributing.
