/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { PipelineBoard } from "@/components/shared/PipelineBoard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { usePipeline } from "@/hooks/usePipeline";
import { supabase } from "@/integrations/supabase/client";
import type { TableColumn, PipelineStage } from "@/types/portal";

const STAGES: PipelineStage[] = [
  { id: "todo", label: "To Do", color: "#6b7280" },
  { id: "in_progress", label: "In Progress", color: "#3b82f6" },
  { id: "review", label: "Review", color: "#f59e0b" },
  { id: "done", label: "Done", color: "#22c55e" },
];

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    todo: { label: "To Do", className: "bg-muted text-muted-foreground border-border" },
    in_progress: { label: "In Progress", className: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/10 dark:text-primary dark:border-primary/30" },
    review: { label: "Review", className: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800" },
    done: { label: "Done", className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800" },
  };
  const v = variants[status] ?? { label: status, className: "bg-muted text-muted-foreground" };
  return <Badge variant="outline" className={v.className}>{v.label}</Badge>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    high: { label: "High", className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800" },
    medium: { label: "Medium", className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800" },
    low: { label: "Low", className: "bg-primary/10 text-primary border-primary/20 dark:bg-primary/10 dark:text-primary dark:border-primary/30" },
  };
  const v = variants[priority] ?? { label: priority, className: "bg-muted text-muted-foreground" };
  return <Badge variant="outline" className={v.className}>{v.label}</Badge>;
}

const COLUMNS: TableColumn<Task>[] = [
  { key: "title", label: "Title", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "priority",
    label: "Priority",
    render: (item) => <PriorityBadge priority={item.priority} />,
  },
  {
    key: "due_date",
    label: "Due Date",
    sortable: true,
    render: (item) =>
      item.due_date ? new Date(item.due_date).toLocaleDateString() : "—",
  },
  {
    key: "created_at",
    label: "Created",
    sortable: true,
    render: (item) => new Date(item.created_at).toLocaleDateString(),
  },
];

export default function TaskModule() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"board" | "list">("board");

  const pipeline = usePipeline({
    table: "tasks",
    stageField: "status",
    titleField: "title",
    stages: STAGES,
    filters: user ? { user_id: user.id } : {},
    enabled: !!user,
  });

  const { data: tasks = [], isLoading: isLoadingList } = useQuery({
    queryKey: ["tasks-list", user?.id],
    queryFn: async () => {
      const { data, error } = await (supabase.from("tasks" as any) as any)
        .select("id, title, status, priority, due_date, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Task[];
    },
    enabled: !!user && tab === "list",
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
            <p className="text-sm text-muted-foreground">Manage and track your work</p>
          </div>
        </div>
        <Button onClick={() => {}}>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as "board" | "list")}>
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="mt-4">
          {pipeline.isError ? (
            <EmptyState
              title="Failed to load tasks"
              description="There was an error loading the board. Please try again."
            />
          ) : (
            <PipelineBoard columns={pipeline.columns} isLoading={pipeline.isLoading} />
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <DataTable
            data={tasks}
            columns={COLUMNS}
            isLoading={isLoadingList}
            searchPlaceholder="Search tasks..."
            emptyTitle="No tasks found"
            emptyDescription="Create your first task to get started."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
