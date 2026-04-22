-- Ensure profiles.account_status has proper constraints for approval workflow
-- The column already exists (added in earlier migration), this just adds the index

CREATE INDEX IF NOT EXISTS idx_profiles_account_status
  ON public.profiles(account_status);

-- Notify admin when a new pending account is created (via pg_notify)
CREATE OR REPLACE FUNCTION public.notify_new_pending_account()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.account_status = 'pending' AND (TG_OP = 'INSERT' OR OLD.account_status IS DISTINCT FROM 'pending') THEN
    PERFORM pg_notify('new_pending_account', json_build_object(
      'user_id', NEW.id,
      'email', NEW.email,
      'name', COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
    )::text);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_notify_new_pending_account ON public.profiles;
CREATE TRIGGER trigger_notify_new_pending_account
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_pending_account();
