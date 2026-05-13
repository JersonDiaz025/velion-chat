// types/notifications.types.ts
export interface NotificationProps {
    id: string;
    title: string;
    body: string;
    type: 'SYSTEM' | 'MESSAGE' | 'FRIEND_REQUEST';
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

export interface Config {
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
    actionRoute?: (meta: any) => string;
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

export interface NotificationState {
    notifications: NotificationProps[];
    unreadCount: number;
    setNotifications: (notifications: NotificationProps[]) => void;
    addNotification: (notification: NotificationProps) => void;
    markAsRead: (id: string) => void;
    setUnreadCount: (count: number) => void;
    receiveNewNotification: (
        notifications: NotificationProps,
        isNotificationsFocus: boolean
    ) => void;
}
