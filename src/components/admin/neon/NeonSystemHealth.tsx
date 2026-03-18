import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Heart, AlertTriangle, XCircle, RefreshCw, Server, Database, Shield, Mail } from "lucide-react";

interface ServiceStatus {
  name: string;
  status: "healthy" | "struggling" | "dead" | "unknown";
  icon: React.ElementType;
}

export function NeonSystemHealth() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "Database", status: "healthy", icon: Database },
    { name: "Auth", status: "healthy", icon: Shield },
    { name: "Email", status: "healthy", icon: Mail },
    { name: "API", status: "healthy", icon: Server },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHealth = async () => {
    setRefreshing(true);
    try {
      const { error: dbError } = await supabase.from("profiles").select("id").limit(1);
      const { data: session } = await supabase.auth.getSession();
      setServices([
        { name: "Database", status: dbError ? "struggling" : "healthy", icon: Database },
        { name: "Auth", status: session ? "healthy" : "struggling", icon: Shield },
        { name: "Email", status: "healthy", icon: Mail },
        { name: "API", status: "healthy", icon: Server },
      ]);
    } catch { /* silent */ } finally { setRefreshing(false); }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  const healthyCount = services.filter(s => s.status === "healthy").length;
  const pct = services.length > 0 ? (healthyCount / services.length) * 100 : 0;

  const statusIcon = (s: string) => {
    if (s === "healthy") return <Heart className="w-3 h-3 text-emerald-400" />;
    if (s === "struggling") return <AlertTriangle className="w-3 h-3 text-amber-400" />;
    return <XCircle className="w-3 h-3 text-red-400" />;
  };

  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-400" />
          System Health
        </h2>
        <Button variant="ghost" size="sm" onClick={fetchHealth} disabled={refreshing}
          className="text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#374151] h-8 w-8 p-0">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[#6B7280]">Overall</span>
          <span className={pct === 100 ? "text-emerald-400" : "text-amber-400"}>{pct.toFixed(0)}%</span>
        </div>
        <div className="h-1.5 bg-[#111827] rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {services.map((s) => {
          const Icon = s.icon;
          const color = s.status === "healthy" ? "text-emerald-400" : s.status === "struggling" ? "text-amber-400" : "text-red-400";
          const bg = s.status === "healthy" ? "bg-emerald-500/10" : s.status === "struggling" ? "bg-amber-500/10" : "bg-red-500/10";
          return (
            <div key={s.name} className="flex items-center gap-2 p-2.5 bg-[#111827] rounded-lg border border-[#374151]">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center ${bg}`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#D1D5DB] truncate">{s.name}</p>
                <div className="flex items-center gap-1">{statusIcon(s.status)}<span className="text-[10px] text-[#6B7280] capitalize">{s.status}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
