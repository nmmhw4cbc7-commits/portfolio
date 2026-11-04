import { useEffect, useRef, useState } from "react";
import { renderCount } from "@/lib/xray";

/*
 * X-ray mode: hold ⌥ (Option) / Alt and the page shows how it is built.
 *  - solid boxes:  React components, with their render count and size
 *  - dashed boxes: elements driven by the scroll engine, with their live
 *                  `--p` (and `--x` for the work cards) as you scroll
 *  - a HUD with frame time, DOM size and the page-level CSS variables
 * Touch devices get a toggle button in the footer (it dispatches `xray:toggle`).
 */

type Box = {
  key: string;
  kind: "component" | "scroll";
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  meta: string;
};

type Hud = { fps: number; frame: number; nodes: number; v: string; page: string; motion: number };

const VISIBLE_MARGIN = 40;

export function XRay() {
  const [on, setOn] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [hud, setHud] = useState<Hud | null>(null);
  const latched = useRef(false);

  // ⌥ held = on, released = off. The footer button latches it on for touch.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Alt" && !e.repeat) {
        e.preventDefault(); // stops Firefox/Windows from focusing the menu bar
        setOn(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "Alt" && !latched.current) setOn(false);
    };
    const reset = () => {
      if (!latched.current) setOn(false);
    };
    const toggle = () => {
      latched.current = !latched.current;
      setOn(latched.current);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", reset);
    window.addEventListener("xray:toggle", toggle);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", reset);
      window.removeEventListener("xray:toggle", toggle);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("xray", on);
    if (!on) {
      setBoxes([]);
      setHud(null);
      return;
    }

    let raf = 0;
    let last = performance.now();
    let smooth = 16.7;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      smooth += (dt - smooth) * 0.1;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const next: Box[] = [];
      const visible = (r: DOMRect) =>
        r.bottom > -VISIBLE_MARGIN &&
        r.top < vh + VISIBLE_MARGIN &&
        r.right > 0 &&
        r.left < vw &&
        r.width > 0;

      document.querySelectorAll<HTMLElement>("[data-xray]").forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (!visible(r)) return;
        const name = el.dataset["xray"] ?? "?";
        const [component, key] = name.split(":");
        next.push({
          key: `c${i}`,
          kind: "component",
          x: r.left,
          y: r.top,
          w: r.width,
          h: r.height,
          label: key ? `<${component} key="${key}" />` : `<${component} />`,
          meta: `renders ${renderCount(name)} · ${Math.round(r.width)}×${Math.round(r.height)}`,
        });
      });

      document.querySelectorAll<HTMLElement>("[data-scroll]").forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (!visible(r)) return;
        const p = el.style.getPropertyValue("--p") || "0";
        const x = el.style.getPropertyValue("--x");
        next.push({
          key: `s${i}`,
          kind: "scroll",
          x: r.left,
          y: r.top,
          w: r.width,
          h: r.height,
          label: `data-scroll="${el.dataset["scroll"]}"`,
          meta: `--p ${Number(p).toFixed(3)}${x ? ` · --x ${Number(x).toFixed(3)}` : ""}`,
        });
      });

      setBoxes(next);
      setHud({
        fps: Math.round(1000 / smooth),
        frame: smooth,
        nodes: document.getElementsByTagName("*").length,
        v: root.style.getPropertyValue("--v") || "0",
        page: root.style.getPropertyValue("--page") || "0",
        motion: document.querySelectorAll("[data-motion]").length,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  if (!on) return null;

  return (
    <div aria-hidden className="xray-layer pointer-events-none fixed inset-0 z-[100]">
      {boxes.map((b) => (
        <div
          key={b.key}
          className={`xray-box ${b.kind === "scroll" ? "is-scroll" : ""}`}
          style={{ transform: `translate(${b.x}px, ${b.y}px)`, width: b.w, height: b.h }}
        >
          <span className="xray-tag">
            <b>{b.label}</b> {b.meta}
          </span>
        </div>
      ))}

      {hud && (
        <div className="xray-hud">
          <div className="xray-hud-title">x-ray · release ⌥ to exit</div>
          <dl>
            <dt>frame</dt>
            <dd>
              {hud.frame.toFixed(1)} ms · {hud.fps} fps
            </dd>
            <dt>dom nodes</dt>
            <dd>{hud.nodes}</dd>
            <dt>motion els</dt>
            <dd>{hud.motion}</dd>
            <dt>--page</dt>
            <dd>{Number(hud.page).toFixed(3)}</dd>
            <dt>--v</dt>
            <dd>{Number(hud.v).toFixed(3)}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}
