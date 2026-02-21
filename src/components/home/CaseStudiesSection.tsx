import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    icon: Shield,
    tag: "Family Protection",
    title: "Johnson Family Stops $12,000 Voice Clone Scam",
    summary:
      "After completing our training, the Johnson family identified a sophisticated AI voice clone impersonating their grandson requesting emergency funds.",
    result: "$12,000 saved",
    quote: "The training paid for itself a hundred times over. We recognized the scam immediately.",
  },
  {
    icon: TrendingDown,
    tag: "Business Security",
    title: "Dayton Law Firm Blocks Deepfake CEO Fraud",
    summary:
      "A regional law firm prevented a deepfake video call attempting to authorize a fraudulent wire transfer after staff completed our business program.",
    result: "$85,000 protected",
    quote: "Our entire team is now trained to verify before they trust.",
  },
  {
    icon: Users,
    tag: "Community Impact",
    title: "Senior Center Reduces Scam Losses by 94%",
    summary:
      "A Dayton-area senior center partnered with us for monthly workshops. Scam-related financial losses dropped from $47,000 to under $3,000 annually.",
    result: "94% reduction",
    quote: "Our residents feel empowered and confident online for the first time.",
  },
];

export const CaseStudiesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Real Results
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-4">
            Protection That Works
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Every week, our clients stop real scams. Here are a few of their stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="flex flex-col p-6 lg:p-8 rounded-lg border border-border/60 bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <study.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {study.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {study.summary}
              </p>
              <div className="px-4 py-3 rounded-md bg-primary/5 border border-primary/10 mb-4">
                <p className="text-2xl font-black text-primary">{study.result}</p>
              </div>
              <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-4">
                "{study.quote}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 text-sm font-semibold rounded-lg"
          >
            <Link to="/training#pricing">
              Start Your Protection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
