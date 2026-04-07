import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnimatedStatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  className?: string;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

export function AnimatedStatCard({
  icon: Icon,
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  className,
}: AnimatedStatCardProps) {
  const { count, ref } = useCountUp(value);

  return (
    <div ref={ref} className={cn("stat-card-pro", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="icon-glow-ring p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)]">
          <Icon className="w-6 h-6 text-[hsl(var(--accent))]" />
        </div>
      </div>
      <div className="stat-number mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-semibold text-foreground/80 mb-1">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
}
