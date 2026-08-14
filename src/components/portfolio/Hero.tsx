import { profile, tourStats } from "./data";

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-cream pb-24 pt-32 sm:pt-40">
      <div
        className="arc-gradient arc-glow pointer-events-none absolute -left-24 top-10 size-[26rem] rounded-full"
        aria-hidden
      />
      <div
        className="arc-gradient arc-glow pointer-events-none absolute -right-32 top-40 size-[30rem] rounded-full"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          Available for freelance &amp; collaborations
        </span>

        <h1 className="mt-7 font-display text-[clamp(2.6rem,7.5vw,5rem)] leading-[0.95] text-primary">
          Software that doesn't just
          <br />
          run — it <em className="not-italic underline decoration-accent decoration-[6px] underline-offset-[10px]">holds up</em>.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {profile.intro}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#tours"
            className="rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_44px_-20px_oklch(0.45_0.28_269)] transition-transform hover:scale-[1.03]"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-2xl border-2 border-primary bg-transparent px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
          </a>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {profile.base}
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl px-4">
        <BrowserCard />
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl px-4">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tourStats.map((s) => (
            <div key={s.label} className="rounded-2xl border-2 border-primary/15 bg-card px-5 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-extrabold text-primary">{s.value}</dd>
              <dd className="text-sm text-muted-foreground">{s.unit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function BrowserCard() {
  return (
    <div className="float-slow overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card p-2 shadow-[0_50px_100px_-60px_oklch(0.45_0.28_269/0.9)]">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="size-2.5 rounded-full bg-blush" />
        <span className="size-2.5 rounded-full bg-primary/50" />
        <span className="mx-auto rounded-lg bg-secondary px-4 py-1 font-mono text-[10px] tracking-wide text-secondary-foreground">
          philipp-dachtler.de
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-[200px_1fr]">
        <aside className="hidden rounded-2xl bg-secondary/60 p-4 sm:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Workspace
          </p>
          <ul className="mt-3 space-y-2 text-sm font-medium text-primary">
            {["Fullstack Web", "Flutter Mobile", "Infrastructure", "Client Work"].map((i) => (
              <li key={i} className="rounded-lg px-2 py-1.5 transition-colors hover:bg-card">
                {i}
              </li>
            ))}
          </ul>
        </aside>
        <div className="arc-gradient grain relative flex min-h-56 items-center justify-center rounded-2xl p-8">
          <p className="text-center font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-extrabold leading-tight text-primary-foreground">
            Fullstack developer
            <br />
            &amp; system integrator.
          </p>
        </div>
      </div>
    </div>
  );
}
