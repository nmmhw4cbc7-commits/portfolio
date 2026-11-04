import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, Copy, RotateCw } from "lucide-react";
import { SectionHead } from "./Trail";
import { useXray } from "@/lib/xray";

/*
 * "On the wire": three things measured live in the visitor's browser.
 *  1. Latency: real round trips to /api/ping, compared with what the speed of
 *     light in fibre allows for the distance involved.
 *  2. The curl edition of the site.
 *  3. A traceroute-style breakdown of how this very page load went.
 */

// Light in optical fibre: c / ~1.47 ≈ 204 km per millisecond.
const FIBER_KM_PER_MS = 204;
const HOME = { lat: 49.38, lon: 8.37, name: "Schifferstadt" };

// Vercel regions/edge PoPs (code → city + coordinates).
const REGIONS: Record<string, { city: string; lat: number; lon: number }> = {
  arn1: { city: "Stockholm", lat: 59.65, lon: 17.93 },
  bom1: { city: "Mumbai", lat: 19.09, lon: 72.87 },
  cdg1: { city: "Paris", lat: 49.01, lon: 2.55 },
  cle1: { city: "Cleveland", lat: 41.41, lon: -81.85 },
  cpt1: { city: "Cape Town", lat: -33.97, lon: 18.6 },
  dub1: { city: "Dublin", lat: 53.43, lon: -6.25 },
  dxb1: { city: "Dubai", lat: 25.25, lon: 55.36 },
  fra1: { city: "Frankfurt", lat: 50.03, lon: 8.57 },
  gru1: { city: "São Paulo", lat: -23.43, lon: -46.47 },
  hkg1: { city: "Hong Kong", lat: 22.31, lon: 113.91 },
  hnd1: { city: "Tokyo", lat: 35.55, lon: 139.78 },
  iad1: { city: "Washington, D.C.", lat: 38.95, lon: -77.45 },
  icn1: { city: "Seoul", lat: 37.46, lon: 126.44 },
  kix1: { city: "Osaka", lat: 34.43, lon: 135.23 },
  lhr1: { city: "London", lat: 51.47, lon: -0.45 },
  pdx1: { city: "Portland", lat: 45.59, lon: -122.6 },
  sfo1: { city: "San Francisco", lat: 37.62, lon: -122.38 },
  sin1: { city: "Singapore", lat: 1.36, lon: 103.99 },
  syd1: { city: "Sydney", lat: -33.94, lon: 151.18 },
  yul1: { city: "Montréal", lat: 45.47, lon: -73.74 },
};

type Where = {
  lat: number | null;
  lon: number | null;
  city: string | null;
  country: string | null;
  region: string | null;
  edge: string | null;
};

function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const ms = (v: number) => (v < 10 ? v.toFixed(1) : Math.round(v).toString());
const km = (v: number) => Math.round(v).toLocaleString("en-US");

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setSeen(true), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

/* ------------------------------------------------------------------ latency */

const SAMPLES = 8;

function Latency() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const [where, setWhere] = useState<Where | null>(null);
  const [samples, setSamples] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const [failed, setFailed] = useState(false);
  const [host, setHost] = useState("");
  useEffect(() => setHost(location.host), []);

  const run = useCallback(async () => {
    setRunning(true);
    setFailed(false);
    setSamples([]);
    try {
      // first request also warms the connection, so pings measure only the round trip
      const res = await fetch("/api/whereami", { cache: "no-store" });
      if (res.ok) setWhere((await res.json()) as Where);
      for (let i = 0; i < SAMPLES; i++) {
        const t0 = performance.now();
        await fetch(`/api/ping?n=${i}&t=${Date.now()}`, { cache: "no-store" });
        const rtt = performance.now() - t0;
        setSamples((s) => [...s, rtt]);
      }
    } catch {
      setFailed(true);
    } finally {
      setRunning(false);
    }
  }, []);

  useEffect(() => {
    if (seen) void run();
  }, [seen, run]);

  const best = samples.length ? Math.min(...samples) : null;
  const worst = samples.length ? Math.max(...samples) : 1;
  const me = where?.lat != null && where.lon != null ? { lat: where.lat, lon: where.lon } : null;
  const region = where?.region ? REGIONS[where.region] : undefined;
  const edge = where?.edge ? REGIONS[where.edge] : undefined;

  const toServer = me && region ? haversineKm(me, region) : null;
  const toHome = me ? haversineKm(me, HOME) : null;
  const idealServer = toServer != null ? (2 * toServer) / FIBER_KM_PER_MS : null;

  return (
    <div ref={ref} className="flex flex-col border border-fg p-5 sm:p-8">
      <div className="t-mono flex items-center justify-between gap-4">
        <span>
          <span className="text-accent">$</span> ping {host}
        </span>
        <button
          type="button"
          onClick={() => void run()}
          disabled={running}
          className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent disabled:opacity-40"
        >
          <RotateCw className={`size-3.5 ${running ? "animate-spin" : ""}`} /> Rerun
        </button>
      </div>

      <div className="mt-8 flex items-end gap-4">
        <span className="text-[clamp(3.5rem,9vw,7rem)] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums">
          {best != null ? ms(best) : "—"}
        </span>
        <span className="t-mono pb-1 text-muted">
          ms round trip · best of {samples.length || SAMPLES}
        </span>
      </div>

      {/* one bar per sample */}
      <div className="mt-6 flex h-12 items-end gap-1" aria-hidden>
        {Array.from({ length: SAMPLES }, (_, i) => {
          const s = samples[i];
          return (
            <span
              key={i}
              className={`flex-1 transition-[height] duration-300 ${s != null && s === best ? "bg-accent" : "bg-fg/25"}`}
              style={{ height: s != null ? `${Math.max(6, (s / worst) * 100)}%` : "2px" }}
            />
          );
        })}
      </div>

      <div className="t-body mt-8 space-y-3 text-muted">
        {failed && <p>Couldn't reach the probe endpoint. Offline, or a strict content blocker?</p>}

        {best != null && (
          <p>
            <span className="text-fg">Physics check:</span> in {ms(best)} ms light in fibre covers{" "}
            {km(best * FIBER_KM_PER_MS)} km, so whatever answered is at most{" "}
            <span className="text-fg">{km((best / 2) * FIBER_KM_PER_MS)} km</span> from you. No
            server can be further away than that, whatever its address says.
          </p>
        )}

        {best != null && region && (
          <p>
            You {where?.city ? <>connected from {where.city}</> : "connected"}
            {edge ? (
              <>
                {" "}
                to Vercel's edge in {edge.city} ({where?.edge}), which handed the request to the
                function in{" "}
              </>
            ) : (
              <> to the function in </>
            )}
            <span className="text-fg">
              {region.city} ({where?.region})
            </span>
            {toServer != null && idealServer != null && (
              <>
                , {km(toServer)} km away. A perfect straight fibre would need {ms(idealServer)} ms.
                Yours took {ms(best)}, so the packets ran at{" "}
                <span className="text-fg">
                  {Math.round((idealServer / best) * 100)}% of the speed limit
                </span>
                . The rest is routing detours, queues and the server itself.
              </>
            )}
          </p>
        )}

        {toHome != null && (
          <p>
            My desk in {HOME.name} is {km(toHome)} km from you: even a perfect line couldn't get a
            reply from there in under{" "}
            <span className="text-fg">{ms((2 * toHome) / FIBER_KM_PER_MS)} ms</span>.
          </p>
        )}

        {best != null && !me && !running && (
          <p className="t-mono">
            No geo headers here (local or non-Vercel deploy), so only the physics bound applies.
          </p>
        )}
      </div>

      <p className="t-mono mt-auto pt-8 text-muted">
        Measured in your browser · location from your IP via Vercel's edge, never stored
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- curl */

const CURL = "curl -sL philipp-dachtler.de";

function Curl() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the text is selectable anyway */
    }
  };

  return (
    <div className="flex w-full flex-col bg-fg p-5 text-bg sm:p-8">
      <span className="t-mono opacity-60">Terminal edition</span>
      <h3 className="t-title mt-6">This site speaks curl.</h3>
      <p className="t-body mt-4 opacity-70">
        The server looks at who's asking. Browsers get this page. Terminals (curl, wget, httpie) get
        a hand-built, ANSI-coloured version of the whole portfolio, rendered from the same data with
        zero JavaScript.
      </p>

      <button
        type="button"
        onClick={() => void copy()}
        className="group mt-8 flex items-center justify-between gap-4 border border-bg/30 px-4 py-4 text-left font-mono text-sm transition-colors hover:border-accent"
      >
        <span className="select-all break-all">
          <span className="text-accent">$ </span>
          {CURL}
        </span>
        {copied ? (
          <Check className="size-4 shrink-0 text-accent" />
        ) : (
          <Copy className="size-4 shrink-0 opacity-60 group-hover:text-accent group-hover:opacity-100" />
        )}
      </button>

      <p className="t-mono mt-auto pt-8 opacity-60">
        No terminal?{" "}
        <a href="/index.txt" className="ulink" target="_blank" rel="noreferrer">
          Read the plain-text version
        </a>
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- page trace */

type Hop = { name: string; start: number; dur: number; note?: string };
type Host = {
  host: string;
  count: number;
  bytes: number;
  hidden: number;
  third: boolean;
  proto: string;
};
type Trace = {
  hops: Hop[];
  total: number;
  hosts: Host[];
  requests: number;
  bytes: number;
  proto: string;
  cached: boolean;
};

function readTrace(): Trace | null {
  const nav = performance.getEntriesByType("navigation")[0] as
    PerformanceNavigationTiming | undefined;
  if (!nav) return null;

  const tlsStart = nav.secureConnectionStart > 0 ? nav.secureConnectionStart : nav.connectEnd;
  const hydrated = performance.getEntriesByName("app:hydrated")[0]?.startTime;

  const hops: Hop[] = [
    { name: "redirect", start: nav.redirectStart, dur: nav.redirectEnd - nav.redirectStart },
    {
      name: "dns lookup",
      start: nav.domainLookupStart,
      dur: nav.domainLookupEnd - nav.domainLookupStart,
    },
    { name: "tcp connect", start: nav.connectStart, dur: tlsStart - nav.connectStart },
    { name: "tls handshake", start: tlsStart, dur: nav.connectEnd - tlsStart },
    {
      name: "server (ttfb)",
      start: nav.requestStart,
      dur: nav.responseStart - nav.requestStart,
      note: "SSR",
    },
    { name: "html download", start: nav.responseStart, dur: nav.responseEnd - nav.responseStart },
    {
      name: "parse → interactive",
      start: nav.responseEnd,
      dur: nav.domInteractive - nav.responseEnd,
    },
    {
      name: "domcontentloaded",
      start: nav.domInteractive,
      dur: nav.domContentLoadedEventEnd - nav.domInteractive,
    },
    {
      name: "load event",
      start: nav.domContentLoadedEventEnd,
      dur: Math.max(0, nav.loadEventEnd - nav.domContentLoadedEventEnd),
    },
  ];
  if (hydrated) hops.push({ name: "react hydrated", start: hydrated, dur: 0, note: "mark" });

  const own = location.host;
  const map = new Map<string, Host>();
  let bytes = nav.transferSize;
  const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  for (const r of resources) {
    let host = own;
    try {
      host = new URL(r.name).host;
    } catch {
      /* data: urls etc. */
    }
    const h = map.get(host) ?? {
      host,
      count: 0,
      bytes: 0,
      hidden: 0,
      third: host !== own,
      proto: r.nextHopProtocol,
    };
    h.count += 1;
    h.bytes += r.transferSize;
    if (r.transferSize === 0 && r.decodedBodySize === 0) h.hidden += 1;
    if (r.nextHopProtocol) h.proto = r.nextHopProtocol;
    bytes += r.transferSize;
    map.set(host, h);
  }

  const total = Math.max(nav.loadEventEnd, hydrated ?? 0, ...hops.map((h) => h.start + h.dur));
  return {
    hops: hops.map((h) => ({ ...h, start: Math.max(0, h.start), dur: Math.max(0, h.dur) })),
    total,
    hosts: [...map.values()].sort((a, b) => Number(a.third) - Number(b.third) || b.count - a.count),
    requests: resources.length + 1,
    bytes,
    proto: nav.nextHopProtocol || "?",
    cached: nav.transferSize === 0,
  };
}

const kb = (b: number) =>
  b >= 1_000_000 ? `${(b / 1_000_000).toFixed(2)} MB` : `${(b / 1000).toFixed(1)} kB`;

function PageTrace() {
  const [trace, setTrace] = useState<Trace | null>(null);

  useEffect(() => {
    const read = () => setTimeout(() => setTrace(readTrace()), 0);
    if (document.readyState === "complete") read();
    else window.addEventListener("load", read, { once: true });
    return () => window.removeEventListener("load", read);
  }, []);

  if (!trace) {
    return (
      <div className="t-mono mt-6 border border-rule p-6 text-muted">
        waiting for the load event…
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden border border-fg">
      <div className="t-mono flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-fg bg-bg-2 px-4 py-3 sm:px-6">
        <span>
          <span className="text-accent">$</span> traceroute --this-page-load
        </span>
        <span className="text-muted">
          {trace.proto} · {trace.requests} requests · {kb(trace.bytes)} over the wire
          {trace.cached ? " · html from cache" : ""}
        </span>
      </div>

      <ol className="font-mono text-[0.78rem] leading-tight">
        {trace.hops.map((h, i) => (
          <li
            key={h.name}
            className="grid grid-cols-[1.75rem_1fr_4.5rem] items-center gap-x-3 border-b border-rule px-4 py-2.5 last:border-b-0 sm:grid-cols-[2rem_11rem_1fr_5rem] sm:px-6"
          >
            <span className="text-muted">{String(i + 1).padStart(2, " ")}</span>
            <span className={h.dur === 0 && !h.note ? "text-muted" : undefined}>
              {h.name}
              {h.note && <span className="text-muted"> · {h.note}</span>}
            </span>
            <span className="relative col-span-3 row-start-2 mt-2 h-1.5 bg-rule sm:col-span-1 sm:row-start-auto sm:mt-0">
              <span
                className="absolute inset-y-0 min-w-[2px] bg-accent"
                style={{
                  left: `${(h.start / trace.total) * 100}%`,
                  width: `${(h.dur / trace.total) * 100}%`,
                }}
              />
            </span>
            <span className="col-start-3 row-start-1 text-right tabular-nums sm:col-start-auto sm:row-start-auto">
              {h.note === "mark" ? `@${ms(h.start)}` : h.dur === 0 ? "*" : ms(h.dur)} ms
            </span>
          </li>
        ))}
      </ol>

      <div className="border-t border-fg">
        {trace.hosts.map((h) => (
          <div
            key={h.host}
            className="t-mono flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule px-4 py-2.5 last:border-b-0 sm:px-6"
          >
            <span className="normal-case">
              <span className={h.third ? "text-muted" : "text-accent"}>
                {h.third ? "3rd" : "1st"}
              </span>{" "}
              {h.host}
            </span>
            <span className="text-muted">
              {h.count} req ·{" "}
              {h.hidden === h.count && h.third
                ? "size hidden (no timing-allow-origin)"
                : kb(h.bytes)}
              {h.proto ? ` · ${h.proto}` : ""}
            </span>
          </div>
        ))}
      </div>

      <p className="t-mono border-t border-fg bg-bg-2 px-4 py-3 text-muted sm:px-6">
        Read from your browser's Navigation & Resource Timing APIs. "*" means the step was skipped
        (reused connection, cache).
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ section */

export function Wire() {
  const xray = useXray("Wire");
  return (
    <section {...xray} id="wire" className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-8 sm:pt-40">
      <SectionHead
        n="04"
        label="Wire"
        title="On the wire"
        sub="I run networks for a living, so here are real numbers from your connection to this page, measured just now."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <Latency />
        </div>
        <div className="flex lg:col-span-5" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
          <Curl />
        </div>
      </div>

      <div data-reveal className="mt-6">
        <PageTrace />
      </div>
    </section>
  );
}
