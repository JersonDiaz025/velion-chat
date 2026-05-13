import { PageProps } from '@/types/notifications.types';
import { notificationsService } from '@/services/notifications.service';
import MainNotifications from '@/features/dashboard/notifications/MainNotifications';

export default async function NotificationsPage({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;

    const page = Number(resolvedSearchParams?.page) || 1;
    const limit = Number(resolvedSearchParams?.limit) || 10;
    const search = resolvedSearchParams.q || '';

    const notifications = await notificationsService.getNotifications(page, limit, search);

    return (
        <MainNotifications
            data={notifications?.data}
            meta={notifications?.meta}
            currentPage={page}
            searchQuery={search}
        />
    );
}
