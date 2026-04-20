import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface BookPurchaseState {
  isPurchased: (bookId: string) => boolean;
  purchasedBookIds: string[];
  isLoading: boolean;
  hasAnyPurchase: boolean;
}

export function useBookPurchase(): BookPurchaseState {
  const { user } = useAuth();

  const { data: purchasedBookIds = [], isLoading } = useQuery({
    queryKey: ["book-purchases", user?.email],
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => {
      const { data, error } = await supabase
        .from("book_purchases")
        .select("book_ids")
        .eq("customer_email", user!.email!);

      if (error) throw error;

      // Flatten all purchased book_ids arrays into one set
      return (data ?? []).flatMap((row) => row.book_ids as string[]);
    },
  });

  return {
    isPurchased: (bookId: string) => purchasedBookIds.includes(bookId),
    purchasedBookIds,
    isLoading,
    hasAnyPurchase: purchasedBookIds.length > 0,
  };
}
