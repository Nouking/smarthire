'use server';

import { registrationSchema } from '@/types/registration';
import type {
  RegistrationFormValues,
  RegistrationResponse,
  CompanyProfile,
  CompanySize,
} from '@/types/registration';

import { UserService } from '../database/users';

import { supabaseAuth } from './client';

// Enhanced sign up with company profile creation
export async function signUpWithCompanyProfile(
  formData: RegistrationFormValues
): Promise<RegistrationResponse> {
  // Validate input on server side
  const validation = registrationSchema.safeParse(formData);
  if (!validation.success) {
    return {
      success: false,
      error: {
        message: validation.error.issues[0]?.message || 'Invalid form data',
        field: validation.error.issues[0]?.path[0] as keyof RegistrationFormValues,
      },
    };
  }

  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      },
    };
  }

  const { fullName, email, companyName, password, companySize } = validation.data;

  try {
    // First, check if user already exists
    const existingUser = await UserService.getByEmail(email);
    if (existingUser) {
      return {
        success: false,
        error: {
          message: 'An account with this email already exists',
          field: 'email',
          code: 'USER_EXISTS',
        },
      };
    }

    // Create Supabase auth user
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'user',
          company: companyName,
          company_size: companySize,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      // Handle specific Supabase auth errors
      if (error.message.includes('already been registered')) {
        return {
          success: false,
          error: {
            message: 'An account with this email already exists',
            field: 'email',
            code: 'USER_EXISTS',
          },
        };
      }

      if (error.message.includes('Password')) {
        return {
          success: false,
          error: {
            message: error.message,
            field: 'password',
            code: error.status?.toString(),
          },
        };
      }

      throw error;
    }

    if (!data.user) {
      return {
        success: false,
        error: {
          message: 'Failed to create user account',
          code: 'USER_CREATION_FAILED',
        },
      };
    }

    // Create user profile in database
    try {
      await UserService.create({
        id: data.user.id,
        email: data.user.email ?? '',
        full_name: fullName,
        company: companyName,
        subscription_tier: 'free', // Default to free tier
        monthly_usage_count: 0,
        usage_reset_date: getNextMonthDate(),
        preferred_analysis_depth: 'standard',
      });
    } catch (dbError) {
      console.error('Failed to create user profile:', dbError);
      // Note: User auth account still exists, but profile creation failed
      // This could be handled with a cleanup job or retry mechanism
    }

    return {
      success: true,
      data: {
        userId: data.user.id,
        email: data.user.email ?? '',
        requiresEmailVerification: !data.user.email_confirmed_at,
      },
    };
  } catch (error: unknown) {
    console.error('Enhanced signup error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Registration failed';

    // Handle network/connection errors
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return {
        success: false,
        error: {
          message: 'Network error. Please check your connection and try again.',
          code: 'NETWORK_ERROR',
        },
      };
    }

    // Handle rate limiting
    if (errorMessage.includes('rate') || errorMessage.includes('too many')) {
      return {
        success: false,
        error: {
          message: 'Too many requests. Please wait a moment before trying again.',
          code: 'RATE_LIMITED',
        },
      };
    }

    return {
      success: false,
      error: {
        message: errorMessage,
        code: 'UNKNOWN_ERROR',
      },
    };
  }
}

// Enhanced sign up action that wraps the service
export async function enhancedSignUp(formData: FormData): Promise<RegistrationResponse> {
  const registrationData: RegistrationFormValues = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    companyName: formData.get('companyName') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    companySize: formData.get('companySize') as CompanySize | undefined,
    acceptTerms: formData.get('acceptTerms') === 'true',
  };

  return signUpWithCompanyProfile(registrationData);
}

// Check if email is available
export async function checkEmailAvailability(email: string): Promise<{
  available: boolean;
  error?: string;
}> {
  try {
    // Validate email format first
    if (!email || !email.includes('@')) {
      return {
        available: false,
        error: 'Please enter a valid email address',
      };
    }

    const existingUser = await UserService.getByEmail(email);

    return {
      available: !existingUser,
      error: existingUser ? 'This email is already registered' : undefined,
    };
  } catch (error) {
    console.error('Email availability check failed:', error);
    return {
      available: false,
      error: 'Unable to verify email availability',
    };
  }
}

// Create company profile after successful registration
export async function createCompanyProfile(
  userId: string,
  companyData: CompanyProfile
): Promise<{ success: boolean; error?: string }> {
  try {
    await UserService.update(userId, {
      company: companyData.name,
      // Note: The users table doesn't have all company fields
      // In a full implementation, you might create a separate companies table
    });

    return { success: true };
  } catch (error) {
    console.error('Company profile creation failed:', error);
    return {
      success: false,
      error: 'Failed to create company profile',
    };
  }
}

// Resend email verification
export async function resendEmailVerification(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!supabaseAuth) {
    return {
      success: false,
      error: 'Authentication service not available',
    };
  }

  try {
    const { error } = await supabaseAuth.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Resend verification error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to resend verification email';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Helper function to get next month's date
function getNextMonthDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(1); // First day of next month
  return date.toISOString();
}
