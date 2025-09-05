import { supabaseAuth } from './client';
import type { AuthError } from './client';

// Sign up with email and password
export async function signUp(email: string, password: string, name?: string) {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
        statusCode: 503,
      } as AuthError,
    };
  }

  try {
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null,
          role: 'user',
        },
      },
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      message: 'Check your email for verification link',
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
    console.error('Sign up error:', error);
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
        statusCode: undefined,
      } as AuthError,
    };
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
        statusCode: 503,
      } as AuthError,
    };
  }

  try {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    };
  } catch (error: unknown) {
    console.error('Sign in error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
        statusCode: undefined,
      } as AuthError,
    };
  }
}

// Sign out
export async function signOut() {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      } as AuthError,
    };
  }

  try {
    const { error } = await supabaseAuth.auth.signOut();

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Signed out successfully',
    };
  } catch (error: unknown) {
    console.error('Sign out error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
      } as AuthError,
    };
  }
}

// Reset password
export async function resetPassword(email: string) {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      } as AuthError,
    };
  }

  try {
    const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password reset email sent',
    };
  } catch (error: unknown) {
    console.error('Password reset error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Password reset failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
      } as AuthError,
    };
  }
}

// Update password (for authenticated users)
export async function updatePassword(newPassword: string) {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      } as AuthError,
    };
  }

  try {
    const { error } = await supabaseAuth.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error: unknown) {
    console.error('Password update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Password update failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
      } as AuthError,
    };
  }
}

// Update user profile
export async function updateProfile(updates: { name?: string; email?: string }) {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      } as AuthError,
    };
  }

  try {
    const { error } = await supabaseAuth.auth.updateUser({
      data: updates,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error: unknown) {
    console.error('Profile update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
      } as AuthError,
    };
  }
}

// Verify email with token
export async function verifyEmail(token: string, type: 'signup' | 'email_change' = 'signup') {
  if (!supabaseAuth) {
    return {
      success: false,
      error: {
        message: 'Authentication service not available',
        code: 'SERVICE_UNAVAILABLE',
      } as AuthError,
    };
  }

  try {
    const { error } = await supabaseAuth.auth.verifyOtp({
      token_hash: token,
      type: type === 'signup' ? 'signup' : 'email_change',
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Email verified successfully',
    };
  } catch (error: unknown) {
    console.error('Email verification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Email verification failed';
    return {
      success: false,
      error: {
        message: errorMessage,
        code: undefined,
      } as AuthError,
    };
  }
}
