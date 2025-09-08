# Troubleshooting Guide

## Overview

This guide helps you resolve common issues encountered during SmartHire AI development. Issues are organized by category with step-by-step solutions.

---

## Setup & Installation Issues

### Node.js & npm Issues

#### Issue: "npm command not found"

**Symptoms:**
```bash
$ npm --version
bash: npm: command not found
```

**Solutions:**

**macOS:**
```bash
# Install via Homebrew
brew install node

# Or download from nodejs.org and reinstall
```

**Windows:**
```bash
# Download and reinstall from nodejs.org
# Ensure "Add to PATH" is checked during installation
# Restart Command Prompt/PowerShell
```

**Linux (Ubuntu/Debian):**
```bash
# Install via package manager
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version && npm --version
```

#### Issue: "Permission denied" errors during npm install

**Symptoms:**
```bash
$ npm install
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solutions:**

**macOS/Linux:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use npm's built-in fix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

**Windows:**
```bash
# Run Command Prompt/PowerShell as Administrator
# Or use npm's Windows installer fix
npm install -g npm
```

#### Issue: "ENOTFOUND" or timeout errors during npm install

**Symptoms:**
```bash
npm ERR! network request to https://registry.npmjs.org failed, reason: getaddrinfo ENOTFOUND
```

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Try different registry
npm install --registry https://registry.npmjs.org/

# Increase timeout
npm config set timeout 60000

# Check network/firewall settings
ping registry.npmjs.org
```

---

## Development Server Issues

### Port Issues

#### Issue: "Port 3000 already in use"

**Symptoms:**
```bash
$ npm run dev
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Find and kill process using port:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Use different port:**
```bash
# Set PORT environment variable
PORT=3001 npm run dev

# Or modify package.json
"dev": "next dev -p 3001"
```

#### Issue: Development server won't start

**Symptoms:**
```bash
$ npm run dev
ready - started server on 0.0.0.0:3000
# But browser shows "This site can't be reached"
```

**Solutions:**
```bash
# Check if Node.js process is running
ps aux | grep node

# Kill all Node.js processes and restart
pkill -f node
npm run dev

# Try localhost instead of 0.0.0.0
npm run dev -- -H localhost

# Check firewall settings
# Windows: Windows Defender Firewall
# macOS: System Preferences > Security & Privacy > Firewall
```

### Hot Reload Issues

#### Issue: Hot reload not working

**Symptoms:**
- File changes don't trigger browser refresh
- Need to manually refresh browser to see changes

**Solutions:**
```bash
# Check file watcher limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# Clear Next.js cache
rm -rf .next
npm run dev

# Check if files are being watched
# Ensure you're not editing in node_modules or other excluded directories
```

---

## Build & Compilation Issues

### TypeScript Issues

#### Issue: "Cannot find module" errors

**Symptoms:**
```bash
error TS2307: Cannot find module '@/components/ui/button' or its corresponding type declarations.
```

**Solutions:**
```bash
# Check tsconfig.json path mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Restart TypeScript server in VS Code
# Command Palette > TypeScript: Restart TS Server

# Check file exists at expected location
ls -la src/components/ui/button.tsx

# Clear TypeScript cache
rm -rf node_modules/@types
npm install
```

#### Issue: Type errors in strict mode

**Symptoms:**
```bash
error TS2322: Type 'string | null' is not assignable to type 'string'
error TS2531: Object is possibly 'null'
```

**Solutions:**
```typescript
// Use type guards
if (user?.name) {
  console.log(user.name); // TypeScript knows name is not null
}

// Use nullish coalescing
const userName = user?.name ?? 'Anonymous';

// Use optional chaining
const email = user?.profile?.email;

// Type assertions (use carefully)
const name = user!.name; // Non-null assertion
```

#### Issue: Module resolution errors

**Symptoms:**
```bash
Module not found: Can't resolve 'src/components/Button'
```

**Solutions:**
```bash
# Check import paths are correct
import { Button } from '@/components/ui/button'; // ✅ Correct
import { Button } from 'src/components/ui/button'; // ❌ Wrong

# Verify file extensions
import './styles.css'; // ✅ Correct
import './styles';     // ❌ Missing extension

# Check case sensitivity
import { Button } from '@/components/ui/Button'; // File: button.tsx ❌
import { Button } from '@/components/ui/button'; // File: button.tsx ✅
```

### Build Failures

#### Issue: Production build fails

**Symptoms:**
```bash
$ npm run build
> Build error occurred
Error: Build failed because of webpack errors
```

**Solutions:**
```bash
# Clear build cache
rm -rf .next
npm run clean

# Check for environment variable issues
npm run build 2>&1 | grep -i "env\|environment"

# Build with verbose output
npm run build -- --debug

# Check for dynamic imports that might fail in production
# Replace dynamic imports with static ones where possible
```

#### Issue: Out of memory during build

**Symptoms:**
```bash
<--- Last few GCs --->
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

**Solutions:**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or in package.json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"

# For Windows
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

---

## Database & Supabase Issues

### Connection Issues

#### Issue: "Invalid API key" or connection refused

**Symptoms:**
```bash
Error: Invalid API key
Error: fetch failed
```

**Solutions:**
```bash
# Verify environment variables
node -e "console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)"
node -e "console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)"

# Check .env.local file exists and has correct values
ls -la .env.local
cat .env.local

# Restart development server after env changes
npm run dev

# Verify Supabase project is running
# Check Supabase dashboard for project status
```

#### Issue: "Row Level Security policy violation"

**Symptoms:**
```bash
Error: new row violates row-level security policy
```

**Solutions:**
```sql
-- Check RLS policies in Supabase dashboard
-- SQL Editor > Run this query to see policies:
SELECT * FROM pg_policies WHERE tablename = 'your_table_name';

-- Disable RLS temporarily for testing (NOT for production)
ALTER TABLE your_table_name DISABLE ROW LEVEL SECURITY;

-- Or create proper policy
CREATE POLICY "Users can insert their own data" ON your_table_name
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Authentication Issues

#### Issue: User authentication fails

**Symptoms:**
```bash
Error: Invalid login credentials
User is null after authentication
```

**Solutions:**
```typescript
// Check authentication flow
import { createClient } from '@/lib/auth/client';

const supabase = createClient();
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

if (error) {
  console.error('Auth error:', error.message);
  // Handle specific error cases
}

// Verify user session
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);
```

---

## CSS & Styling Issues

### Tailwind CSS Issues

#### Issue: Tailwind styles not applied

**Symptoms:**
- Classes like `bg-blue-500` don't work
- No styling appears in browser

**Solutions:**
```bash
# Check if Tailwind is imported in globals.css
# src/app/globals.css should have:
@tailwind base;
@tailwind components;
@tailwind utilities;

# Verify tailwind.config.js content paths
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Make sure this matches your structure
  ],
  // ...
}

# Clear build cache
rm -rf .next
npm run dev

# Check if PostCSS is configured
# postcss.config.js should exist with tailwindcss plugin
```

#### Issue: Custom Tailwind classes not working

**Symptoms:**
```css
/* Custom classes in globals.css don't work */
.custom-button {
  @apply bg-blue-500 text-white;
}
```

**Solutions:**
```css
/* Use @layer directive */
@layer components {
  .custom-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded;
  }
}

/* Or use traditional CSS */
.custom-button {
  background-color: rgb(59 130 246);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

### Responsive Design Issues

#### Issue: Mobile layout broken

**Symptoms:**
- Horizontal scrolling on mobile
- Elements overflow screen
- Touch targets too small

**Solutions:**
```typescript
// Use mobile-first responsive design
<div className="w-full px-4 md:px-8 lg:px-12">
  <button className="w-full py-3 md:w-auto md:px-6 md:py-2">
    Mobile: full width, Desktop: auto width
  </button>
</div>

// Check viewport meta tag in layout.tsx
<meta name="viewport" content="width=device-width, initial-scale=1" />

// Use container classes
<div className="container mx-auto px-4">
  Content here
</div>
```

---

## Testing Issues

### Jest Configuration Issues

#### Issue: Tests fail to run

**Symptoms:**
```bash
$ npm test
● Test environment jest-environment-jsdom not found
```

**Solutions:**
```bash
# Install missing dependencies
npm install --save-dev jest-environment-jsdom @testing-library/jest-dom

# Check jest.config.js exists and is properly configured
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.test.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

# Ensure setup file exists
// src/__tests__/setup.test.ts
import '@testing-library/jest-dom';
```

#### Issue: Module import errors in tests

**Symptoms:**
```bash
Cannot resolve module '@/components/ui/button'
```

**Solutions:**
```javascript
// Update jest.config.js module mapping
module.exports = {
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

// Install identity-obj-proxy for CSS imports
npm install --save-dev identity-obj-proxy
```

### Component Testing Issues

#### Issue: React component tests fail

**Symptoms:**
```bash
ReferenceError: React is not defined
TypeError: Cannot read property 'createElement' of undefined
```

**Solutions:**
```typescript
// Ensure React is imported in test files
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../button';

// Or configure Jest to auto-import React
// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx', // This allows React 17+ JSX transform
      },
    }],
  },
};
```

---

## Performance Issues

### Slow Development Experience

#### Issue: Slow hot reload and compilation

**Symptoms:**
- Changes take 10+ seconds to reflect
- High CPU usage during development
- Frequent "Compiling..." messages

**Solutions:**
```bash
# Increase Node.js memory for development
export NODE_OPTIONS="--max-old-space-size=4096"

# Exclude unnecessary directories from file watching
# next.config.ts
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/node_modules', '**/.git', '**/.next'],
    };
    return config;
  },
};

# Close unnecessary applications
# Use production build for performance testing
npm run build && npm start
```

#### Issue: Large bundle size

**Symptoms:**
```bash
Warning: Large bundle size detected
Page size exceeds recommended limits
```

**Solutions:**
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build

# Common optimizations:
# 1. Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'));

# 2. Optimize images with Next.js Image component
import Image from 'next/image';

# 3. Remove unused dependencies
npm install --save-dev depcheck
npx depcheck
```

---

## Git & Version Control Issues

### Merge Conflicts

#### Issue: Merge conflicts during git pull

**Symptoms:**
```bash
$ git pull upstream main
CONFLICT (content): Merge conflict in src/components/Button.tsx
Automatic merge failed; fix conflicts and then commit the result.
```

**Solutions:**
```bash
# View conflicted files
git status

# Open file and resolve conflicts (remove <<< === >>> markers)
# Choose between HEAD (your changes) and incoming changes

# Stage resolved files
git add src/components/Button.tsx

# Complete the merge
git commit -m "resolve: merge conflicts with main branch"

# Or abort merge if needed
git merge --abort
```

### Branch Issues

#### Issue: Accidentally committed to wrong branch

**Symptoms:**
- Commits appear on main instead of feature branch
- Need to move commits to correct branch

**Solutions:**
```bash
# Create new branch from current position
git checkout -b correct-feature-branch

# Switch back to main and reset
git checkout main
git reset --hard origin/main

# Your commits are now on the correct branch
git checkout correct-feature-branch
```

---

## Environment-Specific Issues

### Windows-Specific Issues

#### Issue: Path separator issues

**Symptoms:**
```bash
Error: Cannot resolve module with '\' path separators
```

**Solutions:**
```javascript
// Use forward slashes in imports (works on all platforms)
import { Button } from '@/components/ui/button'; // ✅
import { Button } from '@\\components\\ui\\button'; // ❌

// In webpack config, normalize paths
const path = require('path');
config.resolve.alias = {
  '@': path.resolve(__dirname, 'src'),
};
```

#### Issue: Long file paths

**Symptoms:**
```bash
ENAMETOOLONG: name too long, open 'C:\very\long\path\to\node_modules\...'
```

**Solutions:**
```bash
# Enable long paths in Windows 10+
# Run as Administrator in PowerShell:
New-ItemProperty -Path "HKLM:SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# Or use shorter directory names
# Move project closer to root: C:\projects\smarthire\
```

### macOS-Specific Issues

#### Issue: Permission denied for global npm packages

**Symptoms:**
```bash
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solutions:**
```bash
# Use nvm to manage Node.js versions
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node

# Or fix permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules
sudo chown -R $(whoami) /usr/local/bin
```

---

## Getting Additional Help

### Diagnostic Commands

Run these commands to gather information for support requests:

```bash
# System information
node --version
npm --version
git --version
echo $OS # or: echo %OS% on Windows

# Project information
npm list --depth=0
npm run quality 2>&1 | head -20

# Environment variables (remove sensitive values before sharing)
printenv | grep -i next
printenv | grep -i supabase
```

### Support Resources

**Documentation:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Community Support:**
- GitHub Issues: Report bugs and get help
- Stack Overflow: Search for similar issues
- Discord/Slack: Real-time team support

**Creating Support Requests:**
1. Include diagnostic command output
2. Describe exact steps to reproduce
3. Share relevant code snippets (without sensitive data)
4. Mention what you've already tried
5. Include screenshots for UI issues

---

## Prevention Tips

### Regular Maintenance

```bash
# Weekly dependency updates
npm outdated
npm update

# Monthly cleanup
npm audit fix
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Best Practices

- **Commit frequently** with small, focused changes
- **Run quality checks** before pushing
- **Keep documentation updated** when changing APIs
- **Test across different browsers** and devices
- **Monitor performance** regularly

### Environment Setup Validation

Create a script to validate your setup:

```bash
#!/bin/bash
# validate-setup.sh

echo "🔍 Validating development environment..."

# Check Node.js version
node_version=$(node --version | cut -c2-)
if [ "$(printf '%s\n' "18.17.0" "$node_version" | sort -V | head -n1)" = "18.17.0" ]; then
    echo "✅ Node.js version: $node_version"
else
    echo "❌ Node.js version too old: $node_version (need 18.17.0+)"
fi

# Check npm version  
npm_version=$(npm --version)
echo "✅ npm version: $npm_version"

# Check dependencies
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ Dependencies installed correctly"
else
    echo "❌ Dependency issues detected"
fi

# Check environment variables
if [ -f ".env.local" ]; then
    echo "✅ Environment file exists"
else
    echo "❌ .env.local file missing"
fi

# Run quality checks
if npm run quality > /dev/null 2>&1; then
    echo "✅ Quality checks pass"
else
    echo "❌ Quality checks fail"
fi

echo "🎉 Environment validation complete!"
```

---

**Remember**: Most issues have been encountered before. Search existing documentation and issues before diving into complex debugging. When in doubt, start fresh with a clean install.