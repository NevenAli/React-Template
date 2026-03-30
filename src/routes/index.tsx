/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import App from "@/App";
import { routesSection } from "@/routes/sections";
import { paths } from "@/routes/paths";

const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

function AppLayout() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Outlet />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: paths.ROOT,
        element: <AppLayout />,
        children: [...routesSection, { path: "*", element: <NotFoundPage /> }],
      },
    ],
  },
]);
