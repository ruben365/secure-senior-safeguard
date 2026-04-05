import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { sanitizeHtml } from "@/utils/sanitize";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Lock, LogOut, Library, Link2, Clock, Bookmark } from "lucide-react";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import { ReadingModeToggle, MODE_CLASSES, CARD_CLASSES, FONT_SIZE_CLASSES } from "@/components/reader/ReadingModeToggle";
import type { ReadingMode, FontSize } from "@/components/reader/ReadingModeToggle";
import { InternalLibrary } from "@/components/reader/InternalLibrary";
import { BookRecommendations } from "@/components/reader/BookRecommendations";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { BOOK_CATALOG, getBookById, type BookItem } from "@/config/bookCatalog";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  clearBookReaderSession,
  createAdminBookReaderSession,
  readBookReaderSession,
  storeBookReaderSession,
  type BookReaderSession,
} from "@/lib/bookReaderSession";

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BookReader() {
  const navigate = useNavigate();
  const { toast: toastHook } = useToast();
  const { user, adminName, adminEmail, isAdmin, loading: authLoading, initialized } = useAuth();
  const [session, setSession] = useState<BookReaderSession | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [activeTab, setActiveTab] = useState("my-books");

  // Reading preferences
  const [readingMode, setReadingMode] = useState<ReadingMode>(() => {
    return (localStorage.getItem("readingMode") as ReadingMode) || "day";
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem("readerFontSize") as FontSize) || "md";
  });
  const [bookmarkedChapter, setBookmarkedChapter] = useState<Record<string, number>>({});

  // Persist reading preferences
  useEffect(() => { localStorage.setItem("readingMode", readingMode); }, [readingMode]);
  useEffect(() => { localStorage.setItem("readerFontSize", fontSize); }, [fontSize]);

  // Load bookmarks from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("readerBookmarks");
      if (saved) setBookmarkedChapter(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const saveBookmark = useCallback((bookId: string, chapter: number) => {
    setBookmarkedChapter(prev => {
      const next = { ...prev, [bookId]: chapter };
      sessionStorage.setItem("readerBookmarks", JSON.stringify(next));
      return next;
    });
    toast.success("Bookmark saved!");
  }, []);

  useEffect(() => {
    if (!initialized || authLoading) return;

    // TRIAL MODE: Auto-grant universal access to all books
    const storedSession = readBookReaderSession();
    if (storedSession) {
      setSession(storedSession);
      return;
    }

    // Create a universal trial session
    const trialSession: BookReaderSession = {
      customerName: user ? (adminName || user.email || "Trial User") : "Trial User",
      email: user?.email || "trial@invisionnetwork.org",
      bookIds: ["all"],
      accessType: "admin",
    };
    storeBookReaderSession(trialSession);
    setSession(trialSession);
  }, [adminEmail, adminName, authLoading, initialized, isAdmin, navigate, session, toastHook, user]);

  // Scroll to top on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentChapter, selectedBook]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => { e.preventDefault(); }, []);

  const handleLogout = () => {
    clearBookReaderSession();
    sessionStorage.removeItem("readerBookmarks");
    navigate("/resources");
  };

  const handleShareLink = () => {
    if (!session) return;
    const raw = readBookReaderSession();
    if (!raw) return;
    // We don't expose the access ID in URLs for security — instead share the reader URL
    const url = `${window.location.origin}/reader`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Reader link copied! Share it and use your Access ID to log in from any device.");
    }).catch(() => {
      toast.info("Reader URL: " + url);
    });
  };

  const handleBuyFromLibrary = (book: BookItem) => {
    // Navigate to resources page with the book pre-selected for purchase
    navigate("/resources");
    toast.info(`Visit Resources to purchase "${book.name}" — use your reader account for 5% off!`);
  };

  const handleReadFromLibrary = (bookId: string) => {
    const bookData = getBookById(bookId);
    if (bookData) {
      const savedChapter = bookmarkedChapter[bookId] ?? 0;
      setSelectedBook(bookData);
      setCurrentChapter(savedChapter);
      setActiveTab("my-books");
    }
  };

  if (!session) return null;

  const hasAllAccess = session.bookIds.includes("all");
  const availableBooks = hasAllAccess
    ? BOOK_CATALOG
    : session.bookIds
        .map((id) => getBookById(id))
        .filter((book): book is BookItem => book !== undefined);

  const effectiveOwnedIds = hasAllAccess
    ? BOOK_CATALOG.map((b) => b.id)
    : session.bookIds;

  // Dashboard view (no book selected)
  if (!selectedBook) {
    return (
      <>
        <SEO title="Book Reader — InVision Network" description="Read your purchased books securely online." />
        <Navigation />
        <div className={cn("min-h-screen pt-24 pb-16 transition-colors duration-300", MODE_CLASSES[readingMode])}>
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">
                  {session.accessType === "admin" ? "Admin Library" : "Your Library"}
                </h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="text-muted-foreground">
                  Welcome back, <span className="font-medium">{session.customerName}</span>!
                  </p>
                  {session.accessType === "admin" && (
                    <Badge variant="secondary">Full catalog access</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ReadingModeToggle
                  mode={readingMode}
                  onModeChange={setReadingMode}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                />
                <Button variant="ghost" size="sm" onClick={handleShareLink} title="Share reader link">
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Tabs: My Books / Browse Library */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="my-books" className="gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  My Books ({availableBooks.length})
                </TabsTrigger>
                <TabsTrigger value="library" className="gap-1.5">
                  <Library className="h-4 w-4" />
                  Browse Library
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-books">
                {availableBooks.length === 0 ? (
                  <Card className={cn("p-12 text-center", CARD_CLASSES[readingMode])}>
                    <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No books found for this purchase.</p>
                    <p className="text-muted-foreground mt-2">Please contact support if you believe this is an error.</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {availableBooks.map((book) => {
                      const bookmark = bookmarkedChapter[book.id];
                      return (
                        <Card
                          key={book.id}
                          className={cn(
                            "group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200",
                            CARD_CLASSES[readingMode]
                          )}
                          onClick={() => {
                            setSelectedBook(book);
                            setCurrentChapter(bookmark ?? 0);
                          }}
                        >
                          <div className="aspect-[3/4] overflow-hidden relative">
                            <img
                              src={book.image}
                              alt={book.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              draggable={false}
                            />
                            {bookmark !== undefined && (
                              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px]">
                                <Bookmark className="h-2.5 w-2.5 mr-0.5" />
                                Ch. {bookmark + 1}
                              </Badge>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-semibold text-sm line-clamp-2">{book.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{book.chapters.length} chapters</p>
                            <Button size="sm" className="w-full mt-2" variant="outline">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {bookmark !== undefined ? "Continue Reading" : "Read"}
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {/* Recommendations */}
                <BookRecommendations
                  ownedBookIds={effectiveOwnedIds}
                  onBuy={handleBuyFromLibrary}
                />
              </TabsContent>

              <TabsContent value="library">
                <InternalLibrary
                  ownedBookIds={effectiveOwnedIds}
                  onBuy={handleBuyFromLibrary}
                  onRead={handleReadFromLibrary}
                  email={session.email}
                  customerName={session.customerName}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Reader view — secure, no-print, no-copy
  const chapter = selectedBook.chapters[currentChapter];
  const readingTime = estimateReadingTime(stripHtml(chapter.content_html));

  return (
    <>
      <SEO title={`${selectedBook.name} — InVision Network Reader`} description="Secure book reader." />
      <ReadingProgressBar showPercentage />
      {/* Print blocker */}
      <style>{`
        @media print {
          body * { display: none !important; visibility: hidden !important; }
          body::after { content: "Printing is not allowed for this content."; display: block; font-size: 24px; text-align: center; padding: 100px; }
        }
        .secure-reader {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
      <Navigation />
      <div
        className={cn("secure-reader min-h-screen pt-24 pb-16 transition-colors duration-300", MODE_CLASSES[readingMode])}
        onContextMenu={handleContextMenu}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Reader Header */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedBook(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Library
            </Button>
            <div className="flex-1 text-center min-w-0">
              <h2 className="font-semibold text-sm md:text-base truncate">{selectedBook.name}</h2>
              <p className="text-xs text-muted-foreground">
                Chapter {currentChapter + 1} of {selectedBook.chapters.length}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <ReadingModeToggle
                mode={readingMode}
                onModeChange={setReadingMode}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => saveBookmark(selectedBook.id, currentChapter)}
                title="Bookmark this chapter"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chapter Navigation Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {selectedBook.chapters.map((ch, i) => (
              <Button
                key={i}
                variant={i === currentChapter ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentChapter(i)}
                className="whitespace-nowrap text-xs"
              >
                Ch. {i + 1}
              </Button>
            ))}
          </div>

          {/* Reading time estimate */}
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>~{readingTime} min read</span>
            {bookmarkedChapter[selectedBook.id] === currentChapter && (
              <Badge variant="outline" className="text-[10px]">
                <Bookmark className="h-2.5 w-2.5 mr-0.5" />
                Bookmarked
              </Badge>
            )}
          </div>

          {/* Reader Content */}
          <Card className={cn("p-6 md:p-10 min-h-[60vh]", CARD_CLASSES[readingMode])}>
            <div className="flex items-center gap-2 mb-2 opacity-50">
              <Lock className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Protected Content — InVision Network</span>
            </div>
            <h3 className="text-2xl font-bold mb-6">{chapter.chapter_title}</h3>
            <div
              className={cn(
                "prose max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-6 [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
                FONT_SIZE_CLASSES[fontSize],
              )}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(chapter.content_html) }}
            />
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                © InVision Network • Department of Literature • All Rights Reserved
              </p>
            </div>
          </Card>

          {/* Chapter Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              disabled={currentChapter === 0}
              onClick={() => setCurrentChapter((c) => c - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentChapter === selectedBook.chapters.length - 1}
              onClick={() => setCurrentChapter((c) => c + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
