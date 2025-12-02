-- Fix search_path for discount_codes trigger function
CREATE OR REPLACE FUNCTION update_discount_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;