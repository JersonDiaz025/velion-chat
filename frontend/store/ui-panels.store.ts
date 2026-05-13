import { create } from 'zustand';
import type { UiPanelsStore } from '@/types/ui-panels.types';

export const useUiPanelsStore = create<UiPanelsStore>((set, get) => ({
    panels: {},

    isOpen: (id) => get().panels[id] === true,

    setPanel: (id, open) =>
        set((state) => ({
            panels: { ...state.panels, [id]: open },
        })),

    togglePanel: (id) =>
        set((state) => ({
            panels: { ...state.panels, [id]: !state.panels[id] },
        })),

    togglePanelExclusive: (id, exclusiveSiblingIds = []) =>
        set((state) => {
            const panels = { ...state.panels };
            const willOpen = !panels[id];
            if (willOpen) {
                exclusiveSiblingIds.forEach((sid) => {
                    panels[sid] = false;
                });
                panels[id] = true;
            } else {
                panels[id] = false;
            }
            return { panels };
        }),

    closePanel: (id) =>
        set((state) => {
            if (state.panels[id] !== true) return state;
            return { panels: { ...state.panels, [id]: false } };
        }),

    closePanels: (ids) =>
        set((state) => {
            const panels = { ...state.panels };
            let changed = false;
            ids.forEach((id) => {
                if (panels[id]) {
                    panels[id] = false;
                    changed = true;
                }
            });
            return changed ? { panels } : state;
        }),

    closeAllPanels: () => set({ panels: {} }),
}));
