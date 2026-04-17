import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  Video,
  MapPin,
  Star,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  bookingFormSchema,
  formatPhoneNumber,
  US_STATES,
} from "@/utils/formValidation";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { TermsCheckbox } from "@/components/payment/TermsCheckbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE } from "@/config/site";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType:
    | "training"
    | "scamshield"
    | "business"
    | "website"
    | "guide"
    | "product"
    | "consultation";
  serviceName: string;
  serviceTier?: string;
  basePrice?: number;
  veteranDiscountPercent?: number;
}

type BookingFormData = z.infer<typeof bookingFormSchema>;

const serviceInfo: Record<
  string,
  {
    icon: React.ReactNode;
    benefits: string[];
    duration: string;
    format: string;
  }
> = {
  training: {
    icon: <Users className="w-5 h-5" />,
    benefits: [
      "Personalized curriculum",
      "Hands-on exercises",
      "Certificate of completion",
      "Follow-up support",
    ],
    duration: "1-2 hours",
    format: "Virtual or In-Person",
  },
  scamshield: {
    icon: <Shield className="w-5 h-5" />,
    benefits: [
      "24/7 protection monitoring",
      "Real-time threat alerts",
      "Family account coverage",
      "Monthly security reports",
    ],
    duration: "Ongoing subscription",
    format: "Digital Service",
  },
  business: {
    icon: <Sparkles className="w-5 h-5" />,
    benefits: [
      "Custom AI solutions",
      "Dedicated account manager",
      "Implementation support",
      "ROI tracking",
    ],
    duration: "Project-based",
    format: "Virtual & On-site",
  },
  consultation: {
    icon: <Video className="w-5 h-5" />,
    benefits: [
      "Expert advice",
      "Action plan",
      "Resource recommendations",
      "Follow-up email summary",
    ],
    duration: "30-60 minutes",
    format: "Video Call",
  },
  default: {
    icon: <Calendar className="w-5 h-5" />,
    benefits: [
      "Professional service",
      "Quality guarantee",
      "Dedicated support",
    ],
    duration: "Varies",
    format: "Flexible",
  },
};

export const BookingModal = ({
  open,
  onOpenChange,
  serviceType,
  serviceName,
  serviceTier,
  basePrice = 0,
  veteranDiscountPercent = 10,
}: BookingModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const info = serviceInfo[serviceType] || serviceInfo.default;

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      state: "",
      preferredDates: "",
      message: "",
      isVeteran: false,
      veteranType: "",
      veteranIdLast4: "",
    },
  });

  // Auto-fill from localStorage for returning users
  useEffect(() => {
    const savedEmail = localStorage.getItem("checkout_email");
    const savedName = localStorage.getItem("checkout_name");
    if (savedEmail) form.setValue("email", savedEmail);
    if (savedName) form.setValue("fullName", savedName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const discountAmount =
    isVeteran && basePrice > 0 ? (basePrice * veteranDiscountPercent) / 100 : 0;
  const finalPrice = basePrice - discountAmount;

  const handleSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const formattedPhone = data.phone ? formatPhoneNumber(data.phone) : null;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const requestNumber = `REQ-${Date.now().toString().slice(-8)}`;

      // Save for future auto-fill
      localStorage.setItem("checkout_email", data.email);
      localStorage.setItem("checkout_name", data.fullName);

      const { error } = await supabase.from("booking_requests").insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: formattedPhone,
          service_type: serviceType,
          service_name: serviceName,
          service_tier: serviceTier || null,
          preferred_dates: data.preferredDates,
          message: data.message,
          is_veteran: isVeteran,
          request_number: requestNumber,
          status: "pending",
          base_price: basePrice,
          discount_amount: discountAmount,
          final_price: finalPrice,
          user_id: user?.id,
          metadata: { state: data.state },
        },
      ]);

      if (error) throw error;

      // Send confirmation email
      try {
        await supabase.functions.invoke("send-booking-confirmation", {
          body: {
            email: data.email,
            name: data.fullName,
            serviceName,
            requestNumber,
            preferredDate: data.preferredDates,
            serviceType,
          },
        });
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the submission if email fails
      }

      toast({
        title: "✓ Inquiry Submitted Successfully!",
        description: `Reference #${requestNumber}. We'll contact you within 24 hours.`,
      });

      onOpenChange(false);
      form.reset();
      setStep(1);
      setTermsAccepted(false);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: "Contact" },
    { num: 2, label: "Schedule" },
    { num: 3, label: "Confirm" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/*
        Compact booking modal — max-w-2xl -> [620px]. Header gradient
        recolored from heavy orange primary/accent to teal+indigo so
        the dialog isn't a wall of orange. overflow-hidden + no max-h
        = no scrollbar.
      */}
      <DialogContent className="sm:max-w-[420px] overflow-hidden p-0 rounded-2xl gap-0">
        {/* Header — glass strip */}
        <div className="bg-gradient-to-r from-teal-500/12 via-white/[0.04] to-indigo-500/10 px-5 pt-4 pb-3 border-b border-white/[0.10]">
          <DialogHeader className="space-y-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 bg-teal-500/15 border border-teal-500/30 rounded-md text-teal-600">
                {info.icon}
              </div>
              <Badge variant="secondary" className="text-[10px] h-[18px] px-1.5 py-0">
                {info.format}
              </Badge>
              {serviceTier && (
                <Badge className="text-[10px] h-[18px] px-1.5 py-0 bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0">
                  {serviceTier}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-base font-semibold leading-tight">
              Book: {serviceName}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Complete the booking form for {serviceName} service
            </DialogDescription>
          </DialogHeader>

          {/* Step Indicator — compact, teal accent */}
          <div className="flex items-center justify-between mt-2 max-w-xs">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-colors ${
                    step >= s.num
                      ? "bg-gradient-to-br from-teal-600 to-indigo-600 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`ml-1.5 text-[10px] font-medium hidden sm:block ${
                    step >= s.num ? "text-teal-300" : "text-white/35"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-6 sm:w-10 h-px mx-1.5 ${
                      step > s.num ? "bg-teal-600" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Quick Info Bar — compact */}
          <div className="flex flex-wrap gap-3 mt-2 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{info.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{info.format}</span>
            </div>
            {basePrice > 0 && (
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <span>${finalPrice.toFixed(0)}</span>
                {isVeteran && (
                  <Badge
                    variant="outline"
                    className="text-xs text-green-600 border-green-600"
                  >
                    -${discountAmount.toFixed(0)}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* What's Included — glass panel */}
          <div className="mb-5 p-4 bg-white/[0.07] backdrop-blur-sm border border-white/[0.12] rounded-xl">
            <h4 className="font-bold mb-2.5 flex items-center gap-2 text-white/90 text-sm">
              <Star className="w-4 h-4 text-amber-400" />
              What's Included
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {info.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/75">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* Contact Info - Minimal */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2 text-white/90">
                  <Mail className="w-4 h-4 text-teal-400" />
                  Contact Information
                </h4>

                <div className="grid md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Name *"
                            className="h-11 bg-white/[0.08] border-white/[0.15] text-white placeholder:text-white/40 focus:bg-white/[0.12] focus:border-white/30"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Email *"
                            className="h-11 bg-white/[0.08] border-white/[0.15] text-white placeholder:text-white/40 focus:bg-white/[0.12] focus:border-white/30"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <Input
                              {...field}
                              placeholder="Phone *"
                              className="h-11 pl-10 bg-white/[0.08] border-white/[0.15] text-white placeholder:text-white/40 focus:bg-white/[0.12] focus:border-white/30"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white/[0.08] border-white/[0.15] text-white">
                              <SelectValue placeholder="Select State *" className="text-white/40" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px]">
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-white/90">
                  <CalendarIcon className="w-4 h-4 text-teal-400" />
                  Preferred Schedule
                </h4>

                <FormField
                  control={form.control}
                  name="preferredDates"
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-11 justify-start text-left font-normal bg-white/[0.08] border-white/[0.15] text-white hover:bg-white/[0.12]",
                                !selectedDate && "text-white/40",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate
                                ? format(selectedDate, "PPP")
                                : "Select preferred date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-background"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              field.onChange(date ? format(date, "PPP") : "");
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                        <Textarea
                          {...field}
                          placeholder="Tell us about your needs (optional)"
                          rows={3}
                          className="pl-10 resize-none bg-white/[0.08] border-white/[0.15] text-white placeholder:text-white/40 focus:bg-white/[0.12] focus:border-white/30"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Veteran Discount */}
              {basePrice > 0 && (
                <QuickVeteranToggle
                  isVeteran={isVeteran}
                  onVeteranChange={setIsVeteran}
                  discountPercent={veteranDiscountPercent}
                />
              )}

              {/* Terms Checkbox */}
              <TermsCheckbox
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
              />

              {/* Price Summary — glass total bar */}
              {basePrice > 0 && (
                <div className="p-4 bg-white/[0.07] backdrop-blur-sm rounded-xl border border-teal-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-sm font-medium">Service Total</span>
                    <div className="text-right">
                      {isVeteran && (
                        <span className="text-sm line-through text-white/35 mr-2">
                          ${basePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-teal-300">
                        ${finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs text-white/45">
                      <QrCode className="w-4 h-4" />
                      <span>QR code payment available</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400">
                      <Shield className="w-3 h-3" />
                      <span>Secure</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    📋 Pricing is finalized after we review your request. No
                    payment is collected through this form.
                  </p>
                </div>
              )}

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="response-time" className="border-b border-white/[0.08]">
                  <AccordionTrigger className="text-sm py-3 hover:no-underline text-white/80 hover:text-white">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-400" />
                      When will I hear back?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/50">
                    We typically respond within 24 hours. For urgent requests,
                    call us at{" "}
                    <a
                      href={SITE.phone.tel}
                      className="text-teal-300 hover:underline"
                    >
                      {SITE.phone.display}
                    </a>
                    .
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancellation" className="border-b-0">
                  <AccordionTrigger className="text-sm py-3 hover:no-underline text-white/80 hover:text-white">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-400" />
                      What's your cancellation policy?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-white/50">
                    Free cancellation up to 24 hours before your scheduled
                    appointment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || !termsAccepted}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Submit Inquiry
                  </>
                )}
              </Button>

              <TrustIndicators compact />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
