import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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
  Heart,
  Zap,
  Globe,
} from "lucide-react";
import { LIBRARY_BOOKS } from "@/data/libraryBooks";
import { CATEGORY_LABELS, type BookCategory } from "@/config/bookCatalog";
import { useAuth } from "@/contexts/AuthContext";
import { useBookPurchase } from "@/hooks/useBookPurchase";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { storeBookReaderSession } from "@/lib/bookReaderSession";
import { cn } from "@/lib/utils";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { HeroCTA } from "@/components/shared/HeroCTA";
import { SectionDivider } from "@/components/pro";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";

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


const FEATURED_BOOKS = LIBRARY_BOOKS.filter((b) =>
  ["Best Seller", "Featured", "New"].includes(b.tag)
).slice(0, 4);

// ─── Hero Section (shared between landing + authenticated) ────────────────────

function LibraryHero({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="relative">
      <Hero
        backgroundImages={PROFESSIONAL_HERO_IMAGES.resources}
        headline=""
        subheadline=""
        showScrollIndicator={true}
      >
        <div className="text-left max-w-2xl">
          <h1 className="font-extrabold text-white mb-4 leading-[1.05] tracking-tight text-[clamp(2.25rem,5vw,4rem)]">
            Your Digital Safety Arsenal
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mb-5">
            Expert-curated cybersecurity guides designed to keep you and your
            family safe in the digital age
          </p>
          {isLoggedIn ? (
            <HeroCTA
              primaryText="Browse Full Catalog"
              primaryHref="#catalog"
              secondaryText="My Library"
              secondaryHref="#my-library"
              aiScan
            />
          ) : (
            <HeroCTA
              primaryText="Browse Library"
              primaryHref="#catalog"
              secondaryText="Create Free Account"
              secondaryHref="/auth?mode=signup"
              aiScan
            />
          )}
        </div>
      </Hero>
      <HeroFloatingStats />
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function LibraryStatsBar() {
  return (
    <>
      <div className="hidden lg:block h-9" />
      <div className="lg:hidden h-4" />
      <section className="py-10 md:py-16 relative overflow-hidden bg-background glass-context">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-primary/15 bg-primary/5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Trusted Resources</span>
            </span>
            <h2 className="text-3xl md:text-2xl lg:text-3xl font-black mb-5 tracking-tight leading-[1.1]">
              Your One-Stop Security Library
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Welcome to InVision Network's digital library. Here you'll find carefully curated{" "}
              <strong className="text-foreground">e-books and digital guides</strong> designed to
              help you and your family stay safe. Pair these with{" "}
              <Link to="/training" className="text-primary hover:underline font-medium">
                our workshops
              </Link>{" "}
              for hands-on learning.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: `${LIBRARY_BOOKS.length}`, label: "Digital Books", icon: BookOpen },
              { value: `${new Set(LIBRARY_BOOKS.map((b) => b.category)).size}`, label: "Safety Tracks", icon: Shield },
              { value: `${LIBRARY_BOOKS.reduce((s, b) => s + b.total_pages, 0)}`, label: "Library Pages", icon: Heart },
              { value: "1", label: "Unified Reader", icon: Headphones },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl bg-card border border-border/40 p-4 shadow-sm"
              >
                <div className="w-6 h-6 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Featured Shelf (landing: locked preview) ─────────────────────────────────

function FeaturedShelf({ onBuyClick, isPurchased, isLoggedIn, onReadClick }: {
  onBuyClick?: (book: (typeof LIBRARY_BOOKS)[0]) => void;
  isPurchased?: (id: string) => boolean;
  isLoggedIn: boolean;
  onReadClick?: (book: (typeof LIBRARY_BOOKS)[0]) => void;
}) {
  return (
    <div className="mt-2 container mx-auto pb-10">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold">Featured Shelf</h3>
          <p className="text-sm text-muted-foreground">
            Start with the books most visitors use to build their safety baseline.
          </p>
        </div>
        {isLoggedIn && (
          <Button variant="outline" asChild>
            <a href="#catalog">Browse Full Catalog</a>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURED_BOOKS.map((book) => (
          <Card key={book.id || book.slug} className="overflow-hidden border-border/50 bg-card/80">
            <Link
              to={`/library/${book.slug}`}
              className="block"
              aria-label={`View ${book.title} details`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
                    !isLoggedIn && "blur-[2px] scale-105 opacity-70"
                  )}
                  loading="lazy"
                />
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                    <div className="bg-background/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <Lock className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Badge className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0">
                  {book.tag}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 border-[hsl(var(--coral-300))] text-[hsl(var(--coral-600))]"
                >
                  {CATEGORY_LABELS[book.category as BookCategory]}
                </Badge>
              </div>
              <h4 className="font-semibold text-sm leading-tight line-clamp-1">{book.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{book.subtitle}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-primary text-sm">${book.price.toFixed(2)}</span>
              </div>
              {isLoggedIn && onBuyClick && isPurchased ? (
                isPurchased(book.id || book.slug) ? (
                  <Button
                    size="sm"
                    className="w-full mt-2 h-5 text-xs"
                    onClick={() => onReadClick?.(book)}
                  >
                    <ChevronRight className="w-3 h-3 mr-1" />
                    Read Now
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full mt-2 h-5 text-xs bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0"
                    onClick={() => onBuyClick(book)}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Buy Now
                  </Button>
                )
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      {!isLoggedIn && (
        <div className="text-center mt-5">
          <Button asChild size="lg" className="gap-2">
            <Link to="/auth?mode=signup">
              <LogIn className="h-4 w-4" />
              Create Free Account to Browse All {LIBRARY_BOOKS.length} Books
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Why Trust Section ────────────────────────────────────────────────────────

function WhyTrustSection() {
  return (
    <section className="py-10 md:py-16 bg-muted/30 dot-grid-bg">
      <div className="container mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Trust InVision Network</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your security education partner — backed by expertise, integrity, and a mission to protect.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Expert-Authored",
              desc: "All resources created by certified cybersecurity professionals",
            },
            {
              icon: Lock,
              title: "Secure Delivery",
              desc: "Protected digital reader — no downloads, no unauthorized sharing",
            },
            {
              icon: Headphones,
              title: "Ongoing Support",
              desc: "Email support and regular content updates included",
            },
          ].map((item) => (
            <div key={item.title} className="feature-highlight text-center">
              <div className="icon-glow-ring w-9 h-9 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--accent)/0.08)] flex items-center justify-center">
                <item.icon className="w-4 h-4 text-[hsl(var(--accent))]" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Full Catalog (authenticated only) ───────────────────────────────────────

interface CatalogProps {
  books: (typeof LIBRARY_BOOKS);
  isPurchased: (id: string) => boolean;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  onBuyClick: (book: (typeof LIBRARY_BOOKS)[0]) => void;
  onReadClick: (book: (typeof LIBRARY_BOOKS)[0]) => void;
}

function FullCatalog({
  books,
  isPurchased,
  activeCategory,
  setActiveCategory,
  search,
  setSearch,
  sortBy,
  setSortBy,
  onBuyClick,
  onReadClick,
}: CatalogProps) {
  return (
    <section id="catalog" className="py-10 md:py-16 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-primary/15 bg-primary/5">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">Digital Library</span>
          </span>
          <h2 className="text-3xl md:text-2xl lg:text-3xl font-black mb-5 tracking-tight leading-[1.1]">
            Digital Security <span className="text-primary">Guides</span>
          </h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Read securely online from any device. No downloads needed.
          </p>
        </div>

        {/* Search + filters bar */}
        <div className="rounded-2xl border border-border/50 bg-background/80 p-4 md:p-5 mb-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-6"
                placeholder="Search by title, topic, audience, or learning outcome"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-6 rounded-md border border-input bg-background px-3 text-sm text-foreground"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <Button
                    key={cat.value}
                    type="button"
                    size="sm"
                    variant={activeCategory === cat.value ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat.value)}
                    className="capitalize"
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 text-sm text-muted-foreground flex-wrap">
            <span>Showing {books.length} of {LIBRARY_BOOKS.length} books</span>
            <span>
              {activeCategory === "all"
                ? "Entire library"
                : CATEGORIES.find((c) => c.value === activeCategory)?.label}
            </span>
          </div>
        </div>

        {/* Book grid — 5-column compact, Resources-style */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          style={{ contentVisibility: "auto", containIntrinsicSize: "0 2000px" }}
        >
          {books.map((book, bookIndex) => {
            const owned = isPurchased(book.id || book.slug);
            return (
              <div key={book.id || book.slug} className="group relative">
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/50 to-border/20 hover:from-primary/30 hover:to-primary/10 transition-colors duration-200 shadow-sm hover:shadow-md">
                  <Card className="h-full rounded-[calc(1rem-1px)] p-3 border-0 bg-card flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--coral-500))] via-[hsl(var(--coral-400))] to-[hsl(var(--lavender-400))]" />

                    {/* Badge pill */}
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

                    {/* Owned badge */}
                    {owned && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-green-500 rounded-full p-1 shadow">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Cover */}
                    <Link
                      to={`/library/${book.slug}`}
                      className="relative mb-3 rounded-xl overflow-hidden bg-muted/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 block"
                      aria-label={`View ${book.title} details`}
                    >
                      <div className="aspect-[3/4]">
                        <img
                          src={book.cover_image}
                          alt={book.title}
                          width={240}
                          height={320}
                          loading={bookIndex < 10 ? "eager" : "lazy"}
                          decoding={bookIndex < 10 ? "sync" : "async"}
                          fetchpriority={bookIndex < 5 ? "high" : "auto"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-150 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-card/90 text-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg border border-border/30">
                          👁️ View Details
                        </span>
                      </div>
                    </Link>

                    {/* Content */}
                    <h3 className="text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-[9px] text-muted-foreground mb-1 line-clamp-2 min-h-[2rem]">
                      {book.subtitle}
                    </p>
                    <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                      {book.description}
                    </p>
                    <p className="text-[9px] text-muted-foreground mb-2">
                      {book.total_pages} pages • {book.chapters.length} chapters
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-chart-4 text-chart-4" />
                      ))}
                      <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-2 border-t border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base md:text-lg font-black bg-gradient-to-r from-[hsl(var(--coral-600))] via-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] bg-clip-text text-transparent">
                          ${book.price.toFixed(2)}
                        </span>
                        {owned && (
                          <span className="text-[9px] text-green-600 font-semibold flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5" /> Owned
                          </span>
                        )}
                      </div>
                      {owned ? (
                        <Button
                          size="sm"
                          className="w-full text-[10px] h-4 px-2 rounded-lg"
                          onClick={() => onReadClick(book)}
                        >
                          <ChevronRight className="w-3 h-3 mr-1" />
                          Read Now
                        </Button>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 gap-1.5">
                            <Button
                              size="sm"
                              onClick={() => onBuyClick(book)}
                              className="text-[10px] h-4 px-2 rounded-lg bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0 hover:from-[hsl(var(--coral-600))] hover:to-[hsl(var(--lavender-600))] shadow-[0_4px_12px_-2px_hsl(var(--coral-500)/0.4)]"
                            >
                              <Zap className="w-3 h-3 mr-1" />
                              Buy Now
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full mt-1 text-[10px] h-4"
                            asChild
                          >
                            <Link to={`/library/${book.slug}`}>Preview & Details</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {books.length === 0 && (
          <div className="text-center py-9">
            <BookOpen className="w-6 h-6 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No books matched that search</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Try a broader keyword or switch back to all categories.
            </p>
          </div>
        )}

        {/* Language request banner */}
        <div className="mt-5">
          <div className="p-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl border border-accent/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-accent" />
              <span className="font-semibold text-sm">Need a Book in a Different Language?</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              We offer translations in Spanish, French, German, Chinese, and more.
              <br className="hidden md:block" />
              Simply request and we'll prepare your copy within{" "}
              <strong>1-3 business days</strong>.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Request Translation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── My Library Tab ───────────────────────────────────────────────────────────

function MyLibraryTab({
  books,
  isLoading,
  onBuyClick,
  onReadClick,
  onBrowse,
}: {
  books: (typeof LIBRARY_BOOKS);
  isLoading: boolean;
  onBuyClick: (b: (typeof LIBRARY_BOOKS)[0]) => void;
  onReadClick: (b: (typeof LIBRARY_BOOKS)[0]) => void;
  onBrowse: () => void;
}) {
  if (isLoading) {
    return (
      <section className="container mx-auto py-10 text-center text-muted-foreground">
        <BookOpen className="mx-auto mb-3 h-5 w-5 opacity-40 animate-pulse" />
        <p>Loading your library…</p>
      </section>
    );
  }

  if (books.length === 0) {
    return (
      <section className="container mx-auto py-12 text-center">
        <Library className="mx-auto mb-4 h-7 w-7 text-muted-foreground opacity-40" />
        <h2 className="text-xl font-semibold mb-2">Your library is empty</h2>
        <p className="text-muted-foreground mb-4">
          Purchase books to start reading them here. Your progress is always saved.
        </p>
        <Button onClick={onBrowse} className="gap-2">
          <BookOpen className="h-4 w-4" />
          Browse Catalog
        </Button>
      </section>
    );
  }

  return (
    <section
      className="py-10 md:py-16 bg-muted/20 relative overflow-hidden"
      id="my-library"
    >
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-primary/15 bg-primary/5">
            <Library className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">My Library</span>
          </span>
          <h2 className="text-3xl md:text-2xl font-black mb-3 tracking-tight">Your Books</h2>
          <p className="text-muted-foreground">{books.length} book{books.length !== 1 ? "s" : ""} purchased</p>
        </div>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
          style={{ contentVisibility: "auto", containIntrinsicSize: "0 1000px" }}
        >
          {books.map((book, bookIndex) => (
            <div key={book.id || book.slug} className="group relative">
              <div className="h-full rounded-2xl p-[1px] bg-gradient-to-b from-green-500/40 to-green-500/10 shadow-sm hover:shadow-md transition-shadow">
                <Card className="h-full rounded-[calc(1rem-1px)] p-3 border-0 bg-card flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500" />
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-green-500 rounded-full p-1 shadow">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <Link
                    to={`/library/${book.slug}`}
                    className="relative mb-3 rounded-xl overflow-hidden bg-muted/30 block"
                    aria-label={`View ${book.title}`}
                  >
                    <div className="aspect-[3/4]">
                      <img
                        src={book.cover_image}
                        alt={book.title}
                        width={240}
                        height={320}
                        loading={bookIndex < 10 ? "eager" : "lazy"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <h3 className="text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-[9px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                    {book.subtitle}
                  </p>
                  <div className="mt-auto pt-2 border-t border-border/30">
                    <Button
                      size="sm"
                      className="w-full text-[10px] h-4 px-2 rounded-lg"
                      onClick={() => onReadClick(book)}
                    >
                      <ChevronRight className="w-3 h-3 mr-1" />
                      Read Now
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function LibraryFAQ() {
  return (
    <section className="py-10 border-t bg-background glass-faq">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-6">
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

        <div className="mt-6 text-center">
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

  const [activeTab, setActiveTab] = useState<LibraryTab>("browse");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentBook, setPaymentBook] = useState<(typeof LIBRARY_BOOKS)[0] | null>(null);

  // Activate "My Library" tab when the hero CTA anchor #my-library is clicked
  useEffect(() => {
    if (!user) return;
    const handleHash = () => {
      if (window.location.hash === "#my-library") {
        setActiveTab("my-library");
        setTimeout(() => {
          document.getElementById("my-library")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [user]);

  const handleBuyClick = (book: (typeof LIBRARY_BOOKS)[0]) => {
    setPaymentBook(book);
    setPaymentOpen(true);
  };

  const handleReadClick = (book: (typeof LIBRARY_BOOKS)[0]) => {
    if (!user) { navigate("/auth"); return; }
    storeBookReaderSession({
      bookIds: [book.id || book.slug],
      customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader",
      email: user.email ?? "",
      accessType: "purchase",
    });
    navigate("/reader");
  };

  const handlePaymentSuccess = () => {
    if (paymentBook && user) {
      storeBookReaderSession({
        bookIds: [paymentBook.id || paymentBook.slug],
        customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader",
        email: user.email ?? "",
        accessType: "purchase",
      });
      setPaymentOpen(false);
      navigate("/reader");
    }
  };

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
    () => LIBRARY_BOOKS.filter((b) => purchasedBookIds.includes(b.id || b.slug)),
    [purchasedBookIds]
  );

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

  const seoBlock = (
    <SEO
      title={PAGE_SEO.library.title}
      description={PAGE_SEO.library.description}
      keywords={PAGE_SEO.library.keywords}
      canonical="https://www.invisionnetwork.org/library"
      structuredData={PAGE_SEO.library.structuredData}
      breadcrumbs={[...PAGE_SEO.library.breadcrumbs]}
    />
  );

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {seoBlock}
        <Navigation overlay />
        <LibraryHero isLoggedIn={false} />
        <LibraryStatsBar />
        <section className="bg-background border-b pb-6">
          <div className="container mx-auto max-w-6xl">
            <FeaturedShelf isLoggedIn={false} />
          </div>
        </section>
        <SectionDivider variant="wave" color="muted" />
        <WhyTrustSection />
        <LibraryFAQ />
        <Footer />
      </div>
    );
  }

  // ── Logged in ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {seoBlock}
      <Navigation overlay />

      <LibraryHero isLoggedIn={true} />

      <LibraryStatsBar />

      {/* Featured shelf */}
      <section className="bg-background border-b pb-6">
        <div className="container mx-auto max-w-6xl">
          <FeaturedShelf
            isLoggedIn={true}
            onBuyClick={handleBuyClick}
            isPurchased={(id) => isPurchased(id)}
            onReadClick={handleReadClick}
          />
        </div>
      </section>

      <SectionDivider variant="wave" color="muted" />

      {/* Tab switcher */}
      <section className="bg-background border-b sticky top-10 z-10 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl py-3">
          <div className="flex gap-1 bg-muted/50 rounded-xl p-1 w-fit">
            <button
              onClick={() => setActiveTab("browse")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === "browse"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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

      {/* Tab content */}
      {activeTab === "my-library" ? (
        <MyLibraryTab
          books={myBooks}
          isLoading={purchaseLoading}
          onBuyClick={handleBuyClick}
          onReadClick={handleReadClick}
          onBrowse={() => setActiveTab("browse")}
        />
      ) : (
        <FullCatalog
          books={browsedBooks}
          isPurchased={(id) => isPurchased(id)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onBuyClick={handleBuyClick}
          onReadClick={handleReadClick}
        />
      )}

      {/* Bulk CTA */}
      <section className="bg-[#fff8f5] border-t py-7">
        <div className="container mx-auto max-w-3xl text-center">
          <Users className="mx-auto mb-4 h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold mb-3">Ordering for a Group or Organization?</h2>
          <p className="text-muted-foreground mb-4">
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

      <SectionDivider variant="wave" color="muted" />
      <WhyTrustSection />
      <LibraryFAQ />
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
