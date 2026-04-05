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
} from "lucide-react";
import { TimelineVisualization } from "@/components/TimelineVisualization";
import { InspirationalVerses } from "@/components/InspirationalVerses";
import { OhioServiceMap } from "@/components/OhioServiceMap";
import { AchievementsShowcase } from "@/components/AchievementsShowcase";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { trackButtonClick } from "@/utils/analyticsTracker";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
// Team and culture photos
import teamDiverse1 from "@/assets/team-diverse-1.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import { SEO } from "@/components/SEO";
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
        "After Ruben and Corine were victims of a sophisticated data breach and extortion attempt, InVision Network was born with a mission to protect families from the same trauma they experienced.",
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
        title="About Us - Our Story, Mission & Team"
        description="Learn about InVision Network's mission to protect families from digital scams. Founded from personal experience, serving families across Ohio."
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
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <RotatingHeadlines headlines={aboutHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              From victims to protectors. Serving families across Ohio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" asChild className="border border-white/20 bg-transparent text-white hover:bg-white/[0.04]">
              <Link to="/training">Start Training</Link>
            </Button>
            <Button size="xl" asChild className="border border-white/20 bg-transparent text-white hover:bg-white/[0.04]">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Hero>
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="hidden lg:block h-14" />
      <div className="lg:hidden h-6" />

      <TrustBar />

      {/* Our Story */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#080b11] relative overflow-hidden">

        <div className="container mx-auto px-4 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-white/30 uppercase tracking-[0.15em] text-[11px] font-semibold mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                It Started With a Breach
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-white/50 leading-relaxed">
                <p>
                  When Ruben and Corine fell victim to a sophisticated data
                  breach, their worst fears came true. All their passwords,
                  emails, and personal information were exposed. Then came the
                  chilling demand: pay thousands of dollars, or their private
                  data would be sold on the dark web.
                </p>
                <p>
                  This traumatic experience transformed them from victims into
                  protectors. Even before entering the cybersecurity field,
                  they realized anyone can become a target. The attackers were
                  sophisticated, relentless, and terrifying - this drove Ruben
                  to dedicate his career to protecting others.
                </p>
                <p>
                  Today, InVision Network exists because of that painful
                  lesson. We're a team of cybersecurity analysts, nurses,
                  educators, and community advocates united by one mission:
                  ensuring no family experiences the fear and financial
                  devastation we endured.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <img
                src={teamDiverse1}
                alt="InVision Network team working together"
                className="rounded-2xl shadow-2xl w-full h-auto border border-white/[0.06]"
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

      {/* Timeline */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#0d1017] relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-white/30 uppercase tracking-[0.15em] text-[11px] font-semibold mb-4 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Milestones That Matter
            </h2>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">
              From a personal scare to protecting hundreds of families
            </p>
          </div>
          <TimelineVisualization events={timeline} />
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="py-10 sm:py-16 md:py-20 bg-[#080b11] relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-white/30 uppercase tracking-[0.15em] text-[11px] font-semibold mb-4 block">
              Meet Our Founders
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              The People Behind the Mission
            </h2>
            <p className="text-lg text-white/50 max-w-3xl mx-auto">
              United by experience, driven by purpose
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <Card className="p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-full aspect-square bg-white/[0.03] rounded-xl flex items-center justify-center border border-white/[0.06]">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">R</span>
                    </div>
                    <p className="text-sm text-white/50">Photo Coming Soon</p>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-[#080b11]">Co-Founder & CEO</Badge>
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">Ruben</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                Cybersecurity Analyst with 5 years of experience protecting
                organizations and families. After he and his wife Corine fell
                victim to a sophisticated scam that exposed their passwords
                and emails - with criminals demanding payment to delete their
                data - Ruben was inspired to enter the cybersecurity field,
                embracing a deeper mission: making enterprise-level security
                accessible to everyone.
              </p>
              <blockquote className="border-l-4 border-white/20 pl-4 italic text-sm text-white/50">
                "Everyone deserves to feel safe online, regardless of their
                technical knowledge."
              </blockquote>
            </Card>

            <Card className="p-6 sm:p-8 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-full aspect-square bg-white/[0.03] rounded-xl flex items-center justify-center border border-white/[0.06]">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/[0.06] flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">C</span>
                    </div>
                    <p className="text-sm text-white/50">Photo Coming Soon</p>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-white text-[#080b11]">Co-Founder & COO</Badge>
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">Corine</h3>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">
                Registered Nurse with 4 years of clinical experience and a
                heart for community wellness. After experiencing identity
                theft alongside her husband, Corine channeled her
                compassionate care approach into designing trauma-informed
                cybersecurity training that meets people where they are -
                especially seniors and vulnerable populations.
              </p>
              <blockquote className="border-l-4 border-white/20 pl-4 italic text-sm text-white/50">
                "Technology should empower, not intimidate. We're here to
                bridge that gap."
              </blockquote>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#0d1017]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-white/30 uppercase tracking-[0.15em] text-[11px] font-semibold mb-4 block">Our Values</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              What Drives Us Every Day
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center h-full hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white/50" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 md:py-24 bg-[#080b11] relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-12 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-white">
              Our Community Impact
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-white/50">
              Protecting families and serving our local community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, title: "Ohio-Based", desc: "Serving local communities across the Buckeye State" },
              { icon: Award, title: "Veteran-Supporting", desc: "Honoring those who served with special discounts" },
              { icon: Heart, title: "Mission-Driven", desc: "Protection over profit, always" },
            ].map((item) => (
              <div key={item.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/[0.06] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-white/50" />
                </div>
                <div className="font-bold text-xl mb-2 text-white">{item.title}</div>
                <div className="text-sm text-white/50">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-10 sm:py-16 md:py-20 bg-[#0d1017]">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-white/30 uppercase tracking-[0.15em] text-[11px] font-semibold mb-4 block">
              Who We Serve
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
              Protecting Those Who Matter Most
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              From multi-generational families to seniors learning new technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative group overflow-hidden rounded-xl border border-white/[0.06]">
              <img
                src={familyGathering}
                alt="Multi-generational family enjoying time together"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-black mb-2">Family Protection</h3>
                <p className="text-white/90 text-sm">
                  Keeping your loved ones safe across all generations.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl border border-white/[0.06]">
              <img
                src={seniorLearning}
                alt="Senior learning to use technology with instructor"
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-black mb-2">Senior Education</h3>
                <p className="text-white/90 text-sm">
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


      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#080b11] relative overflow-hidden" id="cta">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to Join Our Protected Community?
          </h2>
          <p className="text-lg md:text-xl text-white/50 mb-8 max-w-2xl mx-auto">
            Whether you're looking for personal training, business solutions, or
            want to support our mission, we'd love to connect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="xl" className="bg-white text-[#080b11] hover:bg-white/90">
              <Link
                to="/training"
                onClick={() => trackButtonClick("Start Training", "About CTA")}
              >
                Start Training
              </Link>
            </Button>
            <Button asChild size="xl" className="border border-white/20 bg-transparent text-white hover:bg-white/[0.04]">
              <Link
                to="/business"
                onClick={() => trackButtonClick("Partner With Us", "About CTA")}
              >
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
