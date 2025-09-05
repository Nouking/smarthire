import { Suspense } from 'react';

import { SignInForm } from '@/components/auth/signin-form';
import { MobileContainer } from '@/components/layout';

export default function SignInPage() {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
      <MobileContainer>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold text-gray-900'>SmartHire AI</h1>
            <p className='mt-2 text-gray-600'>Intelligent recruitment matching</p>
          </div>

          <Suspense
            fallback={
              <div className='mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow'>
                <div className='animate-pulse'>
                  <div className='mx-auto mb-4 h-4 w-3/4 rounded bg-gray-200'></div>
                  <div className='space-y-4'>
                    <div className='h-10 rounded bg-gray-200'></div>
                    <div className='h-10 rounded bg-gray-200'></div>
                    <div className='h-10 rounded bg-gray-200'></div>
                  </div>
                </div>
              </div>
            }
          >
            <SignInForm />
          </Suspense>
        </div>
      </MobileContainer>
    </div>
  );
}

export const metadata = {
  title: 'Sign In - SmartHire AI',
  description: 'Sign in to your SmartHire AI account',
};
