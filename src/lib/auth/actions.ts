import { supabaseAuth } from './client';
import type { AuthError } from './client';

// Sign up with email and password
export async function signUp(email: string, password: string, name?: string) {
  try {
    const { data, error } = await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || null,
          role: 'user'
        }
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      message: 'Check your email for verification link'
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Sign up failed',
        code: error.error_code,
        statusCode: error.status
      } as AuthError
    };
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Sign in failed',
        code: error.error_code,
        statusCode: error.status
      } as AuthError
    };
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabaseAuth.auth.signOut();

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Signed out successfully'
    };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Sign out failed',
        code: error.error_code
      } as AuthError
    };
  }
}

// Reset password
export async function resetPassword(email: string) {
  try {
    const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password reset email sent'
    };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Password reset failed',
        code: error.error_code
      } as AuthError
    };
  }
}

// Update password (for authenticated users)
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabaseAuth.auth.updateUser({
      password: newPassword
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error: any) {
    console.error('Password update error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Password update failed',
        code: error.error_code
      } as AuthError
    };
  }
}

// Update user profile
export async function updateProfile(updates: { name?: string; email?: string }) {
  try {
    const { error } = await supabaseAuth.auth.updateUser({
      data: updates
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error: any) {
    console.error('Profile update error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Profile update failed',
        code: error.error_code
      } as AuthError
    };
  }
}

// Verify email with token
export async function verifyEmail(token: string, type: 'signup' | 'email_change' = 'signup') {
  try {
    const { error } = await supabaseAuth.auth.verifyOtp({
      token_hash: token,
      type: type === 'signup' ? 'signup' : 'email_change'
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'Email verified successfully'
    };
  } catch (error: any) {
    console.error('Email verification error:', error);
    return {
      success: false,
      error: {
        message: error.message || 'Email verification failed',
        code: error.error_code
      } as AuthError
    };
  }
}