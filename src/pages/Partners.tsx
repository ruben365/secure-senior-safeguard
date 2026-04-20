import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingCalendar from "@/components/BookingCalendar";
import {
  Shield,
  Handshake,
  Award,
  GraduationCap,
  Users,
  ExternalLink,
  Truck,
  CheckCircle,
  ArrowRight,
  Star,
  Building2,
  HeartPulse,
} from "lucide-react";

const techPartners = [
  "OpenAI",
  "Google AI",
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Meta AI",
  "NVIDIA",
  "Cloudflare",
  "Stripe",
];

const communityPartners = [
  {
    name: "University of Dayton",
    description:
      "Collaborating on cybersecurity education initiatives for the Dayton region.",
    icon: GraduationCap,
  },
  {
    name: "Ohio Auditor Cybersecurity Program",
    description:
      "Supporting Ohio's statewide cybersecurity awareness and training efforts.",
    icon: Shield,
  },
  {
    name: "Local Veteran Organizations",
    description:
      "Partnering with veteran service organizations across Montgomery County to protect those who served.",
    icon: Star,
  },
];


export default function Partners() {
  return (
    <div className="min-h-screen">
      <SEO
        title={PAGE_SEO.partners.title}
        description={PAGE_SEO.partners.description}
        keywords={PAGE_SEO.partners.keywords}
        structuredData={PAGE_SEO.partners.structuredData}
        breadcrumbs={
          PAGE_SEO.partners.breadcrumbs as Array<{
            name: string;
            url: string;
          }>
        }
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-16 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff8f5] via-background to-background pointer-events-none" />
        <div className="hss-hero-glow" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-4 bg-[#d96c4a]/10 text-[#c45e3b] border-[#d96c4a]/20 font-semibold tracking-wide">
            Trust &amp; Transparency
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08]">
            Partners &amp; Certifications
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            We work with leading technology platforms, healthcare logistics
            providers, community organizations, and pursue industry-recognized
            certifications — so you can trust the protection we provide.
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <Handshake className="w-4 h-4 text-[#d96c4a]" />
              Verified partnerships
            </span>
            <span className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3.5 py-1.5 shadow-sm">
              <Shield className="w-4 h-4 text-[#d96c4a]" />
              Certifications in progress
            </span>
          </div>
        </div>
      </section>

      {/* ── Strategic Partners ──────────────────────────────────── */}
      <section className="py-16 section-warm-alt">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="hss-icon-bubble">
              <Building2 className="w-5 h-5 text-[#d96c4a]" />
            </div>
            <h2 className="text-2xl font-bold">Strategic Partners</h2>
          </div>
          <p className="text-muted-foreground mb-10 ml-[calc(3rem+0.75rem)]">
            Trusted organizations we collaborate with to extend our mission into
            healthcare, logistics, and community services.
          </p>

          {/* Featured: Exodus Health Couriers */}
          <div className="hss-partner-featured rounded-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#d96c4a]/10 border border-[#d96c4a]/25 flex-shrink-0">
                <HeartPulse className="w-8 h-8 text-[#d96c4a]" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">
                    Exodus Health Couriers LLC
                  </h3>
                  <Badge className="bg-[#d96c4a] text-white border-0 text-[10px]">
                    Featured Partner
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Exodus Health Couriers LLC is a trusted healthcare logistics
                  partner specializing in the safe, compliant, and time-sensitive
                  transport of medical specimens, pharmaceuticals, and healthcare
                  materials across the region. Their commitment to reliability
                  and HIPAA-compliant operations aligns perfectly with our
                  mission of protecting vulnerable communities.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    "Medical Logistics",
                    "HIPAA Compliant",
                    "Healthcare Delivery",
                    "Specimen Transport",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#d96c4a]/8 border border-[#d96c4a]/15 text-xs font-medium text-[#c45e3b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm" variant="outline">
                    <a
                      href="https://exodushealthcouriers.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit their website
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/contact" className="gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      Collaborate with us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <hr className="hss-divider" />

      {/* ── Technology Partners ─────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="hss-icon-bubble">
              <Shield className="w-5 h-5 text-[#d96c4a]" />
            </div>
            <h2 className="text-2xl font-bold">Technology Partners</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-[calc(3rem+0.75rem)]">
            InVision Network builds on best-in-class AI and cloud infrastructure
            to deliver reliable scam protection and business automation.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {techPartners.map((partner) => (
              <span
                key={partner}
                className="px-4 py-2 rounded-full border bg-card text-sm font-semibold text-foreground/80 hover:border-[#d96c4a]/30 hover:text-[#c45e3b] transition-colors duration-200"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <hr className="hss-divider" />

      {/* ── Community Partners ──────────────────────────────────── */}
      <section className="py-16 section-warm">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="hss-icon-bubble">
              <Users className="w-5 h-5 text-[#d96c4a]" />
            </div>
            <h2 className="text-2xl font-bold">Community Partners</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-[calc(3rem+0.75rem)]">
            We're proud to collaborate with educational institutions, government
            programs, and local organizations serving Ohio communities.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPartners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="hss-card rounded-xl border bg-card p-6"
                >
                  <div className="hss-icon-bubble mb-4">
                    <Icon className="w-5 h-5 text-[#d96c4a]" />
                  </div>
                  <h3 className="font-semibold mb-2">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {partner.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="hss-divider" />

      {/* ── Certifications ──────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="hss-icon-bubble">
              <GraduationCap className="w-5 h-5 text-[#d96c4a]" />
            </div>
            <h2 className="text-2xl font-bold">Certifications</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-[calc(3rem+0.75rem)]">
            Our team is committed to maintaining the highest professional
            standards in cybersecurity.
          </p>
          <div className="rounded-2xl border border-[#d96c4a]/20 bg-gradient-to-br from-[#fff8f5] to-white p-8">
            <div className="flex items-start gap-4">
              <div className="hss-icon-bubble-lg">
                <Award className="w-6 h-6 text-[#d96c4a]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Certifications in Progress
                </h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Our team is actively pursuing industry-recognized
                  certifications. We are committed to professional excellence
                  in cybersecurity.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    "CompTIA Security+",
                    "EC-Council CEH",
                    "CISSP",
                  ].map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#d96c4a]/6 border border-[#d96c4a]/15"
                    >
                      <CheckCircle className="w-4 h-4 text-[#d96c4a] flex-shrink-0" />
                      <span className="text-sm font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-16 section-warm-alt text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="hss-icon-bubble-lg mx-auto mb-5">
            <Handshake className="w-6 h-6 text-[#d96c4a]" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Become a Partner</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Interested in partnering with InVision Network? We'd love to
            collaborate with organizations aligned with our mission of
            protecting Ohio communities through technology and education.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact" className="gap-2">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <BookingCalendar />
      <Footer />
    </div>
  );
}
