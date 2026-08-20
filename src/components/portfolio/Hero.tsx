import { ArrowDownRight, Mail } from "lucide-react";
import { profile, tourStats } from "./data";

export function Hero() {
  return (
    <section id="top" className="bg-surface pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mt-8 max-w-4xl display-large text-on-surface">
          Software that doesn't just run —{" "}
          <span className="text-primary">it holds up</span>.
        </h1>

        <p className="mt-6 max-w-2xl body-large text-on-surface-variant">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#tours" className="md-btn md-btn-filled state-layer">
            See the work
            <ArrowDownRight className="size-[18px]" />
          </a>
          <a href="#contact" className="md-btn md-btn-outlined state-layer">
            <Mail className="size-[18px]" />
            Get in touch
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tourStats.map((s) => (
            <div
              key={s.label}
              className="md-card state-layer p-6 text-on-surface"
              data-animate="scroll"
            >
              <dt className="label-medium text-on-surface-variant">{s.label}</dt>
              <dd className="mt-3 headline-small text-primary">{s.value}</dd>
              <dd className="mt-1 body-medium text-on-surface-variant">{s.unit}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
