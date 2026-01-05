import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, Download, ArrowRight, Sparkles } from "lucide-react";

const resources = [
  {
    icon: Shield,
    title: "Cyber Insurance",
    description: "Protection against identity theft and cyber fraud with coverage up to $1M.",
    tag: "Protection",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: FileText,
    title: "Emergency Scripts",
    description: "Downloadable PDF scripts to handle scam calls and suspicious contacts.",
    tag: "Free Download",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: BookOpen,
    title: "Free Articles",
    description: "Expert guides on staying safe online, recognizing scams, and protecting your data.",
    tag: "Free Resources",
    color: "from-amber-500 to-orange-500",
  },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Resources & Tools</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Tools & Resources for{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Complete Protection</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond training, we provide the tools you need to stay protected. From insurance coverage to free educational materials, 
              we've got you covered.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/resources">
                  Browse All Resources
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Cards Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to="/resources" className="block">
                  <div className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4 hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <resource.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {resource.tag}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
