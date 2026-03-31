import { Link } from "react-router-dom";
import {
  ArrowRight, Shield, Star, Phone,
  Users, Lock, Award, TrendingUp, Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import heroImage from "@/assets/hero-homepage-cinematic.jpg";

const stats = [
  { value: "500+",   label: "Families Protected", icon: Users },
  { value: "$1.2M",  label: "Saved From Scams",   icon: TrendingUp },
  { value: "99.8%",  label: "Detection Rate",      icon: Shield },
  { value: "< 2min", label: "Response Time",       icon: Zap },
];

const trustPills = [
  { icon: Award,  text: `${SITE.veteranDiscountPercent}% Veteran Discount` },
  { icon: Lock,   text: `${SITE.moneyBackGuaranteeDays}-Day Money Back` },
  { icon: Shield, text: "Privacy-First Approach" },
];

const threatItems = ["Voice Cloning", "Deepfake AI", "Phishing Links"];

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]">

      {/* ── Full-bleed background ── */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Multi-generational family safely using technology together"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Deep left gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background)/0.92)] lg:via-[hsl(var(--background)/0.80)] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background)/0.3)] to-transparent" />
        {/* Subtle blue tint overlay for brand cohesion */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Live status badge */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-border/60 shadow-sm">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  2,847 threats blocked this month
                </span>
                <span className="hidden xs:block w-px h-3.5 bg-border" />
                <span className="hidden xs:block text-[11px] font-bold text-primary uppercase tracking-wider">Live</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-foreground mb-5 sm:mb-6" style={{ lineHeight: "1.06" }}>
              <span className="block">AI-Powered</span>
              <span className="text-primary">Scam Protection</span>
              <span className="block">for Your Family</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl mb-8 sm:mb-10">
              Real-time deepfake detection, voice clone analysis, and phishing prevention.
              Veteran-founded in Ohio — protecting 500+ families.
            </p>

            {/* Trust checkpoints */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 sm:mb-10">
              {["No long-term contracts", "Setup in under 5 minutes", "24/7 expert support"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground/80">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
              <Button
                asChild
                size="lg"
                className="h-12 px-7 text-base font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 border-0"
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
                className="h-12 px-7 text-base font-semibold bg-white/80 backdrop-blur-sm border-border/80 hover:bg-white hover:border-primary/30 hover:text-primary text-foreground"
              >
                <a href={SITE.phone.tel}>
                  <Phone className="mr-2 w-4 h-4" />
                  Call {SITE.phone.display}
                </a>
              </Button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/90 border border-border/60 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm"
                >
                  <stat.icon className="w-4 h-4 text-primary mb-2" />
                  <div className="text-xl sm:text-2xl font-extrabold text-foreground font-heading leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating security card (xl+) ── */}
      <div className="hidden xl:block absolute top-1/4 right-16 z-20">
        <div className="w-56 rounded-2xl bg-white/95 border border-border/50 shadow-2xl shadow-blue-900/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Shield Active</div>
              <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide">Protected</div>
            </div>
          </div>
          <div className="space-y-2.5">
            {threatItems.map((threat) => (
              <div key={threat} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{threat}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Blocked
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating rating card (xl+) ── */}
      <div className="hidden xl:block absolute bottom-32 right-20 z-20">
        <div className="rounded-2xl bg-white/95 border border-border/50 shadow-xl shadow-blue-900/8 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">5.0 Rating</div>
              <div className="text-[10px] text-muted-foreground font-medium">100+ verified reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom trust bar ── */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/40 bg-white/90 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">5.0 — Rated by Ohio Families</span>
            </div>
            {/* Trust pills */}
            <div className="hidden md:flex items-center gap-2">
              {trustPills.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border/40"
                >
                  <item.icon className="w-3 h-3 text-primary" />
                  <span className="text-[11px] font-semibold text-foreground/70">{item.text}</span>
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
