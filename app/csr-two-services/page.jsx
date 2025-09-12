export const dynamic = "force-dynamic";

export const metadata = {
  title: "CSR Two Services",
  description: "Two client-rendered cards; one succeeds, one shows an inline error boundary",
  alternates: { canonical: "/csr-two-services" },
};

import GoodCard from "./GoodCard";
import FailingCard from "./FailingCard";

export default function Page() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>CSR: Two Services (one fails)</h1>
      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <GoodCard />
        <FailingCard />
      </section>
    </div>
  );
}

