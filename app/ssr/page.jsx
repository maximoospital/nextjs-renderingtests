export const dynamic = "force-dynamic"; // SSR on every request

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
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>SSR (Server-Side Rendering)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Info</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              <strong>Current build time:</strong> {format(buildTime)}
            </div>
            <div>
              <strong>Server time (request):</strong> {format(nowServer)}
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              This page is rendered on the server on each request.
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              SSR generates HTML on the server for every request, so data is always
              fresh at the time of the request. The browser receives fully rendered
              HTML and then hydrates any interactive islands.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Good for dynamic data that must be up-to-date. Trades extra server
              work and response time for freshness and SEO-friendly content.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
