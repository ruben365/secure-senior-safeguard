import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  MessageSquare, 
  User,
  Clock,
  CheckCircle,
  LogOut,
  Bell,
  MapPin,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';

interface WorkerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  current_status: string;
  profile_photo_url: string | null;
}

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  scheduled_start: string;
  scheduled_end: string;
  status: string;
  location: string | null;
  is_virtual: boolean;
  zoom_link: string | null;
  special_instructions: string | null;
  client_id: string;
  clients: {
    first_name: string;
    last_name: string;
    phone: string | null;
    email: string;
  };
}

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const { isWorker, loading: roleLoading } = useUserRole();
  const [profile, setProfile] = useState<WorkerProfile | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    todayCount: 0,
    weekCount: 0,
    monthCompleted: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading && !isWorker) {
      navigate('/auth');
    } else if (isWorker) {
      loadWorkerData();
    }
  }, [isWorker, roleLoading, navigate]);

  const loadWorkerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load worker profile
      const { data: workerData } = await supabase
        .from('workers')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(workerData);

      // Load today's appointments
      const today = new Date().toISOString().split('T')[0];
      const { data: todayAppts } = await supabase
        .from('appointments')
        .select(`
          *,
          clients (
            first_name,
            last_name,
            phone,
            email
          )
        `)
        .eq('worker_id', user.id)
        .gte('scheduled_start', `${today}T00:00:00`)
        .lt('scheduled_start', `${today}T23:59:59`)
        .order('scheduled_start', { ascending: true });

      setTodayAppointments(todayAppts || []);

      // Load upcoming appointments (next 7 days)
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const { data: upcomingAppts } = await supabase
        .from('appointments')
        .select(`
          *,
          clients (
            first_name,
            last_name,
            phone,
            email
          )
        `)
        .eq('worker_id', user.id)
        .gt('scheduled_start', new Date().toISOString())
        .lte('scheduled_start', nextWeek.toISOString())
        .order('scheduled_start', { ascending: true });

      setUpcomingAppointments(upcomingAppts || []);

      // Calculate stats
      const { count: monthCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('worker_id', user.id)
        .eq('status', 'completed')
        .gte('scheduled_start', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

      const { count: unreadMsg } = await supabase
        .from('internal_messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', user.id)
        .eq('is_read', false);

      setStats({
        todayCount: todayAppts?.length || 0,
        weekCount: upcomingAppts?.length || 0,
        monthCompleted: monthCount || 0,
        unreadMessages: unreadMsg || 0,
      });
    } catch (error) {
      console.error('Error loading worker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'in_progress': return 'secondary';
      case 'completed': return 'outline';
      default: return 'outline';
    }
  };

  if (loading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">InVision Network</h1>
            <p className="text-sm text-muted-foreground">Worker Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {stats.unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {stats.unreadMessages}
                </Badge>
              )}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.first_name}!
          </h2>
          <p className="text-muted-foreground">Here's your schedule overview</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weekCount}</div>
              <p className="text-xs text-muted-foreground">upcoming appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthCompleted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Today's Schedule</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {todayAppointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No appointments scheduled for today
                  </p>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((apt) => (
                      <Card key={apt.id} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-base">{apt.title}</CardTitle>
                              <CardDescription>
                                {format(new Date(apt.scheduled_start), 'h:mm a')} - {format(new Date(apt.scheduled_end), 'h:mm a')}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(apt.status)}>
                              {apt.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4" />
                            <span>{apt.clients.first_name} {apt.clients.last_name}</span>
                          </div>
                          {apt.clients.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4" />
                              <span>{apt.clients.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{apt.is_virtual ? 'Virtual Meeting' : apt.location}</span>
                          </div>
                          {apt.special_instructions && (
                            <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                              <strong>Special Instructions:</strong>
                              <p className="mt-1">{apt.special_instructions}</p>
                            </div>
                          )}
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">View Details</Button>
                            {apt.status === 'confirmed' && (
                              <Button size="sm">Mark In Progress</Button>
                            )}
                            {apt.status === 'in_progress' && (
                              <Button size="sm">Complete Job</Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No upcoming appointments
                  </p>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt) => (
                      <Card key={apt.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-base">{apt.title}</CardTitle>
                              <CardDescription>
                                {format(new Date(apt.scheduled_start), 'MMM d, h:mm a')} - {format(new Date(apt.scheduled_end), 'h:mm a')}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(apt.status)}>
                              {apt.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4" />
                            <span>{apt.clients.first_name} {apt.clients.last_name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
                <CardDescription>Set your working hours and request time off</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Availability management coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages from Management</CardTitle>
                <CardDescription>Internal communications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">
                  Messaging interface coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>View and update your information</CardDescription>
              </CardHeader>
              <CardContent>
                {profile && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <p className="text-sm text-muted-foreground">{profile.first_name} {profile.last_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                    {profile.phone && (
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{profile.phone}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-1">
                        <Badge>{profile.current_status}</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
