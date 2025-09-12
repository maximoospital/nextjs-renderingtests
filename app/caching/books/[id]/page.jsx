import Link from "next/link";
import Image from "next/image";
import CartBadge from "@/components/cart-badge";
import { Suspense } from "react";
import { simulateBookDetailMutation } from "../actions";
import ActionForm from "@/components/action-form";
import { addToCart } from "../../cart/actions";
import { headers } from "next/headers";

export const metadata = {
  title: "Book Detail",
  description: "Server component detail with 5m revalidate",
};

async function fetchBook(id) {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/books/${id}`, {
    // Server Cache: 5 minutes per book, also tag per-book for fine-grained invalidation
    next: { revalidate: 300, tags: ["books", `book:${id}`] },
  });
  if (!res.ok) throw new Error("Failed to load book");
  return res.json();
}

async function BookHeader({ id }) {
  const { book, serverNow } = await fetchBook(id);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{book.title}</div>
      <div style={{ color: "#666" }}>{book.author}</div>
      <div style={{ fontWeight: 600 }}>${book.price.toFixed(2)}</div>
      <div style={{ fontSize: 12, color: "#666" }}>Server responded at {new Date(serverNow).toLocaleTimeString()}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {/* @ts-expect-error Server Action passed to client */}
        <ActionForm action={addToCart.bind(null, id)} label="Add to cart" pendingLabel="Adding…" toast="Added to cart" />
        {/* @ts-expect-error Server Action passed to client */}
        <ActionForm action={simulateBookDetailMutation.bind(null, id)} label="Simulate detail mutation (revalidateTag)" pendingLabel="Mutating…" toast="Book updated" />
      </div>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div>
      <div style={{ height: 24, background: "#f3f3f3", borderRadius: 4, width: "60%", marginBottom: 8 }} />
      <div style={{ height: 14, background: "#f3f3f3", borderRadius: 4, width: "30%", marginBottom: 8 }} />
      <div style={{ height: 18, background: "#f3f3f3", borderRadius: 4, width: "40%" }} />
    </div>
  );
}

export default async function BookDetailPage({ params }) {
  const { id } = await params;
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Link prefetch={false} href="/caching/cart" style={{ padding: "2px 6px", borderRadius: 6, textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
          Cart <CartBadge />
        </Link>
      </div>
      <Link href="/caching/books">← Back to listing</Link>
      <div>
        <Image
          src={`https://picsum.photos/seed/book-${id}/640/360`}
          alt={`Cover for book ${id}`}
          width={640}
          height={360}
          style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
          priority={false}
        />
      </div>
      <Suspense fallback={<HeaderSkeleton />}> 
        {/* @ts-expect-error Async Server Component */}
        <BookHeader id={id} />
      </Suspense>
      <div style={{ fontSize: 14, color: "#333" }}>
        Detail data uses <code>revalidate=300</code> and is streamed. If a mutation
        targets this specific book, we could invalidate with <code>revalidateTag(`book:{id}`)</code>.
      </div>
      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
          <li>Server component fetch uses <code>revalidate=300</code> with tags <code>"books"</code> and <code>book:{id}</code>.</li>
          <li>CDN caches streamed HTML and RSC payloads; server cache holds fetch data for 5 minutes.</li>
          <li>Suspense streams header fast while data loads.</li>
          <li>Mutations can target detail via <code>revalidateTag(`book:{id}`)</code> and the listing via <code>revalidateTag("books")</code>.</li>
        </ul>
      </div>
    </div>
  );
}
