import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authPages = ['/auth'];
  const protectedPages = ['/profile', '/admin'];
  const path = request.nextUrl.pathname;

  // Get auth token from cookie
  const token = request.cookies.get('auth-token');

  // Check if user is admin for admin pages
  const isAdmin = request.cookies.get('is-admin')?.value === 'true';

  // Redirect authenticated users away from auth pages
  if (authPages.some(page => path.startsWith(page)) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (protectedPages.some(page => path.startsWith(page)) && !token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Redirect non-admin users away from admin pages
  if (path.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/profile/:path*', '/admin/:path*'],
};