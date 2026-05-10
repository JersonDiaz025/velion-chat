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

    return (
        <aside className='flex h-full w-fit flex-col items-center bg-black py-6'>
            <Link className='mb-10 flex flex-col items-center gap-2' href={ROUTES.MESSAGES.ROOT}>
                <Image src='/favicon.ico' alt='Velion logo' width={40} height={32} priority />
            </Link>
            <nav className='flex flex-1 flex-col gap-8'>
                {sidebarLinks?.map((item) => (
                    <SidebarItem key={item.href} {...item} />
                ))}
            </nav>
            <Link href={ROUTES.PROFILE.ROOT}>
                <Avatar
                    initials={user?.initials ?? ''}
                    color={user?.avatarColor ?? ''}
                    isOnline={user?.status}
                    showStatus={user?.status}
                    className='ring-4 ring-surface-container-high'
                />
            </Link>
        </aside>
    );
}
