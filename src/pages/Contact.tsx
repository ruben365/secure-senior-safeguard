import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { PageTransition } from "@/components/PageTransition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Shield,
  Loader2,
  ExternalLink,
  Image as ImageScanIcon,
  Mic,
  UserCircle,
  KeyRound,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";
import { useConfetti } from "@/hooks/useConfetti";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import heroContactBranded from "@/assets/hero-contact-unified.jpg";
import { SITE } from "@/config/site";
import { Link, useSearchParams } from "react-router-dom";
import { SectionDivider, MeshBackground } from "@/components/pro";
import { HeroCTA } from "@/components/shared/HeroCTA";
import BookingCalendar from "@/components/BookingCalendar";

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: SITE.phone.display,
    hours: "Mon-Fri: 9am-6pm EST",
    action: SITE.phone.tel,
    actionText: "Call Now",
    badge: "Avg. 2min wait",
    badgeVariant: "default" as const,
  },
  {
    icon: Mail,
    title: "General Inquiries",
    detail: SITE.emails.info,
    hours: "Response within 4 hours",
    action: `mailto:${SITE.emails.info}`,
    actionText: "Send Email",
    badge: "95% same-day",
    badgeVariant: "default" as const,
  },
  {
    icon: Mail,
    title: "Support Team",
    detail: SITE.emails.support,
    hours: "Response within 2 hours",
    action: `mailto:${SITE.emails.support}`,
    actionText: "Send Email",
    badge: "Priority Support",
    badgeVariant: "premium" as const,
  },
  {
    icon: Mail,
    title: "Business Inquiries",
    detail: SITE.emails.business,
    hours: "Response within 4 hours",
    action: `mailto:${SITE.emails.business}`,
    actionText: "Send Email",
    badge: "B2B Services",
    badgeVariant: "default" as const,
  },
];

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { fireCelebration } = useConfetti();
  const [searchParams] = useSearchParams();
  const couponFromUrl = searchParams.get("coupon") ?? "";

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      hearAbout: "",
      contactMethod: "email",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const messageValue = form.watch("message") || "";
  const messageLength = messageValue.length;
  const maxLength = 500;

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: data.fullName,
            email: data.email,
            phone: data.phone || "",
            interest: data.subject,
            message: data.message,
            hearAbout: data.hearAbout || "",
            contactMethod: data.contactMethod,
            ...(couponFromUrl ? { couponCode: couponFromUrl } : {}),
          },
        },
      );

      if (error) throw error;

      // Track conversion
      const { trackFormSubmit, trackConversion } =
        await import("@/utils/analyticsTracker");
      trackFormSubmit("contact_form", { subject: data.subject });
      trackConversion("contact_inquiry");

      setIsSubmitted(true);
      fireCelebration();
      toast.success("Message sent! We'll respond within 4 hours.");

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        `Failed to send message. Please try again or email us directly at ${SITE.emails.info}`,
      );
    }
  };

  const contactHeroImages = PROFESSIONAL_HERO_IMAGES.contact;

  return (
    <PageTransition variant="fade">
      <SEO
        title={PAGE_SEO.contact.title}
        description={PAGE_SEO.contact.description}
        keywords={PAGE_SEO.contact.keywords}
        structuredData={PAGE_SEO.contact.structuredData}
        breadcrumbs={[...PAGE_SEO.contact.breadcrumbs]}
      />
      <Navigation overlay />
      {/* Hero */}
      <div className="relative">
        <Hero
          backgroundImage={heroContactBranded}
          headline=""
          subheadline=""
        >
          <div className="text-left mb-8">
            <h1 className="font-extrabold text-white mb-4 leading-[1.05] tracking-tight text-[clamp(1.75rem,3.5vw,3rem)]">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-xl">
              We're here to help protect your family. Get in touch today.
            </p>
          </div>
          <HeroCTA
            primaryText="Call (937) 749-7579"
            primaryHref={SITE.phone.tel}
            secondaryText="Send a Message"
            secondaryHref="#contact-form"
          />
        </Hero>
      </div>

      <MeshBackground variant="vibrant" withOrbs>
      <div className="py-16 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          {/* Contact Methods Grid */}
          <div className="head-rhythm text-center mb-10">
            <span className="frosted-pill mb-4">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              How Can We <span className="text-primary">Help?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to reach us. We respond to every inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="glow-card shine-hover p-6 h-full relative overflow-hidden">
                  <div className="relative z-10">
                  <div className="icon-glow-ring w-14 h-14 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)] flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="font-semibold text-foreground mb-1 text-sm">
                    {method.detail}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    {method.hours}
                  </div>
                  <Badge
                    variant={method.badgeVariant}
                    className="mb-4 text-xs"
                  >
                    {method.badge}
                  </Badge>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="sm"
                    asChild
                  >
                    <a href={method.action}>{method.actionText}</a>
                  </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Contact Form Section — premium redesign */}
          <div id="contact-form" className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/*
              Contact form — upgraded to premium business treatment:
                • Warm orange glow ring behind the card
                • Layered 5-level drop shadow stack
                • Orange accent bar at the top (replaces old
                  primary/accent/primary gradient strip)
                • Stronger heading hierarchy + spacing
                • Refined badge and card border radius
            */}
            <div className="lg:col-span-3 relative">
              {/* Soft warm glow ring behind the card */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-orange-500/15 via-transparent to-amber-500/10 blur-2xl pointer-events-none"
              />

              <div className="relative bg-white border border-orange-200/50 rounded-[20px] overflow-hidden shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_2px_4px_-1px_rgba(15,23,42,0.06),0_12px_28px_-8px_rgba(15,23,42,0.14),0_32px_64px_-20px_rgba(217,108,74,0.25),0_48px_96px_-24px_rgba(15,23,42,0.18)]">
                {/* Crisp warm orange accent strip at top */}
                <div className="h-1 bg-gradient-to-r from-transparent via-[#d96c4a] to-transparent" />

                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4 mb-7">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 mb-3">
                        <MessageCircle className="w-3.5 h-3.5 text-[#d96c4a]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8552f]">
                          Send a message
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                        How can we help?
                      </h2>
                      <p className="text-sm text-slate-500 mt-1.5">
                        We reply within 4 business hours.
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="gap-1.5 px-3 py-1.5 bg-emerald-50 border-emerald-200 text-emerald-700 flex-shrink-0"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Secure
                    </Badge>
                  </div>

                  {isSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                        <CheckCircle className="w-10 h-10 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground">
                        We'll respond within 4 hours
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {/* Full Name */}
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                Full Name <span className="text-[#d96c4a]">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  autoComplete="name"
                                  className="h-12 bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email & Phone in grid */}
                        <div className="grid md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                  Email <span className="text-[#d96c4a]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="email"
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    className="h-12 bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                  Phone{" "}
                                  <span className="text-muted-foreground text-xs">
                                    (optional)
                                  </span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="tel"
                                    placeholder="(937) 000-0000"
                                    autoComplete="tel"
                                    className="h-12 bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Subject dropdown */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                Subject <span className="text-[#d96c4a]">*</span>
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200">
                                    <SelectValue placeholder="What can we help you with?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                                  <SelectItem value="general">
                                    General Inquiry
                                  </SelectItem>
                                  <SelectItem value="support">
                                    Technical Support
                                  </SelectItem>
                                  <SelectItem value="business">
                                    Business Services
                                  </SelectItem>
                                  <SelectItem value="careers">Careers</SelectItem>
                                  <SelectItem value="billing">
                                    Billing Question
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Message textarea with character counter */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                Message <span className="text-[#d96c4a]">*</span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell us how we can help you..."
                                  rows={5}
                                  maxLength={maxLength}
                                  className="bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200 resize-none"
                                />
                              </FormControl>
                              <div className="flex justify-between items-center mt-2">
                                <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden mr-4">
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ${
                                      messageLength > maxLength * 0.9
                                        ? "bg-destructive"
                                        : messageLength > maxLength * 0.7
                                          ? "bg-yellow-500"
                                          : "bg-primary"
                                    }`}
                                    style={{
                                      width: `${(messageLength / maxLength) * 100}%`,
                                    }}
                                  />
                                </div>
                                <span
                                  className={`text-xs font-medium ${messageLength > maxLength * 0.9 ? "text-destructive" : "text-muted-foreground"}`}
                                >
                                  {messageLength}/{maxLength}
                                </span>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* How did you hear about us */}
                        <FormField
                          control={form.control}
                          name="hearAbout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                How did you hear about us?
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-slate-50/70 border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#d96c4a]/60 focus:ring-4 focus:ring-[#d96c4a]/10 transition-all duration-200">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl border-border/50 backdrop-blur-md">
                                  <SelectItem value="search">
                                    Search Engine
                                  </SelectItem>
                                  <SelectItem value="social">Social Media</SelectItem>
                                  <SelectItem value="referral">
                                    Friend/Family Referral
                                  </SelectItem>
                                  <SelectItem value="news">News Article</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Preferred Contact Method */}
                        <FormField
                          control={form.control}
                          name="contactMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-600">
                                Preferred Contact Method{" "}
                                <span className="text-[#d96c4a]">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex gap-4"
                                >
                                  <div
                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                      field.value === "email"
                                        ? "border-[#d96c4a] bg-orange-50/70 shadow-[0_0_0_3px_rgba(217,108,74,0.08)]"
                                        : "border-slate-200/90 bg-slate-50/50 hover:border-[#d96c4a]/50 hover:bg-white"
                                    }`}
                                  >
                                    <RadioGroupItem value="email" id="contact-email" />
                                    <Label
                                      htmlFor="contact-email"
                                      className="cursor-pointer flex items-center gap-2 text-sm font-medium"
                                    >
                                      <Mail className={`w-4 h-4 ${field.value === "email" ? "text-[#d96c4a]" : "text-slate-500"}`} />
                                      Email
                                    </Label>
                                  </div>
                                  <div
                                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                      field.value === "phone"
                                        ? "border-[#d96c4a] bg-orange-50/70 shadow-[0_0_0_3px_rgba(217,108,74,0.08)]"
                                        : "border-slate-200/90 bg-slate-50/50 hover:border-[#d96c4a]/50 hover:bg-white"
                                    }`}
                                  >
                                    <RadioGroupItem value="phone" id="contact-phone" />
                                    <Label
                                      htmlFor="contact-phone"
                                      className="cursor-pointer flex items-center gap-2 text-sm font-medium"
                                    >
                                      <Phone className={`w-4 h-4 ${field.value === "phone" ? "text-[#d96c4a]" : "text-slate-500"}`} />
                                      Phone
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button — strong brand orange */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-11 sm:h-14 text-sm sm:text-[15px] font-semibold rounded-xl text-white bg-gradient-to-b from-[#e07a55] to-[#d05f3a] border border-[#b8552f] shadow-[0_1px_0_0_rgba(255,255,255,0.22)_inset,0_8px_20px_-6px_rgba(217,108,74,0.5),0_16px_32px_-12px_rgba(217,108,74,0.35)] hover:from-[#e88560] hover:to-[#d96847] hover:-translate-y-[1px] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_12px_28px_-6px_rgba(217,108,74,0.6),0_20px_40px_-12px_rgba(217,108,74,0.4)] active:translate-y-[0.5px] transition-all duration-200"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <MessageCircle className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>

                        {/* Security note */}
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50/80 border border-slate-200/70 rounded-lg px-3 py-2.5">
                          <Shield className="w-3.5 h-3.5 text-emerald-600" />
                          Your message is encrypted and secure. We never share
                          your information.
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar - 40% with Premium Styling */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Promise with Premium Card */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-accent to-success" />
                <div className="p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    Our Response Promise
                  </h3>
                  <div className="space-y-4">
                    {[
                      { text: "4-hour response", sub: "during business hours" },
                      { text: "24-hour response", sub: "on weekends" },
                      { text: "Emergency support", sub: "for urgent issues" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
                        <span className="text-sm">
                          <strong>{item.text}</strong> {item.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/*
                Service Area card — replaces the old "Visit Our Office"
                block that had a fake street address, a Map Preview
                placeholder, and a "Meet Your Support Team" section.
                Shows the real region (Kettering + Dayton) without
                publishing a personal address.
              */}
              <div className="relative bg-card/90 backdrop-blur-md rounded-2xl border border-border/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    Service Area
                  </h3>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50/70 to-transparent border border-orange-200/50 mb-4">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {SITE.location.city}, {SITE.location.region}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based in the {SITE.location.areaLabel}. We work
                      remotely across Ohio and in person around Kettering
                      and Dayton.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </MeshBackground>

      <section className="py-4">
        <div className="container mx-auto text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Book a Free Consultation</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pick a time that works for you — our team will reach out to confirm your appointment.
          </p>
        </div>
        <BookingCalendar />
      </section>

      {/* Complimentary Security Scan Callout */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground mb-2">
                  Complimentary Scan Included with Your Free Consultation
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  During your free consultation, we'll run a complimentary scan of your digital presence using our{" "}
                  <strong className="text-foreground">10-point security scanning suite</strong> — covering every major threat vector from phishing emails to deepfake images.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Mail, label: "Email Scanner" },
                { icon: Phone, label: "Phone Lookup" },
                { icon: ImageScanIcon, label: "Deepfake Detector" },
                { icon: Mic, label: "Voice Clone Detector" },
                { icon: UserCircle, label: "Profile Checker" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/60 border border-border/50 text-sm font-medium text-foreground"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
              <Link
                to="/training/ai-analysis"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                + 5 more tools — Try them now
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links — related pages */}
      <section className="py-8 section-warm-alt">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            Not sure where to start?{" "}
            <Link to="/training" className="text-primary hover:underline font-medium">Browse our cybersecurity workshops</Link>{" "}
            for seniors and families, or learn more about our{" "}
            <Link to="/ai" className="text-primary hover:underline font-medium">AI business automation services</Link>.{" "}
            You can also visit our <Link to="/faq" className="text-primary hover:underline font-medium">FAQ page</Link> for quick answers.
          </p>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

export default Contact;
