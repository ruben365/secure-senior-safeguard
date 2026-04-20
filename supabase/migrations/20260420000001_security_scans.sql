-- Security scans table for the website vulnerability scanner
CREATE TABLE IF NOT EXISTS public.security_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  scan_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  grade TEXT CHECK (grade IN ('A', 'B', 'C', 'D', 'F')),
  score INTEGER CHECK (score BETWEEN 0 AND 100),
  results_json JSONB NOT NULL DEFAULT '{}',
  ai_analysis TEXT,
  client_name TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  scan_duration_ms INTEGER
);

-- Indexes
CREATE INDEX idx_security_scans_created_by ON public.security_scans(created_by);
CREATE INDEX idx_security_scans_domain ON public.security_scans(domain);
CREATE INDEX idx_security_scans_scan_date ON public.security_scans(scan_date DESC);

-- RLS
ALTER TABLE public.security_scans ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "admins_full_access_security_scans"
  ON public.security_scans
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Public scans are readable by anyone (for the lead-magnet public scanner)
CREATE POLICY "public_scans_readable"
  ON public.security_scans
  FOR SELECT
  TO anon
  USING (is_public = TRUE);
