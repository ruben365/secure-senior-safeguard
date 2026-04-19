import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Server,
  Eye,
  AlertTriangle,
  CheckCircle,
  Award,
  Mail,
} from "lucide-react";
import { SEO, PAGE_SEO } from "@/components/SEO";

const securityCards = [
  {
    icon: Lock,
    title: "Data Protection",
    items: [
      "TLS 1.3 encryption for all data in transit",
      "AES-256 encryption for all data at rest",
      "Supabase infrastructure — SOC 2 Type II certified",
      "Vercel hosting — SOC 2 Type II certified",
    ],
  },
  {
    icon: Shield,
    title: "Authentication",
    items: [
      "Multi-Factor Authentication (MFA/2FA) supported",
      "OAuth via Google and Microsoft",
      "Passwords stored with bcrypt hashing (never plain-text)",
      "Secure session management with automatic expiry",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    items: [
      "US-hosted data centers (no overseas data transfer)",
      "Automated daily backups with 30-day retention",
      "99.9% uptime SLA",
      "Continuous monitoring and automated alerting",
    ],
  },
  {
    icon: Eye,
    title: "Privacy",
    items: [
      "GDPR-aware data practices",
      "We never sell or share your personal data",
      "Privacy-first architecture — minimal data collection",
    ],
    footer: (
      <p className="text-xs text-muted-foreground mt-3">
        Read our full{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
          Privacy Policy
        </Link>{" "}
        for complete details.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    items: [
      "Dedicated security incident response team",
      "Affected users notified within 72 hours of any breach",
      "Root-cause analysis published after major incidents",
    ],
    footer: (
      <p className="text-xs text-muted-foreground mt-3">
        Report a vulnerability:{" "}
        <a href="mailto:security@invisionnetwork.org" className="text-primary hover:underline font-medium">
          security@invisionnetwork.org
        </a>
      </p>
    ),
  },
  {
    icon: Award,
    title: "Compliance",
    items: [
      "Aligned with Ohio cybersecurity standards",
      "Working toward SOC 2 Type II certification",
      "Regular internal security audits and penetration testing",
      "Data handling compliant with GDPR and CCPA principles",
    ],
  },
];

function Security() {
  return (
    <PageTransition variant="fade">
      <SEO
        title={PAGE_SEO.security.title}
        description={PAGE_SEO.security.description}
        keywords={PAGE_SEO.security.keywords}
        structuredData={PAGE_SEO.security.structuredData}
        breadcrumbs={PAGE_SEO.security.breadcrumbs as Array<{ name: string; url: string }>}
      />
      <Navigation />

      {/* Hero */}
      <section className="min-h-[60dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-black mb-4 tracking-tight">
            Security at InVision Network
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Enterprise-grade protection for families, seniors, and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="heroPill" variant="heroPrimary">
              <Link to="/training#pricing">Get Protected</Link>
            </Button>
            <Button asChild size="heroPill" variant="heroOutline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Cards */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              How We Protect You
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              Security That <span className="text-primary">Never Sleeps</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Every layer of our platform is built with your privacy and security as the top priority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {securityCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.title}
                  className="hss-card p-5 border border-border/40 bg-card/70"
                >
                  <div className="hss-icon-bubble mb-4">
                    <Icon className="w-5 h-5 text-[#d96c4a]" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {card.footer}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 section-warm-alt border-y border-[#d96c4a]/12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { icon: Award, label: "Veteran-Founded" },
              { icon: Shield, label: "BBB Accredited" },
              { icon: Eye, label: "Privacy-First" },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground text-sm">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto text-center">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            Questions About Our Security?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
            Our team is happy to answer any security or privacy questions. Reach out any time.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:security@invisionnetwork.org">
                security@invisionnetwork.org
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

export default Security;
