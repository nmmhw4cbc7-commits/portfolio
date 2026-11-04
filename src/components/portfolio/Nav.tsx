import { useEffect, useState } from "react";
import { useXray } from "@/lib/xray";

const links = [
  { href: "#route", label: "Path", n: "01" },
  { href: "#kit", label: "Toolkit", n: "02" },
  { href: "#tours", label: "Work", n: "03" },
  { href: "#wire", label: "Wire", n: "04" },
  { href: "#contact", label: "Contact", n: "05" },
];

export function Nav() {
  const [raised, setRaised] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState<boolean | null>(null);
  const xray = useXray("Nav");

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      {...xray}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        raised || open
          ? "border-b border-rule bg-bg/90 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center bg-fg text-[0.8rem] font-extrabold tracking-tight text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
            PD
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:inline">
            Philipp Dachtler
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group t-mono flex items-baseline gap-1.5">
              <span className="text-accent">{l.n}</span>
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </span>
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-4">
          <button
            type="button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDark((v) => !v)}
            className="t-mono flex h-9 items-center gap-2 border border-rule px-3 transition-colors hover:border-fg"
          >
            <span
              className="relative block size-3 rounded-full border border-fg"
              style={{
                background: "linear-gradient(90deg, var(--fg) 50%, transparent 50%)",
              }}
            />
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
          </button>

          <a href="#contact" className="btn btn-solid hidden h-9 sm:inline-flex">
            Let's talk
          </a>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid size-9 place-items-center border border-rule md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </nav>

      {/* page progress */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
        style={{ transform: "scaleX(var(--page))" }}
      />

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="px-4 pb-6 pt-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-rule py-4"
              >
                <span className="t-mono text-accent">{l.n}</span>
                <span className="t-title">{l.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
