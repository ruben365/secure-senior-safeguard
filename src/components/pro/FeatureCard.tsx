import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  className,
}: FeatureCardProps) {
  return (
    <div className={cn("feature-highlight group", className)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.06)] group-hover:from-[hsl(var(--primary)/0.15)] group-hover:to-[hsl(var(--accent)/0.1)] transition-colors">
          <Icon className="w-4 h-4 text-[hsl(var(--accent))]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-foreground">{title}</h3>
            {badge && (
              <span className="frosted-pill-accent text-xs py-0.5 px-2">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
