"use client";

import { useEffect, useState } from "react";

export default function CartBadge({ className = "" }) {
  const [count, setCount] = useState(null);

  async function refresh() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      const items = data?.cart?.lines ?? [];
      const c = items.reduce((n, l) => n + (l?.qty || 0), 0);
      setCount(c);
    } catch {
      // ignore
    }
  }

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
  }, []);

  if (count == null) {
    return (
      <span
        aria-label="Loading cart"
        className={className}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 18, height: 18, borderRadius: 9, background: "#eee", color: "#666", fontSize: 11, lineHeight: 1, padding: "0 6px", marginLeft: 6 }}
      >
        …
      </span>
    );
  }

  return (
    <span
      aria-label={`Cart items: ${count}`}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 18, height: 18, borderRadius: 9, background: "black", color: "white", fontSize: 11, lineHeight: 1, padding: "0 6px", marginLeft: 6 }}
    >
      {count}
    </span>
  );
}
