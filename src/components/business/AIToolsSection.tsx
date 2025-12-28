import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/ScrollReveal";
import { 
  ShoppingCart, MessageSquare, Wrench, ArrowRight, 
  CheckCircle, Lightbulb, Settings, Zap
} from "lucide-react";

function AIToolsSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span>AI Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Tools & Optimization</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're exploring AI tools or already using one, we can help you get more value.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="thinking" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 mb-8">
              <TabsTrigger value="thinking" className="text-base h-12">
                <Lightbulb className="w-4 h-4 mr-2" />
                I'm thinking about buying
              </TabsTrigger>
              <TabsTrigger value="already" className="text-base h-12">
                <Settings className="w-4 h-4 mr-2" />
                I already have a tool
              </TabsTrigger>
            </TabsList>
            
            {/* Thinking about buying */}
            <TabsContent value="thinking">
              <ScrollReveal animation="fade-up">
                <Card className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Buy Option */}
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Ready to Buy?</h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Purchase AI tools directly with secure checkout. Card, bank, or QR code payment available.
                      </p>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Instant access after purchase</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Free setup guidance</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>30-day satisfaction guarantee</span>
                        </li>
                      </ul>
                      <Button asChild className="w-full">
                        <Link to="/buy/ai-insurance">
                          Browse AI Tools
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    
                    {/* Right: Consultation Option */}
                    <div className="text-center p-6 rounded-xl bg-muted/50 border">
                      <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Need Guidance?</h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Not sure what you need? Schedule a free consultation and we'll help you find the right solution.
                      </p>
                      <ul className="text-left space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Free 20-minute consultation</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>Personalized recommendations</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>No obligation</span>
                        </li>
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/schedule">
                          Request Consultation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </TabsContent>
            
            {/* Already have a tool */}
            <TabsContent value="already">
              <ScrollReveal animation="fade-up">
                <Card className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Optimize Your Current Setup</h3>
                  <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    Already using an AI tool but not getting the results you expected? We can help you optimize, troubleshoot, and get more value from your existing investment.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">2-4x</div>
                      <div className="text-sm text-muted-foreground">Typical improvement</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">48hrs</div>
                      <div className="text-sm text-muted-foreground">Quick assessment</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-1">Free</div>
                      <div className="text-sm text-muted-foreground">Initial review</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link to="/get-started/ai-agents?plan=STARTER">
                        Get Optimization Assessment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/buy/ai-insurance">
                        Get Insurance Coverage
                      </Link>
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default AIToolsSection;
