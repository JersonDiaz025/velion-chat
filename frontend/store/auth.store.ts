import { AuthState } from "@/types/auth.types";
import { create } from "zustand";

const INITIAL_DATA = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...INITIAL_DATA,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
