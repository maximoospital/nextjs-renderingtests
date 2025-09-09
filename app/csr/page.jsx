export const dynamic = "force-dynamic"; // ensure not prerendered/static on Vercel

export const metadata = {
  title: "CSR",
  description: "Client-side rendered page with interactions",
  alternates: { canonical: "/csr" },
};

import ClientPage from "./ClientPage";

export default function Page() {
  return <ClientPage />;
}
