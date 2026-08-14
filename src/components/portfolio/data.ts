export const profile = {
  name: "Philipp Dachtler",
  role: "Fullstack Developer & IT System Integration",
  base: "Schifferstadt · Mannheim, Germany",
  email: "allgemein@philipp-dachtler.de",
  github: "https://github.com/",
  intro:
    "I plan systems the way you plan a tour: know the terrain, pick a clean line, build something that holds up when the weather turns. Fullstack web apps, cross-platform mobile software and the ne[...]",
};

export const tourStats = [
  { label: "Home base", value: "Mannheim", unit: "Rhein-Neckar" },
  { label: "Apps shipped", value: "3", unit: "iOS + Android" },
  { label: "Main terrain", value: "Fullstack", unit: "+ Infrastructure" },
  { label: "Status", value: "Open", unit: "for collaborations" },
];

export type Stage = {
  km: string;
  year: string;
  kind: string;
  title: string;
  place: string;
  text: string;
  current?: boolean;
};

export const stages: Stage[] = [
  {
    km: "KM 0",
    year: "Start",
    kind: "Education",
    title: "Mittlere Reife",
    place: "Secondary school certificate",
    text: "The trailhead. Solid academic base that pointed straight into technical vocational training.",
  },
  {
    km: "KM 1",
    year: "Ascent",
    kind: "Apprenticeship",
    title: "IT Specialist in System Integration",
    place: "Fachinformatiker · Mannheim",
    text: "System architecture, enterprise networks, hardware configuration and deployment — the steep part where the fundamentals get built.",
  },
  {
    km: "KM 2",
    year: "Now",
    kind: "Current role",
    title: "Network Administration",
    place: "Berrang Holding · Infrastructure",
    text: "Running local IT infrastructure, network configuration and hardware rollouts for a live enterprise environment.",
    current: true,
  },
  {
    km: "KM 3",
    year: "Parallel",
    kind: "Craft",
    title: "Shipping software in the open",
    place: "Flutter · React · Swift",
    text: "Published mobile apps, commercial client websites and fullstack tools built alongside the day job.",
  },
  {
    km: "SUMMIT",
    year: "Next",
    kind: "Trajectory",
    title: "High-tier Fullstack Engineering",
    place: "Cloud architecture · automation",
    text: "Deeper into advanced cloud architectures and automated workflows, with client web development as the second rope.",
  },
];

export type Project = {
  tag: string;
  status: string;
  title: string;
  text: string;
  links: { label: string; href: string }[];
  difficulty: "Easy" | "Intermediate" | "Expert";
  stack: string[];
};

export const projects: Project[] = [
  {
    tag: "Web Development",
    status: "Client project",
    title: "GaLaBau Diwold",
    text: "A custom-crafted web presence for a landscaping and gardening enterprise. Responsive layouts, calm modern design and a clear presentation of services.",
    links: [{ label: "galabau-diwold.de", href: "https://galabau-diwold.de" }],
    difficulty: "Intermediate",
    stack: ["Web", "Responsive", "Design"],
  },
  {
    tag: "Flutter",
    status: "Published",
    title: "Jugendkompass",
    text: "A Christian companion app supporting daily faith life and community engagement, designed with care and shipped to both major stores.",
    links: [
      { label: "App Store", href: "#" },
      { label: "Play Store", href: "#" },
    ],
    difficulty: "Expert",
    stack: ["Flutter", "Dart", "iOS", "Android"],
  },
  {
    tag: "Flutter",
    status: "Published",
    title: "Lime Adblocker",
    text: "A lightweight browser adblocker focused on performance and simplicity.",
    links: [
      { label: "Lime Adblocker", href: "https://adblocker-lime.vercel.app/" },
    ],
    difficulty: "Intermediate",
    stack: ["Chrome Extension", "Cross-platform"],
  },
  {
    tag: "Fullstack",
    status: "In progress",
    title: "Unified Email",
    text: "One lightning-fast inbox that folds multiple email accounts and providers into a single clean interface. Currently in active development.",
    links: [],
    difficulty: "Expert",
    stack: ["Fullstack", "Node.js", "TypeScript"],
  },
];

export type Kit = { group: string; note: string; items: { name: string; level: number; tag: string }[] };

export const kit: Kit[] = [
  {
    group: "Languages",
    note: "What the tools are written in",
    items: [
      { name: "JavaScript", level: 70, tag: "Intermediate" },
      { name: "TypeScript", level: 68, tag: "Intermediate" },
      { name: "Python", level: 62, tag: "Intermediate" },
      { name: "Java", level: 58, tag: "Intermediate" },
      { name: "C#", level: 55, tag: "Intermediate" },
    ],
  },
  {
    group: "Frameworks",
    note: "The gear I reach for first",
    items: [
      { name: "Flutter", level: 90, tag: "Advanced" },
      { name: "React", level: 70, tag: "Intermediate" },
      { name: "Node.js", level: 66, tag: "Intermediate" },
      { name: "Swift", level: 60, tag: "Intermediate" },
      { name: "Docker", level: 58, tag: "Intermediate" },
    ],
  },
  {
    group: "Systems & Ops",
    note: "The ground everything stands on",
    items: [
      { name: "Windsurf / macOS", level: 95, tag: "Expert" },
      { name: "Networking & Routing", level: 74, tag: "Hands-on" },
      { name: "Linux / Unix", level: 66, tag: "Intermediate" },
      { name: "Git & GitHub", level: 72, tag: "Intermediate" },
      { name: "Cloud Deployment", level: 60, tag: "Intermediate" },
    ],
  },
];
