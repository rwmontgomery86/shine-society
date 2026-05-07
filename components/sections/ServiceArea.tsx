import { SectionHead } from "@/components/ui/SectionHead";
import { cities, contact } from "@/components/content/site";

// SVG positions are calculated from real lat/lon offsets from Senoia.
// 1 mile ≈ 4.5 SVG units (so the 40-mile radius reads as r=180 in a 400×400
// viewBox). Senoia HQ sits at (200, 220) — slightly south of geometric
// center, matching how the cluster reads on a north-up map of the area.
const HQ = { x: 200, y: 220 };

type Pin = {
  name: string;
  label: string;
  at: { x: number; y: number };
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
};

const PINS: Pin[] = [
  // Inner ring (≤ 17 mi)
  { name: "PEACHTREE",   label: "PEACHTREE",   at: { x: 189, y: 190 }, anchor: "middle", dx: 0,  dy: -10 },
  { name: "FAYETTEVILLE",label: "FAYETTEVILLE",at: { x: 226, y: 174 }, anchor: "start",  dx: 8,  dy: -4 },
  { name: "NEWNAN",      label: "NEWNAN",      at: { x: 136, y: 195 }, anchor: "end",    dx: -8, dy: 4 },
  { name: "GRIFFIN",     label: "GRIFFIN",     at: { x: 275, y: 237 }, anchor: "start",  dx: 10, dy: 4 },
  // Outer ring (25–31 mi, all still inside 40-mile radius)
  { name: "MCDONOUGH",   label: "MCDONOUGH",   at: { x: 304, y: 173 }, anchor: "middle", dx: 0,  dy: -10 },
  { name: "LAGRANGE",    label: "LAGRANGE",    at: { x: 75,  y: 301 }, anchor: "start",  dx: 8,  dy: 4 },
  { name: "BARNESVILLE", label: "BARNESVILLE", at: { x: 301, y: 298 }, anchor: "middle", dx: 0,  dy: 16 },
  { name: "MANCHESTER",  label: "MANCHESTER",  at: { x: 182, y: 357 }, anchor: "middle", dx: 0,  dy: -10 },
];

export function ServiceArea() {
  return (
    <section className="ss-section" id="area">
      <SectionHead num="06" kicker="Service Area" title="Central Georgia, covered." />
      <div className="ss-area">
        <ul className="ss-area__list">
          {cities.map((c, i) => {
            const isHome = i === 0;
            const Inner = (
              <>
                <span className="ss-area__dot" aria-hidden="true" />
                <div>
                  <strong>
                    {c.name}
                    {isHome && <span className="ss-area__home">HQ</span>}
                  </strong>
                  <span>{c.d}</span>
                </div>
                {isHome ? (
                  <span aria-hidden="true" />
                ) : (
                  <span className="ss-area__arrow" aria-hidden="true">↗</span>
                )}
              </>
            );
            return (
              <li key={c.name} className={isHome ? "is-home" : ""}>
                {isHome ? (
                  <div className="ss-area__row">{Inner}</div>
                ) : (
                  <a
                    className="ss-area__row"
                    href="#book"
                    aria-label={`Book a detail in ${c.name}`}
                  >
                    {Inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="ss-area__map" aria-hidden="true">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="ssAreaHalo" cx="50%" cy="55%" r="45%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ssAreaSheen" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>

            {/* Halo behind HQ */}
            <circle cx={HQ.x} cy={HQ.y} r={170} fill="url(#ssAreaHalo)" />
            <rect x={0} y={0} width={400} height={400} fill="url(#ssAreaSheen)" />

            {/* Highway hints — real corridors in the area, kept faint */}
            <g stroke="rgba(255,255,255,0.07)" strokeWidth={1.2} fill="none">
              {/* I-85 — SW → NE through Newnan toward Atlanta */}
              <path d="M40 360 L240 60" />
              {/* I-75 — vertical on the east side, past Griffin toward Forsyth */}
              <path d="M340 30 L370 380" />
              {/* US-19/41 — roughly N-S through Griffin */}
              <path d="M278 30 L290 380" strokeDasharray="2 6" />
              {/* GA-16 — east-west through Senoia toward Griffin */}
              <path d="M30 222 L370 232" />
              {/* GA-74 — Senoia toward Peachtree City */}
              <path d="M198 222 L210 170" />
            </g>

            {/* 40-mile radius ring */}
            <circle
              cx={HQ.x}
              cy={HQ.y}
              r={180}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity={0.35}
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            <text
              x={HQ.x}
              y={HQ.y - 184}
              textAnchor="middle"
              fill="var(--accent)"
              fillOpacity={0.85}
              fontSize={10}
              fontFamily="ui-monospace"
              letterSpacing={2}
            >
              40 MI RADIUS
            </text>

            {/* HQ pin (Senoia) — accent-colored with ping animation */}
            <g className="ss-pin">
              <circle cx={HQ.x} cy={HQ.y} r={8} fill="var(--accent)" />
              <circle cx={HQ.x} cy={HQ.y} r={20} fill="none" stroke="var(--accent)" strokeOpacity={0.5} />
              <circle cx={HQ.x} cy={HQ.y} r={36} fill="none" stroke="var(--accent)" strokeOpacity={0.25} />
            </g>
            <text
              x={HQ.x}
              y={HQ.y + 22}
              textAnchor="middle"
              fill="var(--accent)"
              fontSize={13}
              fontFamily="ui-monospace"
              fontWeight={700}
              letterSpacing={1}
            >
              SENOIA · GA
            </text>

            {/* Service cities — accurate positions */}
            {PINS.map(({ name, label, at, anchor, dx, dy }) => (
              <g key={name}>
                <circle cx={at.x} cy={at.y} r={5} fill="rgba(255,255,255,0.9)" />
                <circle cx={at.x} cy={at.y} r={9} fill="none" stroke="rgba(255,255,255,0.18)" />
                <text
                  x={at.x + dx}
                  y={at.y + dy}
                  textAnchor={anchor}
                  fill="rgba(255,255,255,0.78)"
                  fontSize={10}
                  fontFamily="ui-monospace"
                  letterSpacing={1.2}
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
          <span className="ss-area__caption">{contact.travelFee}</span>
        </div>
      </div>
    </section>
  );
}
