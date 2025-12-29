import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  CheckCircle, 
  Lock, 
  Server, 
  Clock, 
  Zap,
  HeadphonesIcon,
  Database,
  Globe,
  TrendingUp,
  AlertTriangle,
  Users,
  CreditCard,
  QrCode
} from "lucide-react";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";

interface WebsiteInsuranceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InsuranceFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  category: 'security' | 'support' | 'performance' | 'backup';
  popular?: boolean;
}

const insuranceFeatures: InsuranceFeature[] = [
  // Security Features
  {
    id: 'ssl',
    name: 'SSL Certificate Management',
    description: 'Auto-renewal and monitoring of SSL certificates',
    price: 0,
    icon: <Lock className="w-4 h-4" />,
    category: 'security',
  },
  {
    id: 'security-monitoring',
    name: 'Security Monitoring',
    description: '24/7 threat detection and alerts',
    price: 10,
    icon: <Shield className="w-4 h-4" />,
    category: 'security',
    popular: true,
  },
  {
    id: 'malware-removal',
    name: 'Malware Removal & Cleanup',
    description: 'Immediate response to security breaches',
    price: 15,
    icon: <AlertTriangle className="w-4 h-4" />,
    category: 'security',
  },
  {
    id: 'ddos-protection',
    name: 'DDoS Protection',
    description: 'Enterprise-grade attack mitigation',
    price: 25,
    icon: <Server className="w-4 h-4" />,
    category: 'security',
  },
  // Backup Features
  {
    id: 'weekly-backup',
    name: 'Weekly Backups',
    description: 'Automated weekly site backups',
    price: 0,
    icon: <Database className="w-4 h-4" />,
    category: 'backup',
  },
  {
    id: 'daily-backup',
    name: 'Daily Backups',
    description: 'Daily automated backups with 30-day retention',
    price: 10,
    icon: <Database className="w-4 h-4" />,
    category: 'backup',
    popular: true,
  },
  {
    id: 'realtime-backup',
    name: 'Real-Time Backups',
    description: 'Continuous backup with instant restore',
    price: 20,
    icon: <Zap className="w-4 h-4" />,
    category: 'backup',
  },
  // Support Features
  {
    id: 'email-support',
    name: 'Email Support',
    description: '48-hour response time',
    price: 0,
    icon: <HeadphonesIcon className="w-4 h-4" />,
    category: 'support',
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    description: '4-hour response time with phone support',
    price: 15,
    icon: <HeadphonesIcon className="w-4 h-4" />,
    category: 'support',
    popular: true,
  },
  {
    id: '24-7-support',
    name: '24/7 Dedicated Support',
    description: 'Round-the-clock support with dedicated manager',
    price: 35,
    icon: <Users className="w-4 h-4" />,
    category: 'support',
  },
  // Performance Features
  {
    id: 'uptime-monitoring',
    name: 'Uptime Monitoring',
    description: '5-minute interval checks with alerts',
    price: 5,
    icon: <Clock className="w-4 h-4" />,
    category: 'performance',
  },
  {
    id: 'performance-optimization',
    name: 'Performance Optimization',
    description: 'Monthly speed audits and optimization',
    price: 20,
    icon: <TrendingUp className="w-4 h-4" />,
    category: 'performance',
  },
  {
    id: 'cdn-integration',
    name: 'Global CDN',
    description: 'Worldwide content delivery network',
    price: 15,
    icon: <Globe className="w-4 h-4" />,
    category: 'performance',
  },
];

const BASE_PRICE = 29;
const MAX_PRICE = 149;

// Preset packages with new pricing
const packages = [
  {
    name: 'Essential',
    price: 29,
    priceId: 'price_1Sjp3RJ8osfwYbX7TZXQBNHK',
    features: ['ssl', 'weekly-backup', 'email-support'],
    badge: 'STARTER',
    badgeColor: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Professional',
    price: 49,
    priceId: 'price_1Sjp3TJ8osfwYbX7IgL3rhHZ',
    features: ['ssl', 'security-monitoring', 'daily-backup', 'priority-support', 'uptime-monitoring'],
    badge: 'POPULAR',
    badgeColor: 'from-primary to-accent',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    priceId: 'price_1Sjp3VJ8osfwYbX7Cyuetu6U',
    features: ['ssl', 'security-monitoring', 'malware-removal', 'ddos-protection', 'realtime-backup', '24-7-support', 'uptime-monitoring', 'performance-optimization', 'cdn-integration'],
    badge: 'ENTERPRISE',
    badgeColor: 'from-amber-500 to-orange-500',
  },
];

export const WebsiteInsuranceDialog = ({
  open,
  onOpenChange,
}: WebsiteInsuranceDialogProps) => {
  const { toast } = useToast();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['ssl', 'weekly-backup', 'email-support']);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'packages' | 'custom'>('packages');
  const [step, setStep] = useState<'select' | 'checkout'>('select');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPackage, setSelectedPackageState] = useState<typeof packages[0] | null>(null);

  const totalPrice = useMemo(() => {
    const featuresTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = insuranceFeatures.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    return Math.min(BASE_PRICE + featuresTotal, MAX_PRICE);
  }, [selectedFeatures]);

  const pricePercentage = useMemo(() => {
    return ((totalPrice - BASE_PRICE) / (MAX_PRICE - BASE_PRICE)) * 100;
  }, [totalPrice]);

  const toggleFeature = (featureId: string) => {
    const feature = insuranceFeatures.find(f => f.id === featureId);
    if (feature?.price === 0) return;

    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      }
      return [...prev, featureId];
    });
  };

  const selectPackage = (pkg: typeof packages[0]) => {
    setSelectedPackageState(pkg);
    setSelectedFeatures(pkg.features);
    setStep('checkout');
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Find matching package or use custom
      const matchingPackage = selectedPackage || packages.find(p => 
        JSON.stringify(p.features.sort()) === JSON.stringify(selectedFeatures.sort())
      );
      
      const finalPriceId = matchingPackage?.priceId || 'price_1Sjp3WJ8osfwYbX7cbaYjIqU'; // Custom price ID
      
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: {
          priceId: finalPriceId,
          serviceName: 'Website Insurance',
          planTier: matchingPackage?.name || 'Custom',
          customerEmail: email,
          customerName: name || undefined,
        },
      });

      if (error) throw error;

      if (data?.url) {
        trackConversion('website_insurance', matchingPackage?.price || totalPrice);
        window.open(data.url, '_blank');
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const groupedFeatures = useMemo(() => {
    return {
      security: insuranceFeatures.filter(f => f.category === 'security'),
      backup: insuranceFeatures.filter(f => f.category === 'backup'),
      support: insuranceFeatures.filter(f => f.category === 'support'),
      performance: insuranceFeatures.filter(f => f.category === 'performance'),
    };
  }, []);

  const resetDialog = () => {
    setStep('select');
    setSelectedPackageState(null);
    setSelectedFeatures(['ssl', 'weekly-backup', 'email-support']);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) resetDialog();
    }}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Website Insurance
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              Secure Payment
            </Badge>
          </div>
          <DialogTitle className="text-2xl">
            {step === 'select' ? 'Protect Your Website Investment' : 'Complete Your Subscription'}
          </DialogTitle>
          <DialogDescription>
            {step === 'select' 
              ? 'Comprehensive protection starting at $29/month. Select a package or customize your coverage.'
              : `Subscribe to ${selectedPackage?.name || 'Custom'} Plan - $${selectedPackage?.price || totalPrice}/month`
            }
          </DialogDescription>
        </DialogHeader>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center gap-3 py-3 border-y border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle className="w-3.5 h-3.5 text-success" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-success" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-success" />
            <span>256-bit Encryption</span>
          </div>
        </div>

        {step === 'select' ? (
          <>
            {/* View Toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={view === 'packages' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('packages')}
              >
                Preset Packages
              </Button>
              <Button
                variant={view === 'custom' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('custom')}
              >
                Build Custom
              </Button>
            </div>

            {view === 'packages' ? (
              /* Preset Packages View */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.name} 
                    className={`p-4 relative cursor-pointer transition-all hover:-translate-y-1 overflow-visible pt-6 ${
                      pkg.popular ? 'border-2 border-primary shadow-[0_4px_20px_rgba(139,92,246,0.15)]' : ''
                    }`}
                    onClick={() => selectPackage(pkg)}
                  >
                    {pkg.badge && (
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r ${pkg.badgeColor} text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-md z-10`}>
                        {pkg.badge}
                      </div>
                    )}
                    <h4 className="font-bold text-lg mt-1 mb-1">{pkg.name}</h4>
                    <p className="text-2xl font-bold text-primary mb-3">
                      ${pkg.price}<span className="text-sm text-muted-foreground font-normal">/mo</span>
                    </p>
                    <ul className="space-y-1.5 mb-4 text-sm">
                      {pkg.features.slice(0, 5).map(featureId => {
                        const feature = insuranceFeatures.find(f => f.id === featureId);
                        return feature ? (
                          <li key={featureId} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-success flex-shrink-0" />
                            <span className="text-muted-foreground">{feature.name}</span>
                          </li>
                        ) : null;
                      })}
                      {pkg.features.length > 5 && (
                        <li className="text-xs text-muted-foreground">
                          +{pkg.features.length - 5} more features
                        </li>
                      )}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        trackButtonClick(`Subscribe - ${pkg.name}`, 'Website Insurance');
                        selectPackage(pkg);
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              /* Custom Build View */
              <div className="space-y-4">
                {/* Price Display */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Your Monthly Price</span>
                    <span className="text-3xl font-bold text-primary">${totalPrice}/mo</span>
                  </div>
                  <Progress value={pricePercentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$29 Essential</span>
                    <span>$149 Max</span>
                  </div>
                </div>

                {/* Feature Categories */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {Object.entries(groupedFeatures).map(([category, features]) => (
                    <div key={category}>
                      <h4 className="font-semibold capitalize mb-2 flex items-center gap-2">
                        {category === 'security' && <Shield className="w-4 h-4 text-primary" />}
                        {category === 'backup' && <Database className="w-4 h-4 text-primary" />}
                        {category === 'support' && <HeadphonesIcon className="w-4 h-4 text-primary" />}
                        {category === 'performance' && <TrendingUp className="w-4 h-4 text-primary" />}
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((feature) => (
                          <div
                            key={feature.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              selectedFeatures.includes(feature.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            } ${feature.price === 0 ? 'opacity-75 cursor-default' : ''}`}
                            onClick={() => toggleFeature(feature.id)}
                          >
                            <Checkbox
                              checked={selectedFeatures.includes(feature.id)}
                              disabled={feature.price === 0}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                {feature.icon}
                                <span className="font-medium text-sm">{feature.name}</span>
                                {feature.popular && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                            </div>
                            <span className={`text-sm font-semibold ${feature.price === 0 ? 'text-success' : 'text-foreground'}`}>
                              {feature.price === 0 ? 'Included' : `+$${feature.price}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Subscribe Button */}
                <Button 
                  className="w-full h-12 text-base"
                  onClick={() => setStep('checkout')}
                >
                  Continue to Checkout - ${totalPrice}/mo
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Checkout Step */
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="flex justify-between items-center mb-2">
                <span>{selectedPackage?.name || 'Custom'} Plan</span>
                <span className="font-bold">${selectedPackage?.price || totalPrice}/mo</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {selectedFeatures.length} features included
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h4 className="font-semibold">Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-primary/5">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Credit/Debit Card</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                  <QrCode className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">QR Code</p>
                    <p className="text-xs text-muted-foreground">Scan to pay</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                You'll be redirected to our secure payment page to complete your subscription
              </p>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep('select')}
              >
                Back
              </Button>
              <Button 
                className="flex-1 h-12"
                onClick={handleSubscribe}
                disabled={loading || !email}
              >
                {loading ? 'Processing...' : `Subscribe Now - $${selectedPackage?.price || totalPrice}/mo`}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
