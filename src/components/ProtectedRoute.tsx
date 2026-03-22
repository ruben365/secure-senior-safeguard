import { Suspense } from "react";
import { GlassmorphismLoader } from "@/components/GlassmorphismLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// TRIAL MODE: Auth check bypassed — all routes accessible without login
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return (
    <Suspense fallback={<GlassmorphismLoader message="Loading" />}>
      {children}
    </Suspense>
  );
};
