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

const DURATION = 2000;
const EASE = "cubic-bezier(0.3, 0, 0.3, 1)";

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
  // outer node moves on x, inner node on y, so x stays affine in the easing
  const x = el({ position: "absolute", left: "0", top: "0", width: "0", height: "0" }, parent);
  const y = el({ position: "absolute", left: "0", top: "0", width: "0", height: "0" }, x);
  el(
    {
      position: "absolute",
      width: `${D}px`,
      height: `${D}px`,
      left: `${-D / 2}px`,
      top: `${-D / 2}px`,
      ...style,
    },
    y,
  );
  return { x, y };
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

  // the body: rises from the bottom left, crosses the whole page, exits right
  const arriving = body(D, toDark ? moonStyle(D) : SUN, layer);
  arriving.x.animate([{ transform: `translateX(${x0}px)` }, { transform: `translateX(${x1}px)` }], {
    duration: DURATION,
    easing: EASE,
    fill: "forwards",
  });
  arriving.y.animate(
    [
      { transform: `translateY(${mid + D * 0.45}px)` },
      { transform: `translateY(${mid - D * 0.05}px)`, offset: 0.5 },
      { transform: `translateY(${mid + D * 0.2}px)` },
    ],
    { duration: DURATION, easing: "ease-in-out", fill: "forwards" },
  );

  document.body.appendChild(layer);
  layer
    .animate([{ opacity: 1 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], {
      duration: DURATION + 200,
      fill: "forwards",
    })
    .finished.then(() => layer.remove())
    .catch(() => layer.remove());
}
