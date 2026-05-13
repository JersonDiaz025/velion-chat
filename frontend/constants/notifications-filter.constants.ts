import { NotificationType } from '@/constants/types.constants';

export type NotificationTypeFilter = NotificationType | 'ALL';

export const NOTIFICATION_FILTER_OPTIONS: { value: NotificationTypeFilter; label: string }[] = [
    { value: 'ALL', label: 'Todas' },
    { value: NotificationType.FRIEND_REQUEST, label: 'Solicitudes de amistad' },
    { value: NotificationType.FRIEND_ACCEPTED, label: 'Amistades aceptadas' },
    { value: NotificationType.REJECTED, label: 'Solicitudes rechazadas' },
    { value: NotificationType.NEW_MESSAGE, label: 'Mensajes nuevos' },
    { value: NotificationType.CHAT_INVITE, label: 'Invitaciones al chat' },
    { value: NotificationType.LOGIN_DETECTION, label: 'Alertas de inicio de sesión' },
    { value: NotificationType.SYSTEM_ANNOUNCEMENT, label: 'Anuncios del sistema' },
    { value: NotificationType.USER_JOINED, label: 'Usuarios unidos' },
];

export function getNotificationFilterLabel(filter: NotificationTypeFilter): string {
    return NOTIFICATION_FILTER_OPTIONS.find((o) => o.value === filter)?.label ?? 'Todas';
}
