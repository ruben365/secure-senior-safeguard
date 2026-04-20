import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { sanitizeHtml } from "@/utils/sanitize";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  Users,
  Star,
  Lock,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { getBookBySlug, LIBRARY_BOOKS } from "@/data/libraryBooks";
import { CATEGORY_LABELS, type BookCategory } from "@/config/bookCatalog";
import { useAuth } from "@/contexts/AuthContext";
import { useBookPurchase } from "@/hooks/useBookPurchase";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { storeBookReaderSession } from "@/lib/bookReaderSession";

// Strip HTML tags for safe preview text
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function LibraryBookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPurchased } = useBookPurchase();

  const [expandedToc, setExpandedToc] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const book = getBookBySlug(slug ?? "");

  // ── 404 ────────────────────────────────────────────────────────────────────

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title="Book Not Found" description="The requested book was not found." noindex />
        <Navigation overlay />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-40" />
            <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the book you're looking for.
            </p>
            <Button asChild>
              <Link to="/library">Browse Library</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Derived state ──────────────────────────────────────────────────────────

  const alreadyPurchased = isPurchased(book.id);
  const firstChapter = book.chapters[0];
  const previewText = (() => {
    const raw = firstChapter ? stripHtml(firstChapter.content_html) : book.description;
    const words = raw.split(/\s+/);
    return words.length > 200 ? words.slice(0, 200).join(" ") + "…" : raw;
  })();

  const relatedBooks = LIBRARY_BOOKS.filter(
    (b) => b.slug !== book.slug && b.category === book.category
  ).slice(0, 3);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleReadNow = () => {
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
    if (user) {
      storeBookReaderSession({
        bookIds: [book.id],
        customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "Reader",
        email: user.email ?? "",
        accessType: "purchase",
      });
      setPaymentOpen(false);
      navigate("/reader");
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${book.title} | InVision Network Digital Library`}
        description={`${book.subtitle} — ${book.description}`}
        image={`https://www.invisionnetwork.org${book.cover_image}`}
        type="book"
        keywords={`${book.category} book, cybersecurity guide, ${book.title.toLowerCase()}, InVision Network`}
        canonical={`https://www.invisionnetwork.org/library/${book.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          description: book.description,
          author: { "@type": "Organization", name: "InVision Network" },
          publisher: { "@type": "Organization", name: "InVision Network" },
          numberOfPages: book.total_pages,
          offers: {
            "@type": "Offer",
            price: book.price.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `https://www.invisionnetwork.org/library/${book.slug}`,
          },
        }}
      />
      <Navigation overlay />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto py-3 max-w-6xl">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/library" className="hover:text-foreground transition-colors">Library</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{book.title}</span>
            </nav>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="container mx-auto max-w-6xl py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* ── LEFT: Cover + Purchase Box (sticky) ── */}
            <aside className="md:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Cover image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5">
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={`${book.title} book cover`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/80 to-purple-800/80 text-white text-center">
                      <BookOpen className="h-16 w-16 mb-4 opacity-80" />
                      <h2 className="text-xl font-bold leading-tight">{book.title}</h2>
                    </div>
                  )}
                  {!alreadyPurchased && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  )}
                </div>

                {/* Purchase / Access box */}
                <Card className="border-primary/20 shadow-lg">
                  <CardContent className="p-5 space-y-4">
                    {alreadyPurchased ? (
                      <>
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <CheckCircle className="h-5 w-5" />
                          You own this book
                        </div>
                        <Button className="w-full gap-2 h-11 text-base" onClick={handleReadNow}>
                          <BookOpen className="h-4 w-4" />
                          Read Now
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Opens in the in-platform reader
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-between">
                          <span className="text-3xl font-bold text-primary">
                            ${book.price.toFixed(2)}
                          </span>
                          {book.bulk_price && (
                            <span className="text-xs text-muted-foreground">
                              Bulk (5+): <strong>${book.bulk_price.toFixed(2)}/copy</strong>
                            </span>
                          )}
                        </div>

                        {user ? (
                          <>
                            <Button
                              className="w-full gap-2 text-base h-11"
                              onClick={() => setPaymentOpen(true)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Buy Now — Instant Access
                            </Button>
                            <Button variant="outline" className="w-full gap-2" asChild>
                              <Link to={`/purchase/${book.slug}`}>
                                <Users className="h-4 w-4" />
                                Bulk / Group Purchase
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button className="w-full gap-2 text-base h-11" asChild>
                              <Link to="/auth">
                                <LogIn className="h-4 w-4" />
                                Sign In to Purchase
                              </Link>
                            </Button>
                            <Button variant="outline" className="w-full gap-2" asChild>
                              <Link to="/auth?mode=signup">
                                Create Free Account
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </>
                        )}

                        <Separator />

                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {[
                            { icon: CheckCircle, text: "Instant in-platform access" },
                            { icon: Shield, text: "30-day money-back guarantee" },
                            { icon: Clock, text: "Lifetime access, no expiry" },
                            { icon: BookOpen, text: "Read on any device" },
                          ].map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-green-500 shrink-0" />
                              {text}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* ── RIGHT: Book content ── */}
            <div className="md:col-span-2 space-y-8">
              {/* Back link */}
              <Button variant="ghost" asChild className="gap-2 -ml-2 mb-2 h-8 text-sm">
                <Link to="/library">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Library
                </Link>
              </Button>

              {/* Title block */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge>{CATEGORY_LABELS[book.category as BookCategory]}</Badge>
                  <Badge variant="secondary">{book.tag}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-muted-foreground">{book.subtitle}</p>

                {/* Stars + meta */}
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1">5.0</span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    {book.total_pages} pages
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    {book.chapters.length} chapters
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {book.ideal_for}
                  </span>
                </div>
              </div>

              {/* Description */}
              <section>
                <h2 className="text-lg font-bold mb-3">About This Book</h2>
                <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              </section>

              {/* What you'll learn */}
              {book.outcomes.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold mb-3">What You'll Learn</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {book.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Excerpt */}
              <section>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Excerpt
                  <Badge variant="secondary" className="text-xs">First 200 words</Badge>
                </h2>
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="p-5">
                    {firstChapter && (
                      <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                        {firstChapter.chapter_title}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {previewText}
                    </p>
                    {!alreadyPurchased && (
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Lock className="h-3.5 w-3.5" />
                          Full content requires purchase
                        </div>
                        {user ? (
                          <Button size="sm" className="ml-auto gap-1.5 h-7 text-xs" onClick={() => setPaymentOpen(true)}>
                            <ShoppingCart className="h-3 w-3" />
                            Buy Now — ${book.price.toFixed(2)}
                          </Button>
                        ) : (
                          <Button size="sm" className="ml-auto gap-1.5 h-7 text-xs" asChild>
                            <Link to="/auth">
                              <LogIn className="h-3 w-3" />
                              Sign In to Purchase
                            </Link>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Table of contents */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold">Table of Contents</h2>
                  <button
                    onClick={() => setExpandedToc(!expandedToc)}
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    {expandedToc ? (
                      <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                    ) : (
                      <>Show all {book.chapters.length} chapters <ChevronDown className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </div>
                <div className="space-y-1">
                  {(expandedToc ? book.chapters : book.chapters.slice(0, 4)).map((chapter, idx) => (
                    <div
                      key={chapter.chapter_number}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors text-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {chapter.chapter_number}
                      </span>
                      <span className="flex-1">{chapter.chapter_title}</span>
                      {idx === 0 ? (
                        <Badge variant="secondary" className="text-[10px]">Free preview</Badge>
                      ) : (
                        !alreadyPurchased && <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                      )}
                      <span className="text-xs text-muted-foreground shrink-0">
                        p.{chapter.page_start}
                      </span>
                    </div>
                  ))}
                  {!expandedToc && book.chapters.length > 4 && (
                    <div className="text-center py-2 text-sm text-muted-foreground">
                      + {book.chapters.length - 4} more chapters
                    </div>
                  )}
                </div>
              </section>

              {/* About the Author */}
              <section className="bg-muted/30 rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-3">About the Author</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-xl font-black text-white">IN</span>
                  </div>
                  <div>
                    <p className="font-semibold">InVision Network Security Team</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Written by cybersecurity professionals with years of experience protecting
                      Ohio families and businesses from digital threats. Our team of analysts,
                      investigators, and educators translates complex security concepts into
                      practical, actionable guidance for everyday people.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ── Related Books ── */}
          {relatedBooks.length > 0 && (
            <section className="mt-16 pt-10 border-t">
              <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBooks.map((related) => (
                  <Link key={related.slug} to={`/library/${related.slug}`} className="group block">
                    <Card className="h-full flex gap-4 p-4 hover:shadow-md transition-all hover:-translate-y-0.5 border-border/60">
                      <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <img
                          src={related.cover_image}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="text-[10px] mb-1">
                          {CATEGORY_LABELS[related.category as BookCategory]}
                        </Badge>
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-primary font-bold text-sm mt-2">
                          ${related.price.toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* Payment modal */}
      <EmbeddedPaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        mode="payment"
        priceId={book.stripe_price_id}
        productName={book.title}
        amount={Math.round(book.price * 100)}
        description={book.subtitle}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
