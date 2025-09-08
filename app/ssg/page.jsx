export const dynamic = "force-static"; // SSG

import MetricsWidget from "@/components/metrics-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "SSG",
  description: "Static page generated at build time",
  alternates: { canonical: "/ssg" },
};

function format(ts) {
  return new Date(ts).toLocaleString();
}

export default async function Page() {
  const t0 = Date.now();
  // Simulate small build-time computation
  await new Promise((r) => setTimeout(r, 5));
  const renderDuration = Date.now() - t0; // captured at build

  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">SSG (Static Site Generation)</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div>
              <span className="font-medium">Build time:</span> {format(buildTime)}
            </div>
            <div className="text-xs text-black/60 dark:text-white/60">
              This page is fully static and won’t change until you rebuild the app.
            </div>
          </CardContent>
        </Card>
        <MetricsWidget buildOrRenderDurationMs={renderDuration} />
      </div>
    </div>
  );
}
