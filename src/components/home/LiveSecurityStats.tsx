import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: true });

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
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section className="py-12 lg:py-16" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-white/10 p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Live Protection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Real-Time Security Metrics
                </h2>
              </div>
              <Link to="/portal" className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
                Full Dashboard <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-medium text-white/50">{stat.label}</div>
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
