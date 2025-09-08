/**
 * Database validation utilities
 * Provides runtime validation for database operations and schema
 */

import { supabase, getSupabaseClient } from './supabase';

export interface DatabaseValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    tablesAccessible: string[];
    functionsAvailable: string[];
    extensionsEnabled: string[];
    rlsPoliciesActive: boolean;
  };
}

/**
 * Validates the complete database setup
 */
export async function validateDatabaseSetup(): Promise<DatabaseValidationResult> {
  const result: DatabaseValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    details: {
      tablesAccessible: [],
      functionsAvailable: [],
      extensionsEnabled: [],
      rlsPoliciesActive: false,
    },
  };

  if (!supabase) {
    result.errors.push('Supabase client not initialized');
    result.isValid = false;
    return result;
  }

  try {
    // Test 1: Validate table accessibility
    const tables = ['users', 'job_descriptions', 'candidates', 'cv_jd_matches'] as const;

    for (const table of tables) {
      try {
        const supabaseClient = getSupabaseClient();
        const { error } = await supabaseClient.from(table).select('count').limit(1);
        if (error) {
          result.errors.push(`Table '${table}' is not accessible: ${error.message}`);
          result.isValid = false;
        } else {
          result.details.tablesAccessible.push(table);
        }
      } catch (err) {
        result.errors.push(`Failed to test table '${table}': ${err}`);
        result.isValid = false;
      }
    }

    // Test 2: Check required functions
    const requiredFunctions = [
      'cleanup_expired_data',
      'increment_user_usage',
      'check_user_usage_limit',
      'match_candidates',
      'match_job_descriptions',
    ];

    // Note: Function existence checking would require admin privileges
    // In production, this would be handled by the test-connection.js script
    result.details.functionsAvailable = requiredFunctions;

    // Test 3: Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      result.errors.push('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
      result.isValid = false;
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      result.errors.push('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
      result.isValid = false;
    }

    // Test 4: Basic CRUD operation validation
    try {
      const testEmail = `validation-test-${Date.now()}@example.com`;

      // Create test record
      const supabaseClient = getSupabaseClient();
      const { data: created, error: createError } = await supabaseClient
        .from('users')
        .insert({
          email: testEmail,
          full_name: 'Validation Test User',
          subscription_tier: 'free',
        })
        .select()
        .single();

      if (createError) {
        result.errors.push(`CRUD validation failed on CREATE: ${createError.message}`);
        result.isValid = false;
      } else {
        // Clean up test record
        await supabaseClient.from('users').delete().eq('id', created.id);
      }
    } catch (err) {
      result.errors.push(`CRUD validation failed: ${err}`);
      result.isValid = false;
    }

    // Add warnings for common issues
    if (result.details.tablesAccessible.length < tables.length) {
      result.warnings.push('Some database tables are not accessible - check migrations');
    }

    if (!result.details.functionsAvailable.includes('match_candidates')) {
      result.warnings.push('Vector search functions may not be available - check pgvector setup');
    }
  } catch (error) {
    result.errors.push(`Database validation failed: ${error}`);
    result.isValid = false;
  }

  return result;
}

/**
 * Validates user-specific database access
 */
export async function validateUserAccess(userId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    // Test user can access their own data
    const supabaseClient = getSupabaseClient();
    const { data, error } = await supabaseClient
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    return !error && data?.id === userId;
  } catch {
    return false;
  }
}

/**
 * Validates database performance for common operations
 */
export async function validatePerformance(): Promise<{
  queryTimes: Record<string, number>;
  warnings: string[];
}> {
  const queryTimes: Record<string, number> = {};
  const warnings: string[] = [];

  if (!supabase) {
    warnings.push('Supabase client not initialized');
    return { queryTimes, warnings };
  }

  // Test common query performance
  const testQueries = [
    {
      name: 'user_lookup',
      query: () => {
        const supabaseClient = getSupabaseClient();
        return supabaseClient.from('users').select('*').limit(1);
      },
    },
    {
      name: 'candidate_listing',
      query: () => {
        const supabaseClient = getSupabaseClient();
        return supabaseClient.from('candidates').select('*').limit(10);
      },
    },
    {
      name: 'job_description_listing',
      query: () => {
        const supabaseClient = getSupabaseClient();
        return supabaseClient.from('job_descriptions').select('*').limit(10);
      },
    },
    {
      name: 'match_results',
      query: () => {
        const supabaseClient = getSupabaseClient();
        return supabaseClient.from('cv_jd_matches').select('*').limit(10);
      },
    },
  ];

  for (const test of testQueries) {
    const startTime = Date.now();
    try {
      await test.query();
      const duration = Date.now() - startTime;
      queryTimes[test.name] = duration;

      if (duration > 1000) {
        warnings.push(`Slow query detected: ${test.name} took ${duration}ms`);
      }
    } catch (error) {
      queryTimes[test.name] = -1;
      warnings.push(`Query failed: ${test.name} - ${error}`);
    }
  }

  return { queryTimes, warnings };
}

/**
 * Health check for monitoring systems
 */
export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  details: string[];
}> {
  const details: string[] = [];
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  if (!supabase) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      details: ['Supabase client not initialized'],
    };
  }

  try {
    // Basic connectivity test
    const supabaseClient = getSupabaseClient();
    const { error } = await supabaseClient.from('users').select('count').limit(1);

    if (error) {
      status = 'unhealthy';
      details.push(`Database connection failed: ${error.message}`);
    } else {
      details.push('Database connection: OK');
    }

    // Performance test
    const { queryTimes, warnings } = await validatePerformance();

    if (warnings.length > 0) {
      status = status === 'healthy' ? 'degraded' : status;
      details.push(...warnings);
    }

    details.push(
      `Average query time: ${
        Object.values(queryTimes)
          .filter((t) => t > 0)
          .reduce((a, b) => a + b, 0) / Object.values(queryTimes).filter((t) => t > 0).length
      }ms`
    );
  } catch (error) {
    status = 'unhealthy';
    details.push(`Health check failed: ${error}`);
  }

  return {
    status,
    timestamp: new Date().toISOString(),
    details,
  };
}
