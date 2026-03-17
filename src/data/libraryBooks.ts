import {
  BOOK_CATALOG,
  getBookBySlug as getCatalogBookBySlug,
  type BookChapter,
} from "@/config/bookCatalog";

export interface LibraryBook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  cover_image: string;
  total_pages: number;
  price: number;
  bulk_price: number;
  category: string;
  tag: string;
  stripe_price_id: string;
  ideal_for: string;
  outcomes: string[];
  chapters: BookChapter[];
}

export const LIBRARY_BOOKS: LibraryBook[] = BOOK_CATALOG.map((book) => ({
  id: book.id,
  slug: book.slug,
  title: book.name,
  subtitle: book.subtitle,
  description: book.longDescription,
  cover_image: book.image,
  total_pages: book.total_pages,
  price: book.price,
  bulk_price: book.bulk_price,
  category: book.category,
  tag: book.tag,
  stripe_price_id: book.stripe_price_id,
  ideal_for: book.ideal_for,
  outcomes: book.outcomes,
  chapters: book.chapters,
}));

export function getBookBySlug(slug: string): LibraryBook | undefined {
  const book = getCatalogBookBySlug(slug);

  if (!book) return undefined;

  return LIBRARY_BOOKS.find((item) => item.slug === book.slug);
}
