import { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { GlassmorphismLoader } from "@/components/GlassmorphismLoader";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, roleConfig, initialized } = useAuth();
  const location = useLocation();

  if (loading || !initialized) {
    return <GlassmorphismLoader message="Authenticating" />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const userRole = roleConfig?.role;
    if (!userRole || userRole !== requiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return (
    <Suspense fallback={<GlassmorphismLoader message="Loading" />}>
      {children}
    </Suspense>
  );
};
