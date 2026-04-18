import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Mail, Users, Newspaper } from "lucide-react";

interface KPIStats {
  pendingBookings: number;
  unreadMessages: number;
  totalStaff: number;
  newsletterSubscribers: number;
}

const kpis = [
  {
    key: "pendingBookings" as const,
    label: "Pending Bookings",
    icon: Calendar,
    accent: "border-l-orange-500",
    iconColor: "text-orange-400",
    href: "/admin/bookings",
  },
  {
    key: "unreadMessages" as const,
    label: "Unread Messages",
    icon: Mail,
    accent: "border-l-amber-500",
    iconColor: "text-amber-400",
    href: "/admin/communications",
  },
  {
    key: "totalStaff" as const,
    label: "Active Staff",
    icon: Users,
    accent: "border-l-emerald-500",
    iconColor: "text-emerald-400",
    href: "/admin/team",
  },
  {
    key: "newsletterSubscribers" as const,
    label: "Subscribers",
    icon: Newspaper,
    accent: "border-l-purple-500",
    iconColor: "text-purple-400",
    href: "/admin/newsletter",
  },
];

export function DashboardKPICards({ stats }: { stats: KPIStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const value = stats[kpi.key];
        return (
          <Link key={kpi.key} to={kpi.href}>
            <Card
              className={`bg-card border-border border-l-4 ${kpi.accent} p-5 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-5 w-5 ${kpi.iconColor}`} />
              </div>
              <p className="text-3xl font-semibold text-foreground tracking-tight">
                {value ?? "\u2014"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
