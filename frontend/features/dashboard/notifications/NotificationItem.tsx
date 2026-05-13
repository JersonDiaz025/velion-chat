import React from 'react';
import { ArrowRight } from 'lucide-react'; // Solo para el indicador de detalles
import { formatedTime } from '@/utils/formated-date.utils';
import Avatar from '@/components/ui/Avatar';

interface NotificationItemProps {
    notification: any;
    config: any;
    onClick: (href: string) => void;
    onAcceptFriend?: (id: string) => void;
    onRejectFriend?: (id: string) => void;
}

const NotificationItem = ({
    notification,
    config,
    onClick,
    onAcceptFriend,
    onRejectFriend,
}: NotificationItemProps) => {
    const isUnread = !notification.read;
    const { metadata, type } = notification;

    const renderActions = () => {
        if (type === 'FRIEND_REQUEST' && isUnread) {
            return (
                <div className='flex gap-2 mt-3' onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => onAcceptFriend?.(metadata.userId)}
                        className='px-4 py-1.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:brightness-110 transition-all'
                    >
                        Aceptar
                    </button>
                    <button
                        onClick={() => onRejectFriend?.(metadata.userId)}
                        className='px-4 py-1.5 bg-surface-container-highest text-on-surface text-xs font-bold rounded-lg hover:bg-error/10 hover:text-error transition-all'
                    >
                        Rechazar
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            onClick={() => onClick(config.href)}
            className={`group flex gap-4 p-4 rounded-2xl transition-all cursor-pointer border relative
            ${
                isUnread
                    ? 'bg-surface-container-low border-primary/20 shadow-md shadow-primary/5'
                    : 'bg-transparent border-transparent opacity-80 hover:opacity-100'
            }
            hover:bg-surface-container-high hover:border-outline-variant/30`}
        >
            <div className='relative shrink-0'>
                {metadata?.initials || metadata?.name ? (
                    <Avatar
                        size='md'
                        initials={metadata.initials || metadata.name?.substring(0, 2)}
                        color='bg-primary/10 text-primary'
                        className={
                            isUnread
                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low'
                                : ''
                        }
                    />
                ) : (
                    <div
                        className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center`}
                    >
                        <span className={`${config.iconColor}`}>{config.icon}</span>
                    </div>
                )}
            </div>

            {/* Contenido Textual */}
            <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-start gap-2'>
                    <div className='space-y-0.5'>
                        <h3
                            className={`text-sm font-bold leading-tight ${isUnread ? 'text-on-surface' : 'text-on-surface/70'}`}
                        >
                            {notification.title}
                        </h3>
                        <p
                            className={`text-xs leading-relaxed ${isUnread ? 'text-secondary font-medium' : 'text-outline'}`}
                        >
                            {notification.body}
                        </p>
                    </div>
                    <span className='text-[10px] font-bold uppercase tracking-wider whitespace-nowrap'>
                        {formatedTime(notification.createdAt)}
                    </span>
                </div>

                {/* Render de Botones si aplica */}
                {renderActions()}

                {/* Footer del item */}
                <div className='flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <span className='text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1'>
                        Explorar <ArrowRight size={12} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
