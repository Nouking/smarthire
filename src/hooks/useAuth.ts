'use client';

import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabaseAuth, onAuthStateChange } from '@/lib/auth/client-exports';

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabaseAuth.auth.getSession();
        
        if (mounted) {
          if (error) {
            setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
          } else {
            setAuthState({
              user: session?.user ?? null,
              session,
              loading: false,
              error: null
            });
          }
        }
      } catch (error) {
        if (mounted) {
          setAuthState(prev => ({ 
            ...prev, 
            error: 'Failed to initialize authentication', 
            loading: false 
          }));
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = onAuthStateChange((session) => {
      if (mounted) {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        });
      }
    });

    getInitialSession();

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return authState;
}

// Custom hook for checking if user is authenticated
export function useAuthUser() {
  const { user, loading } = useAuth();
  return { user, loading, isAuthenticated: !!user };
}

// Custom hook for user role
export function useUserRole() {
  const { user, loading } = useAuth();
  
  return {
    role: user?.user_metadata?.role || 'user',
    isAdmin: user?.user_metadata?.role === 'admin',
    loading
  };
}