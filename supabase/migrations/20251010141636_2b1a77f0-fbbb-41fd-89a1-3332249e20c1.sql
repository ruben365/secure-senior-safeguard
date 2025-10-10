-- Add worker role to existing enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'worker';