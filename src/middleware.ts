import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: { [key: string]: unknown }) {
          supabaseResponse.cookies.set(name, value, options);
        },
        remove(name: string, options: { [key: string]: unknown }) {
          supabaseResponse.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  // Get user session
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Define route categories
  const authRoutes = ['/auth/signin', '/auth/signup', '/auth/reset-password', '/auth/verify-email'];
  const protectedRoutes = ['/dashboard', '/profile', '/upload', '/jobs', '/candidates'];
  const adminRoutes = ['/admin'];
  const publicRoutes = ['/', '/about', '/contact'];

  // Handle authentication errors
  if (error) {
    console.error('Middleware auth error:', error);

    // Redirect to signin if trying to access protected routes
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      adminRoutes.some((route) => pathname.startsWith(route))
    ) {
      url.pathname = '/auth/signin';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // User is authenticated
  if (session?.user) {
    // Redirect authenticated users away from auth pages
    if (authRoutes.includes(pathname)) {
      const redirectTo = url.searchParams.get('redirectTo');
      if (redirectTo && redirectTo !== pathname) {
        url.pathname = redirectTo;
        url.searchParams.delete('redirectTo');
        return NextResponse.redirect(url);
      }

      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // Check admin access
    const userRole = session.user.user_metadata?.role;
    if (adminRoutes.some((route) => pathname.startsWith(route)) && userRole !== 'admin') {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // User is not authenticated
  if (!session?.user) {
    // Redirect unauthenticated users from protected routes to signin
    if (
      protectedRoutes.some((route) => pathname.startsWith(route)) ||
      adminRoutes.some((route) => pathname.startsWith(route))
    ) {
      url.pathname = '/auth/signin';
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }

    // Allow access to public routes and auth routes
    if (publicRoutes.includes(pathname) || authRoutes.includes(pathname)) {
      return supabaseResponse;
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (optional - comment out if you want to protect API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
