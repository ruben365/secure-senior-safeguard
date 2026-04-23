import { Skeleton } from "@/components/ui/skeleton";

export function PortalStatSkeleton() {
  return (
    <div className="p-5 bg-[#1F2937] border border-gray-800/50 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-6 h-6 rounded-lg bg-gray-700/40" />
        <Skeleton className="w-10 h-4 rounded bg-gray-700/40" />
      </div>
      <Skeleton className="h-4 w-12 mb-1.5 bg-gray-700/40" />
      <Skeleton className="h-3.5 w-18 bg-gray-700/30" />
    </div>
  );
}

export function PortalCardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="p-4 bg-[#1F2937] border border-gray-800/50 rounded-xl space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-6 h-6 rounded-lg bg-gray-700/40" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-3/4 bg-gray-700/40" />
          <Skeleton className="h-3 w-1/2 bg-gray-700/30" />
        </div>
        <Skeleton className="h-5 w-9 rounded-full bg-gray-700/30" />
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 bg-gray-700/30 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function PortalListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <PortalCardSkeleton key={i} lines={1} />
      ))}
    </div>
  );
}

export function PortalLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Header skeleton */}
      <div className="border-b border-gray-800/60 bg-[#111827]/80 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-10 rounded bg-gray-700/40" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-40 bg-gray-700/40" />
              <Skeleton className="h-3 w-16 bg-gray-700/30" />
            </div>
          </div>
          <Skeleton className="h-5 w-12 rounded bg-gray-700/40" />
        </div>
      </div>

      <div className="container mx-auto py-4">
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PortalStatSkeleton key={i} />
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <PortalListSkeleton rows={4} />
          </div>
          <div>
            <PortalCardSkeleton lines={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessagesLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Header skeleton */}
      <div className="border-b border-gray-800/60 bg-[#111827]/80 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-10 rounded bg-gray-700/40" />
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36 bg-gray-700/40" />
              <Skeleton className="h-3 w-44 bg-gray-700/30" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded bg-gray-700/40" />
            <Skeleton className="h-5 w-12 rounded bg-gray-700/40" />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4">
        {/* Tabs skeleton */}
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-16 rounded bg-gray-700/40" />
          <Skeleton className="h-5 w-12 rounded bg-gray-700/40" />
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Message list skeleton */}
          <div className="lg:col-span-2 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-3 bg-[#1F2937] border border-gray-800/50 rounded-xl">
                <div className="flex items-start gap-2">
                  <Skeleton className="w-3.5 h-3.5 rounded bg-gray-700/40 mt-0.5 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4 bg-gray-700/40" />
                    <Skeleton className="h-3 w-1/2 bg-gray-700/30" />
                    <Skeleton className="h-2.5 w-1/3 bg-gray-700/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail skeleton */}
          <div className="lg:col-span-3">
            <div className="p-4 bg-[#1F2937] border border-gray-800/50 rounded-xl space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-2/3 bg-gray-700/40" />
                <Skeleton className="h-3 w-1/3 bg-gray-700/30" />
              </div>
              <div className="bg-[#111827] rounded-lg border border-gray-800/40 p-4 space-y-2">
                <Skeleton className="h-3.5 w-full bg-gray-700/30" />
                <Skeleton className="h-3.5 w-full bg-gray-700/30" />
                <Skeleton className="h-3.5 w-4/5 bg-gray-700/30" />
                <Skeleton className="h-3.5 w-2/3 bg-gray-700/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
