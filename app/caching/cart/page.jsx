export const dynamic = "force-dynamic"; // Always dynamic, user-specific

import CartClient from "@/components/cart-client";
import { clearCart, removeFromCart } from "./actions";

export const metadata = {
  title: "Shopping Cart",
  description: "Dynamic cart with Server Actions, no cache",
  alternates: { canonical: "/caching/cart" },
};
export default async function CartPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Shopping Cart</h1>
      <div style={{ fontSize: 14, color: "#333" }}>
        Always dynamic and user-specific. Fetches use <code>no-store</code>; this route is
        never cached at the CDN or server. Mutations use Server Actions.
      </div>

      {/* Client cart that live-refreshes and uses Server Actions */}
      {/* @ts-expect-error Server Actions passed to client */}
      <CartClient removeFromCart={removeFromCart} clearCart={clearCart} />

      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
        <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
          <li>Page is <code>dynamic = "force-dynamic"</code>; no caching at CDN or server.</li>
          <li>Fetch to <code>/api/cart</code> uses <code>cache: "no-store"</code> to avoid server cache.</li>
          <li>Server Actions handle mutations and trigger <code>revalidatePath("/caching/cart")</code>.</li>
          <li>Cart badge appears inline on caching pages; no navbar badge.</li>
        </ul>
      </div>
    </div>
  );
}
