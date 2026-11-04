// Theme switch as a sunset / moonrise.
//
// Sun and moon sit on opposite ends of a huge invisible wheel whose hub is
// below the screen. Switching to dark turns the wheel half a revolution
// (east → west, like the real sky): the sun sinks off the right edge while
// the moon rises from the left. Switching back keeps turning the same way,
// so the moon sets and the sun comes up again.
//
// Where the browser supports View Transitions, the new theme also wipes in
// from the left behind the rising body while the page stays fully visible;
// the sky layer gets its own transition name so it isn't masked by the wipe.

const DURATION = 1500;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

export function switchTheme(toDark: boolean, apply: () => void) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return apply();

  const doc = document as VTDocument;
  if (doc.startViewTransition) {
    const root = document.documentElement;
    root.dataset["sky"] = toDark ? "dusk" : "dawn";
    const t = doc.startViewTransition(() => {
      apply();
      playSky(toDark); // mounted inside the update so it gets its own layer
    });
    void t.finished.finally(() => delete root.dataset["sky"]);
  } else {
    playSky(toDark);
    apply();
  }
}

function el(css: Partial<CSSStyleDeclaration>, parent?: HTMLElement) {
  const e = document.createElement("div");
  Object.assign(e.style, css);
  parent?.appendChild(e);
  return e;
}

function playSky(toDark: boolean) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // radius large enough that a body at 90° is past the screen edge
  const R = Math.max(vw * 0.62, vh * 0.85);
  const hubY = vh * 0.32 + R; // the body at the top of the wheel sits at 32% height
  const size = Math.round(Math.min(130, Math.max(76, vw * 0.08)));

  const layer = el({
    position: "fixed",
    inset: "0",
    zIndex: "95",
    pointerEvents: "none",
    overflow: "hidden",
  });
  layer.setAttribute("aria-hidden", "true");
  layer.className = "sky-layer";

  // stars only appear on the way into the night
  if (toDark) {
    for (let i = 0; i < 26; i++) {
      const s = Math.random() < 0.2 ? 3 : 2;
      const star = el(
        {
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 55}%`,
          width: `${s}px`,
          height: `${s}px`,
          borderRadius: "50%",
          background: "#ece8df",
          opacity: "0",
        },
        layer,
      );
      star.animate([{ opacity: 0 }, { opacity: 0.9, offset: 0.6 }, { opacity: 0.5 }], {
        duration: 900,
        delay: 500 + Math.random() * 700,
        fill: "forwards",
        easing: "ease-out",
      });
    }
  }

  const wheel = el(
    { position: "absolute", left: `${vw / 2}px`, top: `${hubY}px`, width: "0", height: "0" },
    layer,
  );

  const sun = el(
    {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      left: `${-size / 2}px`,
      top: `${-R - size / 2}px`,
      borderRadius: "50%",
      background: "radial-gradient(circle at 40% 38%, #ffd2a8 0%, #ff8a3d 38%, #ff4d00 72%)",
      boxShadow: "0 0 60px 18px rgb(255 77 0 / 0.45), 0 0 160px 60px rgb(255 120 40 / 0.18)",
    },
    wheel,
  );

  // the moon sits on the opposite end of the wheel; the crescent is an inset shadow
  const moon = el(
    {
      position: "absolute",
      width: `${size * 0.85}px`,
      height: `${size * 0.85}px`,
      left: `${(-size * 0.85) / 2}px`,
      top: `${R - (size * 0.85) / 2}px`,
      borderRadius: "50%",
      boxShadow: `inset ${size * 0.24}px ${-size * 0.08}px 0 0 #ece8df`,
      filter: "drop-shadow(0 0 22px rgb(236 232 223 / 0.45))",
      transform: "rotate(180deg)", // upright once the wheel has turned
    },
    wheel,
  );
  void sun;
  void moon;

  // light → dark: 0° → 180° (sun sets, moon rises); dark → light: 180° → 360°
  const from = toDark ? 0 : 180;
  wheel.animate([{ transform: `rotate(${from}deg)` }, { transform: `rotate(${from + 180}deg)` }], {
    duration: DURATION,
    easing: EASE,
    fill: "forwards",
  });

  document.body.appendChild(layer);
  layer
    .animate([{ opacity: 1 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }], {
      duration: DURATION + 700,
      fill: "forwards",
    })
    .finished.then(() => layer.remove())
    .catch(() => layer.remove());
}
