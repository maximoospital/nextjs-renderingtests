"use client";

import { useMemo, useState } from "react";

export default function ClientChild({ payload }) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return payload.items;
    return payload.items.filter((x) => x.toLowerCase().includes(q));
  }, [filter, payload.items]);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div><strong>Server message:</strong> {payload.message}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter items…"
          style={{ padding: "6px 8px", border: "1px solid #ccc", borderRadius: 6 }}
        />
        <span style={{ fontSize: 12, color: "#666" }}>Items: {filtered.length}/{payload.count}</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {filtered.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

