-- Create enum for the 7 worker roles
CREATE TYPE public.worker_role AS ENUM (
  'administrator',
  'threat_analyst',
  'trainer',
  'ai_developer',
  'web_designer',
  'customer_support',
  'sales_consultant'
);

-- Create worker_user_roles table for role assignments
CREATE TABLE public.worker_user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role worker_role NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- Enable RLS on worker_user_roles
ALTER TABLE public.worker_user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check worker roles (BEFORE policies)
CREATE OR REPLACE FUNCTION public.has_worker_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.worker_user_roles
    WHERE user_id = _user_id
    AND role::text = _role
  )
$$;

-- NOW create policies that use the function
CREATE POLICY "Users can view their own worker roles"
  ON public.worker_user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all worker roles"
  ON public.worker_user_roles
  FOR SELECT
  USING (has_worker_role(auth.uid(), 'administrator'));

CREATE POLICY "Only admins can assign worker roles"
  ON public.worker_user_roles
  FOR INSERT
  WITH CHECK (has_worker_role(auth.uid(), 'administrator'));

CREATE POLICY "Only admins can update worker roles"
  ON public.worker_user_roles
  FOR UPDATE
  USING (has_worker_role(auth.uid(), 'administrator'));

CREATE POLICY "Only admins can delete worker roles"
  ON public.worker_user_roles
  FOR DELETE
  USING (has_worker_role(auth.uid(), 'administrator'));

-- Add additional columns to existing profiles table if needed
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS hire_date DATE DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS profile_photo_url TEXT;