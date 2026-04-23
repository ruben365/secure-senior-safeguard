import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Megaphone, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

// 42P01 = true missing table (permanent); set once and never retry
let announcementsTableKnownMissing = false;
// PGRST205 / message-based = transient schema-cache miss; retry after cooldown
let announcementsRetryAfter = 0;

export function AnnouncementBell() {
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [open, setOpen] = useState(false);
  const [tableExists, setTableExists] = useState(!announcementsTableKnownMissing);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("invision_dismissed_announcements");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const fetchAnnouncements = useCallback(async () => {
    if (announcementsTableKnownMissing) return;
    if (Date.now() < announcementsRetryAfter) return;
    const { data, error } = await supabase
      .from("announcements")
      .select("id, title, content, created_at")
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      const code = (error as { code?: string }).code;
      const msg = error.message ?? "";
      if (code === "42P01") {
        // True missing table — permanently disable
        announcementsTableKnownMissing = true;
        setTableExists(false);
      } else if (
        code === "PGRST205" ||
        msg.includes("does not exist") ||
        msg.includes("Could not find the table")
      ) {
        // Transient schema-cache miss — back off 60 s then retry once
        announcementsRetryAfter = Date.now() + 60_000;
        retryTimeoutRef.current = setTimeout(() => {
          if (!announcementsTableKnownMissing && Date.now() >= announcementsRetryAfter) {
            fetchAnnouncements();
          }
        }, 60_000);
      }
      return;
    }
    if (data) setAnnouncements(data);
  }, []);

  useEffect(() => {
    if (announcementsTableKnownMissing) return;
    fetchAnnouncements();

    const channel = supabase
      .channel("public-announcements")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        fetchAnnouncements,
      )
      .subscribe();

    return () => {
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      supabase.removeChannel(channel);
    };
  }, [fetchAnnouncements]);

  const unreadCount = announcements.filter((a) => !dismissedIds.has(a.id)).length;

  const dismiss = (id: string) => {
    const next = new Set(dismissedIds);
    next.add(id);
    setDismissedIds(next);
    localStorage.setItem(
      "invision_dismissed_announcements",
      JSON.stringify([...next]),
    );
  };

  const dismissAll = () => {
    const next = new Set(announcements.map((a) => a.id));
    setDismissedIds(next);
    localStorage.setItem(
      "invision_dismissed_announcements",
      JSON.stringify([...next]),
    );
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!tableExists) return null;

  return (
    <div className="relative">
      {/* Bell trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20 backdrop-blur-[8px] border border-white/15 hover:border-white/30 text-white/70 hover:text-white transition-all relative"
        aria-label={`Announcements${unreadCount > 0 ? `, ${unreadCount} new` : ""}`}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-orange-500 rounded-full leading-none shadow-[0_0_8px_rgba(249,115,22,0.45)]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 z-50 w-[min(384px,calc(100vw-2rem))] rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            style={{
              background: "rgba(15, 15, 20, 0.92)",
              backdropFilter: "blur(20px) saturate(120%)",
              WebkitBackdropFilter: "blur(20px) saturate(120%)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white">Announcements</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={dismissAll}
                    className="text-[11px] font-medium text-gray-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/8 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-white/8 transition-colors"
                  aria-label="Close announcements"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto overscroll-contain">
              {announcements.length === 0 ? (
                <div className="px-4 py-5 text-center">
                  <Megaphone className="w-4 h-4 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No announcements yet</p>
                </div>
              ) : (
                announcements.map((ann) => {
                  const isUnread = !dismissedIds.has(ann.id);
                  return (
                    <div
                      key={ann.id}
                      className={`px-4 py-3 border-b border-white/5 transition-colors hover:bg-white/[0.03] ${
                        isUnread ? "" : "opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Unread dot */}
                        <div className="pt-1.5 w-2 flex-shrink-0">
                          {isUnread && (
                            <span className="block w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.55)]" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-white truncate">
                              {ann.title}
                            </h4>
                            <span className="text-[10px] text-gray-500 flex-shrink-0">
                              {formatDate(ann.created_at)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                            {ann.content}
                          </p>
                        </div>

                        {/* Dismiss */}
                        {isUnread && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); dismiss(ann.id); }}
                            className="p-1 text-gray-500 hover:text-white rounded transition-colors flex-shrink-0"
                            aria-label="Dismiss"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {announcements.length > 0 && (
              <div className="px-4 py-2.5 border-t border-white/5 text-center">
                <span className="text-[11px] text-gray-500">
                  Posted by InVision Network
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
