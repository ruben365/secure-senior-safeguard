import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PortalLoadingSkeleton } from "@/components/portal/PortalLoadingSkeleton";
import { StatCard } from "@/components/shared/StatCard";
import { ActionQueue } from "@/components/shared/ActionQueue";
import { RealCalendar } from "@/components/shared/RealCalendar";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Users,
  MessageSquare,
  CalendarDays,
  ClipboardList,
  LogOut,
  CheckCircle,
  XCircle,
  Plus,
  Send,
} from "lucide-react";
import type { ActionItem, CalendarEvent, StatCardData, TableColumn } from "@/types/portal";

// ── Local types ──────────────────────────────────────────────────────────────

interface BookingRequest {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  status: string;
  created_at: string;
  request_number: string;
}

interface ClientMessage {
  id: string;
  subject: string | null;
  content: string;
  is_read: boolean | null;
  created_at: string | null;
  is_from_client: boolean | null;
}

interface Appointment {
  id: string;
  title: string | null;
  scheduled_start: string;
  scheduled_end: string | null;
  status: string | null;
}

// ── Component ─────────────────────────────────────────────────────────────────

function SecretaryDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, roleConfig, signOut } = useAuth();
  const queryClient = useQueryClient();

  // ── Role guard ──────────────────────────────────────────────────────────────
  const isAuthorized =
    roleConfig?.role === "secretary" || roleConfig?.role === "admin";

  // ── Queries ─────────────────────────────────────────────────────────────────

  const { data: pendingBookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ["secretary", "pending-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("id, full_name, email, service_name, status, created_at, request_number")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return (data ?? []) as BookingRequest[];
    },
    enabled: !!user && isAuthorized,
  });

  const { data: recentBookings = [], isLoading: loadingRecentBookings } = useQuery({
    queryKey: ["secretary", "recent-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("id, full_name, email, service_name, status, created_at, request_number")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as BookingRequest[];
    },
    enabled: !!user && isAuthorized,
  });

  const { data: unreadMessages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ["secretary", "unread-messages", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_messages")
        .select("id, subject, content, is_read, created_at, is_from_client")
        .eq("recipient_id", user!.id)
        .eq("is_read", false)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return (data ?? []) as ClientMessage[];
    },
    enabled: !!user && isAuthorized,
  });

  const { data: clientCount = 0 } = useQuery({
    queryKey: ["secretary", "client-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
    enabled: !!user && isAuthorized,
  });

  const { data: todayAppointments = [], isLoading: loadingAppointments } = useQuery({
    queryKey: ["secretary", "today-appointments"],
    queryFn: async () => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const { data, error } = await supabase
        .from("appointments")
        .select("id, title, scheduled_start, scheduled_end, status")
        .gte("scheduled_start", startOfToday.toISOString())
        .lte("scheduled_start", endOfToday.toISOString())
        .order("scheduled_start", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Appointment[];
    },
    enabled: !!user && isAuthorized,
  });

  // ── Derived data ─────────────────────────────────────────────────────────────

  const calendarEvents: CalendarEvent[] = todayAppointments.map((a) => ({
    id: a.id,
    title: a.title ?? "Appointment",
    date: a.scheduled_start,
    time: new Date(a.scheduled_start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type: a.status ?? undefined,
  }));

  const actionItems: ActionItem[] = [
    ...pendingBookings.map((b): ActionItem => ({
      id: `booking-${b.id}`,
      title: `Booking: ${b.full_name}`,
      description: b.service_name,
      priority: "high",
      icon: ClipboardList,
      href: "/admin/bookings",
    })),
    ...unreadMessages.map((m): ActionItem => ({
      id: `msg-${m.id}`,
      title: m.subject ?? "New message",
      description: m.content?.substring(0, 80),
      priority: "medium",
      icon: MessageSquare,
      href: "/portal/messages",
    })),
  ].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  const statCards: StatCardData[] = [
    {
      title: "Pending Bookings",
      value: pendingBookings.length,
      icon: CalendarDays,
    },
    {
      title: "Unread Messages",
      value: unreadMessages.length,
      icon: MessageSquare,
    },
    {
      title: "Active Clients",
      value: clientCount,
      icon: Users,
    },
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: CalendarDays,
    },
  ];

  // ── Mutation: booking action ──────────────────────────────────────────────────

  const handleBookingAction = useCallback(
    async (id: string, action: "confirmed" | "denied") => {
      try {
        const { error } = await supabase
          .from("booking_requests")
          .update({ status: action })
          .eq("id", id);

        if (error) throw error;

        toast({
          title: action === "confirmed" ? "Booking Confirmed" : "Booking Denied",
          description: `The booking has been ${action}.`,
        });

        await queryClient.invalidateQueries({ queryKey: ["secretary"] });
      } catch (err) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to update booking.",
          variant: "destructive",
        });
      }
    },
    [toast, queryClient]
  );

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  // ── Booking table columns ─────────────────────────────────────────────────────

  const bookingColumns: TableColumn<BookingRequest>[] = [
    {
      key: "full_name",
      label: "Client",
      sortable: true,
    },
    {
      key: "service_name",
      label: "Service",
      sortable: true,
    },
    {
      key: "created_at",
      label: "Date",
      sortable: true,
      render: (b) => new Date(b.created_at).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (b) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
          pending: "secondary",
          confirmed: "default",
          denied: "destructive",
        };
        return (
          <Badge variant={variants[b.status] ?? "outline"}>
            {b.status}
          </Badge>
        );
      },
    },
    {
      key: "id",
      label: "Actions",
      render: (b) =>
        b.status === "pending" ? (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-500/10"
              onClick={(e) => {
                e.stopPropagation();
                handleBookingAction(b.id, "confirmed");
              }}
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                handleBookingAction(b.id, "denied");
              }}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
        ) : null,
    },
  ];

  // ── Early returns ─────────────────────────────────────────────────────────────

  if (roleConfig && !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Card className="p-8 text-center max-w-sm">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              You do not have secretary privileges.
            </p>
            <Button asChild variant="outline">
              <Link to="/portal">Return to Portal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isLoading =
    loadingBookings || loadingMessages || loadingAppointments || loadingRecentBookings;

  if (!roleConfig || isLoading) return <PortalLoadingSkeleton />;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link to="/portal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Office Manager</h1>
                <p className="text-sm text-muted-foreground">
                  Bookings · Clients · Appointments
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.title} data={card} />
          ))}
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action required */}
            <ActionQueue
              title="Action Required"
              items={actionItems}
              maxItems={8}
              onViewAll={() => navigate("/admin/bookings")}
            />

            {/* Recent bookings table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold">Recent Bookings</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/bookings">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={recentBookings}
                  columns={bookingColumns}
                  searchable
                  searchPlaceholder="Search bookings..."
                  pageSize={8}
                  emptyTitle="No bookings found"
                  emptyDescription="Booking requests will appear here."
                />
              </CardContent>
            </Card>
          </div>

          {/* Right 1/3 */}
          <div className="space-y-6">
            {/* Real calendar with today's appointments */}
            <RealCalendar
              title="Today's Schedule"
              events={calendarEvents}
            />

            {/* Quick actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button asChild className="w-full justify-start gap-2">
                  <Link to="/admin/bookings">
                    <Plus className="w-4 h-4" />
                    Manage Bookings
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link to="/portal/messages">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SecretaryDashboard;
