import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const scamAlerts = [
  { icon: Phone, title: "AI Voice Impersonation", description: "Criminals clone voices of loved ones using AI, then call requesting emergency funds.", trend: "+340%", severity: "critical" as const },
  { icon: Mail, title: "Government Impersonation", description: "Fraudulent emails mimicking IRS, SSA, or Medicare demand immediate action or payment.", trend: "+180%", severity: "high" as const },
  { icon: CreditCard, title: "Untraceable Payment Demands", description: "Requests for gift cards, wire transfers, or cryptocurrency are always fraud.", trend: "+95%", severity: "high" as const },
];

const quickTips = [
  "Never give personal info to incoming callers",
  "Verify requests through official channels",
  "Do not click links in unexpected emails",
  "Trust your instincts. If it feels wrong, it is",
];

const severityColors = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

interface ScamAlertsSectionProps { onSubmitThreat?: () => void; }

export const ScamAlertsSection = ({ onSubmitThreat }: ScamAlertsSectionProps) => {
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveAlert((prev) => (prev + 1) % scamAlerts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 lg:py-24" aria-labelledby="alerts-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Urgent banner-style header */}
        <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 rounded-3xl p-8 lg:p-12 mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Active Threat Intelligence</span>
              </div>
              <h2 id="alerts-heading" className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                Know the Threats, Stay Ahead
              </h2>
              <p className="text-white/60 text-base">Real-time intelligence on scams targeting your community right now.</p>
            </div>
            <div className="flex gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-bold rounded-full bg-white text-slate-900 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all">
                <Link to="/training#pricing">Get Protected <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              {onSubmitThreat && (
                <Button type="button" variant="outline" size="lg" onClick={onSubmitThreat}
                  className="h-12 px-6 text-sm font-bold rounded-full border-white/20 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all">
                  Analyze a Message
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Alerts - 3 cols */}
          <div className="lg:col-span-3 space-y-3" role="list" aria-label="Current scam alerts">
            {scamAlerts.map((alert, index) => (
              <div key={index} role="listitem" onClick={() => setActiveAlert(index)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 hover:-translate-y-0.5 ${
                  index === activeAlert ? "bg-card border-primary/30 shadow-lg" : "bg-card/60 border-border/40 hover:border-primary/20"
                }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${index === activeAlert ? "bg-primary/10" : "bg-muted/60"}`}>
                    <alert.icon className={`w-5 h-5 ${index === activeAlert ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-bold text-foreground">{alert.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${severityColors[alert.severity]}`}>
                        {alert.severity}
                      </span>
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1 ml-auto">
                        <TrendingUp className="w-3 h-3" />{alert.trend}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{alert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips - 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 border border-border/60 sticky top-24">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              <div className="space-y-3" role="list" aria-label="Protection tips">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-3" role="listitem">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
