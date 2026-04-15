import { LogOut, Home, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  title: string;
  subtitle?: string;
  onSignOut: () => void;
}

export function DashboardHeader({
  firstName,
  lastName,
  avatarUrl,
  title,
  subtitle,
  onSignOut,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U";

  return (
    <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={avatarUrl} alt={firstName && lastName ? `${firstName} ${lastName}` : "User avatar"} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm text-muted-foreground">
                {subtitle || `Welcome back, ${firstName}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            {/* TODO: Settings button placeholder - wire up onClick when settings page is available */}
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="outline" size="sm" onClick={onSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
