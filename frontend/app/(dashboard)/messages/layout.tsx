import ChatList from '@/components/shared/ChatList';
import PageTransition from '@/components/shared/PageTransition';

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full'>
      <PageTransition className='h-full'>
        <ChatList />
      </PageTransition>
      <section className='flex-1 bg-surface'>{children}</section>
    </div>
  );
}
