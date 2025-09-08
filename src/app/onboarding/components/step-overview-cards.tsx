import type { ReactElement } from 'react';

import { Card } from '@/components/ui/card';
import { OnboardingStep } from '@/types/onboarding';

interface StepOverviewCardsProps {
  steps: OnboardingStep[];
}

interface StepIconProps {
  icon: string;
  className?: string;
}

function StepIcon({ icon, className = 'w-10 h-10' }: StepIconProps) {
  const iconMap: Record<string, ReactElement> = {
    building: (
      <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
        />
      </svg>
    ),
    'file-text': (
      <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
    ),
    upload: (
      <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
        />
      </svg>
    ),
    zap: (
      <svg className={className} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    ),
  };

  return iconMap[icon] || iconMap.building;
}

export function StepOverviewCards({ steps }: StepOverviewCardsProps) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {steps.map((step, index) => (
        <Card
          key={step.id}
          className={`p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
            step.isActive
              ? 'border-blue-200 bg-blue-50 ring-2 ring-blue-500'
              : step.isCompleted
                ? 'border-green-200 bg-green-50'
                : 'hover:bg-gray-50'
          }`}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        >
          {/* Step Number Badge */}
          <div className='mb-4 flex justify-center'>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step.isActive
                  ? 'bg-blue-600 text-white'
                  : step.isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step.isCompleted ? (
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              ) : (
                step.stepNumber
              )}
            </div>
          </div>

          {/* Step Icon */}
          <div className='mb-4 flex justify-center'>
            <div
              className={`${
                step.isActive
                  ? 'text-blue-600'
                  : step.isCompleted
                    ? 'text-green-600'
                    : 'text-gray-400'
              }`}
            >
              <StepIcon icon={step.icon} />
            </div>
          </div>

          {/* Step Content */}
          <h3
            className={`mb-3 text-lg font-semibold ${
              step.isActive
                ? 'text-blue-900'
                : step.isCompleted
                  ? 'text-green-900'
                  : 'text-gray-900'
            }`}
          >
            {step.title}
          </h3>

          <p className='text-sm leading-relaxed text-gray-600'>{step.description}</p>

          {/* Status Indicator */}
          {step.isActive && (
            <div className='mt-4 flex items-center justify-center'>
              <div className='flex items-center space-x-2 text-blue-600'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-blue-600'></div>
                <span className='text-xs font-medium'>Current Step</span>
              </div>
            </div>
          )}

          {step.isCompleted && (
            <div className='mt-4 flex items-center justify-center'>
              <div className='flex items-center space-x-2 text-green-600'>
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                <span className='text-xs font-medium'>Completed</span>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
