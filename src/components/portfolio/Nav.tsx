import { useEffect, useState } from "react";

const links = [
  { href: "#route", label: "Route" },
  { href: "#kit", label: "Kit" },
  { href: "#tours", label: "Tours" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center gap-2 rounded-full border px-3 py-2 transition-all duration-300 ${
          solid
            ? "border-border bg-card/85 shadow-[0_10px_40px_-24px_oklch(0.3_0.05_148/0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-1 pr-3">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            PD
          </span>
          <span className="font-display text-sm font-bold tracking-tight">Philipp Dachtler</span>
        </a>
        <div className="ml-auto hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-auto rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:ml-1"
        >
          Start a tour
        </a>
      </nav>
    </header>
  );
}
