import type { CSSProperties } from "react";
import githubStats from "virtual:github-stats";
import { SectionHead } from "./Trail";
import { profile } from "./data";
import { useXray } from "@/lib/xray";

type Tech = { name: string; icon: string };

const languages: Tech[] = [
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "TypeScript", icon: "devicon-typescript-plain" },
  { name: "Python", icon: "devicon-python-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "C#", icon: "devicon-csharp-plain" },
];

const frameworks: Tech[] = [
  { name: "React", icon: "devicon-react-original" },
  { name: "Flutter", icon: "devicon-flutter-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain" },
  { name: "Swift", icon: "devicon-swift-plain" },
  { name: "Docker", icon: "devicon-docker-plain" },
];

const systems: Tech[] = [
  { name: "macOS", icon: "devicon-apple-original" },
  { name: "Linux", icon: "devicon-linux-plain" },
  { name: "Git", icon: "devicon-git-plain" },
  { name: "VS Code", icon: "devicon-vscode-plain" },
];

const groups = [
  { label: "Languages", items: languages },
  { label: "Frameworks", items: frameworks },
  { label: "Systems", items: systems },
];

function Item({ name, icon, outline }: Tech & { outline?: boolean | undefined }) {
  return (
    <span className="group flex shrink-0 items-center gap-5 px-6 sm:px-10">
      <i
        className={`devicon ${icon} text-[clamp(1.75rem,3.5vw,3rem)] transition-colors duration-300 group-hover:text-accent`}
        aria-hidden="true"
      />
      <span
        className={`text-[clamp(2.75rem,7.5vw,7rem)] font-extrabold leading-none tracking-[-0.045em] transition-colors duration-300 [font-stretch:115%] ${
          outline ? "outline-text fill-on-hover group-hover:text-accent" : "group-hover:text-accent"
        }`}
      >
        {name}
      </span>
      <span className="ml-5 size-2 rotate-45 bg-accent sm:ml-10" aria-hidden />
    </span>
  );
}

function Row({
  items,
  shift,
  speed,
  reverse,
  outline,
}: {
  items: Tech[];
  shift: string;
  speed: string;
  reverse?: boolean;
  outline?: boolean;
}) {
  return (
    <div data-motion style={{ transform: `${shift} skewX(calc(var(--v, 0) * -16deg))` }}>
      <div
        className={`marquee ${reverse ? "reverse" : ""}`}
        style={{ "--speed": speed } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1 || undefined}>
            {items.map((t, i) => (
              <Item key={`${t.name}-${i}`} {...t} outline={outline} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const kb = (bytes: number) =>
  bytes >= 1_000_000
    ? `${(bytes / 1_000_000).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1000))} kB`;

/*
 * Measured, not estimated: bytes of code per language across my public
 * repositories, collected from the GitHub API when the site is built.
 */
function Evidence() {
  const xray = useXray("Evidence");
  if (!githubStats || githubStats.languages.length === 0) return null;
  const { languages, totalBytes, repos, collectedAt } = githubStats;
  const top = languages.slice(0, 8);
  const rest = languages.slice(8);
  const restBytes = rest.reduce((s, l) => s + l.bytes, 0);
  const max = top[0]?.bytes ?? 1;
  const date = collectedAt.slice(0, 10);

  return (
    <div {...xray} className="mx-auto mt-24 max-w-[1400px] px-4 sm:mt-32 sm:px-8">
      <div
        data-reveal
        className="t-mono flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-bg/30 pb-3"
      >
        <span>
          <span className="text-accent">$</span> github linguist · {repos} public repos ·{" "}
          {kb(totalBytes)} of code
        </span>
        <a href={profile.github} target="_blank" rel="noreferrer" className="ulink opacity-60">
          measured at build · {date}
        </a>
      </div>

      <ol className="t-mono">
        {top.map((l, i) => {
          const share = (l.bytes / totalBytes) * 100;
          return (
            <li
              key={l.name}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as CSSProperties}
              className="group grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 gap-y-2 border-b border-bg/15 py-3 sm:grid-cols-[2rem_11rem_1fr_6rem_6rem_5rem]"
            >
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="normal-case">{l.name}</span>
              <span className="col-span-3 col-start-1 row-start-2 h-2 bg-bg/10 sm:col-span-1 sm:col-start-auto sm:row-start-auto">
                <span
                  className="block h-full bg-accent transition-[filter] duration-300 group-hover:brightness-125"
                  style={{ width: `${(l.bytes / max) * 100}%` }}
                />
              </span>
              <span className="text-right">{share < 0.1 ? "<0.1" : share.toFixed(1)}%</span>
              <span className="hidden text-right opacity-60 sm:block">{kb(l.bytes)}</span>
              <span className="hidden text-right opacity-60 sm:block">
                {l.repos} repo{l.repos === 1 ? "" : "s"}
              </span>
            </li>
          );
        })}
      </ol>
      {rest.length > 0 && (
        <p className="t-mono mt-3 opacity-60" data-reveal>
          + {rest.length} more ({rest.map((l) => l.name).join(", ")}) · {kb(restBytes)}
        </p>
      )}
    </div>
  );
}

export function Kit() {
  const xray = useXray("Kit");
  return (
    <section
      {...xray}
      id="kit"
      data-scroll="through"
      className="overflow-hidden bg-fg py-24 text-bg sm:py-36"
    >
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css"
      />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead
            n="02"
            label="Toolkit"
            title="The toolkit"
            sub="Languages, frameworks and systems that power my work."
            invert
          />
        </div>
        <ul className="t-mono self-end lg:col-span-5">
          {groups.map((g, i) => (
            <li
              key={g.label}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as CSSProperties}
              className="flex flex-col gap-1 border-t border-bg/20 py-3 sm:flex-row sm:justify-between sm:gap-6"
            >
              <span className="opacity-60">{g.label}</span>
              <span className="sm:text-right">{g.items.map((t) => t.name).join(" · ")}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* the rows roll like a drum as the section passes */}
      <div
        data-motion
        className="mt-20 space-y-4 sm:mt-28"
        style={{
          transform: "perspective(900px) rotateX(calc((0.55 - var(--p, 0.55)) * 70deg))",
        }}
      >
        <Row
          items={[...languages, ...frameworks]}
          shift="translate3d(calc(var(--p, 0) * -18%), 0, 0)"
          speed="70s"
        />
        <Row
          items={[...systems, ...systems]}
          shift="translate3d(calc(-18% + var(--p, 0) * 18%), 0, 0)"
          speed="55s"
          reverse
          outline
        />
      </div>

      <Evidence />
    </section>
  );
}
