-- Add 'staff' role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'staff';

-- Test comment to ensure migration appears
-- This migration adds the staff role needed for the CRM system