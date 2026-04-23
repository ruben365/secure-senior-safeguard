-- Add plan_tier and monthly_scan_limit to subscriptions table.
-- plan_tier: 'basic' | 'pro' | 'enterprise' (populated by stripe-webhook on subscription events)
-- monthly_scan_limit: 25 | 100 | -1 (−1 = unlimited for enterprise)

ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_tier TEXT DEFAULT 'basic',
  ADD COLUMN IF NOT EXISTS monthly_scan_limit INTEGER DEFAULT 25;

-- Back-fill existing rows: derive tier from amount column if present, else leave as basic/25.
UPDATE public.subscriptions
SET
  plan_tier = CASE
    WHEN amount >= 2999 THEN 'enterprise'
    WHEN amount >= 1999 THEN 'pro'
    ELSE 'basic'
  END,
  monthly_scan_limit = CASE
    WHEN amount >= 2999 THEN -1
    WHEN amount >= 1999 THEN 100
    ELSE 25
  END
WHERE amount IS NOT NULL AND amount > 0;
