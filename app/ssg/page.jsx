export const dynamic = "force-static"; // SSG

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
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>SSG (Static Site Generation)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Info</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              <strong>Build time:</strong> {format(buildTime)}
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              This page is fully static and won’t change until you rebuild the app.
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              SSG renders the page at build time and ships static HTML to users.
              It’s fast and inexpensive to serve. Content remains the same until
              the next build.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Ideal for documentation, marketing pages, and content that changes
              infrequently.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
