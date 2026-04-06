import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Shield,
  Heart,
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

      <div
        className="text-white relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(260 12% 11%) 0%, hsl(260 10% 8%) 60%, hsl(260 8% 6%) 100%)" }}
      >
        {/* Subtle top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 pt-10 pb-6 relative z-10">

          {/* Top Row — Brand + Newsletter side by side */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-white/6 border border-white/8">
                <img src={invisionLogo} alt="InVision Network" className="h-7 w-7 object-contain brightness-0 invert" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">InVision Network</h2>
                <p className="text-[11px] text-white/35">AI Security & Protection</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">Stay Protected</p>
                <p className="text-xs text-white/40">Monthly AI safety tips & scam alerts.</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="h-10 w-56 bg-white/5 border-white/10 text-white text-sm placeholder:text-white/25 focus:bg-white/8 focus:border-violet-500/30 rounded-lg disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 w-10 rounded-lg bg-violet-600 hover:bg-violet-500 border-0 p-0 flex-shrink-0 disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>

          {/* Description + Location */}
          <p className="text-sm text-white/40 max-w-lg leading-relaxed mb-2">
            Protecting families and businesses from AI-powered scams with cutting-edge technology and expert training.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <MapPin className="w-3.5 h-3.5" /> {SITE.location.city}, {SITE.location.region}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <Mail className="w-3.5 h-3.5" /> {SITE.emails.hello}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/6 mb-6" />

          {/* Nav Links — compact 4-column */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            <div>
              <h4 className="font-bold text-xs mb-3 text-white/70 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-1.5">
                {[
                  { to: "/", label: "Home" },
                  { to: "/training", label: "Workshops" },
                  { to: "/business", label: "AI for Business" },
                  { to: "/resources", label: "Resources" },
                  { to: "/about", label: "About" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-xs text-white/35 hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-3 text-white/70 uppercase tracking-wider">Workshops</h4>
              <ul className="space-y-1.5">
                {["Zoom Classes", "In-Person", "Group Bookings", "Gift Certificates"].map((label, i) => (
                  <li key={i}><Link to="/training" className="text-xs text-white/35 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-3 text-white/70 uppercase tracking-wider">Support</h4>
              <ul className="space-y-1.5">
                <li><Link to="/faq" className="text-xs text-white/35 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-xs text-white/35 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/contact" className="text-xs text-white/35 hover:text-white transition-colors">Emergency Help</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-3 text-white/70 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-1.5">
                <li><Link to="/privacy-policy" className="text-xs text-white/35 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-xs text-white/35 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="text-xs text-white/35 hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Support Statement */}
          <div className="flex items-center justify-center gap-2 py-3 mb-4 rounded-lg bg-white/[0.03] border border-white/6 text-center">
            <Heart className="w-3.5 h-3.5 text-pink-400/70 flex-shrink-0" />
            <p className="text-xs text-white/45">
              We proudly support veterans and children with cancer. A portion of every service goes toward these causes.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="h-px bg-white/6 mb-4" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs text-white/30">© {new Date().getFullYear()} InVision Network. All rights reserved.</p>
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Shield className="w-3 h-3 text-emerald-500/50" /> BBB Accredited
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/30">
                <Shield className="w-3 h-3 text-amber-500/50" /> Veteran Owned
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[
                { href: "https://facebook.com/invisionnetwork", icon: Facebook, label: "Facebook" },
                { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn" },
                { href: "https://youtube.com/invisionnetwork", icon: Youtube, label: "YouTube" },
                { href: "https://instagram.com/invisionnetwork", icon: Instagram, label: "Instagram" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/4 hover:bg-white/8 border border-white/6 transition-colors flex items-center justify-center">
                  <s.icon className="w-3.5 h-3.5 text-white/40" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-white/20 text-[10px] text-center leading-relaxed max-w-3xl mx-auto mt-4">
            InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, identity theft, or criminal activity, contact local law enforcement (911), your bank's fraud department immediately using official phone numbers, and report to FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank account information, or Social Security numbers.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
