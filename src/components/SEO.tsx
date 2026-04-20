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
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
}

// Self-hosted 1200×630 social image (served from Vercel CDN)
const OG_IMAGE = "https://www.invisionnetwork.org/images/hero-corporate-protection.webp";

const DEFAULT_SEO = {
  title: "InVision Network | AI Cybersecurity Protection for Ohio Families & Businesses",
  description:
    "InVision Network protects Ohio families and businesses from AI scams, deepfakes, and phishing. Expert cybersecurity training in Kettering + 24/7 AI defense.",
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
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title
    ? `${title} | InVision Network`
    : DEFAULT_SEO.title;
  // Normalize: always www + https, strip trailing slash except for root "/"
  const rawUrl = `https://www.invisionnetwork.org${location.pathname}`;
  const url =
    rawUrl !== "https://www.invisionnetwork.org/" && rawUrl.endsWith("/")
      ? rawUrl.slice(0, -1)
      : rawUrl;
  const canonicalUrl = canonical || url;

  const breadcrumbSchema = breadcrumbs
    ? buildBreadcrumbSchema(breadcrumbs)
    : null;

  // Only emit og:image dimensions/alt when they are known-correct.
  // For the default hero image the dimensions are fixed (1200×630).
  // For custom images (article covers, book covers) callers must pass
  // explicit props; otherwise we omit to avoid contradictory crawl data.
  const isDefaultImage = image === OG_IMAGE;
  const resolvedImageWidth = ogImageWidth ?? (isDefaultImage ? "1200" : undefined);
  const resolvedImageHeight = ogImageHeight ?? (isDefaultImage ? "630" : undefined);
  const resolvedImageAlt = ogImageAlt ?? (isDefaultImage ? "InVision Network — AI Scam Protection for Ohio Families" : undefined);

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
      {resolvedImageWidth && <meta property="og:image:width" content={resolvedImageWidth} />}
      {resolvedImageHeight && <meta property="og:image:height" content={resolvedImageHeight} />}
      {resolvedImageAlt && <meta property="og:image:alt" content={resolvedImageAlt} />}
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

      {/* Structured Data — supports single object or array of schemas */}
      {structuredData &&
        (Array.isArray(structuredData) ? structuredData : [structuredData]).map(
          (sd, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(sd)}
            </script>
          ),
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
// Titles are page-specific only — the SEO component appends "| InVision Network"
// Target: 40–55 chars for title (component adds 18 chars, total ≤ 73)
// ---------------------------------------------------------------------------

export const PAGE_SEO = {
  home: {
    // Full brand title for homepage — passed without title prop to use DEFAULT_SEO.title
    description:
      "InVision Network protects Ohio families and businesses from AI scams, deepfakes, and phishing. Expert cybersecurity training in Kettering + 24/7 AI defense.",
    keywords:
      "AI scam protection Ohio, cybersecurity Kettering, deepfake detection, senior scam training, family cybersecurity Southwest Ohio",
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
        logo: {
          "@type": "ImageObject",
          url: "https://www.invisionnetwork.org/shield-logo-512.png",
          width: 512,
          height: 512,
        },
        description:
          "AI scam protection and cybersecurity training for families, seniors, and businesses in Southwest Ohio. Veteran-founded in Kettering, Ohio.",
        foundingDate: "2024",
        telephone: "+19377497579",
        email: "hello@invisionnetwork.org",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kettering",
          addressLocality: "Kettering",
          addressRegion: "OH",
          postalCode: "45429",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "State", name: "Ohio" },
          { "@type": "City", name: "Dayton" },
          { "@type": "City", name: "Kettering" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+19377497579",
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: "English",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
          {
            "@type": "ContactPoint",
            email: "hello@invisionnetwork.org",
            contactType: "customer support",
          },
        ],
        sameAs: [
          "https://twitter.com/invisionnetwork",
          "https://facebook.com/invisionnetwork",
          "https://linkedin.com/company/invisionnetwork",
          "https://www.youtube.com/@invisionnetwork",
        ],
        knowsAbout: [
          "AI Scam Protection",
          "Deepfake Detection",
          "Phishing Defense",
          "Voice Clone Detection",
          "Senior Cybersecurity Training",
          "AI Services",
          "Family Digital Safety",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
        description:
          "AI cybersecurity protection and training for Ohio families and businesses.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.invisionnetwork.org/articles?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "InVision Network",
        image: "https://www.invisionnetwork.org/images/hero-corporate-protection.webp",
        url: "https://www.invisionnetwork.org",
        telephone: "+19377497579",
        email: "hello@invisionnetwork.org",
        description:
          "Veteran-founded AI scam protection and cybersecurity training for families, seniors, and businesses in Kettering and the Dayton, Ohio area.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kettering",
          addressRegion: "OH",
          postalCode: "45429",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.6887,
          longitude: -84.1688,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "10:00",
            closes: "15:00",
          },
        ],
        priceRange: "$",
        servesCuisine: null,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cybersecurity & AI Protection Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Scam Protection Training",
                description: "1-hour hands-on cybersecurity workshop for families and seniors",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Receptionist & Business Automation",
                description: "24/7 AI phone agent and business automation for Ohio small businesses",
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does ScamShield AI protect me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "ScamShield uses AI to analyze incoming calls, texts, and emails in real time. When it detects suspicious patterns, known scam numbers, phishing language, or cloned voices, it alerts you and blocks the threat.",
            },
          },
          {
            "@type": "Question",
            name: "Is my personal data safe with InVision Network?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We use encryption and never sell your data. As a veteran-supporting company, we take security personally. Your information is stored securely and only used to protect you from scams.",
            },
          },
          {
            "@type": "Question",
            name: "What makes you different from other companies?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We are Ohio-based, veteran-supporting, and focused on protecting families and seniors from AI-powered scams. We provide education, support, and a personal relationship with every client.",
            },
          },
          {
            "@type": "Question",
            name: "I want to protect my elderly parents who are not tech-savvy. Is this for them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. That is exactly who we designed ScamShield for. Our Family plan covers up to 5 members, and we provide simple setup assistance. Many of our clients are seniors or their family members.",
            },
          },
        ],
      },
    ] as Record<string, unknown>[],
  },

  training: {
    title: "Cybersecurity Workshops",
    description:
      "Hands-on AI scam prevention workshops for Ohio families, seniors, and businesses. Spot deepfakes, phishing, and voice-clone scams. In-person in Kettering or live on Zoom.",
    keywords:
      "AI scam training Kettering Ohio, deepfake detection training, senior cybersecurity, family scam prevention, phishing awareness Southwest Ohio",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Training", url: "https://www.invisionnetwork.org/training" },
    ],
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
    title: "AI Protection",
    description:
      "AI receptionist, smart scheduling, automation, and cybersecurity for Ohio small businesses. Book more clients and stop scams 24/7. Serving Kettering and Dayton.",
    keywords:
      "AI services Ohio, AI receptionist Ohio, business automation Kettering, AI answering service, virtual receptionist Southwest Ohio",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "AI Services", url: "https://www.invisionnetwork.org/ai" },
    ],
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
    title: "About Us",
    description:
      "Veteran-founded in Kettering, Ohio. InVision Network protects families, seniors, and businesses from AI-powered scams, deepfakes, and voice-clone fraud. Meet our team.",
    keywords:
      "InVision Network about, Kettering Ohio cybersecurity, Southwest Ohio AI protection",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "About", url: "https://www.invisionnetwork.org/about" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "InVision Network",
      url: "https://www.invisionnetwork.org",
      logo: "https://www.invisionnetwork.org/favicon.png",
      foundingDate: "2024",
      description:
        "Veteran-founded cybersecurity company based in Kettering, Ohio protecting families, seniors, and businesses from AI-powered scams, deepfakes, and phishing attacks.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kettering",
        addressRegion: "OH",
        postalCode: "45429",
        addressCountry: "US",
      },
      telephone: "+19377497579",
      email: "hello@invisionnetwork.org",
      areaServed: { "@type": "State", name: "Ohio" },
      knowsAbout: [
        "AI Scam Protection",
        "Deepfake Detection",
        "Phishing Defense",
        "Voice Clone Detection",
        "Senior Cybersecurity Training",
        "Business AI Automation",
        "Family Digital Safety",
      ],
      sameAs: [
        "https://twitter.com/invisionnetwork",
        "https://facebook.com/invisionnetwork",
        "https://linkedin.com/company/invisionnetwork",
      ],
    },
  },

  contact: {
    title: "Contact Us",
    description:
      "Talk to InVision Network's cybersecurity team. Call (937) 749-7579, email us, or book a free 15-minute consultation. Based in Kettering, OH — serving all of Ohio.",
    keywords:
      "contact InVision Network, Kettering cybersecurity contact, AI protection Ohio inquiry",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Contact", url: "https://www.invisionnetwork.org/contact" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact InVision Network",
      url: "https://www.invisionnetwork.org/contact",
      description:
        "Contact InVision Network for cybersecurity training and AI automation services in Southwest Ohio.",
      mainEntity: {
        "@type": "Organization",
        name: "InVision Network",
        telephone: "+19377497579",
        email: "hello@invisionnetwork.org",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kettering",
          addressRegion: "OH",
          postalCode: "45429",
          addressCountry: "US",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+19377497579",
            contactType: "Customer Service",
            availableLanguage: ["English", "Spanish", "French"],
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
          },
          {
            "@type": "ContactPoint",
            email: "hello@invisionnetwork.org",
            contactType: "Customer Support",
          },
        ],
      },
    },
  },

  resources: {
    title: "Cybersecurity Guides & Digital Safety Resources",
    description:
      "Download expert cybersecurity guides, e-books, and digital safety toolkits. Free and premium resources for Ohio families, seniors, and small businesses.",
    keywords:
      "scam protection resources, AI security guides, cybersecurity articles, deepfake information, Ohio senior scam prevention",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Library", url: "https://www.invisionnetwork.org/library" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "InVision Network Cybersecurity Resource Library",
      description:
        "Expert cybersecurity guides, e-books, and digital safety toolkits for Ohio families, seniors, and small businesses.",
      url: "https://www.invisionnetwork.org/library",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "AI Scam Prevention Guide",
          url: "https://www.invisionnetwork.org/library/scam-prevention-guide",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Deepfake Detection Handbook",
          url: "https://www.invisionnetwork.org/library/deepfake-detection",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Family Digital Safety Toolkit",
          url: "https://www.invisionnetwork.org/library/family-safety-toolkit",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Senior Tech & Safety Handbook",
          url: "https://www.invisionnetwork.org/library/senior-tech-handbook",
        },
      ],
    },
  },

  library: {
    title: "Digital Cybersecurity & AI Safety Book Library",
    description:
      "Browse InVision Network's complete digital library. Expert cybersecurity, AI safety, scam prevention, and privacy guides written for every skill level. Instant access after purchase.",
    keywords:
      "cybersecurity books, AI safety guide, scam prevention ebook, digital library Ohio",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Digital Library", url: "https://www.invisionnetwork.org/library" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "InVision Network Digital Library",
      description: "Expert cybersecurity and AI safety digital books for Ohio families and businesses.",
      url: "https://www.invisionnetwork.org/library",
      publisher: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
      },
    },
  },

  articles: {
    title: "Cybersecurity Articles & Scam Prevention News",
    description:
      "Practical guides on AI scam prevention, phishing defense, and cybersecurity for seniors and families. Updated by our security analysts.",
    keywords:
      "cybersecurity articles Ohio, AI scam news, phishing guides, deepfake detection tips, senior scam alerts",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Articles", url: "https://www.invisionnetwork.org/articles" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "InVision Network Cybersecurity Articles",
      description:
        "Practical guides on AI scam prevention, phishing defense, and cybersecurity for seniors and families in Southwest Ohio.",
      url: "https://www.invisionnetwork.org/articles",
      publisher: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
      },
    },
  },

  portfolio: {
    title: "AI & Cybersecurity Projects Portfolio",
    description:
      "Explore InVision Network's portfolio: AI receptionists, cybersecurity training, and automation projects for Ohio families and businesses.",
    keywords:
      "InVision Network portfolio, AI projects Ohio, cybersecurity case studies, business automation examples",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Portfolio", url: "https://www.invisionnetwork.org/portfolio" },
    ],
  },

  careers: {
    title: "Cybersecurity Careers in Dayton & Kettering, Ohio",
    description:
      "Work with InVision Network's expert team. Open positions in cybersecurity training, AI development, and digital protection in Kettering, Ohio.",
    keywords:
      "cybersecurity careers Kettering, AI jobs Ohio, InVision Network hiring, security analyst positions",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Careers", url: "https://www.invisionnetwork.org/careers" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EmployerAggregateRating",
      itemReviewed: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kettering",
          addressRegion: "OH",
          addressCountry: "US",
        },
      },
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "12",
    },
  },

  partners: {
    title: "Our Partners",
    description:
      "InVision Network's technology partners and community allies in Ohio. Trusted integrations, certifications, and local organizations that help us keep families safe.",
    keywords:
      "InVision Network partners, cybersecurity certifications Ohio, technology partnerships, trusted vendors",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Partners", url: "https://www.invisionnetwork.org/partners" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "InVision Network Partners & Certifications",
      url: "https://www.invisionnetwork.org/partners",
      description: "Technology partners and certifications for InVision Network's cybersecurity and AI services.",
      about: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
      },
    },
  },

  events: {
    title: "Cybersecurity Workshops & Events in Ohio",
    description:
      "Upcoming AI scam prevention workshops and cybersecurity events in Kettering, Dayton, and Southwest Ohio. Free and paid sessions for seniors, families, and businesses.",
    keywords:
      "cybersecurity events Ohio, AI scam workshop Dayton, senior safety events Kettering, family cyber training",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Events", url: "https://www.invisionnetwork.org/events" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "EventSeries",
      name: "InVision Network Cybersecurity Workshop Series",
      description: "Regular AI scam prevention and cybersecurity workshops for Ohio families, seniors, and businesses.",
      url: "https://www.invisionnetwork.org/events",
      organizer: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
      },
      location: {
        "@type": "Place",
        name: "Kettering, Ohio",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kettering",
          addressRegion: "OH",
          postalCode: "45429",
          addressCountry: "US",
        },
      },
    },
  },

  security: {
    title: "Security & Data Protection Practices",
    description:
      "Learn how InVision Network protects your data with TLS 1.3 encryption, AES-256 at-rest encryption, MFA, and SOC 2 certified infrastructure.",
    keywords:
      "InVision Network security, data encryption, TLS 1.3, AES-256, SOC 2, MFA, cybersecurity",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Security", url: "https://www.invisionnetwork.org/security" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "InVision Network Security Practices",
      url: "https://www.invisionnetwork.org/security",
      description: "Security and data protection practices for InVision Network services.",
      about: {
        "@type": "Organization",
        name: "InVision Network",
        url: "https://www.invisionnetwork.org",
      },
    },
  },

  status: {
    title: "System Status & Service Health",
    description:
      "Real-time status of InVision Network services. Check uptime, incidents, and service health for all platforms.",
    keywords:
      "InVision Network status, system uptime, service health, incidents, platform status",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "System Status", url: "https://www.invisionnetwork.org/status" },
    ],
  },

  faq: {
    title: "FAQ — AI Scam Protection Questions Answered",
    description:
      "Answers to common questions about AI scam protection, cybersecurity training pricing, and how InVision Network keeps Ohio families safe.",
    keywords:
      "InVision Network FAQ, cybersecurity questions Ohio, AI scam protection FAQ, training pricing",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "FAQ", url: "https://www.invisionnetwork.org/faq" },
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does InVision Network actually do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "InVision Network builds AI tools like AI receptionists and automation for small businesses, runs cybersecurity education and hands-on workshops for seniors and families, and sells AI Insurance plans — ongoing support subscriptions that keep your AI tools running, updated, and monitored.",
          },
        },
        {
          "@type": "Question",
          name: "Where are you based and who do you serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "InVision Network is based in Kettering, Ohio and primarily serves the greater Dayton region. Most services — training sessions, AI deployments, and monitoring — are delivered online, so we work with families and businesses across the country.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need technical skills to work with you?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not at all. Everything we build is designed for people who don't think of themselves as tech people. Every engagement includes onboarding, plain-English documentation, and a real human you can call when something doesn't make sense.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get started?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most new clients have a first conversation within 24 hours. Education workshops can usually be booked within a week, AI tool deployments typically go live in 2–7 business days, and AI Insurance plans activate the same day you sign up.",
          },
        },
        {
          "@type": "Question",
          name: "How much does cybersecurity training cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Individual training sessions start at $89 for a 1-hour personalized AI scam protection session. Group and enterprise programs are available starting at $599. Contact us for a custom quote for your family or business.",
          },
        },
      ],
    },
  },

  help: {
    title: "Help Center & Support Resources",
    description:
      "Find answers, guides, and support resources for InVision Network's cybersecurity programs and AI systems. Browse our knowledge base or contact our team.",
    keywords:
      "InVision Network help, cybersecurity support, AI FAQ, knowledge base",
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Help Center", url: "https://www.invisionnetwork.org/help" },
    ],
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
    breadcrumbs: [
      { name: "Home", url: "https://www.invisionnetwork.org/" },
      { name: "Training", url: "https://www.invisionnetwork.org/training" },
      { name: "AI Scam Analysis", url: "https://www.invisionnetwork.org/training/ai-analysis" },
    ],
  },
} as const;
