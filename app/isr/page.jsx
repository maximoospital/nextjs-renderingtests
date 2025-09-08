export const revalidate = 3600; // ISR: cached up to 1h unless revalidated on demand

import MetricsWidget from "@/components/metrics-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevalidateButton from "./revalidate-button";

export const metadata = {
  title: "ISR",
  description: "Incremental static regeneration with on-demand revalidation",
  alternates: { canonical: "/isr" },
};

function format(ts) {
  return new Date(ts).toLocaleString();
}

export default async function Page() {
  const t0 = Date.now();
  await new Promise((r) => setTimeout(r, 5));
  const renderDuration = Date.now() - t0; // time to generate the cached HTML

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const generatedAt = new Date().toISOString();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">ISR (Incremental Static Regeneration)</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <span className="font-medium">Original build time:</span> {format(buildTime)}
            </div>
            <div>
              <span className="font-medium">This page generated at:</span> {format(generatedAt)}
            </div>
            <RevalidateButton />
            <div className="text-xs text-black/60 dark:text-white/60">
              On-demand revalidation will regenerate this page’s static output.
            </div>
          </CardContent>
        </Card>
        <MetricsWidget buildOrRenderDurationMs={renderDuration} />
      </div>
    </div>
  );
}
