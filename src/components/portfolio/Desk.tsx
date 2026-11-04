import { useEffect, useRef, useState } from "react";
import { useXray } from "@/lib/xray";

/*
 * Hero desk scene, seen from the front: the back of a stickered laptop lid,
 * behind it someone with brown hair looking down at the keys (the lid hides
 * the face), sitting on an office chair; knees, shins and sneakers show under
 * the desk.
 *
 *  seated    → typing idle
 *  gone      → scrolled past the point where the scene is fully in view:
 *              he rolls off to the right with the chair
 *  returning → back at the top: he walks back in from the right (side view,
 *              head hanging), pulling the chair behind him, then sits down
 *
 * Pure SVG + CSS (styles.css, "Hero desk"). Coordinates: viewBox 520 × 380,
 * floor at y = 370, the seated person is centred on x = 260.
 */

type State = "seated" | "gone" | "returning";
// He leaves once the scene is fully in view: when its bottom edge has come up
// to 85% of the viewport height (or after 24px, if it starts out that high).
const VIEW_LINE = 0.85;
const WALK_MS = 2800; // keep in sync with .desk-walker animation in styles.css

export function Desk() {
  const xray = useXray("Desk");
  const [state, setState] = useState<State>("seated");
  const [instant, setInstant] = useState(true);
  const stateRef = useRef<State>("seated");
  const svgRef = useRef<SVGSVGElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const set = (s: State) => {
      stateRef.current = s;
      setState(s);
    };
    let threshold = 24;
    const measure = () => {
      const el = svgRef.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom + window.scrollY;
      threshold = Math.max(24, bottom - window.innerHeight * VIEW_LINE);
    };
    const update = () => {
      const down = window.scrollY > threshold;
      const s = stateRef.current;
      if (down && s !== "gone") {
        clearTimeout(timer.current);
        set("gone");
      } else if (!down && s === "gone") {
        set("returning");
        timer.current = setTimeout(() => set("seated"), WALK_MS);
      }
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    update(); // a reload mid-page starts with him already gone, without the ride
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setInstant(false)));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(id);
      clearTimeout(timer.current);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <svg
      {...xray}
      ref={svgRef}
      className="desk"
      data-state={state}
      data-instant={instant || undefined}
      viewBox="0 0 520 380"
      preserveAspectRatio="xMaxYMax meet"
      role="img"
      aria-label="Illustration: Philipp at his desk, typing on a laptop"
    >
      <defs>
        <linearGradient id="dk-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4e1da" />
          <stop offset="1" stopColor="#bcb8b0" />
        </linearGradient>
        <linearGradient id="dk-hair" x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#8a5a34" />
          <stop offset="0.55" stopColor="#6a4224" />
          <stop offset="1" stopColor="#4c2e17" />
        </linearGradient>
        <radialGradient id="dk-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e6efff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#e6efff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dk-jeans" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4b63" />
          <stop offset="1" stopColor="#2c374a" />
        </linearGradient>
      </defs>

      <ellipse cx="260" cy="372" rx="236" ry="6" className="dk-shadow" />

      {/* dust where the chair was, only during the ride out */}
      <g className="dk-dust">
        <circle cx="214" cy="362" r="8" />
        <circle cx="240" cy="366" r="6" />
        <circle cx="272" cy="364" r="9" />
        <circle cx="304" cy="367" r="6" />
      </g>

      {/* ================= seated person + chair (front view) ================= */}
      <g className="desk-rider">
        <g className="dk-lean">
          <g className="dk-speed">
            <line x1="40" y1="110" x2="170" y2="110" />
            <line x1="80" y1="150" x2="168" y2="150" />
            <line x1="20" y1="196" x2="164" y2="196" />
            <line x1="70" y1="300" x2="196" y2="300" />
            <line x1="110" y1="340" x2="190" y2="340" />
          </g>

          {/* chair back */}
          <rect x="194" y="66" width="132" height="168" rx="36" className="dk-chair" />
          <rect x="205" y="78" width="110" height="144" rx="28" className="dk-chair-pad" />

          {/* hood lying on the upper back, behind the head */}
          <ellipse cx="260" cy="160" rx="50" ry="17" className="dk-hood" />

          {/* hoodie torso: shoulders ~1.45× the lid width */}
          <path
            d="M168 238 C166 200 178 176 204 166 C222 160 241 158 260 158 C279 158 298 160 316 166 C342 176 354 200 352 238 Z"
            className="dk-hoodie"
          />
          <path d="M204 166 C214 178 218 196 218 238" className="dk-seam" />
          <path d="M316 166 C306 178 302 196 302 238" className="dk-seam" />

          {/* arms: upper arm down to the elbow, forearm in towards the keyboard */}
          <g className="dk-arm dk-arm-l">
            <path d="M190 178 C182 190 178 202 180 214" className="dk-sleeve dk-sleeve-up" />
            <path d="M181 214 C190 219 202 222 216 223" className="dk-sleeve" />
            <path d="M196 214 C197 218 197 222 196 226" className="dk-cuff" />
            <path d="M199 186 C194 196 192 204 192 212" className="dk-crease" />
          </g>
          <g className="dk-arm dk-arm-r">
            <path d="M330 178 C338 190 342 202 340 214" className="dk-sleeve dk-sleeve-up" />
            <path d="M339 214 C330 219 318 222 304 223" className="dk-sleeve" />
            <path d="M324 214 C323 218 323 222 324 226" className="dk-cuff" />
            <path d="M321 186 C326 196 328 204 328 212" className="dk-crease" />
          </g>

          {/* head bowed over the keyboard: crown of brown hair, ears below it */}
          <g className="dk-head">
            <ellipse cx="225" cy="134" rx="6.5" ry="10" className="dk-skin" />
            <ellipse cx="295" cy="134" rx="6.5" ry="10" className="dk-skin" />
            <path d="M225 129 C228 132 228 138 225 141" className="dk-ear" />
            <path d="M295 129 C292 132 292 138 295 141" className="dk-ear" />
            <ellipse cx="260" cy="126" rx="34" ry="38" className="dk-skin" />
            <path
              d="M227 132 C221 106 236 84 260 84 C284 84 299 106 293 132 C296 140 293 148 290 150 L230 150 C227 148 224 140 227 132 Z"
              fill="url(#dk-hair)"
            />
            {/* crown whorl and strands falling away from it */}
            <path
              d="M262 102 c-5 -2 -8 3 -5 6 c4 4 10 -1 8 -6 c-2 -6 -12 -6 -15 1"
              className="dk-whorl"
            />
            <path d="M256 106 C246 112 238 122 234 136" className="dk-strand" />
            <path d="M262 109 C260 120 258 130 256 144" className="dk-strand" />
            <path d="M268 106 C278 112 284 122 287 136" className="dk-strand" />
            <path d="M252 100 C244 98 236 102 232 110" className="dk-strand dk-strand-hi" />
            <path d="M270 99 C280 97 288 102 290 112" className="dk-strand" />
          </g>

          {/* under the desk: seat front, column, base, casters */}
          <rect x="196" y="244" width="128" height="15" rx="7" className="dk-chair" />
          <rect x="255" y="258" width="10" height="76" className="dk-metal" />
          <path d="M260 326 L184 348 L188 356 L260 338 L332 356 L336 348 Z" className="dk-chair" />
          <circle cx="186" cy="358" r="10" className="dk-wheel" />
          <circle cx="334" cy="358" r="10" className="dk-wheel" />

          {/* legs: knees towards us, tapering down to the ankles, sneakers */}
          <path
            d="M220 264 C220 251 228 245 239 245 C250 245 258 251 258 264 C257 290 255 318 253 346 H227 C225 318 222 290 220 264 Z"
            fill="url(#dk-jeans)"
          />
          <path
            d="M262 264 C262 251 270 245 281 245 C292 245 300 251 300 264 C298 290 295 318 293 346 H267 C265 318 263 290 262 264 Z"
            fill="url(#dk-jeans)"
          />
          <path d="M239 250 C236 256 236 262 239 268" className="dk-knee" />
          <path d="M281 250 C284 256 284 262 281 268" className="dk-knee" />
          <g className="dk-shoe">
            <path d="M223 347 C223 341 230 338 240 338 C250 338 257 341 257 347 L260 361 C260 366 257 368 252 368 H228 C223 368 220 366 220 361 Z" />
            <path d="M220.5 361 H259.5" className="dk-sole" />
            <path d="M230 349 C236 352 244 352 250 349" className="dk-stripe" />
          </g>
          <g className="dk-shoe">
            <path d="M263 347 C263 341 270 338 280 338 C290 338 297 341 297 347 L300 361 C300 366 297 368 292 368 H268 C263 368 260 366 260 361 Z" />
            <path d="M260.5 361 H299.5" className="dk-sole" />
            <path d="M270 349 C276 352 284 352 290 349" className="dk-stripe" />
          </g>
        </g>
      </g>

      {/* ========== walking back in: side view, head hanging, chair in tow ========== */}
      <g className="desk-walker">
        <g className="dk-bob">
          {/* chair, pulled along behind him */}
          <g className="dk-sidechair">
            <rect
              x="268"
              y="170"
              width="22"
              height="104"
              rx="10"
              transform="rotate(-6 279 222)"
              className="dk-chair"
            />
            <rect x="268" y="262" width="80" height="16" rx="7" className="dk-chair" />
            <rect x="306" y="278" width="10" height="56" className="dk-metal" />
            <rect x="270" y="332" width="82" height="8" rx="3" className="dk-chair" />
            <g className="dk-caster" style={{ transformOrigin: "278px 356px" }}>
              <circle cx="278" cy="356" r="13" className="dk-wheel" />
              <path d="M278 345 V367 M267 356 H289" className="dk-spoke" />
            </g>
            <g className="dk-caster" style={{ transformOrigin: "344px 356px" }}>
              <circle cx="344" cy="356" r="13" className="dk-wheel" />
              <path d="M344 345 V367 M333 356 H355" className="dk-spoke" />
            </g>
          </g>

          {/* far leg, then near leg (each swings from the hip) */}
          <g className="dk-leg dk-leg-a">
            <path d="M206 232 L204 352" className="dk-pants" />
            <path
              d="M186 352 H214 C219 358 218 366 212 368 H184 C178 366 178 356 186 352 Z"
              className="dk-shoe-side"
            />
          </g>
          <g className="dk-leg dk-leg-b">
            <path d="M206 232 L204 352" className="dk-pants dk-pants-near" />
            <path
              d="M186 352 H214 C219 358 218 366 212 368 H184 C178 366 178 356 186 352 Z"
              className="dk-shoe-side"
            />
          </g>

          {/* torso, a little hunched forward */}
          <path
            d="M186 240 C180 198 182 152 194 130 C204 114 228 114 234 136 C240 170 236 210 228 240 Z"
            className="dk-hoodie"
          />
          <ellipse cx="226" cy="124" rx="15" ry="11" className="dk-hood" />

          {/* arm reaching back to the chair */}
          <path d="M222 142 C236 156 250 166 264 174" className="dk-sleeve" />
          <circle cx="268" cy="176" r="8" className="dk-skin" />

          {/* head hanging forward: hair on top and back, no face to see */}
          <g transform="rotate(28 192 112)">
            <ellipse cx="192" cy="112" rx="24" ry="27" className="dk-skin" />
            <path
              d="M168 110 C166 88 182 80 196 82 C212 84 220 98 218 116 C214 128 210 134 206 136 C204 120 194 108 168 110 Z"
              fill="url(#dk-hair)"
            />
            <ellipse cx="202" cy="116" rx="5" ry="7" className="dk-skin" />
            <path d="M178 92 C188 90 200 94 208 104" className="dk-strand dk-strand-hi" />
          </g>

          {/* near arm hanging, swinging slightly */}
          <g className="dk-swing">
            <path d="M206 146 C202 166 198 186 196 204" className="dk-sleeve" />
            <circle cx="196" cy="210" r="7.5" className="dk-skin" />
          </g>
        </g>
      </g>

      {/* ================= the desk and what stays on it ================= */}
      <ellipse cx="260" cy="140" rx="84" ry="30" fill="url(#dk-glow)" className="dk-screenlight" />

      <rect x="196" y="140" width="128" height="87" rx="7" fill="url(#dk-lid)" />
      <rect x="196.5" y="140.5" width="127" height="86" rx="6.5" className="dk-lid-edge" />
      <circle cx="260" cy="184" r="13" className="dk-st-accent" />
      <text x="260" y="187.8" textAnchor="middle" className="dk-st-text dk-on-accent">
        PD
      </text>
      <g transform="rotate(-9 224 158)">
        <rect x="209" y="151" width="30" height="14" rx="3" className="dk-st-dark" />
        <text x="224" y="160.8" textAnchor="middle" className="dk-st-text dk-on-dark">
          {"</>"}
        </text>
      </g>
      <g transform="rotate(7 294 211)">
        <rect x="274" y="205" width="40" height="12" rx="2" className="dk-st-light" />
        <text x="294" y="213.6" textAnchor="middle" className="dk-st-text dk-on-light">
          git push
        </text>
      </g>
      <path d="M298 152 l6.5 3.8 v7.6 l-6.5 3.8 l-6.5 -3.8 v-7.6 Z" className="dk-st-dark" />
      <rect x="190" y="225" width="140" height="5" rx="2.5" className="dk-hinge" />

      <g className="dk-steam">
        <path d="M398 194 C394 185 402 181 398 172" />
        <path d="M410 196 C406 186 414 182 410 173" />
      </g>
      <rect x="390" y="200" width="28" height="28" rx="3" className="dk-mug" />
      <path d="M418 207 C428 207 428 221 418 221" className="dk-mug-handle" />

      <path d="M98 202 C92 186 80 181 70 183 C77 192 86 198 98 202 Z" className="dk-leaf" />
      <path d="M103 202 C105 180 117 171 126 171 C122 185 115 195 103 202 Z" className="dk-leaf" />
      <path d="M100 202 C97 184 100 168 105 159 C110 172 108 188 100 202 Z" className="dk-leaf" />
      <path d="M84 202 H118 L113 228 H89 Z" className="dk-pot" />

      <rect x="50" y="228" width="420" height="12" rx="2" className="dk-top" />
      <rect x="66" y="240" width="9" height="132" className="dk-top" />
      <rect x="445" y="240" width="9" height="132" className="dk-top" />
    </svg>
  );
}
