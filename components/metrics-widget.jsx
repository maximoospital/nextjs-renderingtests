"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Info from "@/components/ui/info";

function computeSEOScore() {
  try {
    let score = 0;
    // Title present
    if (document.title) score += 20;
    // Description length
    const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    if (desc.length >= 50 && desc.length <= 160) score += 20;
    // Viewport
    if (document.querySelector('meta[name="viewport"]')) score += 15;
    // Canonical
    if (document.querySelector('link[rel="canonical"]')) score += 10;
    // One H1
    if (document.querySelectorAll("h1").length >= 1) score += 15;
    // Images have alt
    const imgs = Array.from(document.querySelectorAll("img"));
    if (imgs.length === 0 || imgs.every((i) => i.getAttribute("alt") !== null)) score += 10;
    // Links have descriptive text
    const anchors = Array.from(document.querySelectorAll("a"));
    if (anchors.every((a) => (a.textContent || "").trim().length >= 2)) score += 10;
    return Math.min(100, Math.max(0, score));
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "n/a";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export default function MetricsWidget({ buildOrRenderDurationMs }) {
  const [ttfb, setTtfb] = useState(null);
  const [transferSize, setTransferSize] = useState(null);
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    const [nav] = performance.getEntriesByType("navigation");
    if (nav) {
      // TTFB as responseStart - requestStart
      const firstByte = nav.responseStart - nav.requestStart;
      setTtfb(Math.max(0, Math.round(firstByte)));
      setTransferSize(nav.transferSize || nav.encodedBodySize || null);
    }
    setSeo(computeSEOScore());
  }, []);

  const items = useMemo(() => {
    return [
      {
        key: "ttfb",
        label: "First Byte",
        value: ttfb != null ? `${ttfb} ms` : "—",
        info: (
          <>
            Time to First Byte derived from PerformanceNavigationTiming:
            responseStart - requestStart. Proxy for server responsiveness and
            network latency for this navigation.
          </>
        ),
      },
      {
        key: "size",
        label: "Package Size",
        value: formatBytes(transferSize),
        info: (
          <>
            Approximate transferred bytes for this page load (navigation.transferSize
            or encodedBodySize). Useful as a rough indicator; not a full bundle
            analysis.
          </>
        ),
      },
      {
        key: "seo",
        label: "SEO Score",
        value: seo != null ? `${seo}/100` : "—",
        info: (
          <>
            Heuristic checklist inspired by PageSpeed/Lighthouse basics: title,
            meta description length, viewport meta, canonical link, presence of an
            H1, image alts, and descriptive link text. For demo only.
          </>
        ),
      },
      {
        key: "time",
        label: "Build/Render Time",
        value:
          buildOrRenderDurationMs != null
            ? `${Math.round(buildOrRenderDurationMs)} ms`
            : "—",
        info: (
          <>
            SSR/SSG/ISR: measured on the server during HTML generation. CSR: time
            from first render start to first paint. Rough estimate to compare
            strategies.
          </>
        ),
      },
    ];
  }, [ttfb, transferSize, seo, buildOrRenderDurationMs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {items.map((it) => (
            <div key={it.key} className="relative p-2 rounded-md bg-black/5 dark:bg-white/10">
              <div className="flex items-center text-xs text-black/70 dark:text-white/70">
                <span>{it.label}</span>
                <Info title={`Explain ${it.label}`}>{it.info}</Info>
              </div>
              <div className="font-medium">{it.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
