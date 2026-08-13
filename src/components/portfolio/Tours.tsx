import { projects, type Project } from "./data";
import { SectionHead } from "./Trail";

export function Tours() {
  return (
    <section id="tours" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHead
        index="03"
        title="Completed tours"
        sub="Production applications, live client websites and work still on the trail."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <TourCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function TourCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_30px_60px_-40px_oklch(0.4_0.1_148/0.9)]">
      <div className="grid-paper relative h-32 bg-paper">
        <svg viewBox="0 0 400 128" className="absolute inset-0 h-full w-full" aria-hidden>
          <path
            d="M-10 96C50 92 70 60 130 62C190 64 210 34 270 40C320 45 350 28 410 30"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            className="trail-dash"
          />
          <circle cx="130" cy="62" r="5" fill="var(--color-accent)" />
        </svg>
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
            {project.tag}
          </span>
          <span className="rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
            {project.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-bold">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.text}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Difficulty · {project.difficulty}
          </span>
          <div className="flex gap-3">
            {project.links.length === 0 ? (
              <span className="text-sm font-semibold text-accent-foreground">In active development</span>
            ) : (
              project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {l.label} →
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
