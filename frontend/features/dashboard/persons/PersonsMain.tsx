'use client';

import Link from 'next/link';
import PageLayout from '@/layouts/PageLayout';
import personPageData from '@/data/pages/contacts.json';
import { Filter, MoreVertical } from 'lucide-react';
import UserCard from '@/components/ui/UserCard';
import { VIEW_MODE } from '@/constants/view.constants';

const PersonsMain = () => {
  const { title, subtitle, searchPlaceholder } = personPageData;

  const USERS_DATA = Array.from({ length: 90 }, (_, i) => {
    const id = `user-id-${i + 1}`;
    const domains = ['monolith.studio', 'velion.app', 'daimondluxury.com'];
    const names = ['Julianne', 'Marcus', 'Elena', 'Dorian', 'Sarah', 'Jerson', 'Victor', 'Lucas'];
    const lastNames = ['Moore', 'Holloway', 'Rossi', 'Gray', 'Jenkins', 'Cuevas', 'Diaz'];

    // Paleta de colores para los avatares (basada en tu ejemplo #c0392b)
    const colors = ['#c0392b', '#2980b9', '#27ae60', '#f39c12', '#8e44ad', '#2c3e50', '#16a085'];

    const firstName = names[i % names.length];
    const lastName = lastNames[i % lastNames.length];
    const fullName = `${firstName} ${lastName}`;

    return {
      id,
      name: fullName,
      username: `${firstName.toLowerCase()}${i + 1}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@${domains[i % domains.length]}`,
      initials: `${firstName.charAt(0)}${lastName.charAt(0)}`,
      avatarColor: colors[i % colors.length],
      memberSince: 'abril de 2026',
      isFavorite: i % 5 === 0,
      // Mantenemos avatarUrl por si decides usarlo en el futuro,
      // aunque ahora uses initials/color
      avatarUrl: `https://i.pravatar.cc/150?u=velion-${i + 1}`,
    };
  });
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
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {USERS_DATA.map((user) => (
          <UserCard
            key={user.id}
            profile={user}
            viewMode={VIEW_MODE.GRID}
            isOnline={false}
            avatarClass={{
              style: 'ring-4 ring-surface-container-high',
              size: 'lg',
            }}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default PersonsMain;
