import { createClient, type Session } from '@supabase/supabase-js';

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

// Create Supabase client for authentication (only if not in build time)
let supabaseAuth: ReturnType<typeof createClient<Database>> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseAuth = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'X-Client-Info': 'smarthire-auth',
      },
    },
  });
}

// Export with null check
export { supabaseAuth };

// Authentication state types
export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

// Authentication error types
export type AuthError = {
  message: string;
  code?: string;
  statusCode?: number;
};

// Session management utilities
export const getSession = async () => {
  if (!supabaseAuth) {
    console.warn('Supabase client not initialized');
    return null;
  }

  try {
    const {
      data: { session },
      error,
    } = await supabaseAuth.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Session retrieval failed:', error);
    return null;
  }
};

export const getUser = async () => {
  if (!supabaseAuth) {
    console.warn('Supabase client not initialized');
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await supabaseAuth.auth.getUser();

    if (error) {
      console.error('Error getting user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('User retrieval failed:', error);
    return null;
  }
};

// Token refresh utility
export const refreshSession = async () => {
  if (!supabaseAuth) {
    console.warn('Supabase client not initialized');
    return null;
  }

  try {
    const { data, error } = await supabaseAuth.auth.refreshSession();

    if (error) {
      console.error('Session refresh failed:', error);
      return null;
    }

    return data.session;
  } catch (error) {
    console.error('Session refresh error:', error);
    return null;
  }
};

// Auth state change listener setup
export const onAuthStateChange = (callback: (session: Session | null) => void) => {
  if (!supabaseAuth) {
    console.warn('Supabase client not initialized');
    return { data: { subscription: { unsubscribe: () => {} } } };
  }

  return supabaseAuth.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
};
