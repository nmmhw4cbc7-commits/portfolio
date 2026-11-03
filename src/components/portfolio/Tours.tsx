import type { CSSProperties } from "react";
import { Leaf, Compass, ShieldCheck, Mail, Laptop, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "./data";
import { SectionHead } from "./Trail";

const icons = { leaf: Leaf, compass: Compass, shield: ShieldCheck, mail: Mail, laptop: Laptop };

/*
 * Desktop: the section is pinned and scrolling moves the project strip sideways.
 * Below lg the strip simply stacks vertically.
 */
export function Tours() {
  const n = projects.length;
  return (
    <section
      id="tours"
      data-scroll="pin"
      className="relative lg:h-[var(--h)]"
      style={{ "--h": `${n * 75 + 100}vh`, "--n": n } as CSSProperties}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-4 pt-24 sm:px-8 sm:pt-36 lg:pt-28">
          <SectionHead
            n="03"
            label="Work"
            title="Selected work"
            sub="Production applications, live client websites and things still in the making."
          />
        </div>

        <div
          data-motion
          className="tours-track mt-12 flex flex-col px-4 pb-24 sm:px-8 lg:mb-auto lg:mt-auto lg:flex-row lg:pb-6"
        >
          {projects.map((p, i) => (
            <TourCard key={p.title} project={p} index={i} total={n} />
          ))}
        </div>

        {/* progress ticker */}
        <div className="pointer-events-none absolute bottom-5 left-8 right-8 hidden items-center gap-4 lg:flex">
          <span className="t-mono text-muted">Scroll</span>
          <span className="relative h-px flex-1 bg-rule">
            <span
              className="absolute inset-x-0 -top-px h-[2px] origin-left bg-accent"
              style={{ transform: "scaleX(var(--p, 0))" }}
            />
          </span>
          <span className="t-mono text-muted">0{n}</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .tours-track {
            --pad: max(2rem, calc((100vw - 1400px) / 2 + 2rem));
            width: max-content;
            padding-left: var(--pad);
            padding-right: 2rem;
            transform: translate3d(calc(var(--p, 0) * (100vw - 1rem - var(--n) * min(62vw, 860px) - var(--pad) - 2rem)), 0, 0);
          }
          .tours-track > article { width: min(62vw, 860px); }
        }
      `}</style>
    </section>
  );
}

function TourCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const Icon = icons[project.icon];
  return (
    <article
      data-reveal
      className="group relative flex flex-col border-t border-fg py-10 lg:h-[min(50vh,480px)] lg:border-l lg:border-t-0 lg:px-10 lg:py-2 lg:first:border-l-0 lg:first:pl-0"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="t-mono flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-accent">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <span className="border border-fg px-2 py-0.5">{project.tag}</span>
          <span className="text-muted">{project.status}</span>
        </div>
        <span className="grid size-14 shrink-0 place-items-center bg-fg text-bg transition-[background-color,color,transform] duration-500 ease-[var(--ease-out)] group-hover:-rotate-12 group-hover:bg-accent group-hover:text-on-accent">
          <Icon className="size-6" strokeWidth={1.6} aria-hidden />
        </span>
      </div>

      <span
        aria-hidden
        className="outline-text fill-on-hover mt-8 hidden select-none text-[clamp(5rem,11vw,10rem)] font-black leading-[0.8] tracking-[-0.05em] text-fg/25 transition-colors duration-500 [font-stretch:125%] group-hover:text-accent lg:block"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-10 text-[clamp(2.4rem,5.4vw,5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] transition-[font-stretch] duration-700 ease-[var(--ease-out)] [font-stretch:100%] group-hover:[font-stretch:120%] lg:mt-auto">
        {project.title}
      </h3>

      <p className="t-body mt-6 max-w-lg text-muted">{project.text}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {project.links.length === 0 ? (
          <span className="t-mono text-muted">In active development</span>
        ) : (
          project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="t-mono group/link inline-flex items-center gap-1.5"
            >
              <span className="ulink">{l.label}</span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          ))
        )}
      </div>
    </article>
  );
}
