import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

/**
 * AnswerSummary — a concise "at a glance" block placed after the hero
 * on key pages. Gives AI search engines (and users) a direct, quotable
 * summary of what the page is about, who it serves, and what to do next.
 *
 * Designed to be visible to users (not hidden), with a subtle premium
 * look that fits the existing design system.
 */
interface AnswerSummaryProps {
  /** 2-3 sentence summary of what this page/service is about */
  summary: string;
  /** Link to the next step CTA */
  ctaHref: string;
  /** CTA button text */
  ctaLabel: string;
  /** Optional extra class */
  className?: string;
}

export function AnswerSummary({
  summary,
  ctaHref,
  ctaLabel,
  className = "",
}: AnswerSummaryProps) {
  return (
    <div
      className={`container mx-auto px-6 lg:px-8 max-w-[1600px] ${className}`}
    >
      <div className="relative bg-gradient-to-r from-orange-50/80 via-white to-orange-50/80 border border-orange-200/40 rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-sm">
        {/* Location pin */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#d96c4a]/10 border border-[#d96c4a]/20 flex items-center justify-center mt-0.5">
            <MapPin className="w-4 h-4 text-[#d96c4a]" strokeWidth={2.25} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] md:text-[15px] leading-relaxed text-slate-700 mb-3">
              {summary}
            </p>
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#d96c4a] hover:text-[#b8552f] transition-colors"
            >
              {ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerSummary;
