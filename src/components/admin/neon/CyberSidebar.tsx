import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Shield, Users, Activity, Bell, Settings,
  ChevronDown, Database, BarChart3, Lock, Smartphone, Globe, X,
  FileText, ShoppingCart, ClipboardList, Mail, Building2, TestTube,
  MessageSquare, Package, Heart, Calendar, Briefcase, Inbox, Newspaper,
  Rocket, CreditCard, UserCog, HeartHandshake, FileEdit, Quote,
  UsersRound, Ticket, BookOpen, Star, Image, UserPlus, KeyRound,
  Library, Layers, LogOut,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// ── Nav tree ──────────────────────────────────────────────────────────────────

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  children?: { title: string; href: string; icon?: React.ElementType }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, children: [
    { title: "Command Center", href: "/admin", icon: LayoutDashboard },
    { title: "Threat Monitor",  href: "/admin/threats",          icon: Shield       },
    { title: "Family Devices",  href: "/admin/devices",          icon: Smartphone   },
    { title: "Analytics",       href: "/admin/analytics",        icon: BarChart3    },
    { title: "User Management", href: "/admin/users",            icon: Users        },
    { title: "Activity Log",    href: "/admin/activity",         icon: Activity     },
    { title: "Database",        href: "/admin/database",         icon: Database     },
    { title: "Notifications",   href: "/admin/notifications",    icon: Bell         },
    { title: "Security",        href: "/admin/security",         icon: Lock         },
    { title: "Web Scanner",     href: "/admin/security-scanner", icon: Globe        },
  ]},
  { title: "Content", icon: FileText, children: [
    { title: "Pages",          href: "/admin/content/pages",          icon: FileEdit     },
    { title: "Articles",       href: "/admin/content/articles",       icon: FileText     },
    { title: "Testimonials",   href: "/admin/content/testimonials",   icon: Quote        },
    { title: "Team",           href: "/admin/content/team",           icon: UsersRound   },
    { title: "Portfolio",      href: "/admin/content/portfolio",      icon: Image        },
    { title: "Knowledge Base", href: "/admin/content/knowledge-base", icon: BookOpen     },
    { title: "Reviews",        href: "/admin/content/reviews",        icon: Star         },
  ]},
  { title: "Clients", icon: Building2, children: [
    { title: "Business Clients",   href: "/admin/clients/businesses", icon: Building2    },
    { title: "Individual Clients", href: "/admin/clients/individuals", icon: UserPlus   },
    { title: "Messages",           href: "/admin/clients/messages",   icon: MessageSquare },
  ]},
  { title: "E-Commerce", icon: ShoppingCart, children: [
    { title: "Products",      href: "/admin/ecommerce/products",    icon: Package      },
    { title: "Orders",        href: "/admin/ecommerce/orders",      icon: ShoppingCart },
    { title: "Inventory",     href: "/admin/ecommerce/inventory",   icon: Package      },
    { title: "Subscriptions", href: "/admin/subscriptions",         icon: CreditCard   },
    { title: "Book Access",   href: "/admin/ecommerce/book-access", icon: KeyRound     },
    { title: "Donations",     href: "/admin/donations",             icon: Heart        },
  ]},
  { title: "Requests", icon: ClipboardList, children: [
    { title: "Service Inquiries", href: "/admin/service-inquiries", icon: ClipboardList },
    { title: "Bookings",          href: "/admin/bookings",          icon: Calendar      },
    { title: "Job Applications",  href: "/admin/job-applications",  icon: Briefcase     },
    { title: "Support Tickets",   href: "/admin/support/tickets",   icon: Ticket        },
  ]},
  { title: "Communications", icon: Mail, children: [
    { title: "Email Campaigns", href: "/admin/email-campaigns",          icon: Mail      },
    { title: "Inbox",           href: "/admin/communications/inbox",     icon: Inbox     },
    { title: "Newsletter",      href: "/admin/communications/newsletter",icon: Newspaper },
  ]},
  { title: "Settings", icon: Settings, children: [
    { title: "Site Settings", href: "/admin/settings/site",    icon: Settings  },
    { title: "User Roles",    href: "/admin/settings/users",   icon: UserCog   },
    { title: "Billing",       href: "/admin/settings/billing", icon: CreditCard },
  ]},
  { title: "Digital Library", icon: Library, children: [
    { title: "All Books",      href: "/admin/books",                   icon: BookOpen },
    { title: "Add Book",       href: "/admin/books/new",               icon: Layers   },
    { title: "Book Access IDs",href: "/admin/ecommerce/book-access",   icon: KeyRound },
  ]},
  { title: "Forms", icon: ClipboardList, children: [
    { title: "All Forms", href: "/admin/forms", icon: FileText },
  ]},
  { title: "Moderation", icon: MessageSquare, children: [
    { title: "Comments", href: "/admin/moderation", icon: MessageSquare },
  ]},
  { title: "Forms", icon: ClipboardList, children: [
    { title: "All Forms", href: "/admin/forms", icon: FileText },
  ]},
  { title: "Moderation", icon: MessageSquare, children: [
    { title: "Comments", href: "/admin/moderation", icon: MessageSquare },
  ]},
  { title: "Testing", icon: TestTube, children: [
    { title: "System Health",    href: "/admin/testing",          icon: HeartHandshake },
    { title: "Launch Checklist", href: "/admin/testing/checklist",icon: Rocket         },
  ]},
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface CyberSidebarProps {
  isOpen: boolean;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  adminName: string;
  onSignOut: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CyberSidebar({ isOpen, isMobileOpen, onMobileClose, adminName, onSignOut }: CyberSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { roleConfig } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Dashboard"]);

  // Pending comment badge
  const { data: pendingComments = 0 } = useQuery({
    queryKey: ["sidebar-pending-comments"],
    queryFn: async () => {
      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count ?? 0;
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const toggleMenu = (title: string) =>
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const isChildActive = (children?: { href: string }[]) =>
    children?.some((c) => location.pathname === c.href || location.pathname.startsWith(c.href + "/"));

  const initials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2) || "AD";

  const roleLabel = roleConfig?.role?.replace(/_/g, " ") ?? "Admin";

  const NavContent = () => (
    <aside className="adm-sidebar" aria-label="Admin navigation">
      {/* Logo */}
      <div className="adm-sidebar-logo">
        <Link to="/admin" className="adm-sidebar-logo-icon" onClick={onMobileClose}>
          <Globe className="h-4 w-4 text-white" />
        </Link>
        {isOpen && <span className="adm-sidebar-brand">InVision</span>}
        {isMobileOpen && (
          <button
            onClick={onMobileClose}
            className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Profile chip */}
      {isOpen && (
        <div
          className="adm-sidebar-profile"
          onClick={() => { navigate("/admin/settings"); onMobileClose?.(); }}
        >
          <div className="adm-sidebar-avatar">{initials(adminName)}</div>
          <div className="adm-sidebar-profile-info" style={{ flex: 1, minWidth: 0 }}>
            <div className="adm-sidebar-profile-name">{adminName}</div>
            <div className="adm-sidebar-profile-role" style={{ textTransform: "capitalize" }}>{roleLabel}</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="adm-sidebar-nav">
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
                  className={`adm-nav-parent${active ? " active" : ""}`}
                >
                  <span className="adm-nav-icon">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {isOpen && (
                    <>
                      <span style={{ flex: 1 }}>{item.title}</span>
                      <ChevronDown className={`adm-nav-chevron h-3.5 w-3.5${expanded ? " open" : ""}`} />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={item.href || "#"}
                  onClick={onMobileClose}
                  title={!isOpen ? item.title : undefined}
                  className={`adm-nav-parent${active ? " active" : ""}`}
                >
                  <span className="adm-nav-icon">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {isOpen && <span style={{ flex: 1 }}>{item.title}</span>}
                </Link>
              )}

              {item.children && expanded && isOpen && (
                <div className="adm-nav-children">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = location.pathname === child.href || location.pathname.startsWith(child.href + "/");
                    const isModeration = child.href === "/admin/moderation";
                    return (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={onMobileClose}
                        className={`adm-nav-child${childActive ? " active" : ""}`}
                      >
                        {ChildIcon && <ChildIcon className="h-3 w-3 flex-shrink-0" />}
                        <span style={{ flex: 1 }}>{child.title}</span>
                        {isModeration && pendingComments > 0 && (
                          <span className="adm-badge">
                            {pendingComments > 99 ? "99+" : pendingComments}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Sign out at bottom of nav */}
        {isOpen && (
          <button
            onClick={onSignOut}
            className="adm-nav-parent mt-2"
            style={{ color: "rgba(255,100,80,0.7)" }}
          >
            <span className="adm-nav-icon" style={{ color: "rgba(255,100,80,0.7)" }}>
              <LogOut className="h-3.5 w-3.5" />
            </span>
            <span style={{ flex: 1 }}>Sign Out</span>
          </button>
        )}
      </nav>

      {/* Promo card */}
      {isOpen && (
        <div className="adm-sidebar-promo">
          <div className="adm-sidebar-promo-title">System Health</div>
          <div className="adm-sidebar-promo-text">Monitor services and view the activity feed.</div>
          <Link to="/admin/testing" onClick={onMobileClose} className="adm-sidebar-promo-btn">
            View Dashboard →
          </Link>
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — rendered as grid column */}
      <div className="hidden md:block">
        <NavContent />
      </div>

      {/* Mobile sidebar — fixed overlay */}
      {isMobileOpen && (
        <div className="adm-sidebar mob-open md:hidden" style={{ position: "fixed", top: 0, left: 0, width: 270, height: "100dvh", zIndex: 100 }}>
          <NavContent />
        </div>
      )}
    </>
  );
}
