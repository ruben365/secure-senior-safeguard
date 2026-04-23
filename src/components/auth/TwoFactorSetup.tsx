import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Shield, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface TwoFactorSetupProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type SetupStep = "intro" | "qr" | "verify" | "done";

export function TwoFactorSetup({ open, onClose, onSuccess }: TwoFactorSetupProps) {
  const [step, setStep] = useState<SetupStep>("intro");
  const [qrUri, setQrUri] = useState("");
  const [secret, setSecret] = useState("");
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEnroll = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator App",
      });

      if (error) throw error;

      setQrUri(data.totp.uri);
      setSecret(data.totp.secret);
      setFactorId(data.id);
      setStep("qr");
    } catch (err) {
      console.error("MFA enroll error:", err);
      toast.error("Could not set up 2FA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    setIsLoading(true);
    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId });

      if (challengeError) throw challengeError;

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code,
      });

      if (verifyError) {
        toast.error("Invalid code. Please check your authenticator and try again.");
        setCode("");
        setIsLoading(false);
        return;
      }

      setStep("done");
      toast.success("Two-factor authentication enabled!");
      onSuccess();
    } catch (err) {
      console.error("MFA verify error:", err);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = async () => {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  const handleClose = () => {
    setStep("intro");
    setQrUri("");
    setSecret("");
    setFactorId("");
    setCode("");
    setCopied(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-32px)] sm:w-full sm:max-w-[420px] max-h-[85svh] overflow-y-auto rounded-2xl p-5 gap-0">
        <DialogHeader className="space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <Shield className="w-4 h-4 text-orange-500" />
            Set Up Two-Factor Authentication
          </DialogTitle>
          <DialogDescription className="text-[12px] mt-1">
            Add an extra layer of security to your account.
          </DialogDescription>
        </DialogHeader>

        {step === "intro" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Two-factor authentication adds an extra step when signing in. After
              entering your password, you'll need a 6-digit code from an
              authenticator app like Google Authenticator or Authy.
            </p>
            <Button
              onClick={handleEnroll}
              disabled={isLoading}
              className="w-full h-7 bg-[#080d1a] text-white hover:bg-[#111827]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Set Up Authenticator
            </Button>
          </div>
        )}

        {step === "qr" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code with Google Authenticator or Authy.
            </p>

            {/* QR code on white background for scannability */}
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <QRCodeSVG value={qrUri} size={180} level="M" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-muted-foreground mb-1.5">
                Or enter this code manually:
              </p>
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <code className="text-xs font-mono text-slate-700 select-all tracking-wide">
                  {secret}
                </code>
                <button
                  onClick={copySecret}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Copy secret"
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={() => setStep("verify")}
              className="w-full h-7 bg-[#080d1a] text-white hover:bg-[#111827]"
            >
              I've Scanned It
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Enter the 6-digit code from your authenticator app to confirm setup.
            </p>

            <div className="flex justify-center">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-48 h-9 text-center text-2xl font-bold tracking-[0.3em] border-2 rounded-xl focus:border-orange-500"
                autoFocus
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={isLoading || code.length !== 6}
              className="w-full h-7 bg-[#080d1a] text-white hover:bg-[#111827]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Verify & Enable
            </Button>

            <button
              type="button"
              onClick={() => setStep("qr")}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to QR code
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                2FA is now active
              </p>
              <p className="text-[13px] text-muted-foreground">
                You'll need your authenticator app each time you sign in.
              </p>
            </div>
            <Button onClick={handleClose} className="w-full h-7">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
