import { Shield, Zap, Brain, Cloud, Database, Lock, Globe, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrustIndicator } from "@/components/TrustIndicator";

const logos = [
  { 
    name: "OpenAI", 
    icon: Zap,
    description: "GPT Models",
    color: "text-emerald-600 dark:text-emerald-400"
  },
  { 
    name: "Google AI", 
    icon: Brain,
    description: "Gemini",
    color: "text-blue-600 dark:text-blue-400"
  },
  { 
    name: "Microsoft Azure", 
    icon: Cloud,
    description: "Cloud Infrastructure",
    color: "text-sky-600 dark:text-sky-400"
  },
  { 
    name: "AWS", 
    icon: Database,
    description: "Secure Hosting",
    color: "text-orange-600 dark:text-orange-400"
  },
  { 
    name: "IBM Watson", 
    icon: Cpu,
    description: "Enterprise AI",
    color: "text-indigo-600 dark:text-indigo-400"
  },
  { 
    name: "Anthropic", 
    icon: Lock,
    description: "Claude Models",
    color: "text-amber-600 dark:text-amber-400"
  },
  { 
    name: "Hugging Face", 
    icon: Globe,
    description: "ML Models",
    color: "text-yellow-600 dark:text-yellow-400"
  },
  { 
    name: "TensorFlow", 
    icon: Brain,
    description: "ML Framework",
    color: "text-red-600 dark:text-red-400"
  },
];

const TrustedTechLogos = () => {
  return (
    <section className="section-spacing-tight bg-gradient-to-b from-muted/30 to-background border-y border-border/40">
      <div className="container-padding">
        {/* Refined header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            <Shield className="w-3 h-3 mr-1" />
            Enterprise-Grade AI
          </Badge>
          <h3 className="text-xl font-semibold text-foreground/90 mb-2">
            Powered By Industry Leaders
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our AI protection combines the best models from trusted providers to keep you safe
          </p>
        </div>
        
        {/* Logo grid - clean and professional */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {logos.map((logo, index) => {
            const IconComponent = logo.icon;
            return (
              <Card
                key={index}
                className="group relative flex flex-col items-center justify-center p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`mb-3 group-hover:scale-110 transition-transform duration-300 ${logo.color}`}>
                  <IconComponent className="w-10 h-10" />
                </div>
                
                {/* Logo name */}
                <div className="text-base font-semibold text-foreground/80 group-hover:text-primary transition-colors text-center">
                  {logo.name}
                </div>
                
                {/* Description */}
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  {logo.description}
                </div>
                
                {/* Trust badge */}
                <Badge variant="secondary" className="mt-3 text-[10px]">
                  Trusted
                </Badge>
                
                {/* Hover underline accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300" />
              </Card>
            );
          })}
        </div>
        
        {/* Trust indicator */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <TrustIndicator type="shield" size="sm" />
            SOC 2 Compliant • GDPR Ready • Bank-Level Encryption
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;
