-- ============================================================================
-- Tighten guest_scans INSERT policy and guest-scans storage SELECT policy.
--
-- Fix 1 (INSERT): The existing "Anyone can create guest scans" policy
--   allows any authenticated user to set access_mode = 'subscription'
--   without verifying they have an active subscription.  The verification
--   is enforced by the edge function (service role), so this RLS layer adds
--   a defence-in-depth check: only users with an active/trialing subscription
--   row may set access_mode = 'subscription' directly via the API.
--
-- Fix 2 (storage SELECT): The guest-scans bucket had no SELECT policy,
--   relying on bucket-level defaults.  We add an explicit policy that
--   restricts authenticated reads to files stored under the requesting
--   user's own UID prefix (e.g. "{uid}/filename").  Admins retain full
--   access.  Anonymous users cannot read any file.
-- ============================================================================

-- ── Fix 1: tighten INSERT policy ────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can create guest scans" ON public.guest_scans;

CREATE POLICY "Anyone can create guest scans"
  ON public.guest_scans FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- access_mode = 'subscription' requires a verified active subscription.
    (
      access_mode = 'subscription'
      AND auth.uid() IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM public.subscriptions sub
        WHERE sub.user_id = auth.uid()
          AND sub.status IN ('active', 'trialing')
      )
    )
    OR
    -- Text / URL scan path (guest or balance/metered account users).
    (
      access_mode IN ('guest', 'balance', 'metered')
      AND session_id IS NOT NULL
      AND char_length(session_id) BETWEEN 1 AND 200
      AND scan_type IS NOT NULL
      AND char_length(scan_type) BETWEEN 1 AND 50
      AND payment_status IN ('pending', 'requires_payment', 'paid')
    )
    OR
    -- Paid file scan path (requires Stripe session proof).
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

-- ── Fix 2: restrict storage SELECT to own files ──────────────────────────────
-- Files are uploaded to paths of the form "{user_id}/{filename}" so we can
-- gate access on the leading folder component matching auth.uid().
DROP POLICY IF EXISTS "Authenticated users can access own guest scan files" ON storage.objects;

CREATE POLICY "Authenticated users can access own guest scan files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'guest-scans'
    AND (
      -- File path starts with the requesting user's UID.
      (storage.foldername(name))[1] = auth.uid()::text
      -- Admins retain unrestricted read access.
      OR public.has_role(auth.uid(), 'admin'::public.app_role)
    )
  );
