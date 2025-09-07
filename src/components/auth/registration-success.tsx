'use client';

import { CheckCircle, Mail, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { resendEmailVerification } from '@/lib/auth/enhanced-actions';
import { cn } from '@/lib/utils';

interface RegistrationSuccessProps {
  email: string;
  userId?: string;
  requiresEmailVerification: boolean;
  onResendSuccess?: () => void;
  className?: string;
}

export function RegistrationSuccess({
  email,
  requiresEmailVerification,
  onResendSuccess,
  className,
}: RegistrationSuccessProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendError(null);
    setResendSuccess(false);

    try {
      const result = await resendEmailVerification(email);

      if (result.success) {
        setResendSuccess(true);
        setResendCount((prev) => prev + 1);
        onResendSuccess?.();

        // Clear success message after 3 seconds
        setTimeout(() => setResendSuccess(false), 3000);
      } else {
        setResendError(result.error || 'Failed to resend verification email');
      }
    } catch {
      setResendError('An unexpected error occurred');
    } finally {
      setIsResending(false);
    }
  };

  if (!requiresEmailVerification) {
    // Account created and verified
    return (
      <div className={cn('flex min-h-screen flex-col items-center justify-center p-4', className)}>
        <div className='w-full max-w-md'>
          <Card className='border-0 shadow-xl'>
            <CardHeader className='text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                <CheckCircle className='h-8 w-8 text-green-600' />
              </div>
              <CardTitle className='text-2xl font-bold text-gray-900'>
                Welcome to SmartHire AI!
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Your account has been created successfully
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='text-center'>
                <p className='mb-4 text-sm text-gray-600'>
                  You&apos;re all set! Start using AI-powered recruitment tools to find the perfect
                  candidates.
                </p>
              </div>

              <Button asChild className='w-full bg-blue-600 hover:bg-blue-700' size='lg'>
                <Link href='/dashboard' className='flex items-center justify-center space-x-2'>
                  <span>Go to Dashboard</span>
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </Button>

              <div className='text-center'>
                <Link
                  href='/auth/signin'
                  className='text-sm text-blue-600 underline hover:text-blue-500'
                >
                  Sign in instead
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Email verification required
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center p-4', className)}>
      <div className='w-full max-w-md'>
        <Card className='border-0 shadow-xl'>
          <CardHeader className='text-center'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
              <Mail className='h-8 w-8 text-blue-600' />
            </div>
            <CardTitle className='text-2xl font-bold text-gray-900'>Check Your Email</CardTitle>
            <CardDescription className='text-gray-600'>
              We&apos;ve sent a verification link to verify your account
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-lg bg-blue-50 p-4'>
              <p className='text-sm text-blue-800'>
                <strong className='font-medium'>Email sent to:</strong>
                <br />
                {email}
              </p>
            </div>

            <div className='space-y-2 text-center'>
              <p className='text-sm text-gray-600'>
                Please check your email and click the verification link to activate your account.
              </p>
              <p className='text-xs text-gray-500'>
                Don&apos;t forget to check your spam folder if you don&apos;t see the email.
              </p>
            </div>

            {/* Resend verification section */}
            <div className='space-y-3'>
              {resendSuccess && (
                <div className='rounded-lg bg-green-50 p-3 text-center'>
                  <p className='text-sm font-medium text-green-800'>
                    Verification email sent successfully!
                  </p>
                </div>
              )}

              {resendError && (
                <div className='rounded-lg bg-red-50 p-3 text-center'>
                  <p className='text-sm font-medium text-red-800'>{resendError}</p>
                </div>
              )}

              <div className='text-center'>
                <p className='mb-3 text-sm text-gray-600'>Didn&apos;t receive the email?</p>

                <Button
                  variant='outline'
                  onClick={handleResendVerification}
                  disabled={isResending || resendCount >= 3}
                  className='flex items-center space-x-2'
                >
                  {isResending ? (
                    <>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent' />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className='h-4 w-4' />
                      <span>
                        Resend verification email
                        {resendCount > 0 && ` (${resendCount}/3)`}
                      </span>
                    </>
                  )}
                </Button>

                {resendCount >= 3 && (
                  <p className='mt-2 text-xs text-gray-500'>
                    Maximum resend attempts reached. Please contact support if you need help.
                  </p>
                )}
              </div>
            </div>

            {/* Next steps */}
            <div className='space-y-4 border-t border-gray-100 pt-4'>
              <h4 className='text-center font-medium text-gray-900'>What happens next?</h4>
              <div className='space-y-2 text-sm text-gray-600'>
                <div className='flex items-start space-x-3'>
                  <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                    1
                  </div>
                  <p>Click the verification link in your email</p>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                    2
                  </div>
                  <p>Complete your profile setup</p>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                    3
                  </div>
                  <p>Start using AI-powered recruitment tools</p>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-100 pt-4 text-center'>
              <Link
                href='/auth/signin'
                className='text-sm text-blue-600 underline hover:text-blue-500'
              >
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
