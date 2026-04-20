import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Shield, Users, Activity, Bell, Settings,
  ChevronDown, Database, BarChart3, Lock, Smartphone, Globe, X,
  FileText, ShoppingCart, ClipboardList, Mail, Building2, TestTube,
  MessageSquare, Package, Heart, Calendar, Briefcase, Inbox, Newspaper,
  Rocket, CreditCard, UserCog, HeartHandshake, FileEdit, Quote,
  UsersRound, Ticket, BookOpen, Star, Image, UserPlus, KeyRound,
  Library, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string; icon?: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, children: [
    { title: "Command Center", href: "/admin", icon: LayoutDashboard },
    { title: "Threat Monitor", href: "/admin/threats", icon: Shield },
    { title: "Family Devices", href: "/admin/devices", icon: Smartphone },
    { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { title: "User Management", href: "/admin/users", icon: Users },
    { title: "Activity Log", href: "/admin/activity", icon: Activity },
    { title: "Database", href: "/admin/database", icon: Database },
    { title: "Notifications", href: "/admin/notifications", icon: Bell },
    { title: "Security", href: "/admin/security", icon: Lock },
    { title: "Website Scanner", href: "/admin/security-scanner", icon: Globe },
  ]},
  { title: "Content", icon: FileText, children: [
    { title: "Pages", href: "/admin/content/pages", icon: FileEdit },
    { title: "Articles", href: "/admin/content/articles", icon: FileText },
    { title: "Testimonials", href: "/admin/content/testimonials", icon: Quote },
    { title: "Team", href: "/admin/content/team", icon: UsersRound },
    { title: "Portfolio", href: "/admin/content/portfolio", icon: Image },
    { title: "Knowledge Base", href: "/admin/content/knowledge-base", icon: BookOpen },
    { title: "Reviews", href: "/admin/content/reviews", icon: Star },
  ]},
  { title: "Clients", icon: Building2, children: [
    { title: "Business Clients", href: "/admin/clients/businesses", icon: Building2 },
    { title: "Individual Clients", href: "/admin/clients/individuals", icon: UserPlus },
    { title: "Messages", href: "/admin/clients/messages", icon: MessageSquare },
  ]},
  { title: "E-Commerce", icon: ShoppingCart, children: [
    { title: "Products", href: "/admin/ecommerce/products", icon: Package },
    { title: "Orders", href: "/admin/ecommerce/orders", icon: ShoppingCart },
    { title: "Inventory", href: "/admin/ecommerce/inventory", icon: Package },
    { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { title: "Book Access", href: "/admin/ecommerce/book-access", icon: KeyRound },
    { title: "Donations", href: "/admin/donations", icon: Heart },
  ]},
  { title: "Requests", icon: ClipboardList, children: [
    { title: "Service Inquiries", href: "/admin/service-inquiries", icon: ClipboardList },
    { title: "Bookings", href: "/admin/bookings", icon: Calendar },
    { title: "Job Applications", href: "/admin/job-applications", icon: Briefcase },
    { title: "Support Tickets", href: "/admin/support/tickets", icon: Ticket },
  ]},
  { title: "Communications", icon: Mail, children: [
    { title: "Email Campaigns", href: "/admin/email-campaigns", icon: Mail },
    { title: "Inbox", href: "/admin/communications/inbox", icon: Inbox },
    { title: "Newsletter", href: "/admin/communications/newsletter", icon: Newspaper },
  ]},
  { title: "Settings", icon: Settings, children: [
    { title: "Site Settings", href: "/admin/settings/site", icon: Settings },
    { title: "User Roles", href: "/admin/settings/users", icon: UserCog },
    { title: "Billing", href: "/admin/settings/billing", icon: CreditCard },
  ]},
  { title: "Digital Library", icon: Library, children: [
    { title: "All Books", href: "/admin/books", icon: BookOpen },
    { title: "Add Book", href: "/admin/books/new", icon: Layers },
    { title: "Book Access IDs", href: "/admin/ecommerce/book-access", icon: KeyRound },
  ]},
  { title: "Testing", icon: TestTube, children: [
    { title: "System Health", href: "/admin/testing", icon: HeartHandshake },
    { title: "Launch Checklist", href: "/admin/testing/checklist", icon: Rocket },
  ]},
];

interface CyberSidebarProps {
  isOpen: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function CyberSidebar({ isOpen, isMobileOpen, onMobileClose }: CyberSidebarProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Dashboard"]);

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) => prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]);
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((c) => location.pathname === c.href || location.pathname.startsWith(c.href + "/"));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#111827] border-r border-[#1F2937]">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[#1F2937]">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e07a55] to-[#d05f3a] flex items-center justify-center">
            <Globe className="h-4 w-4 text-white" />
          </div>
          {isOpen && <span className="text-base font-semibold text-[#F9FAFB]">InVision</span>}
        </Link>
        {isMobileOpen && (
          <Button variant="ghost" size="icon" onClick={onMobileClose}
            className="ml-auto text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937] md:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href) || isChildActive(item.children);
          const expanded = expandedMenus.includes(item.title);

          return (
            <div key={item.title}>
              {item.children ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  title={!isOpen ? item.title : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                    ${active ? "bg-[#1F2937] text-[#F9FAFB]" : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"}`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left font-medium">{item.title}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </>
                  )}
                </button>
              ) : (
                <Link to={item.href || "#"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                    ${active ? "bg-[#1F2937] text-[#F9FAFB]" : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.title}</span>}
                </Link>
              )}

              {item.children && expanded && isOpen && (
                <div className="pl-4 mt-0.5 space-y-0.5">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <Link key={child.href} to={child.href} onClick={onMobileClose}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                          ${(location.pathname === child.href || location.pathname.startsWith(child.href + "/"))
                            ? "text-orange-400 bg-orange-500/10"
                            : "text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"}`}>
                        {ChildIcon && <ChildIcon className="h-3.5 w-3.5" />}
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className={`hidden md:block fixed left-0 top-0 h-full z-50 transition-all duration-300 ${isOpen ? "w-[260px]" : "w-[70px]"}`}>
        <SidebarContent />
      </aside>

      {isMobileOpen && (
        <>
          <div onClick={onMobileClose} className="fixed inset-0 bg-black/60 z-50 md:hidden" />
          <aside className="fixed left-0 top-0 h-full w-[260px] z-50 md:hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
