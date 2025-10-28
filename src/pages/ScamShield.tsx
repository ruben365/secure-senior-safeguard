import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Clock, Phone, CheckCircle } from "lucide-react";

const ScamShield = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Hero
          backgroundImage="/api/placeholder/1920/1080"
          headline="ScamShield 24/7 Protection"
          subheadline="Round-the-clock security monitoring and expert support for Ohio families"
        >
          <Button asChild variant="gold" size="xl" className="text-lg font-bold">
            <Link to="/contact">Get Protected Now</Link>
          </Button>
        </Hero>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Why Choose ScamShield?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-strong transition-all">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl mb-3">24/7 Monitoring</h3>
                <p className="text-muted-foreground">Always watching for threats</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-strong transition-all">
                <Phone className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl mb-3">Expert Hotline</h3>
                <p className="text-muted-foreground">Call anytime for help</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-strong transition-all">
                <Clock className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl mb-3">Real-Time Alerts</h3>
                <p className="text-muted-foreground">Instant scam notifications</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-strong transition-all">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="text-xl mb-3">Verified Safe</h3>
                <p className="text-muted-foreground">Check if contacts are legitimate</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6">Ready to Get Protected?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join 500+ Ohio families who trust ScamShield for their security
            </p>
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ScamShield;
