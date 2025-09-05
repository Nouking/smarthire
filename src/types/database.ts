export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      candidates: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string | null
          phone: string | null
          original_filename: string
          cv_text: string
          cv_summary: string | null
          extracted_skills: string[] | null
          cv_embedding: string | null // vector type as string
          experience_level: string | null
          file_url: string
          file_type: string
          file_size_bytes: number | null
          processed_at: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email?: string | null
          phone?: string | null
          original_filename: string
          cv_text: string
          cv_summary?: string | null
          extracted_skills?: string[] | null
          cv_embedding?: string | null
          experience_level?: string | null
          file_url: string
          file_type: string
          file_size_bytes?: number | null
          processed_at?: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string | null
          phone?: string | null
          original_filename?: string
          cv_text?: string
          cv_summary?: string | null
          extracted_skills?: string[] | null
          cv_embedding?: string | null
          experience_level?: string | null
          file_url?: string
          file_type?: string
          file_size_bytes?: number | null
          processed_at?: string
          expires_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cv_jd_matches: {
        Row: {
          id: string
          user_id: string
          candidate_id: string
          job_description_id: string
          match_percentage: number
          confidence_score: number
          processing_time_ms: number
          matching_skills: string[] | null
          missing_skills: string[] | null
          strengths: string[] | null
          concerns: string[] | null
          recommendation: string
          ai_reasoning: string
          user_rating: number | null
          user_feedback: string | null
          user_decision: string | null
          ai_provider: string | null
          processing_cost_usd: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          candidate_id: string
          job_description_id: string
          match_percentage: number
          confidence_score: number
          processing_time_ms: number
          matching_skills?: string[] | null
          missing_skills?: string[] | null
          strengths?: string[] | null
          concerns?: string[] | null
          recommendation: string
          ai_reasoning: string
          user_rating?: number | null
          user_feedback?: string | null
          user_decision?: string | null
          ai_provider?: string | null
          processing_cost_usd?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          candidate_id?: string
          job_description_id?: string
          match_percentage?: number
          confidence_score?: number
          processing_time_ms?: number
          matching_skills?: string[] | null
          missing_skills?: string[] | null
          strengths?: string[] | null
          concerns?: string[] | null
          recommendation?: string
          ai_reasoning?: string
          user_rating?: number | null
          user_feedback?: string | null
          user_decision?: string | null
          ai_provider?: string | null
          processing_cost_usd?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_jd_matches_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_jd_matches_job_description_id_fkey"
            columns: ["job_description_id"]
            isOneToOne: false
            referencedRelation: "job_descriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_jd_matches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      job_descriptions: {
        Row: {
          id: string
          user_id: string
          title: string
          company: string | null
          description: string
          requirements: string
          description_embedding: string | null // vector type as string
          key_skills: string[] | null
          experience_level: string | null
          times_used: number | null
          last_used_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          company?: string | null
          description: string
          requirements: string
          description_embedding?: string | null
          key_skills?: string[] | null
          experience_level?: string | null
          times_used?: number | null
          last_used_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          company?: string | null
          description?: string
          requirements?: string
          description_embedding?: string | null
          key_skills?: string[] | null
          experience_level?: string | null
          times_used?: number | null
          last_used_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_descriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company: string | null
          subscription_tier: string | null
          monthly_usage_count: number | null
          usage_reset_date: string | null
          preferred_analysis_depth: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          company?: string | null
          subscription_tier?: string | null
          monthly_usage_count?: number | null
          usage_reset_date?: string | null
          preferred_analysis_depth?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company?: string | null
          subscription_tier?: string | null
          monthly_usage_count?: number | null
          usage_reset_date?: string | null
          preferred_analysis_depth?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_usage_limit: {
        Args: {
          user_uuid: string
          tier_limit: number
        }
        Returns: boolean
      }
      cleanup_expired_data: {
        Args: {}
        Returns: undefined
      }
      increment_user_usage: {
        Args: {
          user_uuid: string
        }
        Returns: undefined
      }
      match_candidates: {
        Args: {
          query_embedding: number[]
          match_threshold: number
          match_count: number
          user_id: string
        }
        Returns: {
          id: string
          user_id: string
          full_name: string
          email: string | null
          phone: string | null
          original_filename: string
          cv_text: string
          cv_summary: string | null
          extracted_skills: string[] | null
          experience_level: string | null
          file_url: string
          file_type: string
          file_size_bytes: number | null
          processed_at: string
          expires_at: string | null
          created_at: string
          similarity: number
        }[]
      }
      match_job_descriptions: {
        Args: {
          query_embedding: number[]
          match_threshold: number
          match_count: number
          user_id: string
        }
        Returns: {
          id: string
          user_id: string
          title: string
          company: string | null
          description: string
          requirements: string
          key_skills: string[] | null
          experience_level: string | null
          times_used: number | null
          last_used_at: string | null
          created_at: string
          updated_at: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Additional utility types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Subscription tier type
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise'

// Experience level type
export type ExperienceLevel = 'junior' | 'mid' | 'senior'

// Match recommendation type
export type MatchRecommendation = 'strong_match' | 'potential_fit' | 'not_recommended'

// User decision type
export type UserDecision = 'interview' | 'maybe' | 'pass'

// Analysis depth type
export type AnalysisDepth = 'basic' | 'standard' | 'comprehensive'

// File type for CVs
export type CVFileType = 'pdf' | 'doc' | 'docx' | 'txt'