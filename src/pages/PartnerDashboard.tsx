import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { usePartnerProfile } from '@/hooks/usePartnerProfile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  LogOut,
  Settings,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { partner, loading, isPartner } = usePartnerProfile();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeOrders: 0,
    totalRevenue: 0,
    pendingCommissions: 0,
  });

  useEffect(() => {
    if (!loading && !isPartner) {
      navigate('/partner/auth');
    }
  }, [loading, isPartner, navigate]);

  useEffect(() => {
    if (partner) {
      fetchStats();
    }
  }, [partner]);

  const fetchStats = async () => {
    if (!partner) return;

    try {
      // Fetch product count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('partner_id', partner.id);

      // Fetch active orders
      const { count: ordersCount } = await supabase
        .from('partner_orders')
        .select('*', { count: 'exact', head: true })
        .eq('partner_id', partner.id)
        .in('status', ['pending', 'confirmed', 'processing', 'shipped']);

      // Fetch pending commissions
      const { data: commissionsData } = await supabase
        .from('partner_commissions')
        .select('amount')
        .eq('partner_id', partner.id)
        .eq('status', 'pending');

      const pendingTotal = commissionsData?.reduce((sum, c) => sum + Number(c.amount), 0) || 0;

      setStats({
        totalProducts: productsCount || 0,
        activeOrders: ordersCount || 0,
        totalRevenue: Number(partner.total_sales) || 0,
        pendingCommissions: pendingTotal,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/partner/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return null;
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500',
      active: 'bg-green-500',
      suspended: 'bg-red-500',
      inactive: 'bg-gray-500',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Partner Dashboard</h1>
            <p className="text-muted-foreground">{partner.business_name}</p>
          </div>
          <div className="flex gap-3">
            <Badge className={getStatusColor(partner.status)}>
              {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
            </Badge>
            <Button variant="outline" size="icon" onClick={() => navigate('/partner/settings')}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Pending Approval Alert */}
        {partner.status === 'pending' && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your partner account is pending approval. You'll be notified once it's activated.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Commission: {partner.commission_rate}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Active listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">
                Pending fulfillment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.pendingCommissions.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your partner account</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-24" 
                  variant="outline"
                  onClick={() => navigate('/partner/products/new')}
                  disabled={partner.status !== 'active'}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Add New Product
                </Button>
                <Button 
                  className="h-24" 
                  variant="outline"
                  onClick={() => navigate('/partner/orders')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  View Orders
                </Button>
                <Button 
                  className="h-24" 
                  variant="outline"
                  onClick={() => navigate('/partner/analytics')}
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>View and manage your products</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/partner/products')}>
                  Go to Products
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Process and fulfill orders</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/partner/orders')}>
                  Go to Orders
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card>
              <CardHeader>
                <CardTitle>Commission Tracking</CardTitle>
                <CardDescription>Track your earnings and payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/partner/commissions')}>
                  Go to Commissions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerDashboard;
