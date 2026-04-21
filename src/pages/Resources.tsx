import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
// AiAnalysisCTA removed during cleanup
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { CartAbandonmentNotification } from "@/components/CartAbandonmentNotification";
import { useCartFeedback } from "@/contexts/CartFeedbackContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Shield,
  ShoppingCart,
  Search,
  Star,
  Loader2,
  Zap,
  Award,
  CheckCircle,
  Gift,
  BookOpen,
  Package,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  Headphones,
  Clock,
  Lock,
  FileText,
  Video,
  Podcast,
  Globe,
  Mail } from
"lucide-react";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import BookCoverModal from "@/components/resources/BookCoverModal";
import { BOOK_CATALOG, CATEGORY_LABELS, type BookCategory } from "@/config/bookCatalog";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
// GlassmorphismBackground removed — using Business-style sections
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";
import { SectionDivider } from "@/components/pro";
import { TranslationRequestDialog } from "@/components/resources/TranslationRequestDialog";
import { ReadBooksDialog } from "@/components/resources/ReadBooksDialog";
import { HeroCTA } from "@/components/shared/HeroCTA";

// Rotating hero headlines
const heroHeadlines = [
"Your Digital Safety Arsenal",
"Premium Guides & Resources",
"Expert Security Tools",
"Guides to Protect What Matters Most"];

function Resources() {
  const { addItem, lastClearReason, hadItemsBeforeClear, itemCount } =
  useCart();
  const { toast } = useToast();
  const { triggerEmptyCartHelp } = useCartFeedback();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [embeddedPaymentOpen, setEmbeddedPaymentOpen] = useState(false);
  const [embeddedPaymentConfig, setEmbeddedPaymentConfig] = useState<{
    mode: "subscription" | "payment";
    priceId: string;
    productName: string;
    amount: number;
    description?: string;
  } | null>(null);

  // Book cover modal state
  const [selectedBook, setSelectedBook] = useState<(typeof BOOK_CATALOG)[number] | null>(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [translationDialogOpen, setTranslationDialogOpen] = useState(false);
  const [readBooksOpen, setReadBooksOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | BookCategory>("all");
  const [catalogSearch, setCatalogSearch] = useState("");

  const handleBookClick = (book: (typeof BOOK_CATALOG)[number]) => {
    setSelectedBook(book);
    setBookModalOpen(true);
  };

  const categoryTabs = useMemo(
    () => ["all", ...Array.from(new Set(BOOK_CATALOG.map((book) => book.category)))],
    [],
  );

  const featuredBooks = useMemo(
    () => BOOK_CATALOG.filter((book) => ["Best Seller", "Featured", "New"].includes(book.tag)).slice(0, 4),
    [],
  );

  const filteredBooks = useMemo(() => {
    let books = BOOK_CATALOG;

    if (activeCategory !== "all") {
      books = books.filter((book) => book.category === activeCategory);
    }

    const query = catalogSearch.trim().toLowerCase();
    if (!query) return books;

    return books.filter((book) =>
      [
        book.name,
        book.subtitle,
        book.description,
        book.longDescription,
        book.ideal_for,
        ...book.outcomes,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [activeCategory, catalogSearch]);

  // Track when cart is manually emptied to show help
  useEffect(() => {
    if (
    lastClearReason === "manual" &&
    hadItemsBeforeClear &&
    itemCount === 0)
    {
      // Delay to not interrupt user flow
      const timer = setTimeout(() => {
        triggerEmptyCartHelp();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lastClearReason, hadItemsBeforeClear, itemCount, triggerEmptyCartHelp]);

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products from database
  const {
    data: products,
    isLoading,
    error
  } = useQuery({
    queryKey: ["marketplace-products"],
    queryFn: async () => {
      const { data, error } = await supabase.
      from("products").
      select("*").
      eq("status", "active").
      order("is_featured", {
        ascending: false
      }).
      order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    }
  });
  usePrerenderBlocker(isLoading);

  // Separate physical products
  const physicalProducts =
  products?.filter((p) =>
  p.tags?.some((tag: string) =>
  ["physical", "device", "hardware", "kit", "equipment"].includes(
    tag.toLowerCase()
  )
  )
  ) || [];
  // Open the embedded payment modal for a single book purchase
  const handleBuyNow = (product: (typeof BOOK_CATALOG)[number]) => {
    setEmbeddedPaymentConfig({
      mode: "payment",
      priceId: product.stripe_price_id,
      productName: product.name,
      amount: Math.round(product.price * 100), // dollars -> cents
      description: product.subtitle,
    });
    setEmbeddedPaymentOpen(true);
  };
  const handleAddToCart = (book: (typeof BOOK_CATALOG)[number]) => {
    addItem({
      id: book.id,
      productId: book.id,
      name: book.name,
      price: book.price,
      image: book.image,
      isDigital: true,
      stripe_price_id: book.stripe_price_id,
    });
    toast({
      title: "Added to cart",
      description: `${book.name} is ready to check out.`,
    });
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resourceStructuredData = useMemo(() => {
    const toAbsoluteUrl = (url: string) => {
      if (url.startsWith("http")) return url;
      return `https://www.invisionnetwork.org${url.startsWith("/") ? url : `/${url}`}`;
    };

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Scam Protection Resource Library",
      itemListElement: BOOK_CATALOG.slice(0, 8).map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: book.name,
          description: book.description,
          image: [toAbsoluteUrl(book.image)],
          brand: {
            "@type": "Brand",
            name: "InVision Network"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: book.price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: "https://www.invisionnetwork.org/resources"
          }
        }
      }))
    };
  }, []);
  const resourcesHeroImages = PROFESSIONAL_HERO_IMAGES.resources;
  return (
    <PageTransition variant="fade">
      <SEO
        title="Cybersecurity Resources & Scam Prevention Guides"
        description="Practical scam prevention guides, digital security e-books, and emergency anti-scam scripts for Ohio families. Protect yourself and your loved ones from AI-powered threats."
        keywords="scam prevention guides, AI security e-books, cybersecurity resources Ohio, deepfake information, senior scam prevention"
        breadcrumbs={[
          { name: "Home", url: "https://www.invisionnetwork.org/" },
          { name: "Resources", url: "https://www.invisionnetwork.org/resources" },
        ]}
        structuredData={resourceStructuredData} />

      <Navigation overlay />

      {/* Hero wrapper for floating stats */}
      <div className="relative">
        <Hero
          backgroundImages={resourcesHeroImages}
          headline=""
          subheadline=""
          showScrollIndicator={true}>

          {/* Transitioning Headlines */}
          <div className="text-left mb-8">
            <h1 className="font-extrabold text-white mb-4 leading-[1.05] tracking-tight text-[clamp(2.25rem,5vw,4rem)]">
              <RotatingHeadlines headlines={heroHeadlines} className="" />
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-xl">
              Expert-curated guides and tools designed to keep you
              and your family safe
            </p>
          </div>
          <HeroCTA
            primaryText="Shop Digital Guides"
            primaryHref="/resources#shop"
            secondaryText="Read Your Books"
            secondaryHref="/library"
          />
        </Hero>

        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="hidden lg:block h-14" />
      <div className="lg:hidden h-6" />

      {/* Introduction Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Trusted Resources</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1]">
              Your One-Stop Security Shop
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Welcome to InVision Network's resource center. Here you'll find carefully curated
              <strong className="text-foreground"> e-books and digital guides</strong>
              {" "}designed to help you and your family stay safe in the digital age. Pair these with <Link to="/training" className="text-primary hover:underline font-medium">our workshops</Link> for hands-on learning, or <Link to="/contact" className="text-primary hover:underline font-medium">get help</Link> from our team.
            </p>
          </div>

          {/* AI Analysis CTA - link to training */}
          <div className="text-center pb-4">
            <Button asChild size="lg">
              <Link to="/training/ai-analysis">
                Try Our AI Scam Analysis Tool
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-10">
            {[
              { value: `${BOOK_CATALOG.length}`, label: "Digital Books", icon: BookOpen },
              { value: `${new Set(BOOK_CATALOG.map((book) => book.category)).size}`, label: "Safety Tracks", icon: Shield },
              { value: `${BOOK_CATALOG.reduce((sum, book) => sum + book.total_pages, 0)}`, label: "Library Pages", icon: Heart },
              { value: "1", label: "Unified Reader", icon: Headphones },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1 rounded-2xl bg-card border border-border/40 p-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold">Featured Shelf</h3>
                <p className="text-sm text-muted-foreground">
                  Start with the books most visitors use to build their safety baseline.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/library">Open Full Library</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredBooks.map((book) => (
                <Card key={book.id} className="stroke-glass--tight overflow-hidden border-border/50 bg-card/80">
                  <button
                    onClick={() => handleBookClick(book)}
                    className="w-full text-left"
                    aria-label={`View ${book.name} details`}
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={book.image}
                        alt={book.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </button>
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0">{book.tag}</Badge>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-[hsl(var(--coral-300))] text-[hsl(var(--coral-600))]">{CATEGORY_LABELS[book.category]}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm leading-tight line-clamp-1">{book.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-primary text-sm">${book.price.toFixed(2)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(book); }}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Cart
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 text-xs"
                        onClick={(e) => { e.stopPropagation(); handleBuyNow(book); }}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Security Guides */}
      <section id="guides" className="py-16 md:py-24 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Digital Library</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1]">
              Digital Security <span className="text-primary">Guides</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Read securely online from any device. No downloads needed.
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-background/80 p-4 md:p-5 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  className="pl-9"
                  placeholder="Search by title, topic, audience, or learning outcome"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categoryTabs.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    size="sm"
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category as "all" | BookCategory)}
                    className="capitalize"
                  >
                    {category === "all" ? "All Books" : CATEGORY_LABELS[category as BookCategory]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 text-sm text-muted-foreground flex-wrap">
              <span>
                Showing {filteredBooks.length} of {BOOK_CATALOG.length} books
              </span>
              <span>
                {activeCategory === "all" ? "Entire library" : CATEGORY_LABELS[activeCategory]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 2000px' }}>
            {filteredBooks.map((book, bookIndex) =>
              <div key={book.id} className="group relative">
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/50 to-border/20 hover:from-primary/30 hover:to-primary/10 transition-colors duration-200 shadow-sm hover:shadow-md">
                  <Card className="h-full rounded-[calc(1rem-1px)] p-3 border-0 bg-card flex flex-col relative overflow-hidden">
                    {/* Warm coral -> lavender accent bar — matches the
                        existing brand palette (no more random teal+indigo) */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--coral-500))] via-[hsl(var(--coral-400))] to-[hsl(var(--lavender-400))]" />

                    {/*
                      SINGLE compact combined pill — eBook mark + tag in
                      one tightly-structured badge. No more two scattered
                      badges on the cover.
                    */}
                    <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-sm pl-1 pr-2 py-[2px] shadow-[0_2px_6px_-1px_rgba(15,23,42,0.25)] border border-[hsl(var(--coral-200))]">
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white text-[7px] font-black">
                        📖
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[hsl(var(--coral-600))]">
                        eBook
                      </span>
                      <span className="w-px h-2.5 bg-[hsl(var(--coral-300))]" />
                      <span className="text-[8px] font-bold text-[hsl(var(--lavender-700))]">
                        {book.tag}
                      </span>
                    </div>

                    {/* Book Cover Image - Optimized */}
                    <button
                      onClick={() => handleBookClick(book)}
                      className="relative mb-3 rounded-xl overflow-hidden bg-muted/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1"
                      aria-label={`View ${book.name} details`}
                    >
                      <div className="aspect-[3/4]">
                        <img
                          src={book.image}
                          alt={book.name}
                          width={240}
                          height={320}
                          loading={bookIndex < 10 ? "eager" : "lazy"}
                          decoding={bookIndex < 10 ? "sync" : "async"}
                          fetchPriority={bookIndex < 5 ? "high" : "auto"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-150 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-card/90 text-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg border border-border/30">
                          👁️ View Details
                        </span>
                      </div>
                    </button>

                    {/* Content */}
                    <h3 className="text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {book.name}
                    </h3>

                    <p className="text-[9px] text-muted-foreground mb-1 line-clamp-2 min-h-[2rem]">
                      {book.subtitle}
                    </p>

                    <p className="text-[8px] text-muted-foreground mb-1 truncate">
                      {book.author}
                    </p>

                    <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                      {book.description}
                    </p>

                    <p className="text-[9px] text-muted-foreground mb-2">
                      {book.total_pages} pages • {book.chapters.length} chapters
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) =>
                        <Star key={i} className="w-2.5 h-2.5 fill-chart-4 text-chart-4" />
                      )}
                      <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
                    </div>

                    {/* Price and Actions — brand coral + lavender pair */}
                    <div className="mt-auto pt-2 border-t border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base md:text-lg font-black bg-gradient-to-r from-[hsl(var(--coral-600))] via-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] bg-clip-text text-transparent">
                          ${book.price}
                        </span>
                        <span className="text-[8px] text-[hsl(var(--lavender-600))] font-semibold">
                          🎖️ Vets -10%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(book)}
                          className="text-[10px] h-7 px-2 rounded-lg border-[hsl(var(--coral-300))] hover:border-[hsl(var(--coral-500))] hover:bg-[hsl(var(--coral-100))]"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Cart
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(book)}
                          className="text-[10px] h-7 px-2 rounded-lg bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0 hover:from-[hsl(var(--coral-600))] hover:to-[hsl(var(--lavender-600))] hover:opacity-100 shadow-[0_4px_12px_-2px_hsl(var(--coral-500)/0.4)]"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Buy
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-1 text-[10px] h-7"
                        asChild
                      >
                        <Link to={`/resources/${book.slug}`}>Preview & Details</Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-14">
              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No books matched that search</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try a broader keyword or switch back to all categories.
              </p>
            </div>
          )}

          {/* Bundle Info Banner */}
          <div className="mt-8 space-y-4">
              {/* Language Request Note */}
              <div className="p-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl border border-accent/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">
                    Need a Book in a Different Language?
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  We offer translations in Spanish, French, German, Chinese, and more.
                  <br className="hidden md:block" />
                  Simply request and we'll prepare your
                  copy within <strong>1-3 business days</strong>.
                </p>
                <Button variant="outline" size="sm" onClick={() => setTranslationDialogOpen(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Request Translation
                </Button>
              </div>
            </div>
        </div>
      </section>

      <SectionDivider variant="wave" color="muted" />

      {/* Why Shop With Us */}
      <section className="py-16 md:py-24 bg-muted/30 dot-grid-bg">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Trust InVision Network</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Your security education partner — backed by expertise, integrity, and a mission to protect.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Expert-Authored", desc: "All resources created by certified cybersecurity professionals" },
              { icon: Lock, title: "Secure Delivery", desc: "Protected digital reader — no downloads, no unauthorized sharing" },
              { icon: Headphones, title: "Ongoing Support", desc: "Email support and regular content updates included" },
            ].map((item) => (
              <div key={item.title} className="feature-highlight text-center">
                <div className="icon-glow-ring w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[hsl(var(--accent))]" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Abandonment Notification */}
      <CartAbandonmentNotification />

      {/* Embedded Payment Modal */}
      {embeddedPaymentConfig &&
      <EmbeddedPaymentModal
        open={embeddedPaymentOpen}
        onOpenChange={setEmbeddedPaymentOpen}
        mode={embeddedPaymentConfig.mode}
        priceId={embeddedPaymentConfig.priceId}
        productName={embeddedPaymentConfig.productName}
        amount={embeddedPaymentConfig.amount}
        description={embeddedPaymentConfig.description}
        onSuccess={() => {
          toast({
            title: "Purchase Complete!",
            description: "Check your email for your Access ID to start reading."
          });
        }} />

      }

      {/* Book Cover Modal */}
      <BookCoverModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        book={selectedBook}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow} />

      {/* Translation Request Dialog */}
      <TranslationRequestDialog
        isOpen={translationDialogOpen}
        onClose={() => setTranslationDialogOpen(false)} />

      {/* Read Books Dialog */}
      <ReadBooksDialog
        open={readBooksOpen}
        onOpenChange={setReadBooksOpen} />


      <Footer />
    </PageTransition>);

}
export default Resources;
