import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, ShoppingCart, Percent, Search, CheckCircle, MessageSquarePlus } from "lucide-react";
import { BOOK_CATALOG, type BookItem } from "@/config/bookCatalog";
import { RequestBookDialog } from "./RequestBookDialog";

interface InternalLibraryProps {
  ownedBookIds: string[];
  onBuy: (book: BookItem) => void;
  onRead: (bookId: string) => void;
  email: string;
  customerName: string;
}

export function InternalLibrary({ ownedBookIds, onBuy, onRead, email, customerName }: InternalLibraryProps) {
  const [search, setSearch] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return BOOK_CATALOG;
    const q = search.toLowerCase();
    return BOOK_CATALOG.filter(
      (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q) || b.tag.toLowerCase().includes(q)
    );
  }, [search]);

  const ownedSet = useMemo(() => new Set(ownedBookIds), [ownedBookIds]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Browse Library</h2>
          <p className="text-sm text-muted-foreground">
            {BOOK_CATALOG.length} titles available • Reader members get <span className="font-semibold text-primary">5% off</span> all purchases
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" onClick={() => setRequestOpen(true)} className="shrink-0">
            <MessageSquarePlus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Suggest</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((book) => {
          const owned = ownedSet.has(book.id);
          const discountedPrice = (book.price * 0.95).toFixed(2);

          return (
            <Card key={book.id} className="overflow-hidden group relative">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                  loading="lazy"
                />
                {owned && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <Badge className="bg-primary text-primary-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Owned
                    </Badge>
                  </div>
                )}
                {!owned && (
                  <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px]">
                    <Percent className="h-2.5 w-2.5 mr-0.5" />
                    5% OFF
                  </Badge>
                )}
              </div>
              <div className="p-2.5">
                <h3 className="font-semibold text-xs line-clamp-2">{book.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{book.description}</p>

                {owned ? (
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full mt-2 text-xs h-8"
                    onClick={() => onRead(book.id)}
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Read
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] line-through text-muted-foreground">${book.price}</span>
                      <span className="text-sm font-bold text-primary">${discountedPrice}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-1.5 text-xs h-8"
                      onClick={() => onBuy(book)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy — ${discountedPrice}
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No books match your search.</p>
        </div>
      )}

      <RequestBookDialog
        open={requestOpen}
        onOpenChange={setRequestOpen}
        email={email}
        customerName={customerName}
      />
    </div>
  );
}
