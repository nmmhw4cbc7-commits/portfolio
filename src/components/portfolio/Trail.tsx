import { stages } from "./data";

export function Trail() {
  return (
    <section id="route" className="relative mx-auto max-w-5xl px-4 py-24">
      <SectionHead
        index="01"
        title="The route so far"
        sub="Career, training and where the line is heading. Read it like an elevation profile: the steep sections are where the learning happened."
      />

      <Elevation />

      <ol className="mt-12 space-y-3">
        {stages.map((s, i) => (
          <li
            key={s.title}
            className="group relative grid gap-4 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:grid-cols-[110px_1fr]"
          >
            <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
              <span
                className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-widest ${
                  s.current
                    ? "bg-primary text-primary-foreground"
                    : i === stages.length - 1
                      ? "bg-accent/25 text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                }`}
              >
                {s.km}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {s.year}
              </span>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{s.kind}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
              <p className="text-sm font-medium text-muted-foreground">{s.place}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.text}</p>
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
    <div className="rounded-3xl border border-primary/25 bg-primary/5 p-6">
      <h4 className="font-display text-lg font-bold">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function Elevation() {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Elevation profile
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          school → summit
        </p>
      </div>
      <svg viewBox="0 0 600 140" className="mt-3 w-full" aria-hidden>
        <defs>
          <linearGradient id="elev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0 120C60 118 90 96 140 92C190 88 205 60 260 58C315 56 330 44 390 46C450 48 470 24 520 18C560 13 580 10 600 8L600 140L0 140Z"
          fill="url(#elev)"
        />
        <path
          d="M0 120C60 118 90 96 140 92C190 88 205 60 260 58C315 56 330 44 390 46C450 48 470 24 520 18C560 13 580 10 600 8"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1="0" y1="139" x2="600" y2="139" stroke="var(--color-border)" strokeWidth="2" />
        {([
          [0, 120],
          [140, 92],
          [260, 58],
          [390, 46],
          [600, 8],
        ] as const).map(([x, y], i) => (
          <circle
            key={i}
            cx={Math.min(Math.max(x, 5), 595)}
            cy={y}
            r="5"
            fill="var(--color-card)"
            stroke={i === 4 ? "var(--color-accent)" : "var(--color-primary)"}
            strokeWidth="3"
          />
        ))}
      </svg>
    </div>
  );
}

export function SectionHead({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        {index} — waypoint
      </p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-tight">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>
    </div>
  );
}
