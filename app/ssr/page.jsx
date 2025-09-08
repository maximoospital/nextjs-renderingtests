export const dynamic = "force-dynamic"; // SSR on every request

import MetricsWidget from "@/components/metrics-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveServerTime from "@/components/live-server-time";

export const metadata = {
  title: "SSR",
  description: "Server-side rendered page with dynamic data",
  alternates: { canonical: "/ssr" },
};

function format(ts) {
  return new Date(ts).toLocaleString();
}

export default async function Page() {
  const t0 = Date.now();
  // Simulate a tiny server computation to make timing visible
  await new Promise((r) => setTimeout(r, 5));
  const renderDuration = Date.now() - t0;

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const nowServer = new Date().toISOString();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">SSR (Server-Side Rendering)</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <span className="font-medium">Current build time:</span> {format(buildTime)}
            </div>
            <div>
              <span className="font-medium">Server time (request):</span> {format(nowServer)}
            </div>
            <div>
              <span className="font-medium">Live server time:</span> <LiveServerTime />
            </div>
            <div className="text-xs text-black/60 dark:text-white/60">
              This page is rendered on the server on each request.
            </div>
          </CardContent>
        </Card>
        <MetricsWidget buildOrRenderDurationMs={renderDuration} />
      </div>
    </div>
  );
}
