import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/hooks/use-auth";
import { paths } from "@/routes/paths";

export default function AuthGuard({ children }: PropsWithChildren) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={paths.LOGIN}
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  return children;
}

