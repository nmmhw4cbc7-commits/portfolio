import { Leaf, Compass, ShieldCheck, Mail } from "lucide-react";
import { projects, type Project } from "./data";
import { SectionHead } from "./Trail";

const icons = { leaf: Leaf, compass: Compass, shield: ShieldCheck, mail: Mail };

export function Tours() {
  return (
    <section id="tours" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHead
        title="Selected work"
        sub="Production applications, live client websites and things still in the making."
      />

      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
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
    <article className="flex flex-col bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {project.tag}
          </span>
          <span className="border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {project.status}
          </span>
        </div>
        <Icon className="size-6 shrink-0 text-foreground" strokeWidth={1.8} aria-hidden />
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.text}</p>

        <p className="mt-5 text-sm text-muted-foreground">{project.stack.join(" · ")}</p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Level · {project.difficulty}</span>
          <div className="flex gap-3">
            {project.links.length === 0 ? (
              <span className="text-sm font-semibold text-foreground">In active development</span>
            ) : (
              project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-foreground underline underline-offset-4"
                >
                  {l.label}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
