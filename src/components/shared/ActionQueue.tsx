import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";
import type { ActionItem } from "@/types/portal";

const priorityStyles: Record<ActionItem["priority"], { container: string; text: string }> = {
  critical: { container: "bg-red-500/10", text: "text-red-500" },
  high: { container: "bg-orange-500/10", text: "text-orange-500" },
  medium: { container: "bg-yellow-500/10", text: "text-yellow-500" },
  low: { container: "bg-primary/50/10", text: "text-primary" },
};

interface ActionQueueProps {
  title: string;
  items: ActionItem[];
  maxItems?: number;
  onViewAll?: () => void;
  className?: string;
}

export function ActionQueue({
  title,
  items,
  maxItems = 5,
  onViewAll,
  className,
}: ActionQueueProps) {
  const visibleItems = items.slice(0, maxItems);
  const remainingCount = items.length - visibleItems.length;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {items.length > 0 && (
          <Badge variant="secondary">{items.length}</Badge>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="px-6 pb-6">
            <EmptyState
              title="No items"
              description="There are no action items at the moment."
              className="py-8"
            />
          </div>
        ) : (
          <div className="flex flex-col">
            {visibleItems.map((item) => {
              const styles = priorityStyles[item.priority];
              const Icon = item.icon;
              const row = (
                <div
                  key={item.id}
                  className={cn(
                    "group flex items-center gap-3 px-6 py-3 transition-colors hover:bg-muted/50",
                    item.href && "cursor-pointer"
                  )}
                  onClick={item.onAction}
                >
                  <div className={cn("flex-shrink-0 rounded-md p-2", styles.container)}>
                    {Icon ? (
                      <Icon className={cn("h-4 w-4", styles.text)} />
                    ) : (
                      <div className={cn("h-4 w-4 rounded-full", styles.text)} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              );

              if (item.href) {
                return (
                  <a key={item.id} href={item.href}>
                    {row}
                  </a>
                );
              }

              return row;
            })}
            {remainingCount > 0 && onViewAll && (
              <div className="px-6 py-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground"
                  onClick={onViewAll}
                >
                  View {remainingCount} more
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
