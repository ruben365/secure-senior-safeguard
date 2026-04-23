import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/** Human-readable label overrides for known URL segments. */
const SEGMENT_LABELS: Record<string, string> = {
  "ai": "AI & Business",
  "ai-analysis": "AI Scam Analysis",
  "ai-receptionist": "AI Receptionist",
  "ai-automation": "AI Automation",
  "website-design": "Website Design",
  "website-insurance": "Website Insurance",
  "autonomous-defense-hub": "Autonomous Defense Hub",
  "training": "Training",
  "library": "Library",
  "contact": "Contact",
  "about": "About",
  "articles": "Articles",
  "portfolio": "Portfolio",
  "careers": "Careers",
  "faq": "FAQ",
  "resources": "Resources",
  "purchase": "Purchase",
  "payment-success": "Payment Success",
  "payment-canceled": "Payment Canceled",
};

const formatName = (segment: string) =>
  SEGMENT_LABELS[segment] ??
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Hide on homepage, admin, portal, and auth routes
  if (
    pathnames.length === 0 ||
    ["admin", "portal", "auth", "login", "signup"].includes(pathnames[0])
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-white/[0.06] bg-[#0d1522]/60 backdrop-blur-sm"
    >
      <ol className="container mx-auto flex items-center gap-1.5 py-2.5 px-4 text-[12px] font-medium text-white/50 min-h-[36px]">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="inline-flex items-center gap-1 text-white/40 hover:text-white/75 transition-colors"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((segment, index) => {
          const path = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = formatName(segment);

          return (
            <li key={path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-white/25 flex-shrink-0" aria-hidden="true" />
              {isLast ? (
                <span className="text-white/80 font-semibold" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="text-white/40 hover:text-white/75 transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
