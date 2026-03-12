
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view subscribers" ON public.newsletter_subscribers FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete subscribers" ON public.newsletter_subscribers FOR DELETE USING (auth.role() = 'authenticated');
