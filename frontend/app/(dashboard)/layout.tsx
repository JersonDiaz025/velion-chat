import Sidebar from '@/components/shared/sidebar/Sidebar';
import PageTransition from '@/components/shared/PageTransition';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-background text-on-surface overflow-hidden'>
      <Sidebar />
      <PageTransition className='flex-1'>{children}</PageTransition>
    </div>
  );
}
