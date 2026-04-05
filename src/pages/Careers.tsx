import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  Zap,
  Target,
  Clock,
  Briefcase,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { JOB_POSITIONS, DEPARTMENTS } from "@/config/jobPositions";
import { JobCard } from "@/components/careers/JobCard";
import { JobApplicationModal } from "@/components/careers/JobApplicationModal";
import type { JobPosition } from "@/config/jobPositions";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import supportAgent from "@/assets/support-agent.jpg";

const companyValues = [
  {
    icon: Heart,
    title: "Mission-Driven",
    description:
      "Every feature we build protects families. Our work has real-world impact every day.",
  },
  {
    icon: Users,
    title: "Empathy First",
    description:
      "We build for seniors and vulnerable users. Compassion guides every decision.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Cutting-edge AI meets practical solutions. We're solving problems that matter.",
  },
  {
    icon: Target,
    title: "Inclusivity",
    description:
      "Diverse teams build better products. We welcome all backgrounds and perspectives.",
  },
];

const benefits = [
  {
    category: "Health",
    items: ["Medical, Dental, Vision", "Mental health support", "Wellness stipend"],
  },
  {
    category: "Financial",
    items: ["401(k) match", "Stock options", "Performance bonuses"],
  },
  {
    category: "Work-Life",
    items: ["Unlimited PTO", "Remote-first", "Flexible hours"],
  },
  {
    category: "Growth",
    items: ["Learning budget", "Conference attendance", "Mentorship"],
  },
  {
    category: "Family",
    items: ["Parental leave", "Family scam protection", "Childcare stipend"],
  },
  {
    category: "Perks",
    items: ["Home office setup", "Team retreats", "Free snacks"],
  },
];

const applicationSteps = [
  { step: "1", title: "Apply", description: "Submit your application (10 min)", duration: "10 min" },
  { step: "2", title: "Screen", description: "Brief phone call with our team", duration: "20 min" },
  { step: "3", title: "Interview", description: "Meet the team and discuss the role", duration: "1 hour" },
  { step: "4", title: "Offer", description: "Receive your offer within 3 days", duration: "3 days" },
];

function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [applyJob, setApplyJob] = useState<JobPosition | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filteredJobs =
    selectedDepartment === "all"
      ? JOB_POSITIONS
      : JOB_POSITIONS.filter((job) => job.department === selectedDepartment);

  const featuredCount = JOB_POSITIONS.filter((j) => j.featured).length;
  const careersHeroImages = PROFESSIONAL_HERO_IMAGES.careers;

  const handleApply = (job: JobPosition) => {
    setApplyJob(job);
    setShowApplyModal(true);
  };

  return (
    <PageTransition variant="fade">
      <SEO
        title="Careers - Join Our Mission"
        description="Join InVision Network and help protect families from AI-powered scams. Remote-first culture, competitive benefits, meaningful work. Open positions in engineering, support, design, and more."
      />
      <Navigation overlay />

      {/* Hero */}
      <div className="relative">
        <Hero
          backgroundImages={careersHeroImages}
          headline="Join Our Mission"
          subheadline="Help us protect families from AI-powered scams"
          showProtectionBadge
          badgeText="We're Hiring"
        />
        <HeroFloatingStats />
      </div>
      <div className="h-6" />
      <TrustBar />

      {/* Why InVision */}
      <section className="py-20 bg-[#080b11]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-white/[0.06] bg-white/[0.03]">
              <Sparkles className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70">Why InVision?</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] text-white">
              Work That Matters
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-white/50">
              Join a team that's using AI to protect vulnerable families.
              Every line of code, every support call, every design decision
              makes the world safer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4 mt-2">
                    <IconComponent className="w-7 h-7 text-white/70" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-sm text-white/50">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[#0d1017]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-white/[0.06] bg-white/[0.03]">
              <Briefcase className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70">{JOB_POSITIONS.length} Open Roles</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] text-white">
              Open Positions
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-white/50">
              Find your role in protecting families — {featuredCount} featured roles hiring now
            </p>
          </div>

          {/* Department Tabs */}
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment} className="mb-8">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
              {DEPARTMENTS.map((dept) => (
                <TabsTrigger key={dept} value={dept} className="capitalize">
                  {dept === "all" ? `All (${JOB_POSITIONS.length})` : dept}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>

          {/* Don't see your role CTA */}
          <Card className="mt-12 max-w-3xl mx-auto bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Don't See Your Role?</CardTitle>
              <CardDescription className="text-base text-white/50">
                We're always looking for talented people who care about our mission
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" className="bg-white text-[#080b11] hover:bg-white/90" asChild>
                <Link to="/contact">Send Us Your Resume</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-[#080b11]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-white/[0.06] bg-white/[0.03]">
              <Heart className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70">Benefits</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] text-white">
              Comprehensive Benefits
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-white/50">
              We take care of our team so you can focus on the mission
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {benefits.map((category, index) => (
              <div key={index} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-300">
                <h3 className="text-lg font-bold mb-3 text-white">{category.category}</h3>
                <ul className="space-y-2.5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      </div>
                      <span className="text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-[#0d1017]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-white/[0.06] bg-white/[0.03]">
              <Target className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70">How to Apply</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] text-white">
              Simple Application Process
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-white/50">
              From application to offer in as little as one week
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {applicationSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl text-center p-6 h-full hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] text-white flex items-center justify-center mx-auto mb-4 text-xl font-black">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{step.description}</p>
                  <Badge variant="outline" className="text-xs border-white/[0.06] text-white/50">
                    <Clock className="w-3 h-3 mr-1" />
                    {step.duration}
                  </Badge>
                </div>
                {index < applicationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-white/20 text-xl font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-[#080b11]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-white/[0.06] bg-white/[0.03]">
              <Users className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70">Our Culture</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] text-white">
              Life at InVision
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-white/50">
              A remote-first culture built on trust, transparency, and making a difference
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            <div className="relative rounded-xl overflow-hidden group border border-white/[0.06]">
              <img
                src={teamCollaboration}
                alt="Our team collaborating in a meeting"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-1 text-white">Collaborative Spirit</h3>
                <p className="text-white/50 text-sm">Ideas flow freely in our open environment</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group border border-white/[0.06]">
              <img
                src={supportAgent}
                alt="Support team member helping customers"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-1 text-white">People First</h3>
                <p className="text-white/50 text-sm">We genuinely care about every customer</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Globe, title: "Remote-First", desc: "Work from anywhere. We have team members across 12 states and growing." },
              { icon: TrendingUp, title: "Growth-Focused", desc: "$2k/year learning budget. Conference attendance. 1-on-1 mentorship." },
              { icon: Shield, title: "Mission-Driven", desc: "Every team member gets free family protection. Your loved ones stay safe too." },
            ].map((item, index) => (
              <div key={index} className="bg-white/[0.03] border border-white/[0.06] rounded-xl text-center p-6 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white/70" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#0d1017]">
        <AIImageDisclaimer />
      </section>

      <Footer />

      {/* Application Modal */}
      <JobApplicationModal
        job={applyJob}
        open={showApplyModal}
        onOpenChange={setShowApplyModal}
      />
    </PageTransition>
  );
}

export default Careers;
