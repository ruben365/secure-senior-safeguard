import { Star, Shield, Users, TrendingUp, Award, Heart, Quote, ArrowRight, CheckCircle } from "lucide-react";
 import { Link } from "react-router-dom";
 import familyLivingRoom from "@/assets/family-living-room-natural.jpg";
 import grandmotherGrandchildren from "@/assets/grandmother-grandchildren-sofa.jpg";
 import seniorsTablet from "@/assets/seniors-tablet-kitchen.jpg";

 const testimonials = [
   {
     name: "Margaret S.",
     role: "Protected Family Member",
     quote: "They saved me from a $15,000 scam. Forever grateful!",
     rating: 5,
     image: grandmotherGrandchildren,
   },
   {
     name: "Robert T.",
     role: "Veteran",
     quote: "Finally, experts who understand our community's needs.",
     rating: 5,
     image: seniorsTablet,
   },
 ];

 const floatingStats = [
   { icon: Users, value: "500+", label: "Families Protected", color: "#F8926A" },
   { icon: Shield, value: "10K+", label: "Scams Blocked", color: "#BB81B5" },
   { icon: TrendingUp, value: "99.8%", label: "Success Rate", color: "#18305A" },
   { icon: Award, value: "4+", label: "Years Active", color: "#F8926A" },
 ];

 export const PremiumGlassmorphismWidgets = () => {
   return (
    <section className="relative py-12 bg-gradient-to-b from-background to-muted/30">
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         {/* Section Header */}
          <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-4">
             <span className="text-xs font-semibold text-primary uppercase tracking-wide">Why Families Trust Us</span>
           </div>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
             Real Protection, Real Results
           </h2>
           <p className="text-base text-muted-foreground max-w-2xl mx-auto">
             Join thousands of Ohio families who trust us with their digital safety every day.
           </p>
          </div>

         {/* Main Grid Layout */}
         <div className="grid lg:grid-cols-12 gap-6">
           {/* Left - Large Image with Glassmorphism Overlay */}
           <div className="lg:col-span-5 relative">
             <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
               <img 
                 src={familyLivingRoom} 
                 alt="Happy family protected from scams"
                 width={500}
                 height={625}
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
               <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-xl p-4 border border-border">
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="text-muted-foreground text-sm font-medium mb-1">Protected Families</div>
                     <div className="text-foreground text-2xl font-bold">500+</div>
                   </div>
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                     <Heart className="w-6 h-6 text-primary" />
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Right - Widgets Grid */}
           <div className="lg:col-span-7 grid gap-6">
             {/* Stats Row */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {floatingStats.map((stat, i) => (
                 <div
                   key={stat.label}
                   className="bg-card rounded-xl p-5 border border-border shadow-sm hover:-translate-y-1 transition-transform"
                 >
                     <div 
                       className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center"
                       style={{ backgroundColor: `${stat.color}15` }}
                     >
                       <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                     </div>
                     <div className="text-xl font-bold text-foreground mb-1">
                       {stat.value}
                     </div>
                     <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                 </div>
               ))}
             </div>

             {/* Testimonials */}
             <div className="grid md:grid-cols-2 gap-4">
               {testimonials.map((testimonial, i) => (
                 <div
                   key={testimonial.name}
                   className="bg-card rounded-xl p-5 border border-border shadow-sm"
                 >
                   <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                     <Quote className="w-4 h-4 text-muted-foreground" />
                   </div>
                   <div className="flex gap-1 mb-4">
                     {[...Array(testimonial.rating)].map((_, j) => (
                       <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                     ))}
                   </div>
                   <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                     "{testimonial.quote}"
                   </p>
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                       <img 
                         src={testimonial.image} 
                         alt={testimonial.name}
                         width={40}
                         height={40}
                         loading="lazy"
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div>
                       <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                       <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>

             {/* CTA Card */}
             <div className="rounded-xl p-6 bg-primary text-primary-foreground">
               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                 <div>
                   <h3 className="text-xl font-bold mb-2">
                     Ready to Protect Your Family?
                   </h3>
                   <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
                     <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Free Consultation</span>
                     <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 30-Day Guarantee</span>
                   </div>
                 </div>
                 <Link 
                   to="/training#pricing"
                   className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
                 >
                   Get Started
                   <ArrowRight className="w-5 h-5" />
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };