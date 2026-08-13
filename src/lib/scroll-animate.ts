// Small runtime to add `in-view` when elements scroll into view.
// Use by adding `data-animate="scroll"` or `class="scroll-animate"` to elements.
// Optional: set `data-animate-once="false"` to keep observing and animate on every intersection.

export default function initScrollAnimations(): (() => void) | void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

  const selectors = '[data-animate="scroll"], .scroll-animate';
  const elems = Array.from(document.querySelectorAll<HTMLElement>(selectors));
  if (elems.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          const once = el.getAttribute("data-animate-once");
          if (once !== "false") observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 },
  );

  elems.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
