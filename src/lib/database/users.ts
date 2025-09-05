import { Database } from '@/types/database';

import { supabase, handleDatabaseError, withPerformanceMonitoring } from './supabase';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

export class UserService {
  // Create a new user
  static async create(userData: UserInsert): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.from('users').insert(userData).select().single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'create user'));
      }

      return data;
    }, 'UserService.create');
  }

  // Get user by ID
  static async getById(id: string): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get user by ID'));
      }

      return data;
    }, 'UserService.getById');
  }

  // Get user by email
  static async getByEmail(email: string): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get user by email'));
      }

      return data;
    }, 'UserService.getByEmail');
  }

  // Update user
  static async update(id: string, updates: UserUpdate): Promise<User | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
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
      const { error } = await supabase.rpc('increment_user_usage', {
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
      const { data, error } = await supabase.rpc('check_user_usage_limit', {
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
      const { data, error } = await supabase
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
