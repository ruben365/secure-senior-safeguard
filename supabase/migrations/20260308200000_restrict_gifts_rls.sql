-- Restrict gifts table: only authenticated users (admin) can read and delete.
-- Public INSERT is preserved so guests can submit gifts via the payment flow.
-- Public SELECT is removed to prevent guests from reading each other's gift amounts.

ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Drop any existing overly-permissive select policy if present
DROP POLICY IF EXISTS "Public can read gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can view gifts" ON public.gifts;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.gifts;

-- Allow anyone to insert (payment confirmation flow)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gifts' AND policyname = 'Anyone can insert gifts'
  ) THEN
    CREATE POLICY "Anyone can insert gifts" ON public.gifts FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Only authenticated users (admins) can read gifts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gifts' AND policyname = 'Authenticated users can view gifts'
  ) THEN
    CREATE POLICY "Authenticated users can view gifts" ON public.gifts FOR SELECT USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Only authenticated users can delete gifts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'gifts' AND policyname = 'Authenticated users can delete gifts'
  ) THEN
    CREATE POLICY "Authenticated users can delete gifts" ON public.gifts FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;
