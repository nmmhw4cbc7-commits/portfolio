import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { switchTheme } from "@/lib/sky";
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
  const [active, setActive] = useState<string | null>(null);
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null);
  const linkRow = useRef<HTMLDivElement>(null);

  // scroll-spy: the section crossing the upper third of the viewport is "active"
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // slide the marker under the active link
  useEffect(() => {
    const measure = () => {
      const a = active && linkRow.current?.querySelector<HTMLElement>(`a[href="${active}"]`);
      setMarker(a ? { x: a.offsetLeft, w: a.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

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

        <div ref={linkRow} className="relative ml-auto hidden items-center gap-7 md:flex">
          <span
            aria-hidden
            className="absolute -bottom-[19px] h-[2px] bg-fg transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)]"
            style={{
              transform: `translateX(${marker?.x ?? 0}px)`,
              width: marker?.w ?? 0,
              opacity: marker ? 1 : 0,
            }}
          />
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "location" : undefined}
              data-scramble-host
              className={`group t-mono flex items-baseline gap-1.5 transition-opacity duration-300 ${
                active && active !== l.href ? "opacity-55 hover:opacity-100" : ""
              }`}
            >
              <span className="text-accent">{l.n}</span>
              <span className="relative" data-scramble>
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
            onClick={() => {
              const next = !dark;
              switchTheme(next, () => {
                // apply synchronously so the view transition captures the new theme
                document.documentElement.classList.toggle("dark", next);
                flushSync(() => setDark(next));
              });
            }}
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

          <a
            href="#contact"
            className="btn btn-solid hidden h-9 sm:inline-flex"
            data-magnetic
            data-scramble-host
          >
            <span data-scramble>Let's talk</span>
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
        data-page
        style={{ transform: "scaleX(var(--page, 0))" }}
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
