import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MessageCircle, MapPin, Clock, CheckCircle, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, formatPhoneNumber } from "@/utils/formValidation";
import { z } from "zod";
import heroContactNew from "@/assets/hero-contact-new.jpg";
import heroContact3d from "@/assets/hero-contact-3d.jpg";
import customerSupportDiverse from "@/assets/customer-support-diverse.jpg";
import heroContactSplit from "@/assets/hero-contact-split.jpg";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    detail: "(614) 555-0100",
    hours: "Mon-Fri: 9am-6pm EST",
    action: "tel:+16145550100",
    actionText: "Call Now",
    badge: "Avg. 2min wait",
    badgeVariant: "default" as const
  },
  {
    icon: Mail,
    title: "General Inquiries",
    detail: "info@invisionnetwork.org",
    hours: "Response within 4 hours",
    action: "mailto:info@invisionnetwork.org",
    actionText: "Send Email",
    badge: "95% same-day",
    badgeVariant: "default" as const
  },
  {
    icon: Mail,
    title: "Support Team",
    detail: "support@invisionnetwork.org",
    hours: "Response within 2 hours",
    action: "mailto:support@invisionnetwork.org",
    actionText: "Send Email",
    badge: "Priority Support",
    badgeVariant: "premium" as const
  },
  {
    icon: Mail,
    title: "Business Inquiries",
    detail: "business@invisionnetwork.org",
    hours: "Response within 4 hours",
    action: "mailto:business@invisionnetwork.org",
    actionText: "Send Email",
    badge: "B2B Services",
    badgeVariant: "default" as const
  }
];

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    hearAbout: "",
    contactMethod: "email"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { 
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          interest: formData.subject,
          message: formData.message,
          hearAbout: formData.hearAbout,
          contactMethod: formData.contactMethod
        }
      });

      if (error) throw error;

      // Track conversion
      const { trackFormSubmit, trackConversion } = await import("@/utils/analyticsTracker");
      trackFormSubmit("contact_form", { subject: formData.subject });
      trackConversion("contact_inquiry");

      setIsSubmitted(true);
      toast.success("Message sent! We'll respond within 4 hours.");
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          hearAbout: "",
          contactMethod: "email"
        });
      }, 3000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again or email us directly at info@invisionnetwork.org");
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageLength = formData.message.length;
  const maxLength = 500;

  const contactHeroImages = [
    { src: heroContactNew, alt: "Reach out to our support team" },
    { src: heroContact3d, alt: "Modern communication channels" },
    { src: customerSupportDiverse, alt: "Our diverse customer support team ready to help" },
    { src: heroContactSplit, alt: "Multiple ways to connect with us" }
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Get Support & Answers" 
        description="Contact InVision Network for scam protection support. Phone, email, live chat available. Average 2-minute wait time. 95% same-day response rate."
      />
      <Navigation />
      <Hero 
        backgroundImages={contactHeroImages} 
        headline="Contact Us" 
        subheadline="We're here to help protect your family"
        showProtectionBadge
        badgeText="Response within 4 hours"
      />
      <TrustBar />
      
      <div className="section-spacing bg-gradient-to-b from-background to-muted/20">
        <div className="container-padding">
          {/* Contact Methods Grid - Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card 
                  key={index} 
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/50"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 group-hover:animate-shimmer-translate bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                  
                  <CardHeader className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-primary/50">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{method.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <div className="font-semibold text-foreground mb-2 group-hover:scale-105 transition-transform">{method.detail}</div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {method.hours}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <Badge variant={method.badgeVariant} className="mb-3 text-xs animate-pulse-glow">
                      {method.badge}
                    </Badge>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all" 
                      size="sm"
                      onClick={() => method.action.startsWith('#') ? null : window.location.href = method.action}
                    >
                      {method.actionText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Contact Form Section */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {/* Contact Form - 60% - Enhanced Design */}
            <div className="lg:col-span-3">
              <Card className="shadow-2xl border-2 hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
                
                <CardHeader className="relative">
                  {/* Decorative corner accent */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl" />
                  
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      Send Us a Message
                    </CardTitle>
                    <Badge variant="outline" className="gap-1.5 px-3 py-1.5 border-2 border-primary/30 bg-primary/5">
                      <Shield className="w-3.5 h-3.5" />
                      Secure
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 4 hours during business hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground">We'll respond within 4 hours</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select required value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="business">Business Services</SelectItem>
                            <SelectItem value="careers">Careers</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="How can we help you?"
                          rows={5}
                          maxLength={maxLength}
                        />
                        <p className={`text-xs mt-1 ${messageLength > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
                          {messageLength}/{maxLength} characters
                        </p>
                      </div>

                      {/* How did you hear about us */}
                      <div>
                        <Label htmlFor="hearAbout">How did you hear about us?</Label>
                        <Select value={formData.hearAbout} onValueChange={(value) => setFormData({...formData, hearAbout: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="search">Search Engine</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="referral">Friend/Family Referral</SelectItem>
                            <SelectItem value="news">News Article</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <Label>Preferred Contact Method *</Label>
                        <RadioGroup value={formData.contactMethod} onValueChange={(value) => setFormData({...formData, contactMethod: value})} className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="contact-email" />
                            <Label htmlFor="contact-email" className="cursor-pointer">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="contact-phone" />
                            <Label htmlFor="contact-phone" className="cursor-pointer">Phone</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>Send Message</>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Your message is encrypted and secure. We never share your information.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar - 40% */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Promise - Enhanced */}
              <Card className="border-2 border-success/30 bg-gradient-to-br from-success/5 to-background relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl" />
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    Our Response Promise
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm relative z-10">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-success/5 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-success to-success/70 mt-1.5 animate-pulse-glow" />
                    <p><strong className="text-success">4-hour response</strong> during business hours</p>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-success/5 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-success to-success/70 mt-1.5 animate-pulse-glow" style={{ animationDelay: '0.2s' }} />
                    <p><strong className="text-success">24-hour response</strong> on weekends</p>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-success/5 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-success to-success/70 mt-1.5 animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
                    <p><strong className="text-success">Emergency support</strong> for urgent issues</p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Location - Enhanced */}
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary animate-float" />
                    </div>
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-xl mb-4 border border-primary/20">
                    <p className="text-sm leading-relaxed">
                      <strong className="text-lg text-primary block mb-2">InVision Network HQ</strong>
                      <span className="block text-muted-foreground">123 Tech Boulevard</span>
                      <span className="block text-muted-foreground">Columbus, OH 43215</span>
                    </p>
                  </div>
                  <div className="relative bg-gradient-to-br from-muted via-muted/80 to-muted/50 rounded-xl h-48 flex items-center justify-center text-muted-foreground text-sm mb-4 overflow-hidden border-2 border-dashed border-primary/30">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                    <div className="relative z-10 text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-primary/40" />
                      <p>Interactive Map Coming Soon</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group hover:bg-primary hover:text-primary-foreground hover:border-primary" size="sm">
                    <MapPin className="w-4 h-4 mr-2 group-hover:animate-float" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Support Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meet Your Support Team</CardTitle>
                  <CardDescription>Real people ready to help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground">Support Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold">
                      SM
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Technical Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
