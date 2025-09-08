# Component Patterns Guide

## Overview

This guide outlines the component development patterns and best practices for SmartHire AI, focusing on our shadcn/ui integration, responsive design principles, and mobile-first architecture.

---

## shadcn/ui Component Usage

### Understanding shadcn/ui

shadcn/ui provides copy-paste components built on top of Radix UI primitives with Tailwind CSS styling. Components are added to your project rather than installed as dependencies.

### Adding New Components

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form

# Add multiple components
npx shadcn@latest add button card dialog form
```

### Component Structure

Each shadcn/ui component follows this structure:

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## Component Patterns

### 1. Variant-Based Components

Use `class-variance-authority` (cva) for component variants:

```typescript
// ✅ Good: Using cva for variants
const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive",
        success: "border-green-500/50 text-green-700 bg-green-50",
        warning: "border-yellow-500/50 text-yellow-700 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
```

### 2. Compound Components

Create compound components for complex UI patterns:

```typescript
// Card component with sub-components
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);

export { Card, CardHeader, CardTitle, CardContent };

// Usage
function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>User information goes here</p>
      </CardContent>
    </Card>
  );
}
```

### 3. Polymorphic Components

Use the `asChild` prop for flexible component composition:

```typescript
// Button can render as different elements
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

// Renders as: <a href="/dashboard" class="button-classes">Go to Dashboard</a>
```

### 4. Forwarded Refs Pattern

Always forward refs for proper component composition:

```typescript
const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("custom-input-classes", className)}
      ref={ref}
      {...props}
    />
  );
});

CustomInput.displayName = "CustomInput";
```

---

## Mobile-First Responsive Patterns

### 1. Mobile-First Design Approach

Always start with mobile styles and enhance for larger screens:

```typescript
// ✅ Good: Mobile-first approach
function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      grid grid-cols-1 gap-4 p-4
      md:grid-cols-2 md:gap-6 md:p-6
      lg:grid-cols-3 lg:gap-8 lg:p-8
      xl:grid-cols-4
    ">
      {children}
    </div>
  );
}

// ❌ Bad: Desktop-first approach
function BadResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      grid grid-cols-4 gap-8 p-8
      lg:grid-cols-3
      md:grid-cols-2 md:gap-6 md:p-6
      sm:grid-cols-1 sm:gap-4 sm:p-4
    ">
      {children}
    </div>
  );
}
```

### 2. Responsive Container Pattern

```typescript
function ResponsiveContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      w-full max-w-7xl mx-auto
      px-4 py-6
      sm:px-6 sm:py-8
      lg:px-8 lg:py-10
    ">
      {children}
    </div>
  );
}
```

### 3. Mobile Navigation Patterns

```typescript
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background border-b">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">SmartHire AI</h1>
          <a href="/dashboard" className="text-foreground hover:text-primary">
            Dashboard
          </a>
          <a href="/candidates" className="text-foreground hover:text-primary">
            Candidates
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-bold">SmartHire AI</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {isOpen && (
          <div className="border-t bg-background p-4 space-y-2">
            <a
              href="/dashboard"
              className="block py-2 text-foreground hover:text-primary"
            >
              Dashboard
            </a>
            <a
              href="/candidates"
              className="block py-2 text-foreground hover:text-primary"
            >
              Candidates
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
```

### 4. Responsive Typography

```typescript
function ResponsiveTypography() {
  return (
    <div className="space-y-4">
      <h1 className="
        text-2xl font-bold
        sm:text-3xl
        lg:text-4xl
        xl:text-5xl
      ">
        Main Heading
      </h1>

      <p className="
        text-sm leading-relaxed
        sm:text-base
        lg:text-lg
      ">
        Body text that scales appropriately across devices.
      </p>
    </div>
  );
}
```

---

## Form Patterns

### 1. React Hook Form Integration

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Handle form submission
      console.log(values);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
```

### 2. Custom Form Components

```typescript
// Custom form wrapper for consistent styling
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="space-y-6 p-6 border rounded-lg bg-card">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Usage in forms
function CompanyProfileForm() {
  return (
    <div className="space-y-8">
      <FormSection
        title="Company Information"
        description="Basic details about your company"
      >
        <FormField name="companyName" />
        <FormField name="industry" />
      </FormSection>

      <FormSection
        title="Contact Details"
        description="How candidates can reach you"
      >
        <FormField name="email" />
        <FormField name="phone" />
      </FormSection>
    </div>
  );
}
```

---

## Dialog and Modal Patterns

### 1. Basic Dialog Pattern

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UserActionsDialog({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // API call to delete user
      await deleteUser(userId);
      setIsOpen(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 2. Form Dialog Pattern

```typescript
function AddUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values: UserFormValues) => {
    try {
      await createUser(values);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the details for the new user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add User
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Loading and Error States

### 1. Loading States

```typescript
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

// Button loading state
function LoadingButton({ isLoading, children, ...props }: ButtonProps & { isLoading?: boolean }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

// Skeleton loading pattern
function UserProfileSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

// List loading pattern
function UserListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 border rounded">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 2. Error States

```typescript
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: Error | string;
  retry?: () => void;
  showDetails?: boolean;
}

function ErrorState({ error, retry, showDetails = false }: ErrorStateProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <Alert variant="destructive" className="m-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>{errorMessage}</p>
        {showDetails && typeof error !== 'string' && (
          <details className="text-xs">
            <summary>Technical details</summary>
            <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
              {error.stack}
            </pre>
          </details>
        )}
        {retry && (
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-3 w-3" />
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Empty state pattern
function EmptyState({
  icon: Icon,
  title,
  description,
  action
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        {description}
      </p>
      {action}
    </div>
  );
}
```

---

## Data Display Patterns

### 1. Table Pattern

```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function UserTable({ users }: { users: User[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of users in your organization.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

### 2. Card Grid Pattern

```typescript
function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">
              {candidate.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <CardTitle className="text-lg">{candidate.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{candidate.title}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Experience</span>
            <span>{candidate.experience} years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Location</span>
            <span>{candidate.location}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Match Score</span>
            <span className="font-medium text-primary">{candidate.matchScore}%</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button size="sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CandidateGrid({ candidates }: { candidates: Candidate[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}
```

---

## Testing Patterns

### 1. Component Testing

```typescript
// button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. Form Testing

```typescript
// login-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../login-form';

describe('LoginForm', () => {
  it('validates email field', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

---

## Performance Optimization Patterns

### 1. Lazy Loading

```typescript
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const CandidateAnalytics = lazy(() => import('./candidate-analytics'));
const ReportsPanel = lazy(() => import('./reports-panel'));

function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <CandidateAnalytics />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
        <ReportsPanel />
      </Suspense>
    </div>
  );
}
```

### 2. Memoization

```typescript
import { memo, useMemo } from 'react';

// Memoize expensive list items
const CandidateItem = memo(({ candidate }: { candidate: Candidate }) => {
  return (
    <div className="p-4 border rounded">
      <h3>{candidate.name}</h3>
      <p>{candidate.email}</p>
    </div>
  );
});

// Memoize expensive calculations
function CandidateList({ candidates, filter }: {
  candidates: Candidate[];
  filter: string;
}) {
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(filter.toLowerCase()) ||
      candidate.skills.some(skill =>
        skill.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [candidates, filter]);

  return (
    <div className="space-y-2">
      {filteredCandidates.map((candidate) => (
        <CandidateItem key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}
```

---

## Accessibility Patterns

### 1. Keyboard Navigation

```typescript
function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const items = ['Option 1', 'Option 2', 'Option 3'];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev =>
          prev < items.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : items.length - 1
        );
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          // Handle selection
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        Select Option
      </Button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute mt-1 bg-background border rounded shadow-lg"
        >
          {items.map((item, index) => (
            <li
              key={item}
              role="option"
              aria-selected={index === selectedIndex}
              className={`p-2 cursor-pointer ${
                index === selectedIndex ? 'bg-accent' : ''
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 2. Screen Reader Support

```typescript
function AccessibleForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">
          Email Address
          <span className="text-destructive ml-1" aria-label="required">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-destructive text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <fieldset className="space-y-2">
          <legend className="font-medium">Preferred Contact Method</legend>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="contact-email"
              name="contact-method"
              value="email"
            />
            <Label htmlFor="contact-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="contact-phone"
              name="contact-method"
              value="phone"
            />
            <Label htmlFor="contact-phone">Phone</Label>
          </div>
        </fieldset>
      </div>
    </form>
  );
}
```

---

This guide provides the foundation for building consistent, accessible, and maintainable components in SmartHire AI. Always refer to the shadcn/ui documentation for the latest component APIs and patterns.
