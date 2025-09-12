"use client";

import { useEffect, useRef, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  dateStyle: "medium",
  timeStyle: "medium",
});

function format(ts) {
  if (!ts) return "—";
  return fmt.format(new Date(ts));
}

export default function ClientPage() {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const [now, setNow] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const renderStart = useRef(performance.now());
  const [renderDuration, setRenderDuration] = useState(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      setRenderDuration(performance.now() - renderStart.current);
    });
  }, []);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  async function simulateFetch() {
    setLoading(true);
    setMessage("");
    await new Promise((r) => setTimeout(r, 500));
    setMessage("Fictional fetch completed ✅");
    setLoading(false);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>CSR (Client-Side Rendering)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Info & Interactions</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 12 }}>
            <div>
              <strong>Current build time:</strong> {format(buildTime)}
            </div>
            <div>
              <strong>Live client time:</strong> {format(now)}
            </div>
            <div>
              <button onClick={() => setCount((c) => c + 1)} style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 6 }}>
                Increment
              </button>
              <span style={{ marginLeft: 8 }}>Counter: {count}</span>
            </div>
            <div>
              <button onClick={simulateFetch} disabled={loading} style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 6 }}>
                {loading ? "Loading…" : "Simulate fetch"}
              </button>
              <span style={{ marginLeft: 8 }}>{message}</span>
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              This page is rendered and updated entirely in the browser.
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              CSR relies on the browser to render and update UI. The server sends
              a minimal shell and JavaScript, and React renders the page on the
              client. It’s great for highly interactive UIs.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Consider SEO and initial load trade-offs: CSR shifts work to the
              client and may delay first content without careful optimization.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
