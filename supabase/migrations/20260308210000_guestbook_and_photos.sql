-- Guestbook table: public can insert and read approved messages
CREATE TABLE IF NOT EXISTS public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guestbook' AND policyname = 'Anyone can read approved guestbook entries') THEN
    CREATE POLICY "Anyone can read approved guestbook entries" ON public.guestbook
      FOR SELECT USING (approved = true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guestbook' AND policyname = 'Anyone can insert guestbook entries') THEN
    CREATE POLICY "Anyone can insert guestbook entries" ON public.guestbook
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'guestbook' AND policyname = 'Authenticated users can manage guestbook') THEN
    CREATE POLICY "Authenticated users can manage guestbook" ON public.guestbook
      FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Photos table for gallery uploads
CREATE TABLE IF NOT EXISTS public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photos' AND policyname = 'Anyone can read approved photos') THEN
    CREATE POLICY "Anyone can read approved photos" ON public.photos
      FOR SELECT USING (approved = true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photos' AND policyname = 'Anyone can insert photos') THEN
    CREATE POLICY "Anyone can insert photos" ON public.photos
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'photos' AND policyname = 'Authenticated users can manage photos') THEN
    CREATE POLICY "Authenticated users can manage photos" ON public.photos
      FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;
