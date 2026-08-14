import { profile } from "./data";

export function Contact() {
  return (
    <section
      id="contact"
      className="squiggle-top grain relative overflow-visible bg-primary py-28 text-primary-foreground"
    >
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary-foreground/70">
          04 — say hello
        </p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] font-extrabold leading-[1.02] text-primary-foreground">
          Enter <em className="not-italic underline decoration-blush decoration-[6px] underline-offset-[10px]">your</em> next project
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/80">
          Available for freelance projects, technical discussions and collaborative software
          development. Tell me where you want to go — I'll plan the way there.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-2xl bg-card px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border-2 border-primary-foreground/70 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
          >
            GitHub profile
          </a>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground/70">
          {profile.base}
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pb-10 text-sm text-primary-foreground/70">
        <span>© {new Date().getFullYear()} Philipp Dachtler</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
          Planned, built and maintained solo
        </span>
      </div>
    </footer>
  );
}
