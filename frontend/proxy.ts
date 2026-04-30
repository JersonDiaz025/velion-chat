import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_PREFIXES, PUBLIC_ROUTES, ROUTES } from './constants/routes.constants';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('session')?.value;

  const isAuthRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_PREFIXES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL(ROUTES.LOGIN, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    const homeUrl = new URL(ROUTES.MESSAGES.ROOT, req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
