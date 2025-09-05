import { supabaseAuth } from './client';

// Environment validation
export interface EnvironmentValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): EnvironmentValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is not configured');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured');
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    warnings.push('SUPABASE_SERVICE_ROLE_KEY is not configured (needed for admin operations)');
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    warnings.push('NEXT_PUBLIC_APP_URL is not configured (may affect redirects)');
  }

  // Check URL format
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')
  ) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL must start with https://');
  }

  // Check if running in development
  if (process.env.NODE_ENV === 'development') {
    warnings.push('Running in development mode');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Database connection validation
export async function validateDatabaseConnection(): Promise<{
  isConnected: boolean;
  error?: string;
  latency?: number;
}> {
  try {
    const startTime = Date.now();

    const { error } = await supabaseAuth.from('users').select('id').limit(1);

    const latency = Date.now() - startTime;

    if (error) {
      return {
        isConnected: false,
        error: error.message,
        latency,
      };
    }

    return {
      isConnected: true,
      latency,
    };
  } catch (error) {
    return {
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

// Authentication service validation
export async function validateAuthService(): Promise<{
  isWorking: boolean;
  error?: string;
  features: {
    emailAuth: boolean;
    sessionManagement: boolean;
    userMetadata: boolean;
  };
}> {
  try {
    // Test session retrieval
    const { error: sessionError } = await supabaseAuth.auth.getSession();

    if (sessionError) {
      return {
        isWorking: false,
        error: `Session management failed: ${sessionError.message}`,
        features: {
          emailAuth: false,
          sessionManagement: false,
          userMetadata: false,
        },
      };
    }

    return {
      isWorking: true,
      features: {
        emailAuth: true,
        sessionManagement: true,
        userMetadata: true,
      },
    };
  } catch (error) {
    return {
      isWorking: false,
      error: error instanceof Error ? error.message : 'Unknown auth error',
      features: {
        emailAuth: false,
        sessionManagement: false,
        userMetadata: false,
      },
    };
  }
}

// Storage service validation
export async function validateStorageService(): Promise<{
  isWorking: boolean;
  error?: string;
  buckets: string[];
}> {
  try {
    const { data: buckets, error } = await supabaseAuth.storage.listBuckets();

    if (error) {
      return {
        isWorking: false,
        error: `Storage access failed: ${error.message}`,
        buckets: [],
      };
    }

    return {
      isWorking: true,
      buckets: buckets.map((bucket) => bucket.name),
    };
  } catch (error) {
    return {
      isWorking: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      buckets: [],
    };
  }
}

// Security configuration validation
export function validateSecurityConfiguration(): {
  isSecure: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check if using HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://')) {
      issues.push('Production environment should use HTTPS');
    }
  }

  // Check for secure cookie settings
  if (process.env.NODE_ENV === 'production' && !process.env.SECURE_COOKIES) {
    recommendations.push('Consider enabling secure cookies in production');
  }

  // Check for strong password requirements
  recommendations.push('Ensure password complexity requirements are enforced');
  recommendations.push('Consider implementing rate limiting for auth endpoints');
  recommendations.push('Monitor failed authentication attempts');

  return {
    isSecure: issues.length === 0,
    issues,
    recommendations,
  };
}

// Comprehensive system validation
export async function validateSystem(): Promise<{
  isHealthy: boolean;
  environment: EnvironmentValidation;
  database: Awaited<ReturnType<typeof validateDatabaseConnection>>;
  auth: Awaited<ReturnType<typeof validateAuthService>>;
  storage: Awaited<ReturnType<typeof validateStorageService>>;
  security: ReturnType<typeof validateSecurityConfiguration>;
}> {
  const [environment, database, auth, storage] = await Promise.all([
    Promise.resolve(validateEnvironment()),
    validateDatabaseConnection(),
    validateAuthService(),
    validateStorageService(),
  ]);

  const security = validateSecurityConfiguration();

  const isHealthy =
    environment.isValid &&
    database.isConnected &&
    auth.isWorking &&
    storage.isWorking &&
    security.isSecure;

  return {
    isHealthy,
    environment,
    database,
    auth,
    storage,
    security,
  };
}
