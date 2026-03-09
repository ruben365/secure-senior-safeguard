import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Shield,
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useConfetti } from "@/hooks/useConfetti";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email too long"),
});

const Footer = forwardRef<HTMLElement>(function Footer(_props, ref) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fireSuccess } = useConfetti();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = newsletterSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(
        validation.error.errors[0]?.message ||
          "Please enter a valid email address",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "newsletter-signup",
        {
          body: { email: validation.data.email },
        },
      );

      if (error) throw error;

      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        fireSuccess();
        toast.success("✓ Subscribed! Check your email.");
      }

      setEmail("");
    } catch (error: any) {
      console.error("Newsletter signup error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative">
      <TrustedTechLogos />

      {/* Large logo footer - fitup style */}
      <div className="bg-foreground text-background relative overflow-hidden">
        {/* Large background logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img
            src={invisionLogo}
            alt=""
            className="w-[500px] h-[500px] object-contain opacity-[0.03] brightness-0 invert"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 pt-16 pb-10 relative z-10">
          {/* Top: Newsletter bar */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-14 pb-14 border-b border-background/10">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Stay Protected</h3>
              <p className="text-sm text-background/50">
                Get monthly AI safety tips and scam alerts delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="flex-1 md:w-64 h-11 bg-background/5 border-background/10 text-background placeholder:text-background/30 rounded-full focus:bg-background/10 focus:border-background/20"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 rounded-full bg-background text-foreground hover:bg-background/90 font-semibold text-sm"
                aria-label="Subscribe"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
            <div>
              <h4 className="font-bold text-sm mb-5">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/training", label: "Training" },
                  { to: "/business", label: "AI for Business" },
                  { to: "/resources", label: "Resources" },
                  { to: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-background/40 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-5">Services</h4>
              <ul className="space-y-3">
                {[
                  "ScamShield Protection",
                  "Safety Audit",
                  "Web Design",
                  "AI Automation",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/services"
                      className="text-sm text-background/40 hover:text-background transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-5">Training</h4>
              <ul className="space-y-3">
                {[
                  "Zoom Classes",
                  "In-Person",
                  "Group Bookings",
                  "Gift Certificates",
                ].map((label, i) => (
                  <li key={i}>
                    <Link
                      to="/training"
                      className="text-sm text-background/40 hover:text-background transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-5">Support</h4>
              <ul className="space-y-3">
                <li><Link to="/faq" className="text-sm text-background/40 hover:text-background transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-sm text-background/40 hover:text-background transition-colors">Contact Us</Link></li>
                <li><Link to="/contact" className="text-sm text-background/40 hover:text-background transition-colors">Emergency Help</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-5">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="text-sm text-background/40 hover:text-background transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-sm text-background/40 hover:text-background transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="text-sm text-background/40 hover:text-background transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img src={invisionLogo} alt="InVision Network" className="h-6 w-6 object-contain brightness-0 invert" />
              <p className="text-sm text-background/35">
                © {new Date().getFullYear()} All rights reserved. invisionnetwork.org
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://facebook.com/invisionnetwork", icon: Facebook, label: "Facebook" },
                { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn" },
                { href: "https://youtube.com/invisionnetwork", icon: Youtube, label: "YouTube" },
                { href: "https://instagram.com/invisionnetwork", icon: Instagram, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-background/20 text-xs text-center leading-relaxed max-w-4xl mx-auto mt-6">
            InVision Network provides educational services only. We are not
            legal, financial, tax, or licensed cybersecurity professionals. In
            case of active fraud, identity theft, or criminal activity,
            contact local law enforcement (911), your bank's fraud department
            immediately using official phone numbers, and report to FTC at
            IdentityTheft.gov.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
