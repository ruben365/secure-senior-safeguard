import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ArticleInsert {
  title: string;
  slug: string;
  content: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  excerpt?: string;
  author_id?: string;
  featured_image_url?: string;
  tags?: string[];
  scheduled_for?: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
}

export interface ArticleUpdate extends Partial<ArticleInsert> {
  id: string;
}

export function useArticleMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createArticle = useMutation({
    mutationFn: async (article: ArticleInsert) => {
      const { data, error } = await supabase
        .from("articles")
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Create article error:", error);
      toast({
        title: "Failed to create article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateArticle = useMutation({
    mutationFn: async ({ id, ...updates }: ArticleUpdate) => {
      const { data, error } = await supabase
        .from("articles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Update article error:", error);
      toast({
        title: "Failed to update article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const publishArticle = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("articles")
        .update({
          status: "published",
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Publish article error:", error);
      toast({
        title: "Failed to publish article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const scheduleArticle = useMutation({
    mutationFn: async ({ id, scheduledFor }: { id: string; scheduledFor: string }) => {
      const { data, error } = await supabase
        .from("articles")
        .update({
          status: "scheduled",
          scheduled_for: scheduledFor,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Schedule article error:", error);
      toast({
        title: "Failed to schedule article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: Error) => {
      console.error("Delete article error:", error);
      toast({
        title: "Failed to delete article",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createArticle,
    updateArticle,
    publishArticle,
    scheduleArticle,
    deleteArticle,
  };
}
