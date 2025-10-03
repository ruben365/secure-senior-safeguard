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
    link: "/training",
    cta: "Book Training"
  },
  {
    id: 2,
    title: "Family Scam Shield",
    description: "Forward suspicious emails, texts, links, QR codes. Get expert analysis within 24-48 hours.",
    pricing: "Starting at $49/month",
    icon: Shield,
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
    link: "/business",
    cta: "Talk to an Expert"
  }
];

const ThreePathsForward = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[hsl(254,100%,99%)] via-[hsl(220,13%,97%)] to-[hsl(220,9%,94%)]">
      {/* Background blobs - dimmed */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[hsl(32,95%,48%,0.15)] to-[hsl(38,92%,50%,0.15)] blur-[80px] animate-float-slow" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[hsl(38,92%,50%,0.1)] to-[hsl(43,96%,56%,0.1)] blur-[80px] animate-float-slow" style={{ animationDelay: '5s', animationDirection: 'reverse' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-extrabold mb-4 text-[hsl(220,9%,14%)]">
            Three Paths Forward
          </h2>
          <p className="text-xl text-[hsl(215,20%,45%)] max-w-2xl mx-auto">
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
                  relative p-12 flex flex-col items-center text-center
                  transition-all duration-600 ease-out
                  bg-white/70 backdrop-blur-sm
                  ${path.featured 
                    ? 'border-[2px] border-[hsl(32,95%,48%,0.4)] shadow-[0_8px_25px_rgba(245,158,11,0.1)]' 
                    : 'border-[1px] border-[hsl(220,13%,91%,0.5)] shadow-[0_4px_15px_rgba(0,0,0,0.04)]'}
                  hover:-translate-y-4 hover:scale-[1.02] ${path.featured ? 'hover:shadow-[0_16px_45px_rgba(245,158,11,0.18)]' : 'hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]'}
                  hover:border-[hsl(32,95%,48%,0.5)] hover:rotate-1
                  animate-fade-in-up
                  before:absolute before:top-0 before:left-0 before:w-full before:h-1
                  before:bg-gradient-to-r before:from-[hsl(32,95%,48%,0.4)] before:to-[hsl(38,92%,50%,0.4)]
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500
                  hover:before:scale-x-100
                  after:absolute after:inset-0 after:rounded-2xl after:opacity-0
                  after:bg-gradient-to-br after:from-[hsl(32,95%,48%,0.05)] after:to-transparent
                  hover:after:opacity-100 after:transition-opacity after:duration-500
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[hsl(32,95%,48%,0.6)] to-[hsl(38,92%,50%,0.6)] text-white px-7 py-2.5 rounded-full text-[13px] font-extrabold tracking-[1.5px] shadow-[0_6px_20px_rgba(245,158,11,0.25)] animate-[badge-float_3s_ease-in-out_infinite]">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon Container - dimmed orange gradient */}
                <div className="relative w-[100px] h-[100px] rounded-3xl mb-7
                  bg-gradient-to-br from-[hsl(32,95%,48%,0.5)] to-[hsl(25,95%,43%,0.5)]
                  shadow-[0_8px_24px_rgba(245,158,11,0.2)]
                  flex items-center justify-center
                  transition-all duration-600 ease-out hover:scale-[1.2] hover:rotate-[-10deg]
                  hover:shadow-[0_12px_35px_rgba(245,158,11,0.35)]
                  after:absolute after:inset-[-8px] after:rounded-[28px]
                  after:border-2 after:border-[hsl(32,95%,48%)]/25
                  after:animate-[pulse-ring_3s_ease-out_infinite]
                  group-hover:animate-[spin_2s_linear_infinite]
                ">
                  <Icon className="w-14 h-14 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-transform duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-[28px] font-extrabold mb-4 text-[hsl(220,9%,14%)] tracking-tight transition-colors duration-300 group-hover:text-[hsl(32,95%,48%)]">
                  {path.title}
                </h3>
                <p className="text-base text-[hsl(215,16%,47%,0.9)] mb-7 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-xl font-extrabold text-[hsl(32,95%,48%,0.8)] mb-6 px-6 py-3 rounded-xl 
                  bg-[hsl(32,95%,48%,0.08)]
                  border border-[hsl(32,95%,48%)]/15
                  transition-all duration-500
                  hover:bg-[hsl(32,95%,48%,0.12)] hover:scale-105">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`
                    w-full text-base font-bold uppercase tracking-wide
                    transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]
                    relative overflow-hidden group
                    ${path.featured 
                      ? 'bg-gradient-to-r from-[hsl(32,95%,48%,0.6)] to-[hsl(38,92%,50%,0.6)] hover:from-[hsl(38,92%,50%,0.7)] hover:to-[hsl(43,96%,56%,0.7)] shadow-[0_4px_16px_rgba(245,158,11,0.2)] hover:shadow-[0_8px_28px_rgba(245,158,11,0.35)] text-[hsl(205,87%,21%)] font-extrabold' 
                      : 'bg-gradient-to-r from-[hsl(205,87%,21%,0.6)] to-[hsl(199,89%,48%,0.6)] hover:from-[hsl(199,89%,48%,0.7)] hover:to-[hsl(205,87%,28%,0.7)] shadow-[0_4px_16px_rgba(30,58,95,0.2)] hover:shadow-[0_8px_24px_rgba(30,58,95,0.3)] text-white'}
                    border-0
                    rounded-[14px] py-[18px] px-8
                  `}
                >
                  <Link to={path.link}>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative z-10">{path.cta}</span>
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
