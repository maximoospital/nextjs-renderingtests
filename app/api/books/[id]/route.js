import { getBookById } from "@/lib/faux-db";

export const revalidate = 0; // dynamic; caller controls caching via fetch options

export async function GET(_req, { params }) {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = { serverNow: new Date().toISOString(), book };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
