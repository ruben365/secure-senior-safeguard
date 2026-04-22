import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { PremiumChatHistory } from "@/components/training/PremiumChatHistory";
import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { useAiChat } from "@/hooks/useAiChat";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useScanAccess } from "@/hooks/useScanAccess";
import { useCheckout } from "@/contexts/CheckoutContext";
import { SITE } from "@/config/site";
import { SCAMSHIELD_PLANS } from "@/config/products";
import {
  BadgeCheck, Bookmark, CreditCard, FileDown, LogIn, Minimize2,
  MoreHorizontal, Moon, ShieldCheck, Sparkles, Sun, X, Lock,
  ShieldAlert, Wallet, Loader2, Mic, KeyRound, Globe, StopCircle,
  Paperclip, Settings, Folder, RotateCcw, CheckSquare, Square,
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

// ─── Types ────────────────────────────────────────────────────────────────────

type ScanMode =
  | 'default' | 'email' | 'url' | 'phone' | 'image'
  | 'voice' | 'text-message' | 'document' | 'qr' | 'social' | 'password';

// ─── Constants ────────────────────────────────────────────────────────────────

const MODE_PROMPTS: Partial<Record<ScanMode, string>> = {
  email: 'Analyze this email for phishing indicators, fake sender detection, malicious links, and urgency manipulation. Rate threat level and list red flags:\n\n',
  url: 'Check this URL for safety. Analyze for malicious domains, redirect chains, SSL validity, domain age, and scam patterns. Rate threat level:\n\n',
  phone: 'Check this phone number for scam associations, robocall patterns, and fraud reports:\n\n',
  'text-message': 'Analyze this SMS/DM for scam patterns, social engineering, and urgency manipulation:\n\n',
  social: 'Analyze this social media profile for signs of a fake account (AI photos, suspicious activity, catfishing):\n\n',
};

const LIGHT_BG = `radial-gradient(ellipse 80% 60% at 50% 110%, #ff7a45 0%, #ff9b5a 18%, #ffb784 35%, #e8a7b8 55%, #c8a8d6 72%, #a8b3e8 88%, #9fb5ec 100%)`;
const DARK_BG  = `radial-gradient(ellipse 80% 60% at 50% 110%, #3a1a0a 0%, #4a2010 20%, #3a1a2a 45%, #1f1530 70%, #0a0a1f 100%)`;

// Anchored to full hostname to prevent lookalike domains
const SOCIAL_RE = /^https?:\/\/(?:www\.)?(?:facebook\.com|instagram\.com|linkedin\.com|tiktok\.com|reddit\.com|pinterest\.com|snapchat\.com|twitter\.com|x\.com|youtube\.com)\//i;

function detectScanMode(text: string, file: File | null): ScanMode {
  if (file) {
    if (file.type.startsWith('audio/')) return 'voice';
    if (file.type.startsWith('image/')) return 'image';
    return 'document';
  }
  const t = text.trim();
  if (!t) return 'default';
  if (SOCIAL_RE.test(t)) return 'social';
  if (/^https?:\/\//i.test(t)) return 'url';
  if (/^[+\d\s\-()]{7,15}$/.test(t)) return 'phone';
  if (t.split('\n').length > 2 && /@[^\s]+\.[a-z]{2,}/i.test(t)) return 'email';
  if (t.split('\n').length > 1 && t.length > 80) return 'text-message';
  return 'default';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TrainingAiAnalysis() {
  usePrerenderReady(true);

  // — UI state —
  const [paymentOpen, setPaymentOpen]           = useState(false);
  const [paywallOpen, setPaywallOpen]           = useState(false);
  const [settingsOpen, setSettingsOpen]         = useState(false);
  const [menuOpen, setMenuOpen]                 = useState(false);
  const [minimize, setMinimize]                 = useState(false);
  const [darkMode, setDarkMode]                 = useState(false);
  const [webSearch, setWebSearch]               = useState(false);
  const [textInput, setTextInput]               = useState('');
  const [isRecording, setIsRecording]           = useState(false);
  const [passwordResult, setPasswordResult]     = useState<{ score: number; breaches: string; suggestions: string[] } | null>(null);
  const [checkingPassword, setCheckingPassword] = useState(false);
  const [settings, setSettings] = useState({
    darkMode:    false,
    sendOnEnter: true,
    webSearch:   false,
  });

  // — Refs —
  const textareaRef      = useRef<HTMLTextAreaElement>(null);
  const recognitionRef   = useRef<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef     = useRef<HTMLInputElement>(null);
  const micBtnRef        = useRef<HTMLButtonElement>(null);
  const menuRef          = useRef<HTMLDivElement>(null);

  // — Auth / subscription hooks —
  const { user } = useAuth();
  const { openCheckout } = useCheckout();
  const { subscriptions, loading: subscriptionsLoading, refreshSubscriptions } = useSubscription();
  const {
    accountAccess, loading: scanAccessLoading,
    preparing: preparingAuthorizedScan,
    refreshAccess, prepareAuthorizedScan,
  } = useScanAccess();

  const hasActiveProtection = useMemo(
    () => subscriptions.some(s => s.status === "active" || s.status === "trialing" || s.status === "past_due"),
    [subscriptions],
  );
  const scanAccessType = useMemo(() => {
    if (hasActiveProtection) return "subscription" as const;
    if (accountAccess.canScan && accountAccess.accessType !== "none") return accountAccess.accessType;
    return null;
  }, [accountAccess.accessType, accountAccess.canScan, hasActiveProtection]);

  const chatUnlocked     = scanAccessType !== null;
  const isCheckingAccess = !!user && (subscriptionsLoading || scanAccessLoading);
  const loginPath        = `/auth?redirect=${encodeURIComponent("/training/ai-analysis")}`;

  const featuredPlan = useMemo(() => SCAMSHIELD_PLANS.find(p => p.popular) ?? SCAMSHIELD_PLANS[0], []);

  const accessLabel = useMemo(() => {
    if (isCheckingAccess)                    return "Checking access…";
    if (scanAccessType === "subscription")   return "ScamShield active ✓";
    if (scanAccessType === "balance")        return `${accountAccess.scanBalance ?? 0} scan(s) remaining`;
    if (scanAccessType === "metered")        return "Pay-per-scan enabled";
    if (user)                                return "No active scan access";
    return "Log in to scan";
  }, [accountAccess.scanBalance, isCheckingAccess, scanAccessType, user]);

  // — Scanner hook —
  const {
    file, cost: costNumber, status,
    prepareFile, clearFile, startScan, setStatus,
  } = useGuestScanner();

  const cost = useMemo(() => ({
    cost: costNumber,
    formatted: `$${costNumber.toFixed(2)}`,
    perUploadCharge: 1,
  }), [costNumber]);

  const { messages, status: chatStatus, sendMessage, clearChat } = useAiChat();
  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay       = file && status === "ready";

  // Auto-detect scan mode from current input
  const autoDetectedMode = useMemo(() => detectScanMode(textInput, file), [textInput, file]);

  // Show password check UI for short inputs with no spaces
  const looksLikePassword = useMemo(() =>
    textInput.trim().length > 0 &&
    textInput.trim().length <= 50 &&
    !/\s/.test(textInput.trim()),
  [textInput]);

  // — Keyboard shortcuts —
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        textareaRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setMenuOpen(false);
        if (isRecording) stopRecording();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRecording]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // — Beforeunload warning —
  useEffect(() => {
    if (messages.length === 0) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Your AI conversation lives only in this browser. Save it as PDF before leaving?";
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [messages.length]);

  // — Speech recognition / MediaRecorder fallback —
  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
    setIsRecording(false);
    micBtnRef.current?.classList.remove('recording');
  }, []);

  const startRecording = useCallback(() => {
    if (!window.isSecureContext) {
      toast.error("Microphone requires a secure (HTTPS) connection.");
      return;
    }
    const win = window as Window & typeof globalThis & {
      SpeechRecognition?: typeof SpeechRecognition;
      webkitSpeechRecognition?: typeof SpeechRecognition;
    };
    const SR = win.SpeechRecognition ?? win.webkitSpeechRecognition;

    if (SR) {
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.onresult = (e: SpeechRecognitionEvent) => {
        setTextInput(Array.from(e.results).map(r => r[0].transcript).join(''));
      };
      rec.onend = () => {
        setIsRecording(false);
        micBtnRef.current?.classList.remove('recording');
      };
      rec.onerror = (e: SpeechRecognitionErrorEvent) => {
        setIsRecording(false);
        micBtnRef.current?.classList.remove('recording');
        const msg = e.error === 'not-allowed'
          ? 'Microphone access denied. Please allow mic in your browser settings.'
          : e.error === 'no-speech'
          ? 'No speech detected. Try again.'
          : `Voice error: ${e.error}`;
        toast.error(msg);
      };
      recognitionRef.current = rec;
      rec.start();
      setIsRecording(true);
      micBtnRef.current?.classList.add('recording');
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const chunks: BlobPart[] = [];
        const mr = new MediaRecorder(stream);
        mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        mr.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const kb = (blob.size / 1024).toFixed(1);
          toast.success(`Voice note recorded (${kb} KB)`);
          setIsRecording(false);
          micBtnRef.current?.classList.remove('recording');
        };
        mediaRecorderRef.current = mr;
        mr.start();
        setIsRecording(true);
        micBtnRef.current?.classList.add('recording');
      }).catch(() => {
        toast.error('Microphone access denied.');
      });
    }
  }, []);
  const toggleRecording = () => { if (isRecording) stopRecording(); else startRecording(); };

  // — Handlers —
  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    if (!chatUnlocked) { setPaywallOpen(true); return; }
    const mode = detectScanMode(text, file);
    const prefix = MODE_PROMPTS[mode] ?? '';
    sendMessage(prefix + text);
    setTextInput('');
    setPasswordResult(null);
  }, [chatUnlocked, file, sendMessage]);

  const handlePasswordCheck = async () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;
    const pw = trimmed.replace(/^check\s+password:\s*/i, "");
    if (!pw) return;
    setCheckingPassword(true);
    try {
      const score = [
        pw.length >= 8, pw.length >= 12,
        /[A-Z]/.test(pw), /[a-z]/.test(pw),
        /\d/.test(pw), /[^a-zA-Z0-9]/.test(pw),
      ].filter(Boolean).length;

      let breachCount = 'unknown';
      try {
        const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(pw));
        const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        const res  = await fetch(`https://api.pwnedpasswords.com/range/${hex.slice(0, 5)}`, { headers: { 'Add-Padding': 'true' } });
        const hit  = (await res.text()).split('\r\n').find(l => l.startsWith(hex.slice(5)));
        breachCount = hit ? (hit.split(':')[1]?.trim() ?? '0') : '0';
      } catch { /* offline */ }

      const suggestions: string[] = [];
      if (pw.length < 12)            suggestions.push('Use at least 12 characters');
      if (!/[A-Z]/.test(pw))         suggestions.push('Add uppercase letters');
      if (!/[a-z]/.test(pw))         suggestions.push('Add lowercase letters');
      if (!/\d/.test(pw))            suggestions.push('Add numbers');
      if (!/[^a-zA-Z0-9]/.test(pw))  suggestions.push('Add special characters');
      if (!suggestions.length)       suggestions.push('Strong password! Store it in a password manager.');
      setPasswordResult({ score, breaches: breachCount, suggestions });
    } finally {
      setCheckingPassword(false);
    }
  };

  const handlePaymentSuccess = (payload: { scanId: string; filePath: string; paymentIntentId: string }) => {
    setPaymentOpen(false);
    setStatus("uploading");
    startScan({ scanId: payload.scanId, filePath: payload.filePath });
  };

  const handlePayPerScan = () => {
    if (!file || !canPay || isProcessing) { toast("Upload a file first."); return; }
    setPaywallOpen(false);
    setStatus("paying");
    setPaymentOpen(true);
  };

  const handleAuthorizedScan = useCallback(async () => {
    if (!file || !scanAccessType || isProcessing || preparingAuthorizedScan) return;
    try {
      const payload = await prepareAuthorizedScan(file);
      await startScan({ scanId: payload.scanId, filePath: payload.filePath });
    } catch (err: unknown) {
      setStatus(file ? "ready" : "idle");
      toast.error(err instanceof Error ? err.message : "Unable to start scan.");
    } finally {
      await Promise.all([refreshSubscriptions(), refreshAccess()]);
    }
  }, [file, isProcessing, prepareAuthorizedScan, preparingAuthorizedScan, refreshAccess, refreshSubscriptions, scanAccessType, setStatus, startScan]);

  const handlePrimaryScanAction = () => {
    if (!file || status !== "ready") return;
    if (scanAccessType) { void handleAuthorizedScan(); return; }
    setPaywallOpen(true);
  };

  const handleStartSubscription = useCallback(() => {
    setPaywallOpen(false);
    openCheckout(featuredPlan.id, "subscription");
  }, [openCheckout, featuredPlan.id]);

  const handleRefreshAccess = async () => {
    await Promise.all([refreshSubscriptions(), refreshAccess()]);
    toast("Access refreshed.");
  };

  const handleSaveAsPdf = () => { if (messages.length) window.print(); };

  const handleDownload = () => {
    const txt = messages.map(m => `[${m.role}]: ${m.content}`).join('\n\n') || 'No data.';
    const a = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(new Blob([txt], { type: 'text/plain' })),
      download: `scan-${Date.now()}.txt`,
    });
    a.click();
  };

  // ─── Style helpers ────────────────────────────────────────────────────────

  const pillBase: React.CSSProperties = {
    background:     'rgba(20,20,22,0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius:   '999px',
    border:         '1px solid rgba(255,255,255,0.12)',
    color:          '#c9c9cd',
    display:        'flex',
    alignItems:     'center',
    gap:            '2px',
    padding:        '4px 8px',
  };

  const toolBtn: React.CSSProperties = {
    background:    'transparent',
    border:        'none',
    color:         '#c9c9cd',
    padding:       '4px 6px',
    borderRadius:  '999px',
    cursor:        'pointer',
    display:       'flex',
    alignItems:    'center',
    justifyContent:'center',
    transition:    'color 0.15s, background 0.15s',
  };

  const sepStyle: React.CSSProperties = { width: '1px', height: '18px', background: '#3a3a3d', flexShrink: 0 };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <PageTransition variant="fade">
      <div
        className="ai-analysis-page min-h-screen flex flex-col relative"
        style={{
          background: darkMode ? DARK_BG : LIGHT_BG,
          backgroundAttachment: 'fixed',
          color: '#fff',
          transform: minimize ? 'scale(0.9)' : 'scale(1)',
          transformOrigin: 'top center',
          transition: 'transform 0.25s ease',
        }}
      >
        <SEO
          title="AI Security Scanner — Auto-Detect Scan"
          description="Paste suspicious emails, links, phone numbers, or attach files. AI auto-detects and analyzes threats instantly."
          keywords="AI scanner, phishing detector, deepfake checker, scam detection"
          structuredData={{ "@context": "https://schema.org", "@type": "WebPage", name: "AI Security Scanner", url: "https://www.invisionnetwork.org/training/ai-analysis", publisher: { "@type": "Organization", name: SITE.name } }}
        />

        {/* ── Home link (unobtrusive, top-left) ───────────────────────────────── */}
        <Link
          to="/"
          style={{ position: 'absolute', top: '14px', left: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', zIndex: 30, transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
        >
          ← Home
        </Link>

        {/* ── Floating top pills (top-right) ──────────────────────────────────── */}
        <div style={{ position: 'absolute', top: '10px', right: '16px', display: 'flex', gap: '6px', zIndex: 30 }}>

          {/* Left pill: minimize / theme / refresh */}
          <div style={pillBase}>
            <button
              type="button"
              title={minimize ? 'Restore' : 'Minimize'}
              onClick={() => setMinimize(m => !m)}
              style={toolBtn}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
            >
              <Minimize2 className="w-3 h-3" />
            </button>
            <button
              type="button"
              title={darkMode ? 'Light mode' : 'Dark mode'}
              onClick={() => { setDarkMode(d => !d); setSettings(s => ({ ...s, darkMode: !s.darkMode })); }}
              style={toolBtn}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
            >
              {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>
            <button
              type="button"
              title="Clear messages"
              onClick={() => { clearChat(); clearFile(); setPasswordResult(null); setTextInput(''); }}
              style={toolBtn}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Right pill: export / save / menu */}
          <div style={{ ...pillBase, position: 'relative' }} ref={menuRef}>
            <button
              type="button"
              title="Export chat"
              onClick={handleDownload}
              style={toolBtn}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
            >
              <FileDown className="w-3 h-3" />
            </button>
            <button
              type="button"
              title="Save as PDF"
              onClick={handleSaveAsPdf}
              style={toolBtn}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
            >
              <Bookmark className="w-3 h-3" />
            </button>
            <button
              type="button"
              title="Menu"
              onClick={e => { e.stopPropagation(); setMenuOpen(m => !m); }}
              style={{ ...toolBtn, color: menuOpen ? '#fff' : '#c9c9cd' }}
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                background: 'rgba(20,20,22,0.96)', backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                padding: '6px', minWidth: '164px', zIndex: 50,
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
              }}>
                {([
                  {
                    label: 'Clear messages',
                    action: () => { clearChat(); clearFile(); setPasswordResult(null); setTextInput(''); setMenuOpen(false); },
                  },
                  {
                    label: 'Export chat',
                    action: () => { handleDownload(); setMenuOpen(false); },
                  },
                  {
                    label: 'About',
                    action: () => { toast('ScamShield AI — Auto-detect security scanner'); setMenuOpen(false); },
                  },
                ] as { label: string; action: () => void }[]).map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '8px', background: 'none', border: 'none', color: '#c9c9cd', fontSize: '13px', cursor: 'pointer', transition: 'background 0.12s, color 0.12s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#c9c9cd'; }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8 pt-14 relative z-10">

          {/* Chat history */}
          {messages.length > 0 && (
            <div className="w-full mb-4" style={{ maxWidth: 'min(640px, 92vw)' }}>
              <PremiumChatHistory messages={messages} status={chatStatus} />
            </div>
          )}

          {/* Compact access banner */}
          <div
            className="flex items-center justify-between gap-3 flex-wrap mb-3 px-4 py-2.5 rounded-2xl"
            style={{ width: 'min(640px, 92vw)', background: 'rgba(20,20,22,0.78)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center gap-2">
              {scanAccessType === "subscription"
                ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                : scanAccessType
                ? <Wallet className="w-3.5 h-3.5 text-orange-300 flex-shrink-0" />
                : user
                ? <ShieldAlert className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
                : <LogIn className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#c9c9cd' }} />}
              <span className="text-xs" style={{ color: '#c9c9cd' }}>{accessLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              {scanAccessType ? (
                <button
                  type="button"
                  onClick={handleRefreshAccess}
                  className="text-xs transition"
                  style={{ color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  Refresh
                </button>
              ) : (
                <>
                  {!user && (
                    <Button asChild size="sm" variant="heroPrimary" className="text-white h-6 px-3 text-[11px]">
                      <Link to={loginPath}>Log in</Link>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="heroOutline"
                    className="text-white hover:text-white h-6 px-3 text-[11px]"
                    onClick={handleStartSubscription}
                  >
                    Subscribe
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* ── Chatbox ─────────────────────────────────────────────────────────── */}
          <div style={{
            width: 'min(640px, 92vw)',
            background: '#1c1c1e',
            borderRadius: '22px',
            padding: '18px 20px 14px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
          }}>
            {/* Textarea — always visible */}
            <textarea
              ref={textareaRef}
              value={textInput}
              onChange={e => { setTextInput(e.target.value); setPasswordResult(null); }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && settings.sendOnEnter) {
                  e.preventDefault();
                  if (textInput.trim()) handleSend(textInput);
                }
              }}
              placeholder={
                autoDetectedMode === 'email'        ? 'Paste a suspicious email to analyze...' :
                autoDetectedMode === 'url'          ? 'Analyzing URL...' :
                autoDetectedMode === 'phone'        ? 'Checking phone number...' :
                autoDetectedMode === 'text-message' ? 'Analyzing message...' :
                autoDetectedMode === 'social'       ? 'Analyzing social profile...' :
                'Ask anything, paste suspicious content, or attach a file...'
              }
              rows={3}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                outline: 'none', color: '#fff', fontSize: '15px',
                padding: '6px 2px 16px', resize: 'none',
                fontFamily: 'inherit', lineHeight: 1.5,
              }}
              className="placeholder:text-[#8a8a8f]"
            />

            {/* Tool icon row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

              {/* Attach */}
              <label
                title="Attach file"
                style={{ ...toolBtn, cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#c9c9cd'; }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,audio/*,.pdf,.doc,.docx"
                  onChange={e => { const f = e.target.files?.[0]; if (f) prepareFile(f); }}
                />
                <Paperclip style={{ width: '16px', height: '16px' }} />
              </label>

              {/* Web search toggle */}
              <button
                type="button"
                title={webSearch ? 'Web search on' : 'Web search off'}
                style={{ ...toolBtn, color: webSearch ? '#4da3ff' : '#c9c9cd', background: webSearch ? 'rgba(77,163,255,0.15)' : 'transparent' }}
                onClick={() => { setWebSearch(w => !w); setSettings(s => ({ ...s, webSearch: !s.webSearch })); }}
              >
                <Globe style={{ width: '16px', height: '16px' }} />
              </button>

              <div style={sepStyle} />

              {/* Settings */}
              <button
                type="button"
                title="Settings"
                style={{ ...toolBtn, color: settingsOpen ? '#4da3ff' : '#c9c9cd', background: settingsOpen ? 'rgba(77,163,255,0.12)' : 'transparent' }}
                onClick={() => setSettingsOpen(s => !s)}
              >
                <Settings style={{ width: '16px', height: '16px' }} />
              </button>

              <div style={sepStyle} />

              {/* Project / folder */}
              <button
                type="button"
                title="Project"
                style={toolBtn}
                onClick={() => toast('No project selected.')}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#c9c9cd')}
              >
                <Folder style={{ width: '16px', height: '16px' }} />
              </button>

              <div style={{ flex: 1 }} />

              {/* File scan trigger */}
              {file && status === 'ready' && (
                <button
                  type="button"
                  onClick={handlePrimaryScanAction}
                  disabled={isProcessing || preparingAuthorizedScan}
                  style={{
                    padding: '6px 16px', borderRadius: '999px',
                    background: '#ff7a45', color: '#fff', border: 'none',
                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '5px',
                    boxShadow: '0 2px 8px rgba(255,122,69,0.4)',
                    transition: 'transform 0.15s',
                  }}
                  className="hover:scale-105 disabled:opacity-50"
                >
                  {preparingAuthorizedScan
                    ? <><Loader2 style={{ width: '13px', height: '13px' }} className="animate-spin" /> Preparing…</>
                    : <><Sparkles style={{ width: '13px', height: '13px' }} /> Scan</>}
                </button>
              )}

              {/* Password check (when input looks like a password) */}
              {looksLikePassword && !file && (
                <button
                  type="button"
                  title="Check password strength"
                  onClick={handlePasswordCheck}
                  disabled={checkingPassword}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#ff7a45', color: '#fff', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(255,122,69,0.4)',
                    transition: 'transform 0.15s',
                    opacity: checkingPassword ? 0.6 : 1,
                  }}
                  className="hover:scale-105"
                >
                  {checkingPassword
                    ? <Loader2 style={{ width: '16px', height: '16px' }} className="animate-spin" />
                    : <KeyRound style={{ width: '16px', height: '16px' }} />}
                </button>
              )}

              {/* Mic / Send */}
              {!looksLikePassword && (
                <button
                  ref={micBtnRef}
                  type="button"
                  onClick={() => {
                    if (textInput.trim()) handleSend(textInput);
                    else toggleRecording();
                  }}
                  title={textInput.trim() ? 'Send' : isRecording ? 'Stop recording' : 'Voice input'}
                  style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: isRecording ? '#ff3b30' : '#fff',
                    color: isRecording ? '#fff' : '#1c1c1e',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isRecording ? '0 0 0 0 rgba(255,59,48,0.4)' : '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'transform 0.15s, background 0.2s',
                  }}
                  className={`hover:scale-105${isRecording ? ' recording' : ''}`}
                >
                  {isRecording
                    ? <StopCircle style={{ width: '16px', height: '16px' }} />
                    : textInput.trim()
                    ? <Sparkles style={{ width: '16px', height: '16px' }} />
                    : <Mic style={{ width: '16px', height: '16px' }} />}
                </button>
              )}
            </div>
          </div>

          {/* File chip */}
          {file && (
            <div
              className="flex items-center gap-2 mt-2"
              style={{ background: 'rgba(28,28,30,0.85)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <Paperclip style={{ width: '12px', height: '12px', color: '#8a8a8f' }} />
              <span style={{ fontSize: '13px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
              <span style={{ fontSize: '12px', color: '#8a8a8f' }}>{cost.formatted}</span>
              {status === 'ready' && (
                <button
                  type="button"
                  onClick={handlePrimaryScanAction}
                  style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: '#ff7a45', border: 'none', color: '#fff', cursor: 'pointer' }}
                >
                  Scan
                </button>
              )}
              <button
                type="button"
                onClick={clearFile}
                style={{ background: 'none', border: 'none', color: '#8a8a8f', cursor: 'pointer', display: 'flex', padding: '2px' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a8a8f')}
              >
                <X style={{ width: '13px', height: '13px' }} />
              </button>
            </div>
          )}

          {/* Password result */}
          {passwordResult && (
            <div
              className="aia-slide-up mt-3"
              style={{ width: 'min(640px, 92vw)', background: 'rgba(28,28,30,0.9)', backdropFilter: 'blur(8px)', borderRadius: '16px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#8a8a8f', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Password Analysis</p>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#c9c9cd', marginBottom: '6px' }}>
                  <span>Strength</span>
                  <span style={{ fontWeight: 600 }}>
                    {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.min(passwordResult.score, 5)]}
                  </span>
                </div>
                <div style={{ height: '4px', borderRadius: '2px', background: '#3a3a3d' }}>
                  <div style={{
                    height: '100%', borderRadius: '2px',
                    width: `${(passwordResult.score / 6) * 100}%`,
                    background: passwordResult.score <= 1 ? '#ff3b30' : passwordResult.score <= 3 ? '#ff9500' : '#30d158',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>

              <div style={{
                fontSize: '12px', padding: '8px 12px', borderRadius: '8px', marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '8px',
                background: passwordResult.breaches === '0' ? 'rgba(48,209,88,0.12)' : passwordResult.breaches === 'unknown' ? 'rgba(255,149,0,0.12)' : 'rgba(255,59,48,0.12)',
                color: passwordResult.breaches === '0' ? '#30d158' : passwordResult.breaches === 'unknown' ? '#ff9500' : '#ff3b30',
              }}>
                {passwordResult.breaches === '0'
                  ? <ShieldCheck style={{ width: '14px', height: '14px' }} />
                  : <ShieldAlert style={{ width: '14px', height: '14px' }} />}
                {passwordResult.breaches === '0'
                  ? 'Not found in any known data breaches ✓'
                  : passwordResult.breaches === 'unknown'
                  ? 'Could not check breach database (offline?)'
                  : `Found in ${parseInt(passwordResult.breaches).toLocaleString()} known breach(es) — change this password immediately`}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {passwordResult.suggestions.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#c9c9cd' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ff7a45', flexShrink: 0 }} />
                    {s}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setPasswordResult(null)}
                style={{ marginTop: '12px', fontSize: '11px', color: '#8a8a8f', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a8a8f')}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Hint bar */}
          <div className="flex items-center gap-1.5 mt-3">
            <ShieldAlert style={{ width: '11px', height: '11px', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
              Files auto-deleted in 10 min · Chat not saved · ${cost.perUploadCharge.toFixed(2)}/upload · <kbd style={{ fontFamily: 'inherit' }}>Ctrl+K</kbd> to focus
            </p>
          </div>
        </main>
      </div>

      {/* ── Settings modal ───────────────────────────────────────────────────── */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent style={{ background: '#1c1c1e', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', maxWidth: '380px', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', padding: '24px' }}>
          <DialogHeader>
            <DialogTitle style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>Settings</DialogTitle>
            <DialogDescription style={{ color: '#8a8a8f', fontSize: '13px' }}>Configure your AI scanner preferences</DialogDescription>
          </DialogHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 0' }}>
            {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, val]) => {
              const labels: Record<keyof typeof settings, string> = {
                darkMode:    'Dark mode',
                sendOnEnter: 'Send on Enter',
                webSearch:   'Web search enabled',
              };
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSettings(s => ({ ...s, [key]: !s[key] }));
                    if (key === 'darkMode') setDarkMode(d => !d);
                    if (key === 'webSearch') setWebSearch(w => !w);
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#e5e5e7', fontSize: '14px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                >
                  <span>{labels[key]}</span>
                  {val
                    ? <CheckSquare style={{ width: '18px', height: '18px', color: '#ff7a45', flexShrink: 0 }} />
                    : <Square style={{ width: '18px', height: '18px', color: '#5a5a5e', flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
          <DialogFooter>
            <Button
              onClick={() => setSettingsOpen(false)}
              style={{ width: '100%', background: '#fff', color: '#1c1c1e', fontWeight: 600, borderRadius: '10px' }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Paywall dialog ───────────────────────────────────────────────────── */}
      <Dialog open={paywallOpen} onOpenChange={setPaywallOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,244,0.98))] p-0 shadow-[0_28px_80px_rgba(15,23,42,0.24)] sm:max-w-md">
          <div className="border-b border-border/60 bg-[radial-gradient(circle_at_top,rgba(217,108,74,0.12),transparent_62%)] px-5 py-5">
            <DialogHeader className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d96c4a]/15 bg-[#d96c4a]/10 text-[#b75539]">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground">Access AI Scanner</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">Choose how you'd like to start scanning.</DialogDescription>
              </div>
            </DialogHeader>
          </div>
          <div className="space-y-3 px-4 py-5">
            {user ? (
              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Refresh access</p>
                    <p className="text-xs text-muted-foreground">Already subscribed? Re-verify your account.</p>
                  </div>
                </div>
                <Button variant="heroPrimary" className="w-full text-white h-10"
                  onClick={() => { void handleRefreshAccess(); setPaywallOpen(false); }}>
                  Refresh & Unlock
                </Button>
              </div>
            ) : (
              <div className="rounded-2xl border p-4">
                <p className="text-sm font-medium mb-1">Existing subscriber</p>
                <p className="text-xs text-muted-foreground mb-3">Log in to verify your ScamShield subscription.</p>
                <Button asChild variant="heroPrimary" className="w-full text-white h-10">
                  <Link to={loginPath} onClick={() => setPaywallOpen(false)}>Log in to scan</Link>
                </Button>
              </div>
            )}
            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">ScamShield subscription</p>
                  <p className="text-xs text-muted-foreground">Unlimited scans + family protection.</p>
                </div>
              </div>
              <Button variant="heroPrimary" className="w-full text-white h-10" onClick={handleStartSubscription}>
                Start Subscription
              </Button>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#d96c4a]/10 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-[#b75539]" />
                </div>
                <div>
                  <p className="text-sm font-medium">One-time scan</p>
                  <p className="text-xs text-muted-foreground">${cost.perUploadCharge.toFixed(2)} per file or image.</p>
                </div>
              </div>
              <Button variant="heroPrimary" className="w-full text-white h-10" onClick={handlePayPerScan}>
                Pay ${cost.perUploadCharge.toFixed(2)} per scan
              </Button>
            </div>
          </div>
          <DialogFooter className="border-t px-5 py-3">
            <p className="text-center text-xs text-muted-foreground w-full">Secure payments via Stripe · Cancel anytime</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Payment dialog ───────────────────────────────────────────────────── */}
      <PaymentDialog
        open={paymentOpen}
        onOpenChange={open => {
          setPaymentOpen(open);
          if (!open && status === "paying" && !isProcessing) setStatus(file ? "ready" : "idle");
        }}
        file={file}
        amount={cost.cost}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </PageTransition>
  );
}
