import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, MessageSquare, Phone, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-scamshield-new.jpg";

const ScamShield = () => {
  const features = [
    {
      icon: Mail,
      title: "Email Analysis",
      description: "Forward suspicious emails for expert analysis and threat assessment within hours."
    },
    {
      icon: MessageSquare,
      title: "SMS/Text Protection",
      description: "Screenshot and submit suspicious text messages for immediate verification."
    },
    {
      icon: Phone,
      title: "Voice Call Screening",
      description: "Report suspicious calls and voice messages for authenticity verification."
    },
    {
      icon: FileText,
      title: "Document Verification",
      description: "Upload questionable documents, invoices, or letters for legitimacy checks."
    }
  ];

  const plans = [
    {
      name: "Basic Shield",
      price: "$179",
      period: "per month",
      features: [
        "Up to 5 submissions per month",
        "Email threat analysis",
        "SMS/text verification",
        "24-48 hour response time",
        "Basic threat reports",
        "Email support"
      ]
    },
    {
      name: "Family Shield",
      price: "$379",
      period: "per month",
      popular: true,
      features: [
        "Unlimited submissions",
        "All communication types",
        "Voice call analysis",
        "4-8 hour response time",
        "Detailed threat reports",
        "Family Safety Vault access",
        "Priority email & phone support",
        "Safe word protocol setup"
      ]
    },
    {
      name: "Premium Shield",
      price: "$749",
      period: "per month",
      features: [
        "Everything in Family Shield",
        "Real-time threat monitoring",
        "1-2 hour emergency response",
        "AI-powered pre-screening",
        "Dedicated threat analyst",
        "Monthly security briefings",
        "24/7 phone support",
        "Legal consultation referrals"
      ]
    }
  ];

  const process = [
    {
      icon: AlertTriangle,
      title: "Submit Suspicious Content",
      description: "Forward, screenshot, or upload anything that seems suspicious to our secure portal."
    },
    {
      icon: Shield,
      title: "Expert Analysis",
      description: "Our certified threat analysts examine every detail using advanced tools and databases."
    },
    {
      icon: CheckCircle,
      title: "Get Clear Guidance",
      description: "Receive detailed reports with risk levels and specific action steps to stay safe."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Hero
        headline="ScamShield Protection"
        subheadline="Expert threat analysis to protect you and your family from scams, fraud, and malicious content"
        backgroundImage={heroImage}
        showScrollIndicator
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <a href="#plans">Choose Your Plan</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#how-it-works">Learn More</a>
          </Button>
        </div>
      </Hero>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Comprehensive Threat Analysis</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We analyze every type of suspicious communication to keep you safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">How ScamShield Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, fast, and effective protection in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose Your Protection Level</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the plan that fits your family's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Threats Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4hrs</div>
              <div className="text-muted-foreground">Average Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Protect Your Family?"
        description="Join thousands of families who trust ScamShield to keep them safe from digital threats."
        variant="gold"
      >
        <Button size="lg" variant="secondary" asChild>
          <Link to="/contact">Get Started Today</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/training">View Training Options</Link>
        </Button>
      </CTASection>

      <Footer />
    </div>
  );
};

export default ScamShield;
