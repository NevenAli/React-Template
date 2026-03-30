/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { paths } from "@/routes/paths";

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));

export const dashboardPaths = {
  ROOT: paths.ROOT,
} as const;

export const dashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <DashboardPage />,
  },
];

