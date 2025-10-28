import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, Phone, Mail } from 'lucide-react';

const trendingScams = [
  {
    title: "AI Voice Clone 'Grandparent Scam' Surge",
    date: "December 15, 2025",
    severity: "Critical",
    summary: "Scammers are using AI to clone voices of family members, targeting seniors with fake emergency calls demanding immediate wire transfers.",
    icon: Phone,
    category: "Voice Scams"
  },
  {
    title: "QR Code Parking Meter Scams Nationwide",
    date: "December 12, 2025",
    severity: "High",
    summary: "Fraudulent QR codes are being placed over legitimate ones on parking meters across major cities, stealing credit card information.",
    icon: AlertTriangle,
    category: "QR Scams"
  },
  {
    title: "Medicare Open Enrollment Phishing Wave",
    date: "December 10, 2025",
    severity: "High",
    summary: "Fake Medicare representatives are calling seniors offering 'new benefits' and requesting Social Security numbers and banking information.",
    icon: Phone,
    category: "Phone Scams"
  },
  {
    title: "Deepfake CEO Email Scams Hit Small Businesses",
    date: "December 8, 2025",
    severity: "Critical",
    summary: "AI-generated videos and emails impersonating company executives are tricking employees into making fraudulent wire transfers.",
    icon: Mail,
    category: "Business Scams"
  },
  {
    title: "Fake Package Delivery Text Messages",
    date: "December 5, 2025",
    severity: "Medium",
    summary: "Scammers are sending fake delivery notifications with malicious links claiming packages require 'updated shipping information.'",
    icon: AlertTriangle,
    category: "SMS Scams"
  },
  {
    title: "Romance Scams Using AI-Generated Profile Photos",
    date: "December 1, 2025",
    severity: "High",
    summary: "Dating site scammers are using AI to create realistic profile pictures and chatbots to build relationships before requesting money.",
    icon: TrendingUp,
    category: "Romance Scams"
  },
];

const TrendingScamsSection = () => {
  return (
    <section className="py-6 bg-background border-t-2 border-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-destructive/10 rounded-full mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive inline mr-2" />
            <span className="font-bold text-destructive uppercase text-sm">Trending Scam Alerts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Scam Warnings & Alerts</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about the newest scam tactics targeting seniors and small businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {trendingScams.map((scam, index) => (
            <Card key={index} className="p-6 hover:shadow-strong transition-all hover:-translate-y-1 border-l-4 border-l-destructive">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <scam.icon className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={scam.severity === "Critical" ? "destructive" : "secondary"} className="text-xs">
                      {scam.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{scam.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{scam.title}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                {scam.summary}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Badge variant="outline" className="text-xs">
                  {scam.category}
                </Badge>
                <Link to="/resources" className="text-primary hover:text-primary/80 font-semibold text-sm">
                  Learn More →
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Receive weekly scam alerts and protection tips directly to your inbox
          </p>
          <Button asChild size="lg" variant="default">
            <Link to="/resources">Subscribe to Scam Alerts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingScamsSection;
