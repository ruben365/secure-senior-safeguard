import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "product" | "client" | "order" | "stat" | "article";
  className?: string;
}

export function SkeletonCard({
  variant = "product",
  className,
}: SkeletonCardProps) {
  if (variant === "product") {
    return (
      <Card className={cn("p-4 space-y-3", className)}>
        <Skeleton className="w-full h-48 rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-full rounded-md" />
      </Card>
    );
  }

  if (variant === "client") {
    return (
      <Card className={cn("p-4 space-y-4", className)}>
        <div className="flex items-start gap-3">
          <Skeleton className="w-7 h-7 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </Card>
    );
  }

  if (variant === "order") {
    return (
      <Card className={cn("p-4 space-y-3", className)}>
        <div className="flex justify-between items-start">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-10" />
        </div>
      </Card>
    );
  }

  if (variant === "stat") {
    return (
      <Card className={cn("p-4 space-y-3", className)}>
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-3 w-20" />
      </Card>
    );
  }

  if (variant === "article") {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2 items-center pt-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </Card>
    );
  }

  return null;
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({
  rows = 5,
  columns = 6,
  className,
}: SkeletonTableProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  variant = "product",
  className,
}: {
  count?: number;
  variant?: SkeletonCardProps["variant"];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}
