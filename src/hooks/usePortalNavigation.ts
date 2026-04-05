import { useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  ListTodo,
  Ticket,
  GraduationCap,
  BookOpen,
  Shield,
  AlertTriangle,
  FileText,
  ShoppingCart,
  UserCheck,
  Clock,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { NavSection } from "@/types/portal";

export function usePortalNavigation(): NavSection[] {
  const { hasPermission, roleConfig } = useAuth();

  return useMemo((): NavSection[] => {
    const allSections: NavSection[] = [
      {
        label: "Overview",
        items: [
          {
            title: "Home",
            icon: LayoutDashboard,
            href: "/portal",
          },
        ],
      },
      {
        label: "Operations",
        items: [
          {
            title: "Clients",
            icon: Users,
            href: "/portal/clients",
            permission: "view_clients",
          },
          {
            title: "Bookings",
            icon: Calendar,
            href: "/portal/bookings",
            permission: "manage_appointments",
          },
          {
            title: "Messages",
            icon: MessageSquare,
            href: "/portal/messages",
            permission: "view_messages",
          },
          {
            title: "Tasks",
            icon: ListTodo,
            href: "/portal/tasks",
          },
          {
            title: "Tickets",
            icon: Ticket,
            href: "/portal/my-tickets",
            permission: "view_tickets",
          },
        ],
      },
      {
        label: "Training & Security",
        items: [
          {
            title: "Courses",
            icon: GraduationCap,
            href: "/portal/my-courses",
            permission: "view_training",
          },
          {
            title: "Knowledge Base",
            icon: BookOpen,
            href: "/portal/knowledge-base",
          },
          {
            title: "Threat Center",
            icon: Shield,
            href: "/portal/threats",
          },
          {
            title: "Scam Check",
            icon: AlertTriangle,
            href: "/portal/scam-check",
          },
        ],
      },
      {
        label: "Commerce",
        items: [
          {
            title: "Invoices",
            icon: FileText,
            href: "/portal/invoices",
            permission: "view_clients",
          },
          {
            title: "Orders",
            icon: ShoppingCart,
            href: "/portal/orders",
            permission: "view_clients",
          },
        ],
      },
      {
        label: "Team",
        items: [
          {
            title: "Referrals",
            icon: UserCheck,
            href: "/portal/referrals",
          },
          {
            title: "Availability",
            icon: Clock,
            href: "/portal/availability",
          },
          {
            title: "Campaigns",
            icon: Mail,
            href: "/portal/campaigns",
            permission: "manage_training",
          },
          {
            title: "Analytics",
            icon: BarChart3,
            href: "/portal/analytics",
          },
        ],
      },
      {
        label: "Account",
        items: [
          {
            title: "Settings",
            icon: Settings,
            href: "/portal/settings",
          },
        ],
      },
    ];

    return allSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.permission ? hasPermission(item.permission) : true,
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [hasPermission, roleConfig]);
}
