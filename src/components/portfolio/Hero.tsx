import { profile, tourStats } from "./data";

export function Hero() {
  return (
    <section id="top" className="border-b border-border bg-background pb-20 pt-32 sm:pt-36">
      <div className="mx-auto max-w-5xl px-6">
        <span className="inline-flex items-center gap-2 border border-border px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-foreground" />
          Available for freelance &amp; collaborations
        </span>

        <h1 className="mt-8 max-w-3xl font-display text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.05] text-foreground">
          Software that doesn't just run — <em className="not-italic underline decoration-2 underline-offset-[6px]">it holds up</em>.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {profile.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#tours"
            className="bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="border border-foreground px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Get in touch
          </a>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{profile.base}</p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-6">
        <dl className="grid grid-cols-2 border-t border-l border-border md:grid-cols-4">
          {tourStats.map((s) => (
            <div key={s.label} className="border-b border-r border-border px-5 py-6">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</dd>
              <dd className="text-sm text-muted-foreground">{s.unit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
