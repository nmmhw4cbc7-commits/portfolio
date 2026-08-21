import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "#route", label: "Path" },
  { href: "#kit", label: "Toolkit" },
  { href: "#tours", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [raised, setRaised] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-standard ${
        raised ? "md-elev-2" : "bg-surface"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <a href="#top" className="state-layer flex items-center gap-3 rounded-full py-2 pr-4">
          <img
            src="/favicon.ico"
            alt="Philipp Dachtler"
            className="size-10 rounded-full bg-primary-container object-cover"
          />
          <span className="title-medium text-on-surface">Philipp Dachtler</span>
        </a>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="state-layer rounded-full px-4 py-2 label-large text-on-surface-variant transition-colors hover:text-on-surface"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <button
            type="button"
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setDark((v) => !v)}
            className="md-icon-btn state-layer"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>

          <a href="#contact" className="md-btn md-btn-filled state-layer hidden sm:inline-flex">
            Let's talk
          </a>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md-icon-btn state-layer md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md-elev-2 md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="state-layer flex h-14 items-center rounded-full px-6 label-large text-on-surface-variant"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
