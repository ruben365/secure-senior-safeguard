-- ============================================
-- INVISION NETWORK DUAL PORTAL SYSTEM
-- Database Schema & RLS Policies (Fixed)
-- ============================================

-- Update Workers table with Worker ID and additional fields
ALTER TABLE public.workers 
  ADD COLUMN IF NOT EXISTS worker_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS hire_date DATE DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create sequence for Worker ID generation
CREATE SEQUENCE IF NOT EXISTS worker_id_seq START WITH 1;

-- Function to generate Worker ID in format INV-0001
CREATE OR REPLACE FUNCTION generate_worker_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  formatted_id TEXT;
BEGIN
  next_id := nextval('worker_id_seq');
  formatted_id := 'INV-' || LPAD(next_id::TEXT, 4, '0');
  RETURN formatted_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Jobs table (enhanced appointments)
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  description TEXT,
  location TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Assigned', 'In-Progress', 'Completed', 'Cancelled')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
  assigned_worker_ids UUID[] DEFAULT ARRAY[]::UUID[],
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Company Events (enhanced events table) - add visibility column
ALTER TABLE public.events 
  ADD COLUMN IF NOT EXISTS visibility TEXT DEFAULT 'All' CHECK (visibility IN ('All', 'Workers', 'Admins'));

-- Messages table (enhanced internal_messages)
ALTER TABLE public.internal_messages
  ADD COLUMN IF NOT EXISTS sender_role TEXT DEFAULT 'Admin' CHECK (sender_role IN ('Admin', 'Worker'));

-- Reports Snapshots table
CREATE TABLE IF NOT EXISTS public.reports_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period TEXT NOT NULL CHECK (period IN ('day', 'week', 'month')),
  date_range_start DATE NOT NULL,
  date_range_end DATE NOT NULL,
  kpis JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Jobs
CREATE POLICY "Admins can manage all jobs"
  ON public.jobs
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Workers can view their assigned jobs"
  ON public.jobs
  FOR SELECT
  USING (auth.uid() = ANY(assigned_worker_ids));

CREATE POLICY "Workers can update their assigned jobs status"
  ON public.jobs
  FOR UPDATE
  USING (auth.uid() = ANY(assigned_worker_ids))
  WITH CHECK (auth.uid() = ANY(assigned_worker_ids));

-- RLS Policies for Reports
CREATE POLICY "Admins can manage reports"
  ON public.reports_snapshots
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Update trigger for jobs
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed US Federal + Ohio Holidays for 2025-2026 using existing event_type 'task'
-- (we'll use 'task' type and mark them with visibility='All' and description='Federal Holiday')
INSERT INTO public.events (title, event_type, description, scheduled_at, status, visibility)
VALUES
  -- 2025 Federal Holidays
  ('New Year''s Day', 'task', 'Federal Holiday', '2025-01-01 00:00:00+00', 'scheduled', 'All'),
  ('Martin Luther King Jr. Day', 'task', 'Federal Holiday', '2025-01-20 00:00:00+00', 'scheduled', 'All'),
  ('Presidents Day', 'task', 'Federal Holiday', '2025-02-17 00:00:00+00', 'scheduled', 'All'),
  ('Memorial Day', 'task', 'Federal Holiday', '2025-05-26 00:00:00+00', 'scheduled', 'All'),
  ('Juneteenth', 'task', 'Federal Holiday', '2025-06-19 00:00:00+00', 'scheduled', 'All'),
  ('Independence Day', 'task', 'Federal Holiday', '2025-07-04 00:00:00+00', 'scheduled', 'All'),
  ('Labor Day', 'task', 'Federal Holiday', '2025-09-01 00:00:00+00', 'scheduled', 'All'),
  ('Veterans Day', 'task', 'Federal Holiday', '2025-11-11 00:00:00+00', 'scheduled', 'All'),
  ('Thanksgiving Day', 'task', 'Federal Holiday', '2025-11-27 00:00:00+00', 'scheduled', 'All'),
  ('Christmas Day', 'task', 'Federal Holiday', '2025-12-25 00:00:00+00', 'scheduled', 'All'),
  -- 2026 Federal Holidays
  ('New Year''s Day', 'task', 'Federal Holiday', '2026-01-01 00:00:00+00', 'scheduled', 'All'),
  ('Martin Luther King Jr. Day', 'task', 'Federal Holiday', '2026-01-19 00:00:00+00', 'scheduled', 'All'),
  ('Presidents Day', 'task', 'Federal Holiday', '2026-02-16 00:00:00+00', 'scheduled', 'All'),
  ('Memorial Day', 'task', 'Federal Holiday', '2026-05-25 00:00:00+00', 'scheduled', 'All'),
  ('Juneteenth', 'task', 'Federal Holiday', '2026-06-19 00:00:00+00', 'scheduled', 'All'),
  ('Independence Day', 'task', 'Federal Holiday', '2026-07-04 00:00:00+00', 'scheduled', 'All'),
  ('Labor Day', 'task', 'Federal Holiday', '2026-09-07 00:00:00+00', 'scheduled', 'All'),
  ('Veterans Day', 'task', 'Federal Holiday', '2026-11-11 00:00:00+00', 'scheduled', 'All'),
  ('Thanksgiving Day', 'task', 'Federal Holiday', '2026-11-26 00:00:00+00', 'scheduled', 'All'),
  ('Christmas Day', 'task', 'Federal Holiday', '2026-12-25 00:00:00+00', 'scheduled', 'All'),
  -- Sample Company Events
  ('Quarterly Training', 'meeting', 'Company-wide training session', '2025-03-15 09:00:00+00', 'scheduled', 'All'),
  ('Town Hall Meeting', 'meeting', 'Monthly town hall', '2025-02-10 14:00:00+00', 'scheduled', 'All'),
  ('System Maintenance', 'task', 'Scheduled system maintenance', '2025-02-20 02:00:00+00', 'scheduled', 'All')
ON CONFLICT DO NOTHING;