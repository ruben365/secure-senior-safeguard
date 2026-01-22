-- Fix rls_policy_status view to use security_invoker
DROP VIEW IF EXISTS public.rls_policy_status;

CREATE VIEW public.rls_policy_status
WITH (security_invoker = true) AS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;