'use server';

import { redirect } from 'next/navigation';
import { deleteSession } from '@/lib/session.lib';
import { ROUTES } from '@/constants/routes.constants';

export async function logout() {
  await deleteSession();
  redirect(ROUTES.LOGIN);
}
