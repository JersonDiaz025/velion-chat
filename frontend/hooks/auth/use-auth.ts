"use client";

import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { user, isLoading, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
}
