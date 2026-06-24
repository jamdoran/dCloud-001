import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "@/lib/auth";

/**
 * Gate for everything behind the simulated Cisco SSO. The landing page is the
 * only route that renders without this wrapper.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
