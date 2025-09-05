import { Database } from '@/types/database';

import { supabase, handleDatabaseError, withPerformanceMonitoring } from './supabase';

type CVJDMatch = Database['public']['Tables']['cv_jd_matches']['Row'];
type CVJDMatchInsert = Database['public']['Tables']['cv_jd_matches']['Insert'];
// type CVJDMatchUpdate = Database['public']['Tables']['cv_jd_matches']['Update']; // Unused for now

export class MatchService {
  // Create a new CV-JD match analysis
  static async create(matchData: CVJDMatchInsert): Promise<CVJDMatch | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .insert(matchData)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'create CV-JD match'));
      }

      return data;
    }, 'MatchService.create');
  }

  // Get match by ID
  static async getById(id: string): Promise<CVJDMatch | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          candidates (
            full_name,
            email,
            original_filename
          ),
          job_descriptions (
            title,
            company
          )
        `
        )
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(handleDatabaseError(error, 'get match by ID'));
      }

      return data;
    }, 'MatchService.getById');
  }

  // Get all matches for a user
  static async getByUser(userId: string, limit = 20, offset = 0): Promise<CVJDMatch[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          candidates (
            full_name,
            email,
            original_filename
          ),
          job_descriptions (
            title,
            company
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get user matches'));
      }

      return data || [];
    }, 'MatchService.getByUser');
  }

  // Get matches for a specific job description
  static async getByJobDescription(jobDescriptionId: string, userId: string): Promise<CVJDMatch[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          candidates (
            full_name,
            email,
            original_filename
          )
        `
        )
        .eq('job_description_id', jobDescriptionId)
        .eq('user_id', userId)
        .order('match_percentage', { ascending: false });

      if (error) {
        throw new Error(handleDatabaseError(error, 'get matches by job description'));
      }

      return data || [];
    }, 'MatchService.getByJobDescription');
  }

  // Get matches for a specific candidate
  static async getByCandidate(candidateId: string, userId: string): Promise<CVJDMatch[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          job_descriptions (
            title,
            company
          )
        `
        )
        .eq('candidate_id', candidateId)
        .eq('user_id', userId)
        .order('match_percentage', { ascending: false });

      if (error) {
        throw new Error(handleDatabaseError(error, 'get matches by candidate'));
      }

      return data || [];
    }, 'MatchService.getByCandidate');
  }

  // Update match with user feedback
  static async updateUserFeedback(
    id: string,
    feedback: {
      user_rating?: number;
      user_feedback?: string;
      user_decision?: string;
    }
  ): Promise<CVJDMatch | null> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .update(feedback)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(handleDatabaseError(error, 'update match feedback'));
      }

      return data;
    }, 'MatchService.updateUserFeedback');
  }

  // Get top matches by percentage
  static async getTopMatches(userId: string, minPercentage = 70, limit = 10): Promise<CVJDMatch[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          candidates (
            full_name,
            email,
            original_filename
          ),
          job_descriptions (
            title,
            company
          )
        `
        )
        .eq('user_id', userId)
        .gte('match_percentage', minPercentage)
        .order('match_percentage', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get top matches'));
      }

      return data || [];
    }, 'MatchService.getTopMatches');
  }

  // Get matches by recommendation level
  static async getByRecommendation(
    userId: string,
    recommendation: 'strong_match' | 'potential_fit' | 'not_recommended'
  ): Promise<CVJDMatch[]> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          *,
          candidates (
            full_name,
            email,
            original_filename
          ),
          job_descriptions (
            title,
            company
          )
        `
        )
        .eq('user_id', userId)
        .eq('recommendation', recommendation)
        .order('match_percentage', { ascending: false });

      if (error) {
        throw new Error(handleDatabaseError(error, 'get matches by recommendation'));
      }

      return data || [];
    }, 'MatchService.getByRecommendation');
  }

  // Get match analytics for a user
  static async getAnalytics(userId: string): Promise<{
    total_matches: number;
    average_match_percentage: number;
    strong_matches: number;
    potential_fits: number;
    not_recommended: number;
    average_processing_time_ms: number;
    total_cost_usd: number;
  }> {
    return withPerformanceMonitoring(async () => {
      const { data, error } = await supabase
        .from('cv_jd_matches')
        .select(
          `
          match_percentage,
          recommendation,
          processing_time_ms,
          processing_cost_usd
        `
        )
        .eq('user_id', userId);

      if (error) {
        throw new Error(handleDatabaseError(error, 'get match analytics'));
      }

      if (!data || data.length === 0) {
        return {
          total_matches: 0,
          average_match_percentage: 0,
          strong_matches: 0,
          potential_fits: 0,
          not_recommended: 0,
          average_processing_time_ms: 0,
          total_cost_usd: 0,
        };
      }

      const totalMatches = data.length;
      const avgMatchPercentage =
        data.reduce((sum, match) => sum + match.match_percentage, 0) / totalMatches;
      const strongMatches = data.filter((match) => match.recommendation === 'strong_match').length;
      const potentialFits = data.filter((match) => match.recommendation === 'potential_fit').length;
      const notRecommended = data.filter(
        (match) => match.recommendation === 'not_recommended'
      ).length;
      const avgProcessingTime =
        data.reduce((sum, match) => sum + match.processing_time_ms, 0) / totalMatches;
      const totalCost = data.reduce((sum, match) => sum + (match.processing_cost_usd || 0), 0);

      return {
        total_matches: totalMatches,
        average_match_percentage: Math.round(avgMatchPercentage * 100) / 100,
        strong_matches: strongMatches,
        potential_fits: potentialFits,
        not_recommended: notRecommended,
        average_processing_time_ms: Math.round(avgProcessingTime),
        total_cost_usd: Math.round(totalCost * 10000) / 10000,
      };
    }, 'MatchService.getAnalytics');
  }

  // Delete match
  static async delete(id: string): Promise<void> {
    return withPerformanceMonitoring(async () => {
      const { error } = await supabase.from('cv_jd_matches').delete().eq('id', id);

      if (error) {
        throw new Error(handleDatabaseError(error, 'delete match'));
      }
    }, 'MatchService.delete');
  }
}
