import { kit } from "./data";
import { SectionHead } from "./Trail";

export function Kit() {
  return (
    <section id="kit" className="squiggle-top squiggle-bottom relative bg-cream py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHead
          index="02"
          title="The toolkit"
          sub="Systems engineering, languages and modern frameworks — honestly rated, nothing padded."
        />

        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {kit.map((g) => (
            <div key={g.group} className="rounded-3xl bg-card p-6">
              <h3 className="font-display text-xl font-extrabold text-primary">{g.group}</h3>
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
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                      <div className="arc-gradient h-full rounded-full" style={{ width: `${it.level}%` }} />
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
