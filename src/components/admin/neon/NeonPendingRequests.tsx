import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Clock, BookOpen, MessageSquare, Briefcase, Star, ShoppingCart, ChevronRight, AlertCircle } from "lucide-react";

interface PendingItem {
  id: string;
  type: "booking" | "inquiry" | "application" | "testimonial" | "order";
  title: string;
  subtitle: string;
  time: string;
}

const formatTimeAgo = (dateString: string) => {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const typeConfig: Record<string, { icon: typeof BookOpen; color: string; bg: string }> = {
  booking:     { icon: BookOpen,      color: "text-orange-400", bg: "bg-orange-500/10" },
  inquiry:     { icon: MessageSquare, color: "text-green-400",  bg: "bg-green-500/10"  },
  application: { icon: Briefcase,     color: "text-purple-400", bg: "bg-purple-500/10" },
  testimonial: { icon: Star,          color: "text-amber-400",  bg: "bg-amber-500/10"  },
  order:       { icon: ShoppingCart,  color: "text-pink-400",   bg: "bg-pink-500/10"   },
};

const typeLinks: Record<string, string> = {
  booking:     "/admin/bookings",
  inquiry:     "/admin/service-inquiries",
  application: "/admin/job-applications",
  testimonial: "/admin/content/testimonials",
  order:       "/admin/ecommerce/orders",
};

export function NeonPendingRequests() {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingItems = useCallback(async () => {
    try {
      const [bookingsRes, applicationsRes, testimonialsRes] = await Promise.all([
        supabase.from("booking_requests")
          .select("id, full_name, service_name, created_at")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase.from("job_applications")
          .select("id, name, position, created_at")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(2),
        supabase.from("testimonials")
          .select("id, name, created_at")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(2),
      ]);

      const allItems: PendingItem[] = [];
      bookingsRes.data?.forEach((b) =>
        allItems.push({ id: b.id, type: "booking", title: b.service_name, subtitle: b.full_name, time: formatTimeAgo(b.created_at) })
      );
      applicationsRes.data?.forEach((a) =>
        allItems.push({ id: a.id, type: "application", title: a.position, subtitle: a.name, time: formatTimeAgo(a.created_at) })
      );
      testimonialsRes.data?.forEach((t) =>
        allItems.push({ id: t.id, type: "testimonial", title: "New Testimonial", subtitle: t.name, time: formatTimeAgo(t.created_at) })
      );

      setItems(allItems.slice(0, 6));
    } catch (err) {
      console.error("Error fetching pending items:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPendingItems(); }, [fetchPendingItems]);

  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-400" />
          Pending Requests
          {items.length > 0 && (
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 ml-1 text-xs">{items.length}</Badge>
          )}
        </h2>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-9 bg-[#111827] rounded-lg animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-5">
          <AlertCircle className="w-5 h-5 text-[#374151] mx-auto mb-2" />
          <p className="text-[#6B7280] text-sm">No pending requests</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const cfg = typeConfig[item.type];
            const Icon = cfg.icon;
            return (
              <Link key={`${item.type}-${item.id}`} to={typeLinks[item.type] || "/admin"}>
                <div className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg border border-[#374151] hover:border-[#4B5563] transition-colors group">
                  <div className={`w-5 h-5 ${cfg.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${cfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#F9FAFB] truncate">{item.title}</p>
                    <p className="text-xs text-[#6B7280] truncate">{item.subtitle}</p>
                  </div>
                  <span className="text-xs text-[#6B7280] flex-shrink-0">{item.time}</span>
                  <ChevronRight className="w-4 h-4 text-[#4B5563] group-hover:text-[#9CA3AF] transition-colors flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Card>
  );
}
