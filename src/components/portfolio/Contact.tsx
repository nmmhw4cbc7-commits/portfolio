import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "./data";
import { useXray } from "@/lib/xray";

const channels = [
  { label: "GitHub profile", href: profile.github },
  { label: "LinkedIn profile", href: profile.linkedin },
];

export function Contact() {
  const xray = useXray("Contact");
  return (
    <section
      {...xray}
      id="contact"
      className="mx-auto max-w-[1400px] px-4 pb-20 pt-28 sm:px-8 sm:pt-40"
    >
      <div className="t-mono flex items-center gap-3" data-reveal>
        <span className="text-accent">05</span>
        <span>Contact</span>
        <span
          data-reveal="rule"
          className="h-px w-16 bg-fg/40"
          style={{ "--d": "200ms" } as CSSProperties}
        />
      </div>

      <h2
        data-scroll="enter"
        className="mt-8 font-extrabold uppercase leading-[0.84] tracking-[-0.04em]"
        style={{
          // sized so the widest line ("next project" at full stretch) always fits: two lines, max
          fontSize: "clamp(1.7rem, 8.2vw, 8.75rem)",
          fontStretch: "calc(62% + var(--p, 0) * 56%)",
        }}
      >
        <span className="block whitespace-nowrap">Enter your</span>
        <span className="block whitespace-nowrap">
          next <span className="text-accent">project</span>
        </span>
      </h2>

      <div className="mt-16 grid gap-12 border-t border-fg pt-10 lg:grid-cols-12">
        <p className="t-body max-w-md text-muted lg:col-span-5" data-reveal>
          Have a project in mind or need help with full-stack development? Let's connect.
        </p>

        <div className="lg:col-span-7">
          <div data-reveal className="flex items-center gap-3 border-b border-rule pb-6">
            <a
              href={`mailto:${profile.email}`}
              className="group swap-host flex min-w-0 flex-1 items-center justify-between gap-4"
            >
              <span className="break-all text-[clamp(1.25rem,3.2vw,2.75rem)] font-bold leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                {profile.email}
              </span>
              <span
                data-magnetic
                className="grid size-12 shrink-0 place-items-center overflow-hidden bg-accent text-on-accent"
              >
                <ArrowUpRight className="arrow-swap size-5" />
              </span>
            </a>
            <CopyEmail />
          </div>

          <ul>
            {channels.map((c, i) => (
              <li key={c.label} data-reveal style={{ "--d": `${(i + 1) * 90}ms` } as CSSProperties}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  data-scramble-host
                  className="group swap-host flex items-center justify-between border-b border-rule py-5"
                >
                  <span className="t-title flex items-baseline gap-3 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3">
                    <span className="t-mono w-0 overflow-hidden text-accent opacity-0 transition-[width,opacity] duration-500 ease-[var(--ease-out)] group-hover:w-6 group-hover:opacity-100">
                      →
                    </span>
                    {c.label}
                  </span>
                  <ArrowUpRight className="arrow-swap size-6 text-muted transition-colors duration-500 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>

          <p className="t-mono mt-8 flex items-center gap-3 text-muted" data-reveal>
            <span className="live-dot" />
            {profile.base}
          </p>
        </div>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      aria-label="Copy email address"
      className="relative grid size-12 shrink-0 place-items-center border border-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
    >
      {copied ? <Check className="size-5 text-accent" /> : <Copy className="size-5" />}
      <span
        aria-live="polite"
        className={`t-mono pointer-events-none absolute -top-8 right-0 whitespace-nowrap bg-fg px-2 py-1 text-bg transition-[opacity,translate] duration-300 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {copied ? "copied to clipboard" : ""}
      </span>
    </button>
  );
}

function BuildStamp() {
  const { sha, date } = __BUILD__;
  const day = date.slice(0, 10);
  if (!sha) return <span>build {day}</span>;
  return (
    <a
      href={`${profile.github}/portfolio/commit/${sha}`}
      target="_blank"
      rel="noreferrer"
      className="ulink tabular-nums normal-case"
      title="The commit this page was built from"
    >
      build {sha.slice(0, 7)} · {day}
    </a>
  );
}

export function Footer() {
  const xray = useXray("Footer");
  return (
    <footer {...xray} className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="t-mono flex flex-wrap items-center justify-between gap-3 py-6 text-muted">
          <span className="flex flex-wrap gap-x-4">
            <span>© {new Date().getFullYear()} Philipp Dachtler</span>
            <BuildStamp />
          </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("xray:toggle"))}
            className="group inline-flex items-center gap-2 uppercase transition-colors hover:text-fg"
          >
            <kbd className="border border-rule px-1.5 py-0.5 font-mono text-[0.7rem] group-hover:border-accent group-hover:text-accent">
              ⌥
            </kbd>
            <span>Hold for x-ray (or tap)</span>
          </button>
          <span>Designed &amp; built by Philipp Dachtler, Co-Authored by Claude Code</span>
        </div>
      </div>
    </footer>
  );
}
