"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { books } from "@/lib/faux-db";

export async function simulateBookMutation() {
  // Pretend we ran a DB mutation that affects book listing data.
  if (books.length > 0) {
    // Nudge the first book price slightly to visualize change
    const b = books[0];
    const delta = (Math.random() * 0.5 + 0.1);
    b.price = Math.max(0, +(b.price + delta).toFixed(2));
  }
  // Invalidate caches that used tag 'books' and refresh the listing page.
  revalidateTag("books");
  revalidatePath("/caching/books");
}

export async function simulateBookDetailMutation(bookId) {
  // Pretend a DB mutation for a specific book
  const b = books.find((x) => x.id === String(bookId));
  if (b) {
    const delta = (Math.random() * 0.5 + 0.1);
    b.price = Math.max(0, +(b.price + delta).toFixed(2));
  }
  // Invalidate the general listing and the specific book tag
  revalidateTag("books");
  revalidateTag(`book:${bookId}`);
  revalidatePath("/caching/books");
  revalidatePath(`/caching/books/${bookId}`);
}
