import { useEffect, useState } from "react";

const links = [
  { href: "#route", label: "Path" },
  { href: "#kit", label: "Toolkit" },
  { href: "#tours", label: "Work" },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-colors ${
        solid ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4">
        <a href="#top" className="flex items-center gap-2 pr-3">
          <span className="flex size-8 items-center justify-center bg-foreground text-[12px] font-bold text-background">
            PD
          </span>
          <span className="font-display text-sm font-bold tracking-tight">Philipp Dachtler</span>
        </a>
        <div className="ml-auto hidden items-center gap-5 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-auto border border-foreground px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background sm:ml-6"
        >
          Let's talk
        </a>
      </nav>
    </header>
  );
}
