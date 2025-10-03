import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const applicationSchema = z.object({
  churchName: z.string().trim().min(1, "Church name is required").max(100),
  name: z.string().trim().min(1, "Your name is required").max(100),
  role: z.string().min(1, "Please select your role"),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number is required").max(20),
  congregationSize: z.string().min(1, "Please select congregation size"),
  trainingFormat: z.string().min(1, "Please select training format"),
  location: z.string().trim().min(1, "Location is required").max(100),
  additionalInfo: z.string().max(1000).optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to be contacted"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const ChurchPartnerships = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Application submitted successfully! We'll contact you within 24 hours.");
      reset();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(41,100%,98%)] via-white to-[hsl(41,96%,90%)]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-block px-7 py-2.5 bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] text-white rounded-full text-sm font-bold mb-7 shadow-[0_4px_16px_rgba(245,158,11,0.3)]">
            COMMUNITY PARTNERSHIPS
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent">
            Partner With InVision Network
          </h1>
          <p className="text-xl text-[hsl(215,16%,47%)] max-w-4xl mx-auto mb-12 leading-relaxed">
            Protect your congregation from AI-powered scams. We provide comprehensive training, resources, and ongoing support to keep your church community safe—at special nonprofit pricing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">
                20+
              </div>
              <div className="text-[hsl(215,16%,47%)] font-semibold">Church Partners</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">
                1,200+
              </div>
              <div className="text-[hsl(215,16%,47%)] font-semibold">Members Trained</div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">
                35%
              </div>
              <div className="text-[hsl(215,16%,47%)] font-semibold">Discount for Churches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent mb-5">
              Why Churches Partner With Us
            </h2>
            <p className="text-xl text-[hsl(215,16%,47%)] max-w-3xl mx-auto">
              We understand the unique needs and concerns of faith communities. Our mission is to protect the most vulnerable in your congregation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: "🙏", title: "Faith-Centered Approach", desc: "We respect your values and integrate security training in a way that honors your community's spiritual focus." },
              { icon: "👴", title: "Senior-Focused Training", desc: "Our training is specifically designed for older adults—patient, clear, and free of condescending language." },
              { icon: "💰", title: "Nonprofit Pricing", desc: "Special discounted rates for churches and faith-based organizations—up to 35% off standard pricing." },
              { icon: "🎓", title: "Flexible Training Options", desc: "In-person at your church, online via Zoom, or hybrid models—whatever works best for your congregation." },
              { icon: "📚", title: "Free Resources", desc: "Take-home guides, emergency scripts, and ongoing support materials for your entire community." },
              { icon: "🤝", title: "Ongoing Support", desc: "Post-training support, monthly safety tips, and priority access to our security experts." },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[hsl(41,100%,98%)] to-white p-10 rounded-2xl border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 hover:border-[hsl(32,95%,48%)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.2)] transition-all duration-300">
                <div className="w-[70px] h-[70px] bg-gradient-to-br from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] rounded-[18px] flex items-center justify-center text-4xl mb-6 shadow-[0_6px_20px_rgba(245,158,11,0.3)]">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-[hsl(213,56%,25%)] mb-3">{benefit.title}</h3>
                <p className="text-[hsl(215,16%,47%)] leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[hsl(41,96%,90%)] to-[hsl(41,100%,98%)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent mb-5">
              How Church Partnerships Work
            </h2>
            <p className="text-xl text-[hsl(215,16%,47%)]">
              A simple, straightforward process to get your congregation protected
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {[
              { num: "1", title: "Apply & Consult", desc: "Fill out our partnership application. We'll schedule a free consultation to understand your church's needs." },
              { num: "2", title: "Custom Plan", desc: "We create a customized training plan and pricing structure based on your congregation size and budget." },
              { num: "3", title: "Schedule Training", desc: "Choose your training dates—Sunday after service, weeknight sessions, or weekend workshops." },
              { num: "4", title: "Deliver Training", desc: "Our certified instructors conduct engaging, respectful training sessions at your church or online." },
              { num: "5", title: "Ongoing Protection", desc: "Your congregation receives ongoing support, monthly tips, and access to our scam verification service." },
            ].map((step) => (
              <div key={step.num} className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.15)] text-center">
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-[0_6px_20px_rgba(245,158,11,0.4)]">
                  {step.num}
                </div>
                <h3 className="text-xl font-extrabold text-[hsl(213,56%,25%)] mb-3">{step.title}</h3>
                <p className="text-[hsl(215,16%,47%)] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent mb-5">
              Church Partnership Pricing
            </h2>
            <p className="text-xl text-[hsl(215,16%,47%)]">
              Affordable, transparent pricing designed for nonprofit budgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Small Church */}
            <div className="bg-white p-12 rounded-3xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)] hover:border-[hsl(32,95%,48%)] transition-all duration-400">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-[hsl(213,56%,25%)] mb-4">Small Church</h3>
                <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">$450</div>
                <div className="text-lg text-[hsl(215,16%,47%)] font-semibold">one-time session</div>
              </div>
              <ul className="space-y-4 mb-8">
                {["Up to 25 participants", "2-hour training session", "In-person or Zoom", "Take-home resource packets", "Emergency response scripts", "30-day email support"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(158,70%,65%)] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">✓</span>
                    <span className="text-[hsl(215,16%,47%)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(215,50%,38%)] hover:from-[hsl(215,50%,38%)] hover:to-[hsl(218,45%,51%)] text-white font-bold py-[18px] rounded-[14px] shadow-[0_4px_16px_rgba(30,58,95,0.3)] hover:shadow-[0_6px_24px_rgba(30,58,95,0.4)] transition-all duration-300">
                APPLY NOW
              </Button>
            </div>

            {/* Medium Church (Featured) */}
            <div className="bg-gradient-to-br from-white to-[hsl(41,100%,98%)] p-12 rounded-3xl shadow-[0_8px_30px_rgba(245,158,11,0.2)] border-3 border-[hsl(32,95%,48%)] hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(245,158,11,0.35)] transition-all duration-400 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] text-white px-6 py-2 rounded-full text-xs font-extrabold tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-[hsl(213,56%,25%)] mb-4">Medium Church</h3>
                <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">$850</div>
                <div className="text-lg text-[hsl(215,16%,47%)] font-semibold">one-time session</div>
              </div>
              <ul className="space-y-4 mb-8">
                {["Up to 50 participants", "2.5-hour training session", "In-person or Zoom", "Take-home resource packets", "Emergency response scripts", "90-day email & phone support", "Monthly safety newsletters", "Free follow-up Q&A session"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(158,70%,65%)] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">✓</span>
                    <span className="text-[hsl(215,16%,47%)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] hover:from-[hsl(38,92%,50%)] hover:to-[hsl(43,96%,56%)] text-white font-extrabold py-[18px] rounded-[14px] shadow-[0_4px_16px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.6)] transition-all duration-300">
                APPLY NOW
              </Button>
            </div>

            {/* Large Church */}
            <div className="bg-white p-12 rounded-3xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] border-2 border-[hsl(32,95%,48%)]/20 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)] hover:border-[hsl(32,95%,48%)] transition-all duration-400">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold text-[hsl(213,56%,25%)] mb-4">Large Church</h3>
                <div className="text-5xl font-black bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent mb-2">Custom</div>
                <div className="text-lg text-[hsl(215,16%,47%)] font-semibold">contact for quote</div>
              </div>
              <ul className="space-y-4 mb-8">
                {["50+ participants", "Multiple training sessions", "In-person, Zoom, or hybrid", "Custom resource materials", "Emergency response scripts", "Year-round support", "Quarterly training sessions", "Priority scam verification service"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(158,70%,65%)] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">✓</span>
                    <span className="text-[hsl(215,16%,47%)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={scrollToForm} className="w-full bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(215,50%,38%)] hover:from-[hsl(215,50%,38%)] hover:to-[hsl(218,45%,51%)] text-white font-bold py-[18px] rounded-[14px] shadow-[0_4px_16px_rgba(30,58,95,0.3)] hover:shadow-[0_6px_24px_rgba(30,58,95,0.4)] transition-all duration-300">
                REQUEST QUOTE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[hsl(41,100%,98%)] to-[hsl(41,96%,90%)]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent">
              What Church Leaders Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { quote: "InVision Network provided outstanding training to our congregation. Three of our members avoided scams within the first month thanks to what they learned. This is an invaluable service for churches.", name: "Pastor Michael Rodriguez", church: "First Baptist Church, Dayton", initials: "MR" },
              { quote: "The training was respectful, clear, and perfectly suited for our senior members. The instructors were patient and answered every question. Our church feels much safer now.", name: "Rev. Sarah Kim", church: "Grace Community Church, Springfield", initials: "SK" },
              { quote: "We've partnered with InVision for two years now. The ongoing support and monthly updates keep our congregation informed about the latest threats. Worth every penny.", name: "Deacon David Washington", church: "Mt. Zion AME Church, Cincinnati", initials: "DW" },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(245,158,11,0.12)] relative">
                <div className="text-8xl bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] bg-clip-text text-transparent absolute top-5 left-5 opacity-20 leading-none">"</div>
                <p className="text-[hsl(215,16%,47%)] leading-relaxed mb-6 relative z-10">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] bg-gradient-to-br from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] rounded-full flex items-center justify-center text-white text-2xl font-extrabold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[hsl(213,56%,25%)]">{testimonial.name}</h4>
                    <p className="text-sm text-[hsl(215,16%,47%)]">{testimonial.church}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[hsl(213,56%,25%)] to-[hsl(213,45%,15%)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(32,95%,48%)] via-[hsl(38,92%,50%)] to-[hsl(43,96%,56%)]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-6">Ready to Protect Your Congregation?</h2>
          <p className="text-xl text-white/90 leading-relaxed mb-10">
            Join 20+ churches already partnering with InVision Network. Apply today for a free consultation and custom pricing quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button onClick={scrollToForm} className="px-12 py-6 text-lg font-extrabold bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] hover:from-[hsl(38,92%,50%)] hover:to-[hsl(43,96%,56%)] text-white rounded-2xl shadow-[0_6px_24px_rgba(245,158,11,0.5)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.7)] transition-all duration-300">
              APPLY FOR PARTNERSHIP
            </Button>
            <Button asChild variant="outline" className="px-12 py-6 text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-[hsl(213,56%,25%)] rounded-2xl transition-all duration-300">
              <a href="tel:+19375551234">Call (937) 555-1234</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[hsl(213,56%,25%)] to-[hsl(32,95%,48%)] bg-clip-text text-transparent mb-5">
              Partnership Application
            </h2>
            <p className="text-xl text-[hsl(215,16%,47%)]">
              Fill out the form below and we'll contact you within 24 hours
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-gradient-to-br from-[hsl(41,100%,98%)] to-white p-12 rounded-3xl shadow-[0_8px_30px_rgba(245,158,11,0.15)] border-2 border-[hsl(32,95%,48%)]/20">
            <div className="space-y-6">
              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Church Name *</label>
                <input {...register("churchName")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all" placeholder="First Baptist Church" />
                {errors.churchName && <p className="text-red-500 text-sm mt-1">{errors.churchName.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Your Name *</label>
                <input {...register("name")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all" placeholder="Pastor John Smith" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Your Role *</label>
                <select {...register("role")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all">
                  <option value="">Select your role</option>
                  <option value="pastor">Pastor/Minister</option>
                  <option value="deacon">Deacon/Elder</option>
                  <option value="administrator">Church Administrator</option>
                  <option value="volunteer">Volunteer/Member</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Email Address *</label>
                <input {...register("email")} type="email" className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all" placeholder="pastor@church.org" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Phone Number *</label>
                <input {...register("phone")} type="tel" className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all" placeholder="(937) 555-1234" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Congregation Size *</label>
                <select {...register("congregationSize")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all">
                  <option value="">Select size</option>
                  <option value="under-25">Under 25 members</option>
                  <option value="25-50">25-50 members</option>
                  <option value="51-100">51-100 members</option>
                  <option value="101-200">101-200 members</option>
                  <option value="200+">200+ members</option>
                </select>
                {errors.congregationSize && <p className="text-red-500 text-sm mt-1">{errors.congregationSize.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Preferred Training Format *</label>
                <select {...register("trainingFormat")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all">
                  <option value="">Select format</option>
                  <option value="in-person">In-Person at Church</option>
                  <option value="zoom">Zoom/Virtual</option>
                  <option value="hybrid">Hybrid (Both)</option>
                  <option value="not-sure">Not Sure Yet</option>
                </select>
                {errors.trainingFormat && <p className="text-red-500 text-sm mt-1">{errors.trainingFormat.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Church Location (City, State) *</label>
                <input {...register("location")} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all" placeholder="Dayton, OH" />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
              </div>

              <div>
                <label className="block text-[hsl(213,56%,25%)] font-bold mb-2">Additional Information</label>
                <textarea {...register("additionalInfo")} rows={4} className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[hsl(32,95%,48%)] focus:ring-2 focus:ring-[hsl(32,95%,48%)]/20 outline-none transition-all resize-vertical" placeholder="Tell us about any specific concerns or questions you have..." />
              </div>

              <div className="flex items-start gap-3">
                <input {...register("consent")} type="checkbox" id="consent" className="w-5 h-5 mt-0.5 cursor-pointer" />
                <label htmlFor="consent" className="text-sm text-[hsl(215,16%,47%)] leading-relaxed">
                  I confirm that I am authorized to apply for partnership on behalf of my church, and I agree to be contacted by InVision Network regarding this application.
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

              <Button type="submit" disabled={isSubmitting} className="w-full py-[18px] text-lg font-extrabold bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] hover:from-[hsl(38,92%,50%)] hover:to-[hsl(43,96%,56%)] text-white rounded-[14px] shadow-[0_4px_16px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_24px_rgba(245,158,11,0.6)] transition-all duration-300">
                {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[hsl(213,56%,25%)] to-[hsl(213,45%,15%)] text-white py-16 px-4">
        <div className="w-full h-0.5 bg-gradient-to-r from-[hsl(32,95%,48%)] via-[hsl(38,92%,50%)] to-[hsl(43,96%,56%)] mb-10" />
        <div className="container mx-auto text-center">
          <p className="text-white/80 mb-5">InVision Network - Protecting Families and Communities</p>
          <div className="flex flex-wrap justify-center gap-8 mb-5">
            <Link to="/" className="text-white/80 hover:text-[hsl(38,92%,50%)] transition-colors">Home</Link>
            <Link to="/training" className="text-white/80 hover:text-[hsl(38,92%,50%)] transition-colors">Training Programs</Link>
            <Link to="/scam-shield" className="text-white/80 hover:text-[hsl(38,92%,50%)] transition-colors">Scam Shield</Link>
            <Link to="/about" className="text-white/80 hover:text-[hsl(38,92%,50%)] transition-colors">About Us</Link>
            <Link to="/contact" className="text-white/80 hover:text-[hsl(38,92%,50%)] transition-colors">Contact</Link>
          </div>
          <p className="text-white/60 text-sm">© 2025 InVision Network. All Rights Reserved. | Veteran-Owned | Based in Dayton, OH</p>
        </div>
      </footer>
    </div>
  );
};

export default ChurchPartnerships;
