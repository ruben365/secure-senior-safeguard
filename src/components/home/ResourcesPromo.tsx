import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download } from "lucide-react";

const resources = [
  { icon: Shield, title: "Cyber Insurance", description: "Coverage up to $1M for identity theft and cyber fraud.", tag: "Popular" },
  { icon: FileText, title: "Emergency Scripts", description: "Free PDF scripts for IRS, tech support, and bank scams.", tag: "Free" },
  { icon: BookOpen, title: "Digital Guides", description: "30+ guides on AI, scam prevention, and digital safety.", tag: "New" },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="resources-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left intro column */}
          <div className="lg:row-span-2 flex flex-col justify-between bg-gradient-to-br from-primary to-accent rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4 block">Resources</span>
              <h2 id="resources-heading" className="text-3xl md:text-4xl font-black leading-[1.1] mb-4">
                Tools For Your Protection
              </h2>
              <p className="text-white/80 text-base mb-8">
                From insurance coverage to free educational materials, everything you need to stay safe online.
              </p>
            </div>
            <div className="relative z-10 space-y-3">
              <div className="text-5xl font-black">50+</div>
              <div className="text-sm font-medium text-white/70">Resources Available</div>
              <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 active:scale-95 transition-all mt-4">
                <Link to="/resources">Browse All <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Resource cards */}
          {resources.map((resource) => (
            <Link key={resource.title} to="/resources" className="group block">
              <div className="bg-card rounded-2xl border border-border/60 p-6 h-full hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">{resource.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                  View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}

          {/* Download banner - spans 2 cols */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">Free Emergency Anti-Scam Scripts</div>
                <div className="text-sm text-muted-foreground">IRS, Tech Support, Grandparent, Bank Fraud</div>
              </div>
            </div>
            <Button asChild className="rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex-shrink-0">
              <Link to="/resources">Download Free <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
