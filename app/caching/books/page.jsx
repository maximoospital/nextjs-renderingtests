import Link from "next/link";
import Image from "next/image";
import CartBadge from "@/components/cart-badge";
import { Suspense } from "react";
import { simulateBookMutation } from "./actions";
import ActionForm from "@/components/action-form";
import { addToCart } from "../cart/actions";
import { headers } from "next/headers";

export const metadata = {
  title: "Books Listing",
  description: "Server component with 2m revalidate and books tag",
  alternates: { canonical: "/caching/books" },
};

async function fetchBooks() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;
  const res = await fetch(`${base}/api/books`, {
    // Server Cache: keep for 2 minutes
    next: { revalidate: 120, tags: ["books"] },
  });
  if (!res.ok) throw new Error("Failed to load books");
  return res.json();
}

async function BooksSummary() {
  const { books, serverNow } = await fetchBooks();
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 14 }}>
        <strong>{books.length}</strong> books • server responded at {new Date(serverNow).toLocaleTimeString()}
      </div>
      <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
        Data cached in the server for 2 minutes and invalidated via revalidateTag("books").
        React/Next deduplicates identical fetch calls within this render.
      </div>
    </div>
  );
}

async function BooksGrid() {
  const { books } = await fetchBooks();
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {books.map((b) => (
        <div key={b.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 8 }}>
          <Image
            src={`https://picsum.photos/seed/book-${b.id}/320/200`}
            alt={`Cover for ${b.title}`}
            width={320}
            height={200}
            style={{ width: "100%", height: "auto", borderRadius: 8, objectFit: "cover" }}
            priority={false}
          />
          <div style={{ fontWeight: 600 }}>{b.title}</div>
          <div style={{ color: "#666" }}>{b.author}</div>
          <div style={{ fontWeight: 600 }}>${b.price.toFixed(2)}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href={`/caching/books/${b.id}`} style={{ textDecoration: "none" }}>
              View details
            </Link>
            {/* Client wrapper adds a toast and pending state */}
            {/* @ts-expect-error Server Action passed to client */}
            <ActionForm
              action={addToCart.bind(null, b.id)}
              label="Add to cart"
              pendingLabel="Adding…"
              toast="Added to cart"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <div style={{ height: 16, background: "#f3f3f3", borderRadius: 4, marginBottom: 8 }} />
          <div style={{ height: 12, background: "#f3f3f3", borderRadius: 4, marginBottom: 8 }} />
          <div style={{ height: 12, background: "#f3f3f3", borderRadius: 4, width: "60%" }} />
        </div>
      ))}
    </div>
  );
}

export default function BooksPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Link prefetch={false} href="/caching/cart" style={{ padding: "2px 6px", borderRadius: 6, textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
          Cart <CartBadge />
        </Link>
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Books Listing</h1>
      <div style={{ fontSize: 14, color: "#333" }}>
        Server component fetches with <code>revalidate=120</code> and tag <code>"books"</code>. The CDN caches the streamed HTML
        and component chunks. Clicking the mutation button will trigger <code>revalidateTag("books")</code>.
      </div>

      {/* @ts-expect-error Server Action passed to client */}
      <ActionForm action={simulateBookMutation} label="Simulate book mutation (revalidateTag)" pendingLabel="Mutating…" toast="Books updated" />

      <Suspense fallback={<div style={{ fontSize: 14 }}>Loading summary…</div>}>
        {/* Summary uses same fetch as the grid; deduped within this render */}
        {/* @ts-expect-error Async Server Component */}
        <BooksSummary />
      </Suspense>

      <Suspense fallback={<ListSkeleton />}> 
        {/* @ts-expect-error Async Server Component */}
        <BooksGrid />
      </Suspense>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
          <li>Server component fetch uses <code>revalidate=120</code> and tag <code>"books"</code>.</li>
          <li>CDN caches streamed HTML and RSC payloads until revalidation.</li>
          <li>React cache deduplicates identical fetch calls (summary + list).</li>
          <li><code>revalidateTag("books")</code> invalidates the server cache for listing data.</li>
          <li>UI shows skeleton via route-level <code>loading.jsx</code>.</li>
        </ul>
      </div>
    </div>
  );
}
