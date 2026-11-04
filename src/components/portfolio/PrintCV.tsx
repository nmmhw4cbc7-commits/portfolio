import githubStats from "virtual:github-stats";
import { profile, projects, stages, toolkit } from "./data";

/*
 * One-page A4 CV, only rendered when printing (Ctrl/⌘ + P).
 * Built from the same data as the site, styled like it: Archivo + JetBrains
 * Mono, numbered sections, hairline rules, accent used sparingly.
 * The print rules in styles.css hide everything else on the page.
 */

const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Head({ n, label }: { n: string; label: string }) {
  return (
    <h2 className="cv-head">
      <span className="cv-accent">{n}</span> {label}
    </h2>
  );
}

export function PrintCV() {
  const [lead, ...rest] = profile.intro.split("\n\n");
  const langs = githubStats?.languages.slice(0, 5) ?? [];
  const total = githubStats?.totalBytes ?? 0;
  const sha = __BUILD__.sha?.slice(0, 7);

  return (
    <article id="cv" className="cv" aria-hidden>
      <header className="cv-top">
        <div>
          <p className="cv-mono cv-muted">Curriculum vitae</p>
          <h1 className="cv-name">{profile.name}</h1>
          <p className="cv-role">{profile.role}</p>
        </div>
        <dl className="cv-contact cv-mono">
          <dt>Mail</dt>
          <dd>{profile.email}</dd>
          <dt>Web</dt>
          <dd>{host(profile.website)}</dd>
          <dt>GitHub</dt>
          <dd>{host(profile.github)}</dd>
          <dt>LinkedIn</dt>
          <dd>{host(profile.linkedin)}</dd>
          <dt>Base</dt>
          <dd>{profile.base}</dd>
        </dl>
      </header>

      <section className="cv-intro">
        <p className="cv-lead">{lead}</p>
        {rest.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <div className="cv-grid">
        <div>
          <section>
            <Head n="01" label="Path" />
            <ol className="cv-path">
              {stages.map((s) => (
                <li key={s.title} className={s.current ? "is-current" : undefined}>
                  <span className="cv-dot" />
                  <div>
                    <p className="cv-mono cv-muted">
                      {s.year} / {s.kind}
                      {s.current && <span className="cv-accent"> · now</span>}
                    </p>
                    <h3>{s.title}</h3>
                    <p className="cv-mono cv-place">{s.place}</p>
                    <p className="cv-text">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div>
          <section>
            <Head n="02" label="Selected work" />
            <ol className="cv-work">
              {projects.map((p, i) => {
                // one site → its domain; store listings → the store names
                const where =
                  p.links.length === 1 && p.links[0]
                    ? host(p.links[0].href).split("/")[0]
                    : p.links.map((l) => l.label).join(" · ");
                return (
                  <li key={p.title}>
                    <p className="cv-mono cv-muted">
                      <span className="cv-accent">{String(i + 1).padStart(2, "0")}</span> {p.tag} ·{" "}
                      {p.status}
                    </p>
                    <h3>{p.title}</h3>
                    <p className="cv-text">{p.text}</p>
                    <p className="cv-mono cv-muted">
                      {p.stack.join(" · ")}
                      {where && <span className="cv-nowrap"> · {where}</span>}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <section>
            <Head n="03" label="Toolkit" />
            <dl className="cv-kit">
              {toolkit.map((g) => (
                <div key={g.label}>
                  <dt className="cv-mono cv-muted">{g.label}</dt>
                  <dd>{g.items.map((t) => t.name).join(" · ")}</dd>
                </div>
              ))}
            </dl>
            {langs.length > 0 && (
              <div className="cv-langs">
                <p className="cv-mono cv-muted">
                  Code on GitHub · {githubStats?.repos} public repos
                </p>
                {langs.map((l) => (
                  <div key={l.name} className="cv-bar">
                    <span className="cv-mono">{l.name}</span>
                    <span className="cv-track">
                      <span style={{ width: `${(l.bytes / (langs[0]?.bytes ?? 1)) * 100}%` }} />
                    </span>
                    <span className="cv-mono cv-muted">
                      {((l.bytes / total) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="cv-foot cv-mono cv-muted">
        <span>Printed from {host(profile.website)}</span>
        <span>
          {sha ? `build ${sha} · ` : ""}
          {__BUILD__.date.slice(0, 10)}
        </span>
      </footer>
    </article>
  );
}
