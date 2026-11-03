import type { CSSProperties } from "react";
import { SectionHead } from "./Trail";

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
    <div data-motion style={{ transform: shift }}>
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

export function Kit() {
  return (
    <section
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

      <div className="mt-20 space-y-4 sm:mt-28">
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
    </section>
  );
}
