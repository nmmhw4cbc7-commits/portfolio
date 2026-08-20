import { profile } from "./data";
import { SectionHead } from "./Trail";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHead
        title="Enter your next project"
        sub="Available for freelance projects, technical discussions and collaborative software development. Tell me where you want to go — I'll plan the way there."
        invert={false}
      />

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="md-btn md-btn-filled state-layer"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="md-btn md-btn-outlined state-layer"
        >
          GitHub profile
        </a>
      </div>

      <p className="mt-10 label-large text-on-surface-variant">{profile.base}</p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container-high text-on-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-outline px-4 py-8 sm:px-6">
        <span className="label-medium text-on-surface-variant">© {new Date().getFullYear()} Philipp Dachtler</span>
        <span className="label-medium text-on-surface-variant">Planned, built and maintained solo</span>
      </div>
    </footer>
  );
}
