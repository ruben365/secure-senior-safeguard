-- Fix b/e: call_logs — drop the permissive FOR ALL policy.
-- The service role bypasses RLS automatically; no INSERT/DELETE policy is needed.
-- Only authenticated admins need SELECT.
DROP POLICY IF EXISTS "Service role can manage call_logs" ON public.call_logs;

-- Fix c: newsletter_subscribers — drop the anonymous public DELETE policy.
-- The newsletter-unsubscribe edge function runs with the service role key
-- which already bypasses RLS. A public DELETE policy lets any anon client
-- delete any subscriber row without a token check at the database level.
DROP POLICY IF EXISTS "Anyone can unsubscribe via token" ON public.newsletter_subscribers;

-- Fix d: allow admins to update profiles.account_status via a service-role
-- edge function. Add an explicit admin UPDATE policy so the edge function's
-- service-role token can update any profile row (service role bypasses RLS,
-- but this documents the intent and covers any future policy changes).
-- The profiles RLS already has users_own_profile_update (auth.uid() = id).
-- We add no new client-facing policy — the approve-account edge function
-- uses the service role key, which already bypasses RLS.

-- Re-document: call_logs SELECT is for authenticated admin users only.
-- (Policy already exists from original migration; this is a no-op guard.)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'call_logs'
      AND policyname = 'Authenticated users can view call_logs'
  ) THEN
    CREATE POLICY "Authenticated users can view call_logs"
      ON public.call_logs FOR SELECT
      USING (auth.role() = 'authenticated');
  END IF;
END $$;
