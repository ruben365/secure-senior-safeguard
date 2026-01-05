import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Clock, Phone, Globe, ArrowRight, TrendingUp } from "lucide-react";
import aiBusinessPromo from "@/assets/ai-business-promo.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", desc: "24/7 call handling", highlight: "Save $37K+/year" },
  { icon: Clock, title: "Smart Scheduling", desc: "Automated bookings", highlight: "Zero no-shows" },
  { icon: Globe, title: "Professional Websites", desc: "SEO-optimized design", highlight: "Lead generation" },
  { icon: Bot, title: "Support Chatbots", desc: "Instant customer help", highlight: "Always available" },
];

export const AIBusinessPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">AI for Business</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Automate Your Business with{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Intelligent AI</span>
            </h2>
            
            <p className="text-lg text-white/70 leading-relaxed">
              Stop losing customers to missed calls and slow responses. Our AI solutions handle customer interactions 24/7, 
              so you can focus on growing your business.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group hover:-translate-y-1"
                >
                  <service.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-white mb-1">{service.title}</h3>
                  <p className="text-sm text-white/60 mb-2">{service.desc}</p>
                  <span className="text-xs font-medium text-amber-400">{service.highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-slate-900 hover:bg-white/90">
                <Link to="/business">
                  Explore AI Solutions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10">
                <Link to="/business/ai-receptionist">See Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={aiBusinessPromo}
                alt="AI business automation dashboard"
                className="w-full h-[450px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white/70">Efficiency</span>
                    </div>
                    <p className="text-2xl font-bold text-white">+300%</p>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-sm text-white/70">Response</span>
                    </div>
                    <p className="text-2xl font-bold text-white">&lt; 1sec</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
