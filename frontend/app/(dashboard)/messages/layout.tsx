import { Suspense } from 'react';
import { chatService } from '@/services/chat/chat.service';
import PageTransition from '@/components/shared/PageTransition';
import ChatListMain from '@/features/dashboard/chat/ChatListMain';

export default async function MessagesLayout({ children }: { children: React.ReactNode }) {
    const dataChats = await chatService.getChats();

    return (
        <div className='flex h-screen overflow-hidden'>
            <Suspense fallback={<div className='flex-1 bg-background' />}>
                <PageTransition className='h-full'>
                    <ChatListMain data={dataChats} />
                </PageTransition>
                <section className='flex-1 flex flex-col bg-surface h-full overflow-hidden'>
                    {children}
                </section>
            </Suspense>
        </div>
    );
}
