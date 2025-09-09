"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

function fmtMs(v) {
  if (!v || v <= 0 || Number.isNaN(v)) return "—";
  return Math.round(v) + " ms";
}

function fmtBytes(n) {
  if (!n || n <= 0 || Number.isNaN(n)) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${units[i]}`;
}

export default function MetricsWidget() {
  const pathname = usePathname();

  // Hide on home route
  const showForPath = pathname && pathname !== "/";

  const [ttfb, setTtfb] = useState(null);
  const [transfer, setTransfer] = useState(null);
  const [fcp, setFcp] = useState(null);
  const [clientRender, setClientRender] = useState(null);
  const [ready, setReady] = useState(false);

  const buildTime = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_BUILD_TIME || "";
    return raw ? new Date(raw).toLocaleString() : "";
  }, []);

  useEffect(() => {
    if (!showForPath) return;

    const nav = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || null;
    const timing = performance.timing || {};

    let ttfbMs = 0;
    if (nav) {
      ttfbMs = Math.max(0, nav.responseStart - nav.requestStart);
    } else if (timing.responseStart && timing.requestStart) {
      ttfbMs = Math.max(0, timing.responseStart - timing.requestStart);
    }
    setTtfb(Number.isFinite(ttfbMs) ? ttfbMs : 0);

    let transferBytes = 0;
    if (nav) {
      transferBytes = nav.transferSize || nav.encodedBodySize || 0;
    }
    setTransfer(Number.isFinite(transferBytes) ? transferBytes : 0);

    // FCP and client render (responseEnd -> FCP)
    let fcpValue = 0;
    const fcpEntry = (performance.getEntriesByName && performance.getEntriesByName("first-contentful-paint")[0]) || null;
    if (fcpEntry) {
      fcpValue = fcpEntry.startTime;
      setFcp(fcpValue);
    }

    let respEnd = 0;
    if (nav) {
      respEnd = nav.responseEnd || 0;
    } else if (timing.responseEnd && timing.navigationStart) {
      respEnd = Math.max(0, timing.responseEnd - timing.navigationStart);
    }

    if (fcpEntry) {
      setClientRender(Math.max(0, fcpEntry.startTime - respEnd));
      setReady(true);
    } else if ("PerformanceObserver" in window) {
      try {
        const po = new PerformanceObserver((list) => {
          const e = list.getEntries().find((x) => x.name === "first-contentful-paint");
          if (e) {
            setFcp(e.startTime);
            setClientRender(Math.max(0, e.startTime - respEnd));
            setReady(true);
            po.disconnect();
          }
        });
        po.observe({ type: "paint", buffered: true });
      } catch {
        setReady(true);
      }
    } else {
      setReady(true);
    }

    // Only compute on initial load; soft navigations lack a NavigationTiming entry
  }, [showForPath, pathname]);

  if (!showForPath) return null;

  // Render once we have computed initial values (or attempted to)
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 60,
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: 12,
        minWidth: 240,
        fontSize: 12,
        color: "#111",
        opacity: ready ? 1 : 0.85,
      }}
      aria-live="polite"
    >
      <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 12 }}>Page Metrics</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "6px 12px", alignItems: "center" }}>
        <div style={{ color: "#555" }}>TTFB</div>
        <div>{fmtMs(ttfb)}</div>

        <div style={{ color: "#555" }}>Transfer</div>
        <div>{fmtBytes(transfer)}</div>

        <div style={{ color: "#555" }}>FCP</div>
        <div>{fmtMs(fcp)}</div>

        <div style={{ color: "#555" }}>Client Render</div>
        <div>{fmtMs(clientRender)}</div>

        {buildTime ? (
          <>
            <div style={{ color: "#555" }}>Build</div>
            <div>{buildTime}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}

