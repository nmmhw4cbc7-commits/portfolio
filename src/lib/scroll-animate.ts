// Tiny scroll engine, no dependencies.
//
// 1. `data-reveal` elements get `.is-in` once they enter the viewport.
// 2. `data-scroll` elements get a live `--p` CSS variable (0 → 1) describing
//    how far the page has scrolled through them. CSS turns that into motion.
//      data-scroll="through" : 0 when its top hits the viewport bottom,
//                              1 when its bottom leaves the viewport top
//      data-scroll="exit"    : 0 while its top is at the viewport top,
//                              1 once it has scrolled fully out
//      data-scroll="pin"     : 0 → 1 across a tall section with a sticky child
//      data-scroll="center"  : 0 → 1 as the element passes the viewport middle
//      data-scroll="end"     : 0 when its top hits the viewport bottom,
//                              1 once it is fully on screen (good for footers)
//      data-scroll="enter"   : 0 when its top hits the viewport bottom,
//                              1 when its top reaches the viewport middle
// 3. `--page` on <html> is overall page progress.

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export default function initScrollAnimations(): (() => void) | void {
  if (typeof window === "undefined") return;

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  let observer: IntersectionObserver | undefined;
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    reveals.forEach((el) => observer!.observe(el));
  }

  const tracked = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
  const root = document.documentElement;
  let frame = 0;

  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    root.style.setProperty("--page", (max > 0 ? clamp(window.scrollY / max) : 0).toFixed(4));

    for (const el of tracked) {
      const r = el.getBoundingClientRect();
      let p = 0;
      switch (el.dataset["scroll"]) {
        case "exit":
          p = -r.top / r.height;
          break;
        case "pin":
          p = -r.top / Math.max(1, r.height - vh);
          break;
        case "center":
          p = (vh * 0.55 - r.top) / r.height;
          break;
        case "end":
          p = (vh - r.top) / r.height;
          break;
        case "enter":
          p = (vh - r.top) / (vh * 0.5);
          break;
        default:
          p = (vh - r.top) / (vh + r.height);
      }
      el.style.setProperty("--p", clamp(p).toFixed(4));
    }
  };

  const request = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request);

  return () => {
    observer?.disconnect();
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", request);
    window.removeEventListener("resize", request);
  };
}
