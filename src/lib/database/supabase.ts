import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with TypeScript support
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'smarthire-web'
    }
  }
});

// Connection health check utility
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('users').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Error handling utilities
export const handleDatabaseError = (error: any, operation: string) => {
  console.error(`Database error during ${operation}:`, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code
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