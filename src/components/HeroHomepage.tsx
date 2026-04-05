import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Shield, Phone,
  Users, TrendingUp, Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import corinePortrait from "@/assets/corine-portrait.jpg";

const stats = [
  { value: "500+",   label: "Families Protected", icon: Users },
  { value: "$1.2M",  label: "Saved From Scams",   icon: TrendingUp },
  { value: "99.8%",  label: "Detection Rate",      icon: Shield },
  { value: "< 2min", label: "Response Time",       icon: Zap },
];

export const HeroHomepage = () => {
  const heroRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    heroRef.current?.setAttribute("fetchpriority", "high");
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100dvh", backgroundColor: "#0a0a0f" }}>

      {/* Full-bleed hero image — right side */}
      <div className="absolute inset-0">
        <img
          ref={heroRef}
          src={corinePortrait}
          alt="Corine portrait — founder of Secure Senior Safeguard"
          className="w-full h-full object-cover object-right"
          loading="eager"
          decoding="sync"
        />
        {/* Strong left-to-right gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #0a0a0f 0%, #0a0a0f 25%, rgba(10,10,15,0.95) 35%, rgba(10,10,15,0.8) 50%, rgba(10,10,15,0.4) 70%, rgba(10,10,15,0.1) 85%, transparent 100%)",
          }}
        />
        {/* Bottom fade for stat cards */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0a0a0f 0%, rgba(10,10,15,0.8) 15%, rgba(10,10,15,0.3) 30%, transparent 50%)",
          }}
        />
        {/* Top fade for nav */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, transparent 12%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className="flex flex-col justify-center"
          style={{ minHeight: "100dvh", paddingTop: "clamp(72px, 14vw, 112px)", paddingBottom: "clamp(32px, 6vw, 48px)" }}
        >
          <div className="max-w-2xl xl:max-w-3xl flex-1 flex flex-col justify-center">

            {/* Live status badge */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[13px] font-medium text-white/80 leading-none">
                  2,847 threats blocked this month
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-extrabold text-white mb-5 sm:mb-6"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4.25rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              AI-Powered Scam{" "}
              <br className="hidden sm:block" />
              Protection for{" "}
              <br className="hidden sm:block" />
              Your Family
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl mb-7 sm:mb-8">
              Real-time deepfake detection, voice clone analysis, and phishing prevention.
              Veteran-founded in Ohio — protecting 500+ families.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button
                asChild
                size="lg"
                className="h-13 px-8 text-[15px] font-bold bg-white text-[#0a0a0f] hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 w-full sm:w-auto rounded-lg"
              >
                <Link to="/training#pricing">
                  <Shield className="mr-2 w-4 h-4" />
                  Start Protection — From $79
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 px-6 text-[15px] font-semibold bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30 w-full sm:w-auto rounded-lg"
              >
                <a href={SITE.phone.tel} className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call {SITE.phone.display}
                </a>
              </Button>
            </div>

            {/* Trust checkmarks */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2.5 mb-0">
              {["No long-term contracts", "Setup in under 5 minutes", "24/7 expert support"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-white/50 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat cards — pinned to bottom */}
          <div className="mt-auto pt-10 sm:pt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-4 py-4 sm:px-5 sm:py-5 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 text-white/30 mb-3 group-hover:text-white/50 transition-colors duration-300" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-none tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mt-1.5 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
