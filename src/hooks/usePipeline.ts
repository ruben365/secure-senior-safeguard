import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PipelineStage, PipelineItem, PipelineColumn } from "@/types/portal";

export interface UsePipelineOptions {
  table: string;
  stageField: string;
  stages: PipelineStage[];
  titleField: string;
  subtitleField?: string;
  filters?: Record<string, string>;
  limit?: number;
  enabled?: boolean;
}

function mapRowToItem(
  row: Record<string, unknown>,
  stageField: string,
  titleField: string,
  subtitleField?: string
): PipelineItem {
  return {
    id: String(row["id"] ?? ""),
    title: String(row[titleField] ?? ""),
    subtitle: subtitleField ? String(row[subtitleField] ?? "") : undefined,
    stage: String(row[stageField] ?? ""),
    createdAt: row["created_at"] != null ? String(row["created_at"]) : undefined,
  };
}

export function usePipeline(options: UsePipelineOptions) {
  const {
    table,
    stageField,
    stages,
    titleField,
    subtitleField,
    filters = {},
    limit = 100,
    enabled = true,
  } = options;

  const queryClient = useQueryClient();
  const queryKey = ["pipeline", table, stageField, filters, limit];

  const query = useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let builder = (supabase.from(table as any) as any).select("*");

      for (const [col, val] of Object.entries(filters)) {
        builder = builder.eq(col, val);
      }

      builder = builder.limit(limit);

      const { data, error } = await builder;
      if (error) throw error;

      return (data as Record<string, unknown>[]).map((row) =>
        mapRowToItem(row, stageField, titleField, subtitleField)
      );
    },
  });

  const items: PipelineItem[] = query.data ?? [];

  const columns: PipelineColumn[] = stages.map((stage) => {
    const stageItems = items.filter((item) => item.stage === stage.id);
    return {
      ...stage,
      items: stageItems,
      count: stageItems.length,
    };
  });

  const mutation = useMutation({
    mutationFn: async ({
      itemId,
      newStage,
    }: {
      itemId: string;
      newStage: string;
    }) => {
      const { error } = await (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase.from(table as any) as any)
          .update({ [stageField]: newStage })
          .eq("id", itemId)
      );
      if (error) throw error;
    },
    onSuccess: (_data, { itemId, newStage }) => {
      queryClient.setQueryData<PipelineItem[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === itemId ? { ...item, stage: newStage } : item
        );
      });
    },
  });

  function moveItem(itemId: string, newStage: string) {
    mutation.mutate({ itemId, newStage });
  }

  return {
    columns,
    items,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    moveItem,
  };
}
