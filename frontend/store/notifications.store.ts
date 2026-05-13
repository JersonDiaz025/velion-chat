import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationState } from '@/types/notifications.types';
import { showSmartToast } from '@/utils/notification-dispatcher.utils';

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set) => ({
            notifications: [],
            unreadCount: 0,

            receiveNewNotification: (notification, isNotificationsFocus) => {
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
                }));

                // 2. Aquí podrías meter lógica condicional
                // Ej: Si el usuario está en la página de notificaciones, no mostrar toast
                if (isNotificationsFocus) {
                    showSmartToast(notification);
                }
            },

            setNotifications: (notifications) =>
                set({
                    notifications,
                    unreadCount: notifications.filter((n) => !n.read).length,
                }),

            addNotification: (notification) =>
                set((state) => ({
                    notifications: [notification, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
                })),

            markAsRead: (id) =>
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, read: true } : n
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1),
                })),

            setUnreadCount: (count) => set({ unreadCount: count }),
        }),
        { name: 'velion-notifications' }
    )
);
