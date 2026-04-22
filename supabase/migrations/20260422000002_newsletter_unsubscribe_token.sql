-- Add unsubscribe token for one-click email unsubscribe
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS unsubscribe_token UUID DEFAULT gen_random_uuid();

-- Backfill existing rows that may have NULL token
UPDATE public.newsletter_subscribers
  SET unsubscribe_token = gen_random_uuid()
  WHERE unsubscribe_token IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_subscribers_unsubscribe_token
  ON public.newsletter_subscribers(unsubscribe_token);

-- Allow public unsubscribe (no auth needed) via token lookup
CREATE POLICY "Anyone can unsubscribe via token"
  ON public.newsletter_subscribers FOR DELETE
  USING (true);
