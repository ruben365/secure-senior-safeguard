import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Heart,
  DollarSign,
  Loader2,
  Shield,
  Users,
  Sparkles,
  Gift,
  Calendar,
  Lock,
} from "lucide-react";
import { donationFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "sponsor" | "monthly" | "corporate" | "general" | "children";
  cause?: string;
}

type DonationFormData = z.infer<typeof donationFormSchema>;

const impactInfo: Record<
  string,
  {
    icon: React.ReactNode;
    title: string;
    impacts: { amount: number; description: string }[];
    color: string;
  }
> = {
  children: {
    icon: <Heart className="w-6 h-6" />,
    title: "Support Children with Cancer",
    impacts: [
      { amount: 25, description: "Provides art therapy supplies for 1 child" },
      { amount: 50, description: "Funds 1 week of meal support for a family" },
      {
        amount: 100,
        description: "Covers transportation for 5 hospital visits",
      },
      { amount: 250, description: "Sponsors a child's treatment for 1 month" },
    ],
    color: "from-rose-500/20 to-pink-500/20",
  },
  sponsor: {
    icon: <Users className="w-6 h-6" />,
    title: "Sponsor a Seat",
    impacts: [
      { amount: 50, description: "Sponsors 1 senior for training" },
      { amount: 100, description: "Covers a family's protection setup" },
      { amount: 200, description: "Funds a community workshop" },
      { amount: 500, description: "Sponsors an entire class" },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  monthly: {
    icon: <Calendar className="w-6 h-6" />,
    title: "Monthly Ally Program",
    impacts: [
      { amount: 10, description: "Provides ongoing scam alerts" },
      { amount: 25, description: "Funds monthly security updates" },
      { amount: 50, description: "Supports continuous community education" },
      { amount: 100, description: "Enables 24/7 helpline support" },
    ],
    color: "from-emerald-500/20 to-teal-500/20",
  },
  general: {
    icon: <Gift className="w-6 h-6" />,
    title: "Make a Difference",
    impacts: [
      { amount: 1, description: "Every dollar helps protect a senior" },
      { amount: 5, description: "Helps protect 1 senior from scams" },
      { amount: 10, description: "Provides security awareness materials" },
      { amount: 25, description: "Funds family protection consultations" },
      { amount: 50, description: "Supports community education events" },
      {
        amount: 100,
        description: "Sponsors comprehensive protection services",
      },
    ],
    color: "from-orange-500/20 to-lavender-500/15",
  },
};

export const DonationModal = forwardRef<HTMLDivElement, DonationModalProps>(function DonationModal({
  open,
  onOpenChange,
  type = "general",
  cause,
}, _ref) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [donationType, setDonationType] = useState<"one-time" | "monthly">(
    type === "monthly" ? "monthly" : "one-time",
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const info = impactInfo[type] || impactInfo.general;
  const amounts = info.impacts.map((i) => i.amount);
  const finalAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: "",
      email: "",
      message: "",
      amount: 0,
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getImpactMessage = () => {
    if (!finalAmount) return null;
    const impact = info.impacts.find((i) => i.amount <= finalAmount);
    if (!impact) return info.impacts[0]?.description;
    return info.impacts.filter((i) => i.amount <= finalAmount).pop()
      ?.description;
  };

  const handleSubmit = async (data: DonationFormData) => {
    if (finalAmount < 1) {
      toast({
        title: "Minimum $1",
        description: "Please enter a donation of at least $1.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Save for future auto-fill
      localStorage.setItem("checkout_email", data.email);
      localStorage.setItem("checkout_name", data.donor_name);

      // Call the edge function directly — it handles DB insert with service role
      const { data: paymentData, error: paymentError } =
        await supabase.functions.invoke("process-donation", {
          body: {
            donorName: data.donor_name,
            email: data.email,
            amount: finalAmount,
            donationType: donationType,
            message: data.message || `Donation to ${info.title}`,
          },
        });

      if (paymentError) throw paymentError;

      if (paymentData?.url) {
        window.open(paymentData.url, "_blank");
        toast({
          title: "💖 Thank You!",
          description:
            "Redirecting to secure payment. You'll receive a confirmation email after payment.",
        });
        onOpenChange(false);
        form.reset();
        setSelectedAmount(null);
        setCustomAmount("");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[460px] max-h-[90vh] overflow-y-auto rounded-2xl">
        {/* Header — matches EmbeddedPaymentModal style */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="block text-lg">{cause || info.title}</span>
              <Badge variant="outline" className="text-xs font-normal mt-1">
                <Shield className="w-3 h-3 mr-1" />
                Secure via Stripe
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Donation Type Toggle */}
          {type !== "monthly" && (
            <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
              <Button
                type="button"
                variant={donationType === "one-time" ? "default" : "ghost"}
                className="flex-1 h-9 text-sm"
                onClick={() => setDonationType("one-time")}
              >
                <Gift className="w-3.5 h-3.5 mr-1.5" />
                One-time
              </Button>
              <Button
                type="button"
                variant={donationType === "monthly" ? "default" : "ghost"}
                className="flex-1 h-9 text-sm"
                onClick={() => setDonationType("monthly")}
              >
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Monthly
              </Button>
            </div>
          )}

          {/* Amount Selection */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wide">
              Select Amount
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-2.5 rounded-lg text-center text-sm font-semibold transition-all border ${
                    selectedAmount === amount
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/40 border-border/50 hover:border-primary/40"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="pl-9 h-10"
                min={1}
              />
            </div>
          </div>

          {/* Impact Message */}
          {finalAmount > 0 && (
            <div className="p-3 bg-primary/5 border border-primary/15 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Your Impact: </span>
                  {getImpactMessage()}
                </p>
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="donor_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Your Name *" className="h-10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email *" className="h-10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Leave a message (optional)"
                        rows={2}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total */}
              <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {donationType === "monthly" ? "Monthly" : "Total"}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${finalAmount.toFixed(2)}
                    {donationType === "monthly" && (
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    )}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || finalAmount < 1}
                className="w-full h-11"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Donate ${finalAmount.toFixed(2)}
                    {donationType === "monthly" ? "/month" : ""}
                  </>
                )}
              </Button>

              {/* Trust footer — compact single line */}
              <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-muted-foreground">
                <Lock className="w-3 h-3" />
                <span>Secure & Encrypted</span>
                <span className="text-border">•</span>
                <span>100% goes to the cause</span>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
});
