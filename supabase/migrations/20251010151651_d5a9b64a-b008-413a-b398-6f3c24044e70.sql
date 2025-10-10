-- Fix security warning: Function Search Path Mutable
CREATE OR REPLACE FUNCTION generate_worker_id()
RETURNS TEXT 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_id INTEGER;
  formatted_id TEXT;
BEGIN
  next_id := nextval('worker_id_seq');
  formatted_id := 'INV-' || LPAD(next_id::TEXT, 4, '0');
  RETURN formatted_id;
END;
$$;