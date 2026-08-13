import { kit } from "./data";
import { SectionHead } from "./Trail";

export function Kit() {
  return (
    <section id="kit" className="relative border-y border-border bg-paper py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHead
          index="02"
          title="What's in the pack"
          sub="A balanced kit spanning systems engineering, languages and modern frameworks — carried honestly, no padding."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {kit.map((g) => (
            <div key={g.group} className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold">{g.group}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
              <ul className="mt-6 space-y-5">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {it.tag}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${it.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
