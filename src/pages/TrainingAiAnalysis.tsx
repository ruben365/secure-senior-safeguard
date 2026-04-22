import { useState, useEffect, useMemo, useCallback } from "react";
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
  return (
    <PageTransition variant="fade">
      <div
        className={`ai-analysis-page min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-[#1a1a2e] text-slate-200" : "bg-background text-foreground"}`}
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

        <main
          className={`relative min-h-screen overflow-hidden flex flex-col transition-colors duration-300 pt-[clamp(80px,10vw,100px)] ${darkMode ? "bg-[#1a1a2e]" : "bg-background"}`}
        >
          <div className="relative flex-1 flex flex-col px-6 py-6">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="aia-toolbar flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                  <Link
                    to="/"
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Go home"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Toggle dark mode"
                  >
                    {darkMode ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"
                    title="Refresh page"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="aia-toolbar flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    clearChat();
                    clearFile();
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Delete data"
                  disabled={messages.length === 0 && !file}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const chatText = messages
                      .map((m) => `[${m.role}]: ${m.content}`)
                      .join("\n\n");
                    const blob = new Blob(
                      [chatText || "No data to download."],
                      {
                        type: "text/plain",
                      },
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `ai-analysis-${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Download as text"
                  disabled={messages.length === 0}
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleSaveAsPdf}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Save as PDF (print dialog)"
                  disabled={messages.length === 0}
                >
                  <FileDown className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Chat Area - Expanded */}
            <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-7xl mx-auto">
              {/* AI Chat History */}
              {messages.length > 0 && (
                <PremiumChatHistory messages={messages} status={chatStatus} />
              )}

              {/* Enhanced AI Command Center */}
              <div className="w-full flex flex-col items-center gap-3">
                <div className="aia-notice aia-notice--access w-full max-w-3xl mx-auto rounded-[1.75rem] border border-white/15 bg-black/30 backdrop-blur-xl px-5 py-4 shadow-xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2 text-white">
                        {scanAccessType === "subscription" ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-300" />
                        ) : scanAccessType === "balance" ? (
                          <Wallet className="h-4 w-4 text-[#f6c7b8]" />
                        ) : scanAccessType === "metered" ? (
                          <CreditCard className="h-4 w-4 text-[#f6c7b8]" />
                        ) : user ? (
                          <ShieldAlert className="h-4 w-4 text-yellow-300" />
                        ) : (
                          <LogIn className="h-4 w-4 text-[#f6c7b8]" />
                        )}
                        <p className="text-sm font-semibold">{accessHeadline}</p>
                      </div>
                      <p className="text-sm leading-relaxed text-white/80">
                        {accessDescription}
                      </p>
                    </div>

                    {!scanAccessType && (
                      <div className="flex flex-wrap gap-2">
                        {!user && (
                          <Button
                            asChild
                            type="button"
                            size="sm"
                            variant="heroPrimary"
                            className="text-white"
                          >
                            <Link to={loginPath}>Log in to scan</Link>
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="heroOutline"
                          className="text-white hover:text-white"
                          onClick={() => void handleStartSubscription()}
                          disabled={subscriptionCheckoutLoading}
                        >
                          {subscriptionCheckoutLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Starting checkout...
                            </>
                          ) : (
                            "Start ScamShield"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <PromptInputBox
                  onSend={handleSendMessage}
                  onFileSelect={prepareFile}
                  isLoading={status === "uploading" || status === "analyzing"}
                  placeholder="Drop file to scan or type a message..."
                  className="max-w-3xl"
                />
                {file && (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {/* File chip */}
                    <div className="aia-notice aia-notice--filechip flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 shadow-xl">
                      <span className="text-sm text-white/90 font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-white/60">•</span>
                      <span className="text-sm text-white/80 whitespace-nowrap">
                        {cost.formatted}
                      </span>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="ml-2 rounded-full p-1 text-white/60 hover:text-white hover:bg-white/10 transition"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {/* Pay & Scan button — only when file is ready */}
                    {status === "ready" && (
                      <Button
                        type="button"
                        size="lg"
                        onClick={handlePrimaryScanAction}
                        disabled={isProcessing || preparingAuthorizedScan}
                        className="rounded-full"
                      >
                        {scanAccessType
                          ? preparingAuthorizedScan
                            ? "Preparing scan..."
                            : "Scan this upload"
                          : `Choose access to scan`}
                      </Button>
                    )}
                  </div>
                )}
                <div className="aia-notice aia-notice--privacy w-full max-w-3xl mx-auto rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md px-5 py-4 shadow-xl">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 text-sm text-white/90 leading-relaxed">
                      <p className="font-semibold mb-1 text-white">
                        Privacy notice — read this before you start
                      </p>
                      <p className="text-white/80">
                        We do{" "}
                        <span className="font-semibold text-white">not</span>{" "}
                        store your files and we do{" "}
                        <span className="font-semibold text-white">not</span>{" "}
                        save your AI conversations. Everything you see here
                        lives only in your browser.{" "}
                        <span className="font-semibold text-yellow-300">
                          If you reload or close this tab, your conversation is
                          permanently lost.
                        </span>{" "}
                        Take a screenshot{" "}
                        <Camera className="inline h-3.5 w-3.5 -mt-0.5 mx-0.5" />{" "}
                        or hit{" "}
                        <FileDown className="inline h-3.5 w-3.5 -mt-0.5 mx-0.5" />{" "}
                        Save as PDF before you leave. Uploaded files are
                        auto-deleted from our scanner in 10 minutes. Every
                        upload scan is billed at $
                        {cost.perUploadCharge.toFixed(2)} per file, screenshot,
                        image, audio clip, or supported upload.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
