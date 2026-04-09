// Supabase client — safe initialization with env var guard.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Safety guard: if env vars are missing (e.g. Vercel build without env
// configured), use a placeholder so the app still renders. Supabase
// calls will fail gracefully instead of crashing React on mount.
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  if (typeof window !== "undefined") {
    console.warn(
      "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY is not set. " +
        "The app will render but backend features will not work. " +
        "Set these in your Vercel Environment Variables dashboard.",
    );
  }
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY || "placeholder-key",
  {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
