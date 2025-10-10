import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Calendar,
  MessageSquare,
  User,
  Clock,
  MapPin,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

const WorkerDashboardNew = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Fetch worker data
  const { data: workerData } = useQuery({
    queryKey: ["workerData", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("workers")
        .select("*")
        .eq("id", user?.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  // Fetch today's jobs
  const { data: todayJobs } = useQuery({
    queryKey: ["todayJobs", user?.id],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("jobs")
        .select("*, clients(*)")
        .contains("assigned_worker_ids", [user?.id])
        .gte("start_at", `${today}T00:00:00`)
        .lte("start_at", `${today}T23:59:59`)
        .order("start_at");
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch unread messages
  const { data: unreadMessages } = useQuery({
    queryKey: ["unreadMessages", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("internal_messages")
        .select("*", { count: "exact", head: true })
        .eq("recipient_id", user?.id)
        .eq("is_read", false);
      return count || 0;
    },
    enabled: !!user?.id,
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/enhanced-auth");
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-amber-500/10 text-amber-700 border-amber-500/20",
      Assigned: "bg-blue-500/10 text-blue-700 border-blue-500/20",
      "In-Progress": "bg-purple-500/10 text-purple-700 border-purple-500/20",
      Completed: "bg-green-500/10 text-green-700 border-green-500/20",
      Cancelled: "bg-red-500/10 text-red-700 border-red-500/20",
    };
    return colors[status] || "bg-gray-500/10 text-gray-700 border-gray-500/20";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Hi, {workerData?.first_name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Worker ID: {workerData?.worker_id || "N/A"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* At-a-Glance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-subtle">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">My Jobs Today</p>
                  <p className="text-3xl font-bold">{todayJobs?.length || 0}</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-subtle">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Next Shift</p>
                  <p className="text-lg font-bold">
                    {todayJobs?.[0]
                      ? format(new Date(todayJobs[0].start_at), "h:mm a")
                      : "No shifts"}
                  </p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-subtle">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Events Today</p>
                  <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-subtle">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-3xl font-bold">{unreadMessages || 0}</p>
                </div>
                <div className="bg-amber-500/10 p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-subtle">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Clock In/Out
              </Button>
              <Button
                variant="outline"
                className="h-20"
                onClick={() => setActiveTab("schedule")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View My Schedule
              </Button>
              <Button
                variant="outline"
                className="h-20"
                onClick={() => setActiveTab("messages")}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Message Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/50 p-1 rounded-2xl shadow-subtle">
            <TabsTrigger value="dashboard" className="rounded-xl">My Queue</TabsTrigger>
            <TabsTrigger value="schedule" className="rounded-xl">Schedule</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl">Messages</TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>My Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayJobs && todayJobs.length > 0 ? (
                    todayJobs.map((job: any) => (
                      <div
                        key={job.id}
                        className="p-6 rounded-xl border bg-card hover:shadow-subtle transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.clients?.name || "No client"}
                            </p>
                          </div>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {format(new Date(job.start_at), "MMM d, h:mm a")} -{" "}
                            {format(new Date(job.end_at), "h:mm a")}
                          </div>
                          {job.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No jobs scheduled for today
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>My Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schedule view coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Messaging interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="rounded-2xl shadow-subtle">
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-lg">
                      {workerData?.first_name} {workerData?.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{workerData?.email || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Worker ID</label>
                    <p className="text-lg">{workerData?.worker_id || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Position</label>
                    <p className="text-lg">{workerData?.position || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge className="mt-1">{workerData?.current_status || "off_duty"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerDashboardNew;