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
    } catch (error) {
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
      {/*
        DonationModal — streamlined static layout.
        - Wider (540px) so the email field is never truncated.
        - overflow-hidden + no max-h -> NO scrollbar.
        - Name and email are stacked full-width.
        - All internal spacing compacted: smaller buttons, smaller inputs,
          tight header, lower textarea, squeezed total bar, single-line
          trust footer.
      */}
      <DialogContent className="sm:max-w-[440px] overflow-hidden p-5 gap-0">
        {/* Header — very tight */}
        <DialogHeader className="space-y-0 pb-3">
          <DialogTitle className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-semibold leading-none">{cause || info.title}</span>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 h-[18px]">
                  <Shield className="w-2.5 h-2.5 mr-1" />
                  Secure via Stripe
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2.5">
          {/* Donation Type Toggle — lower profile */}
          {type !== "monthly" && (
            <div className="flex gap-1 p-0.5 bg-muted/60 rounded-md border border-border/50">
              <Button
                type="button"
                variant={donationType === "one-time" ? "default" : "ghost"}
                className="flex-1 h-7 text-xs px-2"
                onClick={() => setDonationType("one-time")}
              >
                <Gift className="w-3 h-3 mr-1" />
                One-time
              </Button>
              <Button
                type="button"
                variant={donationType === "monthly" ? "default" : "ghost"}
                className="flex-1 h-7 text-xs px-2"
                onClick={() => setDonationType("monthly")}
              >
                <Calendar className="w-3 h-3 mr-1" />
                Monthly
              </Button>
            </div>
          )}

          {/* Amount Selection */}
          <div>
            <label className="text-[10px] font-medium text-muted-foreground mb-1 block uppercase tracking-wide">
              Select Amount
            </label>
            <div className="grid grid-cols-4 gap-1.5 mb-1.5">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-1.5 rounded-lg text-center text-xs font-semibold transition-all border ${
                    selectedAmount === amount
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-background border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
              <Input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className="pl-8 h-8 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/30"
                min={1}
              />
            </div>
          </div>

          {/* Impact Message — compact single line */}
          {finalAmount > 0 && (
            <div className="px-2.5 py-1.5 bg-primary/10 border border-primary/15 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground truncate">
                  <span className="font-medium text-foreground">Your Impact: </span>
                  {getImpactMessage()}
                </p>
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              {/* Name + Email — STACKED full-width so long emails never truncate */}
              <FormField
                control={form.control}
                name="donor_name"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Input {...field} placeholder="Your Name *" className="h-8 text-sm w-full border border-border rounded-lg focus:ring-2 focus:ring-primary/30" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Input {...field} type="email" placeholder="Email Address *" className="h-8 text-sm w-full border border-border rounded-lg focus:ring-2 focus:ring-primary/30" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              {/*
                Comments area:
                Must be very low height (2 lines of text) and have
                NO internal scrollbar — even if the user types a lot,
                the field stays locked at this height.
              */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Leave a message (optional)"
                        rows={2}
                        className="resize-none text-sm min-h-[44px] h-[44px] py-1.5 px-3 overflow-hidden leading-snug"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              {/* Total bar — squeezed peach strip */}
              <div className="px-3 py-1.5 bg-card border border-border rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {donationType === "monthly" ? "Monthly" : "Total"}
                  </span>
                  <span className="text-3xl font-bold text-foreground leading-none">
                    ${finalAmount.toFixed(2)}
                    {donationType === "monthly" && (
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    )}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || finalAmount < 1}
                className="w-full h-9 text-sm bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0 hover:opacity-90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-3.5 w-3.5" />
                    Donate ${finalAmount.toFixed(2)}
                    {donationType === "monthly" ? "/month" : ""}
                  </>
                )}
              </Button>

              {/* Trust footer — single compact line */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60">
                <Lock className="w-2.5 h-2.5" />
                <span>Secure &amp; Encrypted</span>
                <span className="text-muted-foreground/30">•</span>
                <span>100% goes to the cause</span>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
});
