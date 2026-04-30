import { Input } from '../ui/Input';
import { PageHeaderProps } from '@/types/page-header.types';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { FORM_TYPES } from '@/constants/form-types.constants';
import Title from './Title';

const PageHeader = ({
  title,
  subtitle,
  actions,
  searchPlaceholder,
  onSearch,
  customRightIcons,
}: PageHeaderProps) => {
  return (
    <header className='top-0 right-0 w-full h-20 z-10  backdrop-blur-md flex items-center justify-between'>
      <div className='flex gap-1 flex-col'>
        <Title text={title} as='h1' className='text-2xl font-bold tracking-tight text-on-surface' />
        {subtitle && (
          <Title
            as='p'
            text={subtitle}
            className='text-sm text-secondary tracking-[0.2em] mt-0.5 font-medium'
          />
        )}
      </div>

      <div className='flex items-center gap-6 flex-1 justify-end'>
        {searchPlaceholder && (
          <div className='relative group w-full max-w-1/2'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4 transition-colors group-focus-within:text-primary' />
            <Input
              type={FORM_TYPES.TEXT}
              className='bg-surface-container-low border-none rounded-full py-2 pl-10 pr-6 text-sm w-full focus:ring-1 focus:ring-primary/20 placeholder-secondary transition-all text-on-surface'
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}

        <div className='flex items-center gap-2'>
          {actions}
          {customRightIcons && customRightIcons}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
