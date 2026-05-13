export interface UiPanelsStore {
    /** `panelId` → abierto (true) o cerrado (false). Usa IDs estables, p. ej. `UI_PANEL_IDS`. */
    panels: Record<string, boolean>;
    isOpen: (id: string) => boolean;
    setPanel: (id: string, open: boolean) => void;
    togglePanel: (id: string) => void;
    /**
     * Abre `id` si estaba cerrado (y cierra `exclusiveSiblingIds`), o lo cierra si estaba abierto.
     * Útil para menús hermanos (solo uno visible).
     */
    togglePanelExclusive: (id: string, exclusiveSiblingIds?: string[]) => void;
    closePanel: (id: string) => void;
    closePanels: (ids: string[]) => void;
    closeAllPanels: () => void;
}
