import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Calendar,
  Shield,
  Clock,
  CalendarDays,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/shared/StatCard";
import { RealCalendar } from "@/components/shared/RealCalendar";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatCardData, CalendarEvent } from "@/types/portal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Client {
  id: string;
  first_name: string | null;
  last_name: string | null;
  status: string | null;
}

interface Appointment {
  id: string;
  title: string | null;
  start_time: string;
  client_id: string | null;
}

interface TimeOffRequest {
  id: string;
  status: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clientStatusVariant(status: string | null): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "active": return "default";
    case "inactive": return "secondary";
    case "at_risk": return "destructive";
    default: return "outline";
  }
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-96 rounded-lg" />
          <Skeleton className="h-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CaregiverHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const today = new Date().toISOString();

  // Assigned clients
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ["caregiver-clients", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("id, first_name, last_name, status")
          .eq("assigned_staff_id", user!.id);
        if (error) throw error;
        return (data ?? []) as Client[];
      } catch {
        return [] as Client[];
      }
    },
  });

  // Upcoming appointments
  const { data: appointments, isLoading: apptLoading } = useQuery({
    queryKey: ["caregiver-appointments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .select("id, title, start_time, client_id")
          .eq("worker_id", user!.id)
          .gte("start_time", today)
          .order("start_time", { ascending: true })
          .limit(10);
        if (error) throw error;
        return (data ?? []) as Appointment[];
      } catch {
        return [] as Appointment[];
      }
    },
  });

  // Client threat count — fetch client IDs first, then count threats
  const clientIds = clients?.map((c) => c.id) ?? [];

  const { data: clientThreatCount, isLoading: threatsLoading } = useQuery({
    queryKey: ["caregiver-threats", clientIds],
    enabled: clientIds.length > 0,
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from("threat_events")
          .select("id", { count: "exact", head: true })
          .in("profile_id", clientIds);
        if (error) throw error;
        return count ?? 0;
      } catch {
        return 0;
      }
    },
  });

  // Time-off requests
  const { data: timeOffData, isLoading: timeOffLoading } = useQuery({
    queryKey: ["caregiver-time-off", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("time_off_requests")
          .select("id, status")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(3);
        if (error) throw error;
        return (data ?? []) as TimeOffRequest[];
      } catch {
        return [] as TimeOffRequest[];
      }
    },
  });

  const isLoading =
    clientsLoading || apptLoading || (clientIds.length > 0 && threatsLoading) || timeOffLoading;

  // Derived values
  const clientCount = clients?.length ?? 0;
  const appointmentCount = appointments?.length ?? 0;
  const alertCount = clientThreatCount ?? 0;
  const pendingTimeOff =
    timeOffData?.filter((t) => t.status === "pending").length ?? 0;

  // Stat cards
  const statCards: StatCardData[] = [
    {
      title: "My Clients",
      value: clientCount,
      subtitle: "Assigned to you",
      icon: Users,
    },
    {
      title: "Upcoming Appointments",
      value: appointmentCount,
      subtitle: "Scheduled ahead",
      icon: Calendar,
    },
    {
      title: "Client Alerts",
      value: alertCount,
      subtitle: "Across all clients",
      icon: Shield,
    },
    {
      title: "Time Off",
      value: pendingTimeOff,
      subtitle: "Pending requests",
      icon: Clock,
    },
  ];

  // Map appointments to CalendarEvent
  const calendarEvents: CalendarEvent[] = (appointments ?? []).map((appt) => ({
    id: appt.id,
    title: appt.title ?? "Appointment",
    date: appt.start_time,
    time: new Date(appt.start_time).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }),
    type: "appointment",
  }));

  // Build a client lookup map for appointments
  const clientMap = new Map<string, Client>(
    (clients ?? []).map((c) => [c.id, c])
  );

  const upcomingFive = (appointments ?? []).slice(0, 5);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.title} data={card} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          {/* My Clients */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold">My Clients</CardTitle>
              {clientCount > 0 && (
                <Badge variant="secondary">{clientCount}</Badge>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {clientCount === 0 ? (
                <div className="px-6 pb-6">
                  <EmptyState
                    icon={Users}
                    title="No clients assigned"
                    description="You have no clients assigned to you yet."
                    className="py-8"
                  />
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {clients!.map((client) => (
                    <li
                      key={client.id}
                      className="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => navigate(`/portal/clients/${client.id}`)}
                    >
                      <span className="text-sm font-medium text-foreground">
                        {[client.first_name, client.last_name].filter(Boolean).join(" ") || "Unnamed client"}
                      </span>
                      <Badge
                        variant={clientStatusVariant(client.status)}
                        className="capitalize"
                      >
                        {client.status ?? "unknown"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold">Upcoming Appointments</CardTitle>
              {appointmentCount > 0 && (
                <Badge variant="secondary">{appointmentCount}</Badge>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {upcomingFive.length === 0 ? (
                <div className="px-6 pb-6">
                  <EmptyState
                    icon={CalendarDays}
                    title="No upcoming appointments"
                    description="Your schedule is clear for now."
                    className="py-8"
                  />
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {upcomingFive.map((appt) => {
                    const client = appt.client_id ? clientMap.get(appt.client_id) : undefined;
                    const clientName = client
                      ? [client.first_name, client.last_name].filter(Boolean).join(" ")
                      : null;
                    return (
                      <li key={appt.id} className="px-6 py-3">
                        <p className="text-sm font-medium text-foreground">
                          {appt.title ?? "Appointment"}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(appt.start_time)}
                          </span>
                          {clientName && (
                            <>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">{clientName}</span>
                            </>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Calendar */}
          <RealCalendar
            events={calendarEvents}
            title="My Schedule"
          />

          {/* Availability */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Manage your working hours, set time-off, and keep your schedule up to date.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => navigate("/portal/availability")}
              >
                Manage availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
