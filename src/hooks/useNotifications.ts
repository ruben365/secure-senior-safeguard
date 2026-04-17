/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { NotificationData } from "@/types/portal";

export function useNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery<NotificationData[]>({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      return (data ?? []) as NotificationData[];
    },
    enabled: !!user,
    staleTime: 30000,
  });

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from("notifications")
      .update({ read: true } as any)
      .eq("id", notificationId);

    queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
  };

  const markAllAsRead = async () => {
    if (!user) return;

    await supabase
      .from("notifications")
      .update({ read: true } as any)
      .eq("user_id", user.id)
      .eq("read", false);

    queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    isError,
    error,
    markAsRead,
    markAllAsRead,
  };
}
