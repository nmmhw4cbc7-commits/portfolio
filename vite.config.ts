import { execSync } from "node:child_process";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { githubStats } from "./vite-plugins/github-stats.ts";

// Which commit this build came from, shown in the footer. Vercel provides it as
// an env var; locally we ask git; anywhere else it's simply left out.
function commitSha(): string | null {
  if (process.env["VERCEL_GIT_COMMIT_SHA"]) return process.env["VERCEL_GIT_COMMIT_SHA"];
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  vite: {
    plugins: [githubStats("nmmhw4cbc7-commits")],
    define: {
      __BUILD__: JSON.stringify({ sha: commitSha(), date: new Date().toISOString() }),
    },
    server: {
      host: true,
      allowedHosts: true,
    },
  },
});
