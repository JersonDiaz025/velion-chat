'use client';

import React from 'react';
import notificarionPageData from '@/data/pages/notifi.json';
import Avatar from '@/components/ui/Avatar';
import Title from '@/components/shared/Title';
import PageLayout from '@/layouts/PageLayout';
import { Filter, MoreVertical } from 'lucide-react';

// Tipos de notificación para manejar estilos dinámicos
type NotificationType = 'message' | 'friend_request' | 'mention' | 'security' | 'system';

interface NotificationItemProps {
  type: NotificationType;
  user?: { name: string; avatar?: string };
  content: React.ReactNode;
  time: string;
  isUnread?: boolean;
  actions?: React.ReactNode;
}

const NotificationItem = ({
  type,
  user,
  content,
  time,
  isUnread,
  actions,
}: NotificationItemProps) => {
  // Mapeo de iconos y colores de fondo para el círculo pequeño
  const config = {
    message: { icon: 'chat', color: 'bg-primary', iconColor: 'text-on-primary' },
    friend_request: {
      icon: 'person_add',
      color: 'bg-primary-container',
      iconColor: 'text-on-primary-container',
    },
    mention: {
      icon: 'alternate_email',
      color: 'bg-surface-container-highest',
      iconColor: 'text-primary',
    },
    security: { icon: 'security', color: 'bg-[#1b2027]', iconColor: 'text-error' },
    system: { icon: 'cloud_done', color: 'bg-[#1b2027]', iconColor: 'text-primary' },
  };

  const style = config[type];

  return (
    <div
      className={`group relative flex gap-6 p-6 rounded-xl transition-all cursor-pointer
            ${isUnread ? 'bg-surface-container-low' : 'bg-surface-container-low/50 opacity-80'}
            hover:bg-surface-container hover:opacity-100 border border-transparent hover:border-outline-variant/10`}
    >
      <div className='relative shrink-0'>
        {user ? (
          <Avatar
            size='md'
            initials='JC'
            color=''
            isOnline
            showStatus
            className='ring-4 ring-surface-container-high'
          />
        ) : (
          // <Avatar name={user.name} size="md" />
          <div className='w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center'>
            <span className='material-symbols-outlined text-primary'>{style.icon}</span>
          </div>
        )}

        {/* Badge pequeño del tipo de notificación */}
        {user && (
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 ${style.color} rounded-full flex items-center justify-center border-4 border-surface-container-low`}
          >
            <span className='material-symbols-outlined text-[10px] font-bold'>{style.icon}</span>
          </div>
        )}
      </div>

      <div className='flex-1 space-y-1'>
        <div className='flex justify-between items-start'>
          <div className='text-sm'>{content}</div>
          <span className='text-[10px] font-medium text-secondary whitespace-nowrap ml-4'>
            {time}
          </span>
        </div>
        {actions && <div className='mt-4'>{actions}</div>}
      </div>

      {isUnread && (
        <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
          <span className='w-2 h-2 bg-primary rounded-full block'></span>
        </div>
      )}
    </div>
  );
};

const MainNotifications = () => {
  const { title, subtitle, searchPlaceholder } = notificarionPageData;

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      //   searchPlaceholder={searchPlaceholder}
      //   onSearch={(val) => console.log('Buscando:', val)}
      customRightIcons={
        <div className='flex items-center gap-2'>
          <button className='p-2 text-secondary hover:bg-surface-container rounded-full transition-colors'>
            <Filter size={18} />
          </button>
        </div>
      }
    >
      <div className='flex flex-col gap-4 pr-3'>
        <NotificationItem
          type='message'
          isUnread
          user={{ name: 'Elias Thorne' }}
          time='2m ago'
          content={
            <h3 className='font-bold text-on-surface'>
              {/* Elias Thorne <span className='font-normal text-secondary ml-1'>sent a message</span> */}
              <p className='text-sm text-secondary line-clamp-1 italic mt-1 font-normal'>
                The blueprints for the facade are ready for your review...
              </p>
            </h3>
          }
        />
        <NotificationItem
          type='friend_request'
          isUnread
          user={{ name: 'Sienna Moore' }}
          time='45m ago'
          content={
            <div className='space-y-0.5'>
              <h3 className='font-bold text-on-surface'>Sienna Moore</h3>
              <p className='text-xs text-secondary'>Wants to join your architect network.</p>
            </div>
          }
          actions={
            <div className='flex gap-3'>
              <button className='px-6 py-2 bg-primary text-on-primary text-xs font-bold rounded-md hover:brightness-110 transition-all active:scale-95'>
                Accept
              </button>
              <button className='px-6 py-2 bg-surface-container-highest text-on-surface text-xs font-bold rounded-md hover:bg-surface-bright transition-all active:scale-95'>
                Decline
              </button>
            </div>
          }
        />

        <NotificationItem
          type='security'
          time='Yesterday, 11:04 PM'
          content={
            <div className='space-y-2'>
              <h3 className='font-bold text-on-surface'>New Login Detected</h3>
              <p className='text-xs text-secondary leading-relaxed font-normal'>
                A new login was recorded from a MacOS device in{' '}
                <span className='text-on-surface'>Berlin, Germany</span>.
              </p>
              <button className='text-[10px] font-bold text-primary uppercase tracking-wider hover:underline transition-all'>
                Secure Account
              </button>
            </div>
          }
        />

        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
        <NotificationItem
          type='system'
          time='Yesterday, 4:20 PM'
          content={
            <div className='space-y-1'>
              <h3 className='font-bold text-on-surface'>Backup Complete</h3>
              <p className='text-xs text-secondary font-normal'>
                Your structural archive (1.4 GB) has been successfully synchronized.
              </p>
            </div>
          }
        />
      </div>
    </PageLayout>
  );
};

export default MainNotifications;
