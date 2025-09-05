// Client-side exports only - safe for use in components
export {
  supabaseAuth,
  getSession,
  getUser,
  refreshSession,
  onAuthStateChange,
  type AuthUser,
  type AuthSession,
  type AuthError,
} from './client';

// Authentication actions
export {
  signUp,
  signIn,
  signOut,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyEmail,
} from './actions';

// Utility functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Constants
export const AUTH_ROUTES = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/profile',
} as const;

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/upload',
  '/jobs',
  '/candidates',
] as const;
