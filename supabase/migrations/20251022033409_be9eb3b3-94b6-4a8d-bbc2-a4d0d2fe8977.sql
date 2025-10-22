-- Add partner role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'partner';

-- Helper function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$;

-- Helper function to generate payout numbers
CREATE OR REPLACE FUNCTION public.generate_payout_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'PAY-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$;

-- Function to update partner stats
CREATE OR REPLACE FUNCTION public.update_partner_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.partners
    SET 
      total_sales = COALESCE((
        SELECT SUM(total_amount)
        FROM public.partner_orders
        WHERE partner_id = NEW.partner_id
        AND status NOT IN ('cancelled', 'refunded')
      ), 0),
      total_commission = COALESCE((
        SELECT SUM(amount)
        FROM public.partner_commissions
        WHERE partner_id = NEW.partner_id
        AND status = 'paid'
      ), 0),
      updated_at = NOW()
    WHERE id = NEW.partner_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to update partner stats on order changes
CREATE TRIGGER update_partner_stats_on_order
  AFTER INSERT OR UPDATE ON public.partner_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_partner_stats();

-- Trigger to update partner stats on commission changes
CREATE TRIGGER update_partner_stats_on_commission
  AFTER INSERT OR UPDATE ON public.partner_commissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_partner_stats();