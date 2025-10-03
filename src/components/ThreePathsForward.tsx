import { BookOpen, Shield, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const paths = [
  {
    id: 1,
    title: "Learn & Train",
    description: "Live Zoom classes & in-person training. Spot deepfakes, verify identities, handle urgent calls with confidence.",
    pricing: "Starting at $149",
    icon: BookOpen,
    gradient: "from-[hsl(218,45%,51%)] to-[hsl(215,50%,38%)]",
    iconBg: "from-[hsl(217,91%,60%)] to-[hsl(213,56%,25%)]",
    borderColor: "border-[hsl(218,45%,51%)]/30",
    hoverBorder: "hover:border-[hsl(217,91%,60%)]",
    link: "/training",
    cta: "Book Training"
  },
  {
    id: 2,
    title: "Family Scam Shield",
    description: "Forward suspicious emails, texts, links, QR codes. Get expert analysis within 24-48 hours.",
    pricing: "Starting at $49/month",
    icon: Shield,
    gradient: "from-[hsl(41,96%,65%)] to-[hsl(38,92%,50%)]",
    iconBg: "from-[hsl(38,92%,50%)] to-[hsl(32,95%,48%)]",
    borderColor: "border-accent/50",
    hoverBorder: "hover:border-accent",
    featured: true,
    link: "/scam-shield",
    cta: "Start Scam Shield"
  },
  {
    id: 3,
    title: "AI for Business",
    description: "Custom AI receptionists, automation, and pre-purchase vetting. Don't waste $5k+ on wrong tools.",
    pricing: "Starting at $5,000",
    icon: Briefcase,
    gradient: "from-[hsl(173,62%,67%)] to-[hsl(173,58%,39%)]",
    iconBg: "from-[hsl(173,58%,39%)] to-[hsl(173,80%,31%)]",
    borderColor: "border-[hsl(173,58%,39%)]/30",
    hoverBorder: "hover:border-[hsl(173,58%,39%)]",
    link: "/business",
    cta: "Talk to an Expert"
  }
];

const ThreePathsForward = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-mesh">
      {/* Background blobs */}
      <div className="blob-shape absolute top-[-200px] right-[-200px] w-[600px] h-[600px] animate-blob-float" />
      <div className="blob-shape absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px]" style={{ animationDelay: '5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="gradient-text-primary mb-4">Three Paths Forward</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the protection and empowerment that fits your needs—from personal AI security training to business automation solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Card
                key={path.id}
                className={`
                  relative p-8 flex flex-col items-center text-center
                  transition-all duration-500 hover:shadow-strong
                  bg-gradient-to-br ${path.gradient} bg-opacity-10
                  border-2 ${path.borderColor} ${path.hoverBorder}
                  hover:-translate-y-3
                  ${path.featured ? 'md:scale-105 shadow-glow-gold border-accent' : ''}
                  animate-fade-in-up stagger-${index + 1}
                `}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-[hsl(38,92%,50%)] text-accent-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-glow-gold animate-pulse">
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* Icon Container */}
                <div className={`
                  relative w-24 h-24 rounded-2xl mb-6
                  bg-gradient-to-br ${path.iconBg}
                  flex items-center justify-center
                  transition-transform duration-300 hover:scale-110 hover:rotate-[-5deg]
                  shadow-medium
                  before:absolute before:inset-[-8px] before:rounded-3xl
                  before:border-2 before:border-current before:opacity-30
                  before:animate-pulse-ring
                `}>
                  <Icon className="w-12 h-12 text-primary-foreground drop-shadow-lg" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-foreground">{path.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-lg font-bold mb-6 px-6 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant={path.featured ? "default" : "secondary"}
                  size="lg"
                  className={`
                    w-full text-base font-bold uppercase tracking-wide
                    transition-all duration-300 hover:shadow-medium hover:-translate-y-1
                    relative overflow-hidden group
                    ${path.featured ? 'shadow-glow-gold' : ''}
                  `}
                >
                  <Link to={path.link}>
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    {path.cta}
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;
