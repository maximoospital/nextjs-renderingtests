"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import ActionForm from "@/components/action-form";

export default function CartClient({ removeFromCart, clearCart }) {
  const [data, setData] = useState({ cart: { lines: [], total: 0 }, serverNow: null });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (res.ok) {
        const j = await res.json();
        setData(j);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onFocus = () => refresh();
    const onVis = () => document.visibilityState === "visible" && refresh();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);
    const id = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(id);
    };
  }, [refresh]);

  const cart = data.cart || { lines: [], total: 0 };
  const empty = cart.lines.length === 0;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {loading ? (
        <div style={{ fontSize: 14, color: "#666" }}>Loading cart…</div>
      ) : (
        <div style={{ fontSize: 12, color: "#666" }}>
          Server responded at {data.serverNow ? new Date(data.serverNow).toLocaleTimeString() : "—"}
        </div>
      )}

      {empty ? (
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          Your cart is empty. Browse <Link href="/caching/books">books</Link> to add items.
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {cart.lines.map((l) => (
            <div key={l.id} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, alignItems: "center", border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{l.title}</div>
                <div style={{ color: "#666", fontSize: 12 }}>${l.price.toFixed(2)} × {l.qty}</div>
              </div>
              <div style={{ fontWeight: 600 }}>${l.lineTotal.toFixed(2)}</div>
              {/* @ts-expect-error Server Action passed to client */}
              <ActionForm
                action={removeFromCart.bind(null, l.id)}
                label="Remove one"
                pendingLabel="Removing…"
                toast="Removed from cart"
                onComplete={refresh}
              />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700 }}>
            <div>Total</div>
            <div>${cart.total.toFixed(2)}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {/* @ts-expect-error Server Action passed to client */}
            <ActionForm action={clearCart} label="Clear cart" pendingLabel="Clearing…" toast="Cart cleared" onComplete={refresh} />
            <button
              type="button"
              onClick={() => {
                // Pretend checkout — client-side noop to keep it simple
                alert("Checkout is a noop in this demo");
              }}
            >
              Checkout (noop)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
