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
  breadcrumbs?: ReadonlyArray<Readonly<BreadcrumbItem>>;
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
export function buildBreadcrumbSchema(items: ReadonlyArray<Readonly<BreadcrumbItem>>) {
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
      <meta name="twitter:creator" content="@invisionnetwork" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {resolvedImageAlt && <meta name="twitter:image:alt" content={resolvedImageAlt} />}

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
