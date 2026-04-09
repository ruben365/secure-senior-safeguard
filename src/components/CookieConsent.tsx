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
        {/* ── Glassmorphism cookie consent card ─────────────────── */}
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-[420px] sm:max-w-[420px]"
          style={{
            animation: "cookie-slide-up 300ms ease-out both",
            animationDelay: "100ms",
          }}
        >
          {/* Glassmorphism card */}
          <div
            className="relative rounded-2xl p-5 border border-white/[0.15] overflow-hidden"
            style={{
              background: "rgba(15, 15, 20, 0.55)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              backdropFilter: "blur(24px) saturate(140%)",
            }}
          >
            {/* Top shine edge */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.25) 50%, transparent 90%)",
              }}
            />

            {/* Subtle inner glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at 30% 0%, rgba(249, 115, 22, 0.06) 0%, transparent 60%)",
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={acceptEssential}
              className="absolute right-3 top-3 w-7 h-7 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cookie banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Header */}
            <div className="relative flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(249, 115, 22, 0.12)",
                  border: "1px solid rgba(249, 115, 22, 0.2)",
                }}
              >
                <Shield
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "var(--hero-cta-hover-from, #ea580c)" }}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-[14px] font-semibold text-white">
                Cookie Preferences
              </h3>
            </div>

            {/* Description */}
            <p className="relative text-[12px] leading-[1.6] mb-4 pr-6 text-white/60">
              We use cookies to improve your experience and analyze site
              traffic. Essential cookies are always active.
            </p>

            {/* Buttons — using shared brand tokens */}
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="h-[32px] px-4 text-[12px] font-semibold text-white rounded-lg transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "linear-gradient(135deg, var(--hero-cta-from, #c2410c), var(--hero-cta-to, #9a3412))",
                  border: "1px solid var(--hero-cta-border, #7c2d12)",
                }}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={acceptEssential}
                className="h-[32px] px-4 text-[12px] font-medium text-white/70 rounded-lg transition-all duration-200 hover:text-white hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.06)",
                }}
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="h-[32px] w-[32px] flex items-center justify-center rounded-lg transition-all duration-200 ml-auto text-white/50 hover:text-white hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.04)",
                }}
                aria-label="Cookie settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
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
                  <p className="text-[11px] text-white/50">
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
                  <p className="text-[11px] text-white/50">
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
                  <p className="text-[11px] text-white/50">
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

          @media (prefers-reduced-motion: reduce) {
            .cookie-glow-border::before {
              animation: none;
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
