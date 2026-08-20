import { Leaf, Compass, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "./data";
import { SectionHead } from "./Trail";

const icons = { leaf: Leaf, compass: Compass, shield: ShieldCheck, mail: Mail };

export function Tours() {
  return (
    <section id="tours" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        title="Selected work"
        sub="Production applications, live client websites and things still in the making."
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
  const Icon = icons[project.icon];
  return (
    <article
      data-animate="scroll"
      className="md-card md-elev-1 state-layer flex flex-col rounded-xl p-6 hover:md-elev-3"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="md-chip md-chip-tonal label-medium">{project.tag}</span>
          <span className="md-chip label-medium">{project.status}</span>
        </div>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-tertiary-container text-on-tertiary-container">
          <Icon className="size-7" strokeWidth={1.8} aria-hidden />
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="headline-small text-on-surface">{project.title}</h3>
        <p className="mt-3 flex-1 body-medium text-on-surface-variant">{project.text}</p>

        <p className="mt-5 label-medium text-on-surface-variant">{project.stack.join(" · ")}</p>

        <hr className="md-divider mt-5" />

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="label-medium text-on-surface-variant">
            Level · {project.difficulty}
          </span>
          <div className="flex flex-wrap gap-2">
            {project.links.length === 0 ? (
              <span className="md-chip md-chip-tonal label-medium">In active development</span>
            ) : (
              project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="md-btn md-btn-text state-layer"
                >
                  {l.label}
                  <ArrowUpRight className="size-[18px]" />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
