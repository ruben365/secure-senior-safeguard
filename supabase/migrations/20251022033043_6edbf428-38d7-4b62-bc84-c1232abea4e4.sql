-- Phase 1: SaaS E-Commerce Platform - Core Database Schema

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Partner types
CREATE TYPE partner_type AS ENUM ('vendor', 'affiliate', 'distributor');

-- Partner status
CREATE TYPE partner_status AS ENUM ('pending', 'active', 'suspended', 'inactive');

-- Product status
CREATE TYPE product_status AS ENUM ('draft', 'active', 'inactive', 'out_of_stock');

-- Order status
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

-- Commission status
CREATE TYPE commission_status AS ENUM ('pending', 'approved', 'paid', 'rejected');

-- Payment status
CREATE TYPE partner_payment_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- ============================================================================
-- PARTNERS TABLE
-- ============================================================================

CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  partner_type partner_type NOT NULL,
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  business_phone TEXT,
  business_address TEXT,
  tax_id TEXT,
  website_url TEXT,
  logo_url TEXT,
  description TEXT,
  status partner_status NOT NULL DEFAULT 'pending',
  commission_rate NUMERIC(5,2) DEFAULT 10.00,
  total_sales NUMERIC(12,2) DEFAULT 0,
  total_commission NUMERIC(12,2) DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 0,
  total_products INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ============================================================================
-- PRODUCT CATEGORIES
-- ============================================================================

CREATE TABLE public.product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- PRODUCTS TABLE
-- ============================================================================

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  base_price NUMERIC(10,2) NOT NULL,
  sale_price NUMERIC(10,2),
  cost_price NUMERIC(10,2),
  status product_status NOT NULL DEFAULT 'draft',
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  weight NUMERIC(8,2),
  dimensions JSONB,
  images JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  rating_average NUMERIC(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- PRODUCT VARIANTS
-- ============================================================================

CREATE TABLE public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  variant_type TEXT NOT NULL,
  variant_value TEXT NOT NULL,
  price_adjustment NUMERIC(10,2) DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- INVENTORY TRACKING
-- ============================================================================

CREATE TABLE public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  movement_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reference_type TEXT,
  reference_id UUID,
  notes TEXT,
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- PARTNER ORDERS
-- ============================================================================

CREATE TABLE public.partner_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  status order_status NOT NULL DEFAULT 'pending',
  payment_status partner_payment_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_transaction_id TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  shipping_amount NUMERIC(10,2) DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL,
  commission_amount NUMERIC(10,2) DEFAULT 0,
  commission_rate NUMERIC(5,2),
  notes TEXT,
  tracking_number TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- ORDER ITEMS
-- ============================================================================

CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.partner_orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_sku TEXT NOT NULL,
  variant_name TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- COMMISSIONS
-- ============================================================================

CREATE TABLE public.partner_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.partner_orders(id) ON DELETE SET NULL,
  commission_type TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  rate NUMERIC(5,2),
  base_amount NUMERIC(10,2),
  status commission_status NOT NULL DEFAULT 'pending',
  description TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- COMMISSION PAYOUTS
-- ============================================================================

CREATE TABLE public.commission_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  payout_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(10,2) NOT NULL,
  commission_ids UUID[] NOT NULL,
  payment_method TEXT NOT NULL,
  payment_details JSONB,
  status partner_payment_status NOT NULL DEFAULT 'pending',
  processed_by UUID REFERENCES auth.users(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- AFFILIATE REFERRALS
-- ============================================================================

CREATE TABLE public.affiliate_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL UNIQUE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.partner_orders(id) ON DELETE SET NULL,
  referral_source TEXT,
  conversion_value NUMERIC(10,2),
  commission_earned NUMERIC(10,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_partners_user_id ON public.partners(user_id);
CREATE INDEX idx_partners_status ON public.partners(status);
CREATE INDEX idx_partners_type ON public.partners(partner_type);

CREATE INDEX idx_products_partner_id ON public.products(partner_id);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_slug ON public.products(slug);

CREATE INDEX idx_product_variants_product_id ON public.product_variants(product_id);

CREATE INDEX idx_inventory_movements_product_id ON public.inventory_movements(product_id);
CREATE INDEX idx_inventory_movements_created_at ON public.inventory_movements(created_at);

CREATE INDEX idx_partner_orders_partner_id ON public.partner_orders(partner_id);
CREATE INDEX idx_partner_orders_customer_id ON public.partner_orders(customer_id);
CREATE INDEX idx_partner_orders_status ON public.partner_orders(status);
CREATE INDEX idx_partner_orders_created_at ON public.partner_orders(created_at);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

CREATE INDEX idx_partner_commissions_partner_id ON public.partner_commissions(partner_id);
CREATE INDEX idx_partner_commissions_status ON public.partner_commissions(status);

CREATE INDEX idx_commission_payouts_partner_id ON public.commission_payouts(partner_id);

CREATE INDEX idx_affiliate_referrals_affiliate_id ON public.affiliate_referrals(affiliate_id);
CREATE INDEX idx_affiliate_referrals_code ON public.affiliate_referrals(referral_code);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE TRIGGER update_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at
  BEFORE UPDATE ON public.product_categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_orders_updated_at
  BEFORE UPDATE ON public.partner_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_partner_commissions_updated_at
  BEFORE UPDATE ON public.partner_commissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_commission_payouts_updated_at
  BEFORE UPDATE ON public.commission_payouts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;

-- Partners policies
CREATE POLICY "Partners can view their own profile"
  ON public.partners FOR SELECT
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Partners can update their own profile"
  ON public.partners FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can create partner profile"
  ON public.partners FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all partners"
  ON public.partners FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Product categories policies
CREATE POLICY "Anyone can view active categories"
  ON public.product_categories FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage categories"
  ON public.product_categories FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Products policies
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (status = 'active' OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff') OR 
         EXISTS (SELECT 1 FROM public.partners WHERE partners.id = products.partner_id AND partners.user_id = auth.uid()));

CREATE POLICY "Partners can manage their own products"
  ON public.products FOR ALL
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = products.partner_id AND partners.user_id = auth.uid()));

CREATE POLICY "Admins can manage all products"
  ON public.products FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Product variants policies
CREATE POLICY "Anyone can view active product variants"
  ON public.product_variants FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff') OR
         EXISTS (SELECT 1 FROM public.products p JOIN public.partners part ON p.partner_id = part.id 
                 WHERE p.id = product_variants.product_id AND part.user_id = auth.uid()));

CREATE POLICY "Partners can manage their product variants"
  ON public.product_variants FOR ALL
  USING (EXISTS (SELECT 1 FROM public.products p JOIN public.partners part ON p.partner_id = part.id 
                 WHERE p.id = product_variants.product_id AND part.user_id = auth.uid()));

CREATE POLICY "Admins can manage all variants"
  ON public.product_variants FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Inventory movements policies
CREATE POLICY "Partners can view their inventory movements"
  ON public.inventory_movements FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.products p JOIN public.partners part ON p.partner_id = part.id 
                 WHERE p.id = inventory_movements.product_id AND part.user_id = auth.uid()) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage inventory movements"
  ON public.inventory_movements FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Orders policies
CREATE POLICY "Partners can view their orders"
  ON public.partner_orders FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_orders.partner_id AND partners.user_id = auth.uid()) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff') OR
         customer_id = auth.uid());

CREATE POLICY "Customers can view their orders"
  ON public.partner_orders FOR SELECT
  USING (customer_id = auth.uid());

CREATE POLICY "Partners can update their orders"
  ON public.partner_orders FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_orders.partner_id AND partners.user_id = auth.uid()));

CREATE POLICY "Admins can manage all orders"
  ON public.partner_orders FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Order items policies
CREATE POLICY "Users can view order items for their orders"
  ON public.order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.partner_orders WHERE partner_orders.id = order_items.order_id AND 
                (partner_orders.customer_id = auth.uid() OR 
                 EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_orders.partner_id AND partners.user_id = auth.uid()))) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage order items"
  ON public.order_items FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Commissions policies
CREATE POLICY "Partners can view their commissions"
  ON public.partner_commissions FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_commissions.partner_id AND partners.user_id = auth.uid()) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage commissions"
  ON public.partner_commissions FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Commission payouts policies
CREATE POLICY "Partners can view their payouts"
  ON public.commission_payouts FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = commission_payouts.partner_id AND partners.user_id = auth.uid()) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can manage payouts"
  ON public.commission_payouts FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Affiliate referrals policies
CREATE POLICY "Affiliates can view their referrals"
  ON public.affiliate_referrals FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = affiliate_referrals.affiliate_id AND partners.user_id = auth.uid()) OR
         has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Affiliates can create referrals"
  ON public.affiliate_referrals FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.partners WHERE partners.id = affiliate_referrals.affiliate_id AND partners.user_id = auth.uid()));

CREATE POLICY "Admins can manage referrals"
  ON public.affiliate_referrals FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));