export const dynamic = "force-dynamic";

export const metadata = {
  title: "SSR with CSR Child",
  description: "Server component passes data to an interactive client component",
  alternates: { canonical: "/ssr-csr-child" },
};

import ClientChild from "./ClientChild";

function format(ts) {
  return new Date(ts).toLocaleString();
}

export default async function Page({ params }) {
  // Pretend to fetch data on the server
  const serverGeneratedAt = new Date().toISOString();
  const serverMessage = `Hello from the server at ${format(serverGeneratedAt)}`;
  const payload = {
    message: serverMessage,
    items: ["alpha", "beta", "gamma"],
    count: 3,
  };  
  console.log(params);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>SSR page with CSR child</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Server → Client Props</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 12 }}>
            <div style={{ fontSize: 12, color: "#666" }}>
              The server rendered this page and passed data to the interactive
              client component below.
            </div>
            <ClientChild payload={payload} />
          </div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <h3 style={{ margin: 0, marginBottom: 8, fontSize: 16, fontWeight: 600 }}>Explanation</h3>
          <div style={{ fontSize: 14, display: "grid", gap: 8 }}>
            <div>
              The page component runs on the server (SSR) and constructs data
              that is serialized into the HTML. React then hydrates the client
              child so it can read props and handle interactions.
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              This pattern is common when the parent needs secure, server-only
              logic or fetching, while the child handles dynamic UI.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

