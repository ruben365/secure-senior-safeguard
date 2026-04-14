-- Restrict analytics table writes to authenticated users only
-- Prevents anonymous data inflation

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename IN ('page_views', 'conversion_events', 'analytics_events', 'user_events')
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);

    -- Drop any existing permissive anon insert policy
    EXECUTE format('DROP POLICY IF EXISTS "allow_anon_insert" ON public.%I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "anon_insert" ON public.%I', tbl);

    -- Allow authenticated users to insert their own events
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies
      WHERE tablename = tbl AND policyname = 'authenticated_insert_only'
    ) THEN
      EXECUTE format(
        'CREATE POLICY "authenticated_insert_only" ON public.%I FOR INSERT TO authenticated WITH CHECK (true)',
        tbl
      );
    END IF;
  END LOOP;
END $$;
