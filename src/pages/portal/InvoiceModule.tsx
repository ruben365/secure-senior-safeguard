import { useQuery } from "@tanstack/react-query";
import { FileText, DollarSign, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { supabase } from "@/integrations/supabase/client";
import type { TableColumn, StatCardData } from "@/types/portal";

interface Invoice {
  id: string;
  client: string | null;
  amount: number | null;
  status: string;
  due_date: string | null;
  created_at: string;
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    paid: { label: "Paid", className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800" },
    overdue: { label: "Overdue", className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800" },
  };
  const v = variants[status] ?? { label: status, className: "bg-muted text-muted-foreground" };
  return <Badge variant="outline" className={v.className}>{v.label}</Badge>;
}

const COLUMNS: TableColumn<Invoice>[] = [
  {
    key: "id",
    label: "Invoice #",
    render: (item) => (
      <span className="font-mono text-xs text-muted-foreground">{item.id.slice(0, 8).toUpperCase()}</span>
    ),
  },
  { key: "client", label: "Client", sortable: true, render: (item) => item.client ?? "—" },
  {
    key: "amount",
    label: "Amount",
    sortable: true,
    render: (item) =>
      item.amount != null
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.amount)
        : "—",
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "due_date",
    label: "Due Date",
    sortable: true,
    render: (item) => (item.due_date ? new Date(item.due_date).toLocaleDateString() : "—"),
  },
  {
    key: "created_at",
    label: "Created",
    sortable: true,
    render: (item) => new Date(item.created_at).toLocaleDateString(),
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function InvoiceModule() {
  const { data: invoices = [], isLoading, isError } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("invoices" as any) as any)
        .select("id, client, amount, status, due_date, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Invoice[];
    },
  });

  const totalCount = invoices.length;
  const paidAmount = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + (i.amount ?? 0), 0);
  const outstandingAmount = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + (i.amount ?? 0), 0);

  const stats: StatCardData[] = [
    {
      title: "Total Invoices",
      value: totalCount,
      subtitle: "All time",
      icon: FileText,
    },
    {
      title: "Paid",
      value: formatCurrency(paidAmount),
      subtitle: "Collected revenue",
      icon: CheckCircle,
    },
    {
      title: "Outstanding",
      value: formatCurrency(outstandingAmount),
      subtitle: "Pending & overdue",
      icon: Clock,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
            <p className="text-sm text-muted-foreground">Track billing and payments</p>
          </div>
        </div>
        <Button onClick={() => {}}>
          <FileText className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} data={stat} />
        ))}
      </div>

      {/* Table */}
      {isError ? (
        <EmptyState
          title="Failed to load invoices"
          description="There was a problem fetching invoice data. Please try again."
        />
      ) : (
        <DataTable
          data={invoices}
          columns={COLUMNS}
          isLoading={isLoading}
          searchPlaceholder="Search invoices..."
          emptyTitle="No invoices found"
          emptyDescription="Create your first invoice to get started."
        />
      )}
    </div>
  );
}
