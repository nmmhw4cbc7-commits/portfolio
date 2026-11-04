import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { isTerminalClient, renderTerminalPage } from "./lib/terminal";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

const noStore = { "cache-control": "no-store", "access-control-allow-origin": "*" };

// Tiny endpoints behind the "On the wire" section, plus the curl edition.
// They run before the app so they stay fast: the latency probe should measure
// the network, not React rendering.
function handleSpecialRoutes(request: Request): Response | undefined {
  const url = new URL(request.url);

  if (url.pathname === "/api/ping") {
    return new Response(null, { status: 204, headers: { ...noStore, "timing-allow-origin": "*" } });
  }

  if (url.pathname === "/api/whereami") {
    // Vercel's edge geolocates the client IP and forwards it as headers.
    // Nothing here is stored or logged; it is echoed back to the visitor only.
    const h = request.headers;
    const num = (v: string | null) => (v && Number.isFinite(Number(v)) ? Number(v) : null);
    const body = {
      lat: num(h.get("x-vercel-ip-latitude")),
      lon: num(h.get("x-vercel-ip-longitude")),
      city: h.get("x-vercel-ip-city") ? decodeURIComponent(h.get("x-vercel-ip-city")!) : null,
      country: h.get("x-vercel-ip-country"),
      region: (typeof process !== "undefined" && process.env["VERCEL_REGION"]) || null,
      edge: h.get("x-vercel-id")?.split("::")[0] ?? null,
    };
    return Response.json(body, { headers: noStore });
  }

  if ((url.pathname === "/" || url.pathname === "/index.txt") && request.method === "GET") {
    if (url.pathname === "/index.txt" || isTerminalClient(request)) {
      const plain = url.searchParams.has("plain") || url.pathname === "/index.txt";
      return new Response(renderTerminalPage(!plain), {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          vary: "user-agent, accept",
          ...noStore,
        },
      });
    }
  }

  return undefined;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const special = handleSpecialRoutes(request);
      if (special) return special;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
