import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  Zap,
  Lock,
  Eye,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeIntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const pillars = [
    {
      icon: Shield,
      label: "PROTECT",
      title: "ScamShield",
      desc: "AI-powered 24/7 threat detection",
      color: "from-violet-500 to-purple-600",
      href: "/training#pricing"
    },
    {
      icon: GraduationCap,
      label: "LEARN",
      title: "Training",
      desc: "Expert-led prevention programs",
      color: "from-cyan-500 to-teal-600",
      href: "/training"
    },
    {
      icon: Building2,
      label: "SECURE",
      title: "Business",
      desc: "Enterprise AI & security solutions",
      color: "from-amber-500 to-orange-600",
      href: "/business"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 overflow-hidden bg-foreground text-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-background/20 bg-background/5 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium tracking-widest uppercase text-background/80">
                Veteran-Owned • Ohio-Based
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Digital Security
              <span className="block bg-gradient-to-r from-accent via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-background/60 max-w-2xl mx-auto leading-relaxed">
              Advanced protection powered by artificial intelligence. 
              Trusted by 500+ families across Ohio.
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={pillar.href} className="group block">
                  <div className="relative p-8 rounded-3xl border border-background/10 bg-background/5 backdrop-blur-sm transition-all duration-500 hover:bg-background/10 hover:border-background/20 hover:-translate-y-2">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <pillar.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Label */}
                    <span className="text-xs font-bold tracking-[0.3em] text-background/40 uppercase">
                      {pillar.label}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mt-2 mb-3 text-background group-hover:text-accent transition-colors">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-background/60 mb-6">
                      {pillar.desc}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-accent font-medium">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Zap, value: "24hr", label: "Response Time" },
              { icon: Lock, value: "500+", label: "Families Protected" },
              { icon: Eye, value: "24/7", label: "Threat Monitoring" },
              { icon: Fingerprint, value: "99.9%", label: "Detection Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl border border-background/10 bg-background/5">
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold text-background mb-1">{stat.value}</div>
                <div className="text-sm text-background/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg rounded-full">
            <Link to="/training#pricing" className="gap-3">
              Start Your Protection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
