// ─── Threat Intelligence Utilities ────────────────────────────────────────────
// ADMIN DASHBOARD USE ONLY. Do not import from regular user-facing pages.
//
// VirusTotal and AbuseIPDB require API keys configured in .env (VITE_VT_API_KEY,
// VITE_ABUSEIPDB_API_KEY). These are admin-only env vars — never ship them to
// production builds used by subscribers.
//
// checkUrlSafety / checkEmailBreach / translateText call Supabase edge functions
// which hold the real secrets server-side.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UrlSafetyResult {
  safe: boolean;
  threats: string[];
  unconfigured?: boolean;
  message?: string;
}

export interface BreachHit {
  name: string;
  title: string;
  date: string;
  dataClasses: string[];
}

export interface BreachResult {
  breached: boolean;
  breaches: BreachHit[];
  unconfigured?: boolean;
  message?: string;
}

export interface TranslationResult {
  translated: string | null;
  unconfigured?: boolean;
  message?: string;
}

export interface VtResult {
  positives: number;
  total: number;
  permalink: string;
  verbose_msg: string;
}

export interface PhishTankResult {
  in_database: boolean;
  phish_id?: string;
  phish_detail_url?: string;
  verified?: boolean;
  verified_at?: string;
}

export interface UrlhausResult {
  query_status: "is_host" | "no_results" | "invalid_host";
  urlhaus_reference?: string;
  blacklists?: Record<string, string>;
  urls?: Array<{ url_status: string; threat: string; tags: string[] | null }>;
}

export interface AbuseIpdbResult {
  data: {
    ipAddress: string;
    isPublic: boolean;
    abuseConfidenceScore: number;
    countryCode: string;
    totalReports: number;
    lastReportedAt: string | null;
  };
}

// ─── Edge function caller ─────────────────────────────────────────────────────

async function callEdge<T>(fn: string, payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${fn}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error((json as { error?: string }).error ?? `${fn} failed`);
  return json as T;
}

// ─── Via edge functions (secrets stay server-side) ───────────────────────────

export function checkUrlSafety(url: string): Promise<UrlSafetyResult> {
  return callEdge("check-url-safety", { url });
}

export function checkEmailBreach(email: string): Promise<BreachResult> {
  return callEdge("check-breach", { email });
}

export function translateText(text: string, targetLanguage: string): Promise<TranslationResult> {
  return callEdge("translate-text", { text, targetLanguage });
}

// ─── VirusTotal (admin env var — never expose to subscribers) ─────────────────

export async function checkVirusTotal(url: string): Promise<VtResult> {
  const apiKey = import.meta.env.VITE_VT_API_KEY as string | undefined;
  if (!apiKey) throw new Error("VITE_VT_API_KEY not set — admin .env only");
  const form = new FormData();
  form.append("apikey", apiKey);
  form.append("resource", url);
  const res = await fetch("https://www.virustotal.com/vtapi/v2/url/report", {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`VirusTotal HTTP ${res.status}`);
  return res.json() as Promise<VtResult>;
}

// ─── PhishTank (optional API key, free without) ───────────────────────────────

export async function checkPhishTank(url: string): Promise<PhishTankResult> {
  const apiKey = import.meta.env.VITE_PHISHTANK_API_KEY as string | undefined;
  const form = new FormData();
  form.append("url", url);
  form.append("format", "json");
  if (apiKey) form.append("app_key", apiKey);
  const res = await fetch("https://checkurl.phishtank.com/checkurl/", {
    method: "POST",
    body: form,
    headers: { "User-Agent": "phishtank/invisionnetwork" },
  });
  if (!res.ok) throw new Error(`PhishTank HTTP ${res.status}`);
  const data = await res.json() as { results: PhishTankResult };
  return data.results;
}

// ─── URLhaus (no API key required) ───────────────────────────────────────────

export async function checkUrlhaus(url: string): Promise<UrlhausResult> {
  const form = new FormData();
  form.append("url", url);
  const res = await fetch("https://urlhaus-api.abuse.ch/v1/url/", {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`URLhaus HTTP ${res.status}`);
  return res.json() as Promise<UrlhausResult>;
}

// ─── AbuseIPDB (admin env var) ────────────────────────────────────────────────

export async function checkAbuseIPDB(ip: string): Promise<AbuseIpdbResult> {
  const apiKey = import.meta.env.VITE_ABUSEIPDB_API_KEY as string | undefined;
  if (!apiKey) throw new Error("VITE_ABUSEIPDB_API_KEY not set — admin .env only");
  const res = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`,
    { headers: { Key: apiKey, Accept: "application/json" } },
  );
  if (!res.ok) throw new Error(`AbuseIPDB HTTP ${res.status}`);
  return res.json() as Promise<AbuseIpdbResult>;
}
