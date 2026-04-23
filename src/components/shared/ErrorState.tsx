import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-7 px-4 text-center", className)}>
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-lg font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        )}
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>{retryLabel}</Button>
      )}
    </div>
  );
}
