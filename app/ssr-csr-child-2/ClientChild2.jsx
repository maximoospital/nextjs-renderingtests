"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ClientChild2({ initialPage = 1, pageSize = 10, total = 95 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const [page, setPage] = useState(() => {
    const p = Number(initialPage);
    return Number.isFinite(p) && p > 0 ? Math.min(Math.floor(p), totalPages) : 1;
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Generate a stable mock dataset (client-side only)
  const all = useMemo(() => {
    return Array.from({ length: total }, (_, i) => ({ id: i + 1, title: `Result ${i + 1}` }));
  }, [total]);

  // Sync local page when the URL "page" param changes (back/forward/cross-tab navigation)
  useEffect(() => {
    const q = Number(searchParams.get("page") ?? page);
    const next = Number.isFinite(q) && q > 0 ? Math.min(Math.floor(q), totalPages) : 1;
    if (next !== page) setPage(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, totalPages]);

  // Simulate fetching a page of results when page changes
  useEffect(() => {
    setLoading(true);
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, total);
    const handle = setTimeout(() => {
      setItems(all.slice(start, end));
      setLoading(false);
    }, 350);
    return () => clearTimeout(handle);
  }, [all, page, pageSize, total]);

  function updateUrl(nextPage) {
    const params = new URLSearchParams(searchParams);
    if (nextPage > 1) params.set("page", String(nextPage));
    else params.delete("page"); // keep URL clean for page=1
    const nextUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    // Soft navigate and refresh the RSC tree so server bits can re-read search params
    router.replace(nextUrl, { scroll: false });
    router.refresh();
  }

  function go(next) {
    if (next < 1 || next > totalPages) return;
    startTransition(() => {
      setPage(next);
      updateUrl(next);
    });
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => go(page - 1)} disabled={page <= 1 || loading || isPending} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: page > 1 && !loading ? "pointer" : "not-allowed" }}>Prev</button>
        <span style={{ fontSize: 12, color: "#666" }}>Page {page} / {totalPages}</span>
        <button onClick={() => go(page + 1)} disabled={page >= totalPages || loading || isPending} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: page < totalPages && !loading ? "pointer" : "not-allowed" }}>Next</button>
      </div>
      <div style={{ fontSize: 12, color: "#666" }}>
        URL sync: the "page" query param updates on navigation, so pagination state persists across tabs and reloads.
      </div>
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
        {loading ? (
          <div style={{ fontSize: 14, color: "#666" }}>Loading results…</div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {items.map((r) => (
              <li key={r.id}>{r.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

