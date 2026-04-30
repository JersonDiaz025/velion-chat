import { Calendar, Mail, Star } from 'lucide-react';
import Image from 'next/image';
import Avatar from './Avatar';
import { Button } from './Button';
import { ViewModeProps } from '@/types/view-mode.types';
import Title from '../shared/Title';
import { AvatarSize } from '@/types/avatar.types';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarColor: string;
  initials: string;
  memberSince?: string;
  role?: string; // Por si viene en la data, de lo contrario usamos uno por defecto
}

interface ProfileCardProps {
  profile: UserProfile;
  isOnline?: boolean;
  showStatus?: boolean;
  avatarClass?: {
    style: string;
    size: AvatarSize;
  };
  viewMode: ViewModeProps['GRID'] | ViewModeProps['LIST'];
}

export default function UserCard({
  viewMode,
  profile,
  isOnline,
  showStatus = false,
  avatarClass = {
    style: 'ring-4 ring-surface-container-low shadow-lg',
    size: 'xl',
  },
}: ProfileCardProps) {
  return (
    <div className='group relative overflow-hidden bg-surface-container rounded-xl p-6 transition-all duration-300 hover:bg-surface-container-high hover:-translate-y-1 border border-transparent hover:border-outline-variant/10'>
      <Avatar
        size={avatarClass?.size}
        initials={profile.initials}
        color={profile.avatarColor}
        isOnline={isOnline}
        showStatus={showStatus}
        className={avatarClass.style}
      />

      {/* Información del perfil */}
      <div className='space-y-2 mt-4'>
        <Title text={profile.name} />
        {profile.memberSince && (
          <div className='flex items-center gap-1.5 text-on-surface-variant/60 tracking-wider font-semibold'>
            <Calendar size={14} />
            <Title text={`Se unió en: ${profile.memberSince} `} className='text-[12px]' />
          </div>
        )}
        {profile?.email && (
          <div className='flex items-start gap-2 text-on-surface-variant group/mail min-w-0'>
            <Mail
              size={14}
              className='mt-1 shrink-0 group-hover/mail:text-primary transition-colors'
            />
            <Title
              text={profile.email}
              className='min-w-0 wrap-anywhere whitespace-normal text-sm'
            />
          </div>
        )}
      </div>
    </div>
  );
}
