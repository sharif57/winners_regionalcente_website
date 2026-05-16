"use client";

import { useEffect, useMemo, useState } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { getTokenExpiryMs } from "@/lib/jwt";
import { useUserProfileQuery } from "@/redux/feature/userSlice";

function AuthRouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setToken(localStorage.getItem("accessToken"));
  }, [pathname]);

  const isAuthRoute = useMemo(() => pathname?.startsWith("/auth") ?? false, [pathname]);
  const isDashboardRoute = useMemo(() => pathname?.startsWith("/dashboard") ?? false, [pathname]);
  const isArrangementRoute = useMemo(() => pathname?.startsWith("/arrangement") ?? false, [pathname]);

  const { data: profileResponse, isLoading: isProfileLoading } = useUserProfileQuery(undefined, {
    skip: !token,
  });

  const isProfileComplete = Boolean(
    profileResponse &&
    typeof profileResponse === "object" &&
    "data" in profileResponse &&
    (profileResponse as { data?: { complete_profile?: boolean } }).data?.complete_profile
  );

  const shouldRedirectToArrangement = Boolean(token) && !isProfileLoading && !isProfileComplete && isDashboardRoute;
  const shouldRedirectToDashboard = Boolean(token) && !isProfileLoading && isProfileComplete && isArrangementRoute;
  const shouldRedirectFromAuth = Boolean(token) && !isProfileLoading && isAuthRoute;
  const shouldRedirectToLogin = token === null && (isDashboardRoute || isArrangementRoute);
  const shouldBlockWhileResolving =
    (token === undefined && (isDashboardRoute || isArrangementRoute || isAuthRoute)) ||
    (Boolean(token) && isProfileLoading && (isDashboardRoute || isArrangementRoute || isAuthRoute));

  const shouldShowRouteGateLoader =
    shouldBlockWhileResolving ||
    shouldRedirectToArrangement ||
    shouldRedirectToDashboard ||
    shouldRedirectFromAuth ||
    shouldRedirectToLogin;

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!token) {
      if (isDashboardRoute || isArrangementRoute) {
        router.replace("/auth/login");
      }
      return;
    }

    if (isProfileLoading) {
      return;
    }

    if (isAuthRoute) {
      router.replace(isProfileComplete ? "/dashboard" : "/arrangement");
      return;
    }

    if (!isProfileComplete && isDashboardRoute) {
      router.replace("/arrangement");
      return;
    }

    if (isProfileComplete && isArrangementRoute) {
      router.replace("/dashboard");
    }
  }, [
    pathname,
    token,
    isProfileLoading,
    profileResponse,
    isAuthRoute,
    isDashboardRoute,
    isArrangementRoute,
    router,
  ]);

  if (shouldShowRouteGateLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-[#1F1F1F]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#B91D1D]" />
          <p className="text-sm sm:text-base font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const logout = () => {
      localStorage.removeItem("accessToken");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax";

      const isOnAuthRoute = window.location.pathname.startsWith("/auth");

      if (!isOnAuthRoute) {
        router.replace("/auth");
        router.refresh();
      }
    };

    const expiryMs = getTokenExpiryMs(token);

    if (!expiryMs) {
      logout();
      return;
    }

    const remainingMs = expiryMs - Date.now();

    if (remainingMs <= 0) {
      logout();
      return;
    }

    const timerId = window.setTimeout(logout, remainingMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [pathname, router]);

  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="light"
      />
      <AuthRouteGuard>{children}</AuthRouteGuard>
    </Provider>
  );
}
