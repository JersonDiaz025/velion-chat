'use client';

import { Bell } from 'lucide-react';
import PageLayout from '@/layouts/PageLayout';
import { Button } from '@/components/ui/Button';
import NotResult from '@/components/ui/NotResult';
import NotificationItem from './NotificationItem';
import Pagination from '@/components/shared/Pagination';
import NotificationActions from './NotificationActions';
import notificarionPageData from '@/data/pages/notifi.json';
import { useNotificationsPage } from '@/hooks/notifications/use-notifications-page';
import { NotificationProps, NotificationsResponse } from '@/types/notifications.types';

const MainNotifications = ({ data, currentPage, meta, searchQuery }: NotificationsResponse) => {
    const { title, subtitle, searchPlaceholder } = notificarionPageData;

    const {
        value,
        isPending,
        typeFilter,
        setTypeFilter,
        clearTypeFilter,
        activeTypeFilterLabel,
        displayedNotifications,
        filteredNotifications,
        handleMarkAll,
        updateFilters,
        navigateToHref,
        clearQueryOnly,
        handleMarkAsRead,
        getNotificationConfig,
    } = useNotificationsPage({ data });

    const hasPageItems = displayedNotifications.length > 0;
    const hasFilteredItems = filteredNotifications.length > 0;
    const showFilterEmpty = hasPageItems && !hasFilteredItems && typeFilter !== 'ALL';

    return (
        <PageLayout
            value={value}
            title={title}
            subtitle={subtitle}
            searchPlaceholder={searchPlaceholder}
            onSearch={(val) => updateFilters(1, val)}
            customRightIcons={
                <NotificationActions
                    typeFilter={typeFilter}
                    onTypeFilterChange={setTypeFilter}
                    onMarkAllRead={handleMarkAll}
                />
            }
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

                {activeTypeFilterLabel ? (
                    <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3'>
                        <p className='text-sm text-on-surface'>
                            <span className='text-secondary'>Filtrando por:</span>{' '}
                            <span className='font-semibold text-on-surface'>
                                {activeTypeFilterLabel}
                            </span>
                            <span className='ml-1 text-xs text-secondary'>(página actual)</span>
                        </p>
                        <Button
                            type='button'
                            onClick={clearTypeFilter}
                            className='shrink-0 text-xs font-bold uppercase tracking-wide text-primary hover:underline'
                        >
                            Ver todas
                        </Button>
                    </div>
                ) : null}

                {hasFilteredItems ? (
                    filteredNotifications.map((notification: NotificationProps) => (
                        <NotificationItem
                            key={notification.id}
                            onClick={navigateToHref}
                            notification={notification}
                            onMarkAsRead={handleMarkAsRead}
                            onAcceptFriend={(userId) => userId}
                            onRejectFriend={(userId) => userId}
                            config={getNotificationConfig(notification)}
                        />
                    ))
                ) : showFilterEmpty ? (
                    <div className='flex flex-col items-center py-20 gap-8 justify-center text-center text-secondary'>
                        <NotResult
                            text='No hay notificaciones de este tipo.'
                            icon={<Bell size={52} className='mb-4' />}
                            className='text-secondary'
                        />
                        <Button
                            type='button'
                            onClick={clearTypeFilter}
                            className='text-sm font-bold  mt-0 cursor-pointer text-primary hover:underline'
                        >
                            Quitar filtro
                        </Button>
                    </div>
                ) : (
                    <>
                        <NotResult
                            text='No hay notificaciones por el momento.'
                            icon={<Bell size={52} className='mb-4' />}
                            className='text-secondary'
                        />
                        {searchQuery ? (
                            <Button
                                type='button'
                                onClick={clearQueryOnly}
                                className='text-sm font-bold mt-0 cursor-pointer text-primary hover:underline'
                            >
                                Quitar búsqueda
                            </Button>
                        ) : typeFilter !== 'ALL' ? (
                            <Button
                                type='button'
                                onClick={clearTypeFilter}
                                className='text-sm font-bold mt-0 cursor-pointer text-primary hover:underline'
                            >
                                Quitar filtro
                            </Button>
                        ) : null}
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export default MainNotifications;
