import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  GraduationCap, 
  Building2, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const HomeIntroSection = () => {
  const services = [
    {
      id: "protection",
      icon: Shield,
      title: "ScamShield",
      description: "24/7 monitoring and threat analysis protecting your family from AI-powered scams.",
      href: "/training#pricing",
      metric: "500+ families protected"
    },
    {
      id: "training",
      icon: GraduationCap,
      title: "Training",
      description: "Expert-led courses teaching you to recognize and prevent digital threats.",
      href: "/training#training",
      metric: "10% veteran discount"
    },
    {
      id: "business",
      icon: Building2,
      title: "Enterprise",
      description: "Custom AI automation, security audits, and professional consulting.",
      href: "/business",
      metric: "Tailored solutions"
    }
  ];

  return (
    <section className="relative py-32 lg:py-40">
      {/* Minimal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial-style header */}
        <div className="max-w-5xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end"
          >
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-6">
                Ohio's Cybersecurity Partner
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Digital protection
                <br />
                <span className="text-muted-foreground">for real life.</span>
              </h2>
            </div>
            
            <div className="lg:pb-2">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We combine advanced AI technology with human expertise to protect Ohio 
                families and businesses from sophisticated digital threats. Veteran-owned, 
                locally operated, and committed to your security.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>24hr Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Veteran Owned</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Ohio Based</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clean service cards */}
        <div className="grid lg:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={service.href}
                className="group block h-full bg-card p-10 lg:p-12 transition-colors hover:bg-muted/30"
              >
                <div className="mb-8">
                  <service.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {service.metric}
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Contact bar - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-b border-border/50"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-sm">
            <a href="tel:937-555-7233" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>937-555-SAFE</span>
            </a>
            <a href="mailto:hello@invisionnetwork.org" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>hello@invisionnetwork.org</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Kettering, Ohio</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/training#pricing">
                Get Protected
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
