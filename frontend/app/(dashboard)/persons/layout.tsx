import PageTransition from '@/components/shared/PageTransition';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PageTransition className='h-full'>{children}</PageTransition>;
};

export default Layout;
