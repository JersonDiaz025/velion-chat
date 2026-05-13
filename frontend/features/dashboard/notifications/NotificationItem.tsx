import React from 'react';
import { ArrowRight } from 'lucide-react'; // Solo para el indicador de detalles
import { formatedTime } from '@/utils/formated-date.utils';
import Avatar from '@/components/ui/Avatar';
import { NotificationItemConfig, NotificationProps } from '@/types/notifications.types';
import { NotificationType } from '@/constants/types.constants';
import Title from '@/components/shared/Title';

interface NotificationItemProps {
    notification: NotificationProps;
    config: NotificationItemConfig;
    onClick: (href: string) => void;
    /** Marca como leída al abrir / pulsar la fila (solo si aún no está leída). */
    onMarkAsRead?: (id: string) => void | Promise<void>;
    onAcceptFriend?: (id: string) => void;
    onRejectFriend?: (id: string) => void;
}

const NotificationItem = ({
    notification,
    config,
    onClick,
    onMarkAsRead,
    onAcceptFriend,
    onRejectFriend,
}: NotificationItemProps) => {
    const isUnread = !notification.read;
    const { metadata, type } = notification;

    const renderActions = () => {
        if (type === NotificationType.FRIEND_REQUEST && isUnread) {
            return (
                <div className='flex gap-2 mt-3' onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onAcceptFriend?.(metadata?.userId ?? '')}
                        className='px-4 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:brightness-110 transition-all'
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={() => onRejectFriend?.(metadata?.userId ?? '')}
                        className='px-4 py-1.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded-lg hover:bg-error/10 hover:text-error transition-all'
                    >
                        Rechazar
                    </button>
                </div>
            );
        }
        return null;
    };

    const handleRowClick = () => {
        if (isUnread) {
            void onMarkAsRead?.(notification.id);
        }
        onClick(config.href);
    };

    return (
        <div
            onClick={handleRowClick}
            className={`group flex gap-4 p-4 rounded-2xl transition-all cursor-pointer border relative
            ${
                isUnread
                    ? 'bg-surface-container-low border-primary/20 shadow-md shadow-primary/5'
                    : 'bg-transparent border-transparent opacity-80 hover:opacity-100'
            }
            hover:bg-surface-container-high hover:border-outline-variant/30`}
        >
            <div className='relative shrink-0'>
                <div
                    className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center`}
                >
                    <span className={`${config.iconColor}`}>{config.icon}</span>
                </div>
            </div>

            <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-start gap-2'>
                    <div className='space-y-2'>
                        <Title
                            text={notification.title}
                            className='text-md font-bold leading-tight text-on-surface'
                        />

                        <Title
                            text={notification.body}
                            className='text-sm text-foreground'
                        />
                    </div>
                    <span className='text-[10px] font-bold uppercase tracking-wider whitespace-nowrap'>
                        {formatedTime(notification.createdAt)}
                    </span>
                </div>

                {renderActions()}

                <div className='flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span className='text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1'>
                        Explorar <ArrowRight size={12} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
