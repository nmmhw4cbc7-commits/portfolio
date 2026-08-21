<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebashing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Base44 dev environment

This is a TanStack Start (Vite + React + TypeScript) frontend-only portfolio. No
backend, database, or external-service credentials are required.

### Running locally (Base44)

```bash
docker compose -f docker-compose.base44.yml up -d
```

- Web entry point is exposed on host port **3000** (Vite dev server, live reload).
- The container uses `oven/bun:1`, bind-mounts the repo, runs `bun install` then
  `bun run dev --host 0.0.0.0 --port 3000`.
- Healthcheck: `GET /` returns 200.

### Vite host config note

`vite.config.ts` uses `@lovable.dev/vite-tanstack-config`'s `defineConfig`. Because
the config object contains a `tanstackStart` key, the wrapper treats the whole
object as its `options` and only merges the `vite` sub-key into the Vite config —
a top-level `server` key is silently ignored. The dev-server host/allowedHosts
settings therefore live under `vite.server` (with `host: true` and
`allowedHosts: true`) so the preview's external hostname is accepted.

### Verify it works

```bash
curl -sf -H "Host: external-preview.example.com" http://localhost:3000/
```
