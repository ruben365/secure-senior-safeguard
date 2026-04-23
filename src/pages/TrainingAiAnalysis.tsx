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
  BadgeCheck, CreditCard, Download, FileText, Home, Info, Minimize2,
  Moon, ShieldCheck, Sparkles, Sun, X, Lock,
  ShieldAlert, Loader2, Mic, KeyRound, Globe, StopCircle,
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
  const [aboutOpen, setAboutOpen]               = useState(false);
  const [isCompact, setIsCompact]               = useState(false);
  const [showFirstVisit, setShowFirstVisit]     = useState(false);
  const [darkMode, setDarkMode]                 = useState(false);
  const [webSearch, setWebSearch]               = useState(false);
  const [thinkMode, setThinkMode]               = useState<'Normal' | 'DeepScan'>('Normal');
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

  const chatUnlocked = scanAccessType !== null;
  const loginPath    = `/auth?redirect=${encodeURIComponent("/training/ai-analysis")}`;

  const featuredPlan = useMemo(() => SCAMSHIELD_PLANS.find(p => p.popular) ?? SCAMSHIELD_PLANS[0], []);

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

  // Show password check UI only for plausible passwords — not URLs, emails,
  // phone numbers, handles, or bare domain/path strings.
  const looksLikePassword = useMemo(() => {
    const t = textInput.trim();
    if (!t || t.length > 50 || /\s/.test(t)) return false;
    if (/^https?:\/\//i.test(t)) return false;
    if (/^[+\d\s\-()]{7,15}$/.test(t)) return false;
    if (/^@/.test(t)) return false;
    // Email addresses contain @ and would otherwise pass the domain-path guard below.
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return false;
    // Bare domain or host/path strings (no @).
    if (/^[a-z0-9][a-z0-9.\-]*\.[a-z]{2,}(\/[^\s]*)?$/i.test(t)) return false;
    return true;
  }, [textInput]);

  // — Keyboard shortcuts —
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        textareaRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setAboutOpen(false);
        if (isRecording) stopRecording();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRecording]); // eslint-disable-line react-hooks/exhaustive-deps

  // (About dialog is handled by Dialog component's own close logic)

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

  // — First-visit notification —
  useEffect(() => {
    if (!localStorage.getItem('ai-scanner-visited')) {
      setShowFirstVisit(true);
      const timer = setTimeout(() => {
        setShowFirstVisit(false);
        localStorage.setItem('ai-scanner-visited', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissFirstVisit = () => {
    setShowFirstVisit(false);
    localStorage.setItem('ai-scanner-visited', 'true');
  };

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
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
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
    background:         'rgba(10,10,12,0.9)',
    backdropFilter:     'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRadius:       '999px',
    border:             '1px solid rgba(255,255,255,0.08)',
    boxShadow:          '0 2px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    color:              '#a0a0a8',
    display:            'flex',
    alignItems:         'center',
    gap:                '1px',
    padding:            '5px 10px',
  };

  const toolBtn: React.CSSProperties = {
    background:     'transparent',
    border:         'none',
    color:          '#7e7e88',
    padding:        '5px 6px',
    borderRadius:   '999px',
    cursor:         'pointer',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    transition:     'color 0.22s ease, background 0.22s ease, transform 0.22s ease',
  };

  const toolBtnHover = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#e5e5ea';
    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
    e.currentTarget.style.transform = 'scale(1.02)';
  };
  const toolBtnLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.color = '#7e7e88';
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.transform = 'scale(1)';
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
        }}
      >
        <SEO
          title="AI Security Scanner — Auto-Detect Scan"
          description="Paste suspicious emails, links, phone numbers, or attach files. AI auto-detects and analyzes threats instantly."
          keywords="AI scanner, phishing detector, deepfake checker, scam detection"
          structuredData={{ "@context": "https://schema.org", "@type": "WebPage", name: "AI Security Scanner", url: "https://www.invisionnetwork.org/training/ai-analysis", publisher: { "@type": "Organization", name: SITE.name } }}
        />

        {/* ── Left pill: Home / Minimize / Theme / Clear / Login / Subscribe ─── */}
        <div style={{ position: 'absolute', top: '10px', left: '16px', zIndex: 30 }}>
          <div style={pillBase}>
            {/* Home */}
            <Link
              to="/"
              title="Home"
              style={{ ...toolBtn, textDecoration: 'none' }}
              onMouseEnter={toolBtnHover}
              onMouseLeave={toolBtnLeave}
            >
              <Home className="w-3 h-3" />
            </Link>

            {/* Minimize */}
            <button
              type="button"
              title={isCompact ? 'Restore' : 'Minimize'}
              onClick={() => setIsCompact(c => !c)}
              style={toolBtn}
              onMouseEnter={toolBtnHover}
              onMouseLeave={toolBtnLeave}
            >
              <Minimize2 className="w-3 h-3" />
            </button>

            {/* Theme */}
            <button
              type="button"
              title={darkMode ? 'Light mode' : 'Dark mode'}
              onClick={() => { setDarkMode(d => !d); setSettings(s => ({ ...s, darkMode: !s.darkMode })); }}
              style={toolBtn}
              onMouseEnter={toolBtnHover}
              onMouseLeave={toolBtnLeave}
            >
              {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </button>

            {/* Clear */}
            <button
              type="button"
              title="Clear messages"
              onClick={() => { clearChat(); clearFile(); setPasswordResult(null); setTextInput(''); }}
              style={toolBtn}
              onMouseEnter={toolBtnHover}
              onMouseLeave={toolBtnLeave}
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            {/* Export chat — only when there are messages */}
            {messages.length > 0 && (
              <>
                <button
                  type="button"
                  title="Download chat as text"
                  onClick={handleDownload}
                  style={toolBtn}
                  onMouseEnter={toolBtnHover}
                  onMouseLeave={toolBtnLeave}
                >
                  <Download className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  title="Save chat as PDF"
                  onClick={handleSaveAsPdf}
                  style={toolBtn}
                  onMouseEnter={toolBtnHover}
                  onMouseLeave={toolBtnLeave}
                >
                  <FileText className="w-3 h-3" />
                </button>
              </>
            )}

            {/* Divider */}
            <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.08)', margin: '0 4px', flexShrink: 0 }} />

            {/* Login — glass pill */}
            {!user && (
              <Link
                to={loginPath}
                style={{
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  padding: '4px 11px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.75)',
                  transition: 'color 0.22s ease, background 0.22s ease, border-color 0.22s ease, transform 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.11)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Login
              </Link>
            )}

            {/* Subscribe — gold accent pill */}
            {!scanAccessType && (
              <button
                type="button"
                onClick={handleStartSubscription}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f5c543 0%, #e0a312 100%)',
                  color: '#1a1200',
                  cursor: 'pointer',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.22) inset, 0 3px 10px rgba(245,197,67,0.28)',
                  transition: 'background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f7cf5e 0%, #ebb82a 100%)';
                  e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.28) inset, 0 5px 16px rgba(245,197,67,0.42)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f5c543 0%, #e0a312 100%)';
                  e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.22) inset, 0 3px 10px rgba(245,197,67,0.28)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Subscribe
              </button>
            )}
          </div>
        </div>

        {/* ── Right pill: About ────────────────────────────────────────────────── */}
        <div style={{ position: 'absolute', top: '10px', right: '16px', zIndex: 30 }}>
          <div style={pillBase}>
            <button
              type="button"
              title="About this scanner"
              onClick={() => setAboutOpen(true)}
              style={{ ...toolBtn, color: aboutOpen ? '#e5e5ea' : '#7e7e88', background: aboutOpen ? 'rgba(255,255,255,0.07)' : 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#e5e5ea'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = aboutOpen ? '#e5e5ea' : '#7e7e88'; e.currentTarget.style.background = aboutOpen ? 'rgba(255,255,255,0.07)' : 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Scalable content wrapper (background + pills excluded) ──────────── */}
        <div
          className="flex-1 flex flex-col"
          style={{
            transform: isCompact ? 'scale(0.85)' : 'scale(1)',
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease',
          }}
        >

        {/* ── Main content ─────────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16 pt-14 relative z-10">

          {/* Chat history */}
          {messages.length > 0 && (
            <div className="w-full mb-4" style={{ maxWidth: 'min(640px, 92vw)' }}>
              <PremiumChatHistory messages={messages} status={chatStatus} />
            </div>
          )}

          {/* ── Chatbox ─────────────────────────────────────────────────────────── */}
          <div className="aia-chatbox-wrapper" style={{ width: 'min(640px, 92vw)' }}>
          <div className="aia-chatbox-inner" style={{ padding: '16px 20px 13px' }}>

            {/* Mode selector pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
              {(['Normal', 'DeepScan'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  className="aia-mode-pill"
                  onClick={() => setThinkMode(m)}
                  style={{
                    background: thinkMode === m
                      ? m === 'DeepScan'
                        ? 'linear-gradient(135deg,#f5c543 0%,#e0a312 100%)'
                        : 'rgba(99,102,241,0.85)'
                      : 'rgba(255,255,255,0.07)',
                    color: thinkMode === m
                      ? m === 'DeepScan' ? '#1a1200' : '#fff'
                      : 'rgba(255,255,255,0.55)',
                    boxShadow: thinkMode === m
                      ? m === 'DeepScan'
                        ? '0 2px 10px rgba(245,197,67,0.35)'
                        : '0 2px 10px rgba(99,102,241,0.35)'
                      : 'none',
                  }}
                >
                  {m === 'DeepScan' ? '⚡ DeepScan' : '◎ Normal'}
                </button>
              ))}
              {autoDetectedMode && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '10px',
                  fontWeight: 600,
                  background: 'rgba(77,163,255,0.12)',
                  color: '#6da8ff',
                  border: '1px solid rgba(77,163,255,0.2)',
                  lineHeight: 1.6,
                }}>
                  {autoDetectedMode === 'email' ? '✉ Email' :
                   autoDetectedMode === 'url' ? '🔗 URL' :
                   autoDetectedMode === 'phone' ? '📞 Phone' :
                   autoDetectedMode === 'text-message' ? '💬 SMS' :
                   autoDetectedMode === 'social' ? '👤 Social' : null}
                </span>
              )}
            </div>

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
                padding: '6px 2px 14px', resize: 'none',
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
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e5e5ea'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#7e7e88'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
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
                onMouseEnter={toolBtnHover}
                onMouseLeave={toolBtnLeave}
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
                    background: isRecording
                      ? '#ff3b30'
                      : textInput.trim()
                      ? 'linear-gradient(135deg,#f5c543 0%,#e0a312 100%)'
                      : 'rgba(255,255,255,0.12)',
                    color: isRecording ? '#fff' : textInput.trim() ? '#1a1200' : 'rgba(255,255,255,0.8)',
                    border: textInput.trim() || isRecording ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isRecording
                      ? '0 0 0 0 rgba(255,59,48,0.4)'
                      : textInput.trim()
                      ? '0 3px 12px rgba(245,197,67,0.45)'
                      : '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'transform 0.15s, background 0.2s, box-shadow 0.2s',
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

        </main>
        </div>{/* end scalable wrapper */}

        {/* ── Bottom info bar — fixed at very bottom ───────────────────────────── */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '8px 16px', zIndex: 20, pointerEvents: 'none',
        }}>
          <ShieldAlert style={{ width: '10px', height: '10px', color: 'rgba(255,255,255,0.28)', flexShrink: 0 }} />
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1, letterSpacing: '0.01em' }}>
            Files auto-deleted in 10 min · Chat not saved · ${cost.perUploadCharge.toFixed(2)}/scan or subscribe from $9.99/mo · <kbd style={{ fontFamily: 'inherit', fontSize: '10px' }}>Ctrl+K</kbd> to focus
          </p>
        </div>
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

      {/* ── About modal ─────────────────────────────────────────────────────── */}
      {(() => {
        const mTheme = darkMode ? {
          bg:        '#1c1c1e',
          border:    'rgba(255,255,255,0.1)',
          shadow:    '0 32px 64px rgba(0,0,0,0.7)',
          divider:   'rgba(255,255,255,0.08)',
          title:     '#fff',
          desc:      '#8a8a8f',
          label:     'rgba(255,255,255,0.35)',
          body:      '#c9c9cd',
          muted:     '#8a8a8f',
          accent:    '#ff7a45',
          accentBg:  'rgba(255,122,69,0.2)',
          link:      '#4da3ff',
          kbdBg:     'rgba(255,255,255,0.1)',
          kbdBorder: 'rgba(255,255,255,0.15)',
          kbdText:   '#e5e5e7',
        } : {
          bg:        '#ffffff',
          border:    'rgba(0,0,0,0.1)',
          shadow:    '0 32px 64px rgba(0,0,0,0.18)',
          divider:   'rgba(0,0,0,0.07)',
          title:     '#111',
          desc:      '#6b7280',
          label:     'rgba(0,0,0,0.35)',
          body:      '#374151',
          muted:     '#6b7280',
          accent:    '#e05a20',
          accentBg:  'rgba(224,90,32,0.12)',
          link:      '#2563eb',
          kbdBg:     'rgba(0,0,0,0.06)',
          kbdBorder: 'rgba(0,0,0,0.15)',
          kbdText:   '#374151',
        };
        return (
          <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
            <DialogContent className="aia-about-modal" style={{ background: mTheme.bg, borderRadius: '18px', border: `1px solid ${mTheme.border}`, color: mTheme.title, maxWidth: '480px', maxHeight: '85svh', overflowY: 'auto', boxShadow: mTheme.shadow, padding: '0' }}>
              {/* Header */}
              <div style={{ padding: '22px 24px 16px', borderBottom: `1px solid ${mTheme.divider}` }}>
                <DialogTitle style={{ color: mTheme.title, fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>InVision AI Security Scanner</DialogTitle>
                <DialogDescription style={{ color: mTheme.desc, fontSize: '12px' }}>Powered by Claude AI (Anthropic)</DialogDescription>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* How it works */}
                <section>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>How it works</p>
                  {[
                    'Paste any text, email, URL, phone number, or message into the input bar',
                    'Upload files (images, documents, audio) using the attach button',
                    'Our AI automatically detects the content type and runs the right scan',
                    'Results appear above the input bar in real-time',
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '7px' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: mTheme.accentBg, color: mTheme.accent, fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                      <p style={{ fontSize: '13px', color: mTheme.body, lineHeight: 1.5 }}>{s}</p>
                    </div>
                  ))}
                </section>

                {/* What we scan */}
                <section>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>What we scan</p>
                  {[
                    ['Emails', 'Phishing detection, fake sender analysis, malicious link detection'],
                    ['URLs', 'Safe browsing check, redirect chain analysis, SSL verification'],
                    ['Phone numbers', 'Scam number lookup, known fraud database check'],
                    ['Images', 'AI-generated/deepfake detection, manipulation analysis'],
                    ['Voice / Audio', 'Voice clone detection, authenticity verification'],
                    ['Text messages', 'SMS/WhatsApp scam pattern detection'],
                    ['Documents', 'Malicious macro detection, hidden link analysis'],
                    ['QR Codes', 'Decode and verify destination before scanning'],
                    ['Social profiles', 'Fake account detection, catfish identification'],
                    ['Passwords', 'Strength analysis, breach exposure check'],
                  ].map(([label, desc]) => (
                    <div key={label} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '12px', color: mTheme.accent, fontWeight: 600, minWidth: '110px', flexShrink: 0 }}>{label}</span>
                      <span style={{ fontSize: '12px', color: mTheme.muted, lineHeight: 1.45 }}>{desc}</span>
                    </div>
                  ))}
                </section>

                {/* Pricing */}
                <section>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Pricing</p>
                  {[
                    ['Basic — $9.99/mo', '25 scans/mo · email reports · 24/7 AI chat'],
                    ['Pro — $19.99/mo', '100 scans/mo · priority queue · phone support · 10% off courses'],
                    ['Enterprise — $29.99/mo', 'Unlimited scans · deepScan · dedicated manager · family coverage'],
                    ['Pay-per-scan', '$1.00 per file upload · no extras, no reports'],
                    ['Text / URL / Phone', 'Included free for logged-in users'],
                  ].map(([label, desc]) => (
                    <div key={label} style={{ display: 'flex', gap: '10px', marginBottom: '7px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '12px', color: mTheme.body, fontWeight: 600, minWidth: '130px', flexShrink: 0 }}>{label}</span>
                      <span style={{ fontSize: '12px', color: mTheme.muted }}>{desc}</span>
                    </div>
                  ))}
                </section>

                {/* Privacy */}
                <section>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Privacy & Security</p>
                  {[
                    'All uploaded files are auto-deleted after 10 minutes',
                    'Chat history is not saved between sessions',
                    'Analysis runs through encrypted channels',
                    'Your data is never shared or stored permanently',
                    'Powered by Claude AI (Anthropic)',
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#30d158', flexShrink: 0, marginTop: '2px', fontSize: '11px' }}>✓</span>
                      <p style={{ fontSize: '12px', color: mTheme.body, lineHeight: 1.45 }}>{s}</p>
                    </div>
                  ))}
                </section>

                {/* Keyboard shortcuts */}
                <section>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Keyboard Shortcuts</p>
                  {[
                    ['Ctrl+K', 'Focus the input bar'],
                    ['Enter', 'Send / analyze'],
                    ['Escape', 'Close menus'],
                  ].map(([key, desc]) => (
                    <div key={key} style={{ display: 'flex', gap: '10px', marginBottom: '6px', alignItems: 'center' }}>
                      <kbd style={{ fontSize: '11px', background: mTheme.kbdBg, border: `1px solid ${mTheme.kbdBorder}`, borderRadius: '5px', padding: '2px 7px', color: mTheme.kbdText, fontFamily: 'inherit', flexShrink: 0 }}>{key}</kbd>
                      <span style={{ fontSize: '12px', color: mTheme.muted }}>{desc}</span>
                    </div>
                  ))}
                </section>

                {/* Need help */}
                <section style={{ paddingTop: '4px', borderTop: `1px solid ${mTheme.divider}` }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: mTheme.label, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Need Help?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <a href={`tel:${SITE.phone.e164}`} style={{ fontSize: '13px', color: mTheme.accent, textDecoration: 'none' }}>📞 {SITE.phone.display}</a>
                    <a href={`https://${SITE.name.toLowerCase().replace(/\s+/g, '')}.org`} style={{ fontSize: '13px', color: mTheme.link, textDecoration: 'none' }}>🌐 invisionnetwork.org</a>
                    <a href={`mailto:${SITE.emails.support}`} style={{ fontSize: '13px', color: mTheme.body, textDecoration: 'none' }}>✉️ {SITE.emails.support}</a>
                  </div>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        );
      })()}

      {/* ── First-visit notification bubble ──────────────────────────────────── */}
      {showFirstVisit && (
        <div style={{
          position: 'fixed', bottom: '32px', right: '16px', zIndex: 60,
          background: 'rgba(28,28,30,0.92)', backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)',
          padding: '12px 14px 12px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          maxWidth: '300px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'slideUp 0.3s ease',
        }}>
          <p style={{ fontSize: '12px', color: '#c9c9cd', lineHeight: 1.45, flex: 1 }}>
            New here? Tap <strong style={{ color: '#fff' }}>About</strong> (top right) to learn how this scanner works.
          </p>
          <button
            type="button"
            onClick={dismissFirstVisit}
            style={{ background: 'none', border: 'none', color: '#8a8a8f', cursor: 'pointer', padding: '2px', flexShrink: 0, display: 'flex' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8a8a8f')}
            title="Dismiss"
          >
            <X style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      )}

      {/* ── Paywall dialog ───────────────────────────────────────────────────── */}
      <Dialog open={paywallOpen} onOpenChange={setPaywallOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto border border-[#e5e5e5] bg-white text-[#1a1a1c] backdrop-blur-none p-0 shadow-[0_28px_80px_rgba(15,23,42,0.12)] rounded-[20px] sm:max-w-lg">
          {/* Header */}
          <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid #f0f0f0', background: 'radial-gradient(circle at top left, rgba(217,108,74,0.07), transparent 60%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(217,108,74,0.1)', border: '1px solid rgba(217,108,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Lock style={{ width: '18px', height: '18px', color: '#b75539' }} />
              </div>
              <div>
                <DialogTitle style={{ color: '#1a1a1c', fontSize: '18px', fontWeight: 700, lineHeight: 1.2 }}>Unlock AI Scanner</DialogTitle>
                <DialogDescription style={{ color: '#6b6b70', fontSize: '13px', marginTop: '2px' }}>Choose a plan to start scanning</DialogDescription>
              </div>
            </div>
          </div>

          {/* Value prop vs pay-per-scan */}
          <div style={{ padding: '0 16px 12px', background: 'rgba(217,108,74,0.04)', borderBottom: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#d96c4a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Why subscribe?</p>
            <p style={{ fontSize: '12px', color: '#3a3a3c', lineHeight: 1.5, margin: 0 }}>
              A single Basic plan gives you <strong>25 scans</strong> — worth <strong>$25</strong> at pay-per-scan rates — for just <strong>$9.99/mo</strong>. Pro subscribers get 100 scans ($100 value) for $19.99. Enterprise gets <em>unlimited</em> scans plus a dedicated account manager for $29.99.
            </p>
          </div>

          {/* Plan cards — all 3 tiers */}
          <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {SCAMSHIELD_PLANS.map((plan) => {
              const isPopular = plan.popular;
              return (
                <div
                  key={plan.id}
                  style={{
                    border: isPopular ? '2px solid #d96c4a' : '1px solid #e5e5e5',
                    borderRadius: '14px',
                    padding: '14px 12px',
                    position: 'relative',
                    background: isPopular ? 'rgba(217,108,74,0.03)' : '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {isPopular && (
                    <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: '#d96c4a', color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', padding: '2px 8px', borderRadius: '999px', whiteSpace: 'nowrap' }}>
                      BEST VALUE
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a1c', marginBottom: '2px' }}>{plan.name.replace('ScamShield ', '')}</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a1c', lineHeight: 1 }}>
                      ${plan.price}<span style={{ fontSize: '11px', fontWeight: 500, color: '#6b6b70' }}>/mo</span>
                    </p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '11px', color: '#3a3a3c' }}>
                        <span style={{ color: '#d96c4a', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => { setPaywallOpen(false); openCheckout(plan.id, "subscription"); }}
                    style={{ width: '100%', padding: '8px', borderRadius: '9px', background: isPopular ? '#d96c4a' : '#1a1a1c', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    ${plan.price}/mo
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pay-per-scan + login */}
          <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Pay per scan */}
            <div style={{ border: '1px solid #e5e5e5', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1c', marginBottom: '1px' }}>One-Time Scan</p>
                <p style={{ fontSize: '12px', color: '#6b6b70' }}>${cost.perUploadCharge.toFixed(2)} per file upload · no subscription</p>
              </div>
              <button
                type="button"
                onClick={handlePayPerScan}
                style={{ flexShrink: 0, padding: '8px 14px', borderRadius: '8px', background: '#d96c4a', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Pay ${cost.perUploadCharge.toFixed(2)}
              </button>
            </div>

            {/* Login / refresh */}
            {user ? (
              <button
                type="button"
                onClick={() => { void handleRefreshAccess(); setPaywallOpen(false); }}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'transparent', border: '1px solid #e5e5e5', color: '#3a3a3c', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#aaa')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e5e5')}
              >
                <BadgeCheck style={{ width: '14px', height: '14px', color: '#30a46c' }} />
                Already subscribed? Refresh access
              </button>
            ) : (
              <Link
                to={loginPath}
                onClick={() => setPaywallOpen(false)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'transparent', border: '1px solid #e5e5e5', color: '#3a3a3c', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#aaa')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e5e5')}
              >
                Already a subscriber? Log in
              </Link>
            )}
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #f0f0f0', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Lock style={{ width: '11px', height: '11px', color: '#aeaeb2' }} />
            <p style={{ fontSize: '11px', color: '#aeaeb2', textAlign: 'center' }}>Secure payments via Stripe · Cancel anytime · 30-day guarantee</p>
          </div>
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
