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
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import { SITE } from "@/config/site";
import invisionLogo from "@/assets/shield-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { useConfetti } from "@/hooks/useConfetti";
import { z } from "zod";
import "./Footer.css";

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
        toast.info("You're already on the list.");
      } else {
        fireSuccess();
        toast.success("You're in. Check your email for a welcome message.");
      }

      setEmail("");
    } catch (error: unknown) {
      console.error("Newsletter signup error:", error);
      toast.error("Couldn't subscribe you right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navColumns = [
    {
      heading: "Navigation",
      links: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/library", label: "Library" },
        { to: "/portfolio", label: "Portfolio" },
        { to: "/articles", label: "Articles" },
        { to: "/careers", label: "Careers" },
        { to: "/partners", label: "Partners" },
        { to: "/events", label: "Events" },
      ],
    },
    {
      heading: "Services",
      links: [
        { to: "/ai", label: "AI for Business" },
        { to: "/ai#svc-ai-receptionist", label: "AI Receptionist" },
        { to: "/ai#svc-smart-scheduling", label: "Smart Scheduling" },
        { to: "/ai#svc-website-design", label: "Website Design" },
        { to: "/ai#svc-website-insurance", label: "Website Insurance" },
      ],
    },
    {
      heading: "Training",
      links: [
        { to: "/training", label: "Workshops" },
        { to: "/training/ai-analysis", label: "AI Scam Analysis" },
        { to: "/library", label: "Digital Library" },
        { to: "/training#pricing", label: "Protection Plans" },
      ],
    },
    {
      heading: "Support",
      links: [
        { to: "/faq", label: "FAQ" },
        { to: "/help", label: "Help Center" },
        { to: "/contact", label: "Contact Us" },
        { to: "/security", label: "Security" },
        { to: "/status", label: "System Status" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { to: "/privacy-policy", label: "Privacy Policy" },
        { to: "/terms-of-service", label: "Terms of Service" },
        { to: "/refund-policy", label: "Refund Policy" },
        { to: "/cookie-policy", label: "Cookie Policy" },
        { to: "/acceptable-use", label: "Acceptable Use" },
        { to: "/disclaimer", label: "Disclaimer" },
        { to: "/sitemap", label: "Sitemap" },
      ],
    },
  ];

  const socials = [
    { href: "https://facebook.com/invisionnetwork", icon: Facebook, label: "Facebook" },
    { href: "https://linkedin.com/company/invision-network", icon: Linkedin, label: "LinkedIn" },
    { href: "https://youtube.com/invisionnetwork", icon: Youtube, label: "YouTube" },
    { href: "https://instagram.com/invisionnetwork", icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer ref={ref} className="relative">
      <TrustedTechLogos />

      <div className="footer-bg text-white relative overflow-hidden">
        {/* Subtle top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Soft warm aura — far right edge, ties footer to the orange system */}
        <div
          aria-hidden="true"
          className="footer-aura absolute right-0 top-0 w-[600px] h-full pointer-events-none opacity-50"
        />

        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 py-5 relative z-10">

          {/* ─────────── TOP ROW — Brand left + Newsletter card right ─────────── */}
          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12">
            {/* Brand cluster — pushed to far left */}
            <div className="flex flex-col flex-1 max-w-xl">
              <Link
                to="/"
                aria-label="InVision Network — back to home"
                className="group inline-flex items-center gap-4 rounded-2xl px-3 py-2 -mx-3 -my-2 hover:bg-white/[0.04] focus-visible:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400/60 transition-colors duration-200 no-underline w-fit mb-3"
              >
                <div className="p-2 rounded-xl bg-white/8 border border-white/12 group-hover:border-white/20 transition-colors">
                  <img
                    src={invisionLogo}
                    alt="InVision Network Shield Logo"
                    className="h-9 w-9 object-contain brightness-0 invert"
                    loading="eager"
                    decoding="sync"
                    width={36}
                    height={36}
                  />
                </div>
                <div className="flex flex-col gap-1.5 leading-none">
                  <h2 className="text-lg font-extrabold text-white tracking-tight leading-none">InVision Network</h2>
                  <p className="text-[11px] font-bold text-white/70 group-hover:text-white/90 transition-colors uppercase tracking-[0.18em] leading-none">
                    AI Security &amp; Protection
                  </p>
                </div>
              </Link>

              <p className="text-[14px] text-white/80 max-w-md leading-snug mb-3">
                Protecting families and businesses from AI-powered scams with
                cutting-edge technology and expert training.
              </p>

              <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2.5 flex-wrap">
                <span className="inline-flex items-center gap-2 text-[13px] text-white/75">
                  <MapPin className="w-4 h-4 text-orange-400/80 flex-shrink-0" />
                  Serving Kettering, Dayton &amp; Montgomery County, OH
                </span>
                <a href={`mailto:${SITE.emails.hello}`} className="inline-flex items-center gap-2 text-[13px] text-white/75 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-orange-400/80 flex-shrink-0" />
                  {SITE.emails.hello}
                </a>
                <a href={SITE.phone.tel} className="inline-flex items-center gap-2 text-[13px] text-white/75 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-orange-400/80 flex-shrink-0" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>

            {/* Newsletter card — pushed to far right */}
            <div className="lg:flex lg:justify-end lg:flex-shrink-0">
              <div className="footer-newsletter-card w-full lg:w-[440px] rounded-2xl p-4 border border-white/10">
                <p className="text-[11px] font-bold text-orange-400/90 uppercase tracking-[0.18em] mb-1.5">
                  Stay Protected
                </p>
                <h3 className="text-lg lg:text-xl font-extrabold text-white leading-tight tracking-tight mb-1.5">
                  Monthly AI safety tips &amp; scam alerts.
                </h3>
                <p className="text-[13px] text-white/70 leading-snug mb-3 max-w-sm">
                  Join the families and businesses we protect across Ohio.
                  No spam — just the threats worth knowing about.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="h-9 sm:h-12 flex-1 bg-white/[0.06] border-white/15 text-white text-[12px] sm:text-[14px] placeholder:text-white/45 focus:bg-white/[0.10] focus:border-orange-500/50 rounded-xl disabled:opacity-50"
                    aria-label="Email address for newsletter"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-9 sm:h-12 px-4 sm:px-6 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground border-0 text-[12px] sm:text-[14px] font-semibold flex-shrink-0 disabled:opacity-50 inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2"
                    aria-label="Subscribe to newsletter"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* ─────────── MIDDLE — 5 nav columns stretched across full width ─────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 lg:gap-x-12 gap-y-6 w-full mt-5">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <h4 className="font-bold text-[13px] mb-2 text-white uppercase tracking-[0.18em] leading-tight">
                  {col.heading}
                </h4>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-[14px] text-white/75 hover:text-white transition-colors inline-block leading-snug"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ─────────── BOTTOM — Copyright + badges + socials ─────────── */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3 mt-5 pt-3 border-t border-gray-800">
            {/* Left cluster: copyright + trust badges — pushed to far left */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3">
              <p className="text-[13px] text-white/70">
                © {new Date().getFullYear()} InVision Network. All rights reserved.
              </p>
              <span className="hidden sm:inline-block w-px h-4 bg-white/15" />
              <a
                href="https://www.bbb.org/search?find_text=invision+network&find_loc=Kettering%2C+OH+45429"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="InVision Network BBB Accreditation"
                className="inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors"
              >
                <Shield className="w-4 h-4 text-emerald-400/70" /> BBB Accredited
              </a>
              <span className="inline-flex items-center gap-2 text-[13px] text-white/70">
                <Shield className="w-4 h-4 text-amber-400/70" /> Veteran Owned
              </span>
            </div>

            {/* Right cluster: social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/[0.05] hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/40 transition-all duration-200 flex items-center justify-center group"
                >
                  <s.icon className="w-5 h-5 sm:w-4 sm:h-4 text-white/75 group-hover:text-orange-300 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Support statement */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-1">
            <Heart className="w-3.5 h-3.5 text-orange-400/70 flex-shrink-0" />
            <p className="text-[12px] text-white/75 text-center max-w-2xl leading-snug">
              We proudly support veterans and children with cancer. A portion
              of every service goes toward these causes.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-white/55 text-xs text-center leading-tight max-w-4xl mx-auto mt-2">
            InVision Network provides educational services only. We are not
            legal, financial, tax, or licensed cybersecurity professionals. In
            case of active fraud or identity theft, contact local law enforcement
            (911), your bank's fraud department, and report to the FTC at{" "}
            <a href="https://IdentityTheft.gov" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white underline underline-offset-2">IdentityTheft.gov</a>.
            We never request passwords, 2FA codes, or bank information.{" "}
            <Link to="/disclaimer" className="text-white/70 hover:text-white underline underline-offset-2">Full Disclaimer</Link>
            {" · "}
            <Link to="/privacy-policy" className="text-white/70 hover:text-white underline underline-offset-2">Privacy</Link>
            {" · "}
            <Link to="/terms-of-service" className="text-white/70 hover:text-white underline underline-offset-2">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
