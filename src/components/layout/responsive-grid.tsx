'use client';

import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export function ResponsiveGrid({
  children,
  className,
  cols = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
}: ResponsiveGridProps) {
  const gridCols = {
    [`grid-cols-${cols.xs || 1}`]: true,
    [`sm:grid-cols-${cols.sm || cols.xs || 1}`]: cols.sm,
    [`md:grid-cols-${cols.md || cols.sm || cols.xs || 1}`]: cols.md,
    [`lg:grid-cols-${cols.lg || cols.md || cols.sm || cols.xs || 1}`]: cols.lg,
    [`xl:grid-cols-${cols.xl || cols.lg || cols.md || cols.sm || cols.xs || 1}`]: cols.xl,
  };

  const gapClass = {
    'gap-2': gap === 'sm',
    'gap-4': gap === 'md',
    'gap-6': gap === 'lg',
    'gap-8': gap === 'xl',
  };

  return <div className={cn('grid w-full', gridCols, gapClass, className)}>{children}</div>;
}
