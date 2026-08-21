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

function TechCard({ name, icon }: Tech) {
  return (
    <div className="md-card mx-2 flex w-24 shrink-0 flex-col items-center justify-center gap-2 px-3 py-4">
      <i className={`devicon ${icon} colored`} aria-hidden="true" />
      <span className="label-medium text-on-surface">{name}</span>
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-3 flex shrink-0 items-center" aria-hidden="true">
      <div className="h-12 w-px bg-outline-variant" />
    </div>
  );
}

function TechGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-stretch" aria-hidden={hidden || undefined}>
      {languages.map((tech) => (
        <TechCard key={`lang-${tech.name}`} {...tech} />
      ))}
      {frameworks.map((tech) => (
        <TechCard key={`fw-${tech.name}`} {...tech} />
      ))}
      <Divider />
      {systems.map((tech) => (
        <TechCard key={`sys-${tech.name}`} {...tech} />
      ))}
    </div>
  );
}

export function Kit() {
  return (
    <section id="kit" className="bg-surface-container-low py-20 sm:py-24">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          title="The toolkit"
          sub="Languages, frameworks and systems that power my work."
        />

        <div className="relative mt-12 overflow-hidden rounded-xl bg-surface-container py-12">
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .scroll-banner {
              animation: scroll 38s linear infinite;
              width: max-content;
            }
            .scroll-banner:hover {
              animation-play-state: paused;
            }
            .scroll-banner .devicon {
              font-size: 1.4rem;
              line-height: 1;
            }
          `}</style>

          <div className="scroll-banner flex px-4">
            <TechGroup />
            <TechGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
