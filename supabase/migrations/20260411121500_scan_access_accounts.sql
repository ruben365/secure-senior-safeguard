-- Account-linked scan access for selected customers.
-- Supports prepaid balance and metered $1-per-upload access.

CREATE TABLE IF NOT EXISTS public.scan_access_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  access_status TEXT NOT NULL DEFAULT 'active'
    CHECK (access_status IN ('active', 'disabled', 'paused')),
  access_mode TEXT NOT NULL DEFAULT 'balance'
    CHECK (access_mode IN ('balance', 'metered')),
  scan_balance INTEGER NOT NULL DEFAULT 0 CHECK (scan_balance >= 0),
  per_scan_amount NUMERIC(10,2) NOT NULL DEFAULT 1.00 CHECK (per_scan_amount >= 0),
  usage_count INTEGER NOT NULL DEFAULT 0 CHECK (usage_count >= 0),
  usage_total NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (usage_total >= 0),
  last_scan_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scan_access_accounts_user_status
  ON public.scan_access_accounts(user_id, access_status);

ALTER TABLE public.scan_access_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own scan access account" ON public.scan_access_accounts;
CREATE POLICY "Users can view own scan access account"
  ON public.scan_access_accounts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage scan access accounts" ON public.scan_access_accounts;
CREATE POLICY "Admins can manage scan access accounts"
  ON public.scan_access_accounts
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.scan_access_usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.scan_access_accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  scan_id UUID NOT NULL REFERENCES public.guest_scans(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('balance_charge', 'metered_charge')),
  amount NUMERIC(10,2) NOT NULL DEFAULT 1.00 CHECK (amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT scan_access_usage_events_scan_id_key UNIQUE (scan_id)
);

CREATE INDEX IF NOT EXISTS idx_scan_access_usage_events_user_created
  ON public.scan_access_usage_events(user_id, created_at DESC);

ALTER TABLE public.scan_access_usage_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own scan usage events" ON public.scan_access_usage_events;
CREATE POLICY "Users can view own scan usage events"
  ON public.scan_access_usage_events
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage scan usage events" ON public.scan_access_usage_events;
CREATE POLICY "Admins can manage scan usage events"
  ON public.scan_access_usage_events
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

ALTER TABLE public.guest_scans
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS access_mode TEXT NOT NULL DEFAULT 'guest';

ALTER TABLE public.guest_scans
  DROP CONSTRAINT IF EXISTS guest_scans_access_mode_chk;

ALTER TABLE public.guest_scans
  ADD CONSTRAINT guest_scans_access_mode_chk
  CHECK (access_mode IN ('guest', 'subscription', 'balance', 'metered'));

CREATE INDEX IF NOT EXISTS idx_guest_scans_user_id
  ON public.guest_scans(user_id);

CREATE OR REPLACE FUNCTION public.consume_scan_access_usage(
  p_user_id UUID,
  p_scan_id UUID
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account public.scan_access_accounts%ROWTYPE;
  v_existing public.scan_access_usage_events%ROWTYPE;
  v_balance INTEGER;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_scan_id::text));

  SELECT * INTO v_existing
  FROM public.scan_access_usage_events
  WHERE scan_id = p_scan_id;

  IF FOUND THEN
    SELECT * INTO v_account
    FROM public.scan_access_accounts
    WHERE id = v_existing.account_id;

    RETURN jsonb_build_object(
      'ok', true,
      'duplicate', true,
      'accessMode', COALESCE(v_account.access_mode, 'metered'),
      'remainingBalance', COALESCE(v_account.scan_balance, 0),
      'amount', COALESCE(v_existing.amount, 1.00)
    );
  END IF;

  SELECT * INTO v_account
  FROM public.scan_access_accounts
  WHERE user_id = p_user_id
    AND access_status = 'active'
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'ok', false,
      'error', 'No active account-linked scan access is enabled for this user.'
    );
  END IF;

  IF v_account.access_mode = 'balance' THEN
    UPDATE public.scan_access_accounts
    SET
      scan_balance = scan_balance - 1,
      usage_count = usage_count + 1,
      usage_total = usage_total + per_scan_amount,
      last_scan_at = NOW(),
      updated_at = NOW()
    WHERE id = v_account.id
      AND access_status = 'active'
      AND scan_balance > 0
    RETURNING scan_balance INTO v_balance;

    IF NOT FOUND THEN
      RETURN jsonb_build_object(
        'ok', false,
        'error', 'No upload scans remain on this account.'
      );
    END IF;

    INSERT INTO public.scan_access_usage_events (
      account_id,
      user_id,
      scan_id,
      event_type,
      amount
    ) VALUES (
      v_account.id,
      p_user_id,
      p_scan_id,
      'balance_charge',
      v_account.per_scan_amount
    );

    RETURN jsonb_build_object(
      'ok', true,
      'duplicate', false,
      'accessMode', 'balance',
      'remainingBalance', v_balance,
      'amount', v_account.per_scan_amount
    );
  END IF;

  UPDATE public.scan_access_accounts
  SET
    usage_count = usage_count + 1,
    usage_total = usage_total + per_scan_amount,
    last_scan_at = NOW(),
    updated_at = NOW()
  WHERE id = v_account.id
    AND access_status = 'active'
  RETURNING scan_balance INTO v_balance;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'ok', false,
      'error', 'Account-linked scan access is disabled.'
    );
  END IF;

  INSERT INTO public.scan_access_usage_events (
    account_id,
    user_id,
    scan_id,
    event_type,
    amount
  ) VALUES (
    v_account.id,
    p_user_id,
    p_scan_id,
    'metered_charge',
    v_account.per_scan_amount
  );

  RETURN jsonb_build_object(
    'ok', true,
    'duplicate', false,
    'accessMode', 'metered',
    'remainingBalance', v_balance,
    'amount', v_account.per_scan_amount
  );
END;
$$;

REVOKE ALL ON FUNCTION public.consume_scan_access_usage(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_scan_access_usage(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_scan_access_usage(UUID, UUID) TO service_role;
