import { z } from 'zod';

// Company size options for B2B SaaS
export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1,000 employees' },
  { value: '1000+', label: '1,000+ employees' },
] as const;

export type CompanySize = (typeof COMPANY_SIZES)[number]['value'];

// Registration form data interface
export interface RegisterFormData {
  fullName: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  companySize?: CompanySize;
}

// Password strength levels
export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordStrengthInfo {
  score: number; // 0-4
  level: PasswordStrength;
  feedback: string[];
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSpecialChars: boolean;
}

// Registration validation schema using Zod
export const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must not exceed 100 characters')
      .regex(
        /^[a-zA-Z\s'-]+$/,
        'Full name can only contain letters, spaces, hyphens, and apostrophes'
      ),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(5, 'Email must be at least 5 characters')
      .max(320, 'Email must not exceed 320 characters'),
    companyName: z
      .string()
      .min(2, 'Company name must be at least 2 characters')
      .max(100, 'Company name must not exceed 100 characters'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']).optional(),
    acceptTerms: z
      .boolean()
      .refine((value) => value === true, 'You must accept the terms of service'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Type inferred from the schema
export type RegistrationFormValues = z.infer<typeof registrationSchema>;

// Server action response types
export interface RegistrationResponse {
  success: boolean;
  error?: {
    message: string;
    field?: keyof RegisterFormData;
    code?: string;
  };
  data?: {
    userId: string;
    email: string;
    requiresEmailVerification: boolean;
  };
}

// Email validation status
export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
}

// Company profile data for initial setup
export interface CompanyProfile {
  name: string;
  size?: CompanySize;
  industry?: string;
  website?: string;
  description?: string;
}
