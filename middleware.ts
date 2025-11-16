import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  // Allow access to admin routes
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to the coming soon page itself
  if (pathname === '/coming-soon') {
    return NextResponse.next();
  }

  // Redirect all other routes to coming soon
  return NextResponse.redirect(new URL('/coming-soon', request.url));
}