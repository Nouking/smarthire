// Validate company name (could be extended with business validation)
export function validateCompanyName(name: string): {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
} {
  if (!name || name.trim().length < 2) {
    return {
      isValid: false,
      error: 'Company name must be at least 2 characters long',
    };
  }

  if (name.length > 100) {
    return {
      isValid: false,
      error: 'Company name must not exceed 100 characters',
    };
  }

  // Check for potentially invalid company names
  const invalidPatterns = ['test', 'example', 'demo', 'sample'];
  const lowerName = name.toLowerCase();

  if (invalidPatterns.some((pattern) => lowerName.includes(pattern))) {
    return {
      isValid: true, // Still valid, but provide suggestion
      suggestions: ['Please enter your actual company name for the best experience'],
    };
  }

  return { isValid: true };
}
