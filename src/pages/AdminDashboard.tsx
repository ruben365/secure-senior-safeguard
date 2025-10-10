import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Users, DollarSign, Video, Mail, LogOut, Calendar } from "lucide-react";
import { WorkersCalendar } from "@/components/admin/WorkersCalendar";

interface Subscription {
  id: string;
  plan_name: string;
  status: string;
  amount: number;
  start_date: string;
  end_date: string | null;
}

interface ZoomClass {
  id: string;
  title: string;
  description: string | null;
  zoom_link: string;
  scheduled_date: string;
  duration_minutes: number;
  max_participants: number | null;
}

interface Buyer {
  id: string;
  product_name: string;
  purchase_date: string;
  amount: number;
  status: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [zoomClasses, setZoomClasses] = useState<ZoomClass[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    checkAuth();
  }, [user]);

  const checkAuth = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const adminStatus = await isAdmin();
      
      if (!adminStatus) {
        toast({
          title: "Access Denied",
          description: "You don't have admin permissions",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      await loadData();
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [subsResult, classesResult, buyersResult, subscribersResult] = await Promise.all([
        supabase.from("subscriptions").select("*").order("created_at", { ascending: false }),
        supabase.from("zoom_classes").select("*").order("scheduled_date", { ascending: true }),
        supabase.from("buyers").select("*").order("purchase_date", { ascending: false }),
        supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false }),
      ]);

      if (subsResult.data) setSubscriptions(subsResult.data);
      if (classesResult.data) setZoomClasses(classesResult.data);
      if (buyersResult.data) setBuyers(buyersResult.data);
      if (subscribersResult.data) setSubscribers(subscribersResult.data);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text-primary">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscriptions</p>
                <p className="text-2xl font-bold">{subscriptions.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zoom Classes</p>
                <p className="text-2xl font-bold">{zoomClasses.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Buyers</p>
                <p className="text-2xl font-bold">{buyers.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-bold">{subscribers.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calendar">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="buyers">Buyers & Donors</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="classes">Zoom Classes</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <WorkersCalendar zoomClasses={zoomClasses} />
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Subscriptions</h2>
              {subscriptions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No subscriptions yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Plan Name</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Start Date</th>
                        <th className="text-left p-2">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b">
                          <td className="p-2">{sub.plan_name}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${sub.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="p-2">${sub.amount}</td>
                          <td className="p-2">{new Date(sub.start_date).toLocaleDateString()}</td>
                          <td className="p-2">{sub.end_date ? new Date(sub.end_date).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Zoom Classes</h2>
              {zoomClasses.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No zoom classes scheduled</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Scheduled Date</th>
                        <th className="text-left p-2">Duration (min)</th>
                        <th className="text-left p-2">Max Participants</th>
                        <th className="text-left p-2">Zoom Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zoomClasses.map((cls) => (
                        <tr key={cls.id} className="border-b">
                          <td className="p-2 font-medium">{cls.title}</td>
                          <td className="p-2">{new Date(cls.scheduled_date).toLocaleString()}</td>
                          <td className="p-2">{cls.duration_minutes}</td>
                          <td className="p-2">{cls.max_participants || 'Unlimited'}</td>
                          <td className="p-2">
                            <a href={cls.zoom_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              Join
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="buyers">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Buyers & Donors</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Track all purchases, donations, and service payments
              </p>
              {buyers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No buyers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Product Name</th>
                        <th className="text-left p-2">Purchase Date</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyers.map((buyer) => (
                        <tr key={buyer.id} className="border-b">
                          <td className="p-2">{buyer.product_name}</td>
                          <td className="p-2">{new Date(buyer.purchase_date).toLocaleDateString()}</td>
                          <td className="p-2">${buyer.amount}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${buyer.status === 'completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                              {buyer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Email Subscribers</h2>
              {subscribers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No subscribers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Subscribed At</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b">
                          <td className="p-2">{subscriber.name || 'N/A'}</td>
                          <td className="p-2">{subscriber.email}</td>
                          <td className="p-2">{new Date(subscriber.subscribed_at).toLocaleDateString()}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${subscriber.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                              {subscriber.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
