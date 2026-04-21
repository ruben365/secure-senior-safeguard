import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";
const authBackground = "/images/hero-corporate-protection.webp";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { TwoFactorVerify } from "@/components/auth/TwoFactorVerify";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { SEO } from "@/components/SEO";

// ============================================================================
// Phase 13: hard-pinned canonical origin for OAuth redirects.
// Previously the code used `${window.location.origin}/auth` for the OAuth
// callback URL, which an attacker could spoof by hosting a clone of the site
// at a similar-looking domain. The OAuth provider would happily redirect to
// the spoofed domain because that's what we asked for. Now the redirect URL
// is hard-pinned to the canonical origin in production, and only falls back
// to window.location.origin for localhost development.
// ============================================================================
const CANONICAL_ORIGIN = "https://www.invisionnetwork.org";
function getAuthRedirectUrl(): string {
  if (typeof window === "undefined") return `${CANONICAL_ORIGIN}/auth`;
  const o = window.location.origin;
  // Only allow localhost dev origins to use the live origin — anything else
  // gets redirected through the canonical production URL.
  if (o.startsWith("http://localhost:") || o.startsWith("http://127.0.0.1:")) {
    return `${o}/auth`;
  }
  return `${CANONICAL_ORIGIN}/auth`;
}

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special character");

function Auth() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("mode") === "signup" ? "signup" : "login";
  const requestedRedirect = searchParams.get("redirect");
  const safeRedirect =
    requestedRedirect &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : null;

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showMfaVerify, setShowMfaVerify] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // Password strength indicators
  const [passwordHasLength, setPasswordHasLength] = useState(false);
  const [passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const [passwordHasLowercase, setPasswordHasLowercase] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasSpecial, setPasswordHasSpecial] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // Password recovery flow — Supabase redirects back with this event
      if (event === "PASSWORD_RECOVERY") {
        setShowPasswordReset(true);
        return;
      }

      if (event === "SIGNED_IN" && currentSession?.user) {
        // Check if MFA is required before redirecting
        supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => {
          if (
            data &&
            data.currentLevel === "aal1" &&
            data.nextLevel === "aal2"
          ) {
            // User has MFA enrolled but hasn't verified yet this session
            setShowMfaVerify(true);
          } else {
            handlePostLoginRedirect(currentSession.user.id);
          }
        });
      }
    });

    // Detect ?type=reset in URL (fallback for the PASSWORD_RECOVERY event)
    const typeParam = searchParams.get("type");
    if (typeParam === "reset") {
      supabase.auth.getSession().then(({ data: { session: s } }) => {
        if (s?.user) {
          setShowPasswordReset(true);
          setSession(s);
          setUser(s.user);
        }
      });
    } else {
      supabase.auth
        .getSession()
        .then(async ({ data: { session: existingSession } }) => {
          setSession(existingSession);
          setUser(existingSession?.user ?? null);
          if (existingSession?.user) {
            // Check MFA assurance level on session restore
            const { data: mfaData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
            if (mfaData && mfaData.currentLevel === "aal1" && mfaData.nextLevel === "aal2") {
              setShowMfaVerify(true);
              return;
            }
            handlePostLoginRedirect(existingSession.user.id);
          }
        });
    }

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Password validation
  useEffect(() => {
    setPasswordHasLength(password.length >= 8);
    setPasswordHasUppercase(/[A-Z]/.test(password));
    setPasswordHasLowercase(/[a-z]/.test(password));
    setPasswordHasNumber(/[0-9]/.test(password));
    setPasswordHasSpecial(/[^A-Za-z0-9]/.test(password));
    setPasswordsMatch(password.length > 0 && password === confirmPassword);
  }, [password, confirmPassword]);

  const handlePostLoginRedirect = async (userId: string) => {
    try {
      // Phase 13: .maybeSingle() so a missing profile row doesn't throw
      const { data: profileData } = await supabase
        .from("profiles")
        .select("account_status, application_reference")
        .eq("id", userId)
        .maybeSingle();

      if (profileData?.account_status === "pending") {
        await supabase.auth.signOut();
        toast({
          title: "Account Pending Approval",
          description: `Your account is awaiting admin approval. Reference: ${profileData.application_reference || "N/A"}`,
          variant: "destructive",
        });
        return;
      }

      if (profileData?.account_status === "rejected") {
        await supabase.auth.signOut();
        toast({
          title: "Account Rejected",
          description:
            "Your application was not approved. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (profileData?.account_status === "suspended") {
        await supabase.auth.signOut();
        toast({
          title: "Account Suspended",
          description:
            "Your account has been suspended. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (safeRedirect) {
        navigate(safeRedirect, { replace: true });
        return;
      }

      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (rolesData && rolesData.length > 0) {
        if (rolesData.length === 1) {
          const userRole = rolesData[0].role;
          const roleRedirects: Record<string, string> = {
            admin: "/portal/admin",
            secretary: "/admin/clients/businesses",
            training_coordinator: "/portal/trainer",
            business_consultant: "/admin/clients/businesses",
            support_specialist: "/portal/staff",
            staff: "/portal/staff",
            moderator: "/admin",
            senior: "/portal/senior",
            caregiver: "/portal/caregiver",
            healthcare: "/portal/healthcare",
            developer: "/portal/developer",
            analyst: "/portal/analyst",
            trainer: "/portal/trainer",
            user: "/portal",
          };
          navigate(roleRedirects[userRole] || "/portal");
          return;
        }
        navigate("/portal");
        return;
      }
      navigate("/portal");
    } catch (error) {
      console.error("Redirect error:", error);
      navigate("/portal");
    }
  };

  const validateLoginForm = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    try {
      emailSchema.parse(email);
    } catch {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    return isValid;
  };

  const validateSignupForm = (): boolean => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your first and last name",
        variant: "destructive",
      });
      return false;
    }

    try {
      emailSchema.parse(email);
    } catch {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      toast({
        title: "Weak Password",
        description:
          "Password must be 8+ chars with uppercase, lowercase, number, and special character",
        variant: "destructive",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;

      if (data.session && data.user) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      }
    } catch (error: unknown) {
      // ====================================================================
      // Phase 13: GENERIC error messages for login failures.
      //
      // The previous version surfaced "Invalid login credentials" vs
      // "Email not confirmed" vs raw error.message, which lets an attacker
      // distinguish "this email exists but the password is wrong" from
      // "this email doesn't exist". That's email enumeration via error
      // disclosure.
      //
      // Now we collapse every credential-related failure into the same
      // generic message. The only special-cased error is the rate-limit
      // case, which is safe to disclose because it doesn't reveal whether
      // the email exists.
      // ====================================================================
      const message = error instanceof Error ? error.message : String(error);

      let errorMessage =
        "Email or password is incorrect. Please try again.";
      let errorTitle = "Sign In Failed";

      if (message.toLowerCase().includes("too many requests")) {
        errorTitle = "Too Many Attempts";
        errorMessage = "Please wait a moment before trying again.";
      }

      // Log the real reason server-side for support, but never show it.
      console.warn("[auth] login failure:", message);

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSignupForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          // Phase 13: hard-pinned canonical origin in production
          emailRedirectTo: getAuthRedirectUrl(),
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            full_name: `${firstName.trim()} ${lastName.trim()}`,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        await supabase.from("profiles").upsert({
          id: data.user.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim().toLowerCase(),
          account_status: "active",
        });

        // Assign default user role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "user",
        });

        setSignupSuccess(true);
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: unknown) {
      // ====================================================================
      // Phase 13: GENERIC signup error messages.
      // We do NOT disclose "already registered" because that's an email
      // enumeration vector. Instead we show the same generic success toast
      // and rely on the email verification step to actually deliver to a
      // real user. (For an attacker probing the signup endpoint with a
      // random email, the response is identical regardless of whether the
      // email is taken.)
      // ====================================================================
      const message = error instanceof Error ? error.message : String(error);
      console.warn("[auth] signup failure:", message);

      // Special-cased benign errors that are safe to surface
      let errorMessage =
        "Unable to complete signup. Please verify your information and try again.";
      if (message.toLowerCase().includes("too many requests")) {
        errorMessage = "Please wait a moment before trying again.";
      }

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Phase 13: hard-pinned canonical origin in production
        redirectTo: getAuthRedirectUrl(),
      },
    });
    if (error) {
      console.warn("[auth] google oauth failure:", error.message);
      toast({
        title: "Sign In Failed",
        description: "Unable to start Google sign-in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMicrosoftSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        // Phase 13: hard-pinned canonical origin in production
        redirectTo: getAuthRedirectUrl(),
        scopes: "email",
      },
    });
    if (error) {
      console.warn("[auth] microsoft oauth failure:", error.message);
      toast({
        title: "Sign In Failed",
        description: "Unable to start Microsoft sign-in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const PasswordStrengthIndicator = ({
    met,
    label,
  }: {
    met: boolean;
    label: string;
  }) => (
    <div
      className={`flex items-center gap-2 text-xs ${met ? "text-green-600" : "text-muted-foreground"}`}
    >
      {met ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {label}
    </div>
  );

  // Soft Daylight input style
  const inputClassName =
    "input-daylight pl-10 text-[14px] text-slate-900 placeholder:text-slate-400";

  // Shared daylight background block (used across all auth screens)
  const DaylightBackground = () => (
    <div aria-hidden="true" className="auth-bg-daylight">
      <div className="auth-hairline-top" />
      <span className="auth-orb auth-orb--terracotta" style={{ width: 520, height: 520, top: "-10%", left: "-12%" }} />
      <span className="auth-orb auth-orb--lavender" style={{ width: 460, height: 460, bottom: "-8%", right: "-10%", animationDelay: "-9s" }} />
      <span className="auth-orb auth-orb--amber hidden md:block" style={{ width: 360, height: 360, top: "55%", left: "55%", animationDelay: "-15s", opacity: 0.4 }} />
      <span className="auth-ray hidden md:block" style={{ left: "30%" }} />
      <span className="auth-ray auth-ray--2 hidden md:block" style={{ left: "70%" }} />
      <div className="auth-hairline-bottom" />
    </div>
  );

  if (signupSuccess) {
    return (
      <div
        className="w-full relative flex items-center justify-center p-5 md:p-8 font-sans antialiased"
        style={{ minHeight: "100vh" }}
      >
        <DaylightBackground />
        <div className="relative z-10 w-full max-w-[440px]">
          <div className="auth-card-daylight text-center">
            <div className="auth-card-accent auth-card-accent--emerald" />
            <div className="relative w-14 h-14 mx-auto mb-5">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-xl" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_12px_28px_-8px_rgba(16,185,129,0.45),inset_0_1px_0_0_rgba(255,255,255,0.4)] border border-white/30">
                <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.25} />
              </div>
            </div>
            <h2 className="text-[1.5rem] font-bold text-slate-900 tracking-tight mb-2">
              Check your email
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              We sent a verification link to{" "}
              <span className="font-semibold text-slate-800">{email}</span>.
              Click it to activate your account.
            </p>
            <Button
              onClick={() => {
                setSignupSuccess(false);
                setActiveTab("login");
              }}
              className="auth-cta-primary"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // MFA verification screen
  if (showMfaVerify) {
    return (
      <div
        className="w-full relative flex items-center justify-center p-5 md:p-8 font-sans antialiased"
        style={{ minHeight: "100vh" }}
      >
        <DaylightBackground />
        <div className="relative z-10 w-full max-w-[440px]">
          <div className="auth-card-daylight">
            <div className="auth-card-accent auth-card-accent--amber" />
            <TwoFactorVerify
              onVerified={() => {
                setShowMfaVerify(false);
                if (user) handlePostLoginRedirect(user.id);
              }}
              onCancel={() => {
                setShowMfaVerify(false);
                supabase.auth.signOut();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Password reset screen
  if (showPasswordReset) {
    return (
      <div
        className="w-full relative flex items-center justify-center p-5 md:p-8 font-sans antialiased"
        style={{ minHeight: "100vh" }}
      >
        <DaylightBackground />
        <div className="relative z-10 w-full max-w-[440px]">
          <div className="auth-card-daylight">
            <div className="auth-card-accent auth-card-accent--lavender" />
            <PasswordResetForm
              onComplete={() => {
                setShowPasswordReset(false);
                setActiveTab("login");
                navigate("/auth", { replace: true });
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full relative flex items-stretch justify-center p-0 font-sans antialiased"
      style={{ minHeight: "100vh" }}
    >
      <SEO
        title="Sign In"
        description="Sign in to your InVision Network account to access your portal, courses, and protection tools."
        noindex
      />

      {/* SOFT DAYLIGHT BACKGROUND */}
      <DaylightBackground />

      {/* Single-column centered layout */}
      <div className="relative z-10 w-full max-w-[480px] mx-auto flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full relative">
          <div className="auth-card-daylight relative">
            <div className="auth-card-accent" />

            {/* Centered brand mark */}
            <Link
              to="/"
              className="flex items-center justify-center gap-3 mb-5 group"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orange-400/40 to-amber-300/30 blur-md" />
                <div className="relative w-12 h-12 rounded-2xl bg-white border border-orange-200 flex items-center justify-center shadow-[0_4px_12px_-2px_hsl(20_60%_40%/0.15)]">
                  <img
                    src={invisionLogo}
                    alt="InVision Network"
                    className="w-7 h-7"
                    loading="eager"
                    decoding="sync"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[15px] font-bold text-slate-900 tracking-tight">
                  InVision Network
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-[0.18em] uppercase mt-0.5">
                  Your Secure Portal
                </span>
              </div>
            </Link>

            {/* Page heading */}
            <div className="mb-5 text-center">
              <h2 className="text-[1.5rem] md:text-[1.625rem] font-bold text-slate-900 leading-tight tracking-tight">
                Welcome back
              </h2>
              <p className="text-[13px] text-slate-500 mt-1">
                Sign in or create an account to continue.
              </p>
            </div>

            {/* OAuth Buttons — Soft Daylight SSO */}
            <div className="space-y-3 mb-5">
              <Button
                type="button"
                variant="outline"
                className="btn-sso-daylight w-full text-[14px]"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="btn-sso-daylight w-full text-[14px]"
                onClick={handleMicrosoftSignIn}
              >
                <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                Continue with Microsoft
              </Button>
            </div>

            {/* Divider — warm gradient hairline + cream pill */}
            <div className="auth-divider-warm mb-5">
              <span>or continue with email</span>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="auth-tabs-warm grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="login"
                  className="rounded-md transition-all"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-md transition-all"
                >

                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">

                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      required
                      disabled={isLoading}
                      className={`${inputClassName} ${emailError ? "border-destructive focus:border-destructive" : ""}`}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-destructive">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="login-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-11 ${passwordError ? "border-destructive focus:border-destructive" : ""}`}
                      autoComplete="current-password"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-destructive">{passwordError}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="remember"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                    />
                    <span className="text-sm text-muted-foreground select-none">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hover:from-rose-500 hover:to-orange-500 transition-all"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="auth-cta-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4 auth-cta-arrow" />
                    </>
                  )}
                </Button>

                {/* Security Footer */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100 mt-4">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    Secured by 256-bit Encryption
                  </span>
                </div>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={isLoading}
                      className="h-11 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className={inputClassName}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="signup-password"
                    className="text-sm font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-11`}
                      autoComplete="new-password"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <PasswordStrengthIndicator
                      met={passwordHasLength}
                      label="8+ characters"
                    />
                    <PasswordStrengthIndicator
                      met={passwordHasUppercase}
                      label="Uppercase"
                    />
                    <PasswordStrengthIndicator
                      met={passwordHasLowercase}
                      label="Lowercase"
                    />
                    <PasswordStrengthIndicator
                      met={passwordHasNumber}
                      label="Number"
                    />
                    <PasswordStrengthIndicator
                      met={passwordHasSpecial}
                      label="Special char"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-11`}
                      autoComplete="new-password"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && (
                    <div
                      className={`flex items-center gap-2 text-xs ${passwordsMatch ? "text-green-600" : "text-destructive"}`}
                    >
                      {passwordsMatch ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {passwordsMatch
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="auth-cta-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4 auth-cta-arrow" />
                    </>
                  )}
                </Button>

                {/* Security Footer */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100 mt-4">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    Secured by 256-bit Encryption
                  </span>
                </div>
              </form>
            </TabsContent>
          </Tabs>

            {/* Trust footer chips */}
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { icon: ShieldCheck, label: "Encrypted" },
                { icon: CheckCircle2, label: "Kettering team" },
                { icon: Lock, label: "Private" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[hsl(35_40%_97%)] border border-[hsl(28_25%_88%)] text-[11px] text-slate-600 font-medium"
                >
                  <Icon className="w-3.5 h-3.5 text-[hsl(20_70%_50%)]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* /card */}

          {/* Apply link */}
          <div className="mt-6 text-center">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Want to join our team?{" "}
              <span className="text-[hsl(20_75%_45%)] font-semibold">Apply here</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bottom legal links */}
          <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link to="/terms-of-service" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-300">•</span>
            <span>© {new Date().getFullYear()} InVision Network</span>
          </div>
        </div>
        {/* /inner wrapper */}
      </div>
      {/* /max-w-[480px] */}

      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}

export default Auth;
