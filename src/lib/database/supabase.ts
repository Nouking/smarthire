import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Database } from '@/types/database';

// Environment variables with fallback to .env.example values
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dpxkrptixvluyxvehgfn.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweGtycHRpeHZsdXl4dmVoZ2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5NzE4NjIsImV4cCI6MjA3MjU0Nzg2Mn0.6TV9bBFpvJO95JpEqkojU4rtDj7uUJvZPpq-_bVHaIQ';

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl || !supabaseAnonKey) {
  if (isBuildTime) {
    console.warn(
      'Supabase environment variables not available during build time, using fallback values'
    );
  } else {
    throw new Error('Missing Supabase environment variables');
  }
}

// Create Supabase client with TypeScript support (conditional for build time)
let supabase: SupabaseClient<Database> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'smarthire-web',
      },
    },
  });
}

// Export with null check
export { supabase };

// Connection health check utility
export const checkDatabaseConnection = async (): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase client not initialized');
    return false;
  }

  try {
    const { error } = await supabase!.from('users').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Error handling utilities
export const handleDatabaseError = (
  error: { message?: string; details?: string; hint?: string; code?: string },
  operation: string
) => {
  console.error(`Database error during ${operation}:`, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });

  // Return user-friendly error messages
  switch (error.code) {
    case '23505': // Unique violation
      return 'This record already exists.';
    case '23503': // Foreign key violation
      return 'Referenced record not found.';
    case '23514': // Check violation
      return 'Invalid data provided.';
    case 'PGRST116': // Row Level Security violation
      return 'Access denied to this resource.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

// Performance monitoring utility
export const withPerformanceMonitoring = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  if (!supabase) {
    console.warn(`Supabase client not initialized - skipping ${operationName}`);
    throw new Error('Database not available during build time');
  }

  const startTime = Date.now();

  try {
    const result = await operation();
    const duration = Date.now() - startTime;

    // Log slow queries (>1000ms)
    if (duration > 1000) {
      console.warn(`Slow database operation: ${operationName} took ${duration}ms`);
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Database operation failed: ${operationName} after ${duration}ms`, error);
    throw error;
  }
};
