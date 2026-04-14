import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// ============================================================================
// Phase 13 hardening:
//   1. .maybeSingle() instead of .single() for role + profile lookups
//   2. Session expiry check on every auth state change — if the JWT
//      expires_at is in the past we force a sign out instead of trusting
//      the stale session
//   3. Inactivity timeout — if the user makes no UI interactions for
//      INACTIVITY_TIMEOUT_MS, we sign them out automatically. This is a
//      defense-in-depth control for unattended browsers (e.g. shared
//      kiosks at senior centers).
// ============================================================================

// 30 minutes of inactivity → automatic sign out
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export type UserRole =
  | "admin"
  | "secretary"
  | "training_coordinator"
  | "business_consultant"
  | "support_specialist"
  | "staff"
  | "moderator"
  | "user";

interface RoleConfig {
  role: UserRole;
  displayName: string;
  permissions: string[];
  redirectTo: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  admin: {
    role: "admin",
    displayName: "Administrator",
    permissions: ["*"],
    redirectTo: "/admin",
  },
  secretary: {
    role: "secretary",
    displayName: "Office Manager",
    permissions: [
      "view_clients",
      "manage_clients",
      "view_messages",
      "reply_messages",
      "view_calendar",
      "manage_appointments",
    ],
    redirectTo: "/portal/secretary",
  },
  training_coordinator: {
    role: "training_coordinator",
    displayName: "Training Coordinator",
    permissions: [
      "view_training",
      "manage_training",
      "view_individual_clients",
      "manage_scamshield",
      "create_content",
      "view_training_analytics",
    ],
    redirectTo: "/portal/coordinator",
  },
  business_consultant: {
    role: "business_consultant",
    displayName: "Business Consultant",
    permissions: [
      "view_business_clients",
      "manage_business_clients",
      "view_services",
      "create_proposals",
      "manage_ai_services",
    ],
    redirectTo: "/portal/staff",
  },
  support_specialist: {
    role: "support_specialist",
    displayName: "Support Specialist",
    permissions: [
      "view_all_clients",
      "view_tickets",
      "manage_tickets",
      "view_logs",
      "access_technical_docs",
    ],
    redirectTo: "/admin",
  },
  staff: {
    role: "staff",
    displayName: "Staff Member",
    permissions: ["view_clients", "view_messages", "view_calendar"],
    redirectTo: "/admin",
  },
  moderator: {
    role: "moderator",
    displayName: "Moderator",
    permissions: ["view_clients", "manage_content"],
    redirectTo: "/admin",
  },
  user: {
    role: "user",
    displayName: "User",
    permissions: [],
    redirectTo: "/portal",
  },
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  roleConfig: RoleConfig | null;
  loading: boolean;
  initialized: boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
  signOut: () => Promise<void>;
  adminName: string;
  adminEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("");

  // Inactivity timer ref — reset on every user interaction
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Phase 13: Session expiry check. If the token's expires_at is in the
  // past (or missing) we refuse to trust the session and sign out.
  const isSessionExpired = useCallback((s: Session | null): boolean => {
    if (!s) return true;
    const expiresAt = s.expires_at;
    if (typeof expiresAt !== "number") return false; // no expiry info — trust it
    return Date.now() >= expiresAt * 1000;
  }, []);

  const fetchUserRole = useCallback(async (currentUser: User) => {
    try {
      // Phase 13: .maybeSingle() so users with no role row don't throw
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        setRoleConfig(null);
      } else if (roleData) {
        const config = ROLE_CONFIGS[roleData.role as UserRole];
        setRoleConfig(config || null);
      } else {
        setRoleConfig(null);
      }

      // Phase 13: .maybeSingle() so users with no profile row don't throw
      const { data: profile } = await supabase
        .from("profiles_safe")
        .select("first_name, last_name")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profile) {
        setAdminName(
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
            "Admin",
        );
      }
      setAdminEmail(currentUser.email || "");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRoleConfig(null);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      // Phase 13: refuse to trust expired sessions
      if (newSession && isSessionExpired(newSession)) {
        console.warn("[auth] discarding expired session");
        supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setRoleConfig(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        // Defer Supabase calls with setTimeout to prevent deadlock
        setTimeout(() => {
          fetchUserRole(newSession.user);
        }, 0);
      } else {
        setRoleConfig(null);
        setLoading(false);
        setInitialized(true);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      // Phase 13: refuse to trust expired sessions on initial load
      if (existingSession && isSessionExpired(existingSession)) {
        console.warn("[auth] discarding expired session on init");
        supabase.auth.signOut();
        setLoading(false);
        setInitialized(true);
        return;
      }

      setSession(existingSession);
      setUser(existingSession?.user ?? null);

      if (existingSession?.user) {
        fetchUserRole(existingSession.user).finally(() => {
          setLoading(false);
          setInitialized(true);
        });
      } else {
        setLoading(false);
        setInitialized(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole, isSessionExpired]);

  // ============================================================================
  // Phase 13: Inactivity timeout. If the user signs in and then walks away
  // from the keyboard for INACTIVITY_TIMEOUT_MS, we sign them out automatically.
  // The timer resets on any user interaction (click, keypress, scroll, touch).
  // ============================================================================
  useEffect(() => {
    if (!user) return;

    const resetTimer = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(() => {
        console.warn("[auth] inactivity timeout — signing out");
        supabase.auth.signOut();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [user]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!roleConfig) return false;
      if (roleConfig.permissions.includes("*")) return true;
      return roleConfig.permissions.includes(permission);
    },
    [roleConfig],
  );

  const isAdmin = useCallback((): boolean => {
    return roleConfig?.role === "admin";
  }, [roleConfig]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoleConfig(null);
    setAdminName("Admin");
    setAdminEmail("");
    // Clear cart data from localStorage on logout to prevent cart leakage
    // between users on shared devices
    localStorage.removeItem("cart");
    localStorage.removeItem("cart-items");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        roleConfig,
        loading,
        initialized,
        hasPermission,
        isAdmin,
        signOut,
        adminName,
        adminEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
