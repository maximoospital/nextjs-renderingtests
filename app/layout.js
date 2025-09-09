// Minimal layout without external components or global CSS

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Rendering Methods Demo",
    template: "%s • Rendering Methods Demo",
  },
  description: "Quick demo of SSR, CSR, SSG and ISR with simple metrics.",
  alternates: {
    canonical: "/",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

import MetricsWidget from "./metrics/MetricsWidget";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px", height: 48, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontWeight: 600 }}>Rendering Methods Demo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <Link href="/" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>Home</Link>
              <Link href="/ssr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>SSR</Link>
              <Link href="/csr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>CSR</Link>
              <Link href="/ssg" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>SSG</Link>
              <Link href="/isr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>ISR</Link>
            </div>
          </div>
        </nav>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>{children}</main>

        <MetricsWidget />
      </body>
    </html>
  );
}
