-- Drop permissive INSERT policy if it exists
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
DROP POLICY IF EXISTS "users_can_insert_own_role" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert own role once" ON public.user_roles;

-- Only admins can assign roles (prevents privilege escalation)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'only_admins_can_assign_roles') THEN
    CREATE POLICY "only_admins_can_assign_roles" ON public.user_roles
    FOR INSERT TO authenticated
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.user_roles ur
        WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
      )
    );
  END IF;
END $$;
