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
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-gradient-to-br from-card via-card to-secondary/20 border-primary/20">
        <DialogTitle className="sr-only">
          {book.name} - Book Details
        </DialogTitle>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-[320px,1fr] gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative bg-gradient-to-br from-secondary/60 to-secondary/30 p-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[240px] shadow-2xl rounded-xl overflow-hidden">
              <div className="aspect-[3/4]">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute top-3 left-3 text-xs px-2 py-0.5 bg-primary/95 text-primary-foreground shadow-lg">
                Digital Book
              </Badge>
              <Badge className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-background/90 text-foreground shadow-lg">
                {book.tag}
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="p-6 md:p-8 flex flex-col"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{CATEGORY_LABELS[book.category]}</Badge>
              <Badge variant="outline">{book.total_pages} pages</Badge>
              <Badge variant="outline">{book.chapters.length} chapters</Badge>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
              {book.name}
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              {book.subtitle}
            </p>

            <div className="flex items-center gap-1.5 mb-4 text-muted-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{book.author}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {book.longDescription}
            </p>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-4 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">What This Book Covers</span>
              </div>
              <div className="grid gap-2">
                {book.outcomes.slice(0, 4).map((outcome) => (
                  <div key={outcome} className="flex items-start gap-2 text-sm text-foreground/85">
                    <BookOpen className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 mb-5 text-sm text-muted-foreground">
              <Users className="w-4 h-4 mt-0.5 text-primary shrink-0" />
              <span>
                Ideal for <span className="text-foreground">{book.ideal_for}</span>
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                ${book.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                Bulk from ${book.bulk_price.toFixed(2)} per copy
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onAddToCart(book);
                  onClose();
                }}
                className="h-11"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  onBuyNow(book);
                  onClose();
                }}
                className="h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-2 mt-2">
              <Button variant="ghost" asChild className="justify-start">
                <Link to={`/resources/${book.slug}`} onClick={onClose}>
                  View Full Preview
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link to={`/purchase/${book.slug}`} onClick={onClose}>
                  Bulk / Group Orders
                  <ArrowRight className="w-4 h-4 ml-2" />
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
