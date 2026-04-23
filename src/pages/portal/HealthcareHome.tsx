import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/shared/StatCard";
import { RealCalendar } from "@/components/shared/RealCalendar";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Calendar,
  ListTodo,
  Shield,
  Clock,
  FileText,
  Award,
  CalendarOff,
} from "lucide-react";
import type { CalendarEvent } from "@/types/portal";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  status: string | null;
}

interface Appointment {
  id: string;
  title: string;
  scheduled_start: string;
  client_id: string | null;
  clients?: { first_name: string; last_name: string } | null;
}

interface Task {
  id: string;
  title: string;
  status: string | null;
}

function getClientStatusVariant(
  status: string | null
): "default" | "secondary" | "destructive" | "outline" {
  switch (status?.toLowerCase()) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "critical":
      return "destructive";
    default:
      return "outline";
  }
}

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function HealthcareHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: clients, isLoading: loadingClients } = useQuery<Client[]>({
    queryKey: ["healthcare-clients", user?.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("id, first_name, last_name, status")
          .eq("assigned_staff_id", user!.id)
          .order("last_name", { ascending: true });
        if (error) throw error;
        return (data ?? []) as Client[];
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  const { data: appointments, isLoading: loadingAppointments } = useQuery<Appointment[]>({
    queryKey: ["healthcare-appointments", user?.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("id, title, scheduled_start, client_id, clients(first_name, last_name)")
          .eq("worker_id", user!.id)
          .gte("scheduled_start", todayStart.toISOString())
          .order("scheduled_start", { ascending: true })
          .limit(10);
        if (error) throw error;
        type RawAppointment = typeof data[number] & { clients: { first_name: string; last_name: string }[] | { first_name: string; last_name: string } | null };
        return ((data ?? []) as RawAppointment[]).map((d) => ({
          ...d,
          clients: Array.isArray(d.clients) ? d.clients[0] ?? null : d.clients ?? null,
        })) as Appointment[];
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  const { data: tasks, isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ["healthcare-tasks", user?.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("id, title, status")
          .eq("user_id", user!.id)
          .neq("status", "completed");
        if (error) throw error;
        return (data ?? []) as Task[];
      } catch {
        return [];
      }
    },
    enabled: !!user,
  });

  const todaysAppointments = (appointments ?? []).filter(
    (a) => isToday(a.scheduled_start)
  );

  const calendarEvents: CalendarEvent[] = (appointments ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    date: a.scheduled_start,
    time: new Date(a.scheduled_start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type: "appointment",
  }));

  const statCards = [
    {
      title: "My Patients",
      value: loadingClients ? "—" : (clients?.length ?? 0),
      icon: Users,
    },
    {
      title: "Appointments Today",
      value: loadingAppointments ? "—" : todaysAppointments.length,
      icon: Calendar,
    },
    {
      title: "Open Tasks",
      value: loadingTasks ? "—" : (tasks?.length ?? 0),
      icon: ListTodo,
    },
    {
      title: "Compliance",
      value: "Active",
      icon: Shield,
    },
  ];

  return (
    <div className="container mx-auto py-4 space-y-4 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Healthcare Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Patient care &amp; scheduling overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <StatCard key={s.title} data={s} />
        ))}
      </div>

      {/* Main layout */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          {/* My Patients */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                My Patients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loadingClients ? (
                <div className="px-4 pb-4 space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : !clients || clients.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No patients assigned"
                  description="Patients will appear here once they are assigned to you."
                  className="py-6"
                />
              ) : (
                <ul className="divide-y divide-border">
                  {clients.map((client) => (
                    <li
                      key={client.id}
                      onClick={() => navigate(`/admin/clients/${client.id}`)}
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {client.first_name} {client.last_name}
                      </span>
                      <Badge variant={getClientStatusVariant(client.status)} className="capitalize text-xs">
                        {client.status ?? "Unknown"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Today&apos;s Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loadingAppointments ? (
                <div className="px-4 pb-4 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              ) : todaysAppointments.length === 0 ? (
                <EmptyState
                  icon={CalendarOff}
                  title="No appointments today"
                  description="Your schedule is clear for today."
                  className="py-6"
                />
              ) : (
                <ul className="divide-y divide-border">
                  {todaysAppointments.map((apt) => {
                    const time = new Date(apt.scheduled_start).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    );
                    const patientName = apt.clients
                      ? `${apt.clients.first_name} ${apt.clients.last_name}`
                      : "Unknown patient";
                    return (
                      <li key={apt.id} className="flex items-center gap-4 px-4 py-3">
                        <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">
                          {time}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {apt.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {patientName}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-4">
          {/* Calendar */}
          {loadingAppointments ? (
            <Card>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-64 w-full rounded-md" />
              </CardContent>
            </Card>
          ) : (
            <RealCalendar events={calendarEvents} title="My Schedule" />
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-0">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => {}}
              >
                <FileText className="h-4 w-4" />
                Submit Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => {}}
              >
                <Award className="h-4 w-4" />
                View Certifications
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled
                title="Coming soon"
              >
                <CalendarOff className="h-4 w-4" />
                Request Time Off (coming soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
