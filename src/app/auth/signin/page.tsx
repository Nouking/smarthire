import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/signin-form';
import { MobileContainer } from '@/components/layout';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <MobileContainer>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">SmartHire AI</h1>
            <p className="text-gray-600 mt-2">Intelligent recruitment matching</p>
          </div>
          
          <Suspense fallback={
            <div className="w-full max-w-md mx-auto p-6 bg-white shadow rounded-lg">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          }>
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