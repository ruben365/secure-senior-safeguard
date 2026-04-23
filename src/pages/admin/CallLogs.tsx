import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, Clock, TrendingUp, Search, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface CallLog {
  id: string;
  retell_call_id: string | null;
  agent_name: string | null;
  caller_phone: string | null;
  duration_seconds: number | null;
  transcript: string | null;
  outcome: string | null;
  sentiment: string | null;
  call_summary: string | null;
  created_at: string;
}

function sentimentBadge(sentiment: string | null) {
  if (!sentiment) return <Badge variant="outline">Unknown</Badge>;
  const s = sentiment.toLowerCase();
  if (s === "positive") return <Badge className="bg-green-700/50 text-green-200">Positive</Badge>;
  if (s === "negative") return <Badge className="bg-red-700/50 text-red-200">Negative</Badge>;
  return <Badge className="bg-yellow-700/50 text-yellow-200">Neutral</Badge>;
}

function formatDuration(seconds: number | null) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function CallLogs() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: logs = [], isLoading } = useQuery<CallLog[]>({
    queryKey: ["call-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("call_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
    refetchInterval: 60_000,
  });

  const filtered = logs.filter(
    (l) =>
      !search ||
      (l.caller_phone ?? "").includes(search) ||
      (l.call_summary ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  const totalCalls = logs.length;
  const avgDuration = logs.length
    ? Math.round(
        logs.reduce((sum, l) => sum + (l.duration_seconds ?? 0), 0) / logs.length,
      )
    : 0;
  const positiveCount = logs.filter(
    (l) => l.sentiment?.toLowerCase() === "positive",
  ).length;
  const positiveRate = logs.length
    ? Math.round((positiveCount / logs.length) * 100)
    : 0;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Call Logs</h1>
        <p className="text-[#9CA3AF]">Retell AI voice agent call history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <Phone className="h-5 w-5 text-violet-400" />
            <div>
              <div className="text-2xl font-bold text-[#F9FAFB]">{totalCalls}</div>
              <div className="text-xs text-[#9CA3AF]">Total Calls</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-[#F9FAFB]">{formatDuration(avgDuration)}</div>
              <div className="text-xs text-[#9CA3AF]">Avg Duration</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-[#F9FAFB]">{positiveRate}%</div>
              <div className="text-xs text-[#9CA3AF]">Positive Sentiment</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-[#F9FAFB]">Call History</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#9CA3AF]" />
            <Input
              placeholder="Search phone or summary…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-5 bg-[#1F2937] border-gray-700 text-[#F9FAFB] w-56"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-[#9CA3AF] py-5">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#9CA3AF] py-5">No call logs yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-[#9CA3AF]">Date</TableHead>
                  <TableHead className="text-[#9CA3AF]">Caller</TableHead>
                  <TableHead className="text-[#9CA3AF]">Duration</TableHead>
                  <TableHead className="text-[#9CA3AF]">Sentiment</TableHead>
                  <TableHead className="text-[#9CA3AF]">Summary</TableHead>
                  <TableHead className="text-[#9CA3AF]">Transcript</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((log) => (
                  <>
                    <TableRow key={log.id} className="border-gray-700">
                      <TableCell className="text-[#9CA3AF] whitespace-nowrap">
                        {format(new Date(log.created_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="font-medium text-[#F9FAFB]">
                        {log.caller_phone ?? "Unknown"}
                      </TableCell>
                      <TableCell className="text-[#9CA3AF]">
                        {formatDuration(log.duration_seconds)}
                      </TableCell>
                      <TableCell>{sentimentBadge(log.sentiment)}</TableCell>
                      <TableCell className="max-w-xs text-[#9CA3AF]">
                        <span className="line-clamp-2 text-sm">
                          {log.call_summary ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {log.transcript && (
                          <button
                            onClick={() =>
                              setExpandedId(expandedId === log.id ? null : log.id)
                            }
                            className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-xs"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            {expandedId === log.id ? "Hide" : "View"}
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                    {expandedId === log.id && log.transcript && (
                      <TableRow key={`${log.id}-transcript`} className="border-gray-700">
                        <TableCell colSpan={6} className="bg-[#0D1117]">
                          <pre className="text-xs text-[#9CA3AF] whitespace-pre-wrap font-mono p-3 max-h-64 overflow-y-auto">
                            {log.transcript}
                          </pre>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
