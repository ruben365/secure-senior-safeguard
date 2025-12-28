import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Headphones, Calendar, Zap, ArrowRight } from "lucide-react";

const AGENT_TYPES = [
  {
    id: "customer-support",
    name: "Customer Support Agent",
    icon: Headphones,
    description: "Website chat, FAQ answers, lead capture, and ticket creation. Handle inquiries 24/7 without human intervention.",
    features: ["24/7 Chat Support", "FAQ Automation", "Lead Capture", "Ticket Routing"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: "sales-booking",
    name: "Sales / Booking Agent",
    icon: Calendar,
    description: "Qualify leads, schedule appointments, send follow-ups, and update your CRM pipeline automatically.",
    features: ["Lead Qualification", "Appointment Booking", "Follow-up Campaigns", "CRM Updates"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    id: "operations-admin",
    name: "Operations / Admin Agent",
    icon: Zap,
    description: "Automate internal workflows: invoices, reminders, dashboards, and data synchronization across systems.",
    features: ["Invoice Processing", "Automated Reminders", "Dashboard Reports", "System Integration"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10"
  }
];

function AgentTypeCards() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-4">
            <Zap className="w-4 h-4" />
            <span>Choose Your Agent Type</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Type of Agent Do You Need?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the agent that best fits your business needs. Each agent is fully customizable to your specific requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {AGENT_TYPES.map((agent, index) => (
            <ScrollReveal key={agent.id} animation="fade-up" delay={index * 150}>
              <Card className="group p-8 h-full hover:shadow-strong transition-all duration-400 hover:-translate-y-2 border-2 hover:border-primary/30">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <agent.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground mb-6">{agent.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {agent.features.map((feature) => (
                    <span 
                      key={feature}
                      className={`px-3 py-1 ${agent.bgColor} rounded-full text-xs font-medium`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <Button asChild className="w-full group/btn">
                  <Link to={`/get-started/ai-agents?plan=STARTER&agentType=${agent.id}`}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentTypeCards;
