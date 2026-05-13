import Loader from '@/components/ui/Loader';
import PageHeader from '@/components/shared/PageHeader';
import { PageLayoutProps } from '@/types/page-layout.types';

const PageLayout = ({ children, ...headerProps }: PageLayoutProps) => {
    return (
        <div className='flex flex-col h-full px-24 py-6 overflow-hidden'>
            <PageHeader {...headerProps} />

            {!headerProps?.isLoading ? (
                <main className='flex-1 min-h-0 py-4 mt-6 border-t border-outline-variant/10 overflow-y-auto custom-scrollbar hide-scrollbar'>
                    {children}
                </main>
            ) : (
                <Loader text={headerProps?.loadingText} />
            )}
        </div>
    );
};

export default PageLayout;
