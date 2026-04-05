import { cn } from "@/lib/utils";

type DividerVariant = "wave" | "curve" | "slant" | "mountains" | "zigzag";
type DividerColor = "background" | "muted" | "primary" | "card";

interface SectionDividerProps {
  variant?: DividerVariant;
  color?: DividerColor;
  flip?: boolean;
  className?: string;
}

const colorMap: Record<DividerColor, string> = {
  background: "hsl(var(--background))",
  muted: "hsl(var(--muted))",
  primary: "hsl(var(--primary))",
  card: "hsl(var(--card))",
};

export function SectionDivider({
  variant = "wave",
  color = "background",
  flip = false,
  className,
}: SectionDividerProps) {
  const fill = colorMap[color];

  const paths: Record<DividerVariant, string> = {
    wave: "M0,64 C320,120 480,0 720,64 C960,128 1120,10 1440,64 L1440,160 L0,160 Z",
    curve: "M0,128 Q720,0 1440,128 L1440,160 L0,160 Z",
    slant: "M0,160 L1440,60 L1440,160 L0,160 Z",
    mountains: "M0,160 L240,80 L480,120 L720,40 L960,100 L1200,60 L1440,90 L1440,160 L0,160 Z",
    zigzag: "M0,100 L120,60 L240,100 L360,60 L480,100 L600,60 L720,100 L840,60 L960,100 L1080,60 L1200,100 L1320,60 L1440,100 L1440,160 L0,160 Z",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-[0] pointer-events-none select-none",
        flip && "rotate-180",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] md:h-[100px] block"
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}
