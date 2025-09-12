// Minimal layout without external components or global CSS

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "NextJS Demos",
    template: "%s • NextJS Demos",
  },
  description: "Quick demo of SSR, CSR, SSG and ISR with simple metrics.",
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}>
        <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
          {/* Small CSS to hide default summary marker and rotate chevron when open */}
          <style>{`
            nav details > summary::-webkit-details-marker { display: none; }
            nav details > summary::marker { content: ''; }
            nav details > summary .chevron { transition: transform 0.2s ease; transform: rotate(0deg); }
            nav details[open] > summary .chevron { transform: rotate(180deg); }
          `}</style>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px", height: 48, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontWeight: 600 }}>NextJS Demos</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <Link href="/" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit" }}>Home</Link>
              <details style={{ position: "relative" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Rendering
                    <svg
                      className="chevron"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div style={{ position: "absolute", top: 32, left: 0, background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                  <Link href="/ssr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>SSR</Link>
                  <Link href="/csr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>CSR</Link>
                  <Link href="/ssg" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>SSG</Link>
                  <Link href="/isr" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>ISR</Link>
                  <Link href="/csr-error" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>CSR Error</Link>
                  <Link href="/csr-two-services" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>CSR two services</Link>
                  <Link href="/ssr-csr-child" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>SSR→CSR child</Link>
                  <Link href="/ssr-csr-child-2" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>SSR→CSR child 2</Link>
                </div>
              </details>
              <details style={{ position: "relative" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Caching
                    <svg
                      className="chevron"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div style={{ position: "absolute", top: 32, left: 0, background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                  <Link href="/caching" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>Overview</Link>
                  <Link href="/caching/books" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>Books Listing</Link>
                  <Link prefetch={false} href="/caching/cart" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>Shopping Cart</Link>
                </div>
              </details>
              <details style={{ position: "relative" }}>
                <summary style={{ listStyle: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    State
                    <svg
                      className="chevron"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div style={{ position: "absolute", top: 32, left: 0, background: "#fff", border: "1px solid #e5e5e5", borderRadius: 8, padding: 8, display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                  <Link href="/state" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>Home</Link>
                  <Link href="/state/settings" style={{ padding: "4px 8px", borderRadius: 6, textDecoration: "none", color: "inherit", whiteSpace: "nowrap" }}>Settings</Link>
                </div>
              </details>
              {/** Cart badge removed from global navbar; now shown only on caching pages */}
            </div>
          </div>
        </nav>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>{children}</main>
        {/** Toasts only on caching pages; moved to app/caching/layout */}
      </body>
    </html>
  );
}
