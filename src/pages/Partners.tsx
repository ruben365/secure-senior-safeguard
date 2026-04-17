import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Handshake,
  Award,
  GraduationCap,
  Users,
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
    description: "Collaborating on cybersecurity education initiatives for the Dayton region.",
  },
  {
    name: "Ohio Auditor Cybersecurity Program",
    description: "Supporting Ohio's statewide cybersecurity awareness and training efforts.",
  },
  {
    name: "Local Veteran Organizations",
    description: "Partnering with veteran service organizations across Montgomery County to protect those who served.",
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
        breadcrumbs={PAGE_SEO.partners.breadcrumbs as Array<{ name: string; url: string }>}
      />
      <Navigation />

      {/* Hero */}
      <section className="min-h-[100dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-10 bg-background text-center">
        <div className="container mx-auto max-w-3xl">
          <Badge className="mb-4">Trust & Transparency</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Partners &amp; Certifications
          </h1>
          <p className="text-lg text-muted-foreground">
            We work with leading technology platforms, community organizations, and pursue industry-recognized certifications — so you can trust the protection we provide.
          </p>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Technology Partners</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            InVision Network builds on best-in-class AI and cloud infrastructure to deliver reliable scam protection and business automation.
          </p>
          <div className="flex flex-wrap gap-3">
            {techPartners.map((partner) => (
              <span
                key={partner}
                className="px-4 py-2 rounded-full border bg-card text-sm font-semibold text-foreground/80"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Community Partners */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Community Partners</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            We're proud to collaborate with educational institutions, government programs, and local organizations serving Ohio communities.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPartners.map((partner) => (
              <div key={partner.name} className="rounded-xl border bg-card p-6">
                <Users className="w-6 h-6 text-orange-500 mb-3" />
                <h3 className="font-semibold mb-2">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold">Certifications</h2>
          </div>
          <div className="rounded-xl border bg-card p-8">
            <Award className="w-8 h-8 text-orange-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Certifications in Progress</h3>
            <p className="text-muted-foreground">
              Our team is actively pursuing industry-recognized certifications including <strong>CompTIA Security+</strong>, <strong>EC-Council CEH (Certified Ethical Hacker)</strong>, and <strong>CISSP</strong>. We are committed to maintaining the highest professional standards in cybersecurity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">Become a Partner</h2>
          <p className="text-muted-foreground mb-6">
            Interested in partnering with InVision Network? We'd love to collaborate with organizations aligned with our mission of protecting Ohio communities.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
