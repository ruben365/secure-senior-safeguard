interface EnhancedPageLoaderProps {
  message?: string;
}

// Simplified page loader - no framer-motion
export const EnhancedPageLoader = ({ message = "Loading..." }: EnhancedPageLoaderProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};
