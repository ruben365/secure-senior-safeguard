import { Link } from "react-router-dom";
import { ArrowRight, Shield, Phone, Users, TrendingUp, Zap, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import heroImage from "@/assets/hero-homepage-cinematic.jpg";

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-background">
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 min-h-[92vh] items-center py-20 lg:py-24">

            {/* Left Content */}
            <div className="max-w-xl">
              {/* Headline with serif italic accent */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-black text-foreground leading-[1.05] mb-6 tracking-tight">
                Perfect{" "}
                <br className="hidden sm:block" />
                Scam Protection{" "}
                <br className="hidden sm:block" />
                With <span className="font-display italic text-primary">InVision</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                Unlock your full potential with tailored protection programs,
                all crafted to help you achieve your family's digital safety goals.
              </p>

              {/* CTAs - fitup style */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Button asChild size="lg" className="rounded-full h-12 px-7 bg-foreground text-background hover:bg-foreground/90 font-bold text-sm uppercase tracking-wider">
                  <Link to="/training#pricing">
                    Get Started
                  </Link>
                </Button>
                <Link
                  to="/about"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 underline underline-offset-4 decoration-border"
                >
                  Join Our Community
                </Link>
              </div>

              {/* Social icons row */}
              <div className="flex items-center gap-5 mb-10">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Youtube, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Members trust badge - like fitup avatar row */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex -space-x-2">
                  {["bg-primary/80", "bg-accent/80", "bg-foreground/60", "bg-primary/60", "bg-accent/60"].map((bg, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full ${bg} border-2 border-background flex items-center justify-center`}>
                      <span className="text-[10px] font-bold text-primary-foreground">
                        {["JM", "RS", "DW", "LT", "MK"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">500+ Members</p>
                  <p className="text-xs text-muted-foreground">Protected families</p>
                </div>
              </div>

              {/* Stats row - like fitup 500k+ / 10k+ */}
              <div className="flex items-start gap-12">
                <div>
                  <div className="text-3xl md:text-4xl font-black text-foreground">500+</div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[120px] leading-snug">
                    Personalized protection programs delivered
                  </p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-black text-foreground">$1.2M+</div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[120px] leading-snug">
                    Saved for families from AI scams
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image with floating widgets */}
            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Multi-generational family safely using technology together"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
                {/* Subtle blue overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/5" />
              </div>

              {/* Floating widget - top right */}
              <div className="absolute -top-4 -right-4 lg:right-4 z-20">
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 p-4 shadow-lg max-w-[200px]">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Weekly Overview</p>
                  <div className="flex items-end gap-1 h-10">
                    {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-primary/20 relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-sm bg-primary" style={{ height: `${h * 0.7}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">Threats Blocked</span>
                    <span className="text-xs font-bold text-primary">+23%</span>
                  </div>
                </div>
              </div>

              {/* Floating widget - bottom left - like fitup "yoga performance" */}
              <div className="absolute -bottom-6 -left-4 lg:left-4 z-20">
                <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/40 p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">99.8% Detection</p>
                      <p className="text-xs text-muted-foreground">AI-powered scanning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
