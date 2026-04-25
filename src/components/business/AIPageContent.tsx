import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ExpandableServiceCard } from "@/components/ExpandableServiceCard";
import { WebsitePricingCards } from "@/components/business/WebsitePricingCards";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { WebsiteInsuranceDialog } from "@/components/WebsiteInsuranceDialog";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import TestimonialCard from "@/components/TestimonialCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import { supabase } from "@/integrations/supabase/client";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { trackButtonClick } from "@/utils/analyticsTracker";
import {
  Phone, Mail, Calendar, CheckCircle, Search, Shield, Lock,
  Sparkles, FileText, Palette, Pen, Shapes, Image, BarChart3,
  Grid3X3, ArrowRight, Zap, Globe, Cpu, MessageSquare,
  ChevronDown, HelpCircle, X, Brain, Rocket, TrendingUp,
} from "lucide-react";
import businessReceptionist from "@/assets/business-ai-receptionist.jpg";
import businessScheduling from "@/assets/business-smart-scheduling.jpg";
import businessSupportBot from "@/assets/business-support-bot.jpg";
import businessIntake from "@/assets/business-intake-scheduling.jpg";
import "@/styles/ai-page-v6.css";

/* ── Types ── */
interface BusinessTestimonial {
  id: string;
  name: string;
  location: string;
  story: string;
  rating: number;
  testimonial_media?: Array<{
    media_type?: string;
    thumbnail_url?: string;
    file_url: string;
  }>;
}
interface InquiryConfig { name: string; price: number; tier: string; description?: string; }
interface PaymentConfig {
  mode: "subscription" | "payment";
  priceId: string;
  productName: string;
  amount: number;
  description?: string;
  features?: string[];
}

/* ── Static data ── */
const FAQ_ITEMS = [
  {
    q: "How long does it take to set up an AI agent?",
    a: "Most AI agents go live in 2 weeks. Our AI Receptionist takes about 2 weeks from kickoff to launch. The Follow-Up Engine takes 3 weeks. Complex custom builds vary, but we always give you a fixed timeline upfront.",
  },
  {
    q: "What happens if the AI makes a mistake?",
    a: "Every AI we deploy has human oversight checkpoints built in. Our AI Insurance plans cover performance issues, and our team monitors your AI continuously. If something goes wrong, we fix it — often before you notice.",
  },
  {
    q: "Do I need technical knowledge to use your AI services?",
    a: "No technical background required. We handle all the setup, integration, and training. You get plain-English documentation and a dedicated point of contact for questions.",
  },
  {
    q: "Can the AI integrate with my existing software?",
    a: "Yes. We integrate with most major platforms: Salesforce, HubSpot, Google Workspace, Microsoft 365, QuickBooks, and 50+ other tools. Custom API integrations are available for enterprise builds.",
  },
  {
    q: "What is AI Insurance and do I need it?",
    a: "AI Insurance is a maintenance and monitoring plan that keeps your AI systems running at peak performance. It covers security scanning, performance optimization, and priority support. If you depend on AI for revenue, you need it.",
  },
  {
    q: "How is pricing structured for custom AI projects?",
    a: "Custom projects are quoted after a discovery call. We price based on scope, not hours — so you know the total cost before we start. No surprise invoices. Most projects include a 30-day satisfaction guarantee.",
  },
];

/* ── Section header shared component ── */
function SectionHeader({
  badge, title, subtitle, children, dark = false,
}: {
  badge: string; title: string; subtitle?: string; children?: React.ReactNode; dark?: boolean;
}) {
  return (
    <AnimatedSection animation="fade-up" className="text-center mb-12">
      <span
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 border"
        style={{
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(124,111,208,0.08)",
          borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(124,111,208,0.18)",
          color: dark ? "rgba(255,255,255,0.85)" : "#7c6fd0",
        }}>
        <Sparkles className="w-3.5 h-3.5" />
        {badge}
      </span>
      <h2
        className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight"
        style={{ color: dark ? "#ffffff" : "#0f1724" }}>
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.7)" : "#6b7280" }}>
          {subtitle}
        </p>
      )}
      {children}
    </AnimatedSection>
  );
}

/* ── V6 Pricing Card ── */
function V6PricingCard({
  tag, tagBg, title, price, priceSuffix, priceNote,
  features, cta, onClick, featured = false, delay = 0,
}: {
  tag: string; tagBg: string; title: string; price: string;
  priceSuffix?: string; priceNote?: string; features: string[];
  cta: string; onClick: () => void; featured?: boolean; delay?: number;
}) {
  return (
    <AnimatedSection animation="scale-up" delay={delay}>
      <div className="relative h-full pt-6">
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full text-[11px] font-black tracking-wider text-white whitespace-nowrap border border-white/20 shadow-lg"
          style={{ background: tagBg }}>
          {tag}
        </div>
        <div
          className="relative h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          style={{
            background: "#ffffff",
            borderColor: featured ? "#7c6fd0" : "#e5e3de",
            boxShadow: featured ? "0 8px 40px -12px rgba(124,111,208,0.25)" : undefined,
          }}>
          <div className="h-1 w-full" style={{ background: tagBg }} />
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-3 text-center" style={{ color: "#0f1724" }}>
              {title}
            </h3>
            <div className="text-center mb-2">
              <span className="text-2xl font-black" style={{ color: featured ? "#7c6fd0" : "#e08a4a" }}>
                {price}
              </span>
              {priceSuffix && (
                <span className="text-sm ml-1" style={{ color: "#6b7280" }}>{priceSuffix}</span>
              )}
            </div>
            {priceNote && (
              <p className="text-sm text-center mb-4" style={{ color: "#6b7280" }}>{priceNote}</p>
            )}
            <ul className="space-y-3 mb-6 flex-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#2a3344" }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#4a8f90" }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onClick}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{ background: featured ? "#7c6fd0" : "#0f1724", color: "#ffffff" }}>
              {cta}
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export function AIPageContent() {
  /* ── Dialog state ── */
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryConfig | null>(null);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [testimonials, setTestimonials] = useState<BusinessTestimonial[]>([]);
  const { isAdmin, isLoading } = useAdminStatus();

  useEffect(() => {
    supabase
      .from("testimonials_public")
      .select("*, testimonial_media (*)")
      .eq("has_video", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setTestimonials(data || []));
  }, []);

  const openInquiry = useCallback((config: InquiryConfig) => {
    setInquiry(config);
    setInquiryOpen(true);
  }, []);

  const openPayment = useCallback((config: PaymentConfig) => {
    setPaymentConfig(config);
    setPaymentOpen(true);
  }, []);

  const insPrice = useCallback((monthly: number) => {
    if (isYearly) {
      const yr = Math.round(monthly * 12 * 0.9);
      return { display: `$${yr.toLocaleString()}`, period: "/year" };
    }
    return { display: `$${monthly}`, period: "/month" };
  }, [isYearly]);

  return (
    <div className="ai-page-v6 relative overflow-x-hidden" style={{ background: "#f7f6f3" }}>
      {/* Background blobs */}
      <div className="aip-blob b1" aria-hidden="true" />
      <div className="aip-blob b2" aria-hidden="true" />
      <div className="aip-blob b3" aria-hidden="true" />

      {/* ══════════════════════════════════════
          §1 — INVISION PLATFORM (split layout)
      ══════════════════════════════════════ */}
      <section id="invision-platform" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left: text */}
              <AnimatedSection animation="fade-right">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 border"
                  style={{ background: "rgba(124,111,208,0.08)", borderColor: "rgba(124,111,208,0.2)", color: "#7c6fd0" }}>
                  <Shield className="w-3.5 h-3.5" />
                  Unified AI Platform
                </span>
                <h2
                  className="text-4xl md:text-5xl font-black mb-6 leading-[1.08]"
                  style={{ color: "#0f1724" }}>
                  One Platform.{" "}
                  <span style={{ color: "#7c6fd0" }}>Every AI Service</span>{" "}
                  You Need.
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "#6b7280" }}>
                  We merged our full technology platform under one AI-first mission: help Ohio businesses
                  grow with automation while staying secure against modern threats. Learn more about{" "}
                  <Link to="/about" style={{ color: "#7c6fd0", fontWeight: 600 }}>our story</Link>.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "9 integrated AI services under one unified platform",
                    "Shared threat intelligence across all deployments",
                    "Single path: strategy call → deployment → ongoing support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#2a3344" }}>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(74,143,144,0.15)" }}>
                        <CheckCircle className="w-3 h-3" style={{ color: "#4a8f90" }} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => {
                      trackButtonClick("Request Platform Demo", "InVision Platform");
                      openInquiry({
                        name: "InVision Platform Demo",
                        price: 0,
                        tier: "Full Platform",
                        description: "Schedule a live demo of all 9 integrated AI services.",
                      });
                    }}
                    className="rounded-full px-6 font-bold"
                    style={{ background: "#7c6fd0", color: "#fff", border: "none" }}>
                    Request a Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6 font-bold">
                    <Link to="/training">View Individual Plans</Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Right: dashboard mockup */}
              <AnimatedSection animation="fade-left" delay={160}>
                <div className="aip-dashboard-mock">
                  <div className="flex items-center gap-1.5 mb-5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs ml-2 font-mono" style={{ color: "#6b7280" }}>
                      InVision AI Dashboard
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Integrated Services", value: "9", icon: Cpu, color: "#7c6fd0" },
                      { label: "Avg. Response", value: "< 90s", icon: Zap, color: "#e08a4a" },
                      { label: "Max Coverage", value: "$500K", icon: Shield, color: "#4a8f90" },
                      { label: "Uptime", value: "24/7", icon: Globe, color: "#7c6fd0" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4 text-center transition-all hover:-translate-y-0.5"
                        style={{ background: "#f7f6f3", border: "1px solid #e5e3de" }}>
                        <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: stat.color }} />
                        <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                        <p className="text-[11px] uppercase tracking-wide mt-1" style={{ color: "#6b7280" }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="p-3 rounded-xl flex items-center gap-3"
                    style={{ background: "rgba(74,143,144,0.08)", border: "1px solid rgba(74,143,144,0.2)" }}>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold" style={{ color: "#4a8f90" }}>
                      All systems operational · Last check: 12s ago
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §2 — WHAT WE BUILD FOR YOU
      ══════════════════════════════════════ */}
      <section id="services" className="py-16 md:py-24 relative z-10" style={{ background: "#ffffff" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Services"
            title="What We Build For You"
            subtitle="Pick a service below to see exactly how your business benefits." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <AnimatedSection animation="fade-left" delay={0} id="svc-ai-receptionist">
              <ExpandableServiceCard
                icon={<Phone className="w-4 h-4 text-primary" />}
                title="AI Receptionist"
                image={businessReceptionist}
                summary="Your phone gets answered 24/7. Calls are routed, appointments booked, FAQs handled. You never lose a lead.">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Every call answered, day or night.</strong>{" "}
                    Your AI Receptionist picks up 24/7, including holidays. It sounds natural, answers common questions, and sends urgent calls to the right person instantly.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: Phone, label: "24/7 Call Handling", desc: "Every call answered professionally around the clock." },
                      { icon: Search, label: "Lead Qualification", desc: "AI asks targeted questions to filter and qualify leads." },
                      { icon: MessageSquare, label: "FAQ Automation", desc: "Common questions answered accurately on the spot." },
                      { icon: Shield, label: "Spam Filtering", desc: "Blocks telemarketers and robo-calls automatically." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors">
                        <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-primary" /> {item.label}
                        </h4>
                        <p className="text-muted-foreground text-xs">{item.desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </ExpandableServiceCard>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={100} id="svc-smart-scheduling">
              <ExpandableServiceCard
                icon={<Calendar className="w-4 h-4 text-primary" />}
                title="Smart Scheduling"
                image={businessScheduling}
                summary="Appointments book themselves. Reminders go out. Calendars stay in sync. No more back-and-forth emails.">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">No more scheduling headaches.</strong>{" "}
                    Clients book through phone, chat, or your website. The AI handles rescheduling and sends reminders automatically.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Calendar, label: "Auto-Booking", desc: "Books with real-time availability." },
                      { icon: Mail, label: "Smart Reminders", desc: "Cuts no-shows by up to 80%." },
                      { icon: CheckCircle, label: "Calendar Sync", desc: "Works with Google, Outlook, and more." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 text-center border-border/60 hover:border-primary/30 transition-colors">
                        <div className="w-6 h-6 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </ExpandableServiceCard>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200} id="svc-support-bot">
              <ExpandableServiceCard
                icon={<MessageSquare className="w-4 h-4 text-primary" />}
                title="Customer Support Bot"
                image={businessSupportBot}
                summary="Answers customer questions 24/7 on your website, SMS, or WhatsApp. Your team focuses on high-value work.">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Your customers get instant answers.</strong>{" "}
                    Support bots handle FAQ responses, post-service check-ins, review requests, and re-engagement messages on autopilot.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: CheckCircle, label: "Post-Service Check-Ins", desc: "Personalized follow-ups within 24–48 hours." },
                      { icon: Sparkles, label: "Review Requests", desc: "Happy customers get prompted to leave reviews." },
                      { icon: Mail, label: "Re-Engagement", desc: "Personalized 'we miss you' messages sent automatically." },
                      { icon: Phone, label: "Multi-Channel", desc: "SMS, email, WhatsApp, or website chat." },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-primary" /> {item.label}
                        </h4>
                        <p className="text-muted-foreground text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ExpandableServiceCard>
            </AnimatedSection>

            <AnimatedSection animation="fade-right" delay={300} id="svc-intake-automation">
              <ExpandableServiceCard
                icon={<Calendar className="w-4 h-4 text-primary" />}
                title="Intake & Scheduling"
                image={businessIntake}
                summary="Collect client details, score leads, and book meetings automatically. Save hours of admin work each week.">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Onboard clients faster.</strong>{" "}
                    Your intake system gathers info, scores leads, and schedules appointments, saving hours of admin work every week.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: FileText, label: "Smart Intake Forms", desc: "Custom forms with conditional logic." },
                      { icon: Search, label: "Lead Scoring", desc: "Auto-score and prioritize your best leads." },
                      { icon: Lock, label: "Privacy-Conscious", desc: "Secure handling for healthcare, legal, and finance." },
                      { icon: CheckCircle, label: "CRM Integration", desc: "Syncs with Salesforce, HubSpot, and more." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors">
                        <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-primary" /> {item.label}
                        </h4>
                        <p className="text-muted-foreground text-xs">{item.desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </ExpandableServiceCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §3 — WEBSITES THAT SELL FOR YOU
      ══════════════════════════════════════ */}
      <section id="website-design" className="relative z-10 overflow-hidden" style={{ background: "#f7f6f3" }}>
        <WebsitePricingCards />
        {/* Veterans bar */}
        <div className="py-4 border-y" style={{ borderColor: "#e5e3de", background: "#fff" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-xl">🇺🇸</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold">
                <Shield className="w-3 h-3 mr-1" />
                10% OFF
              </Badge>
              <span className="text-sm font-medium" style={{ color: "#2a3344" }}>
                Veterans and First Responders receive an automatic discount at checkout
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §4 — AI LIFECYCLE STAGES
      ══════════════════════════════════════ */}
      <section id="ai-lifecycle" className="py-16 md:py-24 relative z-10" style={{ background: "#ffffff" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="How It Works"
            title="The AI Lifecycle"
            subtitle="Every AI deployment follows the same proven path. Here's what working with us looks like." />
          <div className="aip-lifecycle-grid max-w-5xl mx-auto">
            {[
              { icon: Brain, stage: "01", title: "Discover", color: "#e08a4a",
                desc: "We learn your business, map your workflows, and identify the highest-ROI AI opportunities." },
              { icon: FileText, stage: "02", title: "Design", color: "#7c6fd0",
                desc: "We architect your AI solution, select integrations, and plan the launch sequence." },
              { icon: Rocket, stage: "03", title: "Build", color: "#4a8f90",
                desc: "We deploy, configure, test, and train your AI agents until they perform perfectly." },
              { icon: TrendingUp, stage: "04", title: "Grow", color: "#e08a4a",
                desc: "We monitor performance, optimize continuously, and scale as your business grows." },
            ].map((item, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 100}>
                <div
                  className="aip-card relative text-center h-full"
                  style={{ borderTop: `4px solid ${item.color}` }}>
                  <div
                    className="absolute top-3 right-4 text-6xl font-black leading-none select-none"
                    style={{ color: item.color, opacity: 0.06 }}>
                    {item.stage}
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${item.color}18` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-black mb-2" style={{ color: "#0f1724" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §5 — AI AGENTS PRICING
      ══════════════════════════════════════ */}
      <section id="automation-pricing" className="py-16 md:py-24 relative z-10" style={{ background: "#f7f6f3" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="AI Automation"
            title="AI Agents Pricing"
            subtitle="Missed calls and slow follow-ups cost you real money. Your AI agents work 24/7 so you don't have to.">
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm mt-5" style={{ color: "#6b7280" }}>
              {[
                { icon: CheckCircle, text: "30-Day Guarantee" },
                { icon: Lock, text: "Secure Setup" },
                { icon: Phone, text: "24/7 Support" },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <item.icon className="w-4 h-4" style={{ color: "#4a8f90" }} /> {item.text}
                </span>
              ))}
            </div>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <V6PricingCard
              tag="🎯 START HERE"
              tagBg="linear-gradient(135deg,#e08a4a,#d96c4a)"
              title="AI Receptionist & Intake Agent"
              price="$9,500"
              priceNote="2-Week Setup"
              features={["24/7 call and chat handling", "Appointment booking", "Lead qualification", "Spam filtering"]}
              cta="GET STARTED →"
              delay={0}
              onClick={() => openInquiry({
                name: "AI Receptionist & Intake Agent", price: 9500, tier: "START HERE",
                description: "Answers calls and chats 24/7, books appointments, routes to the right person.",
              })} />
            <V6PricingCard
              tag="⭐ MOST POPULAR"
              tagBg="linear-gradient(135deg,#7c6fd0,#6a5ec0)"
              title="AI Follow-Up Engine"
              price="$12,500"
              priceNote="3-Week Setup"
              features={["Automated follow-ups (SMS, email)", "Review collection system", "Re-engagement campaigns", "Performance dashboard", "CRM integration"]}
              cta="GET STARTED →"
              featured
              delay={150}
              onClick={() => openInquiry({
                name: "AI Follow-Up Engine", price: 12500, tier: "MOST POPULAR",
                description: "Automated follow-ups, review collection, and re-engagement campaigns.",
              })} />
            <V6PricingCard
              tag="🏗️ FULL SUITE"
              tagBg="linear-gradient(135deg,#4a8f90,#3a7a7b)"
              title="Custom AI Automation"
              price="$25,000+"
              priceNote="Custom Timeline"
              features={["Everything in Follow-Up Engine", "Custom AI workflows", "Advanced analytics", "Dedicated account manager", "Priority support"]}
              cta="GET CUSTOM QUOTE"
              delay={300}
              onClick={() => openInquiry({
                name: "Custom AI Automation", price: 0, tier: "Full Suite",
                description: "Full AI automation suite with custom workflows, analytics, and dedicated support.",
              })} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §6 — AI INSURANCE
      ══════════════════════════════════════ */}
      <section id="ai-insurance" className="py-16 md:py-24 relative z-10" style={{ background: "#ffffff" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="AI Insurance"
            title="Protect Your AI Investment"
            subtitle="Your AI tools break, get hacked, or underperform. Our insurance plans keep your business running.">
            <div
              className="flex items-center justify-center gap-4 mt-5 rounded-full px-4 py-3 mx-auto w-fit border"
              style={{ background: "#fff", borderColor: "#e5e3de" }}>
              <Label
                htmlFor="ins-toggle"
                className={`text-sm font-bold cursor-pointer transition-colors ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>
                Monthly
              </Label>
              <Switch
                id="ins-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
                aria-label="Toggle yearly billing" />
              <Label
                htmlFor="ins-toggle"
                className={`text-sm font-bold cursor-pointer transition-colors ${isYearly ? "text-primary" : "text-muted-foreground"}`}>
                Yearly{" "}
                <span className="text-xs text-primary font-black bg-primary/10 px-2 py-0.5 rounded-full">(Save 10%)</span>
              </Label>
            </div>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            <V6PricingCard
              tag="🌱 BASIC"
              tagBg="linear-gradient(135deg,#4a8f90,#3a9090)"
              title="Basic Care"
              price={insPrice(199).display}
              priceSuffix={insPrice(199).period}
              priceNote="Essential Coverage"
              features={["AI health monitoring", "Email support (48hr)", "Monthly diagnostics", "Basic data backup"]}
              cta="Subscribe Now"
              delay={0}
              onClick={() => openPayment({
                mode: "subscription", priceId: "price_1SjwUQJ8osfwYbX7yV7vHoLD",
                productName: "AI Service Insurance - Basic Care", amount: 19900,
                description: "AI Insurance - Basic Care monthly subscription",
              })} />
            <V6PricingCard
              tag="⭐ MOST POPULAR"
              tagBg="linear-gradient(135deg,#7c6fd0,#6a5ec0)"
              title="Standard Care"
              price={insPrice(399).display}
              priceSuffix={insPrice(399).period}
              priceNote="Full Coverage"
              features={["Everything in Basic", "Priority support (24hr)", "Weekly optimization", "Security scanning", "Performance reports"]}
              cta="Subscribe Now"
              featured
              delay={100}
              onClick={() => openPayment({
                mode: "subscription", priceId: "price_1SjwUQJ8osfwYbX7xOHeDwqV",
                productName: "AI Service Insurance - Standard Care", amount: 39900,
                description: "AI Insurance - Standard Care monthly subscription",
              })} />
            <V6PricingCard
              tag="🏆 PREMIUM"
              tagBg="linear-gradient(135deg,#e08a4a,#d06040)"
              title="Premium Care"
              price={insPrice(799).display}
              priceSuffix={insPrice(799).period}
              priceNote="Maximum Coverage"
              features={["Everything in Standard", "24/7 emergency support", "Proactive optimization", "Custom integrations", "Dedicated account manager"]}
              cta="Subscribe Now"
              delay={200}
              onClick={() => openPayment({
                mode: "subscription", priceId: "price_1SjwUQJ8osfwYbX7Q5jRWQEt",
                productName: "AI Service Insurance - Premium Care", amount: 79900,
                description: "AI Insurance - Premium Care monthly subscription",
              })} />
            <V6PricingCard
              tag="🏢 ENTERPRISE"
              tagBg="linear-gradient(135deg,#c45e3b,#b05030)"
              title="Customized"
              price="Custom"
              priceSuffix=" pricing"
              priceNote="Tailored for your needs"
              features={["Custom SLA agreements", "Multi-location support", "Unlimited repair hours", "Dedicated manager", "Custom integrations"]}
              cta="Request Quote"
              delay={300}
              onClick={() => openInquiry({
                name: "AI Insurance - Enterprise", price: 0, tier: "Enterprise",
                description: "Custom SLA and enterprise-grade AI maintenance.",
              })} />
          </div>

          {/* Universal support note */}
          <AnimatedSection animation="scale-up" delay={200} className="mt-10">
            <div
              className="max-w-4xl mx-auto rounded-2xl p-6 border text-center"
              style={{ background: "#fff", borderColor: "#e5e3de" }}>
              <Badge className="mb-4" style={{ background: "rgba(124,111,208,0.1)", color: "#7c6fd0", border: "none" }}>
                <Globe className="w-3 h-3 mr-1" />
                Universal AI Support
              </Badge>
              <h3 className="text-2xl font-black mb-3" style={{ color: "#0f1724" }}>We Support AI From Any Vendor</h3>
              <p className="text-sm mb-5 max-w-2xl mx-auto leading-relaxed" style={{ color: "#6b7280" }}>
                It does not matter where you bought your AI. We fix, optimize, secure, and develop AI systems from any platform worldwide. We also offer{" "}
                <Link to="/training" style={{ color: "#7c6fd0", fontWeight: 600 }}>cybersecurity workshops</Link>{" "}
                to keep your team sharp.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "#2a3344" }}>
                <span><strong>No Contracts</strong> · Cancel anytime</span>
                <span><strong>Any Platform</strong> · Worldwide support</span>
                <span><strong>24–48hr Response</strong> · Fast turnaround</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §7 — CREATIVE SERVICES
      ══════════════════════════════════════ */}
      <section id="illustration" className="py-16 md:py-24 relative z-10" style={{ background: "#f7f6f3" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Creative Services"
            title="Illustration & Visual Art"
            subtitle="Professional illustration and visual design services that give your brand a distinctive, memorable identity." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Palette, title: "Illustration Design", desc: "Custom hand-crafted illustrations tailored to your brand story and audience.", grad: "linear-gradient(135deg,#e08a4a,#d06040)" },
              { icon: Shapes, title: "Vector Illustration", desc: "Clean, scalable vector artwork for digital and print. Perfect for logos and web assets.", grad: "linear-gradient(135deg,#e08a4a,#d09030)" },
              { icon: Pen, title: "Character Design", desc: "Original character concepts for your brand mascot, game, or animated content.", grad: "linear-gradient(135deg,#d09030,#e08a4a)" },
              { icon: Image, title: "Icon Design", desc: "Pixel-perfect custom icon sets that match your brand language. SVG, PNG, and icon-font formats.", grad: "linear-gradient(135deg,#4a8f90,#3a8090)" },
              { icon: BarChart3, title: "Infographic Design", desc: "Data-driven visual storytelling that turns complex information into shareable graphics.", grad: "linear-gradient(135deg,#7c6fd0,#e08a4a)" },
              { icon: Grid3X3, title: "Pattern Design", desc: "Seamless, repeatable patterns for packaging, textiles, and digital backgrounds.", grad: "linear-gradient(135deg,#e08a4a,#d09030)" },
            ].map((service, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 70}>
                <div className="aip-card h-full group cursor-default">
                  <div className="h-1.5 rounded-full mb-4" style={{ background: service.grad }} />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: service.grad }}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "#0f1724" }}>{service.title}</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "#6b7280" }}>{service.desc}</p>
                  <button
                    type="button"
                    onClick={() => openInquiry({ name: service.title, price: 0, tier: "Illustration", description: service.desc })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 hover:gap-3"
                    style={{ color: "#7c6fd0" }}>
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection animation="fade-up" delay={300} className="text-center mt-10">
            <div className="max-w-3xl mx-auto rounded-2xl p-6 border" style={{ background: "#fff", borderColor: "#e5e3de" }}>
              <h3 className="text-xl font-black mb-3" style={{ color: "#0f1724" }}>Need a Custom Visual Package?</h3>
              <p className="text-sm mb-5 max-w-xl mx-auto leading-relaxed" style={{ color: "#6b7280" }}>
                We build complete visual identity systems — illustrations, icons, patterns, and brand assets, all designed to work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => openInquiry({ name: "Custom Visual Package", price: 0, tier: "Custom", description: "Complete visual identity system." })}
                  className="rounded-full font-bold"
                  style={{ background: "#7c6fd0", color: "#fff", border: "none" }}>
                  Request Custom Quote
                </Button>
                <Button asChild variant="outline" className="rounded-full font-bold">
                  <Link to="/contact">Talk to Our Design Team</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §8 — WHY CHOOSE US — horizontal timeline
      ══════════════════════════════════════ */}
      <section id="why-choose-us" className="py-16 md:py-24 relative z-10" style={{ background: "#0f1724" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            dark
            badge="Why Choose Us"
            title="The InVision Difference"
            subtitle="What makes us different from every other AI vendor." />

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block max-w-5xl mx-auto relative mt-16">
            <div className="aip-timeline-line" />
            <div className="grid grid-cols-6 gap-2">
              {[
                { icon: Shield, title: "Security-First", desc: "Enterprise encryption & monitoring built in.", color: "#e08a4a" },
                { icon: Lock, title: "No Lock-In", desc: "Open standards. You own your AI and data.", color: "#7c6fd0" },
                { icon: FileText, title: "Plain English", desc: "Documentation your whole team can read.", color: "#4a8f90" },
                { icon: Zap, title: "Fast Launch", desc: "Most AI goes live in 2 to 4 weeks.", color: "#e08a4a" },
                { icon: Globe, title: "Ongoing Partner", desc: "Support and optimization after launch.", color: "#7c6fd0" },
                { icon: Phone, title: "24/7 Support", desc: "Our team is available around the clock.", color: "#4a8f90" },
              ].map((item, i) => (
                <AnimatedSection key={i} animation="fade-up" delay={i * 80} className="text-center pt-14 px-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border-2"
                    style={{ background: "#0f1724", borderColor: item.color }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2 text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Mobile grid */}
          <div className="md:hidden grid grid-cols-2 gap-4 max-w-sm mx-auto mt-8">
            {[
              { icon: Shield, title: "Security-First", color: "#e08a4a" },
              { icon: Lock, title: "No Lock-In", color: "#7c6fd0" },
              { icon: FileText, title: "Plain English", color: "#4a8f90" },
              { icon: Zap, title: "Fast Launch", color: "#e08a4a" },
              { icon: Globe, title: "Ongoing Partner", color: "#7c6fd0" },
              { icon: Phone, title: "24/7 Support", color: "#4a8f90" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-xl border"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: item.color }} />
                <span className="text-xs font-semibold text-white">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §9 — STATS BAR
      ══════════════════════════════════════ */}
      <section className="py-14 relative z-10" style={{ background: "#0f1724" }}>
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem" }}>
            {[
              { value: "15+", label: "Businesses Served" },
              { value: "99%+", label: "Uptime Guarantee" },
              { value: "24/7", label: "Support Available" },
              { value: "50+", label: "Integrations" },
            ].map((stat, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 80}>
                <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: i % 2 === 0 ? "#e08a4a" : "#7c6fd0" }}>
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §10 — PROCESS / 5-DAY LAUNCH TIMELINE
      ══════════════════════════════════════ */}
      <section id="process" className="py-16 md:py-24 relative z-10" style={{ background: "#f7f6f3" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Launch Timeline"
            title="From Zero to Live in 5 Days"
            subtitle="We move fast without cutting corners. Here's exactly what happens after you sign on." />
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { day: "Day 1", title: "Discovery & Planning", color: "#e08a4a", icon: Brain,
                desc: "We meet with your team, map your workflows, and define the exact AI scope. You get a written build plan same day." },
              { day: "Day 2", title: "Design & Architecture", color: "#7c6fd0", icon: FileText,
                desc: "We design your AI system architecture, select integrations, and configure your communication channels." },
              { day: "Day 3", title: "Build & Configure", color: "#4a8f90", icon: Cpu,
                desc: "We build your AI agents, connect your tools, and train the system on your business data and brand voice." },
              { day: "Day 4", title: "Test & Refine", color: "#e08a4a", icon: CheckCircle,
                desc: "Thorough QA testing across every scenario. We simulate real calls, messages, and edge cases until it's perfect." },
              { day: "Day 5", title: "Launch & Monitor", color: "#7c6fd0", icon: Rocket,
                desc: "Go live. We monitor every interaction for the first 72 hours and are on call for any immediate adjustments." },
            ].map((step, i) => (
              <AnimatedSection key={i} animation="fade-left" delay={i * 80}>
                <div className="aip-process-step">
                  <div
                    className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}14` }}>
                    <step.icon className="w-5 h-5 mb-0.5" style={{ color: step.color }} />
                    <span className="text-[10px] font-black uppercase" style={{ color: step.color }}>{step.day}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-base md:text-lg mb-1" style={{ color: "#0f1724" }}>
                      <span style={{ color: step.color }}>{step.day}: </span>{step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §11 — TESTIMONIALS
      ══════════════════════════════════════ */}
      {(isAdmin || testimonials.length > 0) && (
        <section id="testimonials" className="py-16 md:py-24 relative z-10" style={{ background: "#ffffff" }}>
          <div className="container mx-auto px-4">
            <SectionHeader badge="Client Stories" title="What Our Clients Say" />
            {isAdmin && !isLoading && testimonials.length === 0 && (
              <div className="max-w-2xl mx-auto">
                <Card className="p-6 border-2 border-dashed border-primary/30 text-center rounded-3xl">
                  <span className="text-2xl mb-4 block">💼</span>
                  <h3 className="text-xl font-bold mb-2">Business Testimonials</h3>
                  <p className="text-muted-foreground text-sm">Add client testimonials via Admin Dashboard</p>
                </Card>
              </div>
            )}
            {testimonials.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {testimonials.map((t, i) => {
                  const vid = t.testimonial_media?.find(m => m.media_type === "video");
                  return (
                    <AnimatedSection key={t.id} animation="fade-up" delay={i * 100}>
                      <TestimonialCard
                        name={t.name}
                        location={t.location}
                        quote={t.story.substring(0, 120) + "..."}
                        image={vid?.thumbnail_url || "/placeholder.svg"}
                        rating={t.rating}
                        videoUrl={vid?.file_url}
                        onVideoClick={() => vid && setSelectedVideo({ src: vid.file_url, title: `${t.name}'s Story` })}
                      />
                    </AnimatedSection>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          §12 — FAQ
      ══════════════════════════════════════ */}
      <section id="faq" className="py-16 md:py-24 relative z-10" style={{ background: "#f7f6f3" }}>
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Questions"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before getting started." />
          <div
            className="max-w-3xl mx-auto"
            style={{ background: "#fff", borderRadius: 20, border: "1px solid #e5e3de", overflow: "hidden" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="aip-faq-item">
                <button
                  type="button"
                  className="aip-faq-trigger"
                  onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                  <span>{item.q}</span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{ color: "#7c6fd0", transform: openFaqIdx === i ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {openFaqIdx === i && (
                  <div className="aip-faq-content">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §13 — FINAL CTA (sunset scheduling banner)
      ══════════════════════════════════════ */}
      <section id="cta-final" className="aip-cta-sunset">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection animation="fade-up">
            <Badge
              className="mb-6 text-xs uppercase tracking-wider font-bold"
              style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Sparkles className="w-3 h-3 mr-1" />
              Ready to Start
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
              Put AI to Work for<br className="hidden sm:block" /> Your Business Today
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              Take 15 minutes to discuss your needs. No sales pressure. We listen, ask questions, and give you a clear plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  trackButtonClick("Schedule Discovery Call", "Final CTA");
                  openInquiry({
                    name: "Business Strategy Call",
                    price: 0,
                    tier: "Discovery",
                    description: "Book a strategy call ($199, credited toward your build). We map your goals and outline a clear plan.",
                  });
                }}
                size="lg"
                className="rounded-full px-8 font-bold text-base border-none"
                style={{ background: "#e08a4a", color: "#fff" }}>
                Schedule Your Strategy Call
              </Button>
              <Button
                asChild size="lg"
                className="rounded-full px-8 font-bold text-base bg-transparent border border-white/30 text-white hover:bg-white/10">
                <Link to="/faq">View All FAQs</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              15-minute scoping call · No pressure · Quoted upfront
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════
          Floating help button + modal
      ══════════════════════════════════════ */}
      <button
        type="button"
        className="aip-help-btn"
        onClick={() => setHelpOpen(true)}
        aria-label="Get help">
        <HelpCircle className="w-6 h-6" />
      </button>

      {helpOpen && (
        <div
          className="aip-help-overlay"
          onClick={(e) => e.target === e.currentTarget && setHelpOpen(false)}>
          <div className="aip-help-panel">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black" style={{ color: "#0f1724" }}>How can we help?</h3>
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100">
                <X className="w-4 h-4" style={{ color: "#6b7280" }} />
              </button>
            </div>
            <p className="text-sm mb-5" style={{ color: "#6b7280" }}>
              Our team is available 24/7. Choose the fastest way to reach us.
            </p>
            <div className="space-y-3">
              {[
                { icon: Phone, label: "Call Us", desc: "Talk to an expert now",
                  action: () => { window.location.href = "tel:+19378001234"; setHelpOpen(false); } },
                { icon: Mail, label: "Email Us", desc: "rubenmukala09@gmail.com",
                  action: () => { window.location.href = "mailto:rubenmukala09@gmail.com"; setHelpOpen(false); } },
                { icon: Calendar, label: "Book a Call", desc: "Schedule a discovery call",
                  action: () => { setHelpOpen(false); openInquiry({ name: "Help & Support", price: 0, tier: "Support", description: "Get help from our team." }); } },
              ].map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={opt.action}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "#f7f6f3", border: "1px solid #e5e3de" }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(124,111,208,0.1)" }}>
                    <opt.icon className="w-5 h-5" style={{ color: "#7c6fd0" }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#0f1724" }}>{opt.label}</p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Dialogs ── */}
      {inquiry && (
        <ServiceInquiryDialog
          open={inquiryOpen}
          onOpenChange={setInquiryOpen}
          serviceName={inquiry.name}
          servicePrice={inquiry.price}
          serviceTier={inquiry.tier}
          serviceDescription={inquiry.description}
        />
      )}

      <WebsiteInsuranceDialog
        open={insuranceOpen}
        onOpenChange={setInsuranceOpen}
      />

      {paymentConfig && (
        <EmbeddedPaymentModal
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          mode={paymentConfig.mode}
          priceId={paymentConfig.priceId}
          productName={paymentConfig.productName}
          amount={paymentConfig.amount}
          description={paymentConfig.description}
          features={paymentConfig.features}
        />
      )}

      {selectedVideo && (
        <VideoLightbox
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo.src}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
