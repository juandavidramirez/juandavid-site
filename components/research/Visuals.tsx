import type { Content } from "@/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./Visuals.module.css";

/* Ilustraciones de cada hallazgo. Solo usan datos que están en el texto del reporte.
   Los textos vienen de research.visuals (content/es|en/research.ts). */

type V = Content["research"]["visuals"];

const GOLD = "#ffbd42";
const PALE = "#cbe4ee";
const BLUE = "#4a7af5";
const BLUE_LIGHT = "#71c0fd";
const MUTED = "#193553";

/** Upskilling (subir en el mismo campo) vs. reskilling (pasar a un rol nuevo). */
export function SkillsShift({ up, re, t }: { up: { label: string; text: string }; re: { label: string; text: string }; t: V["skills"] }) {
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 300" role="img" aria-label={`${up.label}: ${up.text}. ${re.label}: ${re.text}.`}>
        <defs>
          <marker id="ar-gold" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill={GOLD} />
          </marker>
          <marker id="ar-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill={BLUE_LIGHT} />
          </marker>
        </defs>
        {/* Rol actual */}
        <rect x="40" y="70" width="150" height="190" rx="22" fill={MUTED} />
        <text x="115" y="250" textAnchor="middle" fill={PALE} fontSize="15.5">{t.current}</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="70" y={190 - i * 46} width="90" height="34" rx="17" fill="none" stroke={PALE} strokeOpacity={0.35 + i * 0.25} strokeWidth="1.5" />
        ))}
        <path d="M115 214 V108" stroke={GOLD} strokeWidth="2.5" markerEnd="url(#ar-gold)" fill="none" />
        {/* Rol nuevo */}
        <rect x="330" y="70" width="150" height="190" rx="22" fill="none" stroke={BLUE_LIGHT} strokeDasharray="6 6" strokeWidth="1.5" />
        <text x="405" y="250" textAnchor="middle" fill={PALE} fontSize="15.5">{t.next}</text>
        <circle cx="405" cy="150" r="30" fill="rgba(113,192,253,.15)" stroke={BLUE_LIGHT} strokeWidth="1.5" />
        <path d="M168 130 C 240 40, 300 60, 368 138" stroke={BLUE_LIGHT} strokeWidth="2.5" fill="none" markerEnd="url(#ar-blue)" />
        <text x="115" y="44" textAnchor="middle" fill={GOLD} fontSize="16" fontWeight="700">{up.label}</text>
        <text x="268" y="44" textAnchor="middle" fill={BLUE_LIGHT} fontSize="16" fontWeight="700">{re.label}</text>
      </svg>
      <figcaption className={styles.legend}>
        <span><i style={{ background: GOLD }} />{up.label}: {up.text.toLowerCase()}</span>
        <span><i style={{ background: BLUE_LIGHT }} />{re.label}: {re.text.toLowerCase()}</span>
      </figcaption>
    </figure>
  );
}

/** Hallazgo 1: pilotos sueltos que no llegan a la estrategia de formación. */
function Pilots({ v }: { v: V["pilots"] }) {
  const pos = [
    { x: 92, y: 62 },
    { x: 418, y: 56 },
    { x: 70, y: 232 },
    { x: 440, y: 226 },
    { x: 258, y: 282 },
  ];
  const pilots = pos.map((p, i) => ({ ...p, t: v.items[i] }));
  const cx = 258;
  const cy = 148;
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 310" role="img" aria-label={v.aria}>
        <circle cx={cx} cy={cy} r="62" fill="none" stroke={GOLD} strokeDasharray="5 7" strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r="44" fill={MUTED} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={PALE} fontSize="14.5">{v.center[0]}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill={PALE} fontSize="14.5">{v.center[1]}</text>
        {pilots.map((p) => {
          // Línea que sale del piloto y se corta a medio camino.
          const dx = cx - p.x;
          const dy = cy - p.y;
          return (
            <g key={p.t}>
              <path d={`M${p.x} ${p.y} l${dx * 0.32} ${dy * 0.32}`} stroke={BLUE_LIGHT} strokeOpacity=".55" strokeDasharray="3 5" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y} r="9" fill={BLUE} />
              <circle cx={p.x} cy={p.y} r="15" fill="none" stroke={BLUE} strokeOpacity=".4" />
              <text className={styles.svgLabel} x={p.x} y={p.y + (p.y > cy ? 30 : -24)} textAnchor="middle" fill={PALE} fontSize="14.5">{p.t}</text>
            </g>
          );
        })}
      </svg>
      <ul className={styles.mobileList} aria-hidden="true">
        {pilots.map((p) => (
          <li key={p.t}>{p.t}</li>
        ))}
      </ul>
      <figcaption className={styles.stat}>
        <strong>{v.stat}</strong>
        <span>{v.statText}</span>
      </figcaption>
    </figure>
  );
}

/** Hallazgo 2: las barreras son humanas y organizacionales. */
function Barriers({ v }: { v: V["barriers"] }) {
  const icons = ["users", "graduation-cap", "sparkles", "globe"];
  const items = v.items.map((b, i) => ({ ...b, icon: icons[i] }));
  return (
    <figure className={styles.figure}>
      <ul className={styles.barriers}>
        {items.map((b) => (
          <li key={b.t}>
            <span className={styles.icon}><AreaIcon icon={b.icon} size={20} /></span>
            <span><strong>{b.t}</strong> {b.d}</span>
          </li>
        ))}
      </ul>
      <figcaption className={styles.paradox}>
        <span className={styles.paradoxLabel}>{v.paradoxLabel}</span>
        {v.paradox}
      </figcaption>
    </figure>
  );
}

/** Hallazgo 3: catálogo vs. ruta. */
function Route({ v }: { v: V["route"] }) {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  const steps = [
    { x: 330, y: 230 },
    { x: 376, y: 186 },
    { x: 422, y: 142 },
    { x: 468, y: 98 },
  ];
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 300" role="img" aria-label={v.aria}>
        <text x="120" y="34" textAnchor="middle" fill={PALE} fontSize="15" fontWeight="700">{v.catalog}</text>
        {cells.map((i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const jitter = ((i * 37) % 9) - 4;
          return (
            <rect key={i} x={40 + col * 34 + jitter} y={64 + row * 40 + (((i * 13) % 7) - 3)} width="24" height="24" rx="6"
              fill="none" stroke={PALE} strokeOpacity={0.18 + ((i * 7) % 5) * 0.06} strokeWidth="1.5" />
          );
        })}
        <text x="120" y="262" textAnchor="middle" fill={PALE} fillOpacity=".7" fontSize="15.5">{v.catalogResult}</text>

        <line x1="256" y1="50" x2="256" y2="270" stroke={PALE} strokeOpacity=".15" />

        <text x="400" y="34" textAnchor="middle" fill={PALE} fontSize="15" fontWeight="700">{v.route}</text>
        <path d={`M${steps.map((s) => `${s.x} ${s.y}`).join(" L")}`} stroke={GOLD} strokeWidth="2.5" fill="none" strokeDasharray="0" />
        {steps.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={i === steps.length - 1 ? 16 : 11} fill={i === steps.length - 1 ? GOLD : MUTED} stroke={GOLD} strokeWidth="1.5" />
            <text x={s.x} y={s.y + 4.5} textAnchor="middle" fill={i === steps.length - 1 ? "#011128" : PALE} fontSize="14.5" fontWeight="700">
              {i === steps.length - 1 ? "★" : i + 1}
            </text>
          </g>
        ))}
        <text x="468" y="66" textAnchor="middle" fill={GOLD} fontSize="15">{v.goal}</text>
        <text x="400" y="262" textAnchor="middle" fill={PALE} fillOpacity=".7" fontSize="15.5">{v.routeResult}</text>
      </svg>
    </figure>
  );
}

/** Hallazgo 4: perfil híbrido alrededor de aprender a aprender. */
function Profile({ v }: { v: V["profile"] }) {
  const cx = 260;
  const cy = 150;
  const nodes = [-90, 0, 90, 180].map((a, i) => ({ a, t: v.nodes[i] }));
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 300" role="img" aria-label={v.aria}>
        <circle cx={cx} cy={cy} r="105" fill="none" stroke={PALE} strokeOpacity=".15" />
        {nodes.map((n) => {
          const r = (n.a * Math.PI) / 180;
          const x = cx + Math.cos(r) * 105;
          const y = cy + Math.sin(r) * 105;
          const anchor = n.a === 0 ? "start" : n.a === 180 ? "end" : "middle";
          const tx = n.a === 0 ? x + 20 : n.a === 180 ? x - 20 : x;
          const ty = n.a === -90 ? y - 20 : n.a === 90 ? y + 30 : y + 5;
          return (
            <g key={n.t}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={BLUE_LIGHT} strokeOpacity=".35" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="11" fill={BLUE} />
              {/* "\n" en el texto parte la etiqueta en dos líneas (las largas, sobre todo en inglés). */}
              <text className={styles.svgLabel} x={tx} y={ty - (n.t.includes("\n") ? 9 : 0)} textAnchor={anchor} fill={PALE} fontSize="15.5">
                {n.t.split("\n").map((line, li) => (
                  <tspan key={li} x={tx} dy={li ? 19 : 0}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="54" fill={MUTED} stroke={GOLD} strokeWidth="2" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={GOLD} fontSize="15" fontWeight="700">{v.center[0]}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill={GOLD} fontSize="15" fontWeight="700">{v.center[1]}</text>
      </svg>
      <ul className={styles.mobileList} aria-hidden="true">
        {nodes.map((n) => (
          <li key={n.t}>{n.t.replace("\n", " ")}</li>
        ))}
      </ul>
      <figcaption className={styles.chips}>
        {v.chips.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </figcaption>
    </figure>
  );
}

/** Hallazgo 5: preocupaciones y persona en el circuito. */
function Trust({ v }: { v: V["trust"] }) {
  return (
    <figure className={styles.figure}>
      <ul className={styles.concerns}>
        {v.concerns.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <svg viewBox="0 0 520 150" role="img" aria-label={v.aria}>
        <defs>
          <marker id="ar-pale" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 10 5 0 10z" fill={PALE} />
          </marker>
        </defs>
        <rect x="20" y="45" width="120" height="60" rx="30" fill={MUTED} />
        <text x="80" y="80" textAnchor="middle" fill={PALE} fontSize="15.5">{v.ai}</text>
        <path d="M146 75 H192" stroke={PALE} strokeWidth="1.5" markerEnd="url(#ar-pale)" />
        <rect x="200" y="35" width="130" height="80" rx="40" fill="none" stroke={GOLD} strokeWidth="2" />
        <text x="265" y="71" textAnchor="middle" fill={GOLD} fontSize="15.5" fontWeight="700">{v.person[0]}</text>
        <text x="265" y="90" textAnchor="middle" fill={GOLD} fontSize="15.5" fontWeight="700">{v.person[1]}</text>
        <path d="M336 75 H382" stroke={PALE} strokeWidth="1.5" markerEnd="url(#ar-pale)" />
        <rect x="390" y="45" width="115" height="60" rx="30" fill={MUTED} />
        <text x="447" y="80" textAnchor="middle" fill={PALE} fontSize="15.5">{v.decision}</text>
      </svg>
    </figure>
  );
}

/** Hallazgo 6: nadie mide; qué medir. */
function Measure({ v }: { v: V["measure"] }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.measure}>
        <div className={styles.zero}>
          <strong>0</strong>
          <span>{v.zeroText}</span>
        </div>
        <div className={styles.measureList}>
          <p className={styles.measureHead}>{v.head}</p>
          <ul>
            <li className={styles.no}>{v.no}</li>
            {v.items.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function FindingVisual({ kind, t }: { kind: "pilots" | "barriers" | "route" | "profile" | "trust" | "measure"; t: V }) {
  switch (kind) {
    case "pilots":
      return <Pilots v={t.pilots} />;
    case "barriers":
      return <Barriers v={t.barriers} />;
    case "route":
      return <Route v={t.route} />;
    case "profile":
      return <Profile v={t.profile} />;
    case "trust":
      return <Trust v={t.trust} />;
    case "measure":
      return <Measure v={t.measure} />;
  }
}
