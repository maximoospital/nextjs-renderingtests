export const revalidate = 3600; // Landing: SSG + ISR hourly

export const metadata = {
  title: "Caching Overview",
  description: "Ecommerce demo using layered caching",
  alternates: { canonical: "/caching" },
};

function format(ts) {
  return new Date(ts).toLocaleString();
}

import Link from "next/link";
import CartBadge from "@/components/cart-badge";

export default async function CachingOverviewPage() {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const generatedAt = new Date().toISOString();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Link prefetch={false} href="/caching/cart" style={{ padding: "2px 6px", borderRadius: 6, textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center" }}>
          Cart <CartBadge />
        </Link>
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Caching: Ecommerce Demo</h1>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Landing (SSG + ISR)</h3>
        <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
          <div>
            <strong>Build time:</strong> {format(buildTime)}
          </div>
          <div>
            <strong>Generated at (cached HTML time):</strong> {format(generatedAt)}
          </div>
          <div style={{ color: "#666", fontSize: 12 }}>
            This page is statically generated and revalidated hourly. The CDN serves
            the cached HTML and updates it when revalidation occurs.
          </div>
        </div>
      </div>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 4, fontSize: 16, fontWeight: 600 }}>Pages in this demo</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
          <li>
            Books Listing: server component with <code>fetch</code> revalidate=120 and
            tag <code>"books"</code>. CDN caches streamed HTML; server cache holds
            fetch results for 2 minutes.
          </li>
          <li>
            Book Detail: server component with <code>fetch</code> revalidate=300 and
            per-book tag. Streamed with Suspense for fast first paint.
          </li>
          <li>
            Shopping Cart: always dynamic, uses Server Actions for mutations. No
            server/CDN caching; fetches use <code>no-store</code>.
          </li>
          <li>
            Assets: hashed and long-lived via CDN+browser caches; updated on each deploy.
          </li>
        </ul>
      </div>

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, display: "grid", gap: 8 }}>
        <h3 style={{ margin: 0, marginBottom: 4, fontSize: 16, fontWeight: 600 }}>Cache Layers</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
          <li>
            Browser: stores assets and reused component chunks if unchanged.
          </li>
          <li>
            CDN: caches pre-rendered HTML, RSC payloads, and assets near users.
          </li>
          <li>
            Server Cache: caches <code>fetch</code> results for server components, with
            <code>revalidate</code> windows and <code>revalidateTag</code> on mutation.
          </li>
          <li>
            Build-time: generated HTML stored until revalidated (ISR).
          </li>
          <li>
            React cache: deduplicates identical <code>fetch</code> calls within a render tree.
          </li>
        </ul>
      </div>
    </div>
  );
}
