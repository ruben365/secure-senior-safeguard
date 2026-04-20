import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Zap,
  X,
  Building2,
  BookOpen,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORY_LABELS, type BookItem } from "@/config/bookCatalog";

interface BookCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: BookItem | null;
  onAddToCart: (book: BookItem) => void;
  onBuyNow: (book: BookItem) => void;
}

const BookCoverModal = ({
  isOpen,
  onClose,
  book,
  onAddToCart,
  onBuyNow,
}: BookCoverModalProps) => {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/*
        Compact: max-w-4xl -> 820px, overflow-hidden, tighter grid,
        single combined eBook+tag pill, coral+lavender brand accents.
      */}
      {/*
        Book detail modal — refined compact panel.
        820px -> 640px, tighter cover column, smaller body padding.
      */}
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[640px] p-0 overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-[hsl(var(--coral-100))] border-[hsl(var(--coral-200))] gap-0">
        <DialogTitle className="sr-only">
          {book.name} - Book Details
        </DialogTitle>

        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-50 w-7 h-7 rounded-full bg-background/85 backdrop-blur-sm hover:bg-background flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="grid lg:grid-cols-[200px,1fr] gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative bg-gradient-to-br from-[hsl(var(--coral-100))] via-[hsl(var(--lavender-100))] to-[hsl(var(--coral-200))] p-4 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[160px] shadow-[0_20px_40px_-14px_rgba(15,23,42,0.35)] rounded-lg overflow-hidden">
              <div className="aspect-[3/4]">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/*
                SINGLE compact combined pill — eBook mark + tag in
                one tightly-structured badge. Matches the grid cards.
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="p-4 md:p-5 flex flex-col min-w-0"
          >
            {/* Metadata row — compact chips, coral brand palette */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant="secondary" className="text-[10px] h-[18px] px-1.5 py-0 bg-[hsl(var(--coral-100))] text-[hsl(var(--coral-600))] border-[hsl(var(--coral-200))]">
                {CATEGORY_LABELS[book.category]}
              </Badge>
              <Badge variant="outline" className="text-[10px] h-[18px] px-1.5 py-0">
                {book.total_pages} pages
              </Badge>
              <Badge variant="outline" className="text-[10px] h-[18px] px-1.5 py-0">
                {book.chapters.length} chapters
              </Badge>
            </div>

            <h2 className="text-lg md:text-xl font-bold mb-1 leading-tight tracking-tight">
              {book.name}
            </h2>
            <p className="text-xs text-muted-foreground mb-3 leading-snug">
              {book.subtitle}
            </p>

            <div className="flex items-center gap-1.5 mb-3 text-muted-foreground">
              <Building2 className="w-3.5 h-3.5 text-[hsl(var(--coral-500))]" />
              <span className="text-[11px] font-medium">{book.author}</span>
            </div>

            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {book.longDescription}
            </p>

            <div className="rounded-xl border border-border/60 bg-background/60 p-3 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--coral-500))]" />
                <span className="text-[11px] font-semibold">What this book covers</span>
              </div>
              <div className="grid gap-1.5">
                {book.outcomes.slice(0, 3).map((outcome) => (
                  <div key={outcome} className="flex items-start gap-1.5 text-[11px] text-foreground/80 leading-snug">
                    <BookOpen className="w-3 h-3 mt-0.5 text-[hsl(var(--lavender-500))] shrink-0" />
                    <span className="line-clamp-2">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-1.5 mb-4 text-[11px] text-muted-foreground">
              <Users className="w-3.5 h-3.5 mt-0.5 text-[hsl(var(--coral-500))] shrink-0" />
              <span>
                Ideal for <span className="text-foreground">{book.ideal_for}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black bg-gradient-to-r from-[hsl(var(--coral-600))] via-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] bg-clip-text text-transparent">
                ${book.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Bulk from ${book.bulk_price.toFixed(2)}/copy
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="h-9 text-xs border-[hsl(var(--coral-300))] hover:border-[hsl(var(--coral-500))] hover:bg-[hsl(var(--coral-100))]"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  onBuyNow(book);
                  onClose();
                }}
                className="h-9 text-xs bg-gradient-to-r from-[hsl(var(--coral-500))] to-[hsl(var(--lavender-500))] text-white border-0 hover:from-[hsl(var(--coral-600))] hover:to-[hsl(var(--lavender-600))] hover:opacity-100 shadow-[0_4px_12px_-2px_hsl(var(--coral-500)/0.45)]"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Buy Now
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-1 mt-2">
              <Button variant="ghost" asChild className="h-8 justify-start text-[11px] text-muted-foreground hover:text-foreground">
                <Link to={`/library/${book.slug}`} onClick={onClose}>
                  View full preview
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
              <Button variant="ghost" asChild className="h-8 justify-start text-[11px] text-muted-foreground hover:text-foreground">
                <Link to={`/purchase/${book.slug}`} onClick={onClose}>
                  Bulk / group orders
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookCoverModal;
