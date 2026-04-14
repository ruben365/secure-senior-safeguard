import { cn } from "@/lib/utils";
import { Shield, Award, CheckCircle, Lock, Star } from "lucide-react";

const trustItems: { icon: typeof Shield; text: string; href?: string }[] = [
  { icon: Shield, text: "Military-Grade Encryption" },
  { icon: Award, text: "BBB Accredited", href: "https://www.bbb.org/search?find_text=invision+network&find_loc=Kettering%2C+OH+45429" },
  { icon: CheckCircle, text: "SOC 2 Compliant" },
  { icon: Lock, text: "Privacy First" },
  { icon: Star, text: "4.9/5 Customer Rating" },
  { icon: Shield, text: "24/7 Monitoring" },
  { icon: Award, text: "Ohio Trusted Business" },
  { icon: CheckCircle, text: "100% Satisfaction Guarantee" },
];

interface TrustMarqueeProps {
  className?: string;
}

export function TrustMarquee({ className }: TrustMarqueeProps) {
  const items = [...trustItems, ...trustItems];

  return (
    <div className={cn("marquee-container py-4", className)}>
      <div className="marquee-track">
        {items.map((item, i) => {
          const inner = (
            <>
              <item.icon className="w-4 h-4 text-[hsl(var(--accent))]" />
              <span className="text-sm font-medium text-foreground/80">
                {item.text}
              </span>
            </>
          );
          return item.href ? (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.text}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-[hsl(var(--primary)/0.04)] border border-[hsl(var(--primary)/0.08)] whitespace-nowrap hover:border-[hsl(var(--primary)/0.2)] transition-colors"
            >
              {inner}
            </a>
          ) : (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-[hsl(var(--primary)/0.04)] border border-[hsl(var(--primary)/0.08)] whitespace-nowrap"
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
