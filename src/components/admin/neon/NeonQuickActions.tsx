import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Package,
  FileText,
  Calendar,
  Mail,
  KeyRound,
  Settings,
  Zap,
} from "lucide-react";

const actions = [
  { label: "Add Product", icon: Package, href: "/admin/ecommerce/products" },
  { label: "Create Article", icon: FileText, href: "/admin/content/articles" },
  { label: "View Bookings", icon: Calendar, href: "/admin/bookings" },
  { label: "Email Campaign", icon: Mail, href: "/admin/email-campaigns" },
  { label: "Book Access", icon: KeyRound, href: "/admin/ecommerce/book-access" },
  { label: "Site Settings", icon: Settings, href: "/admin/settings/site" },
];

export function NeonQuickActions() {
  return (
    <Card className="bg-[#1F2937] border-[#374151] p-5">
      <h2 className="text-sm font-semibold text-[#F9FAFB] flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-400" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.href}>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#111827] border border-[#374151] hover:border-[#4B5563] hover:bg-[#1a2332] transition-colors cursor-pointer group">
                <Icon className="w-4 h-4 text-[#6B7280] group-hover:text-[#F9FAFB] transition-colors" />
                <span className="text-sm text-[#9CA3AF] group-hover:text-[#F9FAFB] transition-colors">
                  {action.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
