import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ChurchPartnerships = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    churchName: "",
    name: "",
    email: "",
    phone: "",
    size: "",
    format: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll contact you within 24 hours.",
    });
  };

  const scrollToForm = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-teal-50 to-purple-100 opacity-60" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-float-slow" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">Community Partnerships</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                Partner With<br />InVision Network
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto font-medium leading-relaxed">
              Protect your congregation from AI-powered scams with comprehensive training, resources, and ongoing support—at special nonprofit pricing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { number: "20+", label: "Church Partners" },
              { number: "1.2K", label: "Members Trained" },
              { number: "35%", label: "Nonprofit Discount" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl border border-primary/20 transition-all duration-500 hover:border-primary/40 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 animate-scale-in"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <div className="text-base font-semibold text-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Why Partner</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Built For Faith Communities
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-medium">
              We understand the unique needs of church congregations and provide training that honors your values.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🙏", title: "Faith-Centered", desc: "Training that respects your values and integrates seamlessly with your community's spiritual focus." },
              { icon: "👴", title: "Senior-Focused", desc: "Patient, clear instruction designed for older adults—free of condescending language." },
              { icon: "💰", title: "Nonprofit Pricing", desc: "Special discounted rates for churches—up to 35% off standard pricing." },
              { icon: "🎓", title: "Flexible Options", desc: "In-person, online, or hybrid training—whatever works best for your congregation." },
              { icon: "📚", title: "Free Resources", desc: "Take-home guides, emergency scripts, and ongoing support materials included." },
              { icon: "🤝", title: "Ongoing Support", desc: "Post-training support, monthly tips, and priority access to security experts." }
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="group bg-white p-12 rounded-3xl border border-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-4 hover:shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl mb-7 shadow-lg shadow-purple-500/30 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {benefit.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-4 transition-colors group-hover:text-accent">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed font-medium">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-medium">
              A simple, straightforward process to get your congregation protected
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { num: 1, title: "Apply & Consult", desc: "Free consultation to understand your church's unique needs and concerns." },
              { num: 2, title: "Custom Plan", desc: "Customized training plan based on congregation size and budget." },
              { num: 3, title: "Schedule", desc: "Choose dates that work—Sunday sessions, weeknights, or weekend workshops." },
              { num: 4, title: "Training", desc: "Certified instructors deliver engaging, respectful training sessions." },
              { num: 5, title: "Protection", desc: "Ongoing support, monthly tips, and access to scam verification." }
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl text-center border border-primary/10 transition-all duration-500 hover:border-primary/30 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="w-18 h-18 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-lg shadow-purple-500/40 transition-all duration-500 hover:scale-110 hover:rotate-[360deg]">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Pricing</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Transparent Pricing
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-medium">
              Affordable rates designed for nonprofit budgets
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                name: "Small Church",
                price: "$450",
                unit: "one-time session",
                features: ["Up to 25 participants", "2-hour training session", "In-person or Zoom", "Resource packets", "Emergency scripts", "30-day support"],
                featured: false
              },
              {
                name: "Medium Church",
                price: "$850",
                unit: "one-time session",
                features: ["Up to 50 participants", "2.5-hour session", "In-person or Zoom", "Resource packets", "Emergency scripts", "90-day support", "Monthly newsletters", "Free follow-up Q&A"],
                featured: true
              },
              {
                name: "Large Church",
                price: "Custom",
                unit: "contact for quote",
                features: ["50+ participants", "Multiple sessions", "Hybrid training", "Custom materials", "Emergency scripts", "Year-round support", "Quarterly sessions", "Priority verification"],
                featured: false
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative bg-white p-14 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${
                  plan.featured 
                    ? 'border-primary scale-105 bg-gradient-to-br from-white to-purple-50 shadow-xl shadow-purple-500/30' 
                    : 'border-primary/15 hover:border-primary/40 hover:shadow-purple-500/20'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-7 py-2.5 bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-black rounded-full shadow-lg uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent scale-x-0 hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl" />
                
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-primary mb-5">{plan.name}</h3>
                  <div className="text-6xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                    {plan.price}
                  </div>
                  <div className="text-lg text-foreground/60 font-semibold">{plan.unit}</div>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-foreground/70 font-medium">
                      <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-success to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={scrollToForm}
                  className="w-full py-6 bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {plan.price === "Custom" ? "Request Quote" : "Apply Now"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-gradient-to-br from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              What Leaders Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { quote: "Outstanding training. Three members avoided scams within the first month. This is invaluable for churches.", author: "Pastor Michael Rodriguez", role: "First Baptist Church, Dayton", avatar: "MR" },
              { quote: "Respectful, clear, and perfectly suited for seniors. Patient instructors answered every question. Our church feels safer.", author: "Rev. Sarah Kim", role: "Grace Community Church", avatar: "SK" },
              { quote: "Partnered for two years. Ongoing support keeps our congregation informed about latest threats. Worth every penny.", author: "Deacon David Washington", role: "Mt. Zion AME Church", avatar: "DW" }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl border border-primary/15 transition-all duration-500 hover:border-primary/30 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="text-6xl text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text opacity-30 mb-5 leading-none">"</div>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8 font-medium">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 bg-gradient-to-br from-primary via-purple-700 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Ready to Protect Your Congregation?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
            Join 20+ churches partnering with InVision Network. Apply today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={scrollToForm}
              className="px-12 py-7 bg-white text-primary font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/30 hover:-translate-y-1 transition-all duration-300"
            >
              Apply for Partnership
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = 'tel:+19375551234'}
              className="px-12 py-7 bg-transparent text-white border-2 border-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              Call (937) 555-1234
            </Button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply" className="px-6 md:px-12 py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Get Started</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Partnership Application
            </h2>
            <p className="text-xl text-foreground/70 font-medium">
              We'll contact you within 24 hours
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-14 rounded-3xl border-2 border-primary/20 shadow-xl shadow-purple-500/10 space-y-7">
            <div>
              <Label htmlFor="churchName" className="text-base font-bold text-primary mb-3 block">Church Name *</Label>
              <Input
                id="churchName"
                required
                placeholder="First Baptist Church"
                className="h-14 px-6 border-2 border-primary/20 rounded-xl focus:border-primary text-base font-medium"
                value={formData.churchName}
                onChange={(e) => setFormData({...formData, churchName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="name" className="text-base font-bold text-primary mb-3 block">Your Name *</Label>
              <Input
                id="name"
                required
                placeholder="Pastor John Smith"
                className="h-14 px-6 border-2 border-primary/20 rounded-xl focus:border-primary text-base font-medium"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-base font-bold text-primary mb-3 block">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="pastor@church.org"
                className="h-14 px-6 border-2 border-primary/20 rounded-xl focus:border-primary text-base font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-base font-bold text-primary mb-3 block">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="(937) 555-1234"
                className="h-14 px-6 border-2 border-primary/20 rounded-xl focus:border-primary text-base font-medium"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="size" className="text-base font-bold text-primary mb-3 block">Congregation Size *</Label>
              <Select required value={formData.size} onValueChange={(val) => setFormData({...formData, size: val})}>
                <SelectTrigger className="h-14 px-6 border-2 border-primary/20 rounded-xl text-base font-medium">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25">Under 25 members</SelectItem>
                  <SelectItem value="25-50">25-50 members</SelectItem>
                  <SelectItem value="51-100">51-100 members</SelectItem>
                  <SelectItem value="101-200">101-200 members</SelectItem>
                  <SelectItem value="200+">200+ members</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="format" className="text-base font-bold text-primary mb-3 block">Training Format *</Label>
              <Select required value={formData.format} onValueChange={(val) => setFormData({...formData, format: val})}>
                <SelectTrigger className="h-14 px-6 border-2 border-primary/20 rounded-xl text-base font-medium">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="zoom">Virtual/Zoom</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="notes" className="text-base font-bold text-primary mb-3 block">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Tell us about your church's needs..."
                className="min-h-32 px-6 py-4 border-2 border-primary/20 rounded-xl focus:border-primary text-base font-medium resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full py-7 bg-gradient-to-r from-primary to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChurchPartnerships;
