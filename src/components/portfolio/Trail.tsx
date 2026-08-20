import { stages } from "./data";

export function Trail() {
  return (
    <section id="route" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        title="The path so far"
        sub="Education, training and where things are heading — infrastructure on one side, software craft on the other."
      />

      <ol className="mt-12 grid gap-4">
        {stages.map((s) => (
          <li
            key={s.title}
            data-animate="scroll"
            className={`state-layer grid gap-4 rounded-lg p-6 sm:grid-cols-[200px_1fr] ${
              s.current
                ? "bg-primary-container text-on-primary-container"
                : "md-card-outlined text-on-surface"
            }`}
          >
            <div className="flex flex-row items-baseline gap-3 sm:flex-col sm:gap-2">
              <span className="title-medium">{s.year}</span>
              <span
                className={`md-chip ${s.current ? "" : "md-chip-tonal"} label-medium`}
              >
                {s.kind}
              </span>
            </div>
            <div>
              <h3 className="title-large">{s.title}</h3>
              <p
                className={`mt-1 body-medium ${
                  s.current ? "text-on-primary-container" : "text-on-surface-variant"
                }`}
              >
                {s.place}
              </p>
              <p
                className={`mt-3 max-w-2xl body-medium ${
                  s.current ? "text-on-primary-container" : "text-on-surface-variant"
                }`}
              >
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Philosophy
          title="Reliability & usability"
          text="I build with a strict focus on practicality. Rather than over-engineering, I make clean, user-centric tools that solve a real problem and keep working."
        />
        <Philosophy
          title="Two disciplines, one line"
          text="Enterprise infrastructure on one side, software craftsmanship on the other. Knowing both means the app and the network it runs on are planned together."
        />
      </div>
    </section>
  );
}

function Philosophy({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="md-card state-layer rounded-xl bg-surface-container p-6"
      data-animate="scroll"
    >
      <h4 className="title-large text-on-surface">{title}</h4>
      <p className="mt-3 body-medium text-on-surface-variant">{text}</p>
    </div>
  );
}

export function SectionHead({
  title,
  sub,
  invert,
}: {
  title: string;
  sub: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl" data-animate="scroll">
      <h2 className={`display-small ${invert ? "text-inverse-on-surface" : "text-on-surface"}`}>
        {title}
      </h2>
      <p
        className={`mt-4 body-large ${
          invert ? "text-inverse-on-surface" : "text-on-surface-variant"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}
