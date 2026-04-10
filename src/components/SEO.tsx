import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE } from "@/config/site";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
  breadcrumbs?: BreadcrumbItem[];
}

const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/UpYpYr7MTVdr1jgHmL94ALNUlk93/social-images/social-1761862743436-shield_purpleb.png";

const DEFAULT_SEO = {
  title: "Cybersecurity & AI Protection in Ohio | InVision Network",
  description:
    "InVision Network provides expert cybersecurity training and AI protection for Ohio families and businesses. Protect your identity and data from online scams.",
  image: OG_IMAGE,
  type: "website",
  keywords:
    "cybersecurity Ohio, AI scam protection, deepfake detection, senior scam training, family cybersecurity, phishing defense, Kettering Ohio, Southwest Ohio",
};

/** Build a BreadcrumbList JSON-LD object from an array of crumbs. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Build a FAQPage JSON-LD object from question/answer pairs. */
export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function SEO({
  title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  type = DEFAULT_SEO.type,
  keywords = DEFAULT_SEO.keywords,
  canonical,
  noindex = false,
  structuredData,
  breadcrumbs,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title
    ? `${title} | InVision Network`
    : DEFAULT_SEO.title;
  const url = `https://www.invisionnetwork.org${location.pathname}`;
  const canonicalUrl = canonical || url;

  const breadcrumbSchema = breadcrumbs
    ? buildBreadcrumbSchema(breadcrumbs)
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1"
        />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="InVision Network" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@invisionnetwork" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* BreadcrumbList */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}

// ---------------------------------------------------------------------------
// Page-specific SEO configurations
// ---------------------------------------------------------------------------

export const PAGE_SEO = {
  home: {
    title: "",
    description:
      "InVision Network stops AI-powered scams before they reach your family. We provide live training, automated defenses, and 24/7 threat monitoring for families and businesses in Kettering, Ohio.",
    keywords:
      "AI scam protection Ohio, cybersecurity Kettering, deepfake detection, senior scam training, family cybersecurity Southwest Ohio",
    // NOTE: LocalBusiness structured data is in index.html (static) for non-JS crawlers.
    // Do NOT duplicate it here — it causes conflicting JSON-LD blocks.
  },

  training: {
    title: "Workshops — AI Scam Protection for Seniors & Families",
    description:
      "Hands-on cybersecurity workshops for seniors and families in Southwest Ohio. Learn to spot deepfakes, phishing, and AI-powered scams. Zoom and in-person sessions available in Kettering, OH.",
    keywords:
      "AI scam training Kettering Ohio, deepfake detection training, senior cybersecurity, family scam prevention, phishing awareness Southwest Ohio",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "InVision Network Training Academy",
      description:
        "AI scam protection training for families, seniors, and businesses in Southwest Ohio",
      url: "https://www.invisionnetwork.org/training",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kettering",
        addressRegion: "OH",
        addressCountry: "US",
      },
      telephone: SITE.phone.e164,
      offers: [
        {
          "@type": "Offer",
          name: "Individual Training Session",
          price: "89",
          priceCurrency: "USD",
          description: "1-hour personalized AI scam protection training",
        },
        {
          "@type": "Offer",
          name: "Enterprise Training Program",
          price: "599",
          priceCurrency: "USD",
          description: "Comprehensive team training with ongoing support",
        },
      ],
    },
  },

  business: {
    title: "AI Automation & Solutions for Ohio Companies",
    description:
      "Transform your Ohio business with AI receptionists, automated follow-ups, and professional website design. Stop missing calls. AI-powered front desk available 24/7. Serving Kettering and Southwest Ohio.",
    keywords:
      "AI receptionist Ohio, business automation Kettering, AI answering service, virtual receptionist Southwest Ohio, small business AI automation",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "AI Services",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "AI Receptionist & Virtual Intake Agent",
          description:
            "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
          provider: { "@type": "Organization", name: "InVision Network" },
          areaServed: { "@type": "State", name: "Ohio" },
        },
        {
          "@type": "Service",
          position: 2,
          name: "AI Follow-Up Automation",
          description:
            "Automated lead nurturing, appointment reminders, and customer follow-up systems",
          provider: { "@type": "Organization", name: "InVision Network" },
        },
        {
          "@type": "Service",
          position: 3,
          name: "Custom AI Automation Solutions",
          description:
            "Enterprise-grade custom AI solutions tailored to your specific business needs",
          provider: { "@type": "Organization", name: "InVision Network" },
        },
      ],
    },
  },

  about: {
    title: "About InVision Network — Cybersecurity Experts in Kettering, Ohio",
    description:
      "Meet the cybersecurity analysts behind InVision Network. Based in Kettering, Ohio, we protect Southwest Ohio families and businesses from AI-powered scams.",
    keywords:
      "InVision Network about, Kettering Ohio cybersecurity, Southwest Ohio AI protection",
  },

  contact: {
    title: "Contact InVision Network — Kettering, Ohio",
    description:
      "Get in touch with InVision Network for cybersecurity training and AI business solutions. Call (937) 301-8749 or fill out our form. Serving Kettering and all of Southwest Ohio.",
    keywords:
      "contact InVision Network, Kettering cybersecurity contact, AI protection Ohio inquiry",
  },

  resources: {
    title: "Cybersecurity Resources & Scam Prevention Guides",
    description:
      "Practical guides, checklists, and articles on AI scam protection, deepfake detection, and cybersecurity for Ohio families. Stay informed and stay safe.",
    keywords:
      "scam protection resources, AI security guides, cybersecurity articles, deepfake information, Ohio senior scam prevention",
  },

  articles: {
    title: "Cybersecurity Articles & Scam Prevention News",
    description:
      "Read practical guides on AI scam prevention, phishing defense, and cybersecurity for seniors and families. Updated regularly by InVision Network's security analysts.",
    keywords:
      "cybersecurity articles Ohio, AI scam news, phishing guides, deepfake detection tips, senior scam alerts",
  },

  portfolio: {
    title: "Our Work — AI & Cybersecurity Projects",
    description:
      "Explore InVision Network's portfolio of cybersecurity and AI automation projects for Ohio businesses and families.",
    keywords:
      "InVision Network portfolio, AI projects Ohio, cybersecurity case studies, business automation examples",
  },

  careers: {
    title: "Careers at InVision Network — Kettering, Ohio",
    description:
      "Join InVision Network's team of cybersecurity professionals and AI specialists. Open positions in Kettering, Ohio for trainers, analysts, and technologists.",
    keywords:
      "cybersecurity careers Kettering, AI jobs Ohio, InVision Network hiring, security analyst positions",
  },

  faq: {
    title: "Frequently Asked Questions — InVision Network",
    description:
      "Answers to common questions about InVision Network's cybersecurity training, AI business services, pricing, and how we protect Ohio families from scams.",
    keywords:
      "InVision Network FAQ, cybersecurity questions Ohio, AI scam protection FAQ, training pricing",
  },

  help: {
    title: "Help Center — InVision Network Support",
    description:
      "Find answers, guides, and support resources for InVision Network's cybersecurity and AI services. Browse our knowledge base or contact our team.",
    keywords:
      "InVision Network help, cybersecurity support, AI services FAQ, knowledge base",
  },

  notFound: {
    title: "Page Not Found",
    noindex: true,
    description:
      "The page you are looking for does not exist. Return to InVision Network's homepage or search for cybersecurity and AI protection services in Southwest Ohio.",
  },

  guestScanner: {
    title: "Anonymous AI Scam File Scanner — Pay Per Use",
    description:
      "Scan a suspicious file instantly without creating an account. Pay per use ($0.50 minimum), get immediate threat analysis, and protect your family from AI-powered scams. Files auto-deleted in 10 minutes.",
    keywords:
      "file scanner, phishing detection, malware scan, deepfake detection, pay per scan",
  },
} as const;
