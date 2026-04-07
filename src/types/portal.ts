import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  icon: LucideIcon;
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
  icon: LucideIcon;
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

export interface PipelineColumn extends PipelineStage {
  items: PipelineItem[];
  count: number;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  priority: "critical" | "high" | "medium" | "low";
  icon?: LucideIcon;
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

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type?: string;
}
