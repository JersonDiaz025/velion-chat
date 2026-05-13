import { NotificationType } from '@/constants/types.constants';
import { Config, MetadataProps } from '@/types/notifications.types';

export const NOTIFICATION_MAP: Record<NotificationType, Config> = {
    [NotificationType.FRIEND_REQUEST]: {
        accent: 'bg-primary',
        actionLabel: 'Ver perfil',
        position: 'top-center',
        icon: '🤝',
        actionRoute: (meta: MetadataProps) => `/dashboard/u/${meta?.username}`,
    },
    [NotificationType.FRIEND_ACCEPTED]: {
        accent: 'bg-primary-dim',
        icon: '✅',
    },
    [NotificationType.REJECTED]: {
        accent: 'bg-error',
        icon: '❌',
    },
    [NotificationType.NEW_MESSAGE]: {
        accent: 'bg-primary',
        position: 'bottom-right',
        icon: '📩',
        actionLabel: 'Responder',
        actionRoute: (meta: MetadataProps) => `/dashboard/chat/${meta?.chatId}`,
    },
    [NotificationType.LOGIN_DETECTION]: {
        accent: 'bg-error-dim',
        duration: 8000,
        icon: '⚠️',
    },
    [NotificationType.USER_JOINED]: {
        accent: 'bg-outline-variant',
        icon: '🚀',
    },
    [NotificationType.SYSTEM_ANNOUNCEMENT]: {
        accent: 'bg-primary-container',
        duration: 10000,
        icon: '📢',
    },
    [NotificationType.CHAT_INVITE]: {
        accent: 'bg-primary-dim',
        actionLabel: 'Unirse',
        icon: '📩',
        actionRoute: (meta: MetadataProps) => `/dashboard/chat/${meta?.chatId}`,
    },
};
