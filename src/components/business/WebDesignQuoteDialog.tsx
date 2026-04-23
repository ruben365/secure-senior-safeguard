import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export interface WebDesignQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedType?: string;
}

const FEATURE_OPTIONS = [
  "Blog / News section",
  "Online store / E-commerce",
  "Booking / Scheduling system",
  "Member login / Portal",
  "Photo / Video gallery",
  "Live chat / AI chatbot",
  "Email newsletter signup",
  "Multi-language support",
  "Custom animations / interactions",
];

const BUDGET_OPTIONS = [
  "Under $1,500",
  "$1,500 – $3,500",
  "$3,500 – $7,500",
  "$7,500 – $15,000",
  "Over $15,000",
  "Not sure yet",
];

const BUSINESS_TYPES = [
  "Service business",
  "Retail / Shop",
  "Restaurant / Food",
  "Healthcare / Medical",
  "Legal / Professional services",
  "Real estate",
  "Non-profit",
  "Tech / SaaS",
  "Personal brand / Portfolio",
  "Other",
];

export const WebDesignQuoteDialog = ({
  open,
  onOpenChange,
  preselectedType = "",
}: WebDesignQuoteDialogProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [websiteType, setWebsiteType] = useState(preselectedType);
  const [numPages, setNumPages] = useState("");
  const [featuresNeeded, setFeaturesNeeded] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [message, setMessage] = useState("");

  const toggleFeature = (f: string) =>
    setFeaturesNeeded((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const reset = () => {
    setStep(1);
    setSubmitted(false);
    setName("");
    setEmail("");
    setBusinessType("");
    setWebsiteType(preselectedType);
    setNumPages("");
    setFeaturesNeeded([]);
    setBudgetRange("");
    setMessage("");
  };

  const handleClose = (open: boolean) => {
    if (!open) setTimeout(reset, 300);
    onOpenChange(open);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("web_design_quotes").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        business_type: businessType || null,
        website_type: websiteType || null,
        num_pages: numPages ? parseInt(numPages, 10) : null,
        features_needed: featuresNeeded,
        budget_range: budgetRange || null,
        message: message.trim() || null,
        status: "new",
      });
      if (error) throw error;

      await supabase.functions.invoke("send-inquiry-confirmation", {
        body: {
          email: email.trim().toLowerCase(),
          name: name.trim(),
          serviceName: `Web Design Quote${websiteType ? `: ${websiteType}` : ""}`,
          servicePrice: 0,
        },
      });

      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-32px)] sm:max-w-lg max-h-[90svh] overflow-y-auto rounded-2xl p-5 gap-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-base font-bold">
            {submitted ? "Quote Request Received!" : "Get a Custom Quote"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-4 text-center space-y-4">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              We&apos;ll review your project and reach out within 1 business day
              with a tailored quote.
            </p>
            <Button onClick={() => handleClose(false)} className="w-full">
              Done
            </Button>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="h-6 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="h-6 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="h-6 text-sm">
                  <SelectValue placeholder="Select your industry…" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Website Type</Label>
                <Input
                  value={websiteType}
                  onChange={(e) => setWebsiteType(e.target.value)}
                  placeholder="e.g. Landing page"
                  className="h-6 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Est. Pages</Label>
                <Input
                  type="number"
                  min="1"
                  max="200"
                  value={numPages}
                  onChange={(e) => setNumPages(e.target.value)}
                  placeholder="5"
                  className="h-6 text-sm"
                />
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!name.trim() || !email.includes("@")}
              onClick={() => setStep(2)}
            >
              Next →
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Features Needed</Label>
              <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1">
                {FEATURE_OPTIONS.map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2.5 cursor-pointer text-sm py-0.5"
                  >
                    <Checkbox
                      checked={featuresNeeded.includes(f)}
                      onCheckedChange={() => toggleFeature(f)}
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Budget Range</Label>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger className="h-6 text-sm">
                  <SelectValue placeholder="Select a range…" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Additional Details{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project goals, timeline, or anything else…"
                className="text-sm resize-none h-12"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                ← Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending…" : "Submit Request"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
