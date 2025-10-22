import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'staff' | 'worker' | 'partner' | null;

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setRole(roleData?.role as UserRole);
    } catch (error) {
      console.error('Error checking user role:', error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = role === 'admin';
  const isStaff = role === 'staff';
  const isWorker = role === 'worker';
  const isPartner = role === 'partner';
  const isAdminOrStaff = isAdmin || isStaff;

  return { role, loading, isAdmin, isStaff, isWorker, isPartner, isAdminOrStaff, refetch: checkUserRole };
};
