import { useState, useEffect, forwardRef } from "react";
import { X, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "invision-cookie-consent";
const COOKIE_PREFERENCES_KEY = "invision-cookie-preferences";
const PAGE_VISIT_COUNT_KEY = "invision-page-visit-count";
const VISIT_THRESHOLD = 1;

export const CookieConsent = forwardRef<HTMLDivElement>(
  function CookieConsent(_props, _ref) {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
      essential: true,
      analytics: false,
      marketing: false,
    });

    useEffect(() => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        const visitCount =
          parseInt(localStorage.getItem(PAGE_VISIT_COUNT_KEY) || "0", 10) + 1;
        localStorage.setItem(PAGE_VISIT_COUNT_KEY, visitCount.toString());
        if (visitCount >= VISIT_THRESHOLD) {
          const timer = setTimeout(() => setShowBanner(true), 3500);
          return () => clearTimeout(timer);
        }
      } else {
        const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
        if (saved) {
          const prefs = JSON.parse(saved);
          setPreferences(prefs);
          applyPreferences(prefs);
        }
      }
    }, []);

    const acceptAll = () => {
      savePreferences({ essential: true, analytics: true, marketing: true });
      setShowBanner(false);
    };

    const acceptEssential = () => {
      savePreferences({ essential: true, analytics: false, marketing: false });
      setShowBanner(false);
    };

    const savePreferences = (prefs: CookiePreferences) => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "true");
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
      setPreferences(prefs);
      applyPreferences(prefs);
      window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    const applyPreferences = (prefs: CookiePreferences) => {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: prefs.analytics ? "granted" : "denied",
          ad_storage: prefs.marketing ? "granted" : "denied",
          ad_user_data: prefs.marketing ? "granted" : "denied",
          ad_personalization: prefs.marketing ? "granted" : "denied",
        });
      }
    };

    const handleSaveSettings = () => {
      savePreferences(preferences);
      setShowSettings(false);
      setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
      <>
        {/* ── Premium cookie consent card ─────────────────────────── */}
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-[420px] sm:max-w-[420px]"
          style={{
            animation: "cookie-slide-up 300ms ease-out both",
            animationDelay: "100ms",
          }}
        >
          {/* Animated border wrapper */}
          <div className="cookie-glow-border relative isolate rounded-[14px]">
            {/* Card content */}
            <div
              className="relative rounded-[14px] p-5"
              style={{
                background: "rgba(18, 14, 12, 0.92)",
                backdropFilter: "blur(20px) saturate(1.3)",
                WebkitBackdropFilter: "blur(20px) saturate(1.3)",
              }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={acceptEssential}
                className="absolute right-3 top-3 w-7 h-7 flex items-center justify-center rounded-full text-[hsl(30_15%_72%)] hover:text-white transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <Shield
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "hsl(30, 15%, 72%)" }}
                  strokeWidth={2}
                />
                <h3 className="text-[14px] font-semibold text-white">
                  Cookie Preferences
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-[12px] leading-[1.5] mb-4 pr-6"
                style={{ color: "hsl(30, 15%, 85%)" }}
              >
                We use cookies to improve your experience and analyze site
                traffic. Essential cookies are always active.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="h-[32px] px-4 text-[12px] font-semibold text-white rounded-lg transition-all duration-200 hover:-translate-y-[1px]"
                  style={{
                    background: "linear-gradient(135deg, #ea580c, #c2410c)",
                  }}
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={acceptEssential}
                  className="h-[32px] px-4 text-[12px] font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: "hsl(30, 15%, 85%)",
                    border: "1px solid hsl(30 15% 72% / 0.25)",
                    background: "transparent",
                  }}
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="h-[32px] w-[32px] flex items-center justify-center rounded-lg transition-all duration-200 ml-auto"
                  style={{
                    color: "hsl(30, 15%, 72%)",
                    border: "1px solid hsl(30 15% 72% / 0.15)",
                    background: "transparent",
                  }}
                  aria-label="Cookie settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Settings dialog (uses redesigned glass dialog) ─────── */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cookie Preferences</DialogTitle>
              <DialogDescription>
                Essential cookies are required for the site to function.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <Label htmlFor="essential" className="text-[12px] font-semibold text-white">
                    Essential
                  </Label>
                  <p className="text-[11px]" style={{ color: "hsl(30, 15%, 72%)" }}>
                    Required. Cannot be disabled.
                  </p>
                </div>
                <Switch id="essential" checked disabled />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <Label htmlFor="analytics" className="text-[12px] font-semibold text-white">
                    Analytics
                  </Label>
                  <p className="text-[11px]" style={{ color: "hsl(30, 15%, 72%)" }}>
                    Helps us understand site usage.
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <Label htmlFor="marketing" className="text-[12px] font-semibold text-white">
                    Marketing
                  </Label>
                  <p className="text-[11px]" style={{ color: "hsl(30, 15%, 72%)" }}>
                    Personalized advertisements.
                  </p>
                </div>
                <Switch
                  id="marketing"
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSaveSettings} size="sm">
                Save Preferences
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Inline styles for animations ───────────────────────── */}
        <style>{`
          @keyframes cookie-slide-up {
            from { transform: translateX(-50%) translateY(16px); opacity: 0; }
            to   { transform: translateX(-50%) translateY(0); opacity: 1; }
          }

          .cookie-glow-border::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 15px;
            background: conic-gradient(
              from 0deg,
              transparent 0%,
              transparent 25%,
              rgba(249, 115, 22, 0.35) 30%,
              rgba(255, 255, 255, 0.12) 35%,
              transparent 40%,
              transparent 100%
            );
            animation: cookie-border-rotate 4s linear infinite;
            z-index: -1;
          }

          .cookie-glow-border::after {
            content: '';
            position: absolute;
            inset: 1px;
            border-radius: 13px;
            background: rgba(18, 14, 12, 0.92);
            z-index: -1;
          }

          @keyframes cookie-border-rotate {
            to { transform: rotate(360deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .cookie-glow-border::before {
              animation: none;
              background: hsl(30 15% 85% / 0.12);
            }
          }
        `}</style>
      </>
    );
  },
);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
