import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Shield, ShoppingCart, Star, Loader2, Zap, Award, CheckCircle, Gift, BookOpen, Package, Sparkles, Users, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import heroResourcesMarketplace from "@/assets/hero-resources-marketplace.jpg";
import heroResourcesNew from "@/assets/hero-resources-new.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import bookAiFundamentals from "@/assets/book-ai-fundamentals.jpg";
import bookBeingRealAi from "@/assets/book-being-real-ai.jpg";
import bookAuthPersonalities from "@/assets/book-auth-personalities.jpg";
import bookAuthFriendshipV2 from "@/assets/book-auth-friendship-v2.jpg";
import bookScamPrevention from "@/assets/book-scam-prevention.jpg";
import bookFamilySafety from "@/assets/book-family-safety.jpg";
import bookBusinessCyber from "@/assets/book-business-cyber.jpg";
import bookAiManagement from "@/assets/book-ai-management.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// Static book products with covers
const staticBooks = [
  { id: 'book-ai-fundamentals', name: 'AI Fundamentals Book', description: 'Master the basics of artificial intelligence and how to protect yourself', price: 29.99, image: bookAiFundamentals, tag: 'Best Seller' },
  { id: 'book-ai-management', name: 'AI Management Guide', description: 'Learn to manage AI tools effectively and securely in your workflow', price: 34.99, image: bookAiManagement, tag: 'New' },
  { id: 'book-scam-prevention', name: 'Complete Scam Prevention Guide', description: 'Comprehensive guide to identifying and avoiding all types of scams', price: 39.99, image: bookScamPrevention, tag: 'Featured' },
  { id: 'book-business-cyber', name: 'Business Cybersecurity', description: 'Enterprise-level security strategies for modern businesses', price: 49.99, image: bookBusinessCyber, tag: 'Professional' },
  { id: 'book-family-safety', name: 'Family Safety Toolkit', description: 'Protect your entire family with practical safety protocols', price: 24.99, image: bookFamilySafety, tag: 'Family' },
  { id: 'book-being-real-ai', name: 'Being Real in an AI World', description: 'Navigate authenticity and human connection in the age of AI', price: 27.99, image: bookBeingRealAi, tag: 'New Release' },
  { id: 'book-auth-personalities', name: 'Second Authentication of Personalities', description: 'Advanced identity verification techniques for personal security', price: 32.99, image: bookAuthPersonalities, tag: 'Advanced' },
  { id: 'book-auth-friendship-v2', name: 'Second Authentication of Friendship Vol. 2', description: 'Verify and protect your social connections from imposters', price: 29.99, image: bookAuthFriendshipV2, tag: 'Volume 2' },
];

function Resources() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  // Fetch products from database
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['marketplace-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Separate physical products
  const physicalProducts = products?.filter(p => 
    p.tags?.some((tag: string) => ['physical', 'device', 'hardware', 'kit', 'equipment'].includes(tag.toLowerCase()))
  ) || [];

  const handleBuyNow = async (productId: string) => {
    try {
      setLoading(productId);
      
      const { data, error } = await supabase.functions.invoke('create-product-payment', {
        body: { productId, quantity: 1 }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Checkout",
          description: "Opening secure payment page...",
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleAddToCart = (book: typeof staticBooks[0]) => {
    addItem({
      id: book.id,
      productId: book.id,
      name: book.name,
      price: book.price,
      image: book.image
    });
    toast({
      title: "Added to Cart",
      description: `${book.name} has been added to your cart.`,
    });
  };

  const resourcesHeroImages = [
    { src: heroResourcesMarketplace, alt: "Safety resources and training marketplace" },
    { src: heroResourcesNew, alt: "Educational materials and guides" },
    { src: heroResources, alt: "Community accessing helpful resources" }
  ];

  return (
    <>
      <SEO 
        title="Resources & Marketplace - Digital Guides & Security Products"
        description="Browse our curated collection of scam prevention guides and physical security products. Everything you need to protect yourself and your loved ones."
      />
      <Navigation />
      
      <Hero
        backgroundImages={resourcesHeroImages}
        headline="Your Digital Safety Arsenal"
        subheadline="Premium guides, tools, and products to protect what matters most"
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Introduction Section */}
      <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 text-sm px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Trusted Resources
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your One-Stop Security Shop
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Welcome to InVision Network's resource center. Here you'll find carefully curated 
                <strong className="text-foreground"> e-books, digital guides, softcover books, and security gadgets</strong> — 
                all designed to help you and your family stay safe in the digital age. Every product 
                is created by security experts with decades of experience protecting families from scams.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Digital & Print Books</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4 text-primary" />
                  <span>Security Gadgets</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="w-4 h-4 text-primary" />
                  <span>Instant Downloads</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Family-Friendly</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Navigation Pills */}
      <section className="py-6 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 justify-center">
              {["📚 E-Books", "📖 Guides", "🔐 Security Devices", "🎁 Bundles", "📄 Free Resources"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Digital Security Guides - Compact Cards */}
      <section id="guides" className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Instant Digital Download
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Security Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Expert knowledge delivered instantly. Download and print, or read on any device.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
            {staticBooks.map((book, index) => (
              <ScrollReveal key={book.id} delay={index * 50}>
                <Card className="group p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30 relative overflow-hidden bg-card h-full flex flex-col">
                  {/* Tag Badge */}
                  <Badge className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white z-10">
                    {book.tag}
                  </Badge>

                  {/* Book Cover Image */}
                  <div className="relative mb-3 rounded-lg overflow-hidden bg-secondary/30">
                    <div className="aspect-[3/4]">
                      <img 
                        src={book.image} 
                        alt={book.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xs md:text-sm font-bold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {book.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                    {book.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="mt-auto pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base md:text-lg font-bold text-primary">${book.price}</span>
                      <span className="text-[8px] text-success font-medium">🎖️ Vets 10% OFF</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(book)}
                        className="text-[10px] h-7 px-2"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Cart
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBuyNow(book.id)}
                        disabled={loading === book.id}
                        className="text-[10px] h-7 px-2"
                      >
                        {loading === book.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-3 h-3 mr-1" />
                            Buy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Upsell Banner */}
          <ScrollReveal>
            <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl border border-primary/20 text-center">
              <p className="text-sm font-medium mb-2">
                📦 <strong>Bundle & Save!</strong> Purchase 3+ books and get 15% off your entire order.
              </p>
              <p className="text-xs text-muted-foreground">
                All digital products are delivered instantly to your email. Files can be uploaded from admin dashboard.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Physical Products Section - Compact */}
      <section id="products" className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Ships Within 2-3 Business Days
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Physical Security Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Carefully curated hardware to enhance your digital safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </Card>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-destructive text-sm">Error loading products. Please try again.</p>
              </div>
            ) : physicalProducts.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="max-w-md mx-auto">
                  <Package className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm mb-2">Physical products coming soon!</p>
                  <p className="text-xs text-muted-foreground">Check back for security gadgets, privacy tools, and protective devices.</p>
                </div>
              </div>
            ) : (
              physicalProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 50}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30 overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                      {product.featured_image_url ? (
                        <img 
                          src={product.featured_image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Shield className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                      {index === 0 && (
                        <Badge className="absolute top-2 left-2 text-[9px] bg-emerald-500 text-white">
                          <CheckCircle className="w-2.5 h-2.5 mr-0.5" /> Top Rated
                        </Badge>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-xs md:text-sm font-bold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex gap-1 mb-2 flex-wrap">
                        <span className="text-[8px] px-1.5 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">
                          🚚 Free Ship
                        </span>
                        <span className="text-[8px] px-1.5 py-0.5 bg-success/10 text-success rounded-full">
                          ✓ Warranty
                        </span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating_average || 4.5) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>

                      {/* Price and Action */}
                      <div className="mt-auto pt-2 border-t border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-bold text-primary">
                            ${(product.sale_price || product.base_price).toFixed(0)}
                          </span>
                          <span className="text-[8px] text-success">🎖️ Vets 10%</span>
                        </div>
                        <Button 
                          size="sm"
                          className="w-full text-[10px] h-7"
                          onClick={() => {
                            addItem({
                              id: product.id,
                              productId: product.id,
                              name: product.name,
                              price: product.sale_price || product.base_price,
                              image: product.featured_image_url
                            });
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Why Shop With InVision?</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Expert-Vetted", desc: "All products reviewed by security professionals" },
              { icon: Download, title: "Instant Delivery", desc: "Digital products delivered within minutes" },
              { icon: Gift, title: "Veteran Discount", desc: "10% off for veterans & first responders" },
              { icon: TrendingUp, title: "Money-Back", desc: "60-day satisfaction guarantee" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-4 text-center hover:shadow-md transition-all">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <div className="text-center max-w-2xl mx-auto">
                <Badge className="mb-3" variant="secondary">
                  <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                  Customer Stories
                </Badge>
                <h2 className="text-2xl font-bold mb-3">
                  Join 500+ Protected Families
                </h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Our resources have helped hundreds of families prevent scams and protect their loved ones. 
                  Read their stories and see how our guides made a difference.
                </p>
                <Button asChild variant="default">
                  <Link to="/about#testimonials">
                    Read Success Stories →
                  </Link>
                </Button>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <AIImageDisclaimer />
      <Footer />
    </>
  );
}

export default Resources;