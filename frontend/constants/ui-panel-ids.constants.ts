export const UI_PANEL_IDS = {
    NOTIFICATIONS_FILTER: 'notifications:filter-menu',
    NOTIFICATIONS_ACTIONS: 'notifications:actions-menu',
} as const;

export type KnownUiPanelId = (typeof UI_PANEL_IDS)[keyof typeof UI_PANEL_IDS];
