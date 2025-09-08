"use client";

import { useEffect, useRef, useState } from "react";
import MetricsWidget from "@/components/metrics-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Use a stable, explicit format to avoid locale/timezone differences between
// environments. Since this page is CSR-only, this is mostly defensive.
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
  // Initialize to null and set after mount to avoid hydration mismatches.
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">CSR (Client-Side Rendering)</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Info & Interactions</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div>
              <span className="font-medium">Current build time:</span> {format(buildTime)}
            </div>
            <div>
              <span className="font-medium">Live client time:</span> {format(now)}
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
              <div className="text-sm">Counter: {count}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={simulateFetch} disabled={loading}>
                {loading ? "Loading…" : "Simulate fetch"}
              </Button>
              <div className="text-sm">{message}</div>
            </div>
            <div className="text-xs text-black/60 dark:text-white/60">
              This page is rendered and updated entirely in the browser.
            </div>
          </CardContent>
        </Card>
        <MetricsWidget buildOrRenderDurationMs={renderDuration} />
      </div>
    </div>
  );
}
