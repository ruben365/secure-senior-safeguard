import { useEffect, useRef, useState } from "react";
import { Shield, Users, Clock, Activity, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Stat {
  id: string;
  icon: typeof Shield;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { id: "threats", icon: Shield, value: 12847, label: "Threats Blocked" },
  { id: "families", icon: Users, value: 523, suffix: "+", label: "Families Protected" },
  { id: "response", icon: Clock, value: 0.3, suffix: "s", prefix: "<", label: "Response Time" },
  { id: "uptime", icon: Activity, value: 99.97, suffix: "%", label: "System Uptime" },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 1.8 }: { value: number; prefix?: string; suffix?: string; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [duration, isInView, value]);

  const decimals = Number.isInteger(value) ? 0 : 2;
  const formatted = decimals === 0 ? Math.round(displayValue).toLocaleString() : displayValue.toFixed(decimals);

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
};

export const LiveSecurityStats = () => {
  const [liveStats, setLiveStats] = useState(stats);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) =>
        prev.map((stat) =>
          stat.id === "threats" ? { ...stat, value: stat.value + Math.floor(Math.random() * 4) + 1 } : stat
        )
      );
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-foreground">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Live Protection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-background leading-tight">
                  Real-Time Security Metrics
                </h2>
              </div>
              <Link to="/portal" className="inline-flex items-center gap-2 text-sm font-semibold text-background/60 hover:text-background transition-colors">
                Full Dashboard <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.id} className="rounded-2xl bg-background/[0.08] border border-background/[0.1] p-6 hover:bg-background/[0.12] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-background/80" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-background mb-1">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-background/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSecurityStats;
