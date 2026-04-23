import { useState, useEffect, forwardRef } from "react";
import { X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
const VISIT_THRESHOLD = 1; // Show banner on first visit

export const CookieConsent = forwardRef<HTMLDivElement>(function CookieConsent(_props, _ref) {
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
      // Track page visits and only show after threshold
      const visitCount =
        parseInt(localStorage.getItem(PAGE_VISIT_COUNT_KEY) || "0", 10) + 1;
      localStorage.setItem(PAGE_VISIT_COUNT_KEY, visitCount.toString());

      if (visitCount >= VISIT_THRESHOLD) {
        // Delay banner until after LCP to avoid layout shift during measurement
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
    const allPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allPreferences);
    setShowBanner(false);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
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
    // Enable/disable analytics tracking
    if (prefs.analytics) {
      // Enable Google Analytics if configured
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      }
    } else {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
    }

    // Enable/disable marketing cookies
    if (prefs.marketing) {
      if (window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });
      }
    } else {
      if (window.gtag) {
        window.gtag("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
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
      <div className="cookie-banner fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50">
        <div
          className="cookie-banner__card sm:w-[360px] rounded-[14px] overflow-hidden border border-[rgba(0,0,0,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px) saturate(1.2)', WebkitBackdropFilter: 'blur(16px) saturate(1.2)' }}
        >
          <div className="p-4">
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#1E293B]">We Value Your Privacy</h3>
              <button
                type="button"
                onClick={acceptEssential}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2 text-[#64748B] hover:text-[#1E293B] rounded transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-[#475569] leading-relaxed mb-3">
              We use cookies to improve your experience, analyze site traffic,
              and provide personalized content.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="h-8 px-4 text-xs font-semibold text-white rounded-lg transition-all duration-200 hover:brightness-110"
                style={{ background: 'var(--ws-blue, #3067e8)' }}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={acceptEssential}
                className="h-8 px-4 text-xs font-semibold text-[#475569] rounded-lg border border-[rgba(0,0,0,0.1)] hover:border-[rgba(0,0,0,0.2)] hover:text-[#1E293B] transition-all duration-200"
                style={{ background: 'rgba(0,0,0,0.03)' }}
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="h-8 w-8 flex items-center justify-center text-[#64748B] rounded-lg border border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.15)] hover:text-[#1E293B] transition-all duration-200 ml-auto"
                style={{ background: 'rgba(0,0,0,0.03)' }}
                aria-label="Cookie settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="w-[calc(100vw-32px)] sm:w-full sm:max-w-md max-h-[85svh] overflow-y-auto rounded-2xl glass-modal">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Essential cookies are required for the site to function.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <Label htmlFor="essential" className="text-sm font-semibold">Essential</Label>
                <p className="text-xs text-muted-foreground">Required. Cannot be disabled.</p>
              </div>
              <Switch id="essential" checked={true} disabled />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-sm font-semibold">Analytics</Label>
                <p className="text-xs text-muted-foreground">Helps us understand site usage.</p>
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
                <Label htmlFor="marketing" className="text-sm font-semibold">Marketing</Label>
                <p className="text-xs text-muted-foreground">Personalized advertisements.</p>
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
            <Button onClick={handleSaveSettings} size="sm">Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
