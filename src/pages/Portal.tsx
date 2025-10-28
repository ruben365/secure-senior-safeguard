import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Calendar, MessageSquare, Bell, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Portal = () => {
  const { user, profile, roles, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      administrator: 'bg-destructive',
      threat_analyst: 'bg-primary',
      trainer: 'bg-success',
      ai_developer: 'bg-accent',
      web_designer: 'bg-purple-500',
      customer_support: 'bg-cyan-500',
      sales_consultant: 'bg-gold',
    };
    return colors[role] || 'bg-muted';
  };

  const formatRoleName = (role: string) => {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                InVision Network
              </h1>
              <span className="text-sm text-muted-foreground">Staff Portal</span>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost">Dashboard</Button>
              <Button variant="ghost">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
              <Button variant="ghost">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-right hidden md:block">
                <div className="flex items-center justify-end space-x-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={profile.profile_photo_url} />
                      <AvatarFallback>
                        {profile.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {profile.username}
                      </p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Time Clock</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">
              Welcome, {profile.username}!
            </h2>
            <p className="text-muted-foreground text-lg">
              You're logged into the InVision Network Staff Portal
            </p>
          </div>

          {/* Role Information */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h3 className="text-xl font-semibold">Your Roles</h3>
            {roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge
                    key={role}
                    className={getRoleBadgeColor(role)}
                  >
                    {formatRoleName(role)}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">
                <p>No roles assigned yet.</p>
                <p className="text-sm mt-2">
                  Please contact an administrator to assign your role.
                </p>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h3 className="text-xl font-semibold">Profile Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              {profile.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              )}
              {profile.department && (
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{profile.department}</p>
                </div>
              )}
              {profile.hire_date && (
                <div>
                  <p className="text-sm text-muted-foreground">Hire Date</p>
                  <p className="font-medium">
                    {new Date(profile.hire_date).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Admin Section */}
          {isAdmin() && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-destructive">
                Administrator Actions
              </h3>
              <p className="text-sm text-muted-foreground">
                As an administrator, you have full access to all portal features.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">Manage Users</Button>
                <Button variant="outline">View Reports</Button>
                <Button variant="outline">System Settings</Button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="h-auto py-4 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                View Calendar
              </Button>
              <Button className="h-auto py-4 flex-col" variant="outline">
                <MessageSquare className="h-6 w-6 mb-2" />
                Messages
              </Button>
              <Button className="h-auto py-4 flex-col" variant="outline">
                <User className="h-6 w-6 mb-2" />
                My Tasks
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portal;
