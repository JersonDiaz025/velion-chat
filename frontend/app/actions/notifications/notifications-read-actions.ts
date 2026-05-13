'use server';

import { revalidatePath } from 'next/cache';
import { notificationsService } from '@/services/notifications.service';
import { ROUTES } from '@/constants/routes.constants';

export async function markNotificationAsReadAction(notificationId: string): Promise<void> {
    await notificationsService.markAsRead(notificationId);
    revalidatePath(ROUTES.NOTIFICATIONS.ROOT);
}

export async function markAllNotificationsReadAction(): Promise<void> {
    await notificationsService.markAllAsRead();
    revalidatePath(ROUTES.NOTIFICATIONS.ROOT);
}
