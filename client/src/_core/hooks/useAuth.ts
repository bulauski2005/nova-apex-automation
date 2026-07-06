import { getLoginUrl } from "@/const";
import { useCallback, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } =
    options ?? {};

  const logout = useCallback(async () => {
    window.location.href = getLoginUrl();
  }, []);

  const state = useMemo(() => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  }), []);

  useMemo(() => {
    if (!redirectOnUnauthenticated) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;
    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath]);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout,
  };
}
