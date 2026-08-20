import { kit } from "./data";
import { SectionHead } from "./Trail";

export function Kit() {
  return (
    <section id="kit" className="bg-surface-container-low py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          title="The toolkit"
          sub="Systems engineering, languages and modern frameworks — honestly rated, nothing padded."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kit.map((g) => (
            <div
              key={g.group}
              data-animate="scroll"
              className="md-card md-elev-1 state-layer rounded-xl p-6"
            >
              <h3 className="title-large text-on-surface">{g.group}</h3>
              <p className="mt-1 body-medium text-on-surface-variant">{g.note}</p>
              <ul className="mt-6 space-y-5">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="label-large text-on-surface">{it.name}</span>
                      <span className="label-medium text-on-surface-variant">{it.tag}</span>
                    </div>
                    <div className="md-progress-track mt-2" role="presentation">
                      <span
                        className="md-progress-indicator"
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
