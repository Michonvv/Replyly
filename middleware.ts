import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    console.error('NEXTAUTH_SECRET is not set')
    return NextResponse.next()
  }

  const token = await getToken({ req: request, secret })
  
  console.log('Session token:', token ? 'exists' : 'does not exist') // For debugging

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register']

  // Get the current path
  const path = request.nextUrl.pathname

  if (!token && !publicRoutes.includes(path)) {
    console.log('Redirecting to home') // For debugging
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && path === '/') {
    console.log('Redirecting to dashboard') // For debugging
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  console.log('Proceeding to next middleware/page') // For debugging
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}