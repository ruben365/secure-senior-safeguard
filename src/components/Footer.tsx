import { Link } from "react-router-dom";
import { Facebook, Linkedin, Youtube, Instagram, Shield, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrustedTechLogos from "./TrustedTechLogos";
import invisionLogo from "@/assets/shield-logo.png";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Trusted Tech Logos - Stats & Partners */}
      <TrustedTechLogos />

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Top Section - Brand & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10">
                  <img 
                    src={invisionLogo} 
                    alt="InVision Network" 
                    className="h-8 w-8 brightness-0 invert"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">InVision Network</h2>
                  <p className="text-xs text-white/50">AI Security & Protection</p>
                </div>
              </div>
              <p className="text-sm text-white/60 max-w-md leading-relaxed">
                Protecting families and businesses from AI-powered scams with cutting-edge technology and expert training.
              </p>
              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kettering, Ohio</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Mail className="w-3.5 h-3.5" />
                  <span>hello@invisionnetwork.org</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:pl-10">
              <h3 className="text-lg font-semibold mb-2">Stay Protected</h3>
              <p className="text-sm text-white/60 mb-4">
                Get monthly AI safety tips and scam alerts delivered to your inbox.
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-primary/50 rounded-xl"
                />
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 rounded-xl"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/90">Navigation</h4>
              <ul className="space-y-2.5">
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
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/90">Services</h4>
              <ul className="space-y-2.5">
                {[
                  { to: "/services", label: "ScamShield Protection" },
                  { to: "/services", label: "Safety Audit" },
                  { to: "/business#website-design", label: "Web Design" },
                  { to: "/business#automation-pricing", label: "AI Automation" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/90">Training</h4>
              <ul className="space-y-2.5">
                {[
                  { to: "/training#zoom", label: "Zoom Classes" },
                  { to: "/training#in-person", label: "In-Person" },
                  { to: "/training#bulk", label: "Group Bookings" },
                  { to: "/training#gift", label: "Gift Certificates" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/90">Support</h4>
              <ul className="space-y-2.5">
                {[
                  { to: "/faq", label: "FAQ" },
                  { to: "/contact", label: "Contact" },
                  { to: "/contact", label: "Emergency Help" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/90">Legal</h4>
              <ul className="space-y-2.5">
                {[
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/terms-of-service", label: "Terms of Service" },
                  { to: "/contact", label: "Refund Policy" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.to} 
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright & Badges */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-xs text-white/40">
                  © {new Date().getFullYear()} InVision Network. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Shield className="w-3.5 h-3.5 text-primary/70" />
                    <span>BBB Accredited</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Shield className="w-3.5 h-3.5 text-primary/70" />
                    <span>Veteran Owned</span>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
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
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white/60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Disclaimer */}
            <p className="text-white/30 text-[10px] text-center leading-relaxed max-w-4xl mx-auto mt-6">
              InVision Network provides educational services only. We are not legal, financial, tax, or licensed cybersecurity professionals. In case of active fraud, contact local law enforcement (911), your bank's fraud department, and report to FTC at IdentityTheft.gov.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
