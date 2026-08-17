import { Leaf, Compass, ShieldCheck, Mail } from "lucide-react";
import { projects, type Project } from "./data";
import { SectionHead } from "./Trail";

const icons = { leaf: Leaf, compass: Compass, shield: ShieldCheck, mail: Mail };


export function Tours() {
  return (
    <section id="tours" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHead
        index="03"
        title="Selected work"
        sub="Production applications, live client websites and things still in the making."
      />

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {projects.map((p) => (
          <TourCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}

function TourCard({ project }: { project: Project }) {
  const Icon = icons[project.icon];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-primary/12 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_36px_70px_-50px_oklch(0.45_0.28_269)]">
      <div className="arc-gradient grain relative h-32 p-4">
        <div className="flex gap-2">
          <span className="rounded-full bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
            {project.tag}
          </span>
          <span className="rounded-full border border-primary-foreground/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
            {project.status}
          </span>
        </div>
        <div className="absolute bottom-4 right-5 flex size-12 items-center justify-center rounded-2xl bg-card/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-6 text-primary-foreground" strokeWidth={2.2} aria-hidden />
        </div>
      </div>


      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-extrabold text-primary">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.text}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-primary/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Level · {project.difficulty}
          </span>
          <div className="flex gap-3">
            {project.links.length === 0 ? (
              <span className="text-sm font-semibold text-accent">In active development</span>
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
