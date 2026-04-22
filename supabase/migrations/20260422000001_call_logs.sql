-- Call logs from Retell AI voice agent
CREATE TABLE IF NOT EXISTS public.call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retell_call_id TEXT UNIQUE,
  agent_name TEXT,
  caller_phone TEXT,
  duration_seconds INTEGER,
  transcript TEXT,
  outcome TEXT,
  sentiment TEXT,
  call_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view call_logs"
  ON public.call_logs FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role can manage call_logs"
  ON public.call_logs FOR ALL
  USING (true) WITH CHECK (true);

CREATE INDEX idx_call_logs_created_at ON public.call_logs(created_at DESC);
