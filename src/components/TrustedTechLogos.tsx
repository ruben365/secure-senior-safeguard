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
      <div className="py-3 border-t border-white/10">
        <div className="relative overflow-hidden">
          {/* Gradient Edges — match footer dark bg */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[hsl(260_18%_12%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[hsl(260_18%_12%)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee items-center" style={{ willChange: "transform" }}>
            {[...techPartners, ...techPartners, ...techPartners].map(
              (name, index) => (
                <div key={index} className="flex-shrink-0 mx-8 flex items-center gap-2">
                  <span className="text-xs font-bold text-white/55 whitespace-nowrap tracking-widest uppercase">
                    {name}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Trust line */}
        <div className="text-center mt-2">
          <p className="text-[11px] text-white/50 tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3" />
            <span>Security-First • Privacy-First</span>
          </p>
        </div>
      </div>
    </section>
  );
});

export default TrustedTechLogos;
