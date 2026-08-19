import { profile } from "./data";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border bg-foreground py-24 text-background">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm text-background/70">Say hello</p>
        <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,5vw,3.25rem)] font-bold leading-[1.05] text-background">
          Enter <em className="not-italic underline decoration-2 underline-offset-[6px]">your</em> next project
        </h2>
        <p className="mt-5 max-w-xl text-lg text-background/80">
          Available for freelance projects, technical discussions and collaborative software
          development. Tell me where you want to go — I'll plan the way there.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="bg-background px-6 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-85"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="border border-background/70 px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-foreground"
          >
            GitHub profile
          </a>
        </div>

        <p className="mt-10 text-sm text-background/70">{profile.base}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t border-background/20 px-6 py-8 text-sm text-background/70">
        <span>© {new Date().getFullYear()} Philipp Dachtler</span>
        <span>Planned, built and maintained solo</span>
      </div>
    </footer>
  );
}
