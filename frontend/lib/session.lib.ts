import { SESSION_COOKIE_NAME } from '@/constants/session.constants';
import { cookies } from 'next/headers';

export async function createSession(token: string) {
  const expiresInSeconds = Number(process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN) || 5;
  const duration = expiresInSeconds * 1000;
  const expiresAt = new Date(Date.now() + duration);

  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}
