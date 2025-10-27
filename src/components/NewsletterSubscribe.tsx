import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email, name: name || null }]);

      if (error) {
        if (error.code === "23505") { // Duplicate email
          toast({
            title: "Already Subscribed",
            description: "This email is already on our mailing list!",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail("");
        setName("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto p-8 shadow-medium">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Stay Protected with Weekly Tips</h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Get free scam alerts, security tips, and AI safety updates delivered to your inbox. Unsubscribe anytime.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base"
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              size="default"
              className="h-12 px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
