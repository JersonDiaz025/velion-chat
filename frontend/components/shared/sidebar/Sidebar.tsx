'use client';

import Link from 'next/link';
import Image from 'next/image';
import SidebarItem from './SidebarItem';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/auth/use-auth';
import { sidebarLinks } from '@/data/sidebar-links';
import { ROUTES } from '@/constants/routes.constants';

export default function Sidebar() {
  const { user } = useAuth();

  console.log(user);

  return (
    <aside className='flex h-full w-fit flex-col items-center bg-black py-6'>
      <div className='mb-10 flex flex-col items-center gap-2'>
        <Image src='/favicon.ico' alt='Velion logo' width={40} height={32} priority />
      </div>
      <nav className='flex flex-1 flex-col gap-8'>
        {sidebarLinks?.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
      <Link href={ROUTES.PROFILE.ROOT}>
        <Avatar
          initials='JC'
          color=''
          isOnline
          showStatus
          className='ring-4 ring-surface-container-high'
        />
      </Link>
    </aside>
  );
}
