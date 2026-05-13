// types/notifications.types.ts
import type { ReactNode } from 'react';
import type { NotificationType } from '@/constants/types.constants';
import { NotificationTypeFilter } from '@/constants/notifications-filter.constants';

export interface NotificationProps {
    id: string;
    title: string;
    body: string;
    type: NotificationType;
    metadata?: MetadataProps;
    read: boolean;
    createdAt: string;
}

export interface MetadataProps {
    initials: string;
    name: string;
    userId: string;
    chatId?: number;
    username: string;
}

/** Visual + behavior config for toast / smart notifications (`NOTIFICATION_MAP`). */
export interface NotificationToastConfig {
    accent: string;
    icon?: string;
    duration?: number;
    position?:
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right'
        | 'top-center'
        | 'bottom-center';
    actionLabel?: string;
    actionRoute?: (meta: MetadataProps | undefined) => string;
}

/** Row UI config for the notifications list (`NotificationItem`). */
export interface NotificationItemConfig {
    icon: ReactNode;
    color: string;
    iconColor: string;
    href: string;
    category: 'system' | 'friend_request' | 'message' | 'security';
}

export interface PageProps {
    searchParams: Promise<{ [key: string]: string | string | undefined }>;
}

export interface NotificationsResponse {
    data: NotificationProps[];
    currentPage: number;
    searchQuery?: string;
    meta: {
        total: number;
        page: number;
        canNavigate: boolean;
        lastPage: number;
    };
}

export interface NotificationActionsProps {
    onMarkAllRead?: () => void | Promise<void>;
    typeFilter: NotificationTypeFilter;
    onTypeFilterChange: (value: NotificationTypeFilter) => void;
}

export interface SmartNotificationToastProps {
    toastId: string;
    visible: boolean;
    notification: NotificationProps;
    config: NotificationToastConfig;
}

export interface NotificationState {
    notifications: NotificationProps[];
    unreadCount: number;
    setNotifications: (notifications: NotificationProps[]) => void;
    addNotification: (notification: NotificationProps) => void;
    markAsReadOptimistic: (id: string) => void;
    markAsReadFailure: (id: string) => void;
    setUnreadCount: (count: number) => void;
    markAllAsReadOptimistic: () => void;
    receiveNewNotification: (
        notification: NotificationProps,
        isNotificationsFocus: boolean
    ) => void;
}
