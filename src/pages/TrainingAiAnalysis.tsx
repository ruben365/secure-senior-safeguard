import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import Navigation from "@/components/Navigation";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { PromptInputBox } from "@/components/training/PromptInputBox";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";

import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useScanAccess } from "@/hooks/useScanAccess";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import { SITE } from "@/config/site";
import { SCAMSHIELD_PLANS } from "@/config/products";
import {
  BadgeCheck,
  CreditCard,
  Download,
  Home,
  LogIn,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Sun,
  Trash2,
  X,
  FileDown,
  Lock,
  ShieldAlert,
  Camera,
  Wallet,
  Loader2,
  Mail,
  ExternalLink,
  Phone,
  Image as ImageIcon,
  Mic,
  MessageCircle,
  FileText as FileTextIcon,
  QrCode,
  UserCircle,
  KeyRound,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import "@/styles/ai-analysis.css";
export default function TrainingAiAnalysis() {
  usePrerenderReady(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  type ScanMode = 'default' | 'email' | 'url' | 'phone' | 'image' | 'voice' | 'text-message' | 'document' | 'qr' | 'social' | 'password';
  const [scanMode, setScanMode] = useState<ScanMode>('default');
  const [textInput, setTextInput] = useState('');
  const [passwordResult, setPasswordResult] = useState<{ score: number; breaches: string; suggestions: string[] } | null>(null);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [subscriptionCheckoutLoading, setSubscriptionCheckoutLoading] =
    useState(false);
  const { user } = useAuth();
  const { createSubscriptionCheckout } = usePaymentFlow();

  const {
    subscriptions,
    loading: subscriptionsLoading,
    refreshSubscriptions,
  } = useSubscription();
  const {
    accountAccess,
    loading: scanAccessLoading,
    preparing: preparingAuthorizedScan,
    refreshAccess,
    prepareAuthorizedScan,
  } = useScanAccess();
  const hasActiveProtection = useMemo(
    () =>
      subscriptions.some(
        (s) =>
          s.status === "active" ||
          s.status === "trialing" ||
          s.status === "past_due",
      ),
    [subscriptions],
  );
  const scanAccessType = useMemo(() => {
    if (hasActiveProtection) return "subscription" as const;
    if (accountAccess.canScan && accountAccess.accessType !== "none") {
      return accountAccess.accessType;
    }
    return null;
  }, [accountAccess.accessType, accountAccess.canScan, hasActiveProtection]);
  const chatUnlocked = scanAccessType !== null;
  const isCheckingAccess =
    !!user && (subscriptionsLoading || scanAccessLoading);
  const loginPath = `/auth?redirect=${encodeURIComponent("/training/ai-analysis")}`;
  const featuredScamShieldPlan = useMemo(
    () => SCAMSHIELD_PLANS.find((plan) => plan.popular) ?? SCAMSHIELD_PLANS[0],
    [],
  );
  const featuredPlanTier = useMemo(() => {
    const segments = featuredScamShieldPlan.id.split("-");
    return segments[segments.length - 1] ?? "family";
  }, [featuredScamShieldPlan.id]);
  const accessHeadline = useMemo(() => {
    if (isCheckingAccess) return "Checking your scan access";
    if (scanAccessType === "subscription") return "ScamShield access active";
    if (scanAccessType === "balance") return "Account-linked scans available";
    if (scanAccessType === "metered") {
      return "Account-linked pay as you use access";
    }
    if (user) return "No active scan access on this account";
    return "Already a ScamShield subscriber?";
  }, [isCheckingAccess, scanAccessType, user]);
  const accessDescription = useMemo(() => {
    if (isCheckingAccess) {
      return "We are verifying your login and subscription status before unlocking uploads.";
    }
    if (scanAccessType === "subscription") {
      return "You are signed in with an active ScamShield plan. Upload one supported file, screenshot, audio clip, or video to scan immediately.";
    }
    if (scanAccessType === "balance") {
      const balance = accountAccess.scanBalance ?? 0;
      const unitLabel = balance === 1 ? "scan" : "scans";
      return `This account has ${balance} upload ${unitLabel} remaining at $1 per scan.`;
    }
    if (scanAccessType === "metered") {
      return "This account is enabled for pay-as-you-use uploads. Each completed upload scan records $1 of account usage.";
    }
    if (user) {
      return "This login is not tied to an active ScamShield plan or an enabled account-based scan service.";
    }
    return "Log in once and we will check your ScamShield subscription automatically before you scan.";
  }, [accountAccess.scanBalance, isCheckingAccess, scanAccessType, user]);

  const {
    file,
    cost: costNumber,
    analysis,
    status,
    error,
    progress,
    expiresAt,
    prepareFile,
    clearFile,
    startScan,
    restartScan,
    markExpired,
    setStatus,
  } = useGuestScanner();

  // Calculate full cost object with formatting
  const cost = useMemo(() => {
    if (!file) {
      return {
        cost: 1,
        formatted: "$1.00",
        perUploadCharge: 1,
      };
    }
    return {
      cost: costNumber,
      formatted: `$${costNumber.toFixed(2)}`,
      perUploadCharge: 1,
    };
  }, [file, costNumber]);
  const {
    messages,
    status: chatStatus,
    error: chatError,
    sendMessage,
    clearChat,
  } = useAiChat();
  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay = file && status === "ready";
  const handlePaymentSuccess = (payload: {
    scanId: string;
    filePath: string;
    paymentIntentId: string;
  }) => {
    setPaymentOpen(false);
    setStatus("uploading");
    startScan({
      scanId: payload.scanId,
      filePath: payload.filePath,
    });
  };

  // Gated chat: block sendMessage for non-subscribers who haven't paid for a scan yet.
  const handleSendMessage = useCallback(
    (message: string, _files?: File[]) => {
      if (!message.trim()) return;
      if (!chatUnlocked) {
        setPaywallOpen(true);
        return;
      }
      sendMessage(message);
    },
    [chatUnlocked, sendMessage],
  );

  // Save current chat as a printable PDF (uses native browser print dialog).
  const handleSaveAsPdf = useCallback(() => {
    if (messages.length === 0) {
      // Nothing to save
      return;
    }
    window.print();
  }, [messages.length]);

  // Warn the user before they reload/close the tab if they have unsaved chat.
  // Their conversation will be lost on reload — this nudges them to save first.
  useEffect(() => {
    if (messages.length === 0) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Most browsers ignore the custom string and show their own message,
      // but setting returnValue is required to trigger the prompt.
      e.returnValue =
        "Your AI conversation is held only in your browser. If you reload or close this tab, it will be permanently lost. Save it as PDF first?";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [messages.length]);
  const handleRequestPayment = () => {
    if (!canPay || isProcessing) return;
    setStatus("paying");
    setPaymentOpen(true);
  };
  const handlePayPerScan = () => {
    if (!file || !canPay || isProcessing) {
      toast("Upload one supported file or screenshot first.");
      return;
    }

    setPaywallOpen(false);
    handleRequestPayment();
  };

  const handleRefreshLoggedInAccess = async () => {
    await Promise.all([refreshSubscriptions(), refreshAccess()]);
  };

  const handleStartSubscription = useCallback(async () => {
    if (subscriptionCheckoutLoading) return;

    setSubscriptionCheckoutLoading(true);
    try {
      const result = await createSubscriptionCheckout({
        priceId: featuredScamShieldPlan.stripePriceId,
        serviceName: featuredScamShieldPlan.name,
        planTier: featuredPlanTier,
        customerEmail: user?.email ?? undefined,
        customerName:
          (user?.user_metadata?.full_name as string | undefined) ??
          (user?.user_metadata?.name as string | undefined) ??
          undefined,
        returnTo: "/training/ai-analysis",
      });

      if (result?.url) {
        setPaywallOpen(false);
        window.location.href = result.url;
      }
    } finally {
      setSubscriptionCheckoutLoading(false);
    }
  }, [
    createSubscriptionCheckout,
    featuredPlanTier,
    featuredScamShieldPlan.name,
    featuredScamShieldPlan.stripePriceId,
    subscriptionCheckoutLoading,
    user?.email,
    user?.user_metadata,
  ]);

  const handleAuthorizedScan = useCallback(async () => {
    if (!file || !scanAccessType || isProcessing || preparingAuthorizedScan) {
      return;
    }

    try {
      const payload = await prepareAuthorizedScan(file);
      await startScan({
        scanId: payload.scanId,
        filePath: payload.filePath,
      });
    } catch (err) {
      setStatus(file ? "ready" : "idle");
      toast.error(
        err?.message || "Unable to start your account-linked upload scan.",
      );
    } finally {
      await Promise.all([refreshSubscriptions(), refreshAccess()]);
    }
  }, [
    file,
    isProcessing,
    prepareAuthorizedScan,
    preparingAuthorizedScan,
    refreshAccess,
    refreshSubscriptions,
    scanAccessType,
    setStatus,
    startScan,
  ]);

  const handlePrimaryScanAction = () => {
    if (!file || status !== "ready") return;
    if (scanAccessType) {
      void handleAuthorizedScan();
      return;
    }

    setPaywallOpen(true);
  };

  const handlePaymentOpenChange = (open: boolean) => {
    setPaymentOpen(open);
    if (!open && status === "paying" && !isProcessing) {
      setStatus(file ? "ready" : "idle");
    }
  };
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };

  const SCAN_MODES: Array<{ id: ScanMode; label: string; icon: React.ElementType; placeholder: string; inputType: 'text' | 'file' | 'password' }> = [
    { id: 'default', label: 'Chat', icon: Sparkles, placeholder: 'Ask anything or drop a file to analyze...', inputType: 'text' },
    { id: 'email', label: 'Email', icon: Mail, placeholder: 'Paste a suspicious email here...', inputType: 'text' },
    { id: 'url', label: 'URL', icon: ExternalLink, placeholder: 'Enter a URL or link to check safety...', inputType: 'text' },
    { id: 'phone', label: 'Phone', icon: Phone, placeholder: 'Enter a phone number to look up...', inputType: 'text' },
    { id: 'image', label: 'Image', icon: ImageIcon, placeholder: 'Upload an image to check for deepfakes...', inputType: 'file' },
    { id: 'voice', label: 'Voice', icon: Mic, placeholder: 'Upload an audio clip to analyze...', inputType: 'file' },
    { id: 'text-message', label: 'SMS', icon: MessageCircle, placeholder: 'Paste a suspicious text message or DM...', inputType: 'text' },
    { id: 'document', label: 'Document', icon: FileTextIcon, placeholder: 'Upload a PDF or Word document...', inputType: 'file' },
    { id: 'qr', label: 'QR', icon: QrCode, placeholder: 'Upload a QR code image...', inputType: 'file' },
    { id: 'social', label: 'Social', icon: UserCircle, placeholder: 'Paste a social media profile URL...', inputType: 'text' },
    { id: 'password', label: 'Password', icon: KeyRound, placeholder: 'Enter a password to check...', inputType: 'password' },
  ];

  const currentMode = SCAN_MODES.find(m => m.id === scanMode) ?? SCAN_MODES[0];

  const getModePromptPrefix = (mode: ScanMode): string => {
    const prefixes: Partial<Record<ScanMode, string>> = {
      email: 'Analyze this email for phishing indicators, fake sender detection, malicious links, and urgency manipulation. Rate threat level and list red flags:\n\n',
      url: 'Check this URL for safety. Analyze for malicious domains, redirect chains, SSL validity, domain age, and scam patterns. Rate threat level:\n\n',
      phone: 'Look up this phone number and check if it is associated with known scam operations, robocall patterns, or fraud reports:\n\n',
      'text-message': 'Analyze this text message for scam patterns, social engineering, urgency manipulation, and red flags:\n\n',
      social: 'Analyze this social media profile URL for signs of a fake account (AI-generated photos, suspicious activity, catfishing):\n\n',
    };
    return prefixes[mode] ?? '';
  };

  const handleTextScan = () => {
    if (!textInput.trim()) return;
    const prefix = getModePromptPrefix(scanMode);
    handleSendMessage(prefix + textInput);
    setTextInput('');
  };

  const handlePasswordCheck = async () => {
    if (!textInput.trim()) return;
    setCheckingPassword(true);
    try {
      const pw = textInput;
      const score = [
        pw.length >= 8,
        pw.length >= 12,
        /[A-Z]/.test(pw),
        /[a-z]/.test(pw),
        /\d/.test(pw),
        /[^a-zA-Z0-9]/.test(pw),
      ].filter(Boolean).length;

      let breachCount = 'unknown';
      try {
        const encoder = new TextEncoder();
        const hashBuffer = await crypto.subtle.digest('SHA-1', encoder.encode(pw));
        const hashHex = Array.from(new Uint8Array(hashBuffer))
          .map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        const prefix = hashHex.slice(0, 5);
        const suffix = hashHex.slice(5);
        const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, { headers: { 'Add-Padding': 'true' } });
        const text = await res.text();
        const match = text.split('\r\n').find(line => line.startsWith(suffix));
        breachCount = match ? (match.split(':')[1]?.trim() ?? '0') : '0';
      } catch { /* network error — show unknown */ }

      const suggestions: string[] = [];
      if (pw.length < 12) suggestions.push('Use at least 12 characters');
      if (!/[A-Z]/.test(pw)) suggestions.push('Add uppercase letters (A–Z)');
      if (!/[a-z]/.test(pw)) suggestions.push('Add lowercase letters (a–z)');
      if (!/\d/.test(pw)) suggestions.push('Add numbers (0–9)');
      if (!/[^a-zA-Z0-9]/.test(pw)) suggestions.push('Add special characters (!@#$%)');
      if (suggestions.length === 0) suggestions.push('Great password! Store it in a password manager.');

      setPasswordResult({ score, breaches: breachCount, suggestions });
    } finally {
      setCheckingPassword(false);
    }
  };

  return (
    <PageTransition variant="fade">
      <div
        className={`ai-analysis-page min-h-screen transition-colors duration-300 text-slate-100 ${darkMode ? "dark" : ""}`}
      >
        <Navigation />
        <SEO
          title="AI Analysis & Secure File Scan"
          description="Run instant AI analysis on suspicious files, messages, and screenshots. Secure guest scan workflow with automatic deletion in 10 minutes."
          keywords="AI analysis, file scan, scam detection, document scanning, secure analysis"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AI Analysis & Secure File Scan",
            description:
              "Run instant AI analysis on suspicious files, messages, and screenshots.",
            url: "https://www.invisionnetwork.org/training/ai-analysis",
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              telephone: SITE.phone.e164,
            },
          }}
        />

        <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 z-10">

          {/* Floating utility toolbar */}
          <div className="fixed top-20 right-4 z-50 flex flex-col gap-1.5">
            {[
              { icon: Trash2, title: "Clear chat", onClick: () => { clearChat(); clearFile(); }, disabled: messages.length === 0 && !file },
              { icon: Download, title: "Download", onClick: () => {
                const blob = new Blob([messages.map(m => `[${m.role}]: ${m.content}`).join("\n\n") || "No data."], { type: "text/plain" });
                const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `ai-analysis-${Date.now()}.txt` });
                a.click();
              }, disabled: messages.length === 0 },
              { icon: FileDown, title: "Save as PDF", onClick: handleSaveAsPdf, disabled: messages.length === 0 },
            ].map(({ icon: Icon, title, onClick, disabled }) => (
              <button key={title} type="button" title={title} onClick={onClick} disabled={disabled}
                className="aia-toolbar w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          {/* Chat history — above chatbox */}
          {messages.length > 0 && (
            <div className="w-full mb-4" style={{ maxWidth: 'min(640px, 92vw)' }}>
              <PremiumChatHistory messages={messages} status={chatStatus} />
            </div>
          )}

          {/* Access banner */}
          <div className="aia-notice aia-notice--access mb-3 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-xl px-4 py-3 shadow-xl" style={{ width: 'min(640px, 92vw)' }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex items-start gap-2">
                {scanAccessType === "subscription" ? <ShieldCheck className="h-4 w-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  : scanAccessType === "balance" ? <Wallet className="h-4 w-4 text-orange-300 mt-0.5 flex-shrink-0" />
                  : scanAccessType === "metered" ? <CreditCard className="h-4 w-4 text-orange-300 mt-0.5 flex-shrink-0" />
                  : user ? <ShieldAlert className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  : <LogIn className="h-4 w-4 text-orange-200 mt-0.5 flex-shrink-0" />}
                <div>
                  <p className="text-xs font-semibold text-white">{accessHeadline}</p>
                  <p className="text-xs text-white/70 leading-relaxed mt-0.5">{accessDescription}</p>
                </div>
              </div>
              {!scanAccessType && (
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  {!user && (
                    <Button asChild type="button" size="sm" variant="heroPrimary" className="text-white text-xs h-7 px-3">
                      <Link to={loginPath}>Log in</Link>
                    </Button>
                  )}
                  <Button type="button" size="sm" variant="heroOutline" className="text-white hover:text-white text-xs h-7 px-3"
                    onClick={() => void handleStartSubscription()} disabled={subscriptionCheckoutLoading}>
                    {subscriptionCheckoutLoading ? <><Loader2 className="h-3 w-3 animate-spin" /> Starting...</> : "Start ScamShield"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Scan mode tab bar */}
          <div className="flex items-center gap-1 flex-wrap justify-center mb-3" style={{ maxWidth: 'min(640px, 92vw)', width: '100%' }}>
            {SCAN_MODES.map((mode) => {
              const Icon = mode.icon;
              const active = scanMode === mode.id;
              return (
                <button key={mode.id} type="button"
                  onClick={() => { setScanMode(mode.id); setTextInput(''); setPasswordResult(null); }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all border ${
                    active
                      ? 'bg-[rgba(255,122,69,0.35)] border-[rgba(255,122,69,0.55)] text-white shadow-sm'
                      : 'bg-[rgba(28,28,30,0.65)] border-[rgba(255,255,255,0.1)] text-[#c9c9cd] hover:text-white hover:bg-[rgba(255,255,255,0.08)]'
                  }`}>
                  <Icon className="w-3 h-3" />
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Main chatbox */}
          <div style={{ width: 'min(640px, 92vw)', background: '#1c1c1e', borderRadius: '22px', padding: '18px 20px 14px', boxShadow: '0 20px 50px rgba(0,0,0,0.18)' }}>

            {/* Text/password input area */}
            {(currentMode.inputType === 'text' || currentMode.inputType === 'password') && (
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && scanMode !== 'default') { e.preventDefault(); handleTextScan(); } }}
                placeholder={currentMode.placeholder}
                rows={scanMode === 'default' ? 2 : 4}
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: '15px', padding: '6px 2px 16px', resize: 'none', fontFamily: 'inherit' }}
                className="placeholder:text-[#8a8a8f]"
              />
            )}

            {/* File mode placeholder text */}
            {currentMode.inputType === 'file' && (
              <p style={{ color: '#8a8a8f', fontSize: '15px', padding: '6px 2px 16px' }}>
                {currentMode.placeholder}
              </p>
            )}

            {/* Tool icons row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#c9c9cd' }}>
              {/* File/image triggers for file modes */}
              {currentMode.inputType === 'file' && (
                <>
                  <label title="Upload file" style={{ cursor: 'pointer', background: 'transparent', color: '#c9c9cd', padding: '4px', borderRadius: '6px' }}
                    className="hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition">
                    <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) prepareFile(f); }} />
                    <Camera className="w-4 h-4" />
                  </label>
                  <label title="Upload image" style={{ cursor: 'pointer', background: 'transparent', color: '#c9c9cd', padding: '4px', borderRadius: '6px' }}
                    className="hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition">
                    <input type="file" accept="image/*,audio/*,.pdf,.doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) prepareFile(f); }} />
                    <ImageIcon className="w-4 h-4" />
                  </label>
                </>
              )}

              {/* Default mode chat icons */}
              {scanMode === 'default' && (
                <label title="Attach file" style={{ cursor: 'pointer', background: 'transparent', color: '#c9c9cd', padding: '4px', borderRadius: '6px' }}
                  className="hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition">
                  <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) prepareFile(f); }} />
                  <Camera className="w-4 h-4" />
                </label>
              )}

              {/* Separator */}
              <div style={{ width: '1px', height: '18px', background: '#3a3a3d' }} />

              <span className="flex-1" />

              {/* Password check button */}
              {currentMode.inputType === 'password' && (
                <button type="button" onClick={handlePasswordCheck} disabled={!textInput.trim() || checkingPassword}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: textInput.trim() ? '#ff7a45' : '#3a3a3d', color: '#fff', border: 'none', cursor: textInput.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s, background 0.2s' }}
                  className="hover:scale-105">
                  {checkingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                </button>
              )}

              {/* Send/Analyze button for text modes */}
              {(currentMode.inputType === 'text') && (
                <button type="button"
                  onClick={scanMode === 'default' ? () => handleSendMessage(textInput) : handleTextScan}
                  disabled={!textInput.trim() || isProcessing}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: textInput.trim() ? '#fff' : '#3a3a3d', color: '#1c1c1e', border: 'none', cursor: textInput.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'transform 0.2s, background 0.2s' }}
                  className="hover:scale-105">
                  <Mic className="w-4 h-4" />
                </button>
              )}

              {/* Scan button for file modes */}
              {currentMode.inputType === 'file' && file && status === 'ready' && (
                <button type="button" onClick={handlePrimaryScanAction} disabled={isProcessing || preparingAuthorizedScan}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff7a45', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(255,122,69,0.4)', transition: 'transform 0.2s' }}
                  className="hover:scale-105">
                  {preparingAuthorizedScan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* File chip (when file attached) */}
          {file && (
            <div className="flex flex-wrap items-center gap-2 mt-3" style={{ maxWidth: 'min(640px, 92vw)' }}>
              <div className="aia-notice aia-notice--filechip flex items-center gap-2 rounded-full bg-[#1c1c1e]/80 border border-white/15 px-4 py-2">
                <span className="text-sm text-white/90 font-medium truncate max-w-[180px]">{file.name}</span>
                <span className="text-white/40">·</span>
                <span className="text-sm text-white/70">{cost.formatted}</span>
                <button type="button" onClick={clearFile} className="ml-1 rounded-full p-1 text-white/50 hover:text-white hover:bg-white/10 transition" aria-label="Remove file">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Password result card */}
          {passwordResult && (
            <div className="mt-3" style={{ width: 'min(640px, 92vw)', background: '#1c1c1e', borderRadius: '16px', padding: '16px 20px' }}>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Password Analysis</p>
              {/* Strength bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5" style={{ color: '#c9c9cd' }}>
                  <span>Strength</span>
                  <span className="font-medium">{['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.min(passwordResult.score, 5)]}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#3a3a3d' }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${(passwordResult.score / 6) * 100}%`,
                    background: passwordResult.score <= 1 ? '#ef4444' : passwordResult.score <= 2 ? '#f97316' : passwordResult.score <= 3 ? '#eab308' : '#22c55e',
                  }} />
                </div>
              </div>
              {/* Breach status */}
              <div className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 mb-3 ${passwordResult.breaches === '0' ? 'bg-green-500/15 text-green-300' : passwordResult.breaches === 'unknown' ? 'bg-yellow-500/15 text-yellow-300' : 'bg-red-500/15 text-red-300'}`}>
                {passwordResult.breaches === '0' ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                {passwordResult.breaches === '0' ? 'Not found in known data breaches ✓'
                  : passwordResult.breaches === 'unknown' ? 'Could not check breach database (check your connection)'
                  : `Found in ${parseInt(passwordResult.breaches).toLocaleString()} known data breach(es) — change this password`}
              </div>
              {/* Suggestions */}
              <ul className="space-y-1">
                {passwordResult.suggestions.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs" style={{ color: '#c9c9cd' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#ff7a45' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Privacy notice */}
          <div className="aia-notice aia-notice--privacy mt-3 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md px-4 py-3" style={{ width: 'min(640px, 92vw)' }}>
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/70 leading-relaxed">
                Files auto-deleted in 10 min · Conversations not saved · Each upload scan ${cost.perUploadCharge.toFixed(2)} · Take a <Camera className="inline h-3 w-3 mx-0.5 -mt-0.5" /> screenshot before leaving
              </p>
            </div>
          </div>
        </main>
      </div>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={handlePaymentOpenChange}
        file={file}
        amount={cost.cost}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Paywall: shown when a non-subscriber tries to chat without paying. */}
      <Dialog open={paywallOpen} onOpenChange={setPaywallOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,244,0.98))] p-0 shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:max-w-xl">
          <div className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(217,108,74,0.12),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,248,242,0.96))] px-5 py-5 sm:px-6">
            <DialogHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d96c4a]/15 bg-[#d96c4a]/10 text-[#b75539] shadow-sm">
                  <Lock className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-left text-2xl font-semibold tracking-tight text-foreground">
                  Access AI Scam Analysis
                </DialogTitle>
                <DialogDescription className="text-left text-sm leading-relaxed text-muted-foreground">
                  Choose how you want to start scanning.
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>

          <div className="space-y-4 px-4 py-5 sm:px-6 sm:py-6">
            <div className="rounded-[24px] border border-border/60 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10 text-emerald-600">
                  {user ? (
                    <BadgeCheck className="h-5 w-5" />
                  ) : (
                    <LogIn className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Existing ScamShield subscriber
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {user
                      ? "You are already signed in. Refresh this account and we will unlock scanning right away if subscription or account-linked access is active."
                      : "Log in and we will verify your active subscription, then send you straight to scan."}
                  </p>
                </div>
              </div>
              {user ? (
                <Button
                  type="button"
                  variant="heroPrimary"
                  className="h-11 w-full text-white"
                  onClick={() => {
                    void handleRefreshLoggedInAccess();
                    setPaywallOpen(false);
                  }}
                >
                  Refresh access
                </Button>
              ) : (
                <Button asChild variant="heroPrimary" className="h-11 w-full text-white">
                  <Link to={loginPath} onClick={() => setPaywallOpen(false)}>
                    Log in to scan
                  </Link>
                </Button>
              )}
            </div>

            <div className="rounded-[24px] border border-border/60 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Start a ScamShield subscription
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Get subscriber access for ongoing uploads, scam support, and protected account access.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="heroPrimary"
                className="h-11 w-full text-white"
                onClick={() => void handleStartSubscription()}
                disabled={subscriptionCheckoutLoading}
              >
                {subscriptionCheckoutLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Starting checkout...
                  </>
                ) : (
                  "Start subscription"
                )}
              </Button>
            </div>

            <div className="rounded-[24px] border border-border/60 bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d96c4a]/15 bg-[#d96c4a]/10 text-[#b75539]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    One time scan
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pay ${cost.perUploadCharge.toFixed(2)} per upload. Each file or screenshot counts as one scan.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="heroPrimary"
                className="h-11 w-full text-white"
                onClick={handlePayPerScan}
              >
                Pay ${cost.perUploadCharge.toFixed(2)} per scan
              </Button>
            </div>
          </div>

          <DialogFooter className="border-t border-border/60 bg-white/70 px-5 py-4 sm:justify-center sm:px-6">
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Scans stay tied to the signed in account. Pay per scan charges only when an upload is processed.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
