import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { Database } from '@/types/database';

// This file should only be imported in Server Components or Server Actions

// Server-side Supabase client
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // Cookie setting may fail in some server contexts
            console.warn('Cookie setting failed:', error);
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            // Cookie removal may fail in some server contexts
            console.warn('Cookie removal failed:', error);
          }
        },
      },
    }
  );
}

// Get server-side session
export async function getServerSession() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Server session error:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Server session retrieval failed:', error);
    return null;
  }
}

// Get server-side user
export async function getServerUser() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Server user error:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Server user retrieval failed:', error);
    return null;
  }
}

// Check if user is authenticated (server-side)
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return !!session;
}

// Check if user has admin role (server-side)
export async function isAdmin(): Promise<boolean> {
  const user = await getServerUser();
  return user?.user_metadata?.role === 'admin';
}

// Get user role (server-side)
export async function getUserRole(): Promise<'user' | 'admin' | null> {
  const user = await getServerUser();
  if (!user) return null;
  return user.user_metadata?.role || 'user';
}
