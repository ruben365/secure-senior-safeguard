import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Facebook, Linkedin, Youtube, Instagram,
  Shield, Mail, MapPin, ArrowRight, Loader2, Phone,
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
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

const navGroups = [
  {
    title: "Navigation",
    links: [
      { to: "/", label: "Home" },
      { to: "/services", label: "Services" },
      { to: "/training", label: "Training" },
      { to: "/business", label: "AI for Business" },
      { to: "/resources", label: "Resources" },
      { to: "/about", label: "About" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "ScamShield Protection" },
      { to: "/services", label: "Safety Audit" },
      { to: "/services", label: "Web Design" },
      { to: "/services", label: "AI Automation" },
    ],
  },
  {
    title: "Training",
    links: [
      { to: "/training", label: "Zoom Classes" },
      { to: "/training", label: "In-Person" },
      { to: "/training", label: "Group Bookings" },
      { to: "/training", label: "Gift Certificates" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact Us" },
      { to: "/contact", label: "Emergency Help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-service", label: "Terms of Service" },
      { to: "/refund-policy", label: "Refund Policy" },
    ],
  },
];

const socials = [
  { href: "https://facebook.com/invisionnetwork",     icon: Facebook,  label: "Facebook" },
  { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com/invisionnetwork",      icon: Youtube,   label: "YouTube" },
  { href: "https://instagram.com/invisionnetwork",    icon: Instagram, label: "Instagram" },
];

const Footer = forwardRef<HTMLElement>(function Footer(_props, ref) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fireSuccess } = useConfetti();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = newsletterSchema.safeParse({ email: email.trim() });
    if (!validation.success) {
      toast.error(validation.error.errors[0]?.message || "Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("newsletter-signup", {
        body: { email: validation.data.email },
      });
      if (error) throw error;
      if (data?.alreadySubscribed) {
        toast.info("You're already subscribed!");
      } else {
        fireSuccess();
        toast.success("✓ Subscribed! Check your email.");
      }
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={ref} className="relative">
      <TrustedTechLogos />

      {/* ── Main footer ── */}
      <div className="bg-[hsl(213_60%_10%)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-12 sm:pt-16 pb-8">

          {/* ── Top: brand + newsletter ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-5">
              <Link to="/" className="inline-flex items-center gap-3 no-underline group">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <img
                    src={invisionLogo}
                    alt="InVision Network"
                    className="h-6 w-6 object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <div className="text-base font-bold text-white group-hover:text-white/90 font-heading">InVision Network</div>
                  <div className="text-xs text-white/40 tracking-wide">AI Security & Protection</div>
                </div>
              </Link>

              <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                Protecting families and businesses from AI-powered scams with
                cutting-edge technology and expert training.
              </p>

              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-sm text-white/40">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {SITE.location.city}, {SITE.location.region}
                </span>
                <a
                  href={`mailto:${SITE.emails.hello}`}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors no-underline"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  {SITE.emails.hello}
                </a>
                <a
                  href={SITE.phone.tel}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors no-underline"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:pl-8 lg:flex lg:flex-col lg:justify-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold mb-1 text-white font-heading">Stay Protected</h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">
                  Monthly AI safety tips and scam alerts delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-wrap gap-2.5">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="flex-1 min-w-0 h-11 bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:bg-white/12 focus:border-primary/50 rounded-xl text-sm disabled:opacity-50"
                    aria-label="Email address for newsletter"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 border-0 font-semibold text-sm disabled:opacity-50 flex-shrink-0"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px bg-white/8 mb-10" />

          {/* ── Navigation links ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-7 sm:gap-8 mb-12">
            {navGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-bold text-xs mb-4 text-white/80 uppercase tracking-widest font-heading">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-white/40 hover:text-white/80 transition-colors no-underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="h-px bg-white/8 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright + badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <p className="text-sm text-white/35">
                © {new Date().getFullYear()} InVision Network
              </p>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Shield className="w-3 h-3 text-emerald-500/70" />
                BBB Accredited
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Shield className="w-3 h-3 text-amber-400/70" />
                Veteran-Supporting
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/6 hover:bg-white/12 border border-white/8 hover:border-white/16 transition-colors flex items-center justify-center"
                  aria-label={s.label}
                >
                  <s.icon className="w-3.5 h-3.5 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-white/22 text-xs text-center leading-relaxed max-w-4xl mx-auto mt-6">
            InVision Network provides educational services only. We are not legal, financial,
            tax, or licensed cybersecurity professionals. In case of active fraud, contact
            local law enforcement (911), your bank's fraud department immediately, and report
            to the FTC at IdentityTheft.gov. We never request passwords, 2FA codes, bank
            account information, or Social Security numbers.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
