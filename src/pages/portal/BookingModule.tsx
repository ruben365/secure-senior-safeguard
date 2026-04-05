import { useQuery } from "@tanstack/react-query";
import { CalendarClock, List, Columns3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { PipelineBoard } from "@/components/shared/PipelineBoard";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePipeline } from "@/hooks/usePipeline";
import type { PipelineStage, TableColumn } from "@/types/portal";

// ── Constants ─────────────────────────────────────────────────────────────────

const BOOKING_STAGES: PipelineStage[] = [
  { id: "pending", label: "Pending", color: "#f59e0b" },
  { id: "confirmed", label: "Confirmed", color: "#3b82f6" },
  { id: "completed", label: "Completed", color: "#22c55e" },
  { id: "cancelled", label: "Cancelled", color: "#ef4444" },
];

// ── Local types ───────────────────────────────────────────────────────────────

interface BookingRequest {
  id: string;
  full_name: string;
  email: string;
  service_name: string;
  service_type: string;
  status: string;
  preferred_dates: string | null;
  created_at: string;
  request_number: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-green-500/10 text-green-600 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
};

function StatusBadge({ status }: { status: string }) {
  const cls =
    STATUS_STYLES[status.toLowerCase()] ??
    "bg-muted text-muted-foreground border-border";
  return (
    <Badge variant="outline" className={cls}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

// ── Columns ───────────────────────────────────────────────────────────────────

const listColumns: TableColumn<BookingRequest>[] = [
  {
    key: "full_name",
    label: "Client Name",
    sortable: true,
    render: (item) => (
      <span className="font-medium text-foreground">{item.full_name}</span>
    ),
  },
  {
    key: "service_name",
    label: "Service",
    sortable: true,
    render: (item) => (
      <span className="text-foreground">{item.service_name}</span>
    ),
  },
  {
    key: "preferred_dates",
    label: "Requested Date",
    render: (item) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(item.preferred_dates)}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "created_at",
    label: "Created",
    sortable: true,
    render: (item) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(item.created_at)}
      </span>
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function BookingModule() {
  const { user } = useAuth();

  // List view data
  const {
    data: bookings = [],
    isLoading: listLoading,
    isError: listError,
    refetch,
  } = useQuery({
    queryKey: ["booking_requests_list", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select(
          "id, full_name, email, service_name, service_type, status, preferred_dates, created_at, request_number",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BookingRequest[];
    },
  });

  // Pipeline view data
  const {
    columns: pipelineColumns,
    isLoading: pipelineLoading,
    isError: pipelineError,
  } = usePipeline({
    table: "booking_requests",
    stageField: "status",
    stages: BOOKING_STAGES,
    titleField: "service_name",
    subtitleField: "email",
    enabled: !!user,
  });

  const hasError = listError || pipelineError;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <CalendarClock className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage service booking requests
          </p>
        </div>
      </div>

      {/* Error */}
      {hasError && (
        <ErrorState
          title="Failed to load bookings"
          description="There was a problem fetching booking data."
          onRetry={() => refetch()}
        />
      )}

      {/* View toggle + content */}
      {!hasError && (
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="gap-2">
              <Columns3 className="h-4 w-4" />
              Pipeline
            </TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list" className="mt-4">
            <DataTable
              data={bookings}
              columns={listColumns}
              isLoading={listLoading}
              searchPlaceholder="Search bookings..."
              emptyTitle="No bookings found"
              emptyDescription="No booking requests have been submitted yet."
            />
          </TabsContent>

          {/* Pipeline View */}
          <TabsContent value="pipeline" className="mt-4">
            <PipelineBoard
              columns={pipelineColumns}
              isLoading={pipelineLoading}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
