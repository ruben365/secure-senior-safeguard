import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StaffManagement = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          worker_user_roles (role)
        `);

      if (error) throw error;
      setStaff(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatRole = (role: string) => {
    return role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Staff Management</CardTitle>
        <Button size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : staff.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No staff members found</div>
        ) : (
          <div className="space-y-4">
            {staff.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{member.username}</p>
                  <div className="flex gap-2 mt-1">
                    {member.worker_user_roles?.map((r: any, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {formatRole(r.role)}
                      </Badge>
                    ))}
                    {!member.worker_user_roles?.length && (
                      <Badge variant="outline" className="text-xs">No Role</Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
