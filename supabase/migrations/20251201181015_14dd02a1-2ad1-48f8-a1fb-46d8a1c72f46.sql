-- Add stripe_price_id column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;