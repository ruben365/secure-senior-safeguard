import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { Skeleton } from "@/components/ui/skeleton";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

function PortalShellSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar placeholder */}
      <div className="hidden md:flex w-64 border-r border-border bg-card flex-col gap-3 p-4">
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-5 w-3/4 rounded" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full rounded-md" />
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {/* Topbar / header placeholder */}
        <div className="h-9 border-b border-border bg-card/80 flex items-center px-4 gap-3">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-4 w-40 rounded" />
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
        </div>

        {/* Content: 4 pulse boxes */}
        <div className="p-4 md:p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PortalShell() {
  const { user, loading, initialized, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInactivityTimeout = useCallback(async () => {
    try {
      await signOut();
    } catch {
      // ignore sign-out errors during inactivity logout
    }
    toast({
      title: "Session Expired",
      description: "You've been logged out due to inactivity.",
      variant: "destructive",
    });
    navigate("/auth");
  }, [signOut, toast, navigate]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(
      handleInactivityTimeout,
      INACTIVITY_TIMEOUT,
    );
  }, [handleInactivityTimeout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"] as const;

    const handleActivity = () => resetInactivityTimer();
    events.forEach((e) => document.addEventListener(e, handleActivity));
    resetInactivityTimer();

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleActivity));
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  if (!initialized || loading) {
    return <PortalShellSkeleton />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <PortalSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"
        }`}
      >
        <PortalTopbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleMobileSidebar={() =>
            setMobileSidebarOpen((prev) => !prev)
          }
        />

        <main className="flex-1 pt-9">
          <div className="min-h-[calc(100vh-3.5rem)] p-4 md:p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
