import { SignUpForm } from '@/components/auth/signup-form';
import { MobileContainer } from '@/components/layout';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <MobileContainer>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">SmartHire AI</h1>
            <p className="text-gray-600 mt-2">Intelligent recruitment matching</p>
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