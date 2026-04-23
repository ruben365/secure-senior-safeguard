import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DashboardHealth {
  id: string;
  dashboard_name: string;
  dashboard_url: string;
  status: "healthy" | "degraded" | "offline";
  last_check: string;
  response_time_ms: number | null;
  error_message: string | null;
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export default function SuperAdminDashboardHealth() {
  const [dashboards, setDashboards] = useState<DashboardHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchDashboardHealth();
  }, []);

  const fetchDashboardHealth = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("dashboard_health")
        .select("*")
        .order("dashboard_name");

      if (error) throw error;
      setDashboards((data as DashboardHealth[]) || []);
    } catch (error) {
      console.error("Error fetching dashboard health:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkDashboardHealth = async () => {
    setChecking(true);

    try {
      for (const dashboard of dashboards) {
        if (!isSafeUrl(dashboard.dashboard_url)) {
          await supabase
            .from("dashboard_health")
            .update({
              status: "offline",
              last_check: new Date().toISOString(),
              error_message: "Invalid or unsafe URL",
            })
            .eq("id", dashboard.id);
          continue;
        }

        try {
          const startTime = performance.now();

          // Try to fetch the dashboard page
          const response = await fetch(dashboard.dashboard_url, {
            method: "HEAD",
            mode: "same-origin",
          });

          const endTime = performance.now();
          const responseTime = Math.round(endTime - startTime);

          const newStatus = response.ok ? "healthy" : "degraded";

          await supabase
            .from("dashboard_health")
            .update({
              status: newStatus,
              last_check: new Date().toISOString(),
              response_time_ms: responseTime,
              error_message: response.ok ? null : `HTTP ${response.status}`,
            })
            .eq("id", dashboard.id);
        } catch (error) {
          await supabase
            .from("dashboard_health")
            .update({
              status: "offline",
              last_check: new Date().toISOString(),
              error_message: error.message,
            })
            .eq("id", dashboard.id);
        }
      }

      await fetchDashboardHealth();
    } finally {
      setChecking(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      healthy: "bg-success",
      degraded: "bg-warning",
      offline: "bg-destructive",
    };

    return (
      <Badge className={colors[status] || "bg-muted"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const healthyCount = dashboards.filter((d) => d.status === "healthy").length;
  const overallHealth =
    dashboards.length > 0 ? (healthyCount / dashboards.length) * 100 : 0;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <Monitor className="w-5 h-5 text-primary" />
              Dashboard Health Monitor
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Monitor connectivity of all platform dashboards
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkDashboardHealth}
            disabled={checking}
            className="border-border text-muted-foreground hover:bg-muted"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${checking ? "animate-spin" : ""}`}
            />
            Check All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-5">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Overall Health */}
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Overall System Health
                </span>
                <span className="text-sm text-muted-foreground">
                  {healthyCount}/{dashboards.length} healthy
                </span>
              </div>
              <Progress value={overallHealth} className="h-2" />
            </div>

            {/* Dashboard List */}
            <div className="space-y-3">
              {dashboards.map((dashboard) => (
                <div
                  key={dashboard.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(dashboard.status)}
                    <div>
                      <p className="font-medium text-foreground">
                        {dashboard.dashboard_name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{dashboard.dashboard_url}</span>
                        {dashboard.response_time_ms && (
                          <>
                            <span>•</span>
                            <span>{dashboard.response_time_ms}ms</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {getStatusBadge(dashboard.status)}
                      <p className="text-xs text-muted-foreground mt-1">
                        {dashboard.last_check
                          ? formatDistanceToNow(
                              new Date(dashboard.last_check),
                              { addSuffix: true },
                            )
                          : "Never checked"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (isSafeUrl(dashboard.dashboard_url)) {
                          window.open(dashboard.dashboard_url, "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {dashboards.length === 0 && (
              <div className="text-center py-5 text-muted-foreground">
                <Monitor className="w-7 h-7 mx-auto mb-4 opacity-50" />
                <p>No dashboards configured</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
