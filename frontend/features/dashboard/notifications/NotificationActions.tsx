'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCheck, Filter, MoreHorizontal, Trash2 } from 'lucide-react';
import {
    NOTIFICATION_FILTER_OPTIONS,
    type NotificationTypeFilter,
} from '@/constants/notifications-filter.constants';
import { UI_PANEL_IDS } from '@/constants/ui-panel-ids.constants';
import { useUiPanelsStore } from '@/store/ui-panels.store';
import { NotificationActionsProps } from '@/types/notifications.types';

const NotificationActions = ({
    onMarkAllRead,
    typeFilter,
    onTypeFilterChange,
}: NotificationActionsProps) => {
    const filterRef = useRef<HTMLDivElement>(null);
    const actionRef = useRef<HTMLDivElement>(null);

    const filterOpen = useUiPanelsStore(
        (s) => s.panels[UI_PANEL_IDS.NOTIFICATIONS_FILTER] === true
    );
    const actionOpen = useUiPanelsStore(
        (s) => s.panels[UI_PANEL_IDS.NOTIFICATIONS_ACTIONS] === true
    );

    const toggleFilter = () =>
        useUiPanelsStore
            .getState()
            .togglePanelExclusive(UI_PANEL_IDS.NOTIFICATIONS_FILTER, [
                UI_PANEL_IDS.NOTIFICATIONS_ACTIONS,
            ]);

    const toggleAction = () =>
        useUiPanelsStore
            .getState()
            .togglePanelExclusive(UI_PANEL_IDS.NOTIFICATIONS_ACTIONS, [
                UI_PANEL_IDS.NOTIFICATIONS_FILTER,
            ]);

    useEffect(() => {
        if (!filterOpen && !actionOpen) return;

        const closeIfOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const inFilter = filterRef.current?.contains(target);
            const inAction = actionRef.current?.contains(target);
            if (!inFilter && !inAction) {
                useUiPanelsStore
                    .getState()
                    .closePanels([
                        UI_PANEL_IDS.NOTIFICATIONS_FILTER,
                        UI_PANEL_IDS.NOTIFICATIONS_ACTIONS,
                    ]);
            }
        };

        document.addEventListener('mousedown', closeIfOutside);
        return () => document.removeEventListener('mousedown', closeIfOutside);
    }, [filterOpen, actionOpen]);

    const selectFilter = (value: NotificationTypeFilter) => {
        onTypeFilterChange(value);
        useUiPanelsStore.getState().closePanel(UI_PANEL_IDS.NOTIFICATIONS_FILTER);
    };

    const handleMarkAllRead = () => {
        void onMarkAllRead?.();
        useUiPanelsStore.getState().closePanel(UI_PANEL_IDS.NOTIFICATIONS_ACTIONS);
    };

    return (
        <div className='flex items-center gap-2'>
            <div className='relative' ref={filterRef}>
                <Button
                    type='button'
                    title='Filtrar por tipo'
                    aria-expanded={filterOpen}
                    onClick={toggleFilter}
                    className={`p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors ${
                        typeFilter !== 'ALL'
                            ? 'ring-2 ring-primary/60 ring-offset-2 ring-offset-black'
                            : ''
                    }`}
                >
                    <Filter size={20} />
                </Button>

                {filterOpen ? (
                    <div className='absolute right-0 top-full z-[200] mt-2 max-h-[min(70vh,420px)] w-60 overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-highest py-1 shadow-2xl'>
                        {NOTIFICATION_FILTER_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type='button'
                                onClick={() => selectFilter(opt.value)}
                                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/10 ${
                                    typeFilter === opt.value
                                        ? 'bg-primary/15 font-semibold text-primary'
                                        : 'text-on-surface'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className='relative' ref={actionRef}>
                <Button
                    type='button'
                    title='Más acciones'
                    aria-expanded={actionOpen}
                    onClick={toggleAction}
                    className='p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors'
                >
                    <MoreHorizontal size={20} />
                </Button>

                {actionOpen ? (
                    <div className='absolute right-0 top-full z-[200] mt-2 w-60 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-highest shadow-2xl animate-in fade-in zoom-in duration-200'>
                        <Button
                            type='button'
                            onClick={handleMarkAllRead}
                            className='w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/10 text-on-surface transition-colors'
                        >
                            <CheckCheck size={16} className='text-primary' />
                            Marcar todas como leídas
                        </Button>
                        <Button
                            type='button'
                            className='w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-error/10 text-error transition-colors border-t border-outline-variant/10'
                        >
                            <Trash2 size={16} />
                            Borrar historial
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default NotificationActions;
