**Next.js Rendering Demos**

- Purpose: a compact, hands‑on tour of SSR, CSR, SSG, ISR, streaming/Suspense, route handlers, server actions, and caching tags in the App Router.
- Style: minimal, inline‑styled UI to keep the focus on React/Next.js concepts rather than styling.

**Getting Started**
- Install: `npm install`
- Dev: `npm run dev` then open `http://localhost:3000`
- Build/Start: `npm run build && npm start`

**Directory Layout**
- `app/` app router pages and layouts
- `app/api/*` route handlers (server only)
- `components/*` client components and small UI primitives
- `lib/*` in‑memory data sources and cart store (demo‑only)
 - `app/state/*` tiny global state demo using Zustand
