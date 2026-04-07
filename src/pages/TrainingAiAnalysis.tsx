import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { EnhancedPromptInputBox } from "@/components/ui/ai-prompt-box-enhanced";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";

import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { SITE } from "@/config/site";
import {
  Download,
  Home,
  Moon,
  RefreshCw,
  Sun,
  Trash2,
  X,
  FileDown,
  Lock,
  ShieldAlert,
  Camera,
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
export default function TrainingAiAnalysis() {
  usePrerenderReady(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [scanPaidThisSession, setScanPaidThisSession] = useState(false);

  // Subscription gate — active ScamShield subscribers get AI chat included
  // with their plan. Non-subscribers must either subscribe OR pay for at least
  // one file scan, which unlocks AI chat for the rest of their browser session.
  // Nothing here is free — the chat is gated end-to-end.
  const { subscriptions } = useSubscription();
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
  const chatUnlocked = hasActiveProtection || scanPaidThisSession;

  // Set uniform background for this page
  useEffect(() => {
    const originalBodyBg = document.body.style.backgroundColor;
    const originalBodyBgImage = document.body.style.backgroundImage;
    const originalHtmlBg = document.documentElement.style.backgroundColor;
    const originalBodyMargin = document.body.style.margin;
    const originalBodyPadding = document.body.style.padding;
    const originalHtmlMargin = document.documentElement.style.margin;
    const originalHtmlPadding = document.documentElement.style.padding;

    // Apply uniform background
    document.body.style.backgroundColor = "#B8B9D1";
    document.body.style.backgroundImage = "none";
    document.documentElement.style.backgroundColor = "#B8B9D1";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    return () => {
      // Restore original styles on unmount
      document.body.style.backgroundColor = originalBodyBg;
      document.body.style.backgroundImage = originalBodyBgImage;
      document.documentElement.style.backgroundColor = originalHtmlBg;
      document.body.style.margin = originalBodyMargin;
      document.body.style.padding = originalBodyPadding;
      document.documentElement.style.margin = originalHtmlMargin;
      document.documentElement.style.padding = originalHtmlPadding;
    };
  }, []);
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
    if (!file)
      return {
        cost: 0.5,
        formatted: "$0.50",
        minimumCharge: 0.5,
      };
    return {
      cost: costNumber,
      formatted: `$${costNumber.toFixed(2)}`,
      minimumCharge: 0.5,
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
    // Unlock AI chat for the rest of this browser session as a thank-you for paying.
    setScanPaidThisSession(true);
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
    const bg = next ? "#1a1a2e" : "#B8B9D1";
    const textColor = next ? "#e2e8f0" : "";
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
    document.body.style.color = textColor;
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
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-[#1a1a2e] text-slate-200" : "bg-[#B8B9D1] text-foreground"}`}
      >
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
          className={`relative min-h-screen overflow-hidden flex flex-col transition-colors duration-300 ${darkMode ? "bg-[#1a1a2e]" : "bg-[#B8B9D1]"}`}
        >
          <div className="relative flex-1 flex flex-col px-6 py-6">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
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

              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
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
                <EnhancedPromptInputBox
                  onSend={handleSendMessage}
                  onFileSelect={prepareFile}
                  isLoading={status === "uploading" || status === "analyzing"}
                  placeholder="Drop file to scan or type a message..."
                  hasFile={!!file}
                  onClearFile={clearFile}
                  onRequestPayment={handleRequestPayment}
                  canAnalyze={file && status === "ready"}
                />
                {file && (
                  <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 shadow-xl">
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
                )}
                <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/15 bg-black/35 backdrop-blur-md px-5 py-4 shadow-xl">
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
                        auto-deleted from our scanner in 10 minutes. $
                        {cost.minimumCharge.toFixed(2)} minimum per scan — no
                        free analysis.
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center">
              AI Chat is a paid feature
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Nothing on InVision is free — including AI scam analysis. Pick
              one of the options below to unlock chat.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-1">
                <ShieldAlert className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">
                  Subscribe to ScamShield Protection
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Active subscribers get unlimited AI chat plus 24/7 fraud
                monitoring, identity protection, and scam insurance.
              </p>
              <Button asChild className="w-full">
                <Link
                  to="/services/scam-insurance"
                  onClick={() => setPaywallOpen(false)}
                >
                  See ScamShield plans
                </Link>
              </Button>
            </div>

            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-1">
                <FileDown className="h-4 w-4 text-foreground" />
                <p className="font-semibold text-sm">
                  Or pay per scan (${cost.minimumCharge.toFixed(2)} min)
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Upload a suspicious file or screenshot. Once you pay for the
                scan, AI chat is unlocked for the rest of this browser session.
              </p>
              <Button
                variant="outline"
                onClick={() => setPaywallOpen(false)}
                className="w-full"
              >
                Got it — I'll upload a file
              </Button>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <p className="text-xs text-muted-foreground text-center">
              We never store your files or conversations. Everything is
              auto-deleted in 10 minutes.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}
