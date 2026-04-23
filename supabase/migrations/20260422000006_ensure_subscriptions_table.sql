-- ============================================================================
-- RECOVERY MIGRATION: Ensure subscriptions table exists with complete schema
--
-- This table is referenced by:
--   - stripe-webhook edge function (upserts on subscription events)
--   - Admin pages: Subscriptions, SuperAdminSalesOverview, SuperAdminUserManagement,
--     ClientServicesTab, UpcomingTasks
-- It was created directly in Supabase and has no prior migration file.
--
-- Fully idempotent: uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS.
-- ============================================================================

-- ── 1. Create table if it doesn't exist ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  stripe_subscription_id TEXT        UNIQUE,
  stripe_customer_id     TEXT,
  status                 TEXT        NOT NULL DEFAULT 'pending',
  email                  TEXT,
  service_type           TEXT,
  plan_name              TEXT,
  amount                 BIGINT,
  current_period_end     TIMESTAMPTZ,
  end_date               TIMESTAMPTZ,
  cancel_at_period_end   BOOLEAN     NOT NULL DEFAULT false,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. Additive column backfill ──────────────────────────────────────────────
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_customer_id     TEXT,
  ADD COLUMN IF NOT EXISTS email                  TEXT,
  ADD COLUMN IF NOT EXISTS service_type           TEXT,
  ADD COLUMN IF NOT EXISTS plan_name              TEXT,
  ADD COLUMN IF NOT EXISTS amount                 BIGINT,
  ADD COLUMN IF NOT EXISTS current_period_end     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS end_date               TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancel_at_period_end   BOOLEAN     DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at             TIMESTAMPTZ DEFAULT NOW();

-- ── 3. Unique constraint on stripe_subscription_id (needed for webhook upsert) ──
-- Deduplicate first: keep the most-recently-updated row per stripe_subscription_id.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'subscriptions_stripe_subscription_id_key'
      AND conrelid = 'public.subscriptions'::regclass
  ) THEN
    -- Constraint already exists; nothing to do.
    NULL;
  ELSE
    -- Remove duplicate stripe_subscription_id rows, keeping the latest updated_at.
    DELETE FROM public.subscriptions s
    WHERE s.stripe_subscription_id IS NOT NULL
      AND s.id <> (
        SELECT id FROM public.subscriptions s2
        WHERE s2.stripe_subscription_id = s.stripe_subscription_id
        ORDER BY COALESCE(s2.updated_at, s2.created_at) DESC NULLS LAST, s2.id DESC
        LIMIT 1
      );

    ALTER TABLE public.subscriptions
      ADD CONSTRAINT subscriptions_stripe_subscription_id_key
      UNIQUE (stripe_subscription_id);
  END IF;
END $$;

-- ── 4. Indexes ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id
  ON public.subscriptions(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id
  ON public.subscriptions(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_status
  ON public.subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date
  ON public.subscriptions(end_date)
  WHERE status = 'active';

-- ── 5. RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can view all subscriptions"
  ON public.subscriptions FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admins can insert/update via dashboard; edge functions use service role (bypasses RLS)
