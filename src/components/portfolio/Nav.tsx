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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 ${
          solid
            ? "border-border bg-card/80 shadow-[0_18px_50px_-30px_oklch(0.45_0.28_269/0.7)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-1 pr-3">
          <span className="arc-gradient flex size-8 items-center justify-center rounded-xl text-[12px] font-extrabold text-primary-foreground">
            PD
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight">Philipp Dachtler</span>
        </a>
        <div className="ml-auto hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          aria-label="Let's talk"
          className="ml-auto rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:ml-2 group inline-flex items-center"
        >
          {/* Paper airplane SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6"
            aria-hidden
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>

          <span className="ml-3">Let's talk</span>
        </a>
      </nav>
    </header>
  );
}
