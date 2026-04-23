import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MessageSquare,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Flag,
  Trash2,
  Eye,
  Clock,
  Filter,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author_name: string;
  author_email: string | null;
  content: string;
  page_url: string | null;
  status: "pending" | "approved" | "rejected" | "flagged";
  created_at: string;
  reviewed_at: string | null;
}

// ── Status config ───────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:  { label: "Pending",  class: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  approved: { label: "Approved", class: "bg-green-500/20  text-green-400  border-green-500/30"  },
  rejected: { label: "Rejected", class: "bg-red-500/20    text-red-400    border-red-500/30"    },
  flagged:  { label: "Flagged",  class: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
} as const;

// ── Main page ───────────────────────────────────────────────────────────────

export default function AdminModeration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [search, setSearch] = useState("");
  const [previewComment, setPreviewComment] = useState<Comment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Comment | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // ── Query ─────────────────────────────────────────────────────────────────
  const { data: comments, isLoading, refetch } = useQuery({
    queryKey: ["comments", statusFilter],
    queryFn: async () => {
      let q = supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (statusFilter !== "all") q = q.eq("status", statusFilter);
      const { data, error } = await q;
      if (error) throw error;
      return data as Comment[];
    },
  });

  // Counts per status for KPI cards
  const { data: counts } = useQuery({
    queryKey: ["comment_counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("status");
      if (error) throw error;
      const c: Record<string, number> = { pending: 0, approved: 0, rejected: 0, flagged: 0 };
      (data as { status: string }[]).forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
      return c;
    },
  });

  // ── Mutation ──────────────────────────────────────────────────────────────
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("comments")
        .update({ status, reviewed_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment_counts"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment_counts"] });
      setDeleteTarget(null);
      toast({ title: "Comment deleted" });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const bulkUpdateStatus = async (status: string) => {
    if (!selected.size) return;
    await Promise.all([...selected].map((id) => updateStatus.mutateAsync({ id, status })));
    setSelected(new Set());
    toast({ title: `${selected.size} comment(s) marked as ${status}` });
  };

  // ── Filtered ──────────────────────────────────────────────────────────────
  const filtered = (comments || []).filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.author_name.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q) ||
      (c.author_email || "").toLowerCase().includes(q)
    );
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  };

  // ── KPI cards ─────────────────────────────────────────────────────────────
  const kpis = [
    { label: "Pending",  value: counts?.pending  || 0, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Approved", value: counts?.approved || 0, color: "text-green-400",  bg: "bg-green-500/10"  },
    { label: "Rejected", value: counts?.rejected || 0, color: "text-red-400",    bg: "bg-red-500/10"    },
    { label: "Flagged",  value: counts?.flagged  || 0, color: "text-orange-400", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="p-4 space-y-4 min-h-screen bg-[#0F1117]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-orange-400" />
            Comment Moderation
          </h1>
          <p className="text-[#6B7280] text-sm mt-0.5">Review, approve, and moderate user-submitted comments</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          className="text-[#6B7280] hover:text-[#F9FAFB] gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            className={`bg-[#111827] border-[#1F2937] cursor-pointer transition-all hover:border-orange-500/30 ${statusFilter === kpi.label.toLowerCase() ? "border-orange-500/50" : ""}`}
            onClick={() => setStatusFilter(kpi.label.toLowerCase())}
          >
            <CardContent className="p-4">
              <p className="text-[#6B7280] text-xs mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <Input
            placeholder="Search author, content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 bg-[#111827] border-[#1F2937] text-[#F9FAFB] placeholder:text-[#6B7280]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-[#111827] border-[#1F2937] text-[#9CA3AF]">
            <Filter className="w-3.5 h-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-[#374151]">
            <SelectItem value="all"      className="text-[#F9FAFB] focus:bg-[#374151]">All</SelectItem>
            <SelectItem value="pending"  className="text-[#F9FAFB] focus:bg-[#374151]">Pending</SelectItem>
            <SelectItem value="approved" className="text-[#F9FAFB] focus:bg-[#374151]">Approved</SelectItem>
            <SelectItem value="rejected" className="text-[#F9FAFB] focus:bg-[#374151]">Rejected</SelectItem>
            <SelectItem value="flagged"  className="text-[#F9FAFB] focus:bg-[#374151]">Flagged</SelectItem>
          </SelectContent>
        </Select>

        {selected.size > 0 && (
          <div className="flex gap-2 flex-wrap">
            <span className="text-[#6B7280] text-sm self-center">{selected.size} selected:</span>
            <Button size="sm" variant="ghost" onClick={() => bulkUpdateStatus("approved")}
              className="text-green-400 hover:bg-green-500/10 gap-1 h-5 text-xs">
              <CheckCircle className="w-3.5 h-3.5" /> Approve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => bulkUpdateStatus("rejected")}
              className="text-red-400 hover:bg-red-500/10 gap-1 h-5 text-xs">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </Button>
            <Button size="sm" variant="ghost" onClick={() => bulkUpdateStatus("flagged")}
              className="text-orange-400 hover:bg-orange-500/10 gap-1 h-5 text-xs">
              <Flag className="w-3.5 h-3.5" /> Flag
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <Card className="bg-[#111827] border-[#1F2937]">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 gap-3">
              <RefreshCw className="w-5 h-5 animate-spin text-[#6B7280]" />
              <span className="text-[#6B7280] text-sm">Loading comments...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-6">
              <MessageSquare className="w-4 h-4 text-[#374151] mx-auto mb-3" />
              <p className="text-[#6B7280] text-sm">No comments found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1F2937]">
                    <TableHead className="w-4">
                      <input
                        type="checkbox"
                        checked={selected.size === filtered.length && filtered.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 accent-orange-500"
                      />
                    </TableHead>
                    <TableHead className="text-[#6B7280]">Author</TableHead>
                    <TableHead className="text-[#6B7280]">Content</TableHead>
                    <TableHead className="text-[#6B7280]">Page</TableHead>
                    <TableHead className="text-[#6B7280]">Date</TableHead>
                    <TableHead className="text-[#6B7280]">Status</TableHead>
                    <TableHead className="text-[#6B7280] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((comment) => {
                    const cfg = STATUS_CONFIG[comment.status] || STATUS_CONFIG.pending;
                    return (
                      <TableRow key={comment.id} className="border-[#1F2937] hover:bg-[#1F2937]/40">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selected.has(comment.id)}
                            onChange={() => toggleSelect(comment.id)}
                            className="w-4 h-4 accent-orange-500"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-[#F9FAFB] text-sm font-medium">{comment.author_name}</p>
                            {comment.author_email && (
                              <p className="text-[#6B7280] text-xs">{comment.author_email}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[240px]">
                          <p className="text-[#D1D5DB] text-sm truncate">{comment.content}</p>
                        </TableCell>
                        <TableCell className="text-[#6B7280] text-xs max-w-[140px] truncate">
                          {comment.page_url || "—"}
                        </TableCell>
                        <TableCell className="text-[#6B7280] text-xs whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {format(new Date(comment.created_at), "MMM d, yyyy")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs border ${cfg.class}`}>{cfg.label}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-4 w-4 text-[#6B7280] hover:text-[#F9FAFB] hover:bg-[#1F2937]"
                              onClick={() => setPreviewComment(comment)}
                              title="View full comment"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            {comment.status !== "approved" && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-4 w-4 text-green-400 hover:bg-green-500/10"
                                onClick={() => updateStatus.mutate({ id: comment.id, status: "approved" })}
                                title="Approve"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            {comment.status !== "rejected" && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-4 w-4 text-red-400 hover:bg-red-500/10"
                                onClick={() => updateStatus.mutate({ id: comment.id, status: "rejected" })}
                                title="Reject"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            {comment.status !== "flagged" && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-4 w-4 text-orange-400 hover:bg-orange-500/10"
                                onClick={() => updateStatus.mutate({ id: comment.id, status: "flagged" })}
                                title="Flag"
                              >
                                <Flag className="w-3.5 h-3.5" />
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-4 w-4 text-[#6B7280] hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => setDeleteTarget(comment)}
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview dialog */}
      <Dialog open={!!previewComment} onOpenChange={(open) => !open && setPreviewComment(null)}>
        <DialogContent className="bg-[#111827] border-[#1F2937] text-[#F9FAFB] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#F9FAFB]">Comment Detail</DialogTitle>
          </DialogHeader>
          {previewComment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[#6B7280] text-xs mb-1">Author</p>
                  <p className="text-[#F9FAFB]">{previewComment.author_name}</p>
                </div>
                <div>
                  <p className="text-[#6B7280] text-xs mb-1">Email</p>
                  <p className="text-[#F9FAFB]">{previewComment.author_email || "—"}</p>
                </div>
                <div>
                  <p className="text-[#6B7280] text-xs mb-1">Submitted</p>
                  <p className="text-[#F9FAFB]">{format(new Date(previewComment.created_at), "PPpp")}</p>
                </div>
                <div>
                  <p className="text-[#6B7280] text-xs mb-1">Page</p>
                  <p className="text-[#F9FAFB] text-xs break-all">{previewComment.page_url || "—"}</p>
                </div>
              </div>
              <div>
                <p className="text-[#6B7280] text-xs mb-2">Content</p>
                <p className="text-[#D1D5DB] bg-[#1F2937] rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  {previewComment.content}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <Badge className={`text-xs border ${STATUS_CONFIG[previewComment.status]?.class}`}>
                  {STATUS_CONFIG[previewComment.status]?.label}
                </Badge>
                <div className="flex gap-2">
                  {previewComment.status !== "approved" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1"
                      onClick={() => { updateStatus.mutate({ id: previewComment.id, status: "approved" }); setPreviewComment(null); }}>
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </Button>
                  )}
                  {previewComment.status !== "rejected" && (
                    <Button size="sm" variant="destructive" className="gap-1"
                      onClick={() => { updateStatus.mutate({ id: previewComment.id, status: "rejected" }); setPreviewComment(null); }}>
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#111827] border-[#1F2937] text-[#F9FAFB]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F9FAFB]">Delete Comment</AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B7280]">
              Permanently delete this comment from {deleteTarget?.author_name}? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] hover:bg-[#374151]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteTarget && deleteComment.mutate(deleteTarget.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
