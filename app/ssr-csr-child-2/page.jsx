export const dynamic = "force-dynamic";

export const metadata = {
  title: "SSR with CSR Child 2",
  description: "Server reads ?page and passes it to a client paginator that syncs URL params",
  alternates: { canonical: "/ssr-csr-child-2" },
};

import ClientChild2 from "./ClientChild2";

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  const raw = sp?.page ?? 1;
  const n = Number(raw);
  const page = Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;

  // Server computes the initial state and passes it down. The client will
  // keep the URL in sync on navigation using router.replace() + router.refresh().
  const payload = { initialPage: page, pageSize: 10, total: 95 };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>SSR page with CSR child (Pagination)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Server → Client (page from URL)</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 12 }}>
            <div style={{ fontSize: 12, color: "#666" }}>
              The server read the <code>page</code> URL parameter and passed it to the client child. The client updates the
              URL on navigation so pagination persists across tabs/reloads.
            </div>
            <ClientChild2 {...payload} />
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              This page renders on the server (SSR). It reads <code>searchParams.page</code> and passes the normalized
              page number to a client component that simulates paginated results.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              The client uses <code>router.replace()</code> for soft navigations and <code>router.refresh()</code> so server components can re-read
              search params. The client also listens to <code>useSearchParams()</code> so back/forward updates local state.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

