export const dynamic = "force-dynamic";

export const metadata = {
  title: "CSR Error Boundary",
  description: "Client-rendered error triggered and handled by a route error boundary",
  alternates: { canonical: "/csr-error" },
};

import ErrorThrower from "./thrower";

export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>CSR Error Boundary Example</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Trigger a client error</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 12 }}>
            <ErrorThrower />
            <div style={{ fontSize: 12, color: "#666" }}>
              Clicking the button forces an error during render in a client
              component, which is then caught by this route’s `error.jsx` boundary.
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              In the App Router, placing an <code>error.jsx</code> file inside a route
              segment sets up an error boundary for both server and client render
              errors. Here, the error is triggered client-side by toggling state
              and throwing during render; the boundary displays a fallback and
              provides a reset action.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Error boundaries catch errors in rendering and lifecycle, not inside
              event handlers. This demo throws during render on purpose.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

