import { Kit } from "@/components/ui/kit-banner";

export function KitBanner() {
  const languages = [
    { name: "JavaScript", icon: "🟨" },
    { name: "TypeScript", icon: "🔵" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "C#", icon: "♯" },
  ];

  const frameworks = [
    { name: "React", icon: "⚛️" },
    { name: "Flutter", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "Swift", icon: "🍎" },
    { name: "Docker", icon: "🐳" },
  ];

  const systems = [
    { name: "macOS", icon: "🍎" },
    { name: "Linux", icon: "🐧" },
    { name: "Git", icon: "🌳" },
    { name: "Cloud", icon: "☁️" },
  ];

  const allTechs = [...languages, ...frameworks, ...systems];
  const doubled = [...allTechs, ...allTechs];

  return (
    <section className="overflow-hidden bg-surface py-12">
      <div className="relative">
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
        `}</style>
        
        <div className="scroll-banner flex gap-8 whitespace-nowrap">
          {doubled.map((tech, idx) => (
            <div
              key={idx}
              className="md-chip md-chip-tonal label-medium shrink-0 flex items-center gap-2"
            >
              <span className="text-lg">{tech.icon}</span>
              <span className="text-on-surface">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
