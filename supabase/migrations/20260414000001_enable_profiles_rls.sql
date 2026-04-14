-- Enable RLS on profiles table (was missing explicit enablement)
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- Ensure users can only read/update their own profile
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'users_own_profile_select') THEN
    CREATE POLICY "users_own_profile_select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'users_own_profile_update') THEN
    CREATE POLICY "users_own_profile_update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
  END IF;
END $$;
