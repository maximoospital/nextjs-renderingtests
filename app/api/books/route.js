import { getAllBooks } from "@/lib/faux-db";

export const revalidate = 0; // Route handler itself is dynamic; cache is controlled by the caller fetch

export async function GET() {
  const data = await getAllBooks();
  // Attach a server timestamp to help observe dedupe/streaming visually
  const body = { serverNow: new Date().toISOString(), books: data };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

