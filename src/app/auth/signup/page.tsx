import { SignUpForm } from '@/components/auth/signup-form';
import { MobileContainer } from '@/components/layout';

export default function SignUpPage() {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
      <MobileContainer>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-bold text-gray-900'>SmartHire AI</h1>
            <p className='mt-2 text-gray-600'>Intelligent recruitment matching</p>
          </div>

          <SignUpForm />
        </div>
      </MobileContainer>
    </div>
  );
}

export const metadata = {
  title: 'Sign Up - SmartHire AI',
  description: 'Create your SmartHire AI account',
};
