export const metadata = {
  title: "Home",
  description: "Landing page (no metrics widget)",
};

export default function Home() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>Rendering Methods Demo</h1>
      <p>
        This is a minimal demo of Next.js rendering strategies compatible with the
        Vercel Hobby plan.
      </p>
      <ul>
        <li>SSR: server-side rendering, dynamic on every request.</li>
        <li>CSR: client-side rendering and interactions.</li>
        <li>SSG: static site generation at build time.</li>
        <li>
          ISR: incremental static regeneration; static output that can be revalidated
          on demand.
        </li>
      </ul>
      <p>
        Use the navigation bar to explore each page. Each non-home page includes a
        compact metrics widget (TTFB, transfer size, a simple SEO score, and render/build time).
      </p>
    </div>
  );
}
