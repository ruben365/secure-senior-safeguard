import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  Calendar as CalendarIcon,
  CheckSquare,
  TrendingUp,
  Shield,
  GraduationCap,
  Code,
  Headphones,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalStaff: 0,
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSignOut = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Log logout activity before signing out
      if (user) {
        await supabase.from("user_activity_logs").insert({
          user_id: user.id,
          activity_type: "logout",
          metadata: { email: user.email }
        });
      }

      await supabase.auth.signOut();
      toast({ title: "Signed out successfully" });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load user's tasks
    const { data: tasksData } = await supabase
      .from("admin_tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true })
      .limit(5);

    if (tasksData) setTasks(tasksData);

    // Load user's events
    const { data: eventsData } = await supabase
      .from("admin_events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(5);

    if (eventsData) setEvents(eventsData);

    // Load pending user approvals
    const { data: pendingData } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, email, phone, account_status, application_reference, created_at")
      .eq("account_status", "pending")
      .order("created_at", { ascending: false })
      .limit(10);

    if (pendingData) setPendingUsers(pendingData);

    // Load recent login activity
    const { data: activityData } = await supabase
      .from("user_activity_logs")
      .select(`
        *,
        profiles:user_id (first_name, last_name, email)
      `)
      .eq("activity_type", "login")
      .order("created_at", { ascending: false })
      .limit(10);

    if (activityData) setRecentActivity(activityData);

    // Update stats
    setStats({
      totalStaff: 12,
      activeProjects: 8,
      pendingTasks: tasksData?.length || 0,
      upcomingEvents: eventsData?.length || 0,
      pendingApprovals: pendingData?.length || 0,
    });
  };

  const handleApproveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ account_status: "approved" })
        .eq("id", userId);

      if (error) throw error;

      toast({ title: "User approved successfully" });
      loadDashboardData(); // Reload data
    } catch (error: any) {
      toast({
        title: "Error approving user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ account_status: "rejected" })
        .eq("id", userId);

      if (error) throw error;

      toast({ title: "User rejected" });
      loadDashboardData(); // Reload data
    } catch (error: any) {
      toast({
        title: "Error rejecting user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const statCards = [
    { label: "Total Staff", value: stats.totalStaff, icon: Users, color: "text-blue-600" },
    { label: "Active Projects", value: stats.activeProjects, icon: TrendingUp, color: "text-green-600" },
    { label: "Pending Approvals", value: stats.pendingApprovals, icon: Shield, color: "text-red-600" },
    { label: "Upcoming Events", value: stats.upcomingEvents, icon: CalendarIcon, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/portal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage team and operations</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} bg-primary/10 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Pending Approvals, Activity & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending User Approvals */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Pending User Approvals
                  {pendingUsers.length > 0 && (
                    <Badge variant="destructive">{pendingUsers.length}</Badge>
                  )}
                </h2>
              </div>
              <div className="space-y-3">
                {pendingUsers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No pending approvals</p>
                ) : (
                  pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border-l-4 border-red-500">
                      <div className="flex-1">
                        <p className="font-medium">{user.first_name} {user.last_name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied: {new Date(user.created_at).toLocaleDateString()} • Ref: {user.application_reference}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleApproveUser(user.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectUser(user.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Recent Login Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Recent Login Activity</h2>
              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No recent activity</p>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {activity.profiles?.first_name} {activity.profiles?.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.profiles?.email}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Tasks</h2>
                <Button size="sm">Add Task</Button>
              </div>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No tasks yet</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                        </div>
                      </div>
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {task.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <Button size="sm">Add Event</Button>
              </div>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No upcoming events</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.start_time).toLocaleString()}
                        </p>
                        {event.location && <p className="text-sm text-muted-foreground mt-1">{event.location}</p>}
                      </div>
                      <Badge>{event.event_type}</Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Team Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Team Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { role: "Threat Analysts", count: 3, icon: Shield, color: "bg-blue-100 text-blue-600" },
                  { role: "Trainers", count: 2, icon: GraduationCap, color: "bg-green-100 text-green-600" },
                  { role: "Developers", count: 4, icon: Code, color: "bg-purple-100 text-purple-600" },
                  { role: "Support", count: 3, icon: Headphones, color: "bg-amber-100 text-amber-600" },
                ].map((team) => {
                  const Icon = team.icon;
                  return (
                    <div key={team.role} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className={`w-10 h-10 ${team.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{team.count}</p>
                        <p className="text-sm text-muted-foreground">{team.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Column - Calendar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Calendar</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Staff
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
