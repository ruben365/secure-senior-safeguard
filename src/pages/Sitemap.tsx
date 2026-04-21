import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";

interface SitemapGroup {
  heading: string;
  pages: { label: string; path: string }[];
}

const groups: SitemapGroup[] = [
  {
    heading: "Main",
    pages: [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Services",
    pages: [
      { label: "AI for Business", path: "/ai" },
      { label: "Workshops", path: "/training" },
      { label: "AI Scam Analysis", path: "/training/ai-analysis" },
      { label: "Library", path: "/library" },
      { label: "Digital Library", path: "/library" },
    ],
  },
  {
    heading: "Events & Community",
    pages: [
      { label: "Events", path: "/events" },
      { label: "Partners", path: "/partners" },
      { label: "Portfolio", path: "/portfolio" },
      { label: "Articles", path: "/articles" },
      { label: "Careers", path: "/careers" },
    ],
  },
  {
    heading: "Support",
    pages: [
      { label: "FAQ", path: "/faq" },
      { label: "Help Center", path: "/help" },
    ],
  },
  {
    heading: "Legal",
    pages: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" },
      { label: "Refund Policy", path: "/refund-policy" },
      { label: "Cookie Policy", path: "/cookie-policy" },
      { label: "Acceptable Use", path: "/acceptable-use" },
      { label: "Disclaimer", path: "/disclaimer" },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Site Directory — All Pages"
        description="A complete list of all pages on InVision Network's website. Find cybersecurity training, AI services, resources, and more."
      />
      <Navigation />

      <Hero
        backgroundImages={PROFESSIONAL_HERO_IMAGES.resources}
        headline="Find every page in one place"
        subheadline="Browse the complete map of InVision Network."
        className="min-h-[55dvh]"
        overlay
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3">
              Site Directory
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">All Pages</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div key={group.heading}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
                  {group.heading}
                </h2>
                <ul className="space-y-2">
                  {group.pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        to={page.path}
                        className="text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
