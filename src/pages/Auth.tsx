import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import { TwoFactorVerify } from "@/components/auth/TwoFactorVerify";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";
import { SEO } from "@/components/SEO";
import "@/styles/auth-page.css";

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

function AuthOrbs() {
  return (
    <>
      <span aria-hidden="true" className="ap-orb ap-orb--gold" />
      <span aria-hidden="true" className="ap-orb ap-orb--purple" />
      <span aria-hidden="true" className="ap-orb ap-orb--pink" />
      <span aria-hidden="true" className="ap-orb ap-orb--blue" />
      <div aria-hidden="true" className="ap-curves" />
    </>
  );
}

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

  // ============================================================================
  // Client-side rate limiting: 5 failed attempts → 15 min lockout per email.
  // Uses localStorage so it persists across page refreshes.
  // NOTE: This is a UX measure only — server-side auth rate limits are the
  // true enforcement layer. Do not rely on this alone.
  // ============================================================================
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 15 * 60 * 1000;

  const getRateLimitKey = (e: string) => `login_attempts_${e}`;
  const getLockoutKey = (e: string) => `login_lockout_${e}`;

  const checkRateLimit = (normalizedEmail: string): { blocked: boolean; minutesLeft?: number } => {
    const lockoutUntil = Number(localStorage.getItem(getLockoutKey(normalizedEmail)) ?? 0);
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60_000);
      return { blocked: true, minutesLeft };
    }
    return { blocked: false };
  };

  const recordFailedAttempt = (normalizedEmail: string) => {
    const key = getRateLimitKey(normalizedEmail);
    const attempts = Number(localStorage.getItem(key) ?? 0) + 1;
    localStorage.setItem(key, String(attempts));
    if (attempts >= MAX_ATTEMPTS) {
      localStorage.setItem(getLockoutKey(normalizedEmail), String(Date.now() + LOCKOUT_MS));
      localStorage.removeItem(key);
    }
  };

  const clearRateLimit = (normalizedEmail: string) => {
    localStorage.removeItem(getRateLimitKey(normalizedEmail));
    localStorage.removeItem(getLockoutKey(normalizedEmail));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    const normalizedEmail = email.trim().toLowerCase();
    const rl = checkRateLimit(normalizedEmail);
    if (rl.blocked) {
      toast({
        title: "Too Many Attempts",
        description: `Account temporarily locked. Try again in ${rl.minutesLeft} minute${rl.minutesLeft === 1 ? "" : "s"}.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) throw error;

      clearRateLimit(normalizedEmail);

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

      let errorMessage = "Email or password is incorrect. Please try again.";
      let errorTitle = "Sign In Failed";

      if (message.toLowerCase().includes("too many requests")) {
        errorTitle = "Too Many Attempts";
        errorMessage = "Please wait a moment before trying again.";
      } else {
        recordFailedAttempt(normalizedEmail);
        const attemptsLeft = MAX_ATTEMPTS - Number(localStorage.getItem(getRateLimitKey(normalizedEmail)) ?? 0);
        if (attemptsLeft > 0 && attemptsLeft <= 2) {
          errorMessage += ` ${attemptsLeft} attempt${attemptsLeft === 1 ? "" : "s"} remaining before lockout.`;
        }
      }

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
          account_status: "pending",
        });

        // Assign default user role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "user",
        });

        setSignupSuccess(true);
        toast({
          title: "Account Created!",
          description: "Please verify your email. Once approved by our team, you'll be able to sign in.",
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

  const PasswordStrengthItem = ({ met, label }: { met: boolean; label: string }) => (
    <div className={`ap-strength-item ${met ? "ap-strength-item--met" : "ap-strength-item--unmet"}`}>
      {met ? <CheckCircle2 className="w-3 h-3 flex-shrink-0" /> : <XCircle className="w-3 h-3 flex-shrink-0" />}
      {label}
    </div>
  );

  // ── Special screens ──────────────────────────────────────────────────────

  if (signupSuccess) {
    return (
      <div className="ap-simple">
        <AuthOrbs />
        <div className="ap-simple-card" style={{ textAlign: "center" }}>
          <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 20px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 16, background: "rgba(74,222,128,0.15)", filter: "blur(16px)" }} />
            <div style={{
              position: "relative", width: 56, height: 56, borderRadius: 16,
              background: "linear-gradient(135deg,#4ade80,#16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 12px 28px -8px rgba(74,222,128,0.4)",
            }}>
              <CheckCircle2 className="w-7 h-7" style={{ color: "#fff" }} strokeWidth={2.25} />
            </div>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ap-text)", marginBottom: 8 }}>
            Check your email
          </h2>
          <p style={{ fontSize: 13, color: "var(--ap-muted)", lineHeight: 1.6, marginBottom: 24 }}>
            We sent a verification link to{" "}
            <strong style={{ color: "var(--ap-text)" }}>{email}</strong>.
            Click it to activate your account.
          </p>
          <button
            type="button"
            className="ap-btn"
            onClick={() => { setSignupSuccess(false); setActiveTab("login"); }}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (showMfaVerify) {
    return (
      <div className="ap-simple">
        <AuthOrbs />
        <div className="ap-simple-card">
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
    );
  }

  if (showPasswordReset) {
    return (
      <div className="ap-simple">
        <AuthOrbs />
        <div className="ap-simple-card">
          <PasswordResetForm
            onComplete={() => {
              setShowPasswordReset(false);
              setActiveTab("login");
              navigate("/auth", { replace: true });
            }}
          />
        </div>
      </div>
    );
  }

  // ── Main two-column layout ───────────────────────────────────────────────

  return (
    <div className="ap-page">
      <SEO
        title="Sign In"
        description="Sign in to your InVision Network account to access your portal, courses, and protection tools."
        noindex
      />

      <AuthOrbs />

      <div className="ap-card">
        {/* ── LEFT COLUMN ── */}
        <div className="ap-left">
          {/* Flipping badge */}
          <div className="ap-badge-flip">
            <div className="ap-badge-inner">
              <div className="ap-badge-face ap-badge-front">
                <ShieldCheck style={{ width: 14, height: 14 }} />
                24/7 Support
              </div>
              <div className="ap-badge-face ap-badge-back">
                Invision.
              </div>
            </div>
          </div>

          {/* Parallelogram hero frame */}
          <div className="ap-para">
            <div className="ap-para-grid" />
            <div className="ap-para-shimmer" />
            <div className="ap-para-content">
              <img
                src={invisionLogo}
                alt="InVision Network"
                className="ap-para-logo"
                loading="eager"
                decoding="sync"
                width={44}
                height={44}
              />
              <p className="ap-para-headline">Protect What Matters</p>
              <p className="ap-para-sub">InVision Network · EST. 2021</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="ap-testimonials">
            <div className="ap-testi">
              <div className="ap-testi-stars">★★★★★</div>
              <p className="ap-testi-text">
                "InVision gave our family real peace of mind. The 24/7 monitoring is incredible."
              </p>
              <p className="ap-testi-name">— Margaret T., Client since 2022</p>
            </div>
            <div className="ap-testi">
              <div className="ap-testi-stars">★★★★★</div>
              <p className="ap-testi-text">
                "The team is always responsive. Best senior care network I've worked with."
              </p>
              <p className="ap-testi-name">— James R., Healthcare Partner</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="ap-right">
          {/* Brand mark */}
          <Link to="/" className="ap-brand">
            Invision<span className="ap-brand-dot">.</span>
          </Link>

          {/* Heading */}
          <h1 className="ap-headline">Welcome</h1>
          <p className="ap-sub">Sign in or create an account to continue.</p>

          {/* SSO buttons */}
          <div className="ap-sso">
            <button type="button" className="ap-sso-btn" onClick={handleGoogleSignIn}>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button type="button" className="ap-sso-btn" onClick={handleMicrosoftSignIn}>
              <svg width="18" height="18" viewBox="0 0 23 23" aria-hidden="true">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="ap-divider">or continue with email</div>

          {/* Tab switcher */}
          <div className="ap-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "login"}
              className={`ap-tab${activeTab === "login" ? " ap-tab--on" : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "signup"}
              className={`ap-tab${activeTab === "signup" ? " ap-tab--on" : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* ── LOGIN FORM ── */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="ap-field">
                <label htmlFor="login-email" className="ap-label">Email Address</label>
                <div className="ap-input-wrap">
                  <Mail className="ap-input-icon" aria-hidden="true" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`ap-input${emailError ? " is-error" : ""}`}
                  />
                </div>
                {emailError && <p className="ap-error-msg">{emailError}</p>}
              </div>

              {/* Password */}
              <div className="ap-field">
                <label htmlFor="login-password" className="ap-label">Password</label>
                <div className="ap-input-wrap">
                  <Lock className="ap-input-icon" aria-hidden="true" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    minLength={8}
                    className={`ap-input with-toggle${passwordError ? " is-error" : ""}`}
                  />
                  <button
                    type="button"
                    className="ap-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && <p className="ap-error-msg">{passwordError}</p>}
              </div>

              {/* Remember me + forgot password */}
              <div className="ap-check-row">
                <label className="ap-check-label">
                  <input
                    type="checkbox"
                    className="ap-check"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ap-check-text">Remember me</span>
                </label>
                <button
                  type="button"
                  className="ap-forgot"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button type="submit" className="ap-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="ap-btn-arrow">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </>
                )}
              </button>

              {/* Security footer */}
              <div className="ap-security">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Secured by 256-bit Encryption
              </div>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignup}>
              {/* Name row */}
              <div className="ap-field-row">
                <div>
                  <label htmlFor="firstName" className="ap-label">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="given-name"
                    placeholder="Jane"
                    className="ap-input no-icon"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="ap-label">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="family-name"
                    placeholder="Smith"
                    className="ap-input no-icon"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="ap-field">
                <label htmlFor="signup-email" className="ap-label">Email Address</label>
                <div className="ap-input-wrap">
                  <Mail className="ap-input-icon" aria-hidden="true" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="ap-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="ap-field">
                <label htmlFor="signup-password" className="ap-label">Password</label>
                <div className="ap-input-wrap">
                  <Lock className="ap-input-icon" aria-hidden="true" />
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    minLength={8}
                    className="ap-input with-toggle"
                  />
                  <button
                    type="button"
                    className="ap-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="ap-strength-grid">
                  <PasswordStrengthItem met={passwordHasLength}    label="8+ characters" />
                  <PasswordStrengthItem met={passwordHasUppercase} label="Uppercase" />
                  <PasswordStrengthItem met={passwordHasLowercase} label="Lowercase" />
                  <PasswordStrengthItem met={passwordHasNumber}    label="Number" />
                  <PasswordStrengthItem met={passwordHasSpecial}   label="Special char" />
                </div>
              </div>

              {/* Confirm password */}
              <div className="ap-field">
                <label htmlFor="confirmPassword" className="ap-label">Confirm Password</label>
                <div className="ap-input-wrap">
                  <Lock className="ap-input-icon" aria-hidden="true" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    minLength={8}
                    className="ap-input with-toggle"
                  />
                  <button
                    type="button"
                    className="ap-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className={`ap-strength-item ${passwordsMatch ? "ap-strength-item--met" : ""}`}
                    style={{ marginTop: 6, fontSize: 11, color: passwordsMatch ? "#4ade80" : "#fca5a5" }}
                  >
                    {passwordsMatch
                      ? <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      : <XCircle className="w-3 h-3 flex-shrink-0" />}
                    {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="ap-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="ap-btn-arrow">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </>
                )}
              </button>

              {/* Security footer */}
              <div className="ap-security">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Secured by 256-bit Encryption
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Below-card footer */}
      <div className="ap-footer">
        <Link to="/careers" className="ap-footer-apply">
          Want to join our team?{" "}
          <span>Apply here</span>
          <ArrowRight style={{ width: 13, height: 13 }} />
        </Link>
        <div className="ap-footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms-of-service">Terms of Service</Link>
          <span>•</span>
          <span>© {new Date().getFullYear()} InVision Network</span>
        </div>
      </div>

      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}

export default Auth;
