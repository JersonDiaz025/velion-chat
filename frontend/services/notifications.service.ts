import { getApiServer } from '@/lib/api-server';
import { ROUTES } from '@/constants/routes.constants';
import { NotificationProps, NotificationsResponse } from '@/types/notifications.types';

export const notificationsService = {
    /**
     *
     * Fetch paginated notifications for the current user
     * @param page - Page number (default: 1)
     * @param limit - Items per page (default: 10)
     * @returns Paginated notifications response
     */

    getNotifications: async (
        page: number = 1,
        limit: number = 10,
        search: string = ''
    ): Promise<NotificationsResponse> => {
        const apiServer = await getApiServer();
        const resolvedPage = Math.max(1, Math.floor(page));

        try {
            const response = await apiServer.get<NotificationsResponse>(ROUTES.NOTIFICATIONS.ROOT, {
                params: {
                    page: resolvedPage,
                    limit: Math.max(1, Math.floor(limit)),
                    ...(search && { q: search }),
                },
            });
            return {
                ...response,
                currentPage: response.currentPage ?? resolvedPage,
                searchQuery: response.searchQuery ?? (search || undefined),
            };
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return {
                data: [],
                currentPage: resolvedPage,
                searchQuery: search || undefined,
                meta: {
                    total: 0,
                    page: resolvedPage,
                    lastPage: 1,
                    canNavigate: false,
                },
            };
        }
    },

    /**
     * Mark a notification as read
     * @param notificationId - ID of the notification to mark as read
     * @returns Updated notification object
     */
    markAsRead: async (notificationId: string): Promise<NotificationProps> => {
        const apiServer = await getApiServer();
        try {
            return await apiServer.patch<NotificationProps>(
                ROUTES.NOTIFICATIONS.MARK_READ(notificationId)
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw new Error('Failed to mark notification as read');
        }
    },

    markAllAsRead: async (): Promise<{ count: number }> => {
        const apiServer = await getApiServer();
        try {
            return await apiServer.patch<{ count: number }>(ROUTES.NOTIFICATIONS.MARK_ALL_READ);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw new Error('Failed to mark all notifications as read');
        }
    },
};
