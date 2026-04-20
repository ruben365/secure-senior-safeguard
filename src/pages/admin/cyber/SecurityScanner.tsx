import { useState } from "react";
import {
  Shield, Globe, Search, AlertTriangle, CheckCircle, XCircle,
  Clock, Download, RefreshCw, ChevronDown, ChevronUp, FileText,
  Lock, Server, Wifi, Eye, Cookie, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { formatDistanceToNow } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckResult {
  status: "pass" | "warn" | "warning" | "fail" | "info";
  message: string;
  detail?: string;
  severity?: "low" | "medium" | "high" | "critical" | "info";
}

interface ScanResults {
  url?: string;
  domain?: string;
  grade?: string;
  score?: number;
  checkedAt?: string;
  responseTimeMs?: number;
  ssl: CheckResult[];
  headers: CheckResult[];
  dns: CheckResult[];
  exposedPaths: CheckResult[];
  content: CheckResult[];
  performance?: CheckResult[];
}

interface ScanRecord {
  id: string;
  url: string;
  domain: string;
  scan_date: string;
  grade: string;
  score: number;
  results_json: ScanResults;
  ai_analysis: string | null;
  client_name: string | null;
  scan_duration_ms: number | null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const GRADE_COLORS: Record<string, string> = {
  A: "text-emerald-400",
  B: "text-green-400",
  C: "text-yellow-400",
  D: "text-orange-400",
  F: "text-red-400",
};

const GRADE_BG: Record<string, string> = {
  A: "bg-emerald-500/10 border-emerald-500/30",
  B: "bg-green-500/10 border-green-500/30",
  C: "bg-yellow-500/10 border-yellow-500/30",
  D: "bg-orange-500/10 border-orange-500/30",
  F: "bg-red-500/10 border-red-500/30",
};

const STATUS_ICON: Record<string, JSX.Element> = {
  pass: <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />,
  warn: <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />,
  fail: <XCircle className="h-4 w-4 text-red-400 shrink-0" />,
  info: <Eye className="h-4 w-4 text-blue-400 shrink-0" />,
};

const SEVERITY_BADGE: Record<string, string> = {
  low: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  medium: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  high: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  critical: "bg-red-500/10 text-red-300 border-red-500/20",
};

const SECTION_ICONS: Record<string, JSX.Element> = {
  ssl: <Lock className="h-4 w-4" />,
  headers: <Shield className="h-4 w-4" />,
  dns: <Globe className="h-4 w-4" />,
  exposedPaths: <Eye className="h-4 w-4" />,
  content: <Wifi className="h-4 w-4" />,
  performance: <Zap className="h-4 w-4" />,
};

const SECTION_LABELS: Record<string, string> = {
  ssl: "SSL / TLS",
  headers: "Security Headers",
  dns: "DNS Records",
  exposedPaths: "Exposed Paths",
  content: "Content & Cookies",
  performance: "Performance",
};

function scoreBar(score: number) {
  const color =
    score >= 90 ? "bg-emerald-500" :
    score >= 75 ? "bg-green-500" :
    score >= 60 ? "bg-yellow-500" :
    score >= 40 ? "bg-orange-500" :
    "bg-red-500";
  return color;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  sectionKey,
  checks,
}: {
  sectionKey: string;
  checks: CheckResult[];
}) {
  const [open, setOpen] = useState(true);
  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warning" || c.status === "warn").length;

  return (
    <Card className="bg-[#111827] border-[#1F2937]">
      <CardHeader
        className="pb-2 cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#F9FAFB]">
            <span className="text-[#6B7280]">{SECTION_ICONS[sectionKey]}</span>
            <CardTitle className="text-sm font-semibold">
              {SECTION_LABELS[sectionKey] ?? sectionKey}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {failCount > 0 && (
              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                {failCount} fail{failCount > 1 ? "s" : ""}
              </Badge>
            )}
            {warnCount > 0 && (
              <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs">
                {warnCount} warn{warnCount > 1 ? "s" : ""}
              </Badge>
            )}
            {open ? (
              <ChevronUp className="h-4 w-4 text-[#6B7280]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            )}
          </div>
        </div>
      </CardHeader>
      {open && (
        <CardContent className="pt-0 space-y-2">
          {checks.map((check, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-t border-[#1F2937] first:border-0">
              {STATUS_ICON[check.status]}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F9FAFB] leading-snug">{check.message}</p>
                {check.detail && (
                  <p className="text-xs text-[#6B7280] mt-0.5 leading-snug">{check.detail}</p>
                )}
              </div>
              {check.severity && (
                <span
                  className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${SEVERITY_BADGE[check.severity]}`}
                >
                  {check.severity}
                </span>
              )}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

function GradeDisplay({ grade, score }: { grade: string; score: number }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border p-6 ${GRADE_BG[grade] ?? "bg-gray-500/10 border-gray-500/30"}`}>
      <span className={`text-7xl font-black leading-none ${GRADE_COLORS[grade] ?? "text-gray-400"}`}>
        {grade}
      </span>
      <span className="text-[#9CA3AF] text-sm mt-1">Security Grade</span>
      <div className="w-full mt-4">
        <div className="flex justify-between text-xs text-[#6B7280] mb-1">
          <span>Score</span>
          <span className="font-semibold text-[#F9FAFB]">{score}/100</span>
        </div>
        <Progress value={score} className={`h-2 ${scoreBar(score)}`} />
      </div>
    </div>
  );
}

// ─── Scan history row ─────────────────────────────────────────────────────────

function HistoryRow({
  scan,
  onLoad,
}: {
  scan: ScanRecord;
  onLoad: (scan: ScanRecord) => void;
}) {
  return (
    <tr className="border-b border-[#1F2937] hover:bg-[#1F2937]/40 transition-colors">
      <td className="py-2.5 px-3 text-sm text-[#F9FAFB] max-w-[220px] truncate">{scan.domain}</td>
      <td className="py-2.5 px-3">
        <span className={`text-sm font-bold ${GRADE_COLORS[scan.grade] ?? "text-gray-400"}`}>
          {scan.grade}
        </span>
      </td>
      <td className="py-2.5 px-3 text-sm text-[#9CA3AF]">{scan.score}/100</td>
      <td className="py-2.5 px-3 text-xs text-[#6B7280]">
        {formatDistanceToNow(new Date(scan.scan_date), { addSuffix: true })}
      </td>
      <td className="py-2.5 px-3">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs text-[#9CA3AF] hover:text-[#F9FAFB]"
          onClick={() => onLoad(scan)}
        >
          Load
        </Button>
      </td>
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SecurityScanner() {
  const [url, setUrl] = useState("");
  const [clientName, setClientName] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [result, setResult] = useState<{
    grade: string;
    score: number;
    results: ScanResults;
    ai_analysis: string | null;
    url: string;
    duration?: number;
  } | null>(null);

  const { data: history = [], refetch: refetchHistory } = useQuery<ScanRecord[]>({
    queryKey: ["security-scans-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("security_scans")
        .select("id, url, domain, scan_date, grade, score, results_json, ai_analysis, client_name, scan_duration_ms")
        .order("scan_date", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as ScanRecord[];
    },
  });

  const handleScan = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Please enter a URL to scan.");
      return;
    }

    setScanning(true);
    setResult(null);
    setProgress(5);
    setProgressLabel("Connecting…");

    const steps = [
      { pct: 15, label: "Checking SSL / TLS…" },
      { pct: 30, label: "Analyzing security headers…" },
      { pct: 50, label: "Querying DNS records…" },
      { pct: 65, label: "Probing exposed paths…" },
      { pct: 80, label: "Scanning content & cookies…" },
      { pct: 90, label: "Generating AI analysis…" },
    ];

    let stepIdx = 0;
    const ticker = setInterval(() => {
      if (stepIdx < steps.length) {
        setProgress(steps[stepIdx].pct);
        setProgressLabel(steps[stepIdx].label);
        stepIdx++;
      }
    }, 1800);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const res = await supabase.functions.invoke("scan-website", {
        body: {
          url: trimmed,
          client_name: clientName.trim() || undefined,
          save: true,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      clearInterval(ticker);

      if (res.error) throw new Error(res.error.message);
      const payload = res.data as {
        success: boolean;
        results: ScanResults;
        ai_analysis: string | null;
        duration_ms?: number;
        error?: string;
      };

      if (!payload.success) throw new Error(payload.error ?? "Scan failed");

      setProgress(100);
      setProgressLabel("Done");
      setResult({
        grade: payload.results.grade ?? "?",
        score: payload.results.score ?? 0,
        results: payload.results,
        ai_analysis: payload.ai_analysis,
        url: trimmed,
        duration: payload.duration_ms,
      });
      void refetchHistory();
      toast.success(`Scan complete — Grade ${payload.results.grade} (${payload.results.score}/100)`);
    } catch (err) {
      clearInterval(ticker);
      toast.error(err instanceof Error ? err.message : "Scan failed. Check console.");
    } finally {
      setScanning(false);
    }
  };

  const loadHistoryScan = (scan: ScanRecord) => {
    setResult({
      grade: scan.grade,
      score: scan.score,
      results: scan.results_json,
      ai_analysis: scan.ai_analysis,
      url: scan.url,
    });
    setUrl(scan.url);
    setClientName(scan.client_name ?? "");
  };

  const exportReport = () => {
    if (!result) return;
    const report = [
      `# Security Scan Report`,
      `URL: ${result.url}`,
      `Grade: ${result.grade}  Score: ${result.score}/100`,
      result.duration ? `Duration: ${(result.duration / 1000).toFixed(1)}s` : "",
      "",
      "## AI Analysis",
      result.ai_analysis ?? "No AI analysis available.",
      "",
      ...["ssl", "headers", "dns", "exposedPaths", "content", "performance"].flatMap((key) => {
        const section = (result.results as Record<string, unknown>)[key];
        if (!Array.isArray(section) || section.length === 0) return [];
        return [
          `## ${SECTION_LABELS[key] ?? key}`,
          ...(section as CheckResult[]).map(
            (c) => `- [${c.status.toUpperCase()}] ${c.message}${c.detail ? ` — ${c.detail}` : ""}`
          ),
          "",
        ];
      }),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `security-report-${new URL(result.url.startsWith("http") ? result.url : `https://${result.url}`).hostname}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const SECTION_KEYS = ["ssl", "headers", "dns", "exposedPaths", "content", "performance"];
  const sectionKeys = result
    ? SECTION_KEYS.filter((k) => {
        const val = (result.results as Record<string, unknown>)[k];
        return Array.isArray(val) && val.length > 0;
      })
    : [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-[#F9FAFB] flex items-center gap-2">
          <Shield className="h-6 w-6 text-cyan-400" />
          Website Vulnerability Scanner
        </h1>
        <p className="text-[#9CA3AF] text-sm mt-1">
          Analyze any client website for security vulnerabilities, misconfigurations, and threats.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left panel — input + history */}
        <div className="space-y-4">
          <Card className="bg-[#111827] border-[#1F2937]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#F9FAFB] flex items-center gap-2">
                <Globe className="h-4 w-4 text-cyan-400" />
                New Scan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-[#9CA3AF] mb-1.5 block">Website URL</Label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-cyan-500"
                  onKeyDown={(e) => { if (e.key === "Enter" && !scanning) void handleScan(); }}
                  disabled={scanning}
                />
              </div>
              <div>
                <Label className="text-xs text-[#9CA3AF] mb-1.5 block">Client Name <span className="text-[#4B5563]">(optional)</span></Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] placeholder:text-[#4B5563] focus:border-cyan-500"
                  disabled={scanning}
                />
              </div>
              <Button
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold gap-2"
                onClick={handleScan}
                disabled={scanning}
              >
                {scanning ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Scanning…</>
                ) : (
                  <><Search className="h-4 w-4" /> Run Security Scan</>
                )}
              </Button>

              {scanning && (
                <div className="pt-1 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                    <Clock className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                    {progressLabel}
                  </div>
                  <Progress value={progress} className="h-1.5 bg-[#1F2937]" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scan history */}
          {history.length > 0 && (
            <Card className="bg-[#111827] border-[#1F2937]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#F9FAFB] flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#6B7280]" />
                  Recent Scans
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1F2937]">
                        <th className="text-left py-2 px-3 text-xs text-[#6B7280] font-medium">Domain</th>
                        <th className="text-left py-2 px-3 text-xs text-[#6B7280] font-medium">Grade</th>
                        <th className="text-left py-2 px-3 text-xs text-[#6B7280] font-medium">Score</th>
                        <th className="text-left py-2 px-3 text-xs text-[#6B7280] font-medium">When</th>
                        <th className="py-2 px-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((scan) => (
                        <HistoryRow key={scan.id} scan={scan} onLoad={loadHistoryScan} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right panel — results */}
        <div className="xl:col-span-2 space-y-4">
          {!result && !scanning && (
            <div className="flex flex-col items-center justify-center h-72 rounded-xl border border-dashed border-[#1F2937] text-center">
              <Shield className="h-12 w-12 text-[#374151] mb-3" />
              <p className="text-[#6B7280] text-sm">Enter a URL and click Run Security Scan.</p>
              <p className="text-[#4B5563] text-xs mt-1">Results will appear here with full AI analysis.</p>
            </div>
          )}

          {scanning && !result && (
            <div className="flex flex-col items-center justify-center h-72 rounded-xl border border-dashed border-cyan-900/40 text-center">
              <RefreshCw className="h-10 w-10 text-cyan-500 animate-spin mb-3" />
              <p className="text-[#9CA3AF] text-sm">{progressLabel || "Initializing scan…"}</p>
              <p className="text-[#6B7280] text-xs mt-1">This typically takes 15–30 seconds.</p>
            </div>
          )}

          {result && (
            <>
              {/* Score + actions row */}
              <div className="flex items-start gap-4">
                <div className="w-52 shrink-0">
                  <GradeDisplay grade={result.grade} score={result.score} />
                  {result.duration && (
                    <p className="text-xs text-[#6B7280] text-center mt-2">
                      Scan took {(result.duration / 1000).toFixed(1)}s
                    </p>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-0.5">Scanned URL</p>
                    <p className="text-sm text-[#F9FAFB] font-mono break-all">{result.url}</p>
                  </div>
                  {clientName && (
                    <div>
                      <p className="text-xs text-[#6B7280] uppercase tracking-wide mb-0.5">Client</p>
                      <p className="text-sm text-[#F9FAFB]">{clientName}</p>
                    </div>
                  )}
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] gap-1.5"
                      onClick={exportReport}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Export Report
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] gap-1.5"
                      onClick={handleScan}
                      disabled={scanning}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Rescan
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              {result.ai_analysis && (
                <Card className="bg-[#0D1B2A] border-cyan-900/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-cyan-300 flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      AI Threat Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#CBD5E1] whitespace-pre-wrap leading-relaxed">
                      {result.ai_analysis}
                    </p>
                  </CardContent>
                </Card>
              )}

              <Separator className="bg-[#1F2937]" />

              {/* Section cards */}
              <div className="space-y-3">
                {sectionKeys.map((key) => (
                  <SectionCard
                    key={key}
                    sectionKey={key}
                    checks={(result.results as Record<string, CheckResult[]>)[key]}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
