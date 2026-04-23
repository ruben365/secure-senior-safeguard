-- ============================================================================
-- RECOVERY MIGRATION: Ensure guest_scans table exists with complete schema
--
-- Root cause: The initial guest_scanner migration was not applied to production,
-- causing "Could not find the table 'public.guest_scans' in the schema cache"
-- and blocking all file-scan payment flows.
--
-- This migration is fully idempotent: every statement uses IF NOT EXISTS or
-- DROP … IF EXISTS so it is safe to run against a DB that already has
-- some or all of these objects.
--
-- It consolidates the final schema from:
--   20260205180000_guest_scanner.sql
--   20260406191000_restore_guest_scan_file_columns.sql
--   20260411121500_scan_access_accounts.sql
-- ============================================================================

-- ── 1. Create table with all columns if it doesn't exist ─────────────────────
CREATE TABLE IF NOT EXISTS public.guest_scans (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Scan classification
  scan_type        TEXT,
  -- Text / URL scan columns (legacy path)
  session_id       TEXT,
  content          TEXT,
  -- File scan columns
  file_name        TEXT,
  file_size        BIGINT,
  file_type        TEXT,
  file_path        TEXT,
  -- Payment
  stripe_session_id TEXT,
  amount_paid      NUMERIC(10,2),
  payment_status   TEXT        NOT NULL DEFAULT 'pending',
  -- Scan status
  scan_status      TEXT        NOT NULL DEFAULT 'pending',
  -- Analysis results
  result           JSONB,
  risk_level       TEXT,
  -- Legacy columns kept for backward-compat
  status           TEXT        NOT NULL DEFAULT 'pending',
  threat_level     TEXT,
  analysis_results JSONB,
  -- Network
  ip_address       INET,
  -- Access control (added in scan_access_accounts migration)
  user_id          UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  access_mode      TEXT        NOT NULL DEFAULT 'guest',
  -- Timestamps
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at       TIMESTAMPTZ,
  deleted_at       TIMESTAMPTZ
);

-- ── 2. Additive column backfill (safe if table already existed with partial schema) ──
ALTER TABLE public.guest_scans
  ADD COLUMN IF NOT EXISTS scan_type        TEXT,
  ADD COLUMN IF NOT EXISTS session_id       TEXT,
  ADD COLUMN IF NOT EXISTS content          TEXT,
  ADD COLUMN IF NOT EXISTS file_name        TEXT,
  ADD COLUMN IF NOT EXISTS file_size        BIGINT,
  ADD COLUMN IF NOT EXISTS file_type        TEXT,
  ADD COLUMN IF NOT EXISTS file_path        TEXT,
  ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
  ADD COLUMN IF NOT EXISTS amount_paid      NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS payment_status   TEXT        DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS scan_status      TEXT        DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS result           JSONB,
  ADD COLUMN IF NOT EXISTS risk_level       TEXT,
  ADD COLUMN IF NOT EXISTS status           TEXT        DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS threat_level     TEXT,
  ADD COLUMN IF NOT EXISTS analysis_results JSONB,
  ADD COLUMN IF NOT EXISTS ip_address       INET,
  ADD COLUMN IF NOT EXISTS user_id          UUID        REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS access_mode      TEXT        DEFAULT 'guest',
  ADD COLUMN IF NOT EXISTS expires_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deleted_at       TIMESTAMPTZ;

-- ── 3. Constraints ───────────────────────────────────────────────────────────
ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_file_name_length_chk;
ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_file_name_length_chk
  CHECK (file_name IS NULL OR char_length(file_name) BETWEEN 1 AND 200);

ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_file_path_length_chk;
ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_file_path_length_chk
  CHECK (file_path IS NULL OR char_length(file_path) BETWEEN 1 AND 500);

ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_file_size_positive_chk;
ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_file_size_positive_chk
  CHECK (file_size IS NULL OR (file_size > 0 AND file_size <= 524288000));

ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_amount_paid_nonneg_chk;
ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_amount_paid_nonneg_chk
  CHECK (amount_paid IS NULL OR amount_paid >= 0);

ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_access_mode_chk;
ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_access_mode_chk
  CHECK (access_mode IN ('guest', 'subscription', 'balance', 'metered'));

-- ── 4. Indexes ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_guest_scans_expires
  ON public.guest_scans(expires_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_guest_scans_scan_status
  ON public.guest_scans(scan_status);

CREATE INDEX IF NOT EXISTS idx_guest_scans_user_id
  ON public.guest_scans(user_id);

-- ── 5. RLS ───────────────────────────────────────────────────────────────────
ALTER TABLE public.guest_scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view guest scans"  ON public.guest_scans;
CREATE POLICY "Admins can view guest scans"
  ON public.guest_scans FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

DROP POLICY IF EXISTS "Users can view own guest scans" ON public.guest_scans;
CREATE POLICY "Users can view own guest scans"
  ON public.guest_scans FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND (user_id IS NULL OR user_id = auth.uid()));

DROP POLICY IF EXISTS "Anyone can create guest scans"  ON public.guest_scans;
CREATE POLICY "Anyone can create guest scans"
  ON public.guest_scans FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Text / URL scan path
    (
      session_id IS NOT NULL
      AND char_length(session_id) BETWEEN 1 AND 200
      AND scan_type IS NOT NULL
      AND char_length(scan_type) BETWEEN 1 AND 50
      AND payment_status IN ('pending', 'requires_payment', 'paid')
    )
    OR
    -- Paid file scan path (guest)
    (
      scan_type = 'file'
      AND file_name IS NOT NULL
      AND char_length(file_name) BETWEEN 1 AND 200
      AND file_path IS NOT NULL
      AND char_length(file_path) BETWEEN 1 AND 500
      AND file_size IS NOT NULL
      AND file_size > 0
      AND file_size <= 524288000
      AND amount_paid IS NOT NULL
      AND amount_paid >= 0
      AND stripe_session_id IS NOT NULL
      AND char_length(stripe_session_id) BETWEEN 1 AND 200
    )
    OR
    -- Account-linked file scan path (authenticated only)
    (
      scan_type = 'file'
      AND file_name IS NOT NULL
      AND file_path IS NOT NULL
      AND file_size IS NOT NULL
      AND user_id IS NOT NULL
      AND user_id = auth.uid()
      AND access_mode IN ('subscription', 'balance', 'metered')
    )
  );

-- ── 6. Storage bucket (idempotent) ───────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'guest-scans',
  'guest-scans',
  false,
  524288000,
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'video/mp4',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav'
  ]
)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Guest scans can upload files" ON storage.objects;
CREATE POLICY "Guest scans can upload files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'guest-scans');

DROP POLICY IF EXISTS "Authenticated users can read own guest scan files" ON storage.objects;
CREATE POLICY "Authenticated users can read own guest scan files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'guest-scans');
