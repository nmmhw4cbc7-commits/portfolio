import { stages } from "./data";

export function Trail() {
  return (
    <section id="route" className="mx-auto max-w-5xl px-4 py-24">
      <SectionHead
        index="01"
        title="The path so far"
        sub="Education, training and where things are heading — infrastructure on one side, software craft on the other."
      />

      <ol className="mt-12 space-y-3">
        {stages.map((s) => (
          <li
            key={s.title}
            className={`group grid gap-4 rounded-3xl border-2 p-6 transition-colors sm:grid-cols-[120px_1fr] ${
              s.current
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/12 bg-card hover:border-primary/40"
            }`}
          >
            <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
              <span
                className={`rounded-full border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${
                  s.current
                    ? "border-primary-foreground/50 text-primary-foreground"
                    : "border-primary/30 text-primary"
                }`}
              >
                {s.year}
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                  s.current ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {s.kind}
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold">{s.title}</h3>
              <p
                className={`text-sm font-medium ${
                  s.current ? "text-primary-foreground/80" : "text-primary"
                }`}
              >
                {s.place}
              </p>
              <p
                className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                  s.current ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
    <div className="rounded-3xl bg-cream p-6">
      <h4 className="font-display text-lg font-extrabold text-primary">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

export function SectionHead({
  index,
  title,
  sub,
  invert,
}: {
  index: string;
  title: string;
  sub: string;
  invert?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.24em] ${
          invert ? "text-primary-foreground/70" : "text-primary"
        }`}
      >
        {index} — chapter
      </p>
      <h2
        className={`mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.02] ${
          invert ? "text-primary-foreground" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-relaxed ${
          invert ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}
