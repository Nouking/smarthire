import { Database } from '@/types/database';

import { supabase, handleDatabaseError, withPerformanceMonitoring } from './supabase';

type JobDescription = Database['public']['Tables']['job_descriptions']['Row'];
type JobDescriptionInsert = Database['public']['Tables']['job_descriptions']['Insert'];
type JobDescriptionUpdate = Database['public']['Tables']['job_descriptions']['Update'];
type JobDescriptionWithSimilarity = Omit<JobDescription, 'description_embedding'> & {
  similarity: number;
};

export class JobDescriptionService {
  // Create a new job description
  static async create(jobData: JobDescriptionInsert): Promise<JobDescription | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .insert(jobData)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'create job description'));
      }

      return data;
    }, 'JobDescriptionService.create');
  }

  // Get job description by ID
  static async getById(id: string): Promise<JobDescription | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get job description by ID'));
      }

      return data;
    }, 'JobDescriptionService.getById');
  }

  // Get all job descriptions for a user
  static async getByUser(userId: string, limit = 20, offset = 0): Promise<JobDescription[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get user job descriptions'));
      }

      return data || [];
    }, 'JobDescriptionService.getByUser');
  }

  // Update job description
  static async update(id: string, updates: JobDescriptionUpdate): Promise<JobDescription | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'update job description'));
      }

      return data;
    }, 'JobDescriptionService.update');
  }

  // Delete job description
  static async delete(id: string): Promise<void> {
    return withPerformanceMonitoring(async () => {
      const { error } = await supabase.from('job_descriptions').delete().eq('id', id);

      if (error) {
        throw new Error(handleDatabaseError(error, 'delete job description'));
      }
    }, 'JobDescriptionService.delete');
  }

  // Search job descriptions by semantic similarity (requires embedding)
  static async searchBySimilarity(
    embedding: number[],
    userId: string,
    threshold = 0.8,
    limit = 10
  ): Promise<JobDescriptionWithSimilarity[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.rpc('match_job_descriptions', {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        user_id: userId,
      });

      if (error) {
        throw new Error(handleDatabaseError(error, 'search job descriptions by similarity'));
      }

      return data || [];
    }, 'JobDescriptionService.searchBySimilarity');
  }

  // Update usage tracking
  static async incrementUsage(id: string): Promise<void> {
    return withPerformanceMonitoring(async () => {
      // First get the current times_used value
      const { data: current, error: fetchError } = await supabase
        .from('job_descriptions')
        .select('times_used')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw new Error(handleDatabaseError(fetchError, 'fetch job description usage'));
      }

      // Increment and update
      const { error } = await supabase
        .from('job_descriptions')
        .update({
          times_used: (current?.times_used || 0) + 1,
          last_used_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        throw new Error(handleDatabaseError(error, 'increment job description usage'));
      }
    }, 'JobDescriptionService.incrementUsage');
  }

  // Get most used job descriptions for a user
  static async getMostUsed(userId: string, limit = 5): Promise<JobDescription[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('job_descriptions')
        .select('*')
        .eq('user_id', userId)
        .order('times_used', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get most used job descriptions'));
      }

      return data || [];
    }, 'JobDescriptionService.getMostUsed');
  }
}
