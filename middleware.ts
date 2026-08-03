// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/register', '/', '/api/auth'];

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If trying to access protected admin routes without token
  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access login/signup/register/home while already authenticated
  if ((pathname === '/login' || pathname === '/signup' || pathname === '/register' || pathname === '/') && token) {
    // Redirect authenticated users to admin dashboard (since / is the login page)
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/signup',
    '/register',
    '/'
  ],
};
