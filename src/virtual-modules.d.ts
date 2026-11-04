// Generated at build time by vite-plugins/github-stats.ts (null when GitHub was unreachable).
declare module "virtual:github-stats" {
  const stats: {
    user: string;
    collectedAt: string;
    repos: number;
    totalBytes: number;
    languages: { name: string; bytes: number; repos: number }[];
  } | null;
  export default stats;
}

// Injected by vite.config.ts at build time.
declare const __BUILD__: { sha: string | null; date: string };
