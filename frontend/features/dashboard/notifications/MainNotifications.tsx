'use client';

import React, { useEffect, useTransition } from 'react';
import notificarionPageData from '@/data/pages/notifi.json';
import { useRouter, usePathname } from 'next/navigation';
import PageLayout from '@/layouts/PageLayout';
import {
    Bell,
    CheckCheck,
    Filter,
    MessageSquare,
    MoreHorizontal,
    MoreVertical,
    ShieldAlert,
    SortDesc,
    Trash2,
    UserCheck,
    UserPlus,
    UserX,
} from 'lucide-react';
import { NotificationProps, NotificationsResponse } from '@/types/notifications.types';
import NotificationItem from './NotificationItem';
import { NotificationType } from '@/constants/types.constants';
import Pagination from '@/components/shared/Pagination';
import NotificationActions from './NotificationActions';
import { useNotificationStore } from '@/store/notifications.store';

const MainNotifications = ({ data, currentPage, meta, searchQuery }: NotificationsResponse) => {
    const { title, subtitle, searchPlaceholder } = notificarionPageData;

    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const { setNotifications, notifications } = useNotificationStore();

    // 2. HIDRATACIÓN: Cuando el Server Component nos pasa 'data',
    // actualizamos el store global.
    useEffect(() => {
        if (data) {
            setNotifications(data);
        }
    }, [data, setNotifications]);

    // Función para actualizar los filtros en la URL
    const updateFilters = (newPage: number, newQuery?: string) => {
        const params = new URLSearchParams();
        params.set('page', newPage.toString());
        if (newQuery) params.set('q', newQuery);

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const getNotificationConfig = (notification: NotificationProps) => {
        const type = notification.type as NotificationType;
        const name = notification?.metadata?.name ?? notification?.metadata?.username;

        switch (type) {
            case NotificationType.USER_JOINED:
                return {
                    icon: <UserPlus size={18} />,
                    color: 'bg-blue-500/10',
                    iconColor: 'text-blue-500',
                    href: `persons?search=${name}`,
                    category: 'system' as const,
                };
            case NotificationType.FRIEND_REQUEST:
                return {
                    icon: <UserCheck size={18} />,
                    color: 'bg-primary/10',
                    iconColor: 'text-primary',
                    href: `persons?search=${name}`,
                    category: 'friend_request' as const,
                };

            case NotificationType.REJECTED:
                return {
                    icon: <UserX size={18} />, // Icono de Lucide para rechazo
                    color: 'bg-error/10',
                    iconColor: 'text-error',
                    href: `persons?search=${name}`,
                    category: 'system' as const,
                };
            case NotificationType.NEW_MESSAGE:
                return {
                    icon: <MessageSquare size={18} />,
                    color: 'bg-green-500/10',
                    iconColor: 'text-green-500',
                    href: `/messages/${notification?.metadata?.chatId}`,
                    category: 'message' as const,
                };
            case NotificationType.LOGIN_DETECTION:
                return {
                    icon: <ShieldAlert size={18} />,
                    color: 'bg-error/10',
                    iconColor: 'text-error',
                    href: '/settings/security',
                    category: 'security' as const,
                };
            default:
                return {
                    icon: <Bell size={18} />,
                    color: 'bg-surface-container-highest',
                    iconColor: 'text-primary',
                    href: '#',
                    category: 'system' as const,
                };
        }
    };

    return (
        <PageLayout
            title={title}
            subtitle={subtitle}
            searchPlaceholder={searchPlaceholder}
            onSearch={(val) => updateFilters(1, val)}
            customRightIcons={<NotificationActions />}
        >
            <div className={`flex flex-col gap-4 pr-3 ${isPending ? 'opacity-50' : ''}`}>
                <Pagination
                    canNavigate={meta.canNavigate}
                    currentPage={currentPage}
                    totalPages={meta.lastPage}
                    onPageChange={(page) => updateFilters(page, searchQuery)}
                    isDisabled={isPending}
                    showIconsOnly={true}
                    className='justify-end'
                />
                {notifications?.length > 0 ? (
                    notifications?.map((notification: NotificationProps) => {
                        // const config = getNotificationConfig(notification);
                        return (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                config={getNotificationConfig(notification)}
                                onClick={(href) => router.push(href)}
                                // onAcceptFriend={(userId) => handleAccept(userId)}
                                // onRejectFriend={(userId) => handleReject(userId)}
                                onAcceptFriend={(userId) => userId}
                                onRejectFriend={(userId) => userId}
                            />
                        );
                    })
                ) : (
                    <div className='flex flex-col items-center justify-center py-20 text-secondary'>
                        <Bell size={48} className='opacity-10 mb-4' />
                        <p>No hay notificaciones por el momento.</p>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default MainNotifications;
