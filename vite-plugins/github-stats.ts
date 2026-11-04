import type { Plugin } from "vite";

/*
 * Build-time GitHub evidence.
 *
 * Exposes `virtual:github-stats`: bytes of code per language summed across the
 * user's public, non-fork repositories, straight from the GitHub API. The
 * request runs once per build (and once per dev-server start). If GitHub can't
 * be reached or the rate limit is hit, the module exports `null` and the page
 * simply leaves the panel out. A failed fetch never breaks the build.
 *
 * Unauthenticated calls are limited to 60/hour per IP, which is enough for one
 * build (1 + one per repo), but shared CI IPs can run out. Set GITHUB_TOKEN
 * (any token with public read access) in the build environment to avoid that.
 */

export type GithubStats = {
  user: string;
  collectedAt: string;
  repos: number;
  totalBytes: number;
  languages: { name: string; bytes: number; repos: number }[];
};

const VIRTUAL_ID = "virtual:github-stats";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

type Repo = { name: string; fork: boolean; languages_url: string };

export function githubStats(user: string): Plugin {
  let stats: Promise<GithubStats | null> | undefined;

  return {
    name: "github-stats",
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return undefined;
      stats ??= collect(user);
      return `export default ${JSON.stringify(await stats)};`;
    },
  };
}

async function collect(user: string): Promise<GithubStats | null> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "portfolio-build",
  };
  const token = process.env["GITHUB_TOKEN"];
  if (token) headers["authorization"] = `Bearer ${token}`;

  const get = async <T>(url: string): Promise<T> => {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    return (await res.json()) as T;
  };

  try {
    const repos: Repo[] = [];
    for (let page = 1; page <= 5; page++) {
      const batch = await get<Repo[]>(
        `https://api.github.com/users/${user}/repos?type=owner&per_page=100&page=${page}`,
      );
      if (!Array.isArray(batch)) throw new Error("unexpected repo list response");
      repos.push(...batch);
      if (batch.length < 100) break;
    }

    const own = repos.filter((r) => !r.fork);
    const perRepo = await Promise.all(own.map((r) => get<Record<string, number>>(r.languages_url)));

    const totals = new Map<string, { bytes: number; repos: number }>();
    for (const langs of perRepo) {
      for (const [name, bytes] of Object.entries(langs)) {
        const t = totals.get(name) ?? { bytes: 0, repos: 0 };
        t.bytes += bytes;
        t.repos += 1;
        totals.set(name, t);
      }
    }

    const languages = [...totals]
      .map(([name, t]) => ({ name, ...t }))
      .sort((a, b) => b.bytes - a.bytes);

    return {
      user,
      collectedAt: new Date().toISOString(),
      repos: own.length,
      totalBytes: languages.reduce((s, l) => s + l.bytes, 0),
      languages,
    };
  } catch (error) {
    console.warn(
      `[github-stats] skipped, the toolkit panel will be hidden: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
}
