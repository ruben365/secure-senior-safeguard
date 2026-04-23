import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatCardData } from "@/types/portal";

interface StatCardProps {
  data: StatCardData;
  className?: string;
}

export function StatCard({ data, className }: StatCardProps) {
  const { title, value, subtitle, icon: Icon, trend, href } = data;

  const trendConfig = trend
    ? {
        up: {
          icon: TrendingUp,
          color: "text-green-500",
          label: `+${trend.value}%`,
        },
        down: {
          icon: TrendingDown,
          color: "text-red-500",
          label: `-${trend.value}%`,
        },
        flat: {
          icon: Minus,
          color: "text-muted-foreground",
          label: `${trend.value}%`,
        },
      }[trend.direction]
    : null;

  const cardContent = (
    <Card className={cn("transition-colors", href && "hover:bg-muted/50 cursor-pointer", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-sm font-medium text-muted-foreground truncate">{title}</span>
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
            {trendConfig && (
              <div className={cn("flex items-center gap-1 text-xs font-medium mt-1", trendConfig.color)}>
                <trendConfig.icon className="h-3 w-3" />
                <span>{trendConfig.label}</span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 rounded-full bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <a href={href}>{cardContent}</a>;
  }

  return cardContent;
}
