'use client';

import { useState } from 'react';

import { EnhancedSignUpForm } from '@/components/auth/enhanced-signup-form';
import { RegistrationSuccess } from '@/components/auth/registration-success';
import { signUpWithCompanyProfile } from '@/lib/auth/enhanced-actions';
import type { RegistrationFormValues, RegistrationResponse } from '@/types/registration';

export default function EnhancedSignUpPage() {
  const [registrationResult, setRegistrationResult] = useState<RegistrationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (
    data: RegistrationFormValues
  ): Promise<{
    success: boolean;
    error?: { message: string; field?: string };
  }> => {
    setIsLoading(true);

    try {
      const result = await signUpWithCompanyProfile(data);
      setRegistrationResult(result);

      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: {
            message: result.error?.message || 'Registration failed',
            field: result.error?.field,
          },
        };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

      const errorResult: RegistrationResponse = {
        success: false,
        error: { message: errorMessage },
      };

      setRegistrationResult(errorResult);

      return {
        success: false,
        error: { message: errorMessage },
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendSuccess = () => {
    // Could add analytics tracking or user feedback here
  };

  // Show success screen if registration was successful
  if (registrationResult?.success && registrationResult.data) {
    return (
      <RegistrationSuccess
        email={registrationResult.data.email}
        userId={registrationResult.data.userId}
        requiresEmailVerification={registrationResult.data.requiresEmailVerification}
        onResendSuccess={handleResendSuccess}
      />
    );
  }

  // Show registration form
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <EnhancedSignUpForm onSubmit={handleRegistration} isLoading={isLoading} />
    </div>
  );
}
