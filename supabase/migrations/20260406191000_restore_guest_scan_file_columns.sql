-- ============================================================================
-- Restore guest_scans file-scan columns
--
-- The original 20260205180000_guest_scanner.sql migration created a
-- guest_scans table with columns for paid FILE scans (file_name, file_size,
-- file_type, file_path, amount_paid, threat_level, analysis_results,
-- expires_at). A subsequent unmanaged change recreated the table with
-- columns for free TEXT/URL scans (session_id, scan_type, content, result,
-- risk_level, payment_status, stripe_session_id), dropping the file columns
-- entirely.
--
-- This left the guest-scan-payment and analyze-file edge functions broken
-- (they reference columns that no longer exist) — meaning the paid file
-- scan feature has been silently dead since that change.
--
-- This migration is purely ADDITIVE. It re-adds the missing columns as
-- nullable so the existing text/URL scan flow keeps working unchanged, and
-- updates the INSERT RLS policy to allow either flow.
-- ============================================================================

ALTER TABLE public.guest_scans
  ADD COLUMN IF NOT EXISTS file_name text,
  ADD COLUMN IF NOT EXISTS file_size bigint,
  ADD COLUMN IF NOT EXISTS file_type text,
  ADD COLUMN IF NOT EXISTS file_path text,
  ADD COLUMN IF NOT EXISTS amount_paid numeric(10,2),
  ADD COLUMN IF NOT EXISTS scan_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Sanity bounds — caps on user-supplied values that hit the table
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

CREATE INDEX IF NOT EXISTS idx_guest_scans_expires
  ON public.guest_scans(expires_at)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_guest_scans_scan_status
  ON public.guest_scans(scan_status);

-- ============================================================================
-- Rewrite the INSERT policy to allow EITHER:
--   1. The existing text/URL scan flow (session_id + scan_type + payment_status)
--   2. The paid file scan flow (scan_type='file' + file_name/path/size +
--      amount_paid + stripe_session_id)
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can create guest scans" ON public.guest_scans;

CREATE POLICY "Anyone can create guest scans"
  ON public.guest_scans FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Text / URL scan path (existing)
    (
      session_id IS NOT NULL
      AND char_length(session_id) BETWEEN 1 AND 200
      AND scan_type IS NOT NULL
      AND char_length(scan_type) BETWEEN 1 AND 50
      AND payment_status IN ('pending', 'requires_payment', 'paid')
    )
    OR
    -- Paid file scan path (restored)
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
      AND amount_paid > 0
      AND stripe_session_id IS NOT NULL
      AND char_length(stripe_session_id) BETWEEN 1 AND 200
    )
  );
