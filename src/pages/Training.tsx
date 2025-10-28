import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Video, Home, Building2, Clock, Globe, Award, FileText } from "lucide-react";

const Training = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Hero
        useTransitioningBackground={true}
        headline="Master AI Scam Defense in One Session"
        subheadline="Live classes taught by cybersecurity experts. Walk away with scripts, strategies, and lifetime confidence."
        showScrollIndicator={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <Button asChild variant="default" size="xl" className="w-full sm:w-auto">
            <Link to="#schedule" aria-label="View training schedule">
              View Training Schedule
            </Link>
          </Button>
        </div>
      </Hero>

      {/* What You'll Learn Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">What You'll Master</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Identify deepfake voices and videos",
              "Spot AI-generated phishing emails",
              "Verify urgent caller identities",
              "Scan QR codes safely",
              "Recognize romance scams",
              "Protect your banking information",
              "Set up family safe-word systems",
              "Execute the 60-Second Pause Protocol™",
            ].map((skill, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    {skill}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Options Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Choose Your Training Package</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Group Class */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Standard Group Class</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$89</span>
                <span className="text-muted-foreground">/person</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-muted-foreground text-center">60-90 minutes | Zoom</p>
                <p className="text-muted-foreground text-center">15-25 participants</p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  "Core anti-scam playbook (PDF)",
                  "Emergency response scripts",
                  "Live Q&A session",
                  "Digital certificate",
                  "Post-class action plan",
                  "7-day email support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">English, Français, Español</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="#schedule">BOOK NOW</Link>
              </Button>
            </Card>

            {/* Family Small Group - MOST POPULAR */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-primary border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50 relative"
              style={{ animationDelay: "100ms" }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Family Small Group</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$249</span>
                <span className="text-muted-foreground">/session</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-muted-foreground text-center">90 minutes | Zoom</p>
                <p className="text-muted-foreground text-center">8-12 participants</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Standard PLUS:</p>
                {[
                  "Spouse included FREE",
                  "Real-world scenario practice",
                  "Family safe-word setup",
                  "30-day priority email support",
                  "Certificates for all attendees",
                  "One free reschedule (14 days notice)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">English, Français, Español</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="#schedule">BOOK NOW</Link>
              </Button>
            </Card>

            {/* Priority Private */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Video className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Priority Private</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$399</span>
                <span className="text-muted-foreground">/session</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-muted-foreground text-center">60-90 minutes | Zoom</p>
                <p className="text-muted-foreground text-center">Private (1-3 people)</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Family PLUS:</p>
                {[
                  "Private scheduling flexibility",
                  "Tailored to your specific concerns",
                  "Spouse + 1 adult child included",
                  "90-day follow-up support",
                  "Easy reschedule (24hr notice)",
                  "Recording provided",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">English, Français, Español</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="#schedule">SCHEDULE CONSULTATION</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* In-Home Training Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto p-8 hover:shadow-strong transition-all duration-500 rounded-2xl border-accent border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Home className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-3xl font-bold mb-4">White-Glove In-Home Training</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary">$599</span>
                  <span className="text-muted-foreground ml-2">| 2-hour session</span>
                </div>
                <p className="text-muted-foreground mb-4">Availability: Dayton Metro Area</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Everything from Priority Private training",
                    "Certified trainer comes to your home",
                    "Hands-on device security setup",
                    "Set up 2FA, password manager",
                    "Configure privacy settings",
                    "Family Safety Vault setup",
                    "Printed emergency response guide",
                    "60-day follow-up support",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-6 italic">
                  Perfect for: Seniors who prefer in-person help, families caring for elderly parents
                </p>

                <Button asChild variant="default" size="lg">
                  <Link to="/contact">REQUEST IN-HOME VISIT</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Corporate Training Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto p-8 hover:shadow-strong transition-all duration-500 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Training for Organizations</h3>
              <p className="text-lg text-muted-foreground mb-8">
                We provide customized training for senior living facilities, churches, community centers, healthcare
                systems, and corporations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                {[
                  "Customized curriculum",
                  "20+ participants",
                  "Multiple session options",
                  "Printed materials",
                  "Staff training included",
                  "Ongoing consultation",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary">Starting at $1,999</span>
              </div>

              <Button asChild variant="default" size="lg">
                <Link to="/contact">REQUEST ENTERPRISE QUOTE</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Upcoming Schedule Section */}
      <section id="schedule" className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Upcoming Training Sessions</h2>

          <div className="max-w-5xl mx-auto space-y-4">
            {[
              {
                date: "Dec 15",
                time: "2:00 PM ET",
                type: "Standard Group",
                lang: "English",
                spots: "8 spots left",
                urgent: true,
              },
              {
                date: "Dec 18",
                time: "6:00 PM ET",
                type: "Family Small",
                lang: "English",
                spots: "5 spots left",
                urgent: true,
              },
              {
                date: "Dec 20",
                time: "10:00 AM ET",
                type: "Standard Group",
                lang: "Français",
                spots: "12 spots left",
                urgent: false,
              },
              {
                date: "Jan 5",
                time: "3:00 PM ET",
                type: "Family Small",
                lang: "Español",
                spots: "10 spots left",
                urgent: false,
              },
              {
                date: "Jan 8",
                time: "7:00 PM ET",
                type: "Standard Group",
                lang: "English",
                spots: "18 spots left",
                urgent: false,
              },
              {
                date: "Jan 12",
                time: "1:00 PM ET",
                type: "Priority Private",
                lang: "English",
                spots: "Available",
                urgent: false,
              },
            ].map((session, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-grow">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        <Clock className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {session.date} | {session.time}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {session.type}
                        </span>
                        <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full">{session.lang}</span>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${session.urgent ? "bg-red-500/10 text-red-500 font-bold" : "bg-muted text-muted-foreground"}`}
                        >
                          {session.spots}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button asChild variant="default">
                      <Link to="/contact">BOOK</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">VIEW FULL SCHEDULE</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Ready to Protect Your Family?" variant="gold">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
          <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
            <Link to="#schedule" aria-label="Book your training">
              BOOK YOUR TRAINING
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
            <Link to="/contact" aria-label="Ask a question">
              ASK A QUESTION
            </Link>
          </Button>
        </div>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Training;
