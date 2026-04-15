import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

/**
 * AnswerSummary — a premium "at a glance" strip placed after the hero.
 * Gives AI search engines (and users) a direct, quotable summary.
 *
 * Design: dark glass strip with brand orange accent, subtle glow,
 * and a clean CTA button — blends with the hero-to-content transition
 * instead of looking like a bolted-on info box.
 */
interface AnswerSummaryProps {
  summary: string;
  ctaHref: string;
  ctaLabel: string;
  className?: string;
}

export function AnswerSummary({
  summary,
  ctaHref,
  ctaLabel,
  className = "",
}: AnswerSummaryProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Full-width dark glass strip */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(8, 13, 26, 0.92) 0%, rgba(15, 21, 40, 0.88) 50%, rgba(8, 13, 26, 0.92) 100%)",
        }}
      >
        {/* Ambient brand glow — left */}
        <div
          aria-hidden="true"
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(217, 108, 74, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Top accent line */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(217, 108, 74, 0.4) 50%, transparent 90%)",
          }}
        />

        <div className="container mx-auto max-w-[1200px]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 py-5 md:py-6">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#d96c4a] to-[#b8552f] flex items-center justify-center shadow-[0_0_20px_-4px_rgba(217,108,74,0.5)]">
              <Shield
                className="w-5 h-5 text-white"
                strokeWidth={2.25}
              />
            </div>

            {/* Summary text */}
            <p className="flex-1 text-[14px] md:text-[15px] leading-relaxed text-white/85 m-0 max-w-none">
              {summary}
            </p>

            {/* CTA */}
            <Link
              to={ctaHref}
              className="flex-shrink-0 inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-semibold rounded-full text-white bg-gradient-to-r from-[#d96c4a]/20 to-[#d96c4a]/10 border border-[#d96c4a]/35 hover:from-[#d96c4a]/30 hover:to-[#d96c4a]/20 hover:border-[#d96c4a]/50 hover:shadow-[0_0_20px_-4px_rgba(217,108,74,0.3)] transition-all duration-250 whitespace-nowrap no-underline"
            >
              {ctaLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(217, 108, 74, 0.25) 50%, transparent 90%)",
          }}
        />
      </div>
    </div>
  );
}

export default AnswerSummary;
