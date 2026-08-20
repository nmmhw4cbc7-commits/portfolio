import { SectionHead } from "./Trail";

export function Kit() {
  const languages = [
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "Java", icon: "devicon-java-plain" },
    { name: "C#", icon: "devicon-csharp-plain" },
  ];

  const frameworks = [
    { name: "React", icon: "devicon-react-original" },
    { name: "Flutter", icon: "devicon-flutter-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Swift", icon: "devicon-swift-plain" },
    { name: "Docker", icon: "devicon-docker-plain" },
  ];

  const systems = [
    { name: "macOS", icon: "devicon-apple-original" },
    { name: "Linux", icon: "devicon-linux-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "VS Code", icon: "devicon-vscode-plain" },
  ];

  const allTechs = [...languages, ...frameworks, ...systems];
  const doubled = [...allTechs, ...allTechs];

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
              animation: scroll 30s linear infinite;
            }
            .scroll-banner:hover {
              animation-play-state: paused;
            }
            .devicon {
              font-size: 1.75rem;
            }
          `}</style>

          <div className="scroll-banner flex gap-6 whitespace-nowrap px-4">
            {doubled.map((tech, idx) => (
              <div
                key={idx}
                className="md-chip md-chip-tonal label-medium shrink-0 flex items-center gap-3 px-4 py-2"
              >
                <i className={`devicon ${tech.icon} colored`}></i>
                <span className="text-on-surface">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
