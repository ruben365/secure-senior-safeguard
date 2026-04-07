import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronLeft, ChevronRight, Search, Home, LogOut, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationCenter } from "@/components/portal/NotificationCenter";
import { toast } from "@/hooks/use-toast";

interface PortalTopbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export function PortalTopbar({
  sidebarOpen,
  onToggleSidebar,
  onToggleMobileSidebar,
}: PortalTopbarProps) {
  const navigate = useNavigate();
  const { signOut, adminName, roleConfig } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate("/auth");
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  }, [signOut, navigate]);

  const initials = getInitials(adminName || "A");
  const roleName = roleConfig?.displayName ?? "User";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-14 flex items-center gap-2 px-4 bg-card border-b border-border transition-all duration-200",
        /* Desktop: offset by sidebar width */
        sidebarOpen ? "md:left-[260px]" : "md:left-[70px]",
        /* Mobile: full width */
        "left-0",
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-1">
        {/* Desktop sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex h-8 w-8"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="inline-flex md:hidden h-8 w-8"
          onClick={onToggleMobileSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Back / Forward history nav */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => window.history.forward()}
          aria-label="Go forward"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            className="h-8 w-48 lg:w-64 pl-8 text-sm bg-muted/50 border-border"
            placeholder="Search... (Ctrl+K)"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-1">
        {/* Home button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <Home className="h-4 w-4" />
        </Button>

        {/* Notification center */}
        <NotificationCenter />

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-2 px-2"
              aria-label="Open profile menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
                  {adminName}
                </span>
                <span className="text-[10px] text-muted-foreground">{roleName}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
