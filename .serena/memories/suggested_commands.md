# SmartHire AI - Development Commands

## Primary Development Commands

```bash
# Start development server with Turbopack (fast bundler)
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
```

## Project-Specific Development Workflow

```bash
# Navigate to project root (all commands run from here)
cd /Users/nouking/Workspace/SmartHR/smarthire

# Install dependencies (if needed)
npm install

# Start development environment
npm run dev
```

## System Commands (macOS Darwin)

```bash
# File operations
ls -la                    # List files with details
find . -name "*.tsx"      # Find TypeScript React files
grep -r "text" src/       # Search in source code

# Git operations
git status
git add .
git commit -m "feat: description"
git push origin branch-name

# Process management
lsof -i :3000            # Check what's running on port 3000
kill -9 PID              # Kill process by PID
```

## Task Completion Commands

When completing development tasks, run these commands in order:

```bash
# 1. Lint the code
npm run lint

# 2. Build to check for TypeScript/build errors
npm run build

# 3. If build successful, commit changes
git add .
git commit -m "type(scope): description"
```

## Development Server Info

- **Default Port**: 3000
- **Turbopack**: Enabled for faster builds and hot reloading
- **Hot Reload**: Automatic on file changes
- **TypeScript**: Strict mode with real-time error checking
