-- Create enum types for various status fields
CREATE TYPE public.service_category AS ENUM ('training', 'consultation', 'support', 'maintenance', 'other');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.request_status AS ENUM ('new', 'assigned', 'completed', 'cancelled');
CREATE TYPE public.message_type AS ENUM ('direct', 'broadcast', 'announcement');
CREATE TYPE public.time_off_status AS ENUM ('pending', 'approved', 'denied');
CREATE TYPE public.worker_status AS ENUM ('available', 'busy', 'off_duty', 'on_break');
CREATE TYPE public.notification_type AS ENUM ('job_assignment', 'schedule_change', 'new_message', 'appointment_reminder', 'time_off_response', 'system');

-- Clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  notes TEXT,
  tags TEXT[], -- VIP, Regular, New, etc.
  total_spent NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Workers table (extends user_roles)
CREATE TABLE public.workers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  profile_photo_url TEXT,
  skills TEXT[],
  certifications TEXT[],
  hourly_rate NUMERIC,
  current_status worker_status DEFAULT 'off_duty',
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Services table
CREATE TABLE public.service_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category service_category NOT NULL,
  base_price NUMERIC,
  estimated_duration_minutes INTEGER,
  required_skills TEXT[],
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Client requests/inquiries
CREATE TABLE public.client_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL, -- For new clients not yet in system
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_type TEXT NOT NULL,
  preferred_date TIMESTAMPTZ,
  preferred_time TEXT,
  description TEXT,
  status request_status DEFAULT 'new',
  priority BOOLEAN DEFAULT FALSE,
  assigned_worker_id UUID REFERENCES public.workers(id),
  internal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Appointments/Jobs
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES public.workers(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.service_catalog(id),
  title TEXT NOT NULL,
  description TEXT,
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  location TEXT,
  is_virtual BOOLEAN DEFAULT FALSE,
  zoom_link TEXT,
  status appointment_status DEFAULT 'pending',
  special_instructions TEXT,
  completion_notes TEXT,
  client_signature TEXT,
  attachments JSONB, -- Array of file URLs
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Worker availability schedules
CREATE TABLE public.worker_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_recurring BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Time off requests
CREATE TABLE public.time_off_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  notes TEXT,
  status time_off_status DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Internal messages
CREATE TABLE public.internal_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message_type message_type DEFAULT 'direct',
  subject TEXT,
  body TEXT NOT NULL,
  attachments JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_urgent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID, -- ID of related appointment, message, etc.
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Client communication log
CREATE TABLE public.client_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id),
  subject TEXT,
  body TEXT NOT NULL,
  attachments JSONB,
  is_from_client BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Website inquiries (newsletter, contact forms, etc.)
CREATE TABLE public.website_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type TEXT NOT NULL, -- 'newsletter', 'contact', 'zoom_request', 'service_inquiry'
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  preferred_time TEXT,
  metadata JSONB, -- Flexible field for additional data
  is_processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activity log for auditing
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- 'appointment', 'client', 'worker', etc.
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_off_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Admin/Manager access
CREATE POLICY "Admins and managers can view all clients"
  ON public.clients FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and managers can manage clients"
  ON public.clients FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and managers can view all workers"
  ON public.workers FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can view their own profile"
  ON public.workers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins and managers can manage workers"
  ON public.workers FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can update their own profile"
  ON public.workers FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view active services"
  ON public.service_catalog FOR SELECT
  USING (active = TRUE OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage services"
  ON public.service_catalog FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and managers can view all requests"
  ON public.client_requests FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and managers can manage requests"
  ON public.client_requests FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins and managers can view all appointments"
  ON public.appointments FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can view their own appointments"
  ON public.appointments FOR SELECT
  USING (auth.uid() = worker_id);

CREATE POLICY "Admins and managers can manage appointments"
  ON public.appointments FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can update their assigned appointments"
  ON public.appointments FOR UPDATE
  USING (auth.uid() = worker_id);

CREATE POLICY "Admins can view all availability"
  ON public.worker_availability FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can view their availability"
  ON public.worker_availability FOR SELECT
  USING (auth.uid() = worker_id);

CREATE POLICY "Admins can manage availability"
  ON public.worker_availability FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can manage their availability"
  ON public.worker_availability FOR ALL
  USING (auth.uid() = worker_id);

CREATE POLICY "Admins can view all time off requests"
  ON public.time_off_requests FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can view their time off requests"
  ON public.time_off_requests FOR SELECT
  USING (auth.uid() = worker_id);

CREATE POLICY "Admins can manage time off requests"
  ON public.time_off_requests FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Workers can create time off requests"
  ON public.time_off_requests FOR INSERT
  WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "Users can view messages sent to them"
  ON public.internal_messages FOR SELECT
  USING (auth.uid() = recipient_id OR auth.uid() = sender_id);

CREATE POLICY "Users can send messages"
  ON public.internal_messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON public.internal_messages FOR UPDATE
  USING (auth.uid() = recipient_id);

CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all client communications"
  ON public.client_communications FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage client communications"
  ON public.client_communications FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Anyone can create website inquiries"
  ON public.website_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view website inquiries"
  ON public.website_inquiries FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage website inquiries"
  ON public.website_inquiries FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can view activity log"
  ON public.activity_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_appointments_worker_id ON public.appointments(worker_id);
CREATE INDEX idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX idx_appointments_scheduled_start ON public.appointments(scheduled_start);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id, is_read);
CREATE INDEX idx_messages_recipient ON public.internal_messages(recipient_id, is_read);
CREATE INDEX idx_client_requests_status ON public.client_requests(status);

-- Create trigger for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workers_updated_at BEFORE UPDATE ON public.workers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_requests_updated_at BEFORE UPDATE ON public.client_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_catalog_updated_at BEFORE UPDATE ON public.service_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique request numbers
CREATE OR REPLACE FUNCTION generate_request_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'REQ-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.internal_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.workers;