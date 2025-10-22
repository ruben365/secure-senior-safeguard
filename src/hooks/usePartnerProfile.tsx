import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from './useUserRole';

export interface PartnerProfile {
  id: string;
  user_id: string;
  partner_type: 'vendor' | 'affiliate' | 'distributor';
  business_name: string;
  business_email: string;
  business_phone?: string;
  business_address?: string;
  tax_id?: string;
  website_url?: string;
  logo_url?: string;
  description?: string;
  status: 'pending' | 'active' | 'suspended' | 'inactive';
  commission_rate: number;
  total_sales: number;
  total_commission: number;
  rating: number;
  total_products: number;
  metadata?: any;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

export const usePartnerProfile = () => {
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { role } = useUserRole();

  useEffect(() => {
    if (role === 'partner') {
      fetchPartnerProfile();
    } else {
      setLoading(false);
    }
  }, [role]);

  const fetchPartnerProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setPartner(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setPartner(data);
    } catch (error) {
      console.error('Error fetching partner profile:', error);
      setPartner(null);
    } finally {
      setLoading(false);
    }
  };

  const isPartner = role === 'partner' && partner !== null;
  const isActivePartner = isPartner && partner?.status === 'active';

  return { 
    partner, 
    loading, 
    isPartner, 
    isActivePartner,
    refetch: fetchPartnerProfile 
  };
};
