import { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GlassmorphismLoader } from "@/components/GlassmorphismLoader";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <GlassmorphismLoader message="Authenticating" />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <Suspense fallback={<GlassmorphismLoader message="Loading" />}>
      {children}
    </Suspense>
  );
};
