import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, DollarSign, Building2 } from "lucide-react";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'sponsor' | 'monthly' | 'corporate' | 'general';
}

export const DonationModal = ({ open, onOpenChange, type = 'general' }: DonationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    type === 'sponsor' ? 100 : type === 'monthly' ? 25 : null
  );
  const [formData, setFormData] = useState({
    donor_name: '',
    email: '',
    phone: '',
    message: '',
    sponsor_info: '',
    recipient_info: '',
    company_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('donations').insert([
        {
          donor_name: formData.donor_name,
          email: formData.email,
          amount: selectedAmount || 0,
          donation_type: donationType,
          message: `${formData.message}\n\nType: ${type}\n${
            type === 'sponsor' ? `Sponsor: ${formData.sponsor_info}\nRecipient: ${formData.recipient_info}` : ''
          }${type === 'corporate' ? `Company: ${formData.company_name}` : ''}`,
          payment_status: 'pending',
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank you for your donation!",
        description: "We'll contact you shortly with payment details.",
      });

      onOpenChange(false);
      setFormData({
        donor_name: '',
        email: '',
        phone: '',
        message: '',
        sponsor_info: '',
        recipient_info: '',
        company_name: '',
      });
      setSelectedAmount(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'sponsor':
        return 'Sponsor a Seat';
      case 'monthly':
        return 'Monthly Ally Program';
      case 'corporate':
        return 'Corporate Partnership';
      default:
        return 'Make a Donation';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'sponsor':
        return <Users className="w-8 h-8 text-primary" />;
      case 'monthly':
        return <DollarSign className="w-8 h-8 text-accent" />;
      case 'corporate':
        return <Building2 className="w-8 h-8 text-secondary-foreground" />;
      default:
        return <DollarSign className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">{getIcon()}</div>
            <DialogTitle className="text-2xl">{getTitle()}</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Donation Type Selection */}
          {type !== 'monthly' && (
            <div className="space-y-3">
              <Label>Donation Type</Label>
              <RadioGroup value={donationType} onValueChange={(value: any) => setDonationType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time" className="cursor-pointer">One-Time Donation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">Monthly Subscription</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Amount Selection */}
          <div className="space-y-3">
            <Label>Amount</Label>
            {type === 'sponsor' && (
              <p className="text-sm text-muted-foreground">$100 sponsors one complete training class</p>
            )}
            {type === 'monthly' && (
              <p className="text-sm text-muted-foreground">$25/month sustains our community outreach programs</p>
            )}
            <div className="grid grid-cols-4 gap-3">
              {type === 'sponsor' ? (
                [100, 200, 500, 1000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))
              ) : type === 'monthly' ? (
                [25, 50, 100, 250].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))
              ) : (
                [25, 50, 100, 250].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))
              )}
            </div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={selectedAmount || ''}
              onChange={(e) => setSelectedAmount(parseFloat(e.target.value))}
              min="1"
            />
          </div>

          {/* Contact Information */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="donor_name">Full Name *</Label>
                <Input
                  id="donor_name"
                  required
                  value={formData.donor_name}
                  onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* Type-specific fields */}
          {type === 'sponsor' && (
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold">Sponsor & Recipient Information</h3>
              <div>
                <Label htmlFor="sponsor_info">Your Information (Optional)</Label>
                <Textarea
                  id="sponsor_info"
                  placeholder="Name, organization, or message to be shared with recipient"
                  value={formData.sponsor_info}
                  onChange={(e) => setFormData({ ...formData, sponsor_info: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="recipient_info">Recipient Information (If Known)</Label>
                <Textarea
                  id="recipient_info"
                  placeholder="Name or organization of the person/group you're sponsoring"
                  value={formData.recipient_info}
                  onChange={(e) => setFormData({ ...formData, recipient_info: e.target.value })}
                />
              </div>
            </Card>
          )}

          {type === 'corporate' && (
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold">Company Information</h3>
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  required
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="message">Partnership Goals</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your company and how you'd like to partner with us"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>
            </Card>
          )}

          {type !== 'corporate' && (
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share why you're supporting our mission"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />
            </div>
          )}

          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              100% of your donation supports community safety programs, scholarships, and caregiver training initiatives.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !selectedAmount} className="flex-1">
              {loading ? "Processing..." : "Submit Donation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
