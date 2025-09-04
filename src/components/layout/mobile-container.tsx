"use client";

import { cn } from "@/lib/utils";

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function MobileContainer({ 
  children, 
  className,
  maxWidth = "lg" 
}: MobileContainerProps) {
  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8",
      {
        "max-w-sm": maxWidth === "sm",
        "max-w-md": maxWidth === "md", 
        "max-w-lg": maxWidth === "lg",
        "max-w-xl": maxWidth === "xl",
        "max-w-2xl": maxWidth === "2xl",
      },
      className
    )}>
      {children}
    </div>
  );
}