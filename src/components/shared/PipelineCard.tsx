import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PipelineItem } from "@/types/portal";

interface PipelineCardProps {
  item: PipelineItem;
  className?: string;
}

function ageBadgeLabel(createdAt?: string): string {
  if (!createdAt) return "";
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  return `${diffDays}d`;
}

export function PipelineCard({ item, className }: PipelineCardProps) {
  const ageLabel = ageBadgeLabel(item.createdAt);
  const metaEntries = item.metadata ? Object.entries(item.metadata) : [];

  const inner = (
    <Card
      className={cn(
        "cursor-pointer border border-border transition-colors hover:border-primary",
        className
      )}
    >
      <CardContent className="p-3 space-y-2">
        <div className="space-y-0.5">
          <p className="text-sm font-medium leading-tight text-foreground line-clamp-2">
            {item.title}
          </p>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {item.subtitle}
            </p>
          )}
        </div>

        {(ageLabel || metaEntries.length > 0) && (
          <div className="flex flex-wrap gap-1">
            {ageLabel && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {ageLabel}
              </Badge>
            )}
            {metaEntries.map(([key, value]) => (
              <Badge key={key} variant="outline" className="text-xs px-1.5 py-0">
                {key}: {value}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (item.href) {
    return (
      <a href={item.href} className="block no-underline">
        {inner}
      </a>
    );
  }

  return inner;
}
