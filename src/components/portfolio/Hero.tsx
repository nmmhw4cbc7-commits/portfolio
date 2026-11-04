import { useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { profile, tourStats } from "./data";
import { useXray } from "@/lib/xray";
import { Desk } from "./Desk";

const lines: { text: string; after?: string; shift: number; accent?: boolean }[] = [
  { text: "Turning good", shift: -6 },
  { text: "ideas into", shift: 9 },
  { text: "reliable", after: "software.", shift: -4, accent: true },
];

// Live wall-clock time in Schifferstadt. Renders a placeholder on the server
// so the markup hydrates cleanly, then ticks once per second.
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    now ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", ...opts }).format(now) : "";
  const time = now ? fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--:--";
  const zone = (now && fmt({ timeZoneName: "short" }).split(" ").pop()) || "CET";
  const hour = now ? Number(fmt({ hour: "2-digit", hour12: false })) : 12;
  const awake = hour >= 7 && hour < 23;
  return (
    <span
      className="inline-flex items-center gap-2 tabular-nums"
      title="Local time in Schifferstadt"
    >
      <span className={awake ? "live-dot" : "size-[0.55rem] rounded-full border border-muted"} />
      {time} {zone}
      <span className="hidden sm:inline">· {awake ? "probably coding" : "probably asleep"}</span>
    </span>
  );
}

export function Hero() {
  const intro = profile.intro.split("\n\n");
  const xray = useXray("Hero");

  return (
    <section {...xray} id="top" data-scroll="exit" className="relative pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div
          data-reveal
          className="t-mono flex flex-wrap justify-between gap-x-6 gap-y-1 text-muted"
        >
          <span>{profile.role}</span>
          <span className="flex flex-wrap gap-x-4">
            <span>{profile.base} — 49.38° N, 8.37° E</span>
            <LocalTime />
          </span>
        </div>

        <div className="mt-10 sm:mt-14 lg:grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-10">
          <h1
            data-reveal="mask"
            className="t-mega hero-slogan"
            style={{ "--d": "150ms", perspective: "900px" } as React.CSSProperties}
          >
            {lines.map((l, i) => (
              <span
                key={l.text}
                className="mask"
                data-motion
                style={{
                  // drift sideways and fold back into the page as you scroll away
                  transform: `translate3d(calc(var(--p, 0) * ${l.shift}vw), calc(var(--p, 0) * ${-i * 12}%), 0) rotateX(calc(var(--p, 0) * ${50 + i * 15}deg))`,
                  transformOrigin: "50% 100%",
                  ["--i" as string]: i,
                }}
              >
                <span className={l.accent ? "text-accent" : undefined}>
                  {l.text}
                  {l.after && (
                    <>
                      {/* on large screens the last line breaks in two to make room for the desk */}
                      <br className="hidden lg:inline" /> {l.after}
                    </>
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* desk scene beside the slogan, vertically centred on it */}
          <div className="pointer-events-none hidden aspect-[520/380] w-full lg:block">
            <Desk />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-rule pt-8 md:grid-cols-12">
          <div className="t-body max-w-xl space-y-4 text-muted md:col-span-7" data-reveal>
            {intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-fg" : undefined}>
                {p}
              </p>
            ))}
          </div>

          <div
            className="flex flex-wrap items-start gap-3 md:col-span-5 md:justify-end"
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            <a href="#tours" className="btn btn-solid" data-magnetic data-scramble-host>
              <span data-scramble>See the work</span>
              <ArrowDownRight className="arrow-dr size-4" />
            </a>
            <a href="#contact" className="btn" data-magnetic data-scramble-host>
              <span data-scramble>Get in touch</span>
            </a>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4">
          {tourStats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="group relative border-t border-rule py-6 pr-4 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="absolute left-0 top-[-1px] h-[2px] w-0 bg-accent transition-[width] duration-500 ease-out group-hover:w-full" />
              <dt className="t-mono flex gap-2 text-muted">
                <span className="text-accent">0{i + 1}</span>
                {s.label}
              </dt>
              <dd className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-0.04em] [font-stretch:110%]">
                {s.value}
              </dd>
              <dd className="mt-2 text-sm text-muted">{s.unit}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Band />
    </section>
  );
}

function Band() {
  const words = ["Fullstack Developer", "IT System Integration", "Flutter", "React", "Swift"];
  const row = [...words, ...words];
  return (
    <div
      data-scroll="through"
      aria-hidden
      className="relative mt-8 overflow-hidden border-y border-rule py-5 sm:mt-12"
    >
      <div
        data-motion
        data-v
        className="flex w-max items-center whitespace-nowrap"
        style={{
          transform:
            "translate3d(calc(var(--p, 0) * -35%), 0, 0) skewX(calc(var(--v, 0) * -14deg))",
        }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.04em] [font-stretch:120%] ${
                i % 2 ? "outline-text text-fg/70" : ""
              }`}
            >
              {w}
            </span>
            <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-accent">✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}
