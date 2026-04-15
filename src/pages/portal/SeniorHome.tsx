import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Shield,
  AlertTriangle,
  GraduationCap,
  Package,
  Flag,
  Link as LinkIcon,
  HeadphonesIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { StatCardData } from "@/types/portal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScamSubmission {
  id: string;
  title: string | null;
  description: string | null;
  status: string | null;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusVariant(status: string | null): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "confirmed": return "destructive";
    case "pending": return "secondary";
    case "resolved": return "default";
    default: return "outline";
  }
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
          <Skeleton className="h-32 rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-40 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SeniorHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Threat events
  const { data: threatData, isLoading: threatsLoading } = useQuery({
    queryKey: ["senior-threats", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("threat_events")
          .select("id, status")
          .eq("profile_id", user!.id);
        if (error) throw error;
        return data ?? [];
      } catch {
        return [];
      }
    },
  });

  // Enrollments
  const { data: enrollmentData, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["senior-enrollments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("enrollments")
          .select("id, status")
          .eq("user_id", user!.id);
        if (error) throw error;
        return data ?? [];
      } catch {
        return [];
      }
    },
  });

  // Active subscriptions
  const { data: subscriptionData, isLoading: subsLoading } = useQuery({
    queryKey: ["senior-subscriptions", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from("subscriptions")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user!.id)
          .eq("status", "active");
        if (error) throw error;
        return count ?? 0;
      } catch {
        return 0;
      }
    },
  });

  // Recent scam submissions
  const { data: submissionsData, isLoading: submissionsLoading } = useQuery({
    queryKey: ["senior-submissions", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("scam_submissions")
          .select("id, title, description, status, created_at")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(5);
        if (error) throw error;
        return (data ?? []) as ScamSubmission[];
      } catch {
        return [] as ScamSubmission[];
      }
    },
  });

  const isLoading =
    threatsLoading || enrollmentsLoading || subsLoading || submissionsLoading;

  // Derived numbers
  const totalThreats = threatData?.length ?? 0;
  const blockedThreats = threatData?.filter((t) => t.status === "blocked").length ?? 0;
  const protectionScore =
    totalThreats === 0 ? 100 : Math.round((blockedThreats / totalThreats) * 100);

  const totalEnrollments = enrollmentData?.length ?? 0;
  const completedEnrollments =
    enrollmentData?.filter((e) => e.status === "completed").length ?? 0;
  const trainingProgress =
    totalEnrollments === 0
      ? 0
      : Math.round((completedEnrollments / totalEnrollments) * 100);

  const activeServices = subscriptionData ?? 0;

  // Stat cards
  const statCards: StatCardData[] = [
    {
      title: "Protection Score",
      value: `${protectionScore}%`,
      subtitle: "Shield effectiveness",
      icon: Shield,
    },
    {
      title: "Threats Blocked",
      value: blockedThreats,
      subtitle: `of ${totalThreats} detected`,
      icon: AlertTriangle,
    },
    {
      title: "Training Progress",
      value: `${trainingProgress}%`,
      subtitle: `${completedEnrollments} of ${totalEnrollments} completed`,
      icon: GraduationCap,
      href: "/portal/my-courses",
    },
    {
      title: "Active Services",
      value: activeServices,
      subtitle: "Current subscriptions",
      icon: Package,
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-6">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-6 space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.title} data={card} />
        ))}
      </div>

      {/* Main grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column — 2/3 width */}
        <div className="md:col-span-2 space-y-6">
          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!submissionsData || submissionsData.length === 0 ? (
                <div className="px-6 pb-6">
                  <EmptyState
                    icon={AlertTriangle}
                    title="No recent alerts"
                    description="You have not submitted any scam reports yet."
                    className="py-8"
                  />
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {submissionsData.map((submission) => (
                    <li
                      key={submission.id}
                      className="flex items-start gap-3 px-6 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {submission.title ?? "Untitled submission"}
                        </p>
                        {submission.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {submission.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(submission.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge variant={statusVariant(submission.status)} className="shrink-0 capitalize">
                        {submission.status ?? "unknown"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex flex-col h-auto gap-2 py-4"
                onClick={() => navigate("/training/ai-analysis")}
              >
                <Flag className="h-5 w-5 text-destructive" />
                <span className="text-xs font-medium">Report a Scam</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto gap-2 py-4"
                onClick={() => navigate("/portal/my-tickets")}
              >
                <HeadphonesIcon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium">Contact Support</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col h-auto gap-2 py-4"
                onClick={() => navigate("/training/ai-analysis")}
              >
                <LinkIcon className="h-5 w-5 text-warning" />
                <span className="text-xs font-medium">Check a Link</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-4">
          {/* My Courses mini-section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Enrolled</span>
                <span className="text-sm font-semibold text-foreground">{totalEnrollments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-sm font-semibold text-foreground">{completedEnrollments}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full mt-1"
                onClick={() => navigate("/portal/my-courses")}
              >
                View all courses
              </Button>
            </CardContent>
          </Card>

          {/* Family Network — coming soon */}
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Family Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Coming soon — connect with your caregivers to share alerts and stay protected together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
