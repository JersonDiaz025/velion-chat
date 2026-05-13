'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, MessageSquare, ShieldAlert, UserCheck, UserPlus, UserX } from 'lucide-react';
import {
    markAllNotificationsReadAction,
    markNotificationAsReadAction,
} from '@/app/actions/notifications/notifications-read-actions';
import { NotificationType } from '@/constants/types.constants';
import {
    getNotificationFilterLabel,
    type NotificationTypeFilter,
} from '@/constants/notifications-filter.constants';
import { useNotificationStore } from '@/store/notifications.store';
import {
    NotificationItemConfig,
    NotificationProps,
    NotificationsResponse,
} from '@/types/notifications.types';

export function useNotificationsPage({ data }: Pick<NotificationsResponse, 'data'>) {
    const router = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [typeFilter, setTypeFilter] = useState<NotificationTypeFilter>('ALL');

    const {
        setNotifications,
        markAsReadOptimistic,
        markAsReadFailure,
        markAllAsReadOptimistic,
        notifications: notificationsFromStore,
    } = useNotificationStore();

    const displayedNotifications = useMemo(
        () =>
            data.map((item) => {
                const fromStore = notificationsFromStore.find((n) => n.id === item.id);
                if (!fromStore) return item;
                return { ...item, read: fromStore.read };
            }),
        [data, notificationsFromStore]
    );

    const filteredNotifications = useMemo(() => {
        if (typeFilter === 'ALL') return displayedNotifications;
        return displayedNotifications.filter((n) => n.type === typeFilter);
    }, [displayedNotifications, typeFilter]);

    const activeTypeFilterLabel =
        typeFilter === 'ALL' ? null : getNotificationFilterLabel(typeFilter);

    useEffect(() => {
        if (data) {
            setNotifications(data);
        }
    }, [data, setNotifications]);

    const handleMarkAsRead = useCallback(
        async (id: string) => {
            const row = displayedNotifications.find((n) => n.id === id);
            if (!row || row.read) return;

            markAsReadOptimistic(id);
            try {
                await markNotificationAsReadAction(id);
                startTransition(() => {
                    router.refresh();
                });
            } catch (error) {
                console.error('Failed to sync read status', error);
                markAsReadFailure(id);
            }
        },
        [displayedNotifications, markAsReadFailure, markAsReadOptimistic, router]
    );

    const handleMarkAll = useCallback(async () => {
        const hasUnread = displayedNotifications.some((n) => !n.read);
        if (!hasUnread) return;

        markAllAsReadOptimistic();
        try {
            await markAllNotificationsReadAction();
            startTransition(() => {
                router.refresh();
            });
        } catch (error) {
            console.error('Failed to mark all as read', error);
            startTransition(() => {
                router.refresh();
            });
        }
    }, [displayedNotifications, markAllAsReadOptimistic, router]);

    const updateFilters = useCallback(
        (newPage: number, newQuery?: string) => {
            const params = new URLSearchParams();
            params.set('page', newPage.toString());
            if (newQuery) {
                setValue(newQuery.trim());
                params.set('q', newQuery);
            }

            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [pathname, router, value]
    );

    const clearQueryOnly = useCallback(() => {
        const params = new URLSearchParams(
            typeof window !== 'undefined' ? window.location.search : ''
        );
        if (value) setValue('');
        params.delete('q');
        const qs = params.toString();
        const href = qs ? `${pathname}?${qs}` : pathname;
        startTransition(() => {
            router.replace(href, { scroll: false });
        });
    }, [pathname, router, startTransition, value]);

    const getNotificationConfig = useCallback(
        (notification: NotificationProps): NotificationItemConfig => {
            const type = notification.type;
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
                        icon: <UserX size={18} />,
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
        },
        []
    );

    const navigateToHref = useCallback(
        (href: string) => {
            router.push(href);
        },
        [router]
    );

    const clearTypeFilter = useCallback(() => {
        setTypeFilter('ALL');
        if (value) setValue('');
    }, [value]);

    return {
        value,
        typeFilter,
        setTypeFilter,
        clearTypeFilter,
        activeTypeFilterLabel,
        displayedNotifications,
        filteredNotifications,
        handleMarkAsRead,
        handleMarkAll,
        updateFilters,
        clearQueryOnly,
        getNotificationConfig,
        navigateToHref,
        isPending,
    };
}
