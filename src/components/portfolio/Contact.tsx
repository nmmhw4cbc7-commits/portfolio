import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "./data";

const channels = [
  { label: "GitHub profile", href: profile.github },
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/philipp-b22220421/" },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-4 pb-20 pt-28 sm:px-8 sm:pt-40">
      <div className="t-mono flex items-center gap-3" data-reveal>
        <span className="text-accent">04</span>
        <span>Contact</span>
        <span
          data-reveal="rule"
          className="h-px w-16 bg-fg/40"
          style={{ "--d": "200ms" } as CSSProperties}
        />
      </div>

      <h2
        data-scroll="enter"
        data-motion
        className="mt-8 font-extrabold uppercase leading-[0.84] tracking-[-0.04em]"
        style={{
          fontSize: "clamp(2.6rem, 8.6vw, 8.75rem)",
          fontStretch: "calc(62% + var(--p, 0) * 63%)",
          // stands up out of the page while it widens
          transform: "perspective(900px) rotateX(calc((1 - var(--p, 1)) * -70deg))",
          transformOrigin: "50% 100%",
        }}
      >
        <span className="block">Enter your</span>
        <span className="block">
          next <span className="text-accent">project</span>
        </span>
      </h2>

      <div className="mt-16 grid gap-12 border-t border-fg pt-10 lg:grid-cols-12">
        <p className="t-body max-w-md text-muted lg:col-span-5" data-reveal>
          Have a project in mind or need help with full-stack development? Let's connect.
        </p>

        <div className="lg:col-span-7">
          <a
            href={`mailto:${profile.email}`}
            data-reveal
            className="group flex items-center justify-between gap-4 border-b border-rule pb-6"
          >
            <span className="break-all text-[clamp(1.25rem,3.2vw,2.75rem)] font-bold leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
              {profile.email}
            </span>
            <span className="grid size-12 shrink-0 place-items-center bg-accent text-on-accent transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </a>

          <ul>
            {channels.map((c, i) => (
              <li key={c.label} data-reveal style={{ "--d": `${(i + 1) * 90}ms` } as CSSProperties}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border-b border-rule py-5"
                >
                  <span className="t-title transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3">
                    {c.label}
                  </span>
                  <ArrowUpRight className="size-6 text-muted transition-[transform,color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
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

export function Footer() {
  return (
    <footer data-scroll="end" className="overflow-hidden border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="overflow-hidden pt-10">
          <div
            aria-hidden
            data-motion
            className="select-none whitespace-nowrap text-[17.5vw] font-black uppercase leading-[0.78] tracking-[-0.06em] text-fg min-[1400px]:text-[15rem]"
            style={{ fontStretch: "75%", perspective: "800px" }}
          >
            {"Dachtler".split("").map((ch, i) => (
              <span
                key={i}
                data-motion
                className="inline-block"
                style={{
                  transform: `translate3d(0, calc((1 - var(--p, 1)) * ${90 + i * 14}%), 0) rotateX(calc((1 - var(--p, 1)) * -${70 + i * 4}deg))`,
                  transformOrigin: "50% 100%",
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
        <div className="t-mono flex flex-wrap items-center justify-between gap-3 border-t border-rule py-6 text-muted">
          <span>© {new Date().getFullYear()} Philipp Dachtler</span>
          <span>Planned, built and maintained solo and without AI</span>
        </div>
      </div>
    </footer>
  );
}
