export const profile = {
  name: "Philipp Dachtler",
  role: "Fullstack Developer & IT System Integration",
  base: "Schifferstadt, Germany",
  email: "allgemein@philipp-dachtler.de",
  github: "https://github.com/nmmhw4cbc7-commits",
  githubUser: "nmmhw4cbc7-commits",
  intro:
    "I'm a 17-year-old developer from Schifferstadt, Germany.\n\nI build full-stack web and mobile software, somewhere between design, code, and figuring out how to make an idea actually work. I like clean software, thoughtful details, and building things that are genuinely useful.",
};

export const tourStats = [
  { label: "Home base", value: "Schifferstadt", unit: "Rhein-Neckar" },
  { label: "Apps shipped", value: "3", unit: "iOS + Android" },
  { label: "Primary stack", value: "Fullstack", unit: "+ Infrastructure" },
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
    text: "Secondary school certificate with a strong focus on technical fundamentals.",
  },
  {
    km: "KM 1",
    year: "Growth",
    kind: "Apprenticeship",
    title: "IT Specialist in System Integration",
    place: "Fachinformatiker · Mannheim",
    text: "Enterprise networks, hardware configuration, system architecture, and hands-on deployment.",
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
    title: "Advanced Fullstack & Cloud Engineering",
    place: "Cloud architecture · automation",
    text: "Expanding into automated workflows, scalable cloud infrastructure, and custom web applications.",
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
  icon: "leaf" | "compass" | "shield" | "mail" | "laptop";
};

export const projects: Project[] = [
  {
    tag: "Web Development",
    status: "Client project",
    title: "GaLaBau Diwold",
    text: "A custom-crafted web presence for a landscaping and gardening enterprise. Responsive layouts, calm modern design and a clear presentation of services.",
    links: [{ label: "GaLaBau Diwold", href: "https://galabau-diwold.de" }],
    difficulty: "Intermediate",
    stack: ["Web", "Responsive", "Design"],
    icon: "leaf",
  },
  {
    tag: "Flutter",
    status: "Published",
    title: "Jugendkompass",
    text: "A Christian companion app supporting daily faith life and community engagement, designed with care and shipped to both major stores.",
    links: [
      { label: "App Store", href: "https://apps.apple.com/de/app/jugendkompass/id1559123537" },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=io.stephanus.jugendkompass",
      },
    ],
    difficulty: "Expert",
    stack: ["Flutter", "Dart", "iOS", "Android"],
    icon: "compass",
  },
  {
    tag: "Flutter",
    status: "Published",
    title: "Lime Adblocker",
    text: "A lightweight browser adblocker focused on performance and simplicity.",
    links: [{ label: "Lime Adblocker", href: "https://adblocker.philipp-dachtler.de" }],
    difficulty: "Intermediate",
    stack: ["Chrome Extension", "Cross-platform"],
    icon: "shield",
  },
  {
    tag: "Swift",
    status: "Published",
    title: "DynamicNotch",
    text: "A native macOS app that turns the MacBook notch into a dynamic, interactive space for media, notifications and quick actions.",
    links: [{ label: "DynamicNotch", href: "https://dynamicnotch.philipp-dachtler.de" }],
    difficulty: "Expert",
    stack: ["Native macOS App", "Swift", "SwiftUI"],
    icon: "laptop",
  },
];
