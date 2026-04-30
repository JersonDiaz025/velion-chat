'use client';

import PageLayout from '@/layouts/PageLayout';
import personStartPageData from '@/data/pages/contacts.json';
import { Filter, MoreVertical } from 'lucide-react';

const PersonStart = () => {
  const { searchPlaceholder, startsPersons } = personStartPageData;
  const { title, subtitle } = startsPersons;

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      searchPlaceholder={searchPlaceholder}
      onSearch={(val) => console.log('Buscando:', val)}
      customRightIcons={
        <div className='flex items-center gap-2'>
          <button className='p-2 text-secondary hover:bg-surface-container rounded-full transition-colors'>
            <Filter size={18} />
          </button>
          <button className='p-2 text-secondary hover:bg-surface-container rounded-full transition-colors'>
            <MoreVertical size={18} />
          </button>
        </div>
      }
    >
      <div className='flex flex-col space-y-1'>Favoritos</div>
    </PageLayout>
  );
};

export default PersonStart;
