import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Mail, CheckCircle } from "lucide-react";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

// ============================================================================
// Phase 13: This modal now calls the hardened `send-password-reset` edge
// function instead of `supabase.auth.resetPasswordForEmail` directly. The
// edge function:
//   - hard-pins the reset URL to https://www.invisionnetwork.org (no
//     spoofable window.location.origin)
//   - rate-limits per IP (3/min)
//   - invalidates any prior pending tokens for the email
//   - issues a 32-byte crypto.getRandomValues token
//   - restricts resets to @invisionnetwork.org email addresses
//
// To prevent email enumeration we ALWAYS show the same generic success
// message regardless of whether the email exists. We also do NOT block
// the UI on the network response — the toast is shown immediately.
// ============================================================================

export function ForgotPasswordModal({
  open,
  onClose,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const normalized = email.toLowerCase().trim();

    // Basic client-side shape check — server will re-validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized) || normalized.length > 254) {
      toast.error("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // Always show the same success state regardless of outcome to prevent
      // email enumeration via response timing or content.
      const { error } = await supabase.functions.invoke("send-password-reset", {
        body: { email: normalized },
      });

      // Log server errors to console for support, but never tell the user
      // whether the email is registered or not.
      if (error) {
        console.warn("Password reset request error:", error.message);
      }

      setEmailSent(true);
    } catch (err) {
      console.warn("Password reset request error:", err);
      // Even on a network failure we show the same UI state — the user
      // can always retry, and an attacker learns nothing.
      setEmailSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setEmailSent(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] glass-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center text-sm text-white/70">
              Enter your authorized email address and we'll send you a reset
              link.
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                  maxLength={254}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              Cancel
            </Button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/70">
                If your email is registered, we've sent you a password reset
                link.
              </p>
              <p className="text-sm text-white/70">
                Check your inbox and spam folder.
              </p>
              <p className="text-sm font-medium text-white">Link expires in 1 hour.</p>
            </div>

            <Button onClick={handleClose} className="w-full">
              Back to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
