import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteCalloutCard } from "@/components/shared/SiteCalloutCard";

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
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <SiteCalloutCard
          eyebrow="Connected platform"
          icon={Shield}
          description={
            <p className="m-0 max-w-none text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {summary}
            </p>
          }
          action={
            <Button asChild size="lg">
              <Link to={ctaHref}>
                {ctaLabel}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default AnswerSummary;
