import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PortalLoadingSkeleton } from "@/components/portal/PortalLoadingSkeleton";
import { StatCard } from "@/components/shared/StatCard";
import { DataTable } from "@/components/shared/DataTable";
import { RealCalendar } from "@/components/shared/RealCalendar";
import { ErrorState } from "@/components/shared/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ListTodo,
  Ticket,
  Users,
  CalendarDays,
  Clock,
  MessageSquare,
} from "lucide-react";
import type { StatCardData, TableColumn, CalendarEvent } from "@/types/portal";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Task {
  id: string;
  title: string;
  status: string | null;
  priority: string | null;
  due_date: string | null;
}

interface SupportTicket {
  id: string;
  subject: string;
  priority: string | null;
  status: string;
  created_at: string;
}

interface Appointment {
  id: string;
  title: string;
  start_time: string;
}

// ── Allowed roles ─────────────────────────────────────────────────────────────

const ALLOWED_ROLES = new Set([
  "staff",
  "business_consultant",
  "support_specialist",
  "moderator",
  "admin",
]);

// ── Badge helpers ─────────────────────────────────────────────────────────────

function TaskStatusBadge({ status }: { status: string | null }) {
  const map: Record<string, string> = {
    completed: "bg-green-500/15 text-green-600 border-green-500/30",
    in_progress: "bg-blue-500/15 text-blue-600 border-blue-500/30",
    blocked: "bg-red-500/15 text-red-600 border-red-500/30",
    pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  };
  const cls = map[status ?? ""] ?? "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={cls}>
      {status ?? "—"}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: string | null }) {
  const map: Record<string, string> = {
    high: "bg-red-500/15 text-red-600 border-red-500/30",
    medium: "bg-orange-500/15 text-orange-600 border-orange-500/30",
    low: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  };
  const cls = map[priority ?? ""] ?? "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={cls}>
      {priority ?? "normal"}
    </Badge>
  );
}

// ── Column definitions ────────────────────────────────────────────────────────

const taskColumns: TableColumn<Task>[] = [
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <TaskStatusBadge status={item.status} />,
  },
  {
    key: "priority",
    label: "Priority",
    render: (item) => <PriorityBadge priority={item.priority} />,
  },
  {
    key: "due_date",
    label: "Due Date",
    sortable: true,
    render: (item) =>
      item.due_date
        ? new Date(item.due_date).toLocaleDateString()
        : <span className="text-muted-foreground">—</span>,
  },
];

const ticketColumns: TableColumn<SupportTicket>[] = [
  {
    key: "subject",
    label: "Subject",
    sortable: true,
  },
  {
    key: "priority",
    label: "Priority",
    render: (item) => <PriorityBadge priority={item.priority} />,
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border capitalize">
        {item.status}
      </Badge>
    ),
  },
  {
    key: "created_at",
    label: "Created",
    sortable: true,
    render: (item) => new Date(item.created_at).toLocaleDateString(),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

function StaffDashboard() {
  const { user, roleConfig } = useAuth();

  // ── Role check (used by query `enabled` flags AND by render guard) ──────────
  // IMPORTANT: We compute this BEFORE the queries and gate the queries on it
  // via `enabled`, then early-return AFTER all hooks have been called.
  // Rules of Hooks: hooks must run in the same order every render, so the
  // role guard must NOT short-circuit before any useQuery call.
  const isAuthorized = !!roleConfig && ALLOWED_ROLES.has(roleConfig.role);
  const queriesEnabled = isAuthorized && !!user?.id;

  // ── Queries ─────────────────────────────────────────────────────────────────

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  const { data: tasks = [], isLoading: tasksLoading, isError: tasksError } = useQuery({
    queryKey: ["staff-tasks", user?.id],
    enabled: queriesEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, status, priority, due_date")
        .eq("user_id", user!.id)
        .order("due_date", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Task[];
    },
  });

  const { data: tickets = [], isLoading: ticketsLoading, isError: ticketsError } = useQuery({
    queryKey: ["staff-tickets", user?.id],
    enabled: queriesEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("id, subject, priority, status, created_at")
        .eq("assigned_to", user!.id)
        .neq("status", "resolved")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as SupportTicket[];
    },
  });

  const { data: clientCount = 0 } = useQuery({
    queryKey: ["staff-clients-count", user?.id],
    enabled: queriesEnabled,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .eq("assigned_staff_id", user!.id);
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ["staff-appointments", user?.id, todayIso],
    enabled: queriesEnabled,
    queryFn: async () => {
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      const { data, error } = await supabase
        .from("appointments")
        .select("id, title, start_time")
        .eq("worker_id", user!.id)
        .gte("start_time", todayIso)
        .lte("start_time", endOfDay.toISOString())
        .order("start_time", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Appointment[];
    },
  });

  // ── All future appointments for calendar ────────────────────────────────────
  const { data: allAppointments = [] } = useQuery({
    queryKey: ["staff-all-appointments", user?.id],
    enabled: queriesEnabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, title, start_time")
        .eq("worker_id", user!.id)
        .gte("start_time", todayIso)
        .order("start_time", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Appointment[];
    },
  });

  // ── Role guard (AFTER all hooks have been called) ──────────────────────────
  if (roleConfig && !ALLOWED_ROLES.has(roleConfig.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-sm w-full text-center p-8">
          <h2 className="text-xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You do not have staff privileges.</p>
          <Button asChild variant="outline">
            <Link to="/portal">Return to Portal</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // ── Derived values ──────────────────────────────────────────────────────────

  const openTasks = tasks.filter((t) => t.status !== "completed");

  const calendarEvents: CalendarEvent[] = allAppointments.map((a) => {
    const dt = new Date(a.start_time);
    return {
      id: a.id,
      title: a.title ?? "Appointment",
      date: a.start_time,
      time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "appointment",
    };
  });

  // ── Stat cards ──────────────────────────────────────────────────────────────

  const statCards: StatCardData[] = [
    {
      title: "My Tasks",
      value: openTasks.length,
      subtitle: "open tasks",
      icon: ListTodo,
    },
    {
      title: "Open Tickets",
      value: tickets.length,
      subtitle: "assigned to you",
      icon: Ticket,
    },
    {
      title: "My Clients",
      value: clientCount,
      subtitle: "assigned clients",
      icon: Users,
    },
    {
      title: "Today's Meetings",
      value: appointments.length,
      subtitle: "scheduled today",
      icon: CalendarDays,
    },
  ];

  // ── Loading state ────────────────────────────────────────────────────────────
  if (!roleConfig || (tasksLoading && ticketsLoading && appointmentsLoading)) {
    return <PortalLoadingSkeleton />;
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.title} data={card} />
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-primary" />
                  My Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasksError ? (
                  <ErrorState title="Failed to load tasks" />
                ) : (
                  <DataTable
                    data={tasks}
                    columns={taskColumns}
                    isLoading={tasksLoading}
                    searchPlaceholder="Search tasks..."
                    emptyTitle="No tasks assigned"
                    emptyDescription="You have no tasks assigned at the moment."
                    pageSize={8}
                  />
                )}
              </CardContent>
            </Card>

            {/* Open Tickets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  Open Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ticketsError ? (
                  <ErrorState title="Failed to load tickets" />
                ) : (
                  <DataTable
                    data={tickets}
                    columns={ticketColumns}
                    isLoading={ticketsLoading}
                    searchPlaceholder="Search tickets..."
                    emptyTitle="No open tickets"
                    emptyDescription="No tickets are currently assigned to you."
                    pageSize={8}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: 1/3 */}
          <div className="space-y-6">
            {/* Calendar */}
            <RealCalendar
              events={calendarEvents}
              title="My Schedule"
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    /* placeholder — log time */
                  }}
                >
                  <Clock className="h-4 w-4" />
                  Log Time
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/portal/my-tickets">
                    <Ticket className="h-4 w-4" />
                    Update Ticket
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <Link to="/portal/messages">
                    <MessageSquare className="h-4 w-4" />
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

export default StaffDashboard;
