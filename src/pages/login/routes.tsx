/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { paths } from "@/routes/paths";

const LoginPage = lazy(() => import("@/pages/login/LoginPage"));

export const loginPaths = {
  LOGIN: paths.LOGIN,
} as const;

export const loginRoutes: RouteObject[] = [
  {
    path: loginPaths.LOGIN,
    element: <LoginPage />,
  },
];

