import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download } from "lucide-react";

const resources = [
  {
    icon: Shield,
    title: "Cyber Insurance",
    description: "Coverage up to $1M for identity theft and cyber fraud.",
    tag: "Popular",
  },
  {
    icon: FileText,
    title: "Emergency Scripts",
    description: "Free PDF scripts for IRS, tech support, and bank scams.",
    tag: "Free",
  },
  {
    icon: BookOpen,
    title: "Digital Guides",
    description: "30+ guides on AI, scam prevention, and digital safety.",
    tag: "New",
  },
];

export const ResourcesPromo = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-coral-400" />
              <span className="text-coral-400 text-xs font-bold tracking-[0.3em] uppercase">Resources</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight mb-6"
              style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              Tools For<br />
              <span className="bg-gradient-to-r from-coral-400 to-lavender-400 bg-clip-text text-transparent">Protection</span>
            </h2>
            
            <p className="text-xl text-white/50 leading-relaxed">
              From insurance coverage to free educational materials—everything you need to stay protected.
            </p>
          </div>
          
          <Button asChild size="lg" 
            className="group h-14 px-8 text-base font-semibold rounded-none border border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-colors">
            <Link to="/resources">
              Browse All
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
        
        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <Link key={resource.title} to="/resources" className="group">
              <div className="h-full p-8 bg-white/5 border border-white/10 hover:border-coral-400/50 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-coral-400 flex items-center justify-center">
                    <resource.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-coral-400 uppercase tracking-wider">{resource.tag}</span>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-coral-400 transition-colors"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  {resource.title}
                </h3>
                
                <p className="text-white/50 leading-relaxed mb-6">{resource.description}</p>
                
                <div className="flex items-center gap-2 text-white/40 group-hover:text-coral-400 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Free download banner */}
        <div className="mt-12 p-6 border border-coral-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-coral-400 flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">Free Emergency Anti-Scam Scripts</div>
              <div className="text-white/50 text-sm">IRS • Tech Support • Grandparent • Bank Fraud</div>
            </div>
          </div>
          <Link to="/resources" 
            className="px-6 py-3 bg-coral-400 text-white font-bold hover:bg-coral-500 transition-colors">
            Download Free →
          </Link>
        </div>
      </div>
    </section>
  );
};