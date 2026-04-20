import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Lock,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Users,
  Shield,
  ArrowRight,
  LogIn,
  Library,
  ShoppingCart,
  Clock,
  HelpCircle,
  Phone,
  Mail,
  Headphones,
} from "lucide-react";
import { LIBRARY_BOOKS } from "@/data/libraryBooks";
import { CATEGORY_LABELS, type BookCategory } from "@/config/bookCatalog";
import { useAuth } from "@/contexts/AuthContext";
import { useBookPurchase } from "@/hooks/useBookPurchase";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { storeBookReaderSession } from "@/lib/bookReaderSession";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

type LibraryTab = "browse" | "my-library";

const CATEGORIES = [
  { value: "all", label: "All Books" },
  { value: "ai", label: CATEGORY_LABELS.ai },
  { value: "scam", label: CATEGORY_LABELS.scam },
  { value: "family", label: CATEGORY_LABELS.family },
  { value: "seniors", label: CATEGORY_LABELS.seniors },
  { value: "privacy", label: CATEGORY_LABELS.privacy },
  { value: "social", label: CATEGORY_LABELS.social },
  { value: "finance", label: CATEGORY_LABELS.finance },
  { value: "business", label: CATEGORY_LABELS.business },
  { value: "tech", label: CATEGORY_LABELS.tech },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title", label: "A–Z" },
];

const FAQS = [
  {
    q: "How do I access a book after purchasing?",
    a: "After purchasing, the book is immediately available in your 'My Library' tab. Click 'Read Now' to open the in-platform reader — no downloads needed.",
  },
  {
    q: "Can I read on my phone or tablet?",
    a: "Yes. Our reader is fully responsive and works on any device — phone, tablet, or desktop. Your reading progress syncs automatically across all your devices.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 30-day money-back guarantee on all book purchases. If you're not satisfied, contact us within 30 days for a full refund — no questions asked.",
  },
  {
    q: "Do you offer group or family discounts?",
    a: "Yes! Bulk pricing starts at 5 copies and provides up to 25% off. Senior centers, libraries, businesses, and family groups all qualify. Contact us for custom pricing on 20+ copies.",
  },
  {
    q: "Can I share my purchased book with others?",
    a: "Each purchase grants access to one account. Books are protected within the platform — they cannot be downloaded or shared. For group access, see our bulk pricing options.",
  },
  {
    q: "What reading modes are available?",
    a: "Our reader offers Day, Night, and Sepia modes, plus adjustable font size. Your preferences are saved automatically so every session feels comfortable.",
  },
];

// ─── Featured books (first 4 from catalog) ──────────────────────────────────

const FEATURED_BOOKS = LIBRARY_BOOKS.slice(0, 4);

// ─── Landing Page (not logged in) ───────────────────────────────────────────

function LibraryLanding() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0808] via-[#1c0e0e] to-[#140d18] border-b pt-[clamp(100px,14vw,140px)] pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-[hsl(var(--coral-500)/0.2)] blur-3xl" />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[hsl(var(--lavender-400)/0.2)] blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative">
          <Badge className="mb-5 bg-white/10 text-white border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em]">
            <Library className="h-3.5 w-3.5 mr-2" />
            InVision Digital Library
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight text-white">
            Expert Cybersecurity Books{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--coral-400))] to-[hsl(var(--lavender-400))] bg-clip-text text-transparent">for Every Family</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            30+ premium guides on AI safety, scam prevention, digital privacy, and financial
            defense — written for real people, not IT professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2 text-base h-12 px-8 bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] border-0 text-white hover:opacity-90">
              <Link to="/auth">
                <LogIn className="h-4 w-4" />
                Sign In to Access Library
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base h-12 border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Link to="/auth?mode=signup">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-white/50 mt-4">
            Already have a book? Sign in to access your purchases.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b bg-background py-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: BookOpen, text: `${LIBRARY_BOOKS.length}+ expert titles` },
              { icon: Star, text: "5-star rated" },
              { icon: Users, text: "500+ protected families" },
              { icon: Shield, text: "30-day guarantee" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured books preview (locked) */}
      <section className="py-16 bg-muted/20 dot-grid-bg">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5 shadow-sm border border-primary/15 bg-primary/5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Browse Titles</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Featured Titles</h2>
            <p className="text-muted-foreground">Create a free account to browse the full catalog and purchase books.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {FEATURED_BOOKS.map((book) => (
              <div key={book.slug} className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/60 to-border/20 hover:from-[hsl(var(--coral-400)/0.4)] hover:to-[hsl(var(--lavender-400)/0.2)] transition-all duration-200 shadow-sm hover:shadow-md">
                <Card className="h-full overflow-hidden rounded-[calc(1rem-1px)] border-0">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--coral-500))] via-[hsl(var(--coral-400))] to-[hsl(var(--lavender-400))]" />
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-full object-cover blur-[2px] scale-105 opacity-70"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 left-2 text-xs bg-primary/90">
                      {book.tag}
                    </Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-xs leading-tight line-clamp-2 mb-1">{book.title}</h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{book.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm bg-gradient-to-r from-[hsl(var(--coral-600))] via-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] bg-clip-text text-transparent">${book.price.toFixed(2)}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {CATEGORY_LABELS[book.category as BookCategory]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild size="lg" className="gap-2">
              <Link to="/auth?mode=signup">
                <LogIn className="h-4 w-4" />
                Create Free Account to Browse All {LIBRARY_BOOKS.length} Books
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why our library */}
      <section className="py-16 bg-muted/30 dot-grid-bg border-t">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5 shadow-sm border border-primary/15 bg-primary/5">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Why Choose Us</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Why InVision Library?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Expert-Verified Content",
                desc: "Every book is written and reviewed by cybersecurity professionals with real-world experience protecting Ohio families.",
              },
              {
                icon: BookOpen,
                title: "Read Anywhere, Any Device",
                desc: "Our in-platform reader works on phones, tablets, and computers. Day, Night, and Sepia modes for comfortable reading anytime.",
              },
              {
                icon: Clock,
                title: "Always Up to Date",
                desc: "Books are updated as threats evolve. Your purchase includes all future updates at no additional cost.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-6 border-border/40 hover:border-primary/25 transition-colors bg-background/80 backdrop-blur-sm">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/8 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[hsl(var(--accent))]" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <LibraryFAQ />
    </div>
  );
}

// ─── Book Card ───────────────────────────────────────────────────────────────

interface BookCardProps {
  book: (typeof LIBRARY_BOOKS)[0];
  isPurchased: boolean;
  onBuyClick: (book: (typeof LIBRARY_BOOKS)[0]) => void;
  onReadClick: (book: (typeof LIBRARY_BOOKS)[0]) => void;
}

function BookCard({ book, isPurchased, onBuyClick, onReadClick }: BookCardProps) {
  return (
    <div className={cn(
      "h-full rounded-2xl p-[1px] transition-all duration-200 shadow-sm hover:shadow-md",
      isPurchased
        ? "bg-gradient-to-b from-green-500/30 to-green-500/10"
        : "bg-gradient-to-b from-border/50 to-border/20 hover:from-[hsl(var(--coral-400)/0.35)] hover:to-[hsl(var(--lavender-400)/0.2)]"
    )}>
    <Card className={cn(
      "h-full flex flex-col overflow-hidden rounded-[calc(1rem-1px)] border-0 transition-all duration-200 hover:-translate-y-0.5 relative"
    )}>
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--coral-500))] via-[hsl(var(--coral-400))] to-[hsl(var(--lavender-400))]" />
      {/* Cover */}
      <Link to={`/library/${book.slug}`} className="block relative aspect-[3/4] bg-muted overflow-hidden group">
        <img
          src={book.cover_image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {!isPurchased && (
          <div className="absolute top-2 right-2">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        )}
        {isPurchased && (
          <div className="absolute top-2 right-2">
            <div className="bg-green-500 rounded-full p-1.5 shadow">
              <CheckCircle className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
        )}
        <Badge className="absolute top-2 left-2 text-xs bg-primary/90 text-white">
          {book.tag}
        </Badge>
      </Link>

      {/* Content */}
      <CardContent className="p-3 flex flex-col gap-1.5 flex-1">
        <div>
          <Badge variant="secondary" className="text-[10px] capitalize mb-1.5">
            {CATEGORY_LABELS[book.category as BookCategory]}
          </Badge>
          <Link to={`/library/${book.slug}`} className="block">
            <h2 className="font-semibold text-sm leading-tight hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </h2>
          </Link>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.subtitle}</p>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">5.0</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" />
          <span>{book.total_pages} pages · {book.chapters.length} chapters</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
          {isPurchased ? (
            <>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Purchased
              </span>
              <Button size="sm" className="h-7 text-xs gap-1" onClick={() => onReadClick(book)}>
                Read Now
                <ChevronRight className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <span className="text-base font-black bg-gradient-to-r from-[hsl(var(--coral-600))] via-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] bg-clip-text text-transparent">${book.price.toFixed(2)}</span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1 text-muted-foreground"
                  asChild
                >
                  <Link to={`/library/${book.slug}`}>Preview</Link>
                </Button>
                <Button size="sm" className="h-7 text-xs gap-1 bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0 hover:opacity-90" onClick={() => onBuyClick(book)}>
                  <ShoppingCart className="h-3 w-3" />
                  Buy
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function LibraryFAQ() {
  return (
    <section className="py-16 border-t bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Have Questions?</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/50 rounded-xl px-5 data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-medium text-sm py-4 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">Still have questions? We're happy to help.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/contact">
                <Mail className="h-4 w-4" />
                Send a Message
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href="tel:+19377497579">
                <Phone className="h-4 w-4" />
                (937) 749-7579
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/help">
                <Headphones className="h-4 w-4" />
                Help Center
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Library Page ────────────────────────────────────────────────────────

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { isPurchased, purchasedBookIds, isLoading: purchaseLoading, hasAnyPurchase } = useBookPurchase();

  // UI state
  const [activeTab, setActiveTab] = useState<LibraryTab>("browse");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Payment modal state
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentBook, setPaymentBook] = useState<(typeof LIBRARY_BOOKS)[0] | null>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleBuyClick = (book: (typeof LIBRARY_BOOKS)[0]) => {
    setPaymentBook(book);
    setPaymentOpen(true);
  };

  const handleReadClick = (book: (typeof LIBRARY_BOOKS)[0]) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    storeBookReaderSession({
      bookIds: [book.id],
      customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader",
      email: user.email ?? "",
      accessType: "purchase",
    });
    navigate("/reader");
  };

  const handlePaymentSuccess = () => {
    if (paymentBook && user) {
      storeBookReaderSession({
        bookIds: [paymentBook.id],
        customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader",
        email: user.email ?? "",
        accessType: "purchase",
      });
      setPaymentOpen(false);
      navigate("/reader");
    }
  };

  // ── Filtered + sorted books ────────────────────────────────────────────────

  const browsedBooks = useMemo(() => {
    let books = LIBRARY_BOOKS.filter((book) => {
      const matchesCategory = activeCategory === "all" || book.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") books = [...books].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") books = [...books].sort((a, b) => b.price - a.price);
    else if (sortBy === "title") books = [...books].sort((a, b) => a.title.localeCompare(b.title));

    return books;
  }, [search, activeCategory, sortBy]);

  const myBooks = useMemo(
    () => LIBRARY_BOOKS.filter((b) => purchasedBookIds.includes(b.id)),
    [purchasedBookIds]
  );

  // ── Auth loading ───────────────────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation overlay />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading library…</div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Not logged in: show landing ────────────────────────────────────────────

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <SEO
          title={PAGE_SEO.library.title}
          description={PAGE_SEO.library.description}
          keywords={PAGE_SEO.library.keywords}
          canonical="https://www.invisionnetwork.org/library"
        />
        <Navigation overlay />
        <LibraryLanding />
        <Footer />
      </div>
    );
  }

  // ── Logged in: full catalog ────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={PAGE_SEO.library.title}
        description={PAGE_SEO.library.description}
        keywords={PAGE_SEO.library.keywords}
        canonical="https://www.invisionnetwork.org/library"
        structuredData={PAGE_SEO.library.structuredData}
        breadcrumbs={PAGE_SEO.library.breadcrumbs as Array<{ name: string; url: string }>}
      />
      <Navigation overlay />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* ── Page header ── */}
        <section className="bg-gradient-to-br from-[#0f0808] via-[#1c0e0e] to-[#140d18] border-b pt-[clamp(80px,12vw,120px)] pb-12">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] mb-3 border border-white/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  Digital Library
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                  InVision Network Library
                </h1>
                <p className="text-white/60 mt-2 text-base">
                  {LIBRARY_BOOKS.length} expert cybersecurity guides. Purchase once, read anywhere.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-white/70" />
                  {LIBRARY_BOOKS.length} titles
                </span>
                {hasAnyPurchase && (
                  <span className="flex items-center gap-1.5 text-green-400 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    {purchasedBookIds.length} owned
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-6 bg-white/10 rounded-xl p-1 w-fit backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("browse")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeTab === "browse"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-white/70 hover:text-white"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  Browse All
                </span>
              </button>
              <button
                onClick={() => setActiveTab("my-library")}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5",
                  activeTab === "my-library"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Library className="h-3.5 w-3.5" />
                My Library
                {purchasedBookIds.length > 0 && (
                  <Badge className="h-4 px-1.5 text-[10px] bg-primary text-primary-foreground ml-0.5">
                    {purchasedBookIds.length}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ── MY LIBRARY TAB ── */}
        {activeTab === "my-library" && (
          <section className="container mx-auto max-w-6xl py-10">
            {purchaseLoading ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="mx-auto mb-3 h-8 w-8 opacity-40 animate-pulse" />
                <p>Loading your library…</p>
              </div>
            ) : myBooks.length === 0 ? (
              <div className="text-center py-20">
                <Library className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-40" />
                <h2 className="text-xl font-semibold mb-2">Your library is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Purchase books to start reading them here. Your progress is always saved.
                </p>
                <Button onClick={() => setActiveTab("browse")} className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Browse Catalog
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {myBooks.map((book) => (
                  <BookCard
                    key={book.slug}
                    book={book}
                    isPurchased={true}
                    onBuyClick={handleBuyClick}
                    onReadClick={handleReadClick}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── BROWSE TAB ── */}
        {activeTab === "browse" && (
          <>
            {/* Filters bar */}
            <section className="border-b bg-background/80 sticky top-16 z-10 backdrop-blur-sm">
              <div className="container mx-auto max-w-6xl py-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search books…"
                      className="pl-9"
                    />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-2 scrollbar-none">
                  <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className={cn(
                        "shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors",
                        activeCategory === cat.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Book grid */}
            <section className="container mx-auto max-w-6xl py-10">
              {browsedBooks.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <BookOpen className="mx-auto mb-4 h-10 w-10 opacity-40" />
                  <p className="text-lg">No books match your search.</p>
                  <Button
                    variant="ghost"
                    className="mt-3"
                    onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {browsedBooks.length} of {LIBRARY_BOOKS.length} books
                    {activeCategory !== "all" && ` in ${CATEGORIES.find(c => c.value === activeCategory)?.label}`}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {browsedBooks.map((book) => (
                      <BookCard
                        key={book.slug}
                        book={book}
                        isPurchased={isPurchased(book.id)}
                        onBuyClick={handleBuyClick}
                        onReadClick={handleReadClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Bulk CTA */}
            <section className="bg-muted/30 dot-grid-bg border-t py-12">
              <div className="container mx-auto max-w-3xl text-center">
                <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold mb-3">Ordering for a Group or Organization?</h2>
                <p className="text-muted-foreground mb-6">
                  Bulk pricing starts at 5 copies — up to 25% off. Perfect for senior centers,
                  libraries, businesses, and family gift sets.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild size="lg">
                    <Link to="/contact">Get Bulk Pricing</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/training">View Training Programs</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* FAQ — always visible */}
        <LibraryFAQ />
      </main>

      <Footer />

      {/* Payment modal */}
      {paymentBook && (
        <EmbeddedPaymentModal
          open={paymentOpen}
          onOpenChange={(open) => {
            setPaymentOpen(open);
            if (!open) setPaymentBook(null);
          }}
          mode="payment"
          priceId={paymentBook.stripe_price_id}
          productName={paymentBook.title}
          amount={Math.round(paymentBook.price * 100)}
          description={paymentBook.subtitle}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
