import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

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
      { label: "Pricing", path: "/pricing" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    heading: "Services",
    pages: [
      { label: "AI for Business", path: "/ai" },
      { label: "Workshops", path: "/training" },
      { label: "AI Scam Analysis", path: "/training/ai-analysis" },
      { label: "Resources", path: "/resources" },
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
        title="Sitemap — InVision Network"
        description="A complete list of all pages on InVision Network's website. Find cybersecurity training, AI services, resources, and more."
        noindex={false}
      />
      <Navigation />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Sitemap</h1>
          <p className="text-muted-foreground mb-12">All pages on InVision Network's website.</p>

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
