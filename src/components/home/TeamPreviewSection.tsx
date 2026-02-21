import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Marcus Reynolds",
    role: "Founder & Lead Instructor",
    credentials: "U.S. Army Veteran, Certified Ethical Hacker",
    icon: Shield,
  },
  {
    name: "Dr. Sarah Chen",
    role: "AI Threat Analyst",
    credentials: "Ph.D. Computer Science, 12+ years in cybersecurity",
    icon: Award,
  },
  {
    name: "James Whitfield",
    role: "Senior Trainer",
    credentials: "Former FBI Cyber Division, CISSP Certified",
    icon: BookOpen,
  },
];

export const TeamPreviewSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left copy */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Our Experts
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6">
              Led by Veterans &{" "}
              <span className="text-primary">Security Professionals</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Our team combines military discipline with cutting-edge cybersecurity expertise.
              Every instructor has real-world experience stopping the exact threats targeting
              your family and business today.
            </p>
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/about">
                Meet the Full Team <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right — team cards */}
          <div className="space-y-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-start gap-5 p-5 rounded-lg border border-border/60 bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <member.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
