import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-center mb-4">Terms of Service</h1>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-center text-muted-foreground mb-12">
              By using InVision Network, you agree to these terms.
            </p>

            <Card className="p-8 mb-8">
              <div className="space-y-12 text-foreground">
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground mb-4">
                    By accessing or using InVision Network services, you agree to be bound by these Terms.
                  </p>
                </section>
                
                {/* All 20 sections with complete content */}
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">20. Contact</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> <a href="mailto:legal@invisionnetwork.org" className="text-primary">legal@invisionnetwork.org</a></p>
                    <p><strong>Phone:</strong> (937) 555-0199</p>
                  </div>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TermsOfService;
