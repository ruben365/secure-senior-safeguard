import { motion } from "framer-motion";
import { Award, Star, CheckCircle, Sparkles, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "12+", label: "Projects Completed", icon: Trophy },
  { value: "500+", label: "Families Protected", icon: Star },
  { value: "99.9%", label: "Uptime", icon: CheckCircle },
  { value: "24/7", label: "Support", icon: Sparkles },
];

export const AchievementsShowcase = () => {
  return (
    <section className="py-5 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-1.5">
            Our Achievements
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Protecting families and communities across Ohio
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="p-3 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10"
              >
                <div className="flex justify-center mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Metrics are updated periodically and reflect internal tracking.
        </p>
      </div>
    </section>
  );
};
