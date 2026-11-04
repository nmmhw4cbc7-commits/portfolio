// Theme switch as a sunset / moonrise.
//
// One viewport-sized body sweeps across the page per switch: to dark, a giant
// crescent moon rises from the bottom left, crosses the whole page and leaves
// on the right; to light, the sun does the same.
//
// With View Transitions, the new theme is revealed exactly along the centre
// of the arriving body: the mask edge and the body share one easing curve and
// both move linearly in it, so they stay locked together for the whole sweep.
// The sky layer has its own transition name so the wipe doesn't mask it.

const DURATION = 1500;
const BEZIER = [0.3, 0, 0.3, 1] as const;
const EASE = `cubic-bezier(${BEZIER.join(", ")})`;

// The same curve as EASE, evaluated in JS, so the body's sampled path and the
// CSS mask wipe stay in lockstep. Solves x(t) = time by Newton, then returns y.
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x,
    bx = 3 * (p2x - p1x) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * p1y,
    by = 3 * (p2y - p1y) - cy,
    ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (time: number) => {
    let t = time;
    for (let i = 0; i < 8; i++) {
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - time) / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
}
const ease = cubicBezier(...BEZIER);

type VTDocument = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

export function switchTheme(toDark: boolean, apply: () => void) {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return apply();

  const doc = document as VTDocument;
  const geo = geometry();
  if (doc.startViewTransition) {
    const root = document.documentElement;
    // the wipe in styles.css reads these, so it lines up with the arriving body
    const W = 2 * geo.vw + geo.D + 4 * geo.margin;
    root.style.setProperty("--sky-w", `${W}px`);
    root.style.setProperty("--sky-e", `${geo.D * 0.18}px`);
    root.style.setProperty("--sky-p0", `${geo.x0 - W / 2}px`);
    root.style.setProperty("--sky-p1", `${geo.x1 - W / 2}px`);
    root.style.setProperty("--sky-t", `${DURATION}ms`);
    root.style.setProperty("--sky-ease", EASE);
    root.dataset["sky"] = toDark ? "dusk" : "dawn";
    const t = doc.startViewTransition(() => {
      apply();
      playSky(toDark, geo); // mounted inside the update so it gets its own layer
    });
    void t.finished.finally(() => delete root.dataset["sky"]);
  } else {
    playSky(toDark, geo);
    apply();
  }
}

type Geo = ReturnType<typeof geometry>;

function geometry() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const D = Math.round(Math.max(vh * 1.05, vw * 0.55)); // as big as the screen
  const margin = 40;
  return { vw, vh, D, margin, x0: -D / 2 - margin, x1: vw + D / 2 + margin };
}

function el(css: Partial<CSSStyleDeclaration>, parent?: HTMLElement) {
  const e = document.createElement("div");
  Object.assign(e.style, css);
  parent?.appendChild(e);
  return e;
}

const SUN = {
  borderRadius: "50%",
  background:
    "radial-gradient(circle at 42% 40%, #ffd9b5 0%, #ff9a52 30%, #ff5a12 62%, #ff4d00 72%)",
  boxShadow: "0 0 120px 40px rgb(255 77 0 / 0.35), 0 0 320px 120px rgb(255 120 40 / 0.16)",
};

function moonStyle(D: number) {
  // a crescent: transparent disc whose inset shadow draws the lit sliver
  return {
    borderRadius: "50%",
    boxShadow: `inset ${D * 0.2}px ${-D * 0.06}px 0 0 #ece8df`,
    filter: "drop-shadow(0 0 60px rgb(236 232 223 / 0.35))",
  };
}

function body(D: number, style: Partial<CSSStyleDeclaration>, parent: HTMLElement) {
  const wrap = el({ position: "absolute", left: "0", top: "0", width: "0", height: "0" }, parent);
  el(
    {
      position: "absolute",
      width: `${D}px`,
      height: `${D}px`,
      left: `${-D / 2}px`,
      top: `${-D / 2}px`,
      ...style,
    },
    wrap,
  );
  return wrap;
}

function playSky(toDark: boolean, { vw, vh, D, margin, x0, x1 }: Geo) {
  const layer = el({
    position: "fixed",
    inset: "0",
    zIndex: "95",
    pointerEvents: "none",
    overflow: "hidden",
  });
  layer.setAttribute("aria-hidden", "true");
  layer.className = "sky-layer";

  // stars only appear on the way into the night, behind the moon
  if (toDark) {
    for (let i = 0; i < 40; i++) {
      const s = Math.random() < 0.2 ? 3 : 2;
      const left = Math.random() * 100;
      const star = el(
        {
          position: "absolute",
          left: `${left}%`,
          top: `${Math.random() * 70}%`,
          width: `${s}px`,
          height: `${s}px`,
          borderRadius: "50%",
          background: "#ece8df",
          opacity: "0",
        },
        layer,
      );
      // each star lights up roughly when the night edge passes over it
      star.animate([{ opacity: 0 }, { opacity: 0.95, offset: 0.5 }, { opacity: 0 }], {
        duration: 1400,
        delay: 250 + (left / 100) * DURATION * 0.75,
        fill: "forwards",
        easing: "ease-out",
      });
    }
  }

  const mid = vh * 0.5;

  // the body rides one clean parabola: low on the left, highest at the centre,
  // low again on the right. Positions are sampled densely from the eased
  // progress and played back linearly, so there is no per-axis easing that
  // could make the path wobble.
  const orb = body(D, toDark ? moonStyle(D) : SUN, layer);
  const edgeY = mid + D * 0.42;
  const peakY = mid - D * 0.04;
  const half = (x1 - x0) / 2;
  const centre = (x0 + x1) / 2;
  const STEPS = 90;
  const frames: Keyframe[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const x = x0 + (x1 - x0) * ease(t);
    const u = (x - centre) / half; // -1 … 1
    const y = peakY + (edgeY - peakY) * u * u;
    frames.push({ transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`, offset: t });
  }
  orb.animate(frames, { duration: DURATION, easing: "linear", fill: "forwards" });

  document.body.appendChild(layer);
  layer
    .animate([{ opacity: 1 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], {
      duration: DURATION + 200,
      fill: "forwards",
    })
    .finished.then(() => layer.remove())
    .catch(() => layer.remove());
}
