import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Heart,
  Shield,
  Users,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import { TimelineVisualization } from "@/components/TimelineVisualization";
import { InspirationalVerses } from "@/components/InspirationalVerses";
import { OhioServiceMap } from "@/components/OhioServiceMap";
import { AchievementsShowcase } from "@/components/AchievementsShowcase";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { trackButtonClick } from "@/utils/analyticsTracker";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import { SectionDivider, MeshBackground, GlowCard } from "@/components/pro";
// Team and culture photos
import teamDiverse1 from "@/assets/team-diverse-1.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";
import fieldSunsetCta from "@/assets/field-sunset-cta.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import { SEO } from "@/components/SEO";
import { AnswerSummary } from "@/components/AnswerSummary";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { useAdminStatus } from "@/hooks/useAdminStatus";

// Rotating hero headlines for About page
const aboutHeadlines = [
  "Protecting Families, One Story at a Time",
  "Founded from Personal Experience",
  "Driven by Community Impact",
  "Your Safety is Our Mission",
];

function About() {
  const { isAdmin, isLoading } = useAdminStatus();
  const [showAdminBanner, setShowAdminBanner] = useState(true);

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description:
        "After our founders were victims of a sophisticated data breach and extortion attempt, InVision Network was born with a mission to protect families from the same trauma they experienced.",
    },
    {
      year: "Early 2024",
      title: "First Families Protected",
      description:
        "Our training programs began reaching families in the Dayton area, helping them identify and avoid sophisticated scam attempts.",
    },
    {
      year: "Late 2024",
      title: "Launched ScamShield AI",
      description:
        "Introduced AI-powered scam detection technology, helping seniors and vulnerable populations identify threats in real-time.",
    },
    {
      year: "Early 2025",
      title: "Expanded to Business Services",
      description:
        "Launched corporate training programs and AI automation services to help businesses protect their operations.",
    },
    {
      year: "Present Day",
      title: "Growing & Protecting",
      description:
        "Today we're protecting over 100 families across Ohio and growing our mission to create a scam-free community.",
    },
  ];

  const aboutHeroImages = PROFESSIONAL_HERO_IMAGES.about;

  const values = [
    {
      icon: Shield,
      title: "Protection First",
      description:
        "Every decision we make prioritizes the safety and security of our community.",
    },
    {
      icon: Heart,
      title: "Compassionate Approach",
      description:
        "We understand the fear and vulnerability that comes with digital threats.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Built by the community, for the community. Your safety is our mission.",
    },
    {
      icon: Award,
      title: "Excellence in Training",
      description:
        "Our programs are designed by security experts with decades of combined experience.",
    },
  ];

  return (
    <PageTransition variant="fade">
      <SEO
        title="About InVision Network — Cybersecurity Experts in Kettering, Ohio"
        description="Meet the team behind InVision Network. Founded in Kettering, Ohio, we protect Southwest Ohio families and businesses from AI-powered scams, deepfakes, and digital fraud."
        keywords="InVision Network about, cybersecurity Kettering Ohio, Southwest Ohio AI protection"
        breadcrumbs={[
          { name: "Home", url: "https://www.invisionnetwork.org/" },
          { name: "About", url: "https://www.invisionnetwork.org/about" },
        ]}
      />
      <Navigation overlay />

      {/* Hero */}
      <div className="relative">
        <Hero
          backgroundImages={aboutHeroImages}
          headline=""
          subheadline=""
          showScrollIndicator={true}
        >
          <div className="text-left mb-6 sm:mb-8">
            <h1 className="font-extrabold text-white mb-4 leading-[1.05] tracking-tight text-[clamp(2.525rem,5.75vw,4.5rem)]">
              <RotatingHeadlines headlines={aboutHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              From victims to protectors. Serving families across Ohio.
            </p>
          </div>
          <div className="flex w-full max-w-[18rem] flex-col gap-2.5 sm:max-w-none sm:flex-row sm:gap-4 sm:justify-start">
            <Button
              size="heroPill"
              variant="heroPrimary"
              className="w-full px-[18px] text-[12.5px] tracking-[0.01em] sm:w-auto sm:px-6 sm:text-[13px] sm:tracking-[0.02em]"
              asChild
            >
              <Link to="/training">Start Training</Link>
            </Button>
            <Button
              size="heroPill"
              variant="heroOutline"
              className="w-full px-[18px] text-[12.5px] tracking-[0.01em] text-white hover:text-white sm:w-auto sm:px-6 sm:text-[13px] sm:tracking-[0.02em]"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Hero>
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="hidden lg:block h-8" />
      <div className="lg:hidden h-4" />

      {/* Answer summary — who we are at a glance */}
      <AnswerSummary
        summary="InVision Network is a cybersecurity company founded in Kettering, Ohio. We protect families and small businesses from AI-powered scams through hands-on training, automated defenses, and 24/7 monitoring — serving the greater Dayton area and beyond."
        ctaHref="/contact"
        ctaLabel="Get in touch with our team"
        className="py-6"
      />

      <TrustBar />

      <div className="below-fold-premium">
      {/* Our Story */}
      <MeshBackground variant="subtle" withOrbs>
      <section className="premium-section-shell py-10 md:py-14 bg-transparent relative overflow-hidden">

        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                Our Story
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
                It Started With a <span className="text-primary">Breach</span>
              </h2>
              <div className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
                <p>
                  When our founders fell victim to a sophisticated data
                  breach, their worst fears came true. All their passwords,
                  emails, and personal information were exposed. Then came the
                  chilling demand: pay thousands of dollars, or their private
                  data would be sold on the dark web.
                </p>
                <p>
                  This traumatic experience transformed them from victims into
                  protectors. Even before entering the cybersecurity field,
                  they realized anyone can become a target. The attackers were
                  sophisticated, relentless, and terrifying — this drove our founders
                  to dedicate their careers to protecting others.
                </p>
                <p>
                  Today, InVision Network exists because of that painful
                  lesson. We're a team of cybersecurity analysts, nurses,
                  educators, and community advocates united by one mission:
                  ensuring no family experiences the fear and financial
                  devastation we endured. If you'd like to learn more, <Link to="/contact" className="text-primary hover:underline font-medium">get in touch</Link> with our team.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <img
                src={teamDiverse1}
                alt="InVision Network team working together"
                className="rounded-2xl shadow-2xl w-full h-auto border-4 border-primary/20"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-xl shadow-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">
                  100+
                </div>
                <div className="text-xs sm:text-sm md:text-base">
                  Families Protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </MeshBackground>

      <SectionDivider variant="wave" color="muted" />

      {/* Timeline */}
      <section className="premium-section-shell py-10 md:py-14 bg-muted/30 relative overflow-hidden">

        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              Milestones That <span className="text-primary">Matter</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From a personal scare to protecting hundreds of families
            </p>
          </div>
          <TimelineVisualization events={timeline} />
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="premium-section-shell py-10 md:py-14 bg-background relative overflow-hidden">

        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              Meet Our Founders
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              The People Behind the <span className="text-primary">Mission</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              United by experience, driven by purpose
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="p-5 sm:p-6 border border-border/40 bg-card/70 backdrop-blur-xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-4">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">R</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Photo Coming Soon</p>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px]">Co-Founder & CEO</Badge>
              </div>
              <h3 className="text-xl font-black mb-1.5 text-foreground">Co-Founder &amp; CEO</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Cybersecurity Analyst with 5 years of experience protecting
                organizations and families. After falling victim to a
                sophisticated scam that exposed passwords and emails — with
                criminals demanding payment to delete personal data — he was
                inspired to enter the cybersecurity field, embracing a deeper
                mission: making enterprise-level security accessible to
                everyone through <Link to="/training" className="text-primary hover:underline font-medium">our workshops</Link> and hands-on education.
              </p>
              <blockquote className="border-l-2 border-primary pl-3 italic text-xs text-muted-foreground">
                "Everyone deserves to feel safe online, regardless of their
                technical knowledge."
              </blockquote>
            </Card>

            <Card className="p-5 sm:p-6 border border-border/40 bg-card/70 backdrop-blur-xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-4">
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center border-2 border-dashed border-accent/30">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-accent">C</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Photo Coming Soon</p>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px]">Co-Founder & COO</Badge>
              </div>
              <h3 className="text-xl font-black mb-1.5 text-foreground">Co-Founder &amp; COO</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Registered Nurse with 4 years of clinical experience and a
                heart for community wellness. After experiencing identity
                theft firsthand, she channeled her compassionate care
                approach into designing trauma-informed cybersecurity
                training that meets people where they are — especially
                seniors and vulnerable populations.
              </p>
              <blockquote className="border-l-2 border-primary pl-3 italic text-xs text-muted-foreground">
                "Technology should empower, not intimidate. We're here to
                bridge that gap."
              </blockquote>
            </Card>
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="muted" flip />

      {/* Values */}
      <MeshBackground variant="vibrant" withDots>
      <section className="premium-section-shell py-10 md:py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="frosted-pill mb-3">Our Values</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              What Drives Us <span className="gradient-text-brand">Every Day</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <GlowCard key={value.title} className="text-center h-full p-4">
                  <div className="icon-glow-ring w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)] flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[hsl(var(--accent))]" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">
                    {value.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
      </MeshBackground>

      <SectionDivider variant="mountains" color="background" />

      {/* Community Impact */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ohioNatureImpact})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 drop-shadow-lg text-white">
              Our Community Impact
            </h2>
            <p className="text-base max-w-2xl mx-auto drop-shadow-md text-white/95">
              Protecting families and serving our local community
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              { icon: MapPin, title: "Ohio-Based", desc: "Serving local communities across the Buckeye State" },
              { icon: Award, title: "Veteran-Supporting", desc: "Honoring those who served with special discounts" },
              { icon: Heart, title: "Mission-Driven", desc: "Protection over profit, always" },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 shine-hover">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-white/15 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-sm mb-1">{item.title}</div>
                <div className="text-[11px] text-white/95 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="background" flip />

      {/* Who We Help */}
      <section className="premium-section-shell py-10 md:py-14 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              Who We Serve
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
              Protecting Those Who <span className="text-primary">Matter Most</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From multi-generational families to seniors learning new technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="relative group overflow-hidden rounded-xl shadow-lg border border-border/60">
              <img
                src={familyGathering}
                alt="Multi-generational family enjoying time together"
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-black mb-1">Family Protection</h3>
                <p className="text-white/90 text-xs">
                  Keeping your loved ones safe across all generations.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg border border-border/60">
              <img
                src={seniorLearning}
                alt="Senior learning to use technology with instructor"
                className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-black mb-1">Senior Education</h3>
                <p className="text-white/90 text-xs">
                  Patient, compassionate training for seniors online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Verses */}
      <InspirationalVerses />

      {/* Achievements Showcase */}
      <AchievementsShowcase />

      {/* Service Areas with Interactive Map */}
      <OhioServiceMap />


      {/* CTA with Field Background */}
      <section className="premium-section-shell py-10 md:py-14 relative overflow-hidden bg-muted/30" id="cta">

        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
            Ready to Join Our Protected Community?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-2xl mx-auto">
            Whether you're looking for personal training, <Link to="/ai" className="text-primary underline hover:text-primary/80 font-medium">AI systems</Link>, or
            want to support our mission, we'd love to connect.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link
                to="/training"
                onClick={() => trackButtonClick("Start Training", "About CTA")}
              >
                Start Training
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                to="/ai"
                onClick={() => trackButtonClick("Explore AI", "About CTA")}
              >
                Explore AI
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>

      <Footer />

      {isAdmin && showAdminBanner && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold mb-1">Admin View Active</p>
              <p className="text-sm opacity-90">
                You're viewing admin-only content. Regular users won't see this
                banner.
              </p>
            </div>
            <button
              onClick={() => setShowAdminBanner(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}

export default About;
