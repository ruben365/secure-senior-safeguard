import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, UserCheck, Shield, Mail, Link as LinkIcon, QrCode, Mic, Image as ImageIcon, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-scamshield-new.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const ScamShield = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroImage}
        headline="Your Personal Cybersecurity Team - On Demand"
        subheadline="Forward suspicious emails, texts, calls, or links. Get expert analysis within 24 hours."
      >
        <div className="flex flex-col gap-3 items-start">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-bold text-accent-foreground backdrop-blur-sm border border-accent/30">
            14-DAY FREE TRIAL • No Credit Card Required
          </div>
          <Button asChild variant="default" size="xl">
            <Link to="/contact">START YOUR FREE TRIAL</Link>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* How Scam Shield Works */}
      <section className="py-20 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12">Simple Protection in 4 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">1. You Receive Something Suspicious</h3>
              <p className="text-muted-foreground">
                Strange text, urgent email, odd call, suspicious link
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Forward It to Our Team</h3>
              <p className="text-muted-foreground">
                Email, text, upload screenshot, or call our hotline. Response time: 24 hours (Premium: 4 hours)
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Expert Analysis</h3>
              <p className="text-muted-foreground">
                Our team examines: Message content, Sender verification, Link destination, Voice/audio analysis, AI-generated detection
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">4. Get Clear Guidance</h3>
              <p className="text-muted-foreground">
                You receive: Risk level (Safe/Caution/Danger/CRITICAL), Detailed explanation, Recommended actions, Emergency scripts if needed
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Choose Your Protection Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 border-border/50">
              <h3 className="text-2xl font-bold mb-4">Starter Plan</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-6">
                $39<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <p className="text-muted-foreground mb-6">Perfect for: Individuals</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Unlimited threat submissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>24-hour expert analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Email & text support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Risk assessment reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly scam trend updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>60-day money-back guarantee</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>

            <Card className="p-8 border-2 border-accent relative rounded-2xl shadow-[0_8px_30px_rgba(20,184,166,0.15)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.2)] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-[hsl(180,70%,55%)] text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(20,184,166,0.3)]">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Family Plan</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-6">
                $79<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <p className="text-muted-foreground mb-6">Perfect for: Families & couples</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Protect up to 5 family members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>12-hour priority response</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Phone support included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Family Safety Vault (secure storage)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Shared safe-word system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Training discounts (20% off)</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>

            <Card className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 border-border/50">
              <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-6">
                $129<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <p className="text-muted-foreground mb-6">Perfect for: High-risk individuals</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>4-hour emergency response</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>AI deepfake voice detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>"Call Me Now" verification service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Dedicated security advisor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>24/7 emergency hotline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly 1-on-1 check-ins</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>
          </div>
          <p className="text-center mt-8 text-muted-foreground">
            All plans include 14-day free trial. Cancel anytime. No contracts.
          </p>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What We Analyze</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Phishing Emails", desc: "Fake bank alerts, IRS notices, package delivery scams" },
              { icon: LinkIcon, title: "Suspicious Links", desc: "Shortened URLs, typo domains, fake login pages" },
              { icon: QrCode, title: "QR Codes", desc: "Restaurant menus, parking meters, event tickets—verify before scanning" },
              { icon: Mic, title: "Audio/Voice Messages", desc: "Deepfake voice clones, 'grandparent scams,' urgent family calls" },
              { icon: ImageIcon, title: "Images & Screenshots", desc: "AI-generated faces, fake documents, manipulated photos" },
              { icon: MessageSquare, title: "Text Messages", desc: "'Package delivery,' 'account locked,' 'prize winner' texts" },
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Boundaries */}
      <section className="py-20 bg-amber-50 dark:bg-amber-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl mb-4">What Scam Shield IS and ISN'T</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  WE PROVIDE:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Risk assessment & scam detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Recommendations for next steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Educational analysis</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  WE DO NOT:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Take control of your devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Access your accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Provide legal or financial advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Operate your bank or credit cards</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                IN EMERGENCIES:
              </h3>
              <p className="mb-4">If you've already sent money, shared passwords, or clicked a suspicious link:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Call your bank immediately (use official number on card)</li>
                <li>Change passwords on a DIFFERENT device</li>
                <li>Report to local police & FTC (IdentityTheft.gov)</li>
                <li>THEN forward to us for analysis</li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Member Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="George T."
              age="71"
              location="Beavercreek"
              quote="I get a suspicious email almost weekly. Scam Shield gives me peace of mind. I forward it, they tell me it's a scam, I delete it. Worth every penny of $49/month."
              image={testimonial4}
            />
            <TestimonialCard
              name="Rachel K."
              age="48"
              location="Dayton"
              quote="My mom was targeted with a fake 'Medicare card update' email. We submitted it to Scam Shield within minutes and got confirmation it was a scam in 18 hours. Saved her from identity theft."
              image={testimonial1}
            />
            <TestimonialCard
              name="Tom & Jennifer S."
              age="55 & 53"
              location="Centerville"
              quote="Premium Plan is our family's insurance policy. Between my parents, in-laws, and us, we submit 20+ items a month. The 24-hour turnaround is perfect."
              image={testimonial2}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Get Protection Starting Today" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">START SCAM SHIELD - $49/MONTH</Link>
        </Button>
        <p className="text-accent-foreground text-sm mt-4">
          🔒 Cancel anytime • 7-day money-back guarantee • No setup fees
        </p>
      </CTASection>

      <Footer />
    </div>
  );
};

export default ScamShield;
