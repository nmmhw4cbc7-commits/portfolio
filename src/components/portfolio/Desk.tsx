import { useEffect, useRef, useState } from "react";
import { useXray } from "@/lib/xray";

/*
 * The desk next to the hero slogan, seen from the front: the back of a laptop
 * lid, and behind it someone with brown hair looking down at the keys (the
 * lid hides the face). The first scroll launches him and his office chair
 * off to the right like a shot; scrolling back to the very top rolls him in.
 *
 * Pure SVG + CSS. Everything that moves with the chair lives in `.desk-rider`.
 */

const THRESHOLD = 24;

export function Desk() {
  const xray = useXray("Desk");
  const [gone, setGone] = useState(false);
  const [instant, setInstant] = useState(true);
  const goneRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > THRESHOLD;
      if (next !== goneRef.current) {
        goneRef.current = next;
        setGone(next);
      }
    };
    update(); // reloads mid-page start with him already gone, without a dash
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <svg
      {...xray}
      className="desk"
      data-gone={gone || undefined}
      data-instant={instant || undefined}
      viewBox="0 0 480 330"
      preserveAspectRatio="xMaxYMax meet"
      role="img"
      aria-label="Illustration: Philipp at his desk, typing on a laptop"
    >
      <defs>
        <linearGradient id="desk-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2dfd8" />
          <stop offset="1" stopColor="#b9b5ad" />
        </linearGradient>
        <radialGradient id="desk-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#dfeaff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#dfeaff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="desk-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a4e2c" />
          <stop offset="1" stopColor="#4e3019" />
        </linearGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="240" cy="322" rx="215" ry="6" className="desk-shadow" />

      {/* dust kicked up where the chair was, only while he launches */}
      <g className="desk-dust">
        <circle cx="200" cy="312" r="7" />
        <circle cx="222" cy="316" r="5" />
        <circle cx="250" cy="314" r="8" />
        <circle cx="278" cy="317" r="5" />
      </g>

      {/* ---------- everything that leaves with the chair ---------- */}
      <g className="desk-rider">
        <g className="desk-lean">
          {/* speed lines trailing behind him */}
          <g className="desk-speed">
            <line x1="40" y1="96" x2="150" y2="96" />
            <line x1="70" y1="132" x2="150" y2="132" />
            <line x1="20" y1="168" x2="146" y2="168" />
            <line x1="60" y1="250" x2="170" y2="250" />
            <line x1="90" y1="290" x2="170" y2="290" />
          </g>

          {/* chair back, behind the person */}
          <rect x="176" y="62" width="128" height="140" rx="30" className="desk-chair" />
          <rect x="186" y="72" width="108" height="118" rx="24" className="desk-chair-pad" />

          {/* hoodie torso */}
          <path
            d="M146 206 C146 166 172 146 204 141 L276 141 C308 146 334 166 334 206 Z"
            className="desk-hoodie"
          />
          <path d="M206 141 Q240 156 274 141 Q240 132 206 141 Z" className="desk-hood" />

          {/* arms reaching down to the keyboard (hands are behind the lid) */}
          <path d="M166 160 Q164 192 194 199" className="desk-arm desk-arm-l" />
          <path d="M314 160 Q316 192 286 199" className="desk-arm desk-arm-r" />

          {/* head, tilted down: we see brown hair and ears, the face is behind the lid */}
          <g className="desk-head">
            <ellipse cx="209" cy="112" rx="6" ry="9" className="desk-skin" />
            <ellipse cx="271" cy="112" rx="6" ry="9" className="desk-skin" />
            <ellipse cx="240" cy="110" rx="31" ry="33" className="desk-skin" />
            <path
              d="M206 124 C201 86 219 66 240 66 C262 66 281 84 275 124 C262 128 219 128 206 124 Z"
              fill="url(#desk-hair)"
            />
            <path d="M226 72 C232 80 236 88 236 98" className="desk-strand" />
            <path d="M246 70 C250 78 252 86 250 97" className="desk-strand" />
            <path d="M216 82 C222 88 224 95 223 102" className="desk-strand" />
          </g>

          {/* seat underside, column, star base and casters below the desk */}
          <rect x="186" y="211" width="108" height="9" rx="4" className="desk-chair" />
          <rect x="235" y="220" width="10" height="56" className="desk-metal" />
          <path
            d="M240 272 L178 296 L182 302 L240 284 L298 302 L302 296 Z"
            className="desk-chair"
          />
          <rect x="236" y="278" width="8" height="26" className="desk-chair" />
          <circle cx="180" cy="308" r="8" className="desk-wheel" />
          <circle cx="300" cy="308" r="8" className="desk-wheel" />
          <circle cx="240" cy="312" r="8" className="desk-wheel" />
        </g>
      </g>

      {/* ---------- the desk and what stays on it ---------- */}
      {/* screen light falling on his face and hair */}
      <ellipse
        cx="240"
        cy="118"
        rx="74"
        ry="30"
        fill="url(#desk-glow)"
        className="desk-screenlight"
      />

      {/* laptop lid from behind, with stickers */}
      <rect x="182" y="121" width="116" height="79" rx="6" fill="url(#desk-lid)" />
      <rect x="182.5" y="121.5" width="115" height="78" rx="5.5" className="desk-lid-edge" />
      <circle cx="240" cy="160" r="12" className="desk-sticker-accent" />
      <text x="240" y="163.6" textAnchor="middle" className="desk-sticker-text desk-on-accent">
        PD
      </text>
      <g transform="rotate(-9 207 138)">
        <rect x="193" y="131" width="28" height="13" rx="3" className="desk-sticker-dark" />
        <text x="207" y="140.4" textAnchor="middle" className="desk-sticker-text desk-on-dark">
          {"</>"}
        </text>
      </g>
      <g transform="rotate(7 276 185)">
        <rect x="258" y="179" width="36" height="11" rx="2" className="desk-sticker-light" />
        <text x="276" y="187" textAnchor="middle" className="desk-sticker-text desk-on-light">
          git push
        </text>
      </g>
      <path d="M276 132 l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7 Z" className="desk-sticker-dark" />
      <rect x="176" y="198" width="128" height="4" rx="2" className="desk-hinge" />

      {/* mug with steam */}
      <g className="desk-steam">
        <path d="M368 170 C364 162 372 158 368 150" />
        <path d="M378 172 C374 163 382 159 378 151" />
      </g>
      <rect x="360" y="176" width="26" height="24" rx="3" className="desk-mug" />
      <path d="M386 182 C395 182 395 194 386 194" className="desk-mug-handle" />

      {/* small plant */}
      <path d="M86 176 C80 160 70 156 62 158 C68 166 76 172 86 176 Z" className="desk-leaf" />
      <path d="M90 176 C92 156 102 148 110 148 C106 160 100 170 90 176 Z" className="desk-leaf" />
      <path d="M88 176 C86 160 88 146 92 138 C96 150 94 164 88 176 Z" className="desk-leaf" />
      <path d="M74 176 H104 L100 200 H78 Z" className="desk-pot" />

      {/* desktop and legs */}
      <rect x="40" y="200" width="400" height="11" rx="2" className="desk-top" />
      <rect x="58" y="211" width="8" height="111" className="desk-top" />
      <rect x="414" y="211" width="8" height="111" className="desk-top" />
    </svg>
  );
}
