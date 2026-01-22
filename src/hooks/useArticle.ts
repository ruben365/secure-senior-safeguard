import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
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
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export function useArticle(id: string | undefined) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async (): Promise<Article | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}
