# Command Center Phase 1: Foundation — Shell, Shared Components, Hooks

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the PortalShell layout, shared component library, shared hooks, and notification system that all role dashboards and modules will use.

**Architecture:** A `PortalShell` layout wraps all `/portal/*` routes (mirroring `AdminShell` for `/admin/*`). It renders a role-aware sidebar, topbar with notifications/search/user menu, and an `<Outlet/>` for child routes. Shared components (`StatCard`, `PipelineBoard`, `DataTable`, `ActionQueue`, `EmptyState`, `ErrorState`) and hooks (`useNotifications`, `usePipeline`, `usePortalNavigation`) form the building blocks for all subsequent phases.

**Tech Stack:** React 18, TypeScript, shadcn/ui, Tailwind CSS, Supabase (client + realtime), React Query, React Router v6, lucide-react

---

## File Structure

```
src/
  components/
    portal/
      PortalShell.tsx          — layout wrapper (sidebar + topbar + outlet)
      PortalSidebar.tsx        — role-filtered sidebar navigation
      PortalTopbar.tsx         — search, notifications, user menu
      NotificationCenter.tsx   — dropdown notification panel
      CommandPalette.tsx       — Cmd+K quick actions
    shared/
      StatCard.tsx             — standardized KPI card
      PipelineBoard.tsx        — reusable kanban board
      PipelineCard.tsx         — card within pipeline column
      ActionQueue.tsx          — prioritized action list
      DataTable.tsx            — table with search/sort/filter/pagination
      RealCalendar.tsx         — calendar that filters data by date
      EmptyState.tsx           — consistent empty state
      ErrorState.tsx           — consistent error with retry
  hooks/
    useNotifications.ts        — realtime notifications
    useAlertPreferences.ts     — notification settings
    usePipeline.ts             — generic pipeline data
    usePortalNavigation.ts     — role-filtered sidebar items
  types/
    portal.ts                  — shared types for portal ecosystem
```

---

### Task 1: Shared Portal Types

**Files:**
- Create: `src/types/portal.ts`

- [ ] **Step 1: Create the shared types file**

```typescript
// src/types/portal.ts
import type { UserRole } from "@/contexts/AuthContext";

export interface NavItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  permission?: string;
  children?: NavItem[];
  badge?: number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface StatCardData {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: { value: number; direction: "up" | "down" | "flat" };
  href?: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  color: string;
}

export interface PipelineItem {
  id: string;
  title: string;
  subtitle?: string;
  stage: string;
  metadata?: Record<string, string | number>;
  href?: string;
  createdAt?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  priority: "critical" | "high" | "medium" | "low";
  icon?: React.ElementType;
  href?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface NotificationData {
  id: string;
  type: string;
  title: string;
  body: string | null;
  read: boolean;
  action_url: string | null;
  created_at: string;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit src/types/portal.ts 2>&1 || echo "check full build" && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/types/portal.ts && git commit -m "feat: add shared portal types for Command Center ecosystem"
```

---

### Task 2: usePortalNavigation Hook

**Files:**
- Create: `src/hooks/usePortalNavigation.ts`
- Reference: `src/contexts/AuthContext.tsx` (for `useAuth`, `hasPermission`)

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/usePortalNavigation.ts
import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { NavSection } from "@/types/portal";
import {
  LayoutDashboard, Users, Calendar, MessageSquare, ListTodo,
  Ticket, GraduationCap, BookOpen, Shield, AlertTriangle,
  ShoppingCart, ClipboardList, FileText, Package,
  UserCheck, Mail, BarChart3, Settings, Clock, Heart,
} from "lucide-react";

const ALL_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Home", icon: LayoutDashboard, href: "/portal" },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Clients", icon: Users, href: "/portal/clients", permission: "view_clients", children: [
        { title: "Individual", icon: Users, href: "/portal/clients?type=individual", permission: "view_clients" },
        { title: "Business", icon: Users, href: "/portal/clients?type=business", permission: "view_business_clients" },
      ]},
      { title: "Bookings", icon: Calendar, href: "/portal/bookings", permission: "manage_appointments" },
      { title: "Messages", icon: MessageSquare, href: "/portal/messages", permission: "view_messages" },
      { title: "Tasks", icon: ListTodo, href: "/portal/tasks" },
      { title: "Tickets", icon: Ticket, href: "/portal/my-tickets", permission: "view_tickets" },
    ],
  },
  {
    label: "Training & Security",
    items: [
      { title: "Courses", icon: GraduationCap, href: "/portal/my-courses", permission: "view_training" },
      { title: "Knowledge Base", icon: BookOpen, href: "/portal/knowledge-base" },
      { title: "Threat Center", icon: Shield, href: "/portal/threats" },
      { title: "Scam Check", icon: AlertTriangle, href: "/portal/scam-check" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { title: "Invoices", icon: FileText, href: "/portal/invoices", permission: "view_clients" },
      { title: "Orders", icon: ShoppingCart, href: "/portal/orders", permission: "view_clients" },
    ],
  },
  {
    label: "Team",
    items: [
      { title: "Referrals", icon: UserCheck, href: "/portal/referrals" },
      { title: "Availability", icon: Clock, href: "/portal/availability" },
      { title: "Campaigns", icon: Mail, href: "/portal/campaigns", permission: "manage_training" },
      { title: "Analytics", icon: BarChart3, href: "/portal/analytics" },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Settings", icon: Settings, href: "/portal/settings" },
    ],
  },
];

export function usePortalNavigation(): NavSection[] {
  const { hasPermission, roleConfig } = useAuth();

  return useMemo(() => {
    return ALL_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!item.permission) return true;
        return hasPermission(item.permission) || hasPermission("*");
      }).map((item) => ({
        ...item,
        children: item.children?.filter((child) => {
          if (!child.permission) return true;
          return hasPermission(child.permission) || hasPermission("*");
        }),
      })),
    })).filter((section) => section.items.length > 0);
  }, [hasPermission, roleConfig]);
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/hooks/usePortalNavigation.ts && git commit -m "feat: add usePortalNavigation hook with role-based filtering"
```

---

### Task 3: useNotifications Hook

**Files:**
- Create: `src/hooks/useNotifications.ts`

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/useNotifications.ts
import { useEffect, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { NotificationData } from "@/types/portal";

export function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async (): Promise<NotificationData[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("notifications")
        .select("id, type, title, body, read, action_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as NotificationData[];
    },
    enabled: !!user,
    staleTime: 30_000,
  });

  // Subscribe to realtime inserts
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(
    async (notificationId: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true } as any)
        .eq("id", notificationId);
      if (!error) {
        queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
      }
    },
    [user, queryClient]
  );

  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    const { error } = await supabase
      .from("notifications")
      .update({ read: true } as any)
      .eq("user_id", user.id)
      .eq("read", false);
    if (!error) {
      queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
    }
  }, [user, queryClient]);

  return { notifications, unreadCount, isLoading, isError, error, markAsRead, markAllAsRead };
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/hooks/useNotifications.ts && git commit -m "feat: add useNotifications hook with realtime subscriptions"
```

---

### Task 4: usePipeline Hook

**Files:**
- Create: `src/hooks/usePipeline.ts`

- [ ] **Step 1: Create the hook**

```typescript
// src/hooks/usePipeline.ts
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PipelineStage, PipelineItem } from "@/types/portal";

interface UsePipelineOptions {
  table: string;
  stageField: string;
  stages: PipelineStage[];
  titleField: string;
  subtitleField?: string;
  filters?: Record<string, string>;
  limit?: number;
  enabled?: boolean;
}

export function usePipeline({
  table,
  stageField,
  stages,
  titleField,
  subtitleField,
  filters = {},
  limit = 100,
  enabled = true,
}: UsePipelineOptions) {
  const filterKey = JSON.stringify(filters);

  const { data: rawItems = [], isLoading, isError, error } = useQuery({
    queryKey: ["pipeline", table, stageField, filterKey],
    queryFn: async () => {
      let query = supabase
        .from(table as any)
        .select("*")
        .limit(limit);

      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled,
    staleTime: 30_000,
  });

  const items: PipelineItem[] = useMemo(() => {
    return rawItems.map((row: any) => ({
      id: row.id,
      title: row[titleField] ?? "Untitled",
      subtitle: subtitleField ? row[subtitleField] : undefined,
      stage: row[stageField] ?? stages[0]?.id ?? "unknown",
      metadata: {},
      createdAt: row.created_at,
    }));
  }, [rawItems, titleField, subtitleField, stageField, stages]);

  const columns = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      items: items.filter((item) => item.stage === stage.id),
      count: items.filter((item) => item.stage === stage.id).length,
    }));
  }, [stages, items]);

  const moveItem = async (itemId: string, newStage: string) => {
    const { error } = await supabase
      .from(table as any)
      .update({ [stageField]: newStage } as any)
      .eq("id", itemId);
    if (error) throw error;
  };

  return { columns, items, isLoading, isError, error, moveItem };
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/hooks/usePipeline.ts && git commit -m "feat: add usePipeline hook for kanban board data"
```

---

### Task 5: Shared UI Components — StatCard, EmptyState, ErrorState

**Files:**
- Create: `src/components/shared/StatCard.tsx`
- Create: `src/components/shared/EmptyState.tsx`
- Create: `src/components/shared/ErrorState.tsx`

- [ ] **Step 1: Create StatCard**

```tsx
// src/components/shared/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatCardData } from "@/types/portal";

interface StatCardProps extends StatCardData {
  className?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, href, className }: StatCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Card className={cn("bg-card border-border hover:border-primary/30 transition-colors", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trend.direction === "up" && trend.value > 0 && "text-green-500",
                trend.direction === "down" && "text-red-500",
                trend.direction === "flat" && "text-muted-foreground",
              )}>
                {trend.direction === "up" ? "+" : trend.direction === "down" ? "-" : ""}
                {Math.abs(trend.value)}%
                {trend.direction === "up" ? " ↑" : trend.direction === "down" ? " ↓" : " →"}
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create EmptyState**

```tsx
// src/components/shared/EmptyState.tsx
import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-3 rounded-full bg-muted mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">{actionLabel}</Button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create ErrorState**

```tsx
// src/components/shared/ErrorState.tsx
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", description, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="p-3 rounded-full bg-destructive/10 mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>}
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">Try again</Button>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify all compile**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/shared/ && git commit -m "feat: add StatCard, EmptyState, ErrorState shared components"
```

---

### Task 6: PipelineBoard and PipelineCard Components

**Files:**
- Create: `src/components/shared/PipelineBoard.tsx`
- Create: `src/components/shared/PipelineCard.tsx`

- [ ] **Step 1: Create PipelineCard**

```tsx
// src/components/shared/PipelineCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PipelineItem } from "@/types/portal";

interface PipelineCardProps {
  item: PipelineItem;
  onClick?: (item: PipelineItem) => void;
}

export function PipelineCard({ item, onClick }: PipelineCardProps) {
  const age = item.createdAt
    ? Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card
      className={cn(
        "bg-card border-border cursor-pointer hover:border-primary/40 transition-colors",
        onClick && "cursor-pointer"
      )}
      onClick={() => onClick?.(item)}
    >
      <CardContent className="p-3 space-y-2">
        <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
        {item.subtitle && (
          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {age !== null && (
            <Badge variant="outline" className="text-[10px] py-0">
              {age === 0 ? "Today" : `${age}d`}
            </Badge>
          )}
          {item.metadata &&
            Object.entries(item.metadata).map(([key, val]) => (
              <Badge key={key} variant="secondary" className="text-[10px] py-0">
                {val}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create PipelineBoard**

```tsx
// src/components/shared/PipelineBoard.tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PipelineCard } from "./PipelineCard";
import { EmptyState } from "./EmptyState";
import type { PipelineItem, PipelineStage } from "@/types/portal";
import { cn } from "@/lib/utils";

interface PipelineColumn extends PipelineStage {
  items: PipelineItem[];
  count: number;
}

interface PipelineBoardProps {
  columns: PipelineColumn[];
  onCardClick?: (item: PipelineItem) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function PipelineBoard({ columns, onCardClick, isLoading, emptyMessage = "No items" }: PipelineBoardProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="min-w-[280px] flex-shrink-0 space-y-3">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="h-24 bg-muted rounded animate-pulse" />
            <div className="h-24 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const totalItems = columns.reduce((sum, col) => sum + col.count, 0);

  if (totalItems === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-max">
        {columns.map((column) => (
          <div key={column.id} className="min-w-[280px] w-[280px] flex-shrink-0">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={cn("w-2 h-2 rounded-full")} style={{ backgroundColor: column.color }} />
              <span className="text-sm font-medium text-foreground">{column.label}</span>
              <Badge variant="secondary" className="text-[10px] ml-auto">
                {column.count}
              </Badge>
            </div>
            <div className="space-y-2">
              {column.items.map((item) => (
                <PipelineCard key={item.id} item={item} onClick={onCardClick} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
```

- [ ] **Step 3: Verify all compile**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/shared/PipelineBoard.tsx src/components/shared/PipelineCard.tsx && git commit -m "feat: add PipelineBoard and PipelineCard kanban components"
```

---

### Task 7: ActionQueue Component

**Files:**
- Create: `src/components/shared/ActionQueue.tsx`

- [ ] **Step 1: Create ActionQueue**

```tsx
// src/components/shared/ActionQueue.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { EmptyState } from "./EmptyState";
import type { ActionItem } from "@/types/portal";

interface ActionQueueProps {
  title?: string;
  items: ActionItem[];
  maxItems?: number;
  onViewAll?: () => void;
  className?: string;
}

const priorityStyles: Record<ActionItem["priority"], string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function ActionQueue({ title = "Action Required", items, maxItems = 5, onViewAll, className }: ActionQueueProps) {
  const displayed = items.slice(0, maxItems);
  const remaining = items.length - displayed.length;

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {items.length > 0 && (
            <Badge variant="secondary">{items.length}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {displayed.length === 0 ? (
          <EmptyState title="All clear" description="No actions needed right now" />
        ) : (
          <>
            {displayed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer"
                  onClick={() => item.onAction?.()}
                >
                  {Icon && (
                    <div className={cn("p-1.5 rounded", priorityStyles[item.priority])}>
                      <Icon className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
            {remaining > 0 && onViewAll && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={onViewAll}>
                View {remaining} more
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/shared/ActionQueue.tsx && git commit -m "feat: add ActionQueue component for prioritized action lists"
```

---

### Task 8: NotificationCenter Component

**Files:**
- Create: `src/components/portal/NotificationCenter.tsx`

- [ ] **Step 1: Create NotificationCenter**

```tsx
// src/components/portal/NotificationCenter.tsx
import { Bell, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NotificationCenter() {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllAsRead}>
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="max-h-80">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-2.5 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.slice(0, 20).map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                    !n.read && "bg-primary/5"
                  )}
                  onClick={() => {
                    if (!n.read) markAsRead(n.id);
                    if (n.action_url) window.location.href = n.action_url;
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm truncate", !n.read ? "font-medium text-foreground" : "text-muted-foreground")}>
                        {n.title}
                      </p>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                    {n.body && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{n.body}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(n.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/portal/NotificationCenter.tsx && git commit -m "feat: add NotificationCenter with realtime notifications"
```

---

### Task 9: PortalSidebar Component

**Files:**
- Create: `src/components/portal/PortalSidebar.tsx`

- [ ] **Step 1: Create PortalSidebar**

```tsx
// src/components/portal/PortalSidebar.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePortalNavigation } from "@/hooks/usePortalNavigation";
import { SITE } from "@/config/site";
import type { NavItem } from "@/types/portal";

interface PortalSidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function PortalSidebar({ isOpen, isMobileOpen, onMobileClose }: PortalSidebarProps) {
  const sections = usePortalNavigation();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/portal") return location.pathname === "/portal";
    return location.pathname.startsWith(href);
  };

  const renderItem = (item: NavItem, depth = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href);
    const expanded = expandedGroups.has(item.title);

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleGroup(item.title)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors",
              "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            {isOpen && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
              </>
            )}
          </button>
          {isOpen && expanded && (
            <div className="ml-4 mt-1 space-y-0.5">
              {item.children!.map((child) => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        to={item.href ?? "#"}
        onClick={onMobileClose}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
          depth > 0 && "text-xs"
        )}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        {isOpen && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <Badge variant="destructive" className="text-[10px] h-5 min-w-[20px] justify-center">
                {item.badge}
              </Badge>
            )}
          </>
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
        <Shield className="h-6 w-6 text-primary flex-shrink-0" />
        {isOpen && <span className="text-sm font-bold text-foreground truncate">{SITE.name}</span>}
        {isMobileOpen && (
          <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={onMobileClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-4">
          {sections.map((section) => (
            <div key={section.label}>
              {isOpen && (
                <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => renderItem(item))}
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
          "fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-all duration-300 hidden md:block",
          isOpen ? "w-[260px]" : "w-[70px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onMobileClose} />
          <aside className="fixed top-0 left-0 h-full w-[260px] bg-card border-r border-border z-50 md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/portal/PortalSidebar.tsx && git commit -m "feat: add PortalSidebar with role-filtered navigation"
```

---

### Task 10: PortalTopbar Component

**Files:**
- Create: `src/components/portal/PortalTopbar.tsx`

- [ ] **Step 1: Create PortalTopbar**

```tsx
// src/components/portal/PortalTopbar.tsx
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Search, Menu, ChevronLeft, ChevronRight, Home, Settings,
  LogOut, User, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationCenter } from "./NotificationCenter";

interface PortalTopbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
}

export function PortalTopbar({ sidebarOpen, onToggleSidebar, onToggleMobileSidebar }: PortalTopbarProps) {
  const { signOut, adminName, roleConfig } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast({ title: "Signed out", description: "You've been securely logged out." });
      navigate("/auth");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }, [signOut, navigate, toast]);

  const getInitials = (name: string) =>
    name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);

  const displayName = adminName || "User";
  const roleName = roleConfig?.displayName || "Member";

  return (
    <header
      className={`fixed top-0 right-0 left-0 h-14 bg-background/95 backdrop-blur-xl border-b border-border z-40 transition-all duration-300 ${
        sidebarOpen ? "md:left-[260px]" : "md:left-[70px]"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (window.innerWidth < 768) onToggleMobileSidebar();
              else onToggleSidebar();
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden sm:flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => window.history.forward()} className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative hidden sm:block max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search... (Ctrl+K)"
              className="pl-9 h-9 bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground" title="Back to website">
            <Home className="h-4 w-4" />
          </Button>

          <NotificationCenter />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-3 border-l border-border text-muted-foreground hover:text-foreground">
                <Avatar className="h-7 w-7 bg-primary/20">
                  <AvatarFallback className="text-xs text-primary bg-transparent">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <span className="text-sm font-medium">{displayName}</span>
                  <span className="block text-[10px] text-muted-foreground">{roleName}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/portal/settings")} className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/portal/settings")} className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/portal/PortalTopbar.tsx && git commit -m "feat: add PortalTopbar with search, notifications, and user menu"
```

---

### Task 11: PortalShell Layout

**Files:**
- Create: `src/components/portal/PortalShell.tsx`
- Modify: `src/App.tsx` — wrap portal routes with `PortalShell`

- [ ] **Step 1: Create PortalShell**

```tsx
// src/components/portal/PortalShell.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PortalSidebar } from "./PortalSidebar";
import { PortalTopbar } from "./PortalTopbar";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export function PortalShell() {
  const { user, loading, initialized, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast({ title: "Session Expired", description: "You've been logged out due to inactivity.", variant: "destructive" });
      navigate("/auth");
    } catch { /* signOut failed silently */ }
  }, [signOut, navigate, toast]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(handleSignOut, INACTIVITY_TIMEOUT);
  }, [handleSignOut]);

  useEffect(() => {
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    const handleActivity = () => resetInactivityTimer();
    events.forEach((e) => document.addEventListener(e, handleActivity));
    resetInactivityTimer();
    return () => {
      events.forEach((e) => document.removeEventListener(e, handleActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:block w-[260px] bg-card border-r border-border" />
        <div className="flex-1">
          <div className="h-14 bg-background border-b border-border" />
          <div className="p-6 space-y-4">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background w-full overflow-x-hidden">
      <PortalSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <PortalTopbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      <main className={`flex-1 pt-14 w-full transition-all duration-300 ${sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"}`}>
        <div className="min-h-[calc(100vh-3.5rem)] p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx to use PortalShell**

In `src/App.tsx`, add the import at the top with the other lazy imports:

```typescript
const PortalShell = lazy(() => import("./components/portal/PortalShell").then(m => ({ default: m.PortalShell })));
```

Then wrap the portal routes. Find the section starting with:
```tsx
<Route path="/portal" element={<PageTransition><ProtectedRoute><Portal /></ProtectedRoute></PageTransition>} />
```

Replace the portal route block with a nested layout:
```tsx
{/* Portal Hub */}
<Route path="/portal" element={<ProtectedRoute><PortalShell /></ProtectedRoute>}>
  <Route index element={<Portal />} />
  <Route path="secretary" element={<SecretaryDashboard />} />
  <Route path="coordinator" element={<CoordinatorDashboard />} />
  <Route path="staff" element={<StaffDashboard />} />
  <Route path="messages" element={<InternalMessages />} />
  <Route path="my-courses" element={<MyCourses />} />
  <Route path="my-bookings" element={<MyBookings />} />
  <Route path="my-tickets" element={<MyTickets />} />
  <Route path="referrals" element={<ReferralDashboard />} />
  <Route path="analytics" element={<UserAnalytics />} />
  <Route path="courses/:id" element={<CourseDetail />} />
  <Route path="scam-check/:id" element={<ScamCheckResult />} />
</Route>

{/* Keep redirects outside the shell */}
<Route path="/portal/admin" element={<Navigate to="/admin" replace />} />
<Route path="/portal/analyst" element={<Navigate to="/portal/staff" replace />} />
<Route path="/portal/trainer" element={<Navigate to="/portal/coordinator" replace />} />
<Route path="/portal/developer" element={<Navigate to="/portal/staff" replace />} />
<Route path="/portal/senior" element={<Navigate to="/portal/staff" replace />} />
<Route path="/portal/business" element={<Navigate to="/portal/staff" replace />} />
<Route path="/portal/caregiver" element={<Navigate to="/portal/staff" replace />} />
<Route path="/portal/healthcare" element={<Navigate to="/portal/staff" replace />} />
```

Remove the `<PageTransition>` wrappers from the portal routes since the shell handles transitions now. Also remove the `<ProtectedRoute>` wrappers from individual portal pages since the shell already wraps them.

- [ ] **Step 3: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/portal/PortalShell.tsx src/App.tsx && git commit -m "feat: add PortalShell layout and wire into router"
```

---

### Task 12: DataTable Shared Component

**Files:**
- Create: `src/components/shared/DataTable.tsx`

- [ ] **Step 1: Create DataTable**

```tsx
// src/components/shared/DataTable.tsx
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";
import type { TableColumn } from "@/types/portal";

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Search...",
  pageSize = 10,
  onRowClick,
  isLoading,
  emptyTitle = "No results",
  emptyDescription,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      columns.some((col) => {
        const val = (item as any)[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortKey] ?? "";
      const bVal = (b as any)[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {searchable && <div className="h-9 bg-muted rounded animate-pulse w-64" />}
        <div className="border border-border rounded-lg overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-muted/50 border-b border-border animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder={searchPlaceholder}
            className="pl-9 h-9"
          />
        </div>
      )}

      {paged.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                {columns.map((col) => (
                  <TableHead key={String(col.key)} className="text-xs">
                    {col.sortable ? (
                      <button onClick={() => handleSort(String(col.key))} className="flex items-center gap-1 hover:text-foreground">
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    ) : col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className="text-sm">
                      {col.render ? col.render(item) : String((item as any)[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{sorted.length} result{sorted.length !== 1 ? "s" : ""}</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/shared/DataTable.tsx && git commit -m "feat: add shared DataTable with search, sort, and pagination"
```

---

### Task 13: RealCalendar Component

**Files:**
- Create: `src/components/shared/RealCalendar.tsx`

- [ ] **Step 1: Create RealCalendar**

```tsx
// src/components/shared/RealCalendar.tsx
import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time?: string;
  type?: string;
}

interface RealCalendarProps {
  events: CalendarEvent[];
  title?: string;
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

export function RealCalendar({ events, title = "Calendar", onDateSelect, onEventClick, className }: RealCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const eventDates = useMemo(() => {
    const dates = new Set<string>();
    events.forEach((e) => {
      const d = new Date(e.date);
      dates.add(d.toDateString());
    });
    return dates;
  }, [events]);

  const selectedEvents = useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.date);
      return d.toDateString() === selectedDate.toDateString();
    });
  }, [events, selectedDate]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          modifiers={{ hasEvents: (date) => eventDates.has(date.toDateString()) }}
          modifiersClassNames={{ hasEvents: "font-bold text-primary" }}
          className="rounded-md"
        />
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {selectedEvents.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-2">
              No events on {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
          ) : (
            selectedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer text-sm"
                onClick={() => onEventClick?.(event)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="flex-1 truncate text-foreground">{event.title}</span>
                {event.time && <span className="text-xs text-muted-foreground">{event.time}</span>}
                {event.type && <Badge variant="secondary" className="text-[10px]">{event.type}</Badge>}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd /tmp/secure-senior-safeguard && git add src/components/shared/RealCalendar.tsx && git commit -m "feat: add RealCalendar component that filters events by date"
```

---

### Task 14: Final TypeScript Check and Integration Verification

- [ ] **Step 1: Run full type check**

Run: `cd /tmp/secure-senior-safeguard && ./node_modules/.bin/tsc --noEmit 2>&1`
Expected: No errors

- [ ] **Step 2: Run build**

Run: `cd /tmp/secure-senior-safeguard && npm run build 2>&1 | tail -20`
Expected: Build succeeds

- [ ] **Step 3: Final commit with all remaining changes**

```bash
cd /tmp/secure-senior-safeguard && git add -A && git status
```

If there are unstaged changes, commit them:

```bash
git commit -m "feat: complete Command Center Phase 1 — shell, shared components, hooks"
```
