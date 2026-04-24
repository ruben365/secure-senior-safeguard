-- Fix RLS: restrict SELECT on web_design_orders and web_design_quotes to admin only.
-- web_design_orders: drop the open SELECT policy (no SELECT policy = only service_role can read)
DROP POLICY IF EXISTS "web_design_orders_select" ON public.web_design_orders;

-- web_design_quotes: drop the overly broad authenticated policy, replace with service_role only
DROP POLICY IF EXISTS "web_design_quotes_select_admin" ON public.web_design_quotes;

-- Service_role bypasses RLS by default. Explicit policies below prevent authenticated
-- (non-admin) users from reading these tables through the client-side API.
CREATE POLICY "web_design_orders_select_admin" ON public.web_design_orders
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "web_design_quotes_select_admin" ON public.web_design_quotes
  FOR SELECT USING (auth.role() = 'service_role');
