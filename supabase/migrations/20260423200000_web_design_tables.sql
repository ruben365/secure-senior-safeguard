-- Web Design Orders: tracks checkout sessions for website design packages
CREATE TABLE IF NOT EXISTS public.web_design_orders (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email        TEXT,
  package_type      TEXT        NOT NULL,
  package_price     INTEGER     NOT NULL,
  add_ons           JSONB       NOT NULL DEFAULT '[]'::jsonb,
  total_price       INTEGER     NOT NULL,
  stripe_session_id TEXT,
  status            TEXT        NOT NULL DEFAULT 'pending',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.web_design_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "web_design_orders_insert" ON public.web_design_orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "web_design_orders_select" ON public.web_design_orders
  FOR SELECT USING (true);

-- Web Design Quotes: stores quote request form submissions
CREATE TABLE IF NOT EXISTS public.web_design_quotes (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  business_type    TEXT,
  website_type     TEXT,
  num_pages        INTEGER,
  features_needed  JSONB       NOT NULL DEFAULT '[]'::jsonb,
  budget_range     TEXT,
  message          TEXT,
  status           TEXT        NOT NULL DEFAULT 'new',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.web_design_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "web_design_quotes_insert" ON public.web_design_quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "web_design_quotes_select_admin" ON public.web_design_quotes
  FOR SELECT USING (auth.role() = 'authenticated');
