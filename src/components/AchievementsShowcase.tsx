import { motion } from "framer-motion";
import { ExternalLink, Globe, Award, Star, CheckCircle, Sparkles, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    name: "Exodus Career",
    url: "https://exoduscareer.com",
    description: "Professional career coaching and job placement platform helping individuals land their dream jobs.",
    category: "Career Platform",
    features: ["Job Matching", "Resume Builder", "Career Coaching", "Interview Prep"],
    image: "🚀",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Roof AI Vision",
    url: "#",
    description: "AI-powered roofing inspection and damage assessment platform using advanced computer vision.",
    category: "AI Technology",
    features: ["AI Inspection", "Damage Detection", "Report Generation", "Insurance Integration"],
    image: "🏠",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "InVision Network",
    url: "https://invisionnetwork.org",
    description: "Our flagship AI scam protection platform protecting Ohio families from sophisticated fraud.",
    category: "Security Platform",
    features: ["Scam Detection", "Family Protection", "AI Training", "24/7 Support"],
    image: "🛡️",
    gradient: "from-primary/20 to-accent/20",
  },
];

const stats = [
  { value: "15+", label: "Projects Completed", icon: Trophy },
  { value: "50K+", label: "Users Protected", icon: Star },
  { value: "99.9%", label: "Uptime", icon: CheckCircle },
  { value: "24/7", label: "Support", icon: Sparkles },
];

export const AchievementsShowcase = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Award className="w-3 h-3 mr-1" />
            Our Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Websites & Platforms We've Built
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From career platforms to AI-powered solutions, we create digital experiences that make a difference
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-4 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-primary/10">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`h-full overflow-hidden group hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${project.gradient} border-primary/10`}>
                {/* Project Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{project.image}</div>
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Features */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-background/50 text-xs font-medium"
                      >
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 pt-2">
                  {project.url !== "#" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      disabled
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-primary/20 inline-block">
            <h3 className="text-xl font-bold mb-2">Need a Website or AI Solution?</h3>
            <p className="text-muted-foreground mb-4">
              Let us build something amazing for your business
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href="/business">
                <Sparkles className="w-4 h-4" />
                View Our Services
              </a>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
