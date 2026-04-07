export interface BookReaderSession {
  bookIds: string[];
  customerName: string;
  email: string;
  accessType?: "purchase" | "admin";
}

export const BOOK_READER_SESSION_KEY = "bookReaderSession";

export function createAdminBookReaderSession({
  customerName,
  email,
}: {
  customerName?: string;
  email?: string;
}): BookReaderSession {
  return {
    bookIds: ["all"],
    customerName: customerName?.trim() || "Administrator",
    email: email?.trim() || "",
    accessType: "admin",
  };
}

export function storeBookReaderSession(session: BookReaderSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BOOK_READER_SESSION_KEY, JSON.stringify(session));
}

export function clearBookReaderSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BOOK_READER_SESSION_KEY);
}

export function readBookReaderSession(): BookReaderSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(BOOK_READER_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<BookReaderSession>;
    if (
      !Array.isArray(parsed.bookIds) ||
      typeof parsed.customerName !== "string" ||
      typeof parsed.email !== "string"
    ) {
      clearBookReaderSession();
      return null;
    }

    return {
      bookIds: parsed.bookIds.filter((bookId): bookId is string => typeof bookId === "string"),
      customerName: parsed.customerName,
      email: parsed.email,
      accessType:
        parsed.accessType === "admin" || parsed.accessType === "purchase"
          ? parsed.accessType
          : undefined,
    };
  } catch {
    clearBookReaderSession();
    return null;
  }
}
