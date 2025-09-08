import Link from "next/link";

export default function Navbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/ssr", label: "SSR" },
    { href: "/csr", label: "CSR" },
    { href: "/ssg", label: "SSG" },
    { href: "/isr", label: "ISR" },
  ];
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 h-12 flex items-center gap-4">
        <div className="font-semibold">Rendering Methods Demo</div>
        <div className="flex items-center gap-3 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

