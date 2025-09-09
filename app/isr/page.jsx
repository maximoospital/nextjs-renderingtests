export const revalidate = 3600; // ISR: cached up to 1h unless revalidated on demand
import RevalidateButton from "./RevalidateButton";

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
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>ISR (Incremental Static Regeneration)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Info</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              <strong>Original build time:</strong> {format(buildTime)}
            </div>
            <div>
              <strong>This page generated at:</strong> {format(generatedAt)}
            </div>
            <div>
              {/* Client button to revalidate without navigating to API */}
              <RevalidateButton path="/isr" />
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              On-demand revalidation will regenerate this page’s static output.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
