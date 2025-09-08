import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { MobileContainer } from '@/components/layout';
import { getServerUser } from '@/lib/auth/server';
import { getUserProfile } from '@/lib/database/users';
import { OnboardingPageProps } from '@/types/onboarding';

import { OnboardingClient } from './components/onboarding-client';
import { OnboardingSkeleton } from './components/onboarding-skeleton';

async function OnboardingServerData() {
  // Get authenticated user
  const user = await getServerUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // Get user profile from Supabase
  let userProfile;
  try {
    userProfile = await getUserProfile(user.id);
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    // Continue with basic user data if profile fetch fails
  }

  // Prepare props for client component
  const props: OnboardingPageProps = {
    user: {
      id: user.id,
      email: user.email || '',
      user_metadata: user.user_metadata || {},
    },
    userProfile: userProfile || undefined,
  };

  return <OnboardingClient {...props} />;
}

export default async function OnboardingPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <MobileContainer className='py-8'>
        <Suspense fallback={<OnboardingSkeleton />}>
          <OnboardingServerData />
        </Suspense>
      </MobileContainer>
    </div>
  );
}

export const metadata = {
  title: 'Welcome to SmartHire AI - Get Started',
  description:
    'Complete your SmartHire AI setup in just 5 minutes. Set up your company profile, create your first job description, and experience AI-powered hiring.',
  keywords: 'SmartHire AI, onboarding, setup, company profile, job description, AI hiring',
};
