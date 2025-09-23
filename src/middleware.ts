import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Get session
  const session = await auth()
  
  // Check if accessing protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Check admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
