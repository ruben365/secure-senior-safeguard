import { Skeleton } from "@/components/ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Chart title */}
      <Skeleton className="h-6 w-48" />
      
      {/* Chart area */}
      <div className="space-y-2">
        {/* Bar chart visualization */}
        <div className="flex items-end gap-2 h-64">
          {[40, 65, 55, 80, 70, 85, 60].map((height, i) => (
            <Skeleton 
              key={i} 
              className="flex-1 rounded-t-lg" 
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
};
