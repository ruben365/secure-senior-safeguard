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
        single badge per cover, teal/indigo accents instead of all-orange.
      */}
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[820px] p-0 overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-secondary/20 border-teal-500/25 gap-0">
        <DialogTitle className="sr-only">
          {book.name} - Book Details
        </DialogTitle>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-background/85 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid lg:grid-cols-[260px,1fr] gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative bg-gradient-to-br from-teal-500/8 via-indigo-500/5 to-secondary/20 p-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[200px] shadow-[0_24px_48px_-16px_rgba(15,23,42,0.35)] rounded-lg overflow-hidden">
              <div className="aspect-[3/4]">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* SINGLE tag badge — no more "Digital Book" + tag duplication */}
              <Badge className="absolute top-2.5 right-2.5 text-[10px] px-1.5 py-0 h-[18px] bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 shadow-md">
                {book.tag}
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="p-5 md:p-6 flex flex-col min-w-0"
          >
            {/* Metadata row — compact chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant="secondary" className="text-[10px] h-[18px] px-1.5 py-0 bg-teal-500/10 text-teal-700 border-teal-500/25">
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
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[11px] font-medium">{book.author}</span>
            </div>

            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 line-clamp-3">
              {book.longDescription}
            </p>

            <div className="rounded-xl border border-border/60 bg-background/60 p-3 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-[11px] font-semibold">What this book covers</span>
              </div>
              <div className="grid gap-1.5">
                {book.outcomes.slice(0, 3).map((outcome) => (
                  <div key={outcome} className="flex items-start gap-1.5 text-[11px] text-foreground/80 leading-snug">
                    <BookOpen className="w-3 h-3 mt-0.5 text-indigo-600 shrink-0" />
                    <span className="line-clamp-2">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-1.5 mb-4 text-[11px] text-muted-foreground">
              <Users className="w-3.5 h-3.5 mt-0.5 text-teal-600 shrink-0" />
              <span>
                Ideal for <span className="text-foreground">{book.ideal_for}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
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
                className="h-9 text-xs border-teal-600/40 hover:border-teal-600 hover:bg-teal-50"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  onBuyNow(book);
                  onClose();
                }}
                className="h-9 text-xs bg-gradient-to-r from-teal-600 to-indigo-600 text-white border-0 hover:from-teal-700 hover:to-indigo-700 hover:opacity-100 shadow-[0_4px_12px_-2px_rgba(13,148,136,0.4)]"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Buy Now
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-1 mt-2">
              <Button variant="ghost" asChild className="h-8 justify-start text-[11px] text-muted-foreground hover:text-foreground">
                <Link to={`/resources/${book.slug}`} onClick={onClose}>
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
