'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, CheckCircle, Users, Building2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordStrengthIndicator } from '@/components/ui/password-strength-indicator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { validateEmailFormat } from '@/lib/validation/password';
import { registrationSchema, COMPANY_SIZES } from '@/types/registration';
import type { RegistrationFormValues } from '@/types/registration';

interface EnhancedSignUpFormProps {
  onSubmit: (data: RegistrationFormValues) => Promise<{
    success: boolean;
    error?: { message: string; field?: string };
  }>;
  isLoading?: boolean;
}

export function EnhancedSignUpForm({ onSubmit, isLoading = false }: EnhancedSignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValidation, setEmailValidation] = useState<{
    isValid: boolean;
    suggestions?: string[];
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      password: '',
      confirmPassword: '',
      companySize: undefined,
      acceptTerms: false,
    },
    mode: 'onChange',
  });

  const handleEmailBlur = (email: string) => {
    if (email) {
      const validation = validateEmailFormat(email);
      setEmailValidation(validation);
    }
  };

  const handleFormSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);
      if (!result.success && result.error?.field) {
        form.setError(result.error.field as keyof RegistrationFormValues, {
          message: result.error.message,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPasswordValue = form.watch('password');

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 sm:p-8'>
      <div className='w-full max-w-md'>
        {/* Social Proof Banner */}
        <div className='mb-6 text-center'>
          <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600'>
            <Sparkles className='h-6 w-6 text-white' />
          </div>
          <div className='mb-2 flex items-center justify-center space-x-1 text-sm text-gray-600'>
            <Users className='h-4 w-4' />
            <span>Join 1,000+ companies using AI for recruitment</span>
          </div>
        </div>

        <Card className='border-0 shadow-xl'>
          <CardHeader className='space-y-1 pb-4'>
            <CardTitle className='text-center text-2xl font-bold text-gray-900'>
              Create Your Account
            </CardTitle>
            <CardDescription className='text-center text-gray-600'>
              Start hiring smarter with AI-powered candidate matching
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-4'>
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your full name' autoComplete='name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field with Validation */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Enter your work email'
                          autoComplete='email'
                          {...field}
                          onBlur={(e) => handleEmailBlur(e.target.value)}
                        />
                      </FormControl>
                      {emailValidation?.suggestions && (
                        <FormDescription className='text-blue-600'>
                          Did you mean{' '}
                          <button
                            type='button'
                            className='font-medium underline'
                            onClick={() => {
                              field.onChange(emailValidation.suggestions![0]);
                              setEmailValidation(undefined);
                            }}
                          >
                            {emailValidation.suggestions[0]}
                          </button>
                          ?
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Name Field */}
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Building2 className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                          <Input
                            placeholder='Enter your company name'
                            autoComplete='organization'
                            className='pl-10'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Size Field */}
                <FormField
                  control={form.control}
                  name='companySize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select company size (optional)' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field with Strength Indicator */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Create a strong password'
                            autoComplete='new-password'
                            {...field}
                          />
                          <button
                            type='button'
                            className='absolute top-3 right-3 h-4 w-4 text-gray-400 hover:text-gray-600'
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <PasswordStrengthIndicator password={currentPasswordValue} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password *</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm your password'
                            autoComplete='new-password'
                            {...field}
                          />
                          <button
                            type='button'
                            className='absolute top-3 right-3 h-4 w-4 text-gray-400 hover:text-gray-600'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name='acceptTerms'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-start space-y-0 space-x-3'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-describedby='terms-description'
                        />
                      </FormControl>
                      <div className='space-y-1 leading-none'>
                        <FormLabel className='text-sm font-normal'>
                          I agree to the{' '}
                          <Link
                            href='/terms'
                            target='_blank'
                            className='font-medium text-blue-600 underline hover:text-blue-500'
                          >
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link
                            href='/privacy'
                            target='_blank'
                            className='font-medium text-blue-600 underline hover:text-blue-500'
                          >
                            Privacy Policy
                          </Link>
                          *
                        </FormLabel>
                        <FormDescription id='terms-description' className='text-xs text-gray-500'>
                          By creating an account, you agree to our terms and conditions. You can
                          unsubscribe at any time.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  disabled={isSubmitting || isLoading}
                  size='lg'
                >
                  {isSubmitting || isLoading ? (
                    <div className='flex items-center space-x-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-2'>
                      <CheckCircle className='h-4 w-4' />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className='text-center text-sm text-gray-600'>
                  Already have an account?{' '}
                  <Link
                    href='/auth/signin'
                    className='font-medium text-blue-600 underline hover:text-blue-500'
                  >
                    Sign in here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className='mt-6 text-center'>
          <div className='inline-flex items-center space-x-4 text-xs text-gray-500'>
            <span className='flex items-center space-x-1'>
              <CheckCircle className='h-3 w-3 text-green-500' />
              <span>256-bit SSL Encryption</span>
            </span>
            <span className='flex items-center space-x-1'>
              <CheckCircle className='h-3 w-3 text-green-500' />
              <span>GDPR Compliant</span>
            </span>
            <span className='flex items-center space-x-1'>
              <CheckCircle className='h-3 w-3 text-green-500' />
              <span>SOC 2 Certified</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
