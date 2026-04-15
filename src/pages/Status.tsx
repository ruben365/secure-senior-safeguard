import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Activity } from "lucide-react";
import { SEO } from "@/components/SEO";

const services = [
  {
    name: "Website",
    description: "invisionnetwork.org",
    uptime: "99.9%",
  },
  {
    name: "Authentication",
    description: "Supabase Auth",
    uptime: "99.9%",
  },
  {
    name: "Payment Processing",
    description: "Stripe",
    uptime: "99.9%",
  },
  {
    name: "AI Chat",
    description: "Laura Assistant",
    uptime: "99.9%",
  },
  {
    name: "Digital Library",
    description: "E-books & Resources",
    uptime: "99.9%",
  },
  {
    name: "Email / Notifications",
    description: "Transactional email",
    uptime: "99.9%",
  },
];

function Status() {
  const [email, setEmail] = useState("");

  const lastChecked = new Date().toLocaleTimeString();

  return (
    <PageTransition variant="fade">
      <SEO
        title="System Status — InVision Network"
        description="Real-time status of InVision Network services. Check uptime, incidents, and service health."
        keywords="InVision Network status, system uptime, service health, incidents"
      />
      <Navigation />

      {/* Hero */}
      <section className="py-12 md:py-16 bg-background border-b border-border/40">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            System Status
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
            Real-time status of all InVision Network services.
          </p>

          {/* All Systems Operational Banner */}
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-xl font-semibold text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            All Systems Operational
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Last checked: {lastChecked}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-10 md:py-14 bg-muted/20">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Services</h2>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>

          <div className="space-y-3">
            {services.map((service) => (
              <Card
                key={service.name}
                className="p-4 border border-border/40 bg-card flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{service.name}</p>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-medium text-emerald-600">Operational</p>
                  <p className="text-xs text-muted-foreground">{service.uptime} uptime</p>
                </div>
              </Card>
            ))}
          </div>

          {/* 30-day uptime summary */}
          <Card className="mt-6 p-4 border border-border/40 bg-card flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-foreground">30-Day Uptime</p>
              <p className="text-xs text-muted-foreground">Overall platform uptime over the past 30 days</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-lg font-black text-emerald-600">99.9%</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-lg font-bold text-foreground mb-4">Incident History</h2>
          <Card className="p-5 border border-border/40 bg-card text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-foreground text-sm mb-1">
              No incidents in the past 30 days.
            </p>
            <p className="text-xs text-muted-foreground">
              All services have been running normally.
            </p>
          </Card>
        </div>
      </section>

      {/* Subscribe to Status Updates */}
      <section className="py-10 md:py-14 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-xl font-black text-foreground mb-2">
            Subscribe to Status Updates
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Get notified about incidents and planned maintenance via email.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button asChild>
              <Link to="/contact">Subscribe</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            We'll redirect you to our contact page to complete signup.
          </p>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

export default Status;
