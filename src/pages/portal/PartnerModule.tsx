import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { supabase } from "@/integrations/supabase/client";
import type { TableColumn, StatCardData } from "@/types/portal";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Partner {
  id: string;
  name: string | null;
  email: string | null;
  status: string | null;
  total_referrals: number | null;
  created_at: string;
}

interface Commission {
  id: string;
  partner_name: string | null;
  amount: number | null;
  status: string | null;
  created_at: string;
}

interface Payout {
  id: string;
  partner: string | null;
  amount: number | null;
  status: string | null;
  payout_date: string | null;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function formatCurrency(value: number | null) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-muted-foreground">—</span>;
  const variants: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    inactive: "bg-muted text-muted-foreground border-border",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
    paid: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
    approved: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  };
  const cls = variants[status.toLowerCase()] ?? "bg-muted text-muted-foreground border-border";
  return <Badge variant="outline" className={cls}>{status}</Badge>;
}

/* ─── Column definitions ─────────────────────────────────────────────────── */

const PARTNER_COLUMNS: TableColumn<Partner>[] = [
  { key: "name", label: "Name", sortable: true, render: (i) => i.name ?? "—" },
  { key: "email", label: "Email", sortable: true, render: (i) => i.email ?? "—" },
  { key: "status", label: "Status", render: (i) => <StatusBadge status={i.status} /> },
  {
    key: "total_referrals",
    label: "Referrals",
    sortable: true,
    render: (i) => String(i.total_referrals ?? 0),
  },
  {
    key: "created_at",
    label: "Joined",
    sortable: true,
    render: (i) => new Date(i.created_at).toLocaleDateString(),
  },
];

const COMMISSION_COLUMNS: TableColumn<Commission>[] = [
  { key: "partner_name", label: "Partner", sortable: true, render: (i) => i.partner_name ?? "—" },
  { key: "amount", label: "Amount", sortable: true, render: (i) => formatCurrency(i.amount) },
  { key: "status", label: "Status", render: (i) => <StatusBadge status={i.status} /> },
  {
    key: "created_at",
    label: "Date",
    sortable: true,
    render: (i) => new Date(i.created_at).toLocaleDateString(),
  },
];

const PAYOUT_COLUMNS: TableColumn<Payout>[] = [
  { key: "partner", label: "Partner", sortable: true, render: (i) => i.partner ?? "—" },
  { key: "amount", label: "Amount", sortable: true, render: (i) => formatCurrency(i.amount) },
  { key: "status", label: "Status", render: (i) => <StatusBadge status={i.status} /> },
  {
    key: "payout_date",
    label: "Payout Date",
    sortable: true,
    render: (i) => (i.payout_date ? new Date(i.payout_date).toLocaleDateString() : "—"),
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function PartnerModule() {
  const [tab, setTab] = useState<"partners" | "commissions" | "payouts">("partners");

  /* Stats queries */
  const { data: partnerCount = 0 } = useQuery({
    queryKey: ["partners-count"],
    queryFn: async () => {
      const { count, error } = await (supabase.from("partners" as any) as any)
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });

  const { data: commissionsTotal = 0 } = useQuery({
    queryKey: ["commissions-total"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("partner_commissions" as any) as any)
        .select("amount");
      if (error) throw error;
      return (data as { amount: number | null }[]).reduce((s, r) => s + (r.amount ?? 0), 0);
    },
  });

  const { data: pendingPayouts = 0 } = useQuery({
    queryKey: ["pending-payouts-count"],
    queryFn: async () => {
      const { count, error } = await (supabase.from("commission_payouts" as any) as any)
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      if (error) throw error;
      return count ?? 0;
    },
  });

  /* Table data queries */
  const { data: partners = [], isLoading: loadingPartners, isError: errorPartners } = useQuery({
    queryKey: ["partners-list"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("partners" as any) as any)
        .select("id, name, email, status, total_referrals, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Partner[];
    },
    enabled: tab === "partners",
  });

  const { data: commissions = [], isLoading: loadingCommissions, isError: errorCommissions } = useQuery({
    queryKey: ["commissions-list"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("partner_commissions" as any) as any)
        .select("id, partner_name, amount, status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Commission[];
    },
    enabled: tab === "commissions",
  });

  const { data: payouts = [], isLoading: loadingPayouts, isError: errorPayouts } = useQuery({
    queryKey: ["payouts-list"],
    queryFn: async () => {
      const { data, error } = await (supabase.from("commission_payouts" as any) as any)
        .select("id, partner, amount, status, payout_date")
        .order("payout_date", { ascending: false });
      if (error) throw error;
      return data as Payout[];
    },
    enabled: tab === "payouts",
  });

  const stats: StatCardData[] = [
    {
      title: "Total Partners",
      value: partnerCount,
      subtitle: "Active partner accounts",
      icon: Users,
    },
    {
      title: "Total Commissions",
      value: formatCurrency(commissionsTotal),
      subtitle: "Commissions earned",
      icon: DollarSign,
    },
    {
      title: "Pending Payouts",
      value: pendingPayouts,
      subtitle: "Awaiting disbursement",
      icon: Clock,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Partners & Affiliates</h1>
          <p className="text-sm text-muted-foreground">Manage partner relationships, commissions, and payouts</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} data={stat} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="mt-4">
          {errorPartners ? (
            <EmptyState title="Failed to load partners" description="There was an error fetching partner data." />
          ) : (
            <DataTable
              data={partners}
              columns={PARTNER_COLUMNS}
              isLoading={loadingPartners}
              searchPlaceholder="Search partners..."
              emptyTitle="No partners found"
              emptyDescription="No partner accounts have been created yet."
            />
          )}
        </TabsContent>

        <TabsContent value="commissions" className="mt-4">
          {errorCommissions ? (
            <EmptyState title="Failed to load commissions" description="There was an error fetching commission data." />
          ) : (
            <DataTable
              data={commissions}
              columns={COMMISSION_COLUMNS}
              isLoading={loadingCommissions}
              searchPlaceholder="Search commissions..."
              emptyTitle="No commissions found"
              emptyDescription="No commission records exist yet."
            />
          )}
        </TabsContent>

        <TabsContent value="payouts" className="mt-4">
          {errorPayouts ? (
            <EmptyState title="Failed to load payouts" description="There was an error fetching payout data." />
          ) : (
            <DataTable
              data={payouts}
              columns={PAYOUT_COLUMNS}
              isLoading={loadingPayouts}
              searchPlaceholder="Search payouts..."
              emptyTitle="No payouts found"
              emptyDescription="No payout records exist yet."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
