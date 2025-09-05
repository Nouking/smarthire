// Database services and utilities
export {
  supabase,
  checkDatabaseConnection,
  handleDatabaseError,
  withPerformanceMonitoring,
} from './supabase';

// Service classes
export { UserService } from './users';
export { JobDescriptionService } from './job-descriptions';
export { CandidateService } from './candidates';
export { MatchService } from './matches';

// Re-export types
export type { Database } from '@/types/database';
