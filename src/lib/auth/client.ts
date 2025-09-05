import { createClient, type Session } from '@supabase/supabase-js';

import { Database } from '@/types/database';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client for authentication
export const supabaseAuth = createClient<Database>(supabaseUrl, supabaseAnonKey, {
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
  return supabaseAuth.auth.onAuthStateChange((event, session) => {
    callback(session);
  });
};
