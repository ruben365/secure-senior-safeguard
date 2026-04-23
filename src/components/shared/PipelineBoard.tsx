import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";
import { PipelineCard } from "./PipelineCard";
import type { PipelineColumn } from "@/types/portal";

interface PipelineBoardProps {
  columns: PipelineColumn[];
  isLoading?: boolean;
  className?: string;
}

function ColumnSkeleton() {
  return (
    <div className="flex-shrink-0 w-64 space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Skeleton className="h-2.5 w-2.5 rounded-full" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-4 rounded-full ml-auto" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function PipelineBoard({ columns, isLoading = false, className }: PipelineBoardProps) {
  if (isLoading) {
    return (
      <ScrollArea className={cn("w-full", className)}>
        <div className="flex gap-4 pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ColumnSkeleton key={i} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  if (columns.length === 0) {
    return (
      <EmptyState
        title="No pipeline data"
        description="There are no columns to display yet."
        className={className}
      />
    );
  }

  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-4 pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-64 space-y-3">
            {/* Column header */}
            <div className="flex items-center gap-2 px-1">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: column.color }}
              />
              <span className="text-sm font-medium text-foreground truncate flex-1">
                {column.label}
              </span>
              <Badge variant="secondary" className="text-xs px-1.5 py-0 flex-shrink-0">
                {column.count}
              </Badge>
            </div>

            {/* Column items */}
            <div className="space-y-2">
              {column.items.length === 0 ? (
                <EmptyState
                  title="No items"
                  className="py-4"
                />
              ) : (
                column.items.map((item) => (
                  <PipelineCard key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
