import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortalNavigation } from "@/hooks/usePortalNavigation";
import { SITE } from "@/config/site";
import type { NavItem } from "@/types/portal";

interface PortalSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItemProps {
  item: NavItem;
  isOpen: boolean;
  depth?: number;
  onMobileClose: () => void;
}

function isItemActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  if (href === "/portal") return pathname === "/portal";
  return pathname.startsWith(href);
}

function SidebarNavItem({ item, isOpen, depth = 0, onMobileClose }: NavItemProps) {
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;
  const active = isItemActive(item.href, location.pathname);
  const [expanded, setExpanded] = useState(false);

  const Icon = item.icon;

  const baseClass = cn(
    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer w-full",
    depth > 0 && "ml-4",
    active
      ? "bg-primary/10 text-primary font-medium"
      : "text-foreground hover:bg-muted/50",
    !isOpen && depth === 0 && "justify-center px-2",
  );

  if (hasChildren) {
    return (
      <div>
        <button
          className={baseClass}
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {isOpen && (
            <>
              <span className="flex-1 truncate text-left">{item.title}</span>
              {item.badge != null && item.badge > 0 && (
                <Badge variant="secondary" className="ml-auto text-xs h-5 px-1.5">
                  {item.badge}
                </Badge>
              )}
              {expanded ? (
                <ChevronDown className="h-4 w-4 shrink-0 ml-1" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 ml-1" />
              )}
            </>
          )}
        </button>
        {expanded && isOpen && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => (
              <SidebarNavItem
                key={child.title}
                item={child}
                isOpen={isOpen}
                depth={depth + 1}
                onMobileClose={onMobileClose}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href ?? "#"}
      className={baseClass}
      onClick={onMobileClose}
      title={!isOpen ? item.title : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {isOpen && (
        <>
          <span className="flex-1 truncate">{item.title}</span>
          {item.badge != null && item.badge > 0 && (
            <Badge variant="secondary" className="ml-auto text-xs h-5 px-1.5">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
}

export function PortalSidebar({ isOpen, isMobileOpen, onMobileClose }: PortalSidebarProps) {
  const sections = usePortalNavigation();

  const sidebarContent = (
    <div className="flex h-full flex-col bg-card border-r border-border">
      {/* Logo header */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-border px-3",
          isOpen ? "justify-between" : "justify-center",
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Shield className="h-6 w-6 shrink-0 text-primary" />
          {isOpen && (
            <span className="font-semibold text-foreground truncate text-sm">
              {SITE.name}
            </span>
          )}
        </div>
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={onMobileClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Nav sections */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-4">
          {sections.map((section) => (
            <div key={section.label}>
              {isOpen && (
                <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={item.title}
                    item={item}
                    isOpen={isOpen}
                    onMobileClose={onMobileClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-40 transition-all duration-200",
          isOpen ? "w-[260px]" : "w-[70px]",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          {/* Mobile sidebar panel */}
          <aside className="fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
