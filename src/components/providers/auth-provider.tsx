'use client';

import { User, Session } from '@supabase/supabase-js';
import { createContext, useContext, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userRole: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, session, loading, error } = useAuth();

  const contextValue: AuthContextType = {
    user,
    session,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.user_metadata?.role === 'admin',
    userRole: user?.user_metadata?.role || 'user',
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

// Loading component for auth states
export function AuthLoadingSpinner() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
    </div>
  );
}

// Protected route wrapper component
interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({
  children,
  fallback = <AuthLoadingSpinner />,
  requiredRole = 'user',
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, userRole } = useAuthContext();

  if (loading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    // This will be handled by middleware, but keeping as fallback
    window.location.href = '/auth/signin';
    return <>{fallback}</>;
  }

  if (requiredRole === 'admin' && userRole !== 'admin') {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold text-gray-900'>Access Denied</h1>
          <p className='text-gray-600'>You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
