// Small interaction details, wired up once after hydration. No dependencies.
//
//  [data-scramble]  the element's text decodes through random glyphs on hover,
//                   like a terminal resolving a string. Only the existing text
//                   node's value is changed, so React's DOM stays intact.
//  [data-magnetic]  the element leans towards the pointer while hovered.
//  .btn             gets --mx / --my (pointer position in %) so the hover
//                   fill grows out of the exact spot the cursor entered.
//  console          a short note for whoever opens DevTools.

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-=+*#$%&";

function scramble(el: HTMLElement) {
  const node = [...el.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.nodeValue?.trim());
  if (!node) return;
  const target = (el.dataset["text"] ??= node.nodeValue ?? "");
  const running = Number(el.dataset["raf"] ?? 0);
  if (running) cancelAnimationFrame(running);

  const start = performance.now();
  const dur = 380 + target.length * 18;
  const step = (now: number) => {
    const t = (now - start) / dur;
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const ch = target[i] ?? "";
      // letters lock in from left to right, spaces never flicker
      out +=
        ch === " " || t > i / target.length + 0.15
          ? ch
          : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    node.nodeValue = out;
    if (t < 1.15) el.dataset["raf"] = String(requestAnimationFrame(step));
    else {
      node.nodeValue = target;
      el.dataset["raf"] = "0";
    }
  };
  el.dataset["raf"] = String(requestAnimationFrame(step));
}

const STRENGTH = 0.28;

export default function initDetails(): () => void {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof DocumentEventMap>(
    type: K,
    fn: (e: DocumentEventMap[K]) => void,
    opts?: AddEventListenerOptions,
  ) => {
    document.addEventListener(type, fn, opts);
    cleanups.push(() => document.removeEventListener(type, fn, opts));
  };

  // pointerover bubbles, so one listener covers elements rendered later too
  on("pointerover", (e) => {
    const target = e.target as Element | null;
    if (!target?.closest) return;
    const host = target.closest<HTMLElement>("[data-scramble-host], [data-scramble]");
    if (!host || reduce) return;
    const related = e.relatedTarget as Node | null;
    if (related && host.contains(related)) return; // moving inside the same element
    const items = host.matches("[data-scramble]")
      ? [host]
      : [...host.querySelectorAll<HTMLElement>("[data-scramble]")];
    items.forEach(scramble);
  });

  on(
    "pointermove",
    (e) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;

      const btn = target.closest<HTMLElement>(".btn");
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }

      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (mag && fine && !reduce) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.style.translate = `${dx * STRENGTH}px ${dy * STRENGTH * 1.3}px`;
        mag.dataset["pulled"] = "1";
      }
    },
    { passive: true },
  );

  on("pointerout", (e) => {
    const target = e.target as Element | null;
    const mag = target?.closest?.<HTMLElement>("[data-magnetic]");
    const related = e.relatedTarget as Node | null;
    if (mag && !(related && mag.contains(related))) {
      mag.style.translate = "";
      delete mag.dataset["pulled"];
    }
  });

  if (!sessionStorageFlag("greeted")) {
    console.log(
      "%c PD %c Looking under the hood? Hold ⌥ / Alt on the page for x-ray mode, or run: curl -sL philipp-dachtler.de",
      "background:#ff4d00;color:#131312;font-weight:800;padding:2px 4px",
      "font-family:monospace;padding-left:6px",
    );
  }

  return () => cleanups.forEach((fn) => fn());
}

function sessionStorageFlag(key: string): boolean {
  try {
    if (sessionStorage.getItem(key)) return true;
    sessionStorage.setItem(key, "1");
  } catch {
    /* storage blocked: greet anyway */
  }
  return false;
}
