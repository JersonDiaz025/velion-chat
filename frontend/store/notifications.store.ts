import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationState } from '@/types/notifications.types';
import { showSmartToast } from '@/utils/notification-dispatcher.utils';
import { NotificationType } from '@/constants/types.constants';

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            notifications: [],
            unreadCount: 0,

            receiveNewNotification: (notification, isNotificationsFocus) => {
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                    unreadCount:
                        notification.type !== NotificationType.NEW_MESSAGE
                            ? state.unreadCount + 1
                            : state.unreadCount,
                }));

                if (isNotificationsFocus) {
                    showSmartToast(notification);
                }
            },

            setNotifications: (notifications) =>
                set({
                    notifications,
                    unreadCount: notifications?.filter((n) => !n.read).length,
                }),

            addNotification: (notification) =>
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
                })),

            setUnreadCount: (count) => set({ unreadCount: count }),

            markAsReadOptimistic: (id) => {
                const { notifications, unreadCount } = get();
                const notification = notifications.find((n) => n.id === id);

                if (notification && !notification.read) {
                    set({
                        notifications: notifications.map((n) =>
                            n.id === id ? { ...n, read: true } : n
                        ),
                        unreadCount: Math.max(0, unreadCount - 1),
                    });
                }
            },

            markAsReadFailure: (id) => {
                const { notifications } = get();
                const next = notifications.map((n) => (n.id === id ? { ...n, read: false } : n));
                set({
                    notifications: next,
                    unreadCount: next.filter((n) => !n.read).length,
                });
            },

            // Optimistic Update para todas
            markAllAsReadOptimistic: () => {
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, read: true })),
                    unreadCount: 0,
                }));
            },
        }),
        { name: 'velion-notifications' }
    )
);
