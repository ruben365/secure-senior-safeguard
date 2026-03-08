
-- Create faqs table
CREATE TABLE public.faqs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  question_fr text,
  question_es text,
  answer text NOT NULL,
  answer_fr text,
  answer_es text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update faqs" ON public.faqs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete faqs" ON public.faqs FOR DELETE TO authenticated USING (true);

-- Create site_settings table (key-value)
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete site_settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

-- Create venue_schedule table
CREATE TABLE public.venue_schedule (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  time text NOT NULL,
  icon text NOT NULL DEFAULT '✨',
  label text NOT NULL,
  label_fr text,
  label_es text,
  color text NOT NULL DEFAULT 'text-primary',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.venue_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view venue_schedule" ON public.venue_schedule FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert venue_schedule" ON public.venue_schedule FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update venue_schedule" ON public.venue_schedule FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete venue_schedule" ON public.venue_schedule FOR DELETE TO authenticated USING (true);

-- Create venue_hotels table
CREATE TABLE public.venue_hotels (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  stars integer NOT NULL DEFAULT 3,
  distance text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '€€',
  url text NOT NULL DEFAULT '#',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.venue_hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view venue_hotels" ON public.venue_hotels FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert venue_hotels" ON public.venue_hotels FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update venue_hotels" ON public.venue_hotels FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete venue_hotels" ON public.venue_hotels FOR DELETE TO authenticated USING (true);

-- Create venue_transport table
CREATE TABLE public.venue_transport (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,
  icon text NOT NULL DEFAULT 'Car',
  description text NOT NULL DEFAULT '',
  description_fr text,
  description_es text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.venue_transport ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view venue_transport" ON public.venue_transport FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert venue_transport" ON public.venue_transport FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update venue_transport" ON public.venue_transport FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete venue_transport" ON public.venue_transport FOR DELETE TO authenticated USING (true);

-- Also update guestbook SELECT policy to allow authenticated users to see all entries
CREATE POLICY "Authenticated users can view all guestbook" ON public.guestbook FOR SELECT TO authenticated USING (true);

-- Also update photos SELECT policy to allow authenticated users to see all entries
CREATE POLICY "Authenticated users can view all photos" ON public.photos FOR SELECT TO authenticated USING (true);
