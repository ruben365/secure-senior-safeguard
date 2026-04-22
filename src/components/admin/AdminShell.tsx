import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import {
  Search, Bell, Menu, ChevronLeft, ChevronRight,
  Settings, LogOut, ChevronDown, Home,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageSkeleton } from "@/components/admin/PageSkeleton";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export function AdminShell() {
  const { user, roleConfig, loading, initialized, signOut, adminName, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast({ title: "Signed Out", description: "You've been securely logged out." });
      navigate("/auth");
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to sign out.", variant: "destructive" });
    }
  }, [signOut, navigate, toast]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(async () => {
      try { await signOut(); } catch { /* silent */ }
      toast({ title: "Session Expired", description: "You've been logged out due to inactivity.", variant: "destructive" });
      navigate("/auth");
    }, INACTIVITY_TIMEOUT);
  }, [signOut, navigate, toast]);

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    const handler = () => resetInactivityTimer();
    events.forEach((e) => document.addEventListener(e, handler));
    resetInactivityTimer();
    return () => {
      events.forEach((e) => document.removeEventListener(e, handler));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);

  // Loading skeleton
  if (!initialized || loading) {
    return (
      <div className={`admin-v2 admin-no-animations${sidebarOpen ? "" : " sidebar-collapsed"}`}>
        <aside className="adm-sidebar" aria-label="Admin sidebar">
          <div className="adm-sidebar-logo">
            <div className="adm-sidebar-logo-icon">
              <Home className="h-4 w-4 text-white" />
            </div>
            {sidebarOpen && <span className="adm-sidebar-brand">InVision</span>}
          </div>
        </aside>
        <div className="adm-main">
          <div className="adm-topbar">
            <div className="h-8 w-64 bg-black/10 rounded-full animate-pulse" />
            <div className="h-8 w-32 bg-black/10 rounded-full animate-pulse" />
          </div>
          <div className="adm-page-scroll p-6">
            <PageSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (!roleConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#dcdcde]">
        <Card className="max-w-md w-full bg-white border-gray-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <ShieldAlert className="h-12 w-12 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
              <p className="text-gray-500">Your account does not have permission to access the admin portal.</p>
              <Button onClick={() => navigate("/")} variant="outline">Return to Homepage</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`admin-v2 admin-no-animations${sidebarOpen ? "" : " sidebar-collapsed"}`}
      data-route-scope="admin"
    >
      {/* ── Sidebar ── */}
      <CyberSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        adminName={adminName}
        onSignOut={handleSignOut}
      />

      {/* Mobile overlay backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Main column ── */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          {/* Left — burger + back/fwd + search */}
          <div className="flex items-center gap-3 flex-1">
            <button
              className="adm-topbar-btn"
              onClick={() => {
                if (window.innerWidth < 768) setMobileSidebarOpen(!mobileSidebarOpen);
                else setSidebarOpen(!sidebarOpen);
              }}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1">
              <button className="adm-topbar-btn" onClick={() => window.history.back()} aria-label="Back">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="adm-topbar-btn" onClick={() => window.history.forward()} aria-label="Forward">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="adm-topbar-search hidden sm:flex">
              <Search className="h-4 w-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
              <input placeholder="Search…" />
            </div>
          </div>

          {/* Right — home + bell + settings + profile */}
          <div className="adm-topbar-actions">
            <button className="adm-topbar-btn" onClick={() => navigate("/")} title="Back to Website">
              <Home className="h-4 w-4" />
            </button>
            <button className="adm-topbar-btn" onClick={() => navigate("/admin/notifications")}>
              <Bell className="h-4 w-4" />
            </button>
            <button className="adm-topbar-btn" onClick={() => navigate("/admin/settings")}>
              <Settings className="h-4 w-4" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="adm-topbar-profile">
                  <div className="adm-topbar-avatar">{initials(adminName)}</div>
                  <span className="adm-topbar-name hidden md:inline">{adminName}</span>
                  <ChevronDown className="h-3.5 w-3.5 mr-1" style={{ color: "var(--muted)" }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-gray-200 shadow-lg">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin/settings")}>
                  <Settings className="w-4 h-4 mr-2 text-gray-500" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="adm-page-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
