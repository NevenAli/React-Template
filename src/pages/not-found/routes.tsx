/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { paths } from "@/routes/paths";

const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

export const notFoundPaths = {
  NOT_FOUND: paths.NOT_FOUND,
} as const;

export const notFoundRoutes: RouteObject[] = [
  {
    path: notFoundPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
];

