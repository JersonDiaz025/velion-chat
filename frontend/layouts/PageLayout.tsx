import PageHeader from '@/components/shared/PageHeader';
import { PageLayoutProps } from '@/types/page-layout.types';

const PageLayout = ({ children, ...headerProps }: PageLayoutProps) => {
  return (
    <div className='flex-col px-24 py-6 h-screen overflow-hidden'>
      <PageHeader {...headerProps} />
      <main className='h-full py-4 mt-6 border-t border-outline-variant/10 overflow-y-auto custom-scrollbar hide-scrollbar'>{children}</main>
    </div>
  );
};

export default PageLayout;
