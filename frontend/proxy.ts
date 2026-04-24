import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/routes.constants";

// 🔐 Rutas públicas (auth)
const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

// 🔒 Prefijos protegidos
const PROTECTED_PREFIXES = [
  ROUTES.MESSAGES.ROOT,
  ROUTES.PERSONS.ROOT,
  ROUTES.SETTINGS,
];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("session")?.value;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const isProtectedRoute = PROTECTED_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );

  // 🔴 1. No autenticado → intenta entrar a ruta protegida
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }

  // 🟢 2. Autenticado → intenta ir a login/register
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(ROUTES.MESSAGES.ROOT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
