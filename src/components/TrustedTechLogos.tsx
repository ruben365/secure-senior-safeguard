import { forwardRef } from "react";
import { Shield } from "lucide-react";

const techPartners = [
  "OpenAI",
  "Google AI",
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Meta AI",
  "NVIDIA",
  "Cloudflare",
  "Stripe",
];

const TrustedTechLogos = forwardRef<HTMLDivElement>(function TrustedTechLogos(_props, ref) {
  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="py-3 border-t border-border/15">
        <div className="relative overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[hsl(260_18%_12%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[hsl(260_18%_12%)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-left items-center">
            {[...techPartners, ...techPartners, ...techPartners].map(
              (name, index) => (
                <div key={index} className="flex-shrink-0 mx-8 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-white/25 whitespace-nowrap tracking-widest uppercase">
                    {name}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Trust line */}
        <div className="text-center mt-2">
          <p className="text-[9px] text-white/20 tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Shield className="w-2.5 h-2.5" />
            <span>Security-First • Privacy-First</span>
          </p>
        </div>
      </div>
    </section>
  );
});

export default TrustedTechLogos;
