import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { githubStats } from "./vite-plugins/github-stats.ts";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  vite: {
    plugins: [githubStats("nmmhw4cbc7-commits")],
    server: {
      host: true,
      allowedHosts: true,
    },
  },
});
