import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/hooks/use-auth";
import { paths } from "@/routes/paths";

export default function GuestGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={paths.ROOT} replace />;
  }

  return children;
}

