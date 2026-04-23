import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Shield, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TwoFactorVerifyProps {
  onVerified: () => void;
  onCancel: () => void;
}

export function TwoFactorVerify({ onVerified, onCancel }: TwoFactorVerifyProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    // Handle paste of full code
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 6) newCode[index + i] = digit;
      });
      setCode(newCode);
      if (newCode.every((d) => d !== "")) {
        handleVerify(newCode.join(""));
      }
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (codeString?: string) => {
    const verificationCode = codeString || code.join("");
    if (verificationCode.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    setIsVerifying(true);
    try {
      // Get the user's TOTP factors
      const { data: factorsData, error: factorsError } =
        await supabase.auth.mfa.listFactors();

      if (factorsError) throw factorsError;

      const totpFactor = factorsData.totp.find(
        (f) => f.status === "verified"
      );

      if (!totpFactor) {
        toast.error("No authenticator found. Please contact support.");
        setIsVerifying(false);
        return;
      }

      // Create a challenge
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: totpFactor.id });

      if (challengeError) throw challengeError;

      // Verify the code
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challengeData.id,
        code: verificationCode,
      });

      if (verifyError) {
        toast.error("Invalid code. Please check your authenticator and try again.");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setIsVerifying(false);
        return;
      }

      toast.success("Verified!");
      onVerified();
    } catch (err) {
      console.error("MFA verify error:", err);
      toast.error("Verification failed. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-3">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-orange-500" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          Two-Factor Authentication
        </h3>
        <p className="text-[13px] text-slate-500">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {/* OTP input boxes */}
      <div className="grid grid-cols-6 gap-2 sm:gap-3 max-w-xs mx-auto">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              "w-full aspect-square text-center text-xl font-bold rounded-lg border-2 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500",
              "bg-white",
              digit ? "border-orange-500 bg-orange-50/50" : "border-slate-200",
              "min-h-[48px] min-w-[48px]",
            )}
            disabled={isVerifying}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>

      <Button
        onClick={() => handleVerify()}
        disabled={isVerifying || code.some((d) => !d)}
        className="w-full h-7 bg-[#080d1a] text-white hover:bg-[#111827]"
      >
        {isVerifying ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );
}
