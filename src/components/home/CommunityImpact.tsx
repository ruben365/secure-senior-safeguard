import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Star, Users, Ribbon, Award, ArrowRight } from "lucide-react";
import communityGiving from "@/assets/community-giving.jpg";
import veteranSupport from "@/assets/veteran-support.jpg";

const impacts = [
  {
    icon: Shield,
    title: "Veteran Support",
    description: "We honor those who served with exclusive discounts and priority support for veterans and first responders.",
    stat: "17%",
    statLabel: "Veteran Discount",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Ribbon,
    title: "Children with Cancer",
    description: "A portion of every purchase supports families with children battling cancer through our partner organizations.",
    stat: "$5K+",
    statLabel: "Donated This Year",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Senior Protection",
    description: "Free educational resources and discounted services for seniors on fixed incomes to stay safe online.",
    stat: "200+",
    statLabel: "Seniors Helped",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Community Education",
    description: "Free workshops at libraries, churches, and community centers across Ohio to spread digital safety awareness.",
    stat: "15+",
    statLabel: "Partner Venues",
    color: "from-emerald-500 to-teal-500",
  },
];

export const CommunityImpact = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full border border-rose-500/20 mb-6">
            <Heart className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-semibold text-rose-600">Giving Back</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            More Than a Business—{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">A Mission</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in building a safer community for everyone. Here's how we're making a difference in Ohio and beyond.
          </p>
        </motion.div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src={communityGiving}
              alt="Community volunteering event"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Community Outreach</h3>
              <p className="text-white/80 text-sm">Bringing digital safety education to every corner of Ohio</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src={veteranSupport}
              alt="Supporting veterans"
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Veteran Support</h3>
              <p className="text-white/80 text-sm">Honoring those who served with discounts and priority care</p>
            </div>
          </motion.div>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-4`}>
                <impact.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{impact.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{impact.description}</p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-2xl font-bold text-foreground">{impact.stat}</p>
                <p className="text-xs text-muted-foreground">{impact.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Want to support our mission? Every purchase helps us protect more families and give back to those in need.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/resources">
                Explore Resources
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/about">Learn Our Story</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
