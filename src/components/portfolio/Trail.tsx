import type { CSSProperties } from "react";
import { stages } from "./data";

export function Trail() {
  return (
    <section id="route" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              n="01"
              label="Path"
              title="Education"
              sub="Education, training and where things are heading — infrastructure on one side, software craft on the other."
            />
          </div>
        </div>

        <ol data-scroll="center" className="relative lg:col-span-7">
          {/* the track and its live fill */}
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-rule" />
          <span
            aria-hidden
            data-motion
            className="absolute bottom-2 left-[6.5px] top-2 w-[2px] origin-top bg-accent"
            style={{ transform: "scaleY(var(--p, 0))" }}
          />

          {stages.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              className="relative grid grid-cols-[15px_1fr] gap-6 pb-14 last:pb-0 sm:gap-10"
            >
              <span className="relative mt-1.5 grid size-[15px] place-items-center bg-bg">
                {s.current ? (
                  <span className="live-dot" />
                ) : (
                  <span className="size-[7px] rotate-45 border border-fg bg-bg" />
                )}
              </span>

              <div
                className={
                  s.current ? "-ml-4 bg-fg py-6 pl-4 pr-4 text-bg sm:-ml-6 sm:pl-6 sm:pr-6" : ""
                }
              >
                <div className="t-mono flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-accent">0{i + 1}</span>
                  <span>{s.year}</span>
                  <span className={s.current ? "opacity-60" : "text-muted"}>/ {s.kind}</span>
                </div>
                <h3 className="t-title mt-4">{s.title}</h3>
                <p className={`t-mono mt-3 normal-case ${s.current ? "opacity-60" : "text-muted"}`}>
                  {s.place}
                </p>
                <p className={`t-body mt-4 max-w-xl ${s.current ? "opacity-80" : "text-muted"}`}>
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-24 grid border-t border-fg md:grid-cols-2 sm:mt-32">
        <Philosophy
          mark="A"
          title="Reliability & usability"
          text="Focused on pragmatism and stability. I build clean, efficient software that solves practical problems without unnecessary complexity."
        />
        <Philosophy
          mark="B"
          title="Infrastructure & Code"
          text="Combining system integration with modern software development. Understanding both ensures applications run reliably on solid infrastructure."
          delay={120}
        />
      </div>
    </section>
  );
}

function Philosophy({
  mark,
  title,
  text,
  delay = 0,
}: {
  mark: string;
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      style={{ "--d": `${delay}ms` } as CSSProperties}
      className="group border-b border-rule py-10 md:border-b-0 md:pr-12 md:even:border-l md:even:pl-12"
    >
      <span className="t-mono text-muted">Principle {mark}</span>
      <h4 className="t-title mt-6 transition-colors duration-300 group-hover:text-accent">
        {title}
      </h4>
      <p className="t-body mt-4 max-w-md text-muted">{text}</p>
    </div>
  );
}

export function SectionHead({
  n,
  label,
  title,
  sub,
  invert,
}: {
  n: string;
  label: string;
  title: string;
  sub: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <div className="t-mono flex items-center gap-3" data-reveal>
        <span className="text-accent">{n}</span>
        <span>{label}</span>
        <span
          data-reveal="rule"
          className={`h-px w-16 ${invert ? "bg-bg/40" : "bg-fg/40"}`}
          style={{ "--d": "200ms" } as CSSProperties}
        />
      </div>
      <h2 data-reveal="mask" className="t-display mt-6">
        <span className="mask">
          <span>{title}</span>
        </span>
      </h2>
      <p
        data-reveal
        style={{ "--d": "150ms" } as CSSProperties}
        className={`t-body mt-6 max-w-md ${invert ? "opacity-70" : "text-muted"}`}
      >
        {sub}
      </p>
    </div>
  );
}
