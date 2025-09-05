import { Database } from '@/types/database';

import { supabase, handleDatabaseError, withPerformanceMonitoring } from './supabase';

type Candidate = Database['public']['Tables']['candidates']['Row'];
type CandidateInsert = Database['public']['Tables']['candidates']['Insert'];
type CandidateUpdate = Database['public']['Tables']['candidates']['Update'];
type CandidateWithSimilarity = Omit<Candidate, 'cv_embedding'> & {
  similarity: number;
};

export class CandidateService {
  // Create a new candidate
  static async create(candidateData: CandidateInsert): Promise<Candidate | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('candidates')
        .insert(candidateData)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'create candidate'));
      }

      return data;
    }, 'CandidateService.create');
  }

  // Get candidate by ID
  static async getById(id: string): Promise<Candidate | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.from('candidates').select('*').eq('id', id).single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get candidate by ID'));
      }

      return data;
    }, 'CandidateService.getById');
  }

  // Get all candidates for a user
  static async getByUser(userId: string, limit = 20, offset = 0): Promise<Candidate[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get user candidates'));
      }

      return data || [];
    }, 'CandidateService.getByUser');
  }

  // Update candidate
  static async update(id: string, updates: CandidateUpdate): Promise<Candidate | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('candidates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'update candidate'));
      }

      return data;
    }, 'CandidateService.update');
  }

  // Delete candidate
  static async delete(id: string): Promise<void> {
    return withPerformanceMonitoring(async () => {
      const { error } = await supabase.from('candidates').delete().eq('id', id);

      if (error) {
        throw new Error(handleDatabaseError(error, 'delete candidate'));
      }
    }, 'CandidateService.delete');
  }

  // Search candidates by semantic similarity (requires embedding)
  static async searchBySimilarity(
    embedding: number[],
    userId: string,
    threshold = 0.8,
    limit = 10
  ): Promise<CandidateWithSimilarity[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase.rpc('match_candidates', {
        query_embedding: embedding,
        match_threshold: threshold,
        match_count: limit,
        user_id: userId,
      });

      if (error) {
        throw new Error(handleDatabaseError(error, 'search candidates by similarity'));
      }

      return data || [];
    }, 'CandidateService.searchBySimilarity');
  }

  // Get candidates nearing expiration
  static async getNearExpiration(userId: string, daysAhead = 7): Promise<Candidate[]> {
    return withPerformanceMonitoring(async () => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + daysAhead);

      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('user_id', userId)
        .lte('expires_at', expirationDate.toISOString())
        .order('expires_at', { ascending: true });

      if (error) {
        throw new Error(handleDatabaseError(error, 'get candidates nearing expiration'));
      }

      return data || [];
    }, 'CandidateService.getNearExpiration');
  }

  // Extend candidate expiration
  static async extendExpiration(id: string, additionalDays = 30): Promise<Candidate | null> {
    return withPerformanceMonitoring(async () => {
      const newExpirationDate = new Date();
      newExpirationDate.setDate(newExpirationDate.getDate() + additionalDays);

      const { data, error } = await supabase
        .from('candidates')
        .update({ expires_at: newExpirationDate.toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'extend candidate expiration'));
      }

      return data;
    }, 'CandidateService.extendExpiration');
  }

  // Get candidates by skill
  static async getBySkill(userId: string, skill: string): Promise<Candidate[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('user_id', userId)
        .contains('extracted_skills', [skill]);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get candidates by skill'));
      }

      return data || [];
    }, 'CandidateService.getBySkill');
  }

  // Get candidate statistics for a user
  static async getStats(userId: string): Promise<{
    total_candidates: number;
    candidates_this_month: number;
    expiring_soon: number;
  }> {
    return withPerformanceMonitoring(async () => {
      const currentMonth = new Date();
      currentMonth.setDate(1);
      currentMonth.setHours(0, 0, 0, 0);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const [totalResult, monthResult, expiringResult] = await Promise.all([
        supabase.from('candidates').select('id', { count: 'exact' }).eq('user_id', userId),
        supabase
          .from('candidates')
          .select('id', { count: 'exact' })
          .eq('user_id', userId)
          .gte('created_at', currentMonth.toISOString()),
        supabase
          .from('candidates')
          .select('id', { count: 'exact' })
          .eq('user_id', userId)
          .lte('expires_at', expirationDate.toISOString()),
      ]);

      return {
        total_candidates: totalResult.count || 0,
        candidates_this_month: monthResult.count || 0,
        expiring_soon: expiringResult.count || 0,
      };
    }, 'CandidateService.getStats');
  }
}
