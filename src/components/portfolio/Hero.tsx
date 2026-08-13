import { profile, tourStats } from "./data";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="topo pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-deep">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Available for freelance &amp; collaborations
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-extrabold leading-[0.95]">
            Every system
            <br />
            is a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">route</span>
              <svg
                className="absolute -bottom-2 left-0 z-0 w-full"
                height="14"
                viewBox="0 0 200 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 10C40 3 70 12 104 7C138 2 168 9 198 4"
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            worth
            <br />
            planning.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#tours"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_-16px_oklch(0.5_0.15_140)] transition-transform hover:scale-[1.03]"
            >
              View the tours
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Get in touch
            </a>
          </div>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {profile.base}
          </p>
        </div>

        <RouteCard />
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl px-4">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {tourStats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-6">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-bold">{s.value}</dd>
              <dd className="text-sm text-muted-foreground">{s.unit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RouteCard() {
  return (
    <div className="float-slow relative rounded-[2rem] border border-border bg-card p-3 shadow-[0_40px_80px_-50px_oklch(0.3_0.06_148/0.8)]">
      <div className="grid-paper relative overflow-hidden rounded-[1.5rem] bg-paper">
        <svg viewBox="0 0 400 300" className="w-full" role="img" aria-label="Route map of Philipp's path">
          <g stroke="var(--color-trail)" strokeOpacity="0.18" fill="none" strokeWidth="1.5">
            <path d="M-20 210C60 180 90 240 150 215C215 188 250 240 330 205C370 188 400 196 420 190" />
            <path d="M-20 240C60 212 100 268 165 244C230 220 265 268 340 236C378 220 402 228 420 222" />
            <path d="M-20 178C50 150 95 205 150 182C210 157 245 205 320 172C360 155 400 164 420 158" />
          </g>
          <path
            d="M40 250C70 250 78 190 110 182C150 172 156 118 196 112C236 106 250 76 286 70C316 65 330 52 360 46"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="4"
            strokeLinecap="round"
            className="draw-route"
          />
          <g fill="var(--color-card)" stroke="var(--color-primary)" strokeWidth="3">
            <circle cx="40" cy="250" r="7" />
            <circle cx="196" cy="112" r="6" />
          </g>
          <circle cx="360" cy="46" r="9" fill="var(--color-accent)" stroke="var(--color-card)" strokeWidth="3" />
          <text
            x="40"
            y="274"
            fill="var(--color-muted-foreground)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            START
          </text>
          <text
            x="316"
            y="30"
            fill="var(--color-muted-foreground)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            SUMMIT
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Current tour
          </p>
          <p className="font-display text-lg font-bold">Infrastructure → Fullstack</p>
        </div>
        <span className="rounded-full bg-accent/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
          On track
        </span>
      </div>
    </div>
  );
}
