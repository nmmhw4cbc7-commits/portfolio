import { stages } from "./data";

export function Trail() {
  return (
    <section id="route" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHead
        title="The path so far"
        sub="Education, training and where things are heading — infrastructure on one side, software craft on the other."
      />

      <ol className="mt-12 border-t border-border">
        {stages.map((s) => (
          <li
            key={s.title}
            className={`grid gap-4 border-b border-border py-8 sm:grid-cols-[180px_1fr] ${
              s.current ? "bg-foreground px-6 text-background" : ""
            }`}
          >
            <div className="flex flex-row items-baseline gap-3 sm:flex-col sm:gap-1">
              <span className="font-display text-base font-bold">{s.year}</span>
              <span
                className={`text-xs ${s.current ? "text-background/70" : "text-muted-foreground"}`}
              >
                {s.kind}
              </span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p
                className={`text-sm font-medium ${
                  s.current ? "text-background/80" : "text-foreground"
                }`}
              >
                {s.place}
              </p>
              <p
                className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                  s.current ? "text-background/80" : "text-muted-foreground"
                }`}
              >
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
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
    <div className="border-l border-border pl-5">
      <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
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
    <div className="max-w-2xl">
      <h2
        className={`font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.1] ${
          invert ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-relaxed ${
          invert ? "text-background/80" : "text-muted-foreground"
        }`}
      >
        {sub}
      </p>
    </div>
  );
}
