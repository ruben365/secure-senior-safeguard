import { useState, useEffect } from "react";
import { Command } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { DashboardKPICards } from "@/components/admin/neon/DashboardKPICards";
import { NeonAdminModules } from "@/components/admin/neon/NeonAdminModules";
import { NeonManagementTabs } from "@/components/admin/neon/NeonManagementTabs";
import { NeonTasksCard } from "@/components/admin/neon/NeonTasksCard";
import { NeonEventsCard } from "@/components/admin/neon/NeonEventsCard";
import { NeonCalendarCard } from "@/components/admin/neon/NeonCalendarCard";
import { NeonQuickActions } from "@/components/admin/neon/NeonQuickActions";

import { NeonPendingRequests } from "@/components/admin/neon/NeonPendingRequests";
import { PageSkeleton } from "@/components/admin/PageSkeleton";

export default function AdminDashboardContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleStats, setModuleStats] = useState({
    pendingBookings: 0,
    pendingInquiries: 0,
    pendingApplications: 0,
    unreadMessages: 0,
    lowStockProducts: 0,
  });
  const [kpiStats, setKpiStats] = useState({
    pendingBookings: 0,
    unreadMessages: 0,
    totalStaff: 0,
    newsletterSubscribers: 0,
  });

  useEffect(() => {
    loadDashboardData();
    loadModuleStats();
  }, []);

  const loadModuleStats = async () => {
    try {
      const { count: bookingsCount } = await supabase
        .from("booking_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: applicationsCount } = await supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: messagesCount } = await supabase
        .from("internal_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      const { count: inquiriesCount } = await supabase
        .from("service_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: lowStockCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .lt("stock_quantity", 10);

      setModuleStats({
        pendingBookings: bookingsCount || 0,
        pendingInquiries: inquiriesCount || 0,
        pendingApplications: applicationsCount || 0,
        unreadMessages: messagesCount || 0,
        lowStockProducts: lowStockCount || 0,
      });

      setKpiStats(prev => ({
        ...prev,
        pendingBookings: bookingsCount || 0,
        unreadMessages: messagesCount || 0,
      }));
    } catch (err) {
      console.error("Error loading module stats:", err);
    }
  };

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: tasksData } = await supabase
        .from("admin_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })
        .limit(5);

      if (tasksData) setTasks(tasksData);

      const { data: eventsData } = await supabase
        .from("admin_events")
        .select("*")
        .eq("user_id", user.id)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
        .limit(5);

      if (eventsData) setEvents(eventsData);

      const { count: staffCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .in("role", ["staff", "secretary", "training_coordinator", "business_consultant", "support_specialist"]);

      const { count: subscriberCount } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true });

      setKpiStats(prev => ({
        ...prev,
        totalStaff: staffCount || 0,
        newsletterSubscribers: subscriberCount || 0,
      }));
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

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#F9FAFB] tracking-tight">
            Admin Overview
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">{today}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardKPICards stats={kpiStats} />

      {/* Modules */}
      <NeonAdminModules stats={moduleStats} />

      {/* Two-column: Management Tabs + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <NeonManagementTabs />
          <NeonPendingRequests />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <NeonQuickActions />
          <NeonCalendarCard date={date} onSelect={setDate} />
        </div>
      </div>

      {/* Tasks & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeonTasksCard tasks={tasks} />
        <NeonEventsCard events={events} />
      </div>
    </div>
  );
}
