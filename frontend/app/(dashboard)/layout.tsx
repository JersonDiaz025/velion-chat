import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Sidebar from '@/components/shared/sidebar/Sidebar';
import PageTransition from '@/components/shared/PageTransition';
import { SocketProvider } from '@/providers/socket.provider';
import { SESSION_COOKIE_NAME } from '@/constants/session.constants';

export async function SocketConfigurator({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    return <SocketProvider token={token}>{children}</SocketProvider>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex h-screen bg-background text-on-surface overflow-hidden'>
            <Sidebar />
            <Suspense fallback={<div className='flex-1 bg-background' />}>
                <SocketConfigurator>
                    <PageTransition className='flex-1'>{children}</PageTransition>
                </SocketConfigurator>
            </Suspense>
        </div>
    );
}
