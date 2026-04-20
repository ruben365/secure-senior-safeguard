import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckResult {
  name: string;
  status: "pass" | "warn" | "fail" | "info";
  message: string;
  detail?: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
}

interface ScanResults {
  url: string;
  domain: string;
  ssl: CheckResult[];
  headers: CheckResult[];
  dns: CheckResult[];
  exposedPaths: CheckResult[];
  content: CheckResult[];
  performance: CheckResult[];
  score: number;
  grade: string;
  checkedAt: string;
  responseTimeMs: number;
}

// ─── DNS-over-HTTPS helper ────────────────────────────────────────────────────

async function queryDNS(name: string, type: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
      { headers: { Accept: "application/dns-json" }, signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.Answer ?? []).map((r: { data: string }) => r.data as string);
  } catch {
    return [];
  }
}

// ─── SSL / HTTPS checks ───────────────────────────────────────────────────────

async function checkSSL(url: string, domain: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  const isHttps = url.startsWith("https://");

  results.push({
    name: "HTTPS Enabled",
    status: isHttps ? "pass" : "fail",
    message: isHttps ? "Site uses HTTPS" : "Site does not use HTTPS",
    detail: isHttps ? undefined : "All traffic is transmitted in plain text. Attackers can intercept data.",
    severity: isHttps ? "info" : "critical",
  });

  if (isHttps) {
    // Check if HTTP redirects to HTTPS
    try {
      const httpRes = await fetch(`http://${domain}`, {
        redirect: "manual",
        signal: AbortSignal.timeout(5000),
      });
      const location = httpRes.headers.get("location") ?? "";
      const redirectsToHttps = httpRes.status >= 300 && httpRes.status < 400 && location.startsWith("https://");
      results.push({
        name: "HTTP→HTTPS Redirect",
        status: redirectsToHttps ? "pass" : "warn",
        message: redirectsToHttps
          ? "HTTP correctly redirects to HTTPS"
          : "HTTP version does not redirect to HTTPS",
        severity: redirectsToHttps ? "info" : "medium",
      });
    } catch {
      // ignore
    }
  }

  return results;
}

// ─── Security headers check ───────────────────────────────────────────────────

function checkSecurityHeaders(headers: Headers, isHttps: boolean): CheckResult[] {
  const results: CheckResult[] = [];

  // HSTS
  const hsts = headers.get("strict-transport-security");
  if (!isHttps) {
    results.push({ name: "HSTS", status: "info", message: "N/A (site not on HTTPS)", severity: "info" });
  } else if (!hsts) {
    results.push({ name: "HSTS", status: "fail", message: "Strict-Transport-Security header missing", detail: "Without HSTS, browsers can be tricked into downgrading to HTTP.", severity: "high" });
  } else if (!hsts.includes("max-age=")) {
    results.push({ name: "HSTS", status: "warn", message: "HSTS header present but max-age missing", severity: "medium" });
  } else {
    const maxAge = parseInt(hsts.match(/max-age=(\d+)/)?.[1] ?? "0");
    results.push({
      name: "HSTS",
      status: maxAge >= 31536000 ? "pass" : "warn",
      message: `HSTS enabled (max-age: ${Math.round(maxAge / 86400)} days)`,
      detail: maxAge < 31536000 ? "Recommended: max-age=31536000 (1 year)" : undefined,
      severity: maxAge >= 31536000 ? "info" : "low",
    });
  }

  // CSP
  const csp = headers.get("content-security-policy");
  results.push({
    name: "Content-Security-Policy",
    status: csp ? (csp.includes("unsafe-inline") || csp.includes("unsafe-eval") ? "warn" : "pass") : "fail",
    message: csp
      ? (csp.includes("unsafe-inline") || csp.includes("unsafe-eval")
        ? "CSP present but uses unsafe directives"
        : "CSP header configured")
      : "Content-Security-Policy header missing",
    detail: !csp ? "CSP prevents cross-site scripting (XSS) attacks by defining allowed content sources." : undefined,
    severity: !csp ? "high" : csp.includes("unsafe-inline") ? "medium" : "info",
  });

  // X-Frame-Options
  const xfo = headers.get("x-frame-options");
  results.push({
    name: "X-Frame-Options",
    status: xfo ? "pass" : "warn",
    message: xfo ? `X-Frame-Options: ${xfo}` : "X-Frame-Options header missing",
    detail: !xfo ? "Without this header, the site can be embedded in iframes (clickjacking risk)." : undefined,
    severity: !xfo ? "medium" : "info",
  });

  // X-Content-Type-Options
  const xcto = headers.get("x-content-type-options");
  results.push({
    name: "X-Content-Type-Options",
    status: xcto === "nosniff" ? "pass" : "warn",
    message: xcto ? `X-Content-Type-Options: ${xcto}` : "X-Content-Type-Options header missing",
    severity: !xcto ? "low" : "info",
  });

  // Referrer-Policy
  const rp = headers.get("referrer-policy");
  const goodPolicies = ["no-referrer", "same-origin", "strict-origin", "strict-origin-when-cross-origin"];
  const rpGood = rp && goodPolicies.some(p => rp.includes(p));
  results.push({
    name: "Referrer-Policy",
    status: rpGood ? "pass" : rp ? "warn" : "warn",
    message: rp ? `Referrer-Policy: ${rp}` : "Referrer-Policy header missing",
    severity: "low",
  });

  // Permissions-Policy
  const pp = headers.get("permissions-policy");
  results.push({
    name: "Permissions-Policy",
    status: pp ? "pass" : "warn",
    message: pp ? "Permissions-Policy configured" : "Permissions-Policy header missing",
    severity: "low",
  });

  // Server header disclosure
  const server = headers.get("server");
  if (server) {
    const leaksVersion = /[\d.]{3,}/.test(server);
    results.push({
      name: "Server Header",
      status: leaksVersion ? "warn" : "pass",
      message: leaksVersion ? `Server header exposes version: ${server}` : `Server header: ${server}`,
      detail: leaksVersion ? "Version disclosure helps attackers target known vulnerabilities." : undefined,
      severity: leaksVersion ? "low" : "info",
    });
  }

  // X-Powered-By
  const xpb = headers.get("x-powered-by");
  if (xpb) {
    results.push({
      name: "X-Powered-By",
      status: "warn",
      message: `X-Powered-By header exposes: ${xpb}`,
      detail: "Technology disclosure helps attackers identify targets.",
      severity: "low",
    });
  }

  return results;
}

// ─── DNS (SPF / DKIM / DMARC) checks ─────────────────────────────────────────

async function checkDNS(domain: string): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  // SPF
  const txtRecords = await queryDNS(domain, "TXT");
  const spfRecord = txtRecords.find(r => r.includes("v=spf1"));
  results.push({
    name: "SPF Record",
    status: spfRecord ? "pass" : "fail",
    message: spfRecord ? `SPF configured: ${spfRecord.slice(0, 80)}` : "No SPF record found",
    detail: !spfRecord ? "Without SPF, anyone can send email appearing to come from your domain." : undefined,
    severity: !spfRecord ? "high" : "info",
  });

  // DMARC
  const dmarcRecords = await queryDNS(`_dmarc.${domain}`, "TXT");
  const dmarcRecord = dmarcRecords.find(r => r.includes("v=DMARC1"));
  const dmarcPolicy = dmarcRecord?.match(/p=(\w+)/)?.[1];
  results.push({
    name: "DMARC Record",
    status: dmarcRecord ? (dmarcPolicy === "reject" || dmarcPolicy === "quarantine" ? "pass" : "warn") : "fail",
    message: dmarcRecord
      ? `DMARC configured (policy: ${dmarcPolicy ?? "none"})`
      : "No DMARC record found",
    detail: !dmarcRecord
      ? "DMARC prevents email spoofing and phishing using your domain."
      : dmarcPolicy === "none"
      ? "DMARC is present but policy=none (monitoring only). Consider 'quarantine' or 'reject'."
      : undefined,
    severity: !dmarcRecord ? "high" : dmarcPolicy === "none" ? "medium" : "info",
  });

  // DKIM (check for common selectors)
  const dkimSelectors = ["default", "google", "mail", "dkim", "selector1", "selector2"];
  let dkimFound = false;
  for (const selector of dkimSelectors) {
    const dkimRecords = await queryDNS(`${selector}._domainkey.${domain}`, "TXT");
    if (dkimRecords.some(r => r.includes("v=DKIM1"))) {
      dkimFound = true;
      results.push({
        name: "DKIM Record",
        status: "pass",
        message: `DKIM found (selector: ${selector})`,
        severity: "info",
      });
      break;
    }
  }
  if (!dkimFound) {
    results.push({
      name: "DKIM Record",
      status: "warn",
      message: "DKIM not detected (common selectors checked)",
      detail: "DKIM not found with common selectors. It may still be configured with a custom selector.",
      severity: "medium",
    });
  }

  return results;
}

// ─── Exposed paths check ─────────────────────────────────────────────────────

async function checkExposedPaths(baseUrl: string): Promise<CheckResult[]> {
  const paths = [
    { path: "/wp-admin", name: "WordPress Admin" },
    { path: "/wp-login.php", name: "WordPress Login" },
    { path: "/.env", name: "Environment File" },
    { path: "/.git/config", name: "Git Config" },
    { path: "/admin", name: "Admin Panel" },
    { path: "/phpmyadmin", name: "phpMyAdmin" },
    { path: "/robots.txt", name: "Robots.txt" },
    { path: "/sitemap.xml", name: "Sitemap" },
  ];

  const results: CheckResult[] = [];
  const base = baseUrl.replace(/\/$/, "");

  await Promise.all(
    paths.map(async ({ path, name }) => {
      try {
        const res = await fetch(`${base}${path}`, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(4000),
        });

        const accessible = res.status === 200;
        const isSensitive = ["/.env", "/.git/config"].includes(path);
        const isAdmin = ["/wp-admin", "/wp-login.php", "/admin", "/phpmyadmin"].includes(path);

        if (path === "/robots.txt") {
          results.push({
            name,
            status: accessible ? "info" : "warn",
            message: accessible ? "robots.txt found" : "No robots.txt found",
            severity: "info",
          });
        } else if (path === "/sitemap.xml") {
          results.push({
            name,
            status: accessible ? "info" : "info",
            message: accessible ? "sitemap.xml found — good for SEO" : "No sitemap.xml",
            severity: "info",
          });
        } else if (isSensitive && accessible) {
          results.push({
            name,
            status: "fail",
            message: `CRITICAL: ${name} is publicly accessible`,
            detail: "This file may expose secrets, credentials, or server configuration.",
            severity: "critical",
          });
        } else if (isAdmin && accessible) {
          results.push({
            name,
            status: "warn",
            message: `${name} is accessible (status: ${res.status})`,
            detail: "Exposed admin panels are targeted by brute-force attacks. Consider IP allowlisting or renaming.",
            severity: "high",
          });
        } else {
          results.push({
            name,
            status: "pass",
            message: `${name} not exposed (${res.status})`,
            severity: "info",
          });
        }
      } catch {
        results.push({
          name,
          status: "info",
          message: `${name}: could not reach path`,
          severity: "info",
        });
      }
    })
  );

  return results;
}

// ─── Content checks ───────────────────────────────────────────────────────────

function checkContent(body: string, headers: Headers, url: string): CheckResult[] {
  const results: CheckResult[] = [];

  // Mixed content
  if (url.startsWith("https://")) {
    const hasMixedContent = /src="http:\/\//i.test(body) || /href="http:\/\//i.test(body);
    results.push({
      name: "Mixed Content",
      status: hasMixedContent ? "warn" : "pass",
      message: hasMixedContent
        ? "Page loads resources over HTTP (mixed content)"
        : "No obvious mixed content detected",
      detail: hasMixedContent ? "HTTP resources on HTTPS pages trigger browser warnings and can be intercepted." : undefined,
      severity: hasMixedContent ? "medium" : "info",
    });
  }

  // WordPress detection
  const isWordPress = body.includes("wp-content") || body.includes("wp-includes");
  if (isWordPress) {
    const versionMatch = body.match(/WordPress[\s\/]+([0-9.]+)/i) ||
      body.match(/ver=([0-9.]+).*wp-/i);
    results.push({
      name: "WordPress Detected",
      status: versionMatch ? "warn" : "info",
      message: versionMatch
        ? `WordPress detected — version may be ${versionMatch[1]}`
        : "WordPress CMS detected",
      detail: "Keep WordPress core, themes, and plugins updated to patch known vulnerabilities.",
      severity: versionMatch ? "medium" : "low",
    });
  }

  // Cookie flags (check Set-Cookie headers)
  const setCookie = headers.get("set-cookie");
  if (setCookie) {
    const hasSecure = setCookie.toLowerCase().includes("secure");
    const hasHttpOnly = setCookie.toLowerCase().includes("httponly");
    const hasSameSite = setCookie.toLowerCase().includes("samesite");
    results.push({
      name: "Cookie Security",
      status: hasSecure && hasHttpOnly && hasSameSite ? "pass" : "warn",
      message: [
        `Secure: ${hasSecure ? "✓" : "✗"}`,
        `HttpOnly: ${hasHttpOnly ? "✓" : "✗"}`,
        `SameSite: ${hasSameSite ? "✓" : "✗"}`,
      ].join(" · "),
      detail: !hasHttpOnly ? "HttpOnly flag prevents JavaScript from accessing session cookies." : undefined,
      severity: !hasSecure || !hasHttpOnly ? "medium" : "info",
    });
  }

  return results;
}

// ─── Score calculation ────────────────────────────────────────────────────────

function calculateScore(results: ScanResults): { score: number; grade: string } {
  const allChecks = [
    ...results.ssl,
    ...results.headers,
    ...results.dns,
    ...results.exposedPaths,
    ...results.content,
  ].filter(c => c.status !== "info");

  if (allChecks.length === 0) return { score: 100, grade: "A" };

  const weights = { critical: 25, high: 15, medium: 8, low: 3, info: 0 };
  const penaltyMultiplier = { fail: 1, warn: 0.5, pass: 0, info: 0 };

  let penalty = 0;
  for (const check of allChecks) {
    const w = weights[check.severity] ?? 0;
    const m = penaltyMultiplier[check.status] ?? 0;
    penalty += w * m;
  }

  const score = Math.max(0, Math.min(100, Math.round(100 - penalty)));
  const grade =
    score >= 90 ? "A" :
    score >= 75 ? "B" :
    score >= 60 ? "C" :
    score >= 40 ? "D" : "F";

  return { score, grade };
}

// ─── AI analysis ──────────────────────────────────────────────────────────────

async function generateAIAnalysis(results: ScanResults): Promise<string> {
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!anthropicKey) return "";

  const critical = [...results.ssl, ...results.headers, ...results.dns, ...results.exposedPaths, ...results.content]
    .filter(c => c.status === "fail" || c.status === "warn")
    .map(c => `[${c.severity.toUpperCase()}] ${c.name}: ${c.message}`)
    .join("\n");

  const prompt = `You are a cybersecurity consultant for InVision Network, an Ohio-based firm specializing in protecting small businesses and families.

A website security scan of "${results.url}" returned:
- Overall Grade: ${results.grade} (${results.score}/100)
- Issues found:
${critical || "No significant issues detected."}

Write a professional client report with these sections:
1. EXECUTIVE SUMMARY (2-3 sentences, non-technical, for business owners)
2. PRIORITY FINDINGS (top 3 issues, plain English explanation of risk)
3. RECOMMENDED ACTIONS (numbered list, actionable, prioritized)
4. INVISION SERVICES THAT CAN HELP (reference InVision Network's cybersecurity workshops, monitoring, and training services)

Keep the tone professional but accessible. Max 400 words.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) return "";
    const data = await res.json();
    return data.content?.[0]?.text ?? "";
  } catch {
    return "";
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url, client_name, save = true } = await req.json();

    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "url is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalize URL
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;
    const domain = new URL(targetUrl).hostname;

    const startTime = Date.now();

    // Fetch the page
    let pageHeaders: Headers = new Headers();
    let pageBody = "";
    let fetchOk = false;

    try {
      const res = await fetch(targetUrl, {
        headers: { "User-Agent": "InVisionNetworkScanner/1.0 (+https://invisionnetwork.org/security-scanner)" },
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
      });
      pageHeaders = res.headers;
      pageBody = await res.text().catch(() => "");
      fetchOk = res.ok;
    } catch (e) {
      console.warn("Fetch error:", e);
    }

    const responseTimeMs = Date.now() - startTime;

    // Run all checks
    const [ssl, dns, exposedPaths] = await Promise.all([
      checkSSL(targetUrl, domain),
      checkDNS(domain),
      checkExposedPaths(targetUrl),
    ]);

    const headers = fetchOk ? checkSecurityHeaders(pageHeaders, targetUrl.startsWith("https://")) : [];
    const content = fetchOk ? checkContent(pageBody, pageHeaders, targetUrl) : [];

    const performance: CheckResult[] = [{
      name: "Page Load Time",
      status: responseTimeMs < 1500 ? "pass" : responseTimeMs < 3000 ? "warn" : "fail",
      message: `Initial response: ${responseTimeMs}ms`,
      severity: responseTimeMs > 3000 ? "medium" : "low",
    }];

    const scanResults: ScanResults = {
      url: targetUrl,
      domain,
      ssl,
      headers,
      dns,
      exposedPaths,
      content,
      performance,
      score: 0,
      grade: "F",
      checkedAt: new Date().toISOString(),
      responseTimeMs,
    };

    const { score, grade } = calculateScore(scanResults);
    scanResults.score = score;
    scanResults.grade = grade;

    // AI analysis
    const ai_analysis = await generateAIAnalysis(scanResults);

    // Save to Supabase
    if (save) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const authHeader = req.headers.get("authorization");
      let userId: string | null = null;
      if (authHeader) {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
        userId = user?.id ?? null;
      }

      await supabase.from("security_scans").insert({
        url: targetUrl,
        domain,
        grade,
        score,
        results_json: scanResults,
        ai_analysis,
        client_name: client_name ?? null,
        created_by: userId,
        scan_duration_ms: Date.now() - startTime,
      });
    }

    return new Response(
      JSON.stringify({ success: true, results: scanResults, ai_analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("Scan error:", err);
    return new Response(
      JSON.stringify({ error: "Scan failed", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
