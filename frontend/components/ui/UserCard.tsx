import Avatar from './Avatar';
import Title from '../shared/Title';
import { ProfileCardProps } from '@/types/profile.types';
import { Calendar, Mail, ChevronRight } from 'lucide-react';
import { FriendRequestButton } from './FriendRequestButton';
import { formatedTime } from '@/utils/formated-date.utils';

export default function UserCard({
    handleClick,
    viewMode,
    profile,
    isOnline,
    previewMessage,
    previewDate,
    unreadCount = 0,
    showStatus = false,
    avatarClass,
}: ProfileCardProps) {
    const isList = viewMode === 'list';

    const formattedTime = formatedTime(previewDate || '');

    return (
        <div
            onClick={handleClick}
            className={`
        group relative cursor-pointer transition-all duration-300 border
        ${
            isList
                ? 'bg-surface-container-high/50 rounded-2xl p-3 flex items-center gap-4 hover:bg-surface-container-highest border-outline-variant/10 active:scale-[0.99] architectural-glow'
                : 'bg-surface-container rounded-3xl p-6 flex flex-col hover:bg-surface-container-high hover:-translate-y-1 border-transparent hover:border-outline-variant/20'
        }
      `}
        >
            {!isList && (
                <div className='absolute top-4 right-4 z-10'>
                    <FriendRequestButton targetUserId={profile?.id} />
                </div>
            )}

            <div className='relative shrink-0'>
                <Avatar
                    size={isList ? 'lg' : avatarClass?.size || 'xl'}
                    initials={profile.initials ?? ''}
                    color={profile.avatarColor ?? ''}
                    isOnline={isOnline}
                    showStatus={showStatus}
                    className={
                        isList
                            ? 'border-2 border-surface-container-highest shadow-sm'
                            : avatarClass?.style
                    }
                />
                {!isList && unreadCount > 0 && (
                    <div className='absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-black text-primary-container shadow-lg shadow-primary/20'>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                )}
            </div>

            <div className={`flex-grow min-w-0 ${isList ? '' : 'mt-5 space-y-3'}`}>
                <div className='flex items-center justify-between gap-2'>
                    <Title
                        text={profile.name}
                        className={`truncate font-bold ${isList ? 'text-[15px] text-[#e0e6f1] tracking-tight' : 'text-lg'}`}
                    />

                    {isList && previewDate && (
                        <span
                            className={`text-[10px] font-medium tracking-wider uppercase shrink-0 ${unreadCount > 0 ? 'text-primary' : 'text-secondary-dim'}`}
                        >
                            {formattedTime}
                        </span>
                    )}
                </div>

                {isList ? (
                    <div className='flex flex-col'>
                        <p
                            className={`text-sm truncate line-clamp-1 transition-colors ${unreadCount > 0 ? 'text-on-surface font-bold' : 'text-secondary-dim font-medium'}`}
                        >
                            {previewMessage || 'No hay mensajes recientes'}
                        </p>
                    </div>
                ) : (
                    <div className='space-y-1.5'>
                        {profile.memberSince && (
                            <div className='flex items-center gap-2 text-[13px]'>
                                <Calendar size={14} className='text-primary ' />
                                Miembro desde: {profile.memberSince}
                            </div>
                        )}
                        {profile.email && (
                            <div className='flex items-center gap-2 text-on-surface-variant group/mail'>
                                <Mail
                                    size={14}
                                    className='shrink-0 group-hover/mail:text-primary transition-colors'
                                />
                                <span className='text-[13px] truncate'>{profile?.email}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isList && (
                <div className='flex flex-col relative items-end gap-2 shrink-0'>
                    {unreadCount > 0 ? (
                        <div className='relative'>
                            <span className='absolute inset-0 animate-ping rounded-full bg-primary/40 opacity-75'></span>
                            <span className='relative inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] font-black text-white shadow-lg'>
                                {unreadCount > 99 ? '99+' : unreadCount}
                            </span>
                        </div>
                    ) : (
                        <ChevronRight
                            size={18}
                            className='text-secondary-dim/30 group-hover:text-primary group-hover:translate-x-1 transition-all'
                        />
                    )}
                </div>
            )}
        </div>
    );
}
