import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  FileText,
  Users,
  ShoppingCart,
  Mail,
  Briefcase,
  BarChart3,
  Activity,
  Shield,
  Layers,
} from "lucide-react";

interface ModuleStats {
  pendingBookings?: number;
  pendingInquiries?: number;
  pendingApplications?: number;
  unreadMessages?: number;
  lowStockProducts?: number;
}

const modules = [
  { title: "Security", icon: Shield, href: "/admin", color: "text-blue-400" },
  { title: "Content", icon: FileText, href: "/admin/content/pages", color: "text-purple-400" },
  { title: "Clients", icon: Users, href: "/admin/clients/businesses", color: "text-indigo-400" },
  { title: "E-Commerce", icon: ShoppingCart, href: "/admin/ecommerce/products", color: "text-emerald-400", badgeKey: "lowStockProducts" as const },
  { title: "Requests", icon: Briefcase, href: "/admin/bookings", color: "text-amber-400", badgeKey: "pendingBookings" as const },
  { title: "Comms", icon: Mail, href: "/admin/email-campaigns", color: "text-pink-400", badgeKey: "unreadMessages" as const },
  { title: "Analytics", icon: BarChart3, href: "/admin/analytics", color: "text-violet-400" },
  { title: "Health", icon: Activity, href: "/admin/testing", color: "text-teal-400" },
];

export function NeonAdminModules({ stats }: { stats?: ModuleStats }) {
  const getBadge = (key?: keyof ModuleStats) => {
    if (!key || !stats) return null;
    const v = stats[key];
    return v && v > 0 ? v : null;
  };

  return (
    <div>
      <h2 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-2 mb-3">
        <Layers className="w-4 h-4" />
        Modules
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {modules.map((m) => {
          const Icon = m.icon;
          const badge = getBadge(m.badgeKey);
          return (
            <Link key={m.title} to={m.href}>
              <Card className="relative bg-[#1F2937] border-[#374151] p-4 hover:border-[#4B5563] hover:bg-[#1a2332] transition-colors cursor-pointer group text-center">
                {badge && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
                <Icon className={`w-5 h-5 mx-auto mb-2 ${m.color} group-hover:scale-110 transition-transform`} />
                <p className="text-xs font-medium text-[#D1D5DB] group-hover:text-[#F9FAFB] transition-colors">
                  {m.title}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
