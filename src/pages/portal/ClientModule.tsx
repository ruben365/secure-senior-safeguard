import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import type { TableColumn } from "@/types/portal";

// ── Local types ───────────────────────────────────────────────────────────────

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  tags: string[] | null;
  created_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Derive a rough "type" from tags: tag containing "business" → Business, else Individual */
function deriveClientType(client: Client): "Individual" | "Business" {
  if (client.tags?.some((t) => t.toLowerCase().includes("business"))) {
    return "Business";
  }
  return "Individual";
}

// ── Columns ───────────────────────────────────────────────────────────────────

const columns: TableColumn<Client>[] = [
  {
    key: "first_name",
    label: "Name",
    sortable: true,
    render: (item) => (
      <span className="font-medium text-foreground">
        {item.first_name} {item.last_name}
      </span>
    ),
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    render: (item) => (
      <span className="text-muted-foreground">{item.email}</span>
    ),
  },
  {
    key: "tags",
    label: "Type",
    render: (item) => {
      const type = deriveClientType(item);
      return (
        <Badge
          variant="secondary"
          className={
            type === "Business"
              ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
              : "bg-violet-500/10 text-violet-600 border-violet-500/20"
          }
        >
          {type}
        </Badge>
      );
    },
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

export default function ClientModule() {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();

  const {
    data: clients = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["clients", user?.id],
    enabled: !!user,
    queryFn: async () => {
      let query = supabase
        .from("clients")
        .select("id, first_name, last_name, email, phone, tags, created_at")
        .order("created_at", { ascending: false });

      // Non-admin users only see their assigned clients (if table supports it).
      // The clients table has no assigned_staff_id, so this filter is omitted;
      // permission enforcement is handled at the route level.
      void hasPermission; // referenced to avoid lint warning

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Client[];
    },
  });

  const individualClients = clients.filter(
    (c) => deriveClientType(c) === "Individual",
  );
  const businessClients = clients.filter(
    (c) => deriveClientType(c) === "Business",
  );

  function handleRowClick(item: Client) {
    navigate(`/portal/clients/${item.id}`);
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            <p className="text-sm text-muted-foreground">
              Manage your client relationships
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <ErrorState
          title="Failed to load clients"
          description="There was a problem fetching the client list."
          onRetry={() => refetch()}
        />
      )}

      {/* Tabs + Table */}
      {!isError && (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                {clients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="individual">
              Individual
              <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                {individualClients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="business">
              Business
              <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                {businessClients.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <DataTable
              data={clients}
              columns={columns}
              isLoading={isLoading}
              onRowClick={handleRowClick}
              searchPlaceholder="Search clients..."
              emptyTitle="No clients found"
              emptyDescription="There are no clients to display yet."
            />
          </TabsContent>

          <TabsContent value="individual" className="mt-4">
            <DataTable
              data={individualClients}
              columns={columns}
              isLoading={isLoading}
              onRowClick={handleRowClick}
              searchPlaceholder="Search individual clients..."
              emptyTitle="No individual clients"
              emptyDescription="No individual clients match your search."
            />
          </TabsContent>

          <TabsContent value="business" className="mt-4">
            <DataTable
              data={businessClients}
              columns={columns}
              isLoading={isLoading}
              onRowClick={handleRowClick}
              searchPlaceholder="Search business clients..."
              emptyTitle="No business clients"
              emptyDescription="No business clients match your search."
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
