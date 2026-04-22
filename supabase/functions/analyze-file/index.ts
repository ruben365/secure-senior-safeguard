import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { corsHeaders } from "../_shared/cors.ts";
import {
  createServiceRoleClient,
  getAuthenticatedScanUser,
} from "../_shared/scanAccess.ts";

type ThreatLevel = "safe" | "warning" | "danger";

interface GuestScanAnalysis {
  threatLevel: ThreatLevel;
  confidence: number;
  summary: string;
  findings: string[];
  recommendations: string[];
  indicators: {
    phishing: string[];
    malware: string[];
    deepfake: string[];
    voiceClone: string[];
    suspiciousLinks: string[];
  };
}

const suspiciousKeywords = [
  "urgent",
  "verify",
  "password",
  "login",
  "account locked",
  "gift card",
  "wire transfer",
  "crypto",
  "click here",
  "act now",
  "invoice",
  "payment required",
];

const suspiciousTlds = [".ru", ".zip", ".top", ".xyz", ".click"];

const extractUrls = (text: string) => {
  const urls = text.match(/https?:\/\/[^\s)]+/gi) || [];
  return Array.from(new Set(urls)).slice(0, 12);
};

const normalizeArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter(Boolean).map(String) : [];

const fallbackAnalysis = (
  fileType: string,
  textSample: string,
  urls: string[],
): GuestScanAnalysis => {
  const lower = textSample.toLowerCase();
  const phishingIndicators: string[] = [];
  suspiciousKeywords.forEach((keyword) => {
    if (lower.includes(keyword))
      phishingIndicators.push(`Contains "${keyword}"`);
  });

  const suspiciousLinks = urls.filter((link) =>
    suspiciousTlds.some((tld) => link.toLowerCase().includes(tld)),
  );

  const findings: string[] = [];
  if (phishingIndicators.length)
    findings.push("Potential phishing language detected.");
  if (suspiciousLinks.length)
    findings.push("Suspicious links were found in the file.");
  if (fileType.startsWith("video/") || fileType.startsWith("audio/") || fileType.startsWith("image/"))
    findings.push("Media file received. Deepfake/voice clone checks are preliminary.");

  const threatLevel: ThreatLevel =
    phishingIndicators.length || suspiciousLinks.length ? "warning" : "safe";

  return {
    threatLevel,
    confidence: threatLevel === "safe" ? 0.6 : 0.55,
    summary:
      threatLevel === "safe"
        ? "No immediate threats were detected in the sample."
        : "Potential scam indicators detected. Review recommendations carefully.",
    findings: findings.length ? findings : ["No immediate threats detected."],
    recommendations: [
      "Verify the sender independently before taking action.",
      "Avoid clicking links until the source is confirmed.",
      "If unsure, contact InVision Network support for guidance.",
    ],
    indicators: {
      phishing: phishingIndicators,
      malware: [],
      deepfake:
        fileType.startsWith("video/") || fileType.startsWith("image/")
          ? ["Preliminary visual checks only."]
          : [],
      voiceClone: fileType.startsWith("audio/")
        ? ["Preliminary audio checks only."]
        : [],
      suspiciousLinks,
    },
  };
};

const SYSTEM_PROMPT = `You are a cybersecurity analyst at InVision Network, specializing in scam detection for seniors and families.

Analyze the provided file metadata and text sample to identify phishing, malware, deepfake, and voice-clone indicators.

Respond with ONLY a valid JSON object — no extra text, no markdown, no code fences:
{
  "threatLevel": "safe" | "warning" | "danger",
  "confidence": 0.0-1.0,
  "summary": "short 1-2 sentence summary",
  "findings": ["specific bullet findings"],
  "recommendations": ["actionable recommendations"],
  "indicators": {
    "phishing": ["specific phishing signals found"],
    "malware": ["malware signals found"],
    "deepfake": ["deepfake signals found"],
    "voiceClone": ["voice clone signals found"],
    "suspiciousLinks": ["suspicious URLs found"]
  }
}

If evidence is limited, be conservative and note limitations clearly.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scanId } = await req.json();
    if (!scanId || typeof scanId !== "string") {
      throw new Error("scanId is required.");
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(scanId)) {
      throw new Error("Invalid scanId format.");
    }

    const supabase = createServiceRoleClient();
    const { data: scan, error: scanError } = await supabase
      .from("guest_scans")
      .select("*")
      .eq("id", scanId)
      .eq("scan_type", "file")
      .maybeSingle();

    if (scanError || !scan) {
      throw new Error("Scan not found.");
    }

    const isAccountLinkedScan = scan.access_mode && scan.access_mode !== "guest";
    let authenticatedUser:
      | Awaited<ReturnType<typeof getAuthenticatedScanUser>>
      | null = null;

    if (isAccountLinkedScan) {
      authenticatedUser = await getAuthenticatedScanUser(req);
      if (!scan.user_id || authenticatedUser.id !== scan.user_id) {
        return new Response(
          JSON.stringify({ error: "This upload scan belongs to a different account." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
        );
      }
    }

    // Idempotency: return cached result if already completed
    if (scan.scan_status === "completed" && scan.result) {
      return new Response(
        JSON.stringify({ analysis: scan.result, expiresAt: scan.expires_at }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    if (!isAccountLinkedScan) {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) throw new Error("Missing required server configuration.");

      const stripe = new Stripe(stripeKey, { apiVersion: "2024-11-20.acacia" });
      if (!scan.stripe_session_id) throw new Error("Scan has no associated payment.");

      const paymentIntent = await stripe.paymentIntents.retrieve(scan.stripe_session_id);
      if (paymentIntent.status !== "succeeded" && paymentIntent.status !== "processing") {
        return new Response(
          JSON.stringify({ error: "Payment not completed. Please finalize payment first." }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
        );
      }
    }

    await supabase
      .from("guest_scans")
      .update({
        scan_status: "analyzing",
        payment_status: isAccountLinkedScan ? "processing" : "paid",
      })
      .eq("id", scanId);

    if (!scan.file_path) throw new Error("Scan has no associated file path.");

    const { data: fileData, error: fileError } = await supabase.storage
      .from("guest-scans")
      .download(scan.file_path);

    if (fileError || !fileData) throw new Error("Unable to access uploaded file.");

    const arrayBuffer = await fileData.arrayBuffer();
    const sampleSize = Math.min(arrayBuffer.byteLength, 50000);
    const sampleText = new TextDecoder().decode(arrayBuffer.slice(0, sampleSize));
    const urls = extractUrls(sampleText);

    let analysis: GuestScanAnalysis | null = null;

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (ANTHROPIC_API_KEY) {
      const userPrompt = JSON.stringify({
        fileName: scan.file_name,
        fileType: scan.file_type,
        fileSize: scan.file_size,
        urls,
        textSample: sampleText.slice(0, 4000),
      });

      console.log(`[analyze-file] Sending to Claude Haiku: scanId=${scanId} fileType=${scan.file_type}`);

      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 768,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }],
          temperature: 0.2,
        }),
        signal: AbortSignal.timeout(25_000),
      });

      if (anthropicRes.ok) {
        const data = await anthropicRes.json();
        const responseText = data?.content?.[0]?.text ?? "";
        // Extract JSON — Claude may occasionally wrap in markdown fences
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        try {
          analysis = JSON.parse(jsonMatch?.[0] ?? responseText);
        } catch {
          console.error("[analyze-file] Failed to parse Claude response:", responseText);
          analysis = null;
        }
      } else {
        console.error(`[analyze-file] Anthropic error ${anthropicRes.status}`);
      }
    } else {
      console.warn("[analyze-file] ANTHROPIC_API_KEY not set — using fallback analysis");
    }

    if (!analysis) {
      analysis = fallbackAnalysis(scan.file_type || "", sampleText, urls);
    }

    const normalizedConfidence = Number.isFinite(analysis.confidence)
      ? Math.min(1, Math.max(0, analysis.confidence))
      : 0.55;

    analysis = {
      threatLevel: ["safe", "warning", "danger"].includes(analysis.threatLevel)
        ? analysis.threatLevel
        : fallbackAnalysis(scan.file_type || "", sampleText, urls).threatLevel,
      confidence: normalizedConfidence,
      summary: analysis.summary || "Analysis complete.",
      findings: normalizeArray(analysis.findings),
      recommendations: normalizeArray(analysis.recommendations),
      indicators: {
        phishing: normalizeArray(analysis.indicators?.phishing),
        malware: normalizeArray(analysis.indicators?.malware),
        deepfake: normalizeArray(analysis.indicators?.deepfake),
        voiceClone: normalizeArray(analysis.indicators?.voiceClone),
        suspiciousLinks: normalizeArray(analysis.indicators?.suspiciousLinks),
      },
    };

    if (!analysis.findings.length)
      analysis.findings.push("No immediate threats detected.");
    if (!analysis.recommendations.length)
      analysis.recommendations.push("If in doubt, contact InVision Network support.");

    let paymentStatus = scan.payment_status || "paid";

    if (scan.access_mode === "balance" || scan.access_mode === "metered") {
      if (!authenticatedUser) throw new Error("Please log in to use account-linked scan access.");

      const { data: usageResult, error: usageError } = await supabase.rpc(
        "consume_scan_access_usage",
        { p_user_id: authenticatedUser.id, p_scan_id: scanId }
      );

      if (usageError) throw new Error(usageError.message);

      if (!usageResult?.ok) {
        return new Response(
          JSON.stringify({
            error: usageResult?.error || "This account does not have enough upload scan access.",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 402 }
        );
      }

      paymentStatus =
        scan.access_mode === "balance" ? "account_charged" : "metered_recorded";
    } else if (scan.access_mode === "subscription") {
      paymentStatus = "included";
    } else {
      paymentStatus = "paid";
    }

    const expiresAt =
      scan.expires_at || new Date(Date.now() + 30 * 60 * 1000).toISOString();

    await supabase
      .from("guest_scans")
      .update({
        scan_status: "completed",
        payment_status: paymentStatus,
        risk_level: analysis.threatLevel,
        result: analysis,
        expires_at: expiresAt,
      })
      .eq("id", scanId);

    return new Response(JSON.stringify({ analysis, expiresAt }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed.";
    console.error("[analyze-file] Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status:
        message.startsWith("Authentication error") || message.startsWith("Please log in")
          ? 401
          : 500,
    });
  }
});
