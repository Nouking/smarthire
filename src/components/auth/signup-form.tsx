'use client';

import { useState } from 'react';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signUp, validateEmail, validatePassword } from '@/lib/auth/client-exports';

export function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validate form
    if (!name.trim()) {
      setError('Name is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errors[0]);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password, name.trim());

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error?.message || 'Sign up failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className='mx-auto w-full max-w-md p-6'>
        <div className='text-center'>
          <div className='mb-4'>
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
              <svg
                className='h-6 w-6 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>
          <h1 className='mb-2 text-2xl font-bold text-gray-900'>Check Your Email</h1>
          <p className='mb-6 text-sm text-gray-600'>
            We&apos;ve sent a verification link to <strong>{email}</strong>. Please check your email
            and click the link to verify your account.
          </p>
          <Button onClick={() => (window.location.href = '/auth/signin')} className='w-full'>
            Continue to Sign In
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className='mx-auto w-full max-w-md p-6'>
      <div className='mb-6 text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Create Account</h1>
        <p className='mt-2 text-sm text-gray-600'>Join SmartHire AI to get started</p>
      </div>

      {error && (
        <Alert variant='destructive' className='mb-4'>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='mb-1 block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <Input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your full name'
            required
            className='w-full'
            autoComplete='name'
          />
        </div>

        <div>
          <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
            Email
          </label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='w-full'
            autoComplete='email'
          />
        </div>

        <div>
          <label htmlFor='password' className='mb-1 block text-sm font-medium text-gray-700'>
            Password
          </label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Create a password'
            required
            className='w-full'
            autoComplete='new-password'
          />
          <p className='mt-1 text-xs text-gray-500'>
            Must be at least 8 characters with uppercase, lowercase, number, and special character
          </p>
        </div>

        <div>
          <label htmlFor='confirmPassword' className='mb-1 block text-sm font-medium text-gray-700'>
            Confirm Password
          </label>
          <Input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            required
            className='w-full'
            autoComplete='new-password'
          />
        </div>

        <Button type='submit' disabled={isLoading} className='w-full'>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          Already have an account?{' '}
          <a href='/auth/signin' className='text-blue-600 underline hover:text-blue-500'>
            Sign in
          </a>
        </p>
      </div>
    </Card>
  );
}
