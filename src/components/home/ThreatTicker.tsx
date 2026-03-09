import { Shield } from "lucide-react";

const tickerText = "protection";

const DecorativeIcon = () => (
  <span className="inline-flex items-center justify-center mx-6">
    <Shield className="w-5 h-5 text-muted-foreground/40" />
  </span>
);

const words = [
  "scam protection",
  "deepfake detection",
  "voice clone analysis",
  "phishing prevention",
  "family safety",
  "AI security",
];

export const ThreatTicker = () => {
  const items = [...words, ...words];

  return (
    <div className="relative overflow-hidden py-5 border-y border-border/30 bg-background">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((word, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-lg md:text-xl font-bold text-foreground/70 lowercase tracking-wide">
              {word}
            </span>
            <DecorativeIcon />
          </span>
        ))}
      </div>
    </div>
  );
};
