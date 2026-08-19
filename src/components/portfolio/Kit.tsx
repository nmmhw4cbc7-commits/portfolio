import { kit } from "./data";
import { SectionHead } from "./Trail";

export function Kit() {
  return (
    <section id="kit" className="border-y border-border bg-paper py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHead
          title="The toolkit"
          sub="Systems engineering, languages and modern frameworks — honestly rated, nothing padded."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {kit.map((g) => (
            <div key={g.group} className="border-t border-foreground pt-5">
              <h3 className="font-display text-xl font-bold text-foreground">{g.group}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>
              <ul className="mt-6 space-y-5">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-semibold">{it.name}</span>
                      <span className="text-xs text-muted-foreground">{it.tag}</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-secondary">
                      <div className="h-full bg-foreground" style={{ width: `${it.level}%` }} />
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
