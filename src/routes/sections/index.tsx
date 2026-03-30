/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { dashboardRoutes } from "@/pages/dashboard";
import { loginRoutes } from "@/pages/login";
import { notFoundRoutes } from "@/pages/not-found";

const AuthGuard = lazy(() => import("@/auth/guards/auth-guard"));
const GuestGuard = lazy(() => import("@/auth/guards/guest-guard"));

export const routesSection: RouteObject[] = [
  {
    element: (
      <Suspense fallback={null}>
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      </Suspense>
    ),
    children: [...dashboardRoutes],
  },
  {
    element: (
      <Suspense fallback={null}>
        <GuestGuard>
          <Outlet />
        </GuestGuard>
      </Suspense>
    ),
    children: [...loginRoutes],
  },
  ...notFoundRoutes,
];

