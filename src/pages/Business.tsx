import { useState, useCallback, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroBusiness } from "@/components/HeroBusiness";
import { PageTransition } from "@/components/PageTransition";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { SEO } from "@/components/SEO";
import { trackButtonClick } from "@/utils/analyticsTracker";

function Business() {
  const [heroInquiryOpen, setHeroInquiryOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const openStrategyCall = useCallback(() => {
    setHeroInquiryOpen(true);
    trackButtonClick("Book Strategy Call", "Business Hero");
  }, []);

  const resizeIframe = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentWindow.document;
      const height = Math.max(
        doc.body?.scrollHeight ?? 0,
        doc.documentElement?.scrollHeight ?? 0,
      );
      if (height > 0) iframe.style.height = `${height}px`;
    } catch {
      // same-origin only; ignore if blocked
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const interval = window.setInterval(resizeIframe, 500);
    window.addEventListener("resize", resizeIframe);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resizeIframe);
    };
  }, [resizeIframe]);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Automation & Business Solutions — Kettering & Dayton, Ohio"
          description="Transform your Ohio business with AI receptionists, automated follow-ups, custom websites, and AI insurance. Your AI front desk runs 24/7 — never miss a call. Serving Kettering, Dayton, and Southwest Ohio."
          keywords="AI receptionist Ohio, business automation Kettering, AI answering service Dayton, virtual receptionist Southwest Ohio, small business AI"
          breadcrumbs={[
            { name: "Home", url: "https://www.invisionnetwork.org/" },
            { name: "AI Services", url: "https://www.invisionnetwork.org/ai" },
          ]}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Services",
            description: "Professional AI automation services",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "AI Receptionist & Virtual Intake Agent",
                description: "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
                provider: { "@type": "Organization", name: "InVision Network" },
                areaServed: { "@type": "State", name: "Ohio" },
                offers: { "@type": "Offer", price: "9500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 2,
                name: "AI Follow-Up Automation",
                description: "Automated lead nurturing, appointment reminders, and customer follow-up systems",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "12500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 3,
                name: "Custom AI Automation",
                description: "Enterprise-grade custom AI solutions tailored to your specific business needs",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "25000", priceCurrency: "USD" },
              },
            ],
          }} />

        <Navigation overlay />
        <HeroBusiness onStrategyCall={openStrategyCall} />
        <iframe
          ref={iframeRef}
          src="/ai-content.html"
          title="AI Services"
          className="w-full border-0 block"
          style={{ minHeight: "6000px", background: "#f7f6f3" }}
          onLoad={resizeIframe}
        />
        <div className="ai-page-canvas" style={{ display: 'none' }}>
          <div className="aip-blob b1" aria-hidden="true" />
          <div className="aip-blob b2" aria-hidden="true" />
          <div className="aip-blob b3" aria-hidden="true" />
          <div className="aip-blob b4" aria-hidden="true" />

        {/* ═══════════════════ SERVICES ═══════════════════ */}
        <section id="services" className="py-10 md:py-16 relative overflow-hidden">
          {/* Premium background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-12 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-12 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="Our Services"
              title="What We Build For You"
              subtitle="Pick a service below to see how your business benefits." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
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
                      { icon: Shield, label: "Spam Filtering", desc: "Blocks telemarketers and robo-calls automatically." }].
                      map((item, i) =>
                      <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </Card>
                      )}
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
                      { icon: CheckCircle, label: "Calendar Sync", desc: "Works with Google, Outlook, and more." }].
                      map((item, i) =>
                      <Card key={i} className="p-3 text-center border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <div className="w-6 h-6 mx-auto mb-2 bg-gradient-to-br from-primary/15 to-accent/10 rounded-lg flex items-center justify-center">
                            <item.icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </Card>
                      )}
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
                      { icon: CheckCircle, label: "Post-Service Check-Ins", desc: "Personalized follow-ups within 24 to 48 hours." },
                      { icon: Sparkles, label: "Review Requests", desc: "Happy customers get prompted to leave reviews." },
                      { icon: Mail, label: "Re-Engagement", desc: "Personalized 'we miss you' messages sent automatically." },
                      { icon: Phone, label: "Multi-Channel", desc: "SMS, email, WhatsApp, or website chat." }].
                      map((item, i) =>
                      <div key={i} className="space-y-1">
                          <h4 className="font-bold text-sm flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </div>
                      )}
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
                      { icon: CheckCircle, label: "CRM Integration", desc: "Syncs with Salesforce, HubSpot, and more." }].
                      map((item, i) =>
                      <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </Card>
                      )}
                    </div>
                  </div>
                </ExpandableServiceCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <SectionDivider variant="wave" color="muted" />

        {/* ═══════════════════ COMPLETE PLATFORM ═══════════════════ */}
        <section id="security" className="py-10 md:py-16 relative overflow-hidden">
          {/* Rich layered background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40" />
          
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/[0.025] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="Complete Platform"
              title="InVision Platform, Fully Integrated"
              subtitle="All platform capabilities consolidated under one mission, one operating model, and one unified experience." />
            

            {/* Hero overview card — Premium glassmorphism */}
            <AnimatedSection animation="scale-up" className="max-w-6xl mx-auto mb-12">
              <div className="relative rounded-3xl overflow-hidden glass-heavy shadow-3d-lg">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/12 to-transparent" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/8 to-transparent" />

                <div className="relative p-5 md:p-7 lg:p-10">
                  <div className="grid gap-7 lg:grid-cols-[1.3fr_0.7fr] items-center relative z-10">
                    <div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-4 border border-primary/15">
                          <Shield className="w-3.5 h-3.5" />
                          Unified Defense
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-2xl font-black mb-5 leading-tight">
                          One Platform. Clear Mission.
                          <br />
                          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Practical Outcomes.
                          </span>
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                          We merged the full platform into AI to keep the story simple.
                          Our purpose is to help Ohio organizations grow with AI while staying safe from
                          modern fraud and operational risk. Learn more about <Link to="/about" className="text-primary hover:underline font-medium">our story</Link> and the team behind the mission.
                        </p>
                        <div className="space-y-4">
                          {[
                          "Current focus: business growth automation, enterprise defense, and family-level protection.",
                          "Single operating model: shared threat intelligence across all 9 services.",
                          "Single engagement path: strategy, deployment, hardening, and ongoing support."].
                          map((item, idx) =>
                          <div
                            key={item}
                            className="flex items-start gap-3 text-sm group">
                            
                              <div className="w-4 h-4 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <p className="text-foreground leading-relaxed">{item}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats grid with 3D depth */}
                    <div className="grid grid-cols-2 gap-4">
                      {platformSnapshotStats.map((stat, i) =>
                      <div
                        key={stat.label}
                        className="group">
                        
                          <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 text-center hover:border-primary/30 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.12)] transition-all duration-500 overflow-hidden hover-lift">
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-primary/12 to-accent/8 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-3xl md:text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                                {stat.value}
                              </p>
                              <p className="text-[11px] md:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Service groups — Premium cards with 3D hover */}
            <div className="max-w-6xl mx-auto space-y-12">
              {platformGroups.map((group, gi) =>
              <AnimatedSection key={group.key} animation="fade-up" delay={gi * 120}>
                  <div>
                    {/* Group header with gradient accent */}
                    













                  

                    


















































                  
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Platform integration pillars — 3D cards */}
            <div className="mt-16 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
              {platformPillars.map((pillar, i) =>
              <AnimatedSection
                key={pillar.title}
                animation="fade-up"
                delay={i * 120}>
                
                  <Card className="stroke-glass--large group p-5 rounded-2xl border-border/40 bg-card/95 backdrop-blur-sm text-center h-full hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] hover:border-primary/25 transition-all duration-500 overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-5 shadow-inner group-hover:scale-110 transition-transform duration-300"
                    style={{ transform: "translateZ(15px)" }}>
                    
                      <pillar.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-base mb-3">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </Card>
                </AnimatedSection>
              )}
            </div>

            {/* Demo CTA */}
            <AnimatedSection animation="fade-up" delay={200} className="text-center mt-10">
              <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="heroPill"
                  variant="heroPrimary"
                  onClick={() => {
                    setSelectedInquiry({
                      name: "InVision Platform Demo",
                      price: 0,
                      tier: "Full Platform",
                      description: "Schedule a live demo of all 9 integrated services now consolidated under AI."
                    });
                    setInquiryDialogOpen(true);
                  }}>

                  Request a Platform Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button asChild variant="outline" size="heroPill">
                  <Link to="/training">View Individual Plans</Link>
                </Button>
              </div>
              

              
            </AnimatedSection>
          </div>
        </section>

        {/* Veterans Discount */}
        <section className="py-4 bg-gradient-to-r from-muted via-card to-muted border-y border-border/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-xl">🇺🇸</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold">
                <Shield className="w-3 h-3 mr-1" />
                10% OFF
              </Badge>
              <span className="text-sm font-medium">
                Veterans and First Responders receive an automatic discount at checkout
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ WEB DESIGN ═══════════════════ */}
        <section id="website-design" className="relative overflow-hidden">
          <WebsitePricingCards />
        </section>

        {/* ═══════════════════ AI AGENTS PRICING ═══════════════════ */}
        <section id="automation-pricing" className="py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="AI Automation"
              title="AI Agents Pricing"
              subtitle="Missed calls and slow follow-ups cost you real money. Your AI agents work 24/7 so you do not have to.">
              
              <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground mt-5">
                {[
                { icon: CheckCircle, text: "30-Day Guarantee" },
                { icon: Lock, text: "Secure Setup" },
                { icon: Phone, text: "24/7 Support" }].
                map((item, i) =>
                <span key={i} className="inline-flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-primary" /> {item.text}
                  </span>
                )}
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <PricingCard
                tag="🎯 START HERE"
                tagColor="from-[#e07b52] to-[#d96c4a]"
                title="AI Receptionist & Intake Agent"
                price="$9,500"
                priceNote="2-Week Setup"
                delay={0}
                badges={[
                { text: "⚡ 24/7 Active", color: "bg-primary/10 text-primary" },
                { text: "✓ Includes Training", color: "bg-primary/10 text-primary" }]
                }
                features={["24/7 call and chat handling", "Appointment booking", "Lead qualification"]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - AI Receptionist", "Business Pricing");
                  setSelectedInquiry({
                    name: "AI Receptionist & Intake Agent",
                    price: 9500,
                    tier: "START HERE",
                    description: "Answers calls and chats 24/7, books appointments, routes to the right person."
                  });
                  setInquiryDialogOpen(true);
                }} />
              

              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="AI Follow-Up Engine"
                price="$12,500"
                priceNote="3-Week Setup"
                delay={150}
                badges={[
                { text: "🚀 Full Automation", color: "bg-primary/10 text-primary" },
                { text: "✓ CRM Integration", color: "bg-primary/10 text-primary" }]
                }
                features={[
                "Automated follow-ups (SMS, email)",
                "Review collection system",
                "Re-engagement campaigns",
                "Performance dashboard"]
                }
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - AI Follow-Up", "Business Pricing");
                  setSelectedInquiry({
                    name: "AI Follow-Up Engine",
                    price: 12500,
                    tier: "MOST POPULAR",
                    description: "Automated follow-ups, review collection, and re-engagement campaigns."
                  });
                  setInquiryDialogOpen(true);
                }} />
              

              <PricingCard
                tag="🏗️ FULL SUITE"
                tagColor="from-amber-500 to-orange-500"
                title="Custom AI Automation"
                price="$25,000+"
                priceNote="Custom Timeline"
                delay={300}
                features={[
                "Everything in Follow-Up Engine",
                "Custom AI workflows",
                "Advanced analytics",
                "Dedicated account manager",
                "Priority support"]
                }
                buttonText="GET CUSTOM QUOTE"
                onButtonClick={() => {
                  trackButtonClick("Get Custom Quote - Full Suite", "Business Pricing");
                  setSelectedInquiry({
                    name: "Custom AI Automation",
                    price: 0,
                    tier: "Full Suite",
                    description: "Full AI automation suite with custom workflows, analytics, and dedicated support."
                  });
                  setInquiryDialogOpen(true);
                }} />
              
            </div>
          </div>
        </section>

        <SectionDivider variant="slant" color="muted" />

        {/* ═══════════════════ AI INSURANCE ═══════════════════ */}
        <section id="ai-insurance" className="py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40 dark:from-[#1c1917] dark:via-[#161412] dark:to-[#161412]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          
          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="AI Insurance"
              title="Protect Your AI Investment"
              subtitle="Your AI tools break, get hacked, or underperform. Our insurance plans keep your business running and your AI optimized.">
              
              <div className="flex items-center justify-center gap-4 mt-5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-3 shadow-sm mx-auto w-fit">
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm font-bold transition-colors cursor-pointer ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>
                  
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                  aria-label="Toggle yearly billing" />
                
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm font-bold transition-colors cursor-pointer ${isYearly ? "text-primary" : "text-muted-foreground"}`}>
                  
                  Yearly{" "}
                  <span className="text-xs text-primary font-black bg-primary/10 px-2 py-0.5 rounded-full">(Save 10%)</span>
                </Label>
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* Starter */}
              <PricingCard
                tag="🌱 STARTER"
                tagColor="from-emerald-500 to-teal-500"
                title="Basic Care"
                price={getInsurancePrice(199).display}
                priceSuffix={getInsurancePrice(199).period}
                priceNote="Essential Coverage"
                delay={0}
                features={[
                "AI health monitoring",
                "Email support (48hr)",
                "Monthly diagnostics",
                "Basic data backup"]
                }
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Basic", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7yV7vHoLD",
                    "AI Service Insurance",
                    "Basic Care",
                    19900,
                    "default"
                  );
                }} />
              

              {/* Standard */}
              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="Standard Care"
                price={getInsurancePrice(399).display}
                priceSuffix={getInsurancePrice(399).period}
                priceNote="Full Coverage"
                delay={100}
                features={[
                "Everything in Basic",
                "Priority support (24hr)",
                "Weekly optimization",
                "Security scanning",
                "Performance reports"]
                }
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Standard", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7xOHeDwqV",
                    "AI Service Insurance",
                    "Standard Care",
                    39900,
                    "default"
                  );
                }} />
              

              {/* Premium */}
              <PricingCard
                tag="🏆 PREMIUM"
                tagColor="from-amber-500 to-orange-500"
                title="Premium Care"
                price={getInsurancePrice(799).display}
                priceSuffix={getInsurancePrice(799).period}
                priceNote="Maximum Coverage"
                delay={200}
                features={[
                "Everything in Standard",
                "24/7 emergency support",
                "Proactive optimization",
                "Custom integrations",
                "Dedicated account manager"]
                }
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Premium", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7Q5jRWQEt",
                    "AI Service Insurance",
                    "Premium Care",
                    79900,
                    "default"
                  );
                }} />
              

              {/* Enterprise */}
              <PricingCard
                tag="🏢 ENTERPRISE"
                tagColor="from-[#c45e3b] to-[#b05030]"
                title="Customized"
                price="Custom"
                priceSuffix=" pricing"
                priceNote="Tailored for your needs"
                delay={300}
                features={[
                "Custom SLA agreements",
                "Multi-location support",
                "Unlimited repair hours",
                "Dedicated manager",
                "Custom integrations"]
                }
                buttonText="Request Quote"
                onButtonClick={() => {
                  setSelectedInquiry({
                    name: "AI Insurance - Enterprise",
                    price: 0,
                    tier: "Enterprise",
                    description: "Custom SLA and enterprise-grade AI maintenance."
                  });
                  setInquiryDialogOpen(true);
                }} />
              
            </div>

            {/* Universal Support */}
            <AnimatedSection animation="scale-up" delay={200}>
              <div className="max-w-4xl mx-auto mt-9">
                <Card className="relative p-6 border-border/40 rounded-3xl bg-card/95 backdrop-blur-sm shadow-3d overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.01] pointer-events-none" />
                  
                  <div className="head-rhythm text-center mb-5 relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-subtle rounded-full text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4 border border-primary/15">
                      <Globe className="w-3.5 h-3.5" />
                      Universal AI Support
                    </span>
                    <h3 className="text-2xl font-black mb-3">
                      We Support AI Agents From Any Vendor
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                      It does not matter where you bought your AI. We fix, optimize, secure, and develop AI systems from any platform worldwide. We also offer <Link to="/training" className="text-primary hover:underline font-medium">cybersecurity workshops</Link> to keep your team sharp.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mb-5 relative z-10">
                    {["🔧 Resuscitate", "⚡ Optimize", "🛡️ Secure", "🚀 Develop"].map((item, i) =>
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm group hover-scale">
                      
                        <div className="w-6 h-6 bg-gradient-to-br from-primary/12 to-accent/8 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <span className="text-lg">{item.split(" ")[0]}</span>
                        </div>
                        <span className="font-semibold">{item.split(" ")[1]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground relative z-10">
                    <span><strong className="text-foreground">No Contracts</strong> · Cancel anytime</span>
                    <span><strong className="text-foreground">Any Platform</strong> · Worldwide support</span>
                    <span><strong className="text-foreground">24 to 48hr Response</strong> · Fast turnaround</span>
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ AI CONSULTING ═══════════════════ */}
        <section id="ai-consulting" className="py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="Expert AI Guidance"
              title="AI Consulting Services"
              subtitle="Choose your situation below. We show you the next step." />
            

            <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
              {/* Tab Group — Premium pill design */}
              <div className="flex flex-wrap justify-center gap-2 p-2 glass-subtle rounded-2xl border border-border/40 mb-6 shadow-sm">
                {[
                { key: "thinking" as const, label: "💭 Thinking About AI" },
                { key: "buying" as const, label: "🔍 Buying AI" },
                { key: "bought" as const, label: "🛡️ Already Bought AI" },
                { key: "leaving" as const, label: "🚪 Want to Leave AI" }].
                map((tab) =>
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveConsultingTab(tab.key)}
                  aria-pressed={activeConsultingTab === tab.key}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex-1 min-w-[100px] sm:min-w-[130px] ${
                  activeConsultingTab === tab.key ?
                  "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-[1.02]" :
                  "hover:bg-card text-muted-foreground hover:text-foreground"}`
                  }>
                  
                    {tab.label}
                  </button>
                )}
              </div>

              {/* Content — 3D card */}
              <Card className="relative p-6 border-border/40 rounded-3xl overflow-hidden shadow-3d">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.01] pointer-events-none" />
                
                {activeConsultingTab === "thinking" &&
                <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">💭</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Thinking About AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">$199 Discovery Call</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                      Not sure if AI fits your business? In a paid 30-minute discovery call ($199, credited toward any project you book), we help you explore your options, understand costs, and figure out if AI will drive real growth for you. <Link to="/contact" className="text-primary hover:underline font-medium">Schedule a call</Link> to get started.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-5">
                      {["30-minute discovery call", "Business needs assessment", "AI opportunity identification", "Credit applied to any project"].map((item, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                    )}
                    </ul>
                    <Button
                    onClick={() => {
                      trackButtonClick("Book AI Discovery Call", "Business Consulting");
                      setSelectedService({ type: "business", name: "AI Discovery Consultation ($199)", tier: "Discovery" });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="h-5 sm:h-6 px-4 sm:px-5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300">

                      Book Discovery Call ($199)
                    </Button>
                  </div>
                }

                {activeConsultingTab === "buying" &&
                <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Buying AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">$1,799 - Pre-Purchase Vetting</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                      Before you spend, let us check the tool first. We look for hidden costs, security gaps, data privacy risks, and whether the ROI claims hold up.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-5">
                      {["Full vendor security assessment", "Hidden cost analysis", "ROI projection review", "Data privacy compliance check", "Written report with recommendations"].map((item, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                    )}
                    </ul>
                    <Button
                    onClick={() => {
                      trackButtonClick("Get AI Vetting", "Business Consulting");
                      trackConversion("consulting_vetting", 1799);
                      setSelectedService({ type: "business", name: "Pre-Purchase AI Tool Vetting", price: 1799 });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="h-5 sm:h-6 px-4 sm:px-5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                    
                      Get Pre-Purchase Vetting
                    </Button>
                  </div>
                }

                {activeConsultingTab === "bought" &&
                <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Already Bought AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">From $3,499 - Security Audit</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                      Already running AI but unsure if your system is secure or performing well? We audit your setup to find vulnerabilities and speed up performance.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-5">
                      {["Full security vulnerability scan", "Performance optimization review", "Data handling audit", "Compliance verification", "Detailed remediation plan"].map((item, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                    )}
                    </ul>
                    <Button
                    onClick={() => {
                      trackButtonClick("Get AI Audit", "Business Consulting");
                      trackConversion("consulting_audit", 3499);
                      setSelectedService({ type: "business", name: "AI Security & Performance Audit", price: 3499 });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="h-5 sm:h-6 px-4 sm:px-5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                    
                      Get Security Audit
                    </Button>
                  </div>
                }

                {activeConsultingTab === "leaving" &&
                <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🚪</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Want to Leave AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">$2,499 - Safe Exit Strategy</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                      Stuck with an AI tool that is not delivering? We help you exit safely, move your data, and find a better fit.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-5">
                      {["Contract review and exit strategy", "Data migration planning", "Alternative solution research", "Transition support", "30 days post-exit monitoring"].map((item, i) =>
                    <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                    )}
                    </ul>
                    <Button
                    onClick={() => {
                      trackButtonClick("Get Exit Strategy", "Business Consulting");
                      trackConversion("consulting_exit", 2499);
                      setSelectedService({ type: "business", name: "AI Safe Exit Strategy", price: 2499 });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="h-5 sm:h-6 px-4 sm:px-5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                    
                      Get Safe Exit Strategy
                    </Button>
                  </div>
                }
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ ILLUSTRATION & VISUAL ART ═══════════════════ */}
        <section id="illustration" className="py-10 md:py-16 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-muted/30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-coral-100/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-coral-100/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="Creative Services"
              title="Illustration & Visual Art"
              subtitle="Professional illustration and visual design services that give your brand a distinctive, memorable identity." />
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
              {[
              {
                icon: Palette,
                title: "Illustration Design",
                desc: "Custom hand-crafted illustrations tailored to your brand story and audience. From editorial to product illustration.",
                gradient: "from-coral-400 to-coral-600"
              },
              {
                icon: Shapes,
                title: "Vector Illustration",
                desc: "Clean, scalable vector artwork for digital and print. Perfect for logos, web assets, and marketing collateral.",
                gradient: "from-coral-400 to-amber-500"
              },
              {
                icon: Pen,
                title: "Character Design",
                desc: "Original character concepts for your brand mascot, game, or animated content. Full turnarounds and style sheets included.",
                gradient: "from-amber-500 to-coral-500"
              },
              {
                icon: Image,
                title: "Icon Design",
                desc: "Pixel-perfect custom icon sets that match your brand language. Available in SVG, PNG, and icon-font formats.",
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: BarChart3,
                title: "Infographic Design",
                desc: "Data-driven visual storytelling that turns complex information into clear, shareable graphics your audience remembers.",
                gradient: "from-gold-500 to-coral-400"
              },
              {
                icon: Grid3X3,
                title: "Pattern Design",
                desc: "Seamless, repeatable patterns for packaging, textiles, wallpapers, and digital backgrounds. Unique to your brand.",
                gradient: "from-coral-500 to-amber-400"
              }].
              map((service, i) =>
              <div
                key={i}
                className="hover-lift">
                
                  <Card className="group relative p-0 border-border/40 rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] transition-all duration-500 h-full">
                    {/* Top accent bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 p-4">
                      <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                      style={{ transform: "translateZ(15px)" }}>
                      
                        <service.icon className="w-4 h-4 text-white" />
                      </div>

                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>

                      <button
                      type="button"
                      onClick={() => {
                        setSelectedInquiry({
                          name: service.title,
                          price: 0,
                          tier: "Illustration",
                          description: service.desc
                        });
                        setInquiryDialogOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300">
                      
                        Get a Quote <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            <AnimatedSection animation="fade-up" delay={300} className="text-center mt-9">
              <Card className="glass-light max-w-3xl mx-auto p-6 rounded-3xl shadow-3d relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <h3 className="text-xl font-black mb-3 relative z-10">Need a Custom Visual Package?</h3>
                <p className="text-muted-foreground text-sm mb-4 max-w-xl mx-auto leading-relaxed relative z-10">
                  We build complete visual identity systems. Illustrations, icons, patterns, and brand assets, all designed to work together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Button
                    onClick={() => {
                      setSelectedInquiry({
                        name: "Custom Visual Package",
                        price: 0,
                        tier: "Custom",
                        description: "Complete visual identity system with illustrations, icons, patterns, and brand assets."
                      });
                      setInquiryDialogOpen(true);
                    }}
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all">
                    Request Custom Quote
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full text-xs sm:text-sm font-semibold hover:scale-[1.03] transition-all">
                    <Link to="/contact">Talk to Our Design Team</Link>
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
        <MeshBackground variant="vibrant" withOrbs>
        <section className="py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40" />
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto relative z-10">
            <SectionHeader
              badge="Why Choose Us"
              title="The InVision Difference"
              subtitle="What makes us different from other AI vendors." />
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-9" style={{ perspective: "1200px" }}>
              {[
              { icon: Shield, title: "Security-First", desc: "Every solution ships with enterprise-grade encryption, monitoring, and data protection built in." },
              { icon: Lock, title: "No Vendor Lock-In", desc: "We build on open standards. You own your AI and your data. Move in-house whenever you want." },
              { icon: FileText, title: "Plain-English Docs", desc: "Your team gets documentation written in clear language. No jargon, no confusion." },
              { icon: Sparkles, title: "Fast Deployment", desc: "Most AI solutions go live in 2 to 4 weeks. We move fast without cutting corners on security." },
              { icon: CheckCircle, title: "Ongoing Partnership", desc: "We stay with you after launch. Continuous support, updates, and optimization as your business grows." },
              { icon: Phone, title: "24/7 Support", desc: "Get help when you need it. Our team is available around the clock for critical issues." }].
              map((item, i) =>
              <div
                key={i}
                className="hover-lift">
                
                  <Card className="group relative p-4 border-border/40 rounded-2xl bg-card/95 backdrop-blur-sm overflow-hidden h-full hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] hover:border-primary/25 transition-all duration-500">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div
                    className="w-13 h-13 bg-gradient-to-br from-primary/15 to-accent/10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 relative z-10"
                    style={{ transform: "translateZ(15px)" }}>
                    
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 relative z-10">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>
                  </Card>
                </div>
              )}
            </div>

            {/* Stats Bar */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="max-w-4xl mx-auto p-6 border-border/40 rounded-3xl bg-card/95 backdrop-blur-sm shadow-3d relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center relative z-10">
                  {[
                  { value: "15+", label: "Businesses Served" },
                  { value: "99%+", label: "Uptime Guarantee" },
                  { value: "24/7", label: "Support Available" },
                  { value: "50+", label: "Integrations" }].
                  map((stat, i) =>
                  <div
                    key={i}
                    className="group hover-scale">
                    
                      <p className="text-3xl md:text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
                    </div>
                  )}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>
        </MeshBackground>

        <SectionDivider variant="mountains" color="background" />

        <SectionDivider variant="mountains" color="background" />

        {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
        {(isAdmin || businessTestimonials.length > 0) &&
        <section className="py-10 md:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
            
            <div className="container mx-auto relative z-10">
              <SectionHeader
              badge="Client Stories"
              title="What Our Clients Say" />
            

              {isAdmin && !isLoading && businessTestimonials.length === 0 &&
            <div className="max-w-2xl mx-auto">
                  <Card className="p-6 border-2 border-dashed border-primary/30 text-center rounded-3xl">
                    <span className="text-2xl mb-4 block">💼</span>
                    <h3 className="text-xl font-bold mb-2">Business Testimonials</h3>
                    <p className="text-muted-foreground text-sm">
                      Add client testimonials via Admin Dashboard
                    </p>
                  </Card>
                </div>
            }

              {businessTestimonials.length > 0 &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {businessTestimonials.map((testimonial, i) => {
                const videoMedia = testimonial.testimonial_media?.find(
                  (m: { media_type?: string }) => m.media_type === "video"
                );
                return (
                  <AnimatedSection key={testimonial.id} animation="fade-up" delay={i * 100}>
                        <TestimonialCard
                      name={testimonial.name}
                      location={testimonial.location}
                      quote={testimonial.story.substring(0, 120) + "..."}
                      image={videoMedia?.thumbnail_url || "/placeholder.svg"}
                      rating={testimonial.rating}
                      videoUrl={videoMedia?.file_url}
                      onVideoClick={() =>
                      videoMedia &&
                      setSelectedVideo({
                        src: videoMedia.file_url,
                        title: `${testimonial.name}'s Story`
                      })
                      } />
                    
                      </AnimatedSection>);

              })}
                </div>
            }
            </div>
          </section>
        }

        {/* Final CTA */}
        <CTASection
          headline="Ready to Put AI to Work?"
          variant="image"
          backgroundImage={natureSummer2}
          description="Take 15 minutes to discuss your needs. No sales pressure. We listen, ask questions, and give you a clear plan.">
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setModalOpen(true)}
              size="heroPill"
              variant="heroPrimary">
              SCHEDULE DISCOVERY CALL
            </Button>
            <Button asChild size="heroPill" variant="heroOutline">
              <Link to="/faq">View Frequently Asked Questions</Link>
            </Button>
          </div>
          <p className="text-white/90 text-sm mt-4 font-semibold drop-shadow-md">
            15-minute scoping call. No pressure. Quoted upfront.
          </p>
        </CTASection>

        </div>
        {/* ═══════════════════ END /AI DESIGN CANVAS ═══════════════════ */}

        <Footer />

        <ServiceInquiryDialog
          open={heroInquiryOpen}
          onOpenChange={setHeroInquiryOpen}
          serviceName="Business Strategy Call"
          servicePrice={0}
          serviceTier="Consultation"
          serviceDescription="Book a paid strategy call ($199, credited toward your build). We map your goals, recommend the right AI setup, and outline a clear plan." />
      </div>
    </PageTransition>
  );
}

export default Business;
