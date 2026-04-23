import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/useNotifications";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

export function NotificationCenter() {
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } =
    useNotifications();

  const displayCount = unreadCount > 9 ? "9+" : unreadCount > 0 ? String(unreadCount) : null;

  const handleNotificationClick = (id: string, actionUrl: string | null) => {
    markAsRead(id);
    if (actionUrl) {
      window.location.href = actionUrl;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open notifications">
          <Bell className="h-5 w-5" />
          {displayCount && (
            <Badge
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] leading-none flex items-center justify-center bg-destructive text-destructive-foreground border-0"
            >
              {displayCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-4 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => markAllAsRead()}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Body */}
        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 px-4 text-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(notification.id, notification.action_url)
                  }
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex gap-3 items-start",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  {/* Unread indicator dot */}
                  <span className="mt-1.5 flex-shrink-0">
                    {!notification.read ? (
                      <span className="block h-2 w-2 rounded-full bg-primary" />
                    ) : (
                      <span className="block h-2 w-2" />
                    )}
                  </span>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <p
                      className={cn(
                        "text-sm leading-snug",
                        !notification.read
                          ? "font-semibold text-foreground"
                          : "font-normal text-foreground"
                      )}
                    >
                      {notification.title}
                    </p>
                    {notification.body && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.body}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(notification.created_at)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
