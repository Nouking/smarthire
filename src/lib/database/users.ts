import { Database } from '@/types/database';

import { supabase, handleDatabaseError, withPerformanceMonitoring } from './supabase';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

export class UserService {
  // Create a new user
  static async create(userData: UserInsert): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!.from('users').insert(userData).select().single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'create user'));
      }

      return data;
    }, 'UserService.create');
  }

  // Get user by ID
  static async getById(id: string): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!.from('users').select('*').eq('id', id).single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get user by ID'));
      }

      return data;
    }, 'UserService.getById');
  }

  // Get user by email
  static async getByEmail(email: string): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!.from('users').select('*').eq('email', email).single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get user by email'));
      }

      return data;
    }, 'UserService.getByEmail');
  }

  // Update user
  static async update(id: string, updates: UserUpdate): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'update user'));
      }

      return data;
    }, 'UserService.update');
  }

  // Increment user usage count
  static async incrementUsage(id: string): Promise<void> {
    return withPerformanceMonitoring(async () => {
      const { error } = await supabase!.rpc('increment_user_usage', {
        user_uuid: id,
      });

      if (error) {
        throw new Error(handleDatabaseError(error, 'increment user usage'));
      }
    }, 'UserService.incrementUsage');
  }

  // Check if user has exceeded usage limits
  static async checkUsageLimit(id: string, limit: number): Promise<boolean> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!.rpc('check_user_usage_limit', {
        user_uuid: id,
        tier_limit: limit,
      });

      if (error) {
        throw new Error(handleDatabaseError(error, 'check user usage limit'));
      }

      return data;
    }, 'UserService.checkUsageLimit');
  }

  // Get user usage statistics
  static async getUsageStats(id: string): Promise<{
    monthly_usage_count: number | null;
    usage_reset_date: string | null;
    subscription_tier: string | null;
  } | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase!
        .from('users')
        .select('monthly_usage_count, usage_reset_date, subscription_tier')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'get user usage stats'));
      }

      return data;
    }, 'UserService.getUsageStats');
  }
}

// Convenience functions for Server Components
export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    return await UserService.getById(userId);
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: UserUpdate): Promise<User | null> {
  try {
    return await UserService.update(userId, updates);
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return null;
  }
}

// Onboarding-specific functions
export interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  skipped: boolean;
}

export async function getUserOnboardingProgress(
  userId: string
): Promise<OnboardingProgress | null> {
  try {
    const user = await UserService.getById(userId);
    if (!user) return null;

    // For now, we'll use a simple approach with user metadata
    // In a full implementation, you might add onboarding fields to the users table
    // or create a separate onboarding_progress table

    return {
      currentStep: 1,
      totalSteps: 4,
      completedSteps: [],
      skipped: false,
    };
  } catch (error) {
    console.error('Failed to get user onboarding progress:', error);
    return null;
  }
}

export async function updateUserOnboardingProgress(
  userId: string,
  progress: Partial<OnboardingProgress>
): Promise<boolean> {
  try {
    // In a full implementation, you would store this in the database
    // For now, we'll just log it
    console.warn('Updating onboarding progress for user:', userId, progress);

    // Example: You might update a JSON field in the users table
    // await UserService.update(userId, {
    //   onboarding_progress: progress
    // });

    return true;
  } catch (error) {
    console.error('Failed to update user onboarding progress:', error);
    return false;
  }
}
