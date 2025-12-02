-- Create discount_codes table for managing promotional discount codes
CREATE TABLE IF NOT EXISTS public.discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed', 'shipping')),
  value NUMERIC NOT NULL CHECK (value > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER,
  current_uses INTEGER NOT NULL DEFAULT 0,
  min_purchase_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_dates CHECK (valid_until IS NULL OR valid_until > valid_from)
);

-- Create index for faster code lookups
CREATE INDEX idx_discount_codes_code ON public.discount_codes(code);
CREATE INDEX idx_discount_codes_active ON public.discount_codes(is_active);

-- Enable RLS
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can manage all discount codes
CREATE POLICY "Admins can manage discount codes"
ON public.discount_codes
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Policy: Public can view active discount codes (for validation)
CREATE POLICY "Public can view active discount codes"
ON public.discount_codes
FOR SELECT
USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_discount_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_discount_codes_updated_at
BEFORE UPDATE ON public.discount_codes
FOR EACH ROW
EXECUTE FUNCTION update_discount_codes_updated_at();