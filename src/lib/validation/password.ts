import type { PasswordStrength, PasswordStrengthInfo } from '@/types/registration';

/**
 * Calculates password strength based on various criteria
 * @param password - The password to evaluate
 * @returns PasswordStrengthInfo object with score, level, and feedback
 */
export function calculatePasswordStrength(password: string): PasswordStrengthInfo {
  const feedback: string[] = [];
  let score = 0;

  // Check criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);

  // Length scoring
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (password.length >= 12) {
    score += 0.5;
  }

  // Character variety scoring
  if (hasUppercase) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }

  if (hasLowercase) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }

  if (hasNumbers) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }

  if (hasSpecialChars) {
    score += 1;
  } else {
    feedback.push('Add special characters (!@#$%^&*)');
  }

  // Bonus points for longer passwords
  if (password.length >= 16) {
    score += 0.5;
  }

  // Common patterns penalty
  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Avoid repeating characters');
  }

  if (/123|abc|password|qwerty|admin/i.test(password)) {
    score -= 1;
    feedback.push('Avoid common patterns');
  }

  // Determine strength level
  let level: PasswordStrength;
  if (score >= 4.5) {
    level = 'strong';
  } else if (score >= 3.5) {
    level = 'good';
  } else if (score >= 2) {
    level = 'fair';
  } else {
    level = 'weak';
  }

  // Positive feedback for strong passwords
  if (level === 'strong' && feedback.length === 0) {
    feedback.push('Excellent password strength!');
  } else if (level === 'good' && feedback.length === 0) {
    feedback.push('Good password strength');
  }

  return {
    score: Math.min(Math.max(score, 0), 4), // Clamp between 0-4
    level,
    feedback,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
  };
}

/**
 * Gets color class for password strength indicator
 * @param level - Password strength level
 * @returns Tailwind CSS color classes
 */
export function getPasswordStrengthColors(level: PasswordStrength): {
  text: string;
  bg: string;
  border: string;
} {
  switch (level) {
    case 'weak':
      return {
        text: 'text-red-600',
        bg: 'bg-red-100',
        border: 'border-red-300',
      };
    case 'fair':
      return {
        text: 'text-orange-600',
        bg: 'bg-orange-100',
        border: 'border-orange-300',
      };
    case 'good':
      return {
        text: 'text-blue-600',
        bg: 'bg-blue-100',
        border: 'border-blue-300',
      };
    case 'strong':
      return {
        text: 'text-green-600',
        bg: 'bg-green-100',
        border: 'border-green-300',
      };
    default:
      return {
        text: 'text-gray-600',
        bg: 'bg-gray-100',
        border: 'border-gray-300',
      };
  }
}

/**
 * Validates email format with comprehensive checks
 * @param email - Email address to validate
 * @returns Email validation result with suggestions
 */
export function validateEmailFormat(email: string): {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
} {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  // Basic format check
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  // Length validation
  if (email.length > 320) {
    return {
      isValid: false,
      error: 'Email address is too long',
    };
  }

  // Common domain suggestions
  const suggestions: string[] = [];
  const domain = email.split('@')[1]?.toLowerCase();

  if (domain) {
    // const commonDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'company.com'];

    // Simple typo detection for common domains
    const typoSuggestions: Record<string, string> = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmail.co': 'gmail.com',
      'outlookc.om': 'outlook.com',
      'hotmial.com': 'hotmail.com',
      'yaho.com': 'yahoo.com',
    };

    if (typoSuggestions[domain]) {
      const correctedEmail = email.replace(domain, typoSuggestions[domain]);
      suggestions.push(correctedEmail);
    }
  }

  return {
    isValid: true,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
}
