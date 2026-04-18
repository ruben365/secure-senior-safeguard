/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { PortalLoadingSkeleton } from "@/components/portal/PortalLoadingSkeleton";
import { StatCard } from "@/components/shared/StatCard";
import { ActionQueue } from "@/components/shared/ActionQueue";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  GraduationCap,
  Users,
  MessageSquare,
  BookOpen,
  CheckCircle,
  XCircle,
  Calendar,
  Shield,
  PlusCircle,
  Database,
} from "lucide-react";
import type { ActionItem, StatCardData } from "@/types/portal";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  status: string;
  created_at: string;
}

interface ZoomClass {
  id: string;
  title: string;
  start_time: string;
  enrollment_count?: number | null;
}

function CoordinatorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { roleConfig } = useAuth();
  const queryClient = useQueryClient();
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  // ── Role check (used by query `enabled` flags AND by render guard) ────────
  // IMPORTANT: We compute this BEFORE the queries and gate the queries on it
  // via `enabled`, then early-return AFTER all hooks have been called.
  // Rules of Hooks: hooks must run in the same order every render, so the
  // role guard must NOT short-circuit before any useQuery call.
  const isAuthorized =
    roleConfig?.role === "training_coordinator" ||
    roleConfig?.role === "admin";

  // ── Queries ───────────────────────────────────────────────────────────────
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const now = new Date().toISOString();

  const { data: coursesData, isLoading: loadingCourses } = useQuery({
    queryKey: ["coordinator", "courses"],
    enabled: isAuthorized,
    queryFn: async () => {
      const [{ count: total }, { count: published }] = await Promise.all([
        supabase
          .from("courses")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("courses")
          .select("*", { count: "exact", head: true })
          .eq("status", "published"),
      ]);
      return { total: total ?? 0, published: published ?? 0 };
    },
  });

  const { data: enrollmentsData, isLoading: loadingEnrollments } = useQuery({
    queryKey: ["coordinator", "enrollments"],
    enabled: isAuthorized,
    queryFn: async () => {
      const [{ count: total }, { count: weekly }] = await Promise.all([
        supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true }),
        supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true })
          .gte("created_at", sevenDaysAgo),
      ]);
      return { total: total ?? 0, weekly: weekly ?? 0 };
    },
  });

  const {
    data: testimonials,
    isLoading: loadingTestimonials,
    isError: testimonialsError,
    refetch: refetchTestimonials,
  } = useQuery({
    queryKey: ["coordinator", "testimonials"],
    enabled: isAuthorized,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, content, status, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });

  const { data: kbCount, isLoading: loadingKb } = useQuery({
    queryKey: ["coordinator", "knowledge_base"],
    enabled: isAuthorized,
    queryFn: async () => {
      const { count } = await (supabase as any)
        .from("knowledge_base_articles")
        .select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: upcomingSessions, isLoading: loadingSessions } = useQuery({
    queryKey: ["coordinator", "zoom_classes"],
    enabled: isAuthorized,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("zoom_classes")
        .select("id, title, start_time, enrollment_count")
        .gte("start_time", now)
        .order("start_time", { ascending: true })
        .limit(5);
      if (error) throw error;
      return (data ?? []) as ZoomClass[];
    },
  });

  const { data: scamCount, isLoading: loadingScam } = useQuery({
    queryKey: ["coordinator", "scam_submissions"],
    enabled: isAuthorized,
    queryFn: async () => {
      const { count } = await supabase
        .from("scam_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo);
      return count ?? 0;
    },
  });

  // ── Role guard (AFTER all hooks have been called) ────────────────────────
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-sm">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Access Denied
          </h2>
          <p className="text-muted-foreground mb-4">
            You do not have coordinator privileges.
          </p>
          <Button asChild variant="ghost">
            <Link to="/portal">Return to Portal</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const isLoading =
    loadingCourses ||
    loadingEnrollments ||
    loadingTestimonials ||
    loadingKb ||
    loadingSessions ||
    loadingScam;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleTestimonialAction = async (
    id: string,
    action: "approved" | "rejected"
  ) => {
    if (submittingId) return;
    setSubmittingId(id);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: action })
        .eq("id", id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title:
            action === "approved"
              ? "Testimonial Approved"
              : "Testimonial Rejected",
        });
        await queryClient.invalidateQueries({
          queryKey: ["coordinator", "testimonials"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["coordinator", "courses"],
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err?.message ?? "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setSubmittingId(null);
    }
  };

  if (isLoading) return <PortalLoadingSkeleton />;

  // ── Derived data ──────────────────────────────────────────────────────────
  const statCards: StatCardData[] = [
    {
      title: "Active Courses",
      value: coursesData?.published ?? 0,
      subtitle: `${coursesData?.total ?? 0} total`,
      icon: GraduationCap,
    },
    {
      title: "Enrollments This Week",
      value: enrollmentsData?.weekly ?? 0,
      subtitle: `${enrollmentsData?.total ?? 0} total`,
      icon: Users,
    },
    {
      title: "Pending Reviews",
      value: testimonials?.length ?? 0,
      subtitle: "Testimonials awaiting approval",
      icon: MessageSquare,
    },
    {
      title: "Knowledge Base",
      value: kbCount ?? 0,
      subtitle: "Articles published",
      icon: BookOpen,
    },
  ];

  const testimonialActionItems: ActionItem[] = (testimonials ?? []).map(
    (t) => ({
      id: t.id,
      title: t.name,
      description: t.content,
      priority: "medium" as const,
      icon: MessageSquare,
      onAction: () => handleTestimonialAction(t.id, "approved"),
      actionLabel: "Approve",
    })
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Training Coordinator</h1>
        <p className="text-sm text-muted-foreground">Courses · Enrollments · Testimonials</p>
      </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.title} data={card} />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Left column (2/3) ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Reviews via ActionQueue */}
            {testimonialsError ? (
              <ErrorState
                title="Could not load testimonials"
                description="There was a problem fetching pending reviews."
                onRetry={() => refetchTestimonials()}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-base font-semibold">
                    Pending Reviews
                  </CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/admin/content/testimonials">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {(testimonials ?? []).length === 0 ? (
                    <div className="px-6 pb-6">
                      <EmptyState
                        title="No pending testimonials"
                        description="All testimonials have been reviewed."
                        className="py-8"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col divide-y divide-border">
                      {(testimonials ?? []).map((t) => (
                        <div key={t.id} className="px-6 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {t.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {t.content}
                              </p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-green-500 hover:bg-green-500/10"
                                disabled={submittingId === t.id}
                                onClick={() =>
                                  handleTestimonialAction(t.id, "approved")
                                }
                                title="Approve"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                disabled={submittingId === t.id}
                                onClick={() =>
                                  handleTestimonialAction(t.id, "rejected")
                                }
                                title="Reject"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loadingSessions ? null : (upcomingSessions ?? []).length ===
                  0 ? (
                  <div className="px-6 pb-6">
                    <EmptyState
                      title="No upcoming sessions"
                      description="There are no scheduled Zoom classes in the near future."
                      className="py-8"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-border">
                    {(upcomingSessions ?? []).map((session) => {
                      const dt = new Date(session.start_time);
                      const dateStr = dt.toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      });
                      const timeStr = dt.toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      });
                      return (
                        <div
                          key={session.id}
                          className="flex items-center justify-between px-6 py-3 hover:bg-muted/50 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">
                              {session.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {dateStr} · {timeStr}
                            </p>
                          </div>
                          {session.enrollment_count != null && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-4">
                              <Users className="w-3.5 h-3.5" />
                              <span>{session.enrollment_count}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Right column (1/3) ── */}
          <div className="space-y-6">
            {/* Training Pipeline mini stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Training Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Published Courses
                  </span>
                  <span className="font-semibold text-foreground">
                    {coursesData?.published ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total Enrollments
                  </span>
                  <span className="font-semibold text-foreground">
                    {enrollmentsData?.total ?? 0}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold text-foreground">—%</span>
                </div>
              </CardContent>
            </Card>

            {/* Scam Shield */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Scam Shield
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Recent submissions (last 7 days)
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {scamCount ?? 0}
                </p>
                {/* "View Threat Center" link removed - no /portal/threat-center route exists */}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* "Create Course" link removed - no /admin/courses CRUD exists */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Link to="/admin/content/knowledge-base">
                    <Database className="w-4 h-4 mr-2" />
                    Manage Knowledge Base
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoordinatorDashboard;
