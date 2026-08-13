import { profile } from "./data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-paper py-24">
      <div className="topo pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">04 — trailhead</p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,3.6rem)] font-extrabold leading-tight">
          Got a route in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Available for freelance projects, technical discussions and collaborative software
          development. Send the destination — I'll plan the way there.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_-16px_oklch(0.5_0.15_140)] transition-transform hover:scale-[1.03]"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            GitHub profile
          </a>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {profile.base}
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} Philipp Dachtler</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
        Planned, built and maintained solo
      </span>
    </footer>
  );
}
