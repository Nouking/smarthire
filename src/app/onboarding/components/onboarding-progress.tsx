'use client';

import { useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  title: string;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  completedSteps,
  title,
}: OnboardingProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <Card className='p-6 text-center'>
      <h2 className='mb-4 text-xl font-semibold text-gray-900'>
        Step {currentStep} of {totalSteps} - {title}
      </h2>

      {/* Progress Bar Container */}
      <div className='mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-200'>
        <div
          className='h-3 rounded-full bg-blue-600 transition-all duration-1000 ease-out'
          style={{ width: `${animatedProgress}%` }}
        />
      </div>

      <p className='text-sm font-medium text-gray-600'>
        {Math.round(progressPercentage)}% Complete
      </p>

      {/* Step Indicators */}
      <div className='mt-6 flex justify-center space-x-2'>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber.toString());
          const isCurrent = stepNumber === currentStep;
          const isPast = stepNumber < currentStep;

          return (
            <div
              key={stepNumber}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                isCompleted || isPast
                  ? 'bg-green-500 text-white'
                  : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                    : 'bg-gray-300 text-gray-600'
              }`}
              aria-label={`Step ${stepNumber}${isCompleted ? ' completed' : isCurrent ? ' current' : ''}`}
            >
              {isCompleted || isPast ? (
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className='mt-4 text-xs text-gray-500'>
        {completedSteps.length > 0 && (
          <p>
            {completedSteps.length} of {totalSteps} steps completed
          </p>
        )}
      </div>
    </Card>
  );
}
