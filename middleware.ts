import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Retrieve the token using the secret
  // Ensure NEXTAUTH_SECRET is set in your environment variables
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the user is trying to access the root path ('/') and is not authenticated (no token)
  if (pathname === '/' && !token) {
    // Clone the URL and redirect to the sign-in page
    const signInUrl = req.nextUrl.clone();
    signInUrl.pathname = '/sign-in';
    console.log('Middleware: Redirecting unauthenticated user from / to /sign-in');
    return NextResponse.redirect(signInUrl);
  }

  // Optional: If the user is authenticated and tries to access the sign-in page, redirect them to the root
  if (pathname === '/sign-in' && token) {
    const rootUrl = req.nextUrl.clone();
    rootUrl.pathname = '/';
    console.log('Middleware: Redirecting authenticated user from /sign-in to /');
    return NextResponse.redirect(rootUrl);
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next();
}

// Configure the matcher to specify which paths this middleware should run on.
// We only need to check the root ('/') and the sign-in page ('/sign-in').
// Other paths like API routes or static files are ignored by default unless matched here.
export const config = {
  matcher: ['/', '/sign-in'],
}