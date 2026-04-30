'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.constants';

export function useLogout() {
  const router = useRouter();

  return async () => {
    await fetch(ROUTES.LOGOUT, {
      method: 'POST',
    });

    router.replace(ROUTES.LOGIN);
    router.refresh();
  };
}
