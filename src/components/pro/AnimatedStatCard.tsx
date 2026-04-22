import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnimatedStatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  className?: string;
}

export function AnimatedStatCard({
  icon: Icon,
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  className,
}: AnimatedStatCardProps) {
  return (
    <div className={cn("stat-card-pro", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="icon-glow-ring p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)]">
          <Icon className="w-6 h-6 text-[hsl(var(--accent))]" />
        </div>
      </div>
      <div className="stat-number mb-1">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-semibold text-foreground/80 mb-1">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
}
