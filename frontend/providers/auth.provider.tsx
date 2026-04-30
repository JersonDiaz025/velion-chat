'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { profileService } from '@/services/profile.service';
import { PUBLIC_ROUTES } from '@/constants/routes.constants';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return;
    }

    const bootstrap = async () => {
      if (user) return;

      try {
        const userData = await profileService.getFullProfile();
        console.log(userData)
        setUser(userData);
      } catch {
        setUser(null);
      }
    };

    bootstrap();
  }, [pathname, setUser]);

  return <>{children}</>;
}
