"use client";

import { ReactNode } from "react";
import { useSession } from "@/lib/hooks/useSession";
import LoginForm from "./LoginForm";

/**
 * Wraps protected content. Shows login form if not authenticated.
 */
export default function AuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useSession();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
