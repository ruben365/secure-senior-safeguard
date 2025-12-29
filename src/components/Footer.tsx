import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Tech Partners Marquee */}
      <TrustedTechLogos />

      {/* Main Footer - Compact Dark Theme */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Brand - 3 cols */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/10">
                  <img src={invisionLogo} alt="InVision" className="h-6 w-6 brightness-0 invert" />
                </div>
                <div>
                  <h2 className="text-base font-bold">InVision Network</h2>
                  <p className="text-[10px] text-white/50">AI Security & Protection</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-white/50">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Kettering, OH</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />hello@invisionnetwork.org</span>
              </div>
            </div>

            {/* Navigation Links - 6 cols */}
            <div className="lg:col-span-6 grid grid-cols-4 gap-4">
              <div>
                <h4 className="font-semibold text-xs mb-2 text-white/80">Navigate</h4>
                <ul className="space-y-1">
                  {["/", "/services", "/training", "/business", "/about"].map((to, i) => (
                    <li key={i}>
                      <Link to={to} className="text-xs text-white/50 hover:text-white transition-colors">
                        {["Home", "Services", "Training", "Business", "About"][i]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-2 text-white/80">Services</h4>
                <ul className="space-y-1">
                  {["ScamShield", "Safety Audit", "Web Design", "AI Automation"].map((label, i) => (
                    <li key={i}>
                      <Link to="/services" className="text-xs text-white/50 hover:text-white transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-2 text-white/80">Support</h4>
                <ul className="space-y-1">
                  {[{ to: "/faq", label: "FAQ" }, { to: "/contact", label: "Contact" }, { to: "/contact", label: "Help" }].map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} className="text-xs text-white/50 hover:text-white transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-2 text-white/80">Legal</h4>
                <ul className="space-y-1">
                  {[{ to: "/privacy-policy", label: "Privacy" }, { to: "/terms-of-service", label: "Terms" }, { to: "/contact", label: "Refunds" }].map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} className="text-xs text-white/50 hover:text-white transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter - 3 cols */}
            <div className="lg:col-span-3">
              <h4 className="font-semibold text-xs mb-2 text-white/80">Stay Protected</h4>
              <p className="text-[10px] text-white/50 mb-2">Monthly AI safety tips & alerts</p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  className="flex-1 h-8 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-lg"
                />
                <Button type="submit" size="sm" className="h-8 px-3 bg-primary hover:bg-primary/90 rounded-lg">
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Bar - Compact */}
          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-4 text-[10px] text-white/40">
              <span>© {new Date().getFullYear()} InVision Network</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500/70" />BBB Accredited</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-amber-500/70" />Veteran Owned</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { href: "https://facebook.com/invisionnetwork", icon: Facebook },
                { href: "https://linkedin.com/company/invision-network", icon: Linkedin },
                { href: "https://youtube.com/invisionnetwork", icon: Youtube },
                { href: "https://instagram.com/invisionnetwork", icon: Instagram },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                  <social.icon className="w-3.5 h-3.5 text-white/50" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer - Very compact */}
          <p className="text-white/25 text-[9px] text-center mt-4 max-w-3xl mx-auto">
            Educational services only. Not legal, financial, or licensed cybersecurity professionals. For fraud, contact 911 and your bank.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
