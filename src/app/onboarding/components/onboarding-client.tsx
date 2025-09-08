'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ONBOARDING_STEPS, OnboardingPageProps, OnboardingStep } from '@/types/onboarding';

import { continueOnboardingSetup, skipOnboarding } from '../actions';

import { OnboardingProgress } from './onboarding-progress';
import { StepOverviewCards } from './step-overview-cards';

export function OnboardingClient({ user, userProfile }: OnboardingPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  // Determine user's display name
  const userName =
    userProfile?.full_name || user.user_metadata.full_name || user.user_metadata.name || 'User';

  // Initialize onboarding steps
  const steps: OnboardingStep[] = ONBOARDING_STEPS.map((step, index) => ({
    ...step,
    isActive: index === 0, // First step is active
    isCompleted: false,
  }));

  const handleContinueSetup = useCallback(() => {
    setError(undefined);

    startTransition(async () => {
      try {
        const result = await continueOnboardingSetup();

        if (!result.success) {
          setError(result.error || 'Failed to continue setup. Please try again.');
          return;
        }

        // Navigate to first step
        router.push('/onboarding/company-profile');
      } catch (err) {
        setError('Failed to continue setup. Please try again.');
        console.error('Onboarding navigation error:', err);
      }
    });
  }, [router]);

  const handleSkipToDashboard = useCallback(() => {
    if (
      !confirm(
        'Are you sure you want to skip the onboarding? You can always complete it later from your dashboard.'
      )
    ) {
      return;
    }

    setError(undefined);

    startTransition(async () => {
      try {
        const result = await skipOnboarding();

        if (!result.success) {
          setError(result.error || 'Failed to skip onboarding. Please try again.');
          return;
        }

        router.push('/dashboard');
      } catch (err) {
        setError('Failed to navigate to dashboard. Please try again.');
        console.error('Dashboard navigation error:', err);
      }
    });
  }, [router]);

  return (
    <div className='mx-auto max-w-4xl space-y-8'>
      {/* Logo Header */}
      <header className='text-center'>
        <div className='mb-4 flex items-center justify-center'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600'>
            <span className='text-xl font-bold text-white'>S</span>
          </div>
          <h1 className='ml-3 text-2xl font-bold text-gray-900'>SmartHire AI</h1>
        </div>
      </header>

      {/* Welcome Section */}
      <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center'>
        <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500'>
          <svg className='h-6 w-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
        </div>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>Welcome, {userName}!</h1>
        <p className='text-lg text-gray-600'>
          Registration Complete - Your SmartHire AI account is ready to set up
        </p>
      </Card>

      {/* Progress Section */}
      <OnboardingProgress
        currentStep={1}
        totalSteps={4}
        completedSteps={[]}
        title='Company Profile'
      />

      {/* Error Alert */}
      {error && (
        <Alert variant='destructive'>
          <svg className='h-4 w-4' viewBox='0 0 24 24'>
            <circle cx='12' cy='12' r='10' />
            <line x1='15' y1='9' x2='9' y2='15' />
            <line x1='9' y1='9' x2='15' y2='15' />
          </svg>
          <span>{error}</span>
        </Alert>
      )}

      {/* Steps Overview */}
      <StepOverviewCards steps={steps} />

      {/* Call to Action */}
      <Card className='bg-gradient-to-br from-gray-50 to-blue-50 p-8 text-center'>
        <div className='mb-6 flex items-center justify-center'>
          <svg
            className='mr-2 h-6 w-6 text-blue-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 10V3L4 14h7v7l9-11h-7z'
            />
          </svg>
          <span className='text-lg font-medium text-gray-900'>
            Ready to get started? Only takes 5 minutes!
          </span>
        </div>

        <div className='space-y-4'>
          <Button
            size='lg'
            className='w-full px-8 py-3 text-base font-medium sm:w-auto'
            onClick={handleContinueSetup}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg
                  className='mr-3 -ml-1 h-5 w-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Setting up...
              </>
            ) : (
              <>
                Continue Setup
                <svg className='ml-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
              </>
            )}
          </Button>

          <Button
            variant='ghost'
            className='w-full text-gray-600 hover:text-gray-900 sm:w-auto'
            onClick={handleSkipToDashboard}
            disabled={isPending}
          >
            Already familiar? Skip to Dashboard
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <footer className='border-t border-gray-200 pt-8 text-center'>
        <p className='text-sm text-gray-500'>
          Need help? Check out our{' '}
          <a href='/help/getting-started' className='text-blue-600 hover:underline'>
            getting started guide
          </a>{' '}
          or{' '}
          <a href='/contact' className='text-blue-600 hover:underline'>
            contact support
          </a>
        </p>
      </footer>
    </div>
  );
}
