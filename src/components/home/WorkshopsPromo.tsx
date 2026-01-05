import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Calendar, CheckCircle, ArrowRight, Star } from "lucide-react";
import workshopPromo from "@/assets/workshop-promo.jpg";

const benefits = [
  "Hands-on scam detection training",
  "Family-friendly group sessions",
  "Expert instructors with real experience",
  "Take-home materials & resources",
];

const formats = [
  { icon: Users, title: "In-Person", desc: "Community workshops" },
  { icon: Calendar, title: "Zoom Classes", desc: "Learn from home" },
  { icon: GraduationCap, title: "Private Sessions", desc: "Personalized training" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50">
              <img
                src={workshopPromo}
                alt="Security workshop in progress"
                className="w-full h-[400px] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold">Top-Rated Training</span>
              </div>
            </div>
            
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-border/50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">200+ Families</p>
                  <p className="text-sm text-muted-foreground">Trained & Protected</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Expert Workshops</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Learn to Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Scams</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our expert-led workshops teach seniors, families, and community groups how to identify and avoid sophisticated AI-powered scams. 
              No technical experience needed—just bring your curiosity!
            </p>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Format options */}
            <div className="flex flex-wrap gap-4 pt-2">
              {formats.map((format, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl border border-border/50">
                  <format.icon className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{format.title}</p>
                    <p className="text-xs text-muted-foreground">{format.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/training">
                  Explore Workshops
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/training#pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
