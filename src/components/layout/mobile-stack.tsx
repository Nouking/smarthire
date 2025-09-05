'use client';

import { cn } from '@/lib/utils';

interface MobileStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  direction?: 'column' | 'row';
  responsive?: {
    base?: 'column' | 'row';
    sm?: 'column' | 'row';
    md?: 'column' | 'row';
    lg?: 'column' | 'row';
  };
}

export function MobileStack({
  children,
  className,
  spacing = 'md',
  align = 'start',
  direction = 'column',
  responsive,
}: MobileStackProps) {
  const spacingClass = {
    'space-y-1 space-x-0': spacing === 'xs' && direction === 'column',
    'space-x-1 space-y-0': spacing === 'xs' && direction === 'row',
    'space-y-2 space-x-0': spacing === 'sm' && direction === 'column',
    'space-x-2 space-y-0': spacing === 'sm' && direction === 'row',
    'space-y-4 space-x-0': spacing === 'md' && direction === 'column',
    'space-x-4 space-y-0': spacing === 'md' && direction === 'row',
    'space-y-6 space-x-0': spacing === 'lg' && direction === 'column',
    'space-x-6 space-y-0': spacing === 'lg' && direction === 'row',
    'space-y-8 space-x-0': spacing === 'xl' && direction === 'column',
    'space-x-8 space-y-0': spacing === 'xl' && direction === 'row',
  };

  const alignClass = {
    'items-start': align === 'start',
    'items-center': align === 'center',
    'items-end': align === 'end',
    'items-stretch': align === 'stretch',
  };

  const directionClass = responsive
    ? {
        [`flex-${responsive.base || 'column'}`]: responsive.base,
        [`sm:flex-${responsive.sm || responsive.base || 'column'}`]: responsive.sm,
        [`md:flex-${responsive.md || responsive.sm || responsive.base || 'column'}`]: responsive.md,
        [`lg:flex-${responsive.lg || responsive.md || responsive.sm || responsive.base || 'column'}`]:
          responsive.lg,
      }
    : {
        'flex-column': direction === 'column',
        'flex-row': direction === 'row',
      };

  return (
    <div className={cn('flex w-full', directionClass, spacingClass, alignClass, className)}>
      {children}
    </div>
  );
}
