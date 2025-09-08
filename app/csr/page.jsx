import dynamic from "next/dynamic";

// Render strictly on the client to avoid any SSR-driven
// markup that could conflict during hydration.
const ClientPage = dynamic(() => import("./client-page"), { ssr: false });

export const metadata = {
  title: "CSR",
  description: "Client-side rendered page with interactions",
  alternates: { canonical: "/csr" },
};

export default function Page() {
  return <ClientPage />;
}
