import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

import { DashboardKPICards } from "@/components/admin/neon/DashboardKPICards";
import { NeonAdminModules } from "@/components/admin/neon/NeonAdminModules";
import { NeonManagementTabs } from "@/components/admin/neon/NeonManagementTabs";
import { NeonTasksCard } from "@/components/admin/neon/NeonTasksCard";
import { NeonEventsCard } from "@/components/admin/neon/NeonEventsCard";
import { NeonCalendarCard } from "@/components/admin/neon/NeonCalendarCard";
import { NeonQuickActions } from "@/components/admin/neon/NeonQuickActions";

import { NeonPendingRequests } from "@/components/admin/neon/NeonPendingRequests";
import { PageSkeleton } from "@/components/admin/PageSkeleton";

interface ModuleStats {
  pendingBookings: number;
  pendingInquiries: number;
  pendingApplications: number;
  unreadMessages: number;
  lowStockProducts: number;
}

interface KpiStats {
  totalStaff: number;
  newsletterSubscribers: number;
}

const OPS_PIPELINES = [
  { name: "Clients",  table: "clients",          countField: "status", healthyValue: "active"    },
  { name: "Bookings", table: "booking_requests",  countField: "status", healthyValue: "confirmed" },
  { name: "Threats",  table: "threat_events",     countField: "status", healthyValue: "resolved"  },
  { name: "Tickets",  table: "support_tickets",   countField: "status", healthyValue: "resolved"  },
  { name: "Training", table: "enrollments",       countField: "status", healthyValue: "completed" },
] as const;

export default function AdminDashboardContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<Record<string, unknown>[]>([]);
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleStats, setModuleStats] = useState<ModuleStats>({
    pendingBookings: 0,
    pendingInquiries: 0,
    pendingApplications: 0,
    unreadMessages: 0,
    lowStockProducts: 0,
  });
  const [kpiStats, setKpiStats] = useState<KpiStats>({
    totalStaff: 0,
    newsletterSubscribers: 0,
  });

  useEffect(() => {
    loadAllDashboardData();
  }, []);

  // Ops Health: fetch total + healthy counts for all 5 pipelines in parallel
  const { data: opsHealth } = useQuery({
    queryKey: ["ops-health"],
    queryFn: async () => {
      const results = await Promise.all(
        OPS_PIPELINES.map(async (p) => {
          const [totalRes, healthyRes] = await Promise.all([
            supabase.from(p.table as Parameters<typeof supabase.from>[0]).select("*", { count: "exact", head: true }),
            supabase.from(p.table as Parameters<typeof supabase.from>[0]).select("*", { count: "exact", head: true }).eq(p.countField, p.healthyValue),
          ]);
          return {
            name: p.name,
            total: totalRes.count ?? 0,
            healthy: healthyRes.count ?? 0,
          };
        })
      );
      return results;
    },
    staleTime: 60_000,
  });

  const loadAllDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [
        bookingsResult,
        applicationsResult,
        messagesResult,
        inquiriesResult,
        lowStockResult,
        tasksResult,
        eventsResult,
        staffResult,
        subscriberResult,
      ] = await Promise.all([
        supabase
          .from("booking_requests")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("job_applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("internal_messages")
          .select("*", { count: "exact", head: true })
          .eq("is_read", false),
        supabase
          .from("service_inquiries")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .lt("stock_quantity", 10),
        supabase
          .from("admin_tasks")
          .select("*")
          .eq("user_id", user.id)
          .order("due_date", { ascending: true })
          .limit(5),
        supabase
          .from("admin_events")
          .select("*")
          .eq("user_id", user.id)
          .gte("start_time", new Date().toISOString())
          .order("start_time", { ascending: true })
          .limit(5),
        supabase
          .from("user_roles")
          .select("*", { count: "exact", head: true })
          .in("role", ["staff", "secretary", "training_coordinator", "business_consultant", "support_specialist"]),
        supabase
          .from("newsletter_subscribers")
          .select("*", { count: "exact", head: true }),
      ]);

      const pendingBookings = bookingsResult.count || 0;
      const unreadMessages = messagesResult.count || 0;

      setModuleStats({
        pendingBookings,
        pendingInquiries: inquiriesResult.count || 0,
        pendingApplications: applicationsResult.count || 0,
        unreadMessages,
        lowStockProducts: lowStockResult.count || 0,
      });

      setKpiStats({
        totalStaff: staffResult.count || 0,
        newsletterSubscribers: subscriberResult.count || 0,
      });

      if (tasksResult.data) setTasks(tasksResult.data);
      if (eventsResult.data) setEvents(eventsResult.data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageSkeleton variant="dashboard" />;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Derive KPI card stats by combining module stats with kpi-only stats
  const kpiCardStats = {
    pendingBookings: moduleStats.pendingBookings,
    unreadMessages: moduleStats.unreadMessages,
    totalStaff: kpiStats.totalStaff,
    newsletterSubscribers: kpiStats.newsletterSubscribers,
  };

  return (
    <div className="p-4 lg:p-5 max-w-[1400px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#F9FAFB] tracking-tight">
            Admin Overview
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">{today}</p>
        </div>
      </div>

      {/* Ops Health Strip */}
      {opsHealth && (
        <div className="flex flex-wrap gap-3">
          {opsHealth.map((p) => {
            const ratio = p.total > 0 ? p.healthy / p.total : 0;
            const dotColor =
              ratio > 0.5
                ? "bg-green-500"
                : ratio >= 0.25
                ? "bg-yellow-400"
                : "bg-red-500";
            const borderColor =
              ratio > 0.5
                ? "border-l-green-500"
                : ratio >= 0.25
                ? "border-l-yellow-400"
                : "border-l-red-500";
            return (
              <div
                key={p.name}
                className={`flex items-center gap-2 px-3 py-2 bg-[#1F2937] border border-[#374151] border-l-4 ${borderColor} rounded-lg min-w-[110px]`}
              >
                <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-medium text-[#F9FAFB]">{p.name}</span>
                  <span className="text-[11px] text-[#6B7280]">{p.healthy}/{p.total}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* KPI Cards */}
      <DashboardKPICards stats={kpiCardStats} />

      {/* Modules */}
      <NeonAdminModules stats={moduleStats} />

      {/* Two-column: Management Tabs + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          <NeonManagementTabs />
          <NeonPendingRequests />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <NeonQuickActions />
          <NeonCalendarCard date={date} onSelect={setDate} />
        </div>
      </div>

      {/* Tasks & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NeonTasksCard tasks={tasks as never} />
        <NeonEventsCard events={events as never} />
      </div>
    </div>
  );
}
