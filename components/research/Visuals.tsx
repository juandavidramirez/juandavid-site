import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./Visuals.module.css";

/* Ilustraciones de cada hallazgo. Solo usan datos que están en el texto del reporte. */

const GOLD = "#ffbd42";
const PALE = "#cbe4ee";
const BLUE = "#4a7af5";
const BLUE_LIGHT = "#71c0fd";
const MUTED = "#193553";

/** Upskilling (subir en el mismo campo) vs. reskilling (pasar a un rol nuevo). */
export function SkillsShift({ up, re }: { up: { label: string; text: string }; re: { label: string; text: string } }) {
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
        <text x="115" y="250" textAnchor="middle" fill={PALE} fontSize="15.5">Rol actual</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="70" y={190 - i * 46} width="90" height="34" rx="17" fill="none" stroke={PALE} strokeOpacity={0.35 + i * 0.25} strokeWidth="1.5" />
        ))}
        <path d="M115 214 V108" stroke={GOLD} strokeWidth="2.5" markerEnd="url(#ar-gold)" fill="none" />
        {/* Rol nuevo */}
        <rect x="330" y="70" width="150" height="190" rx="22" fill="none" stroke={BLUE_LIGHT} strokeDasharray="6 6" strokeWidth="1.5" />
        <text x="405" y="250" textAnchor="middle" fill={PALE} fontSize="15.5">Rol nuevo</text>
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
function Pilots() {
  const pilots = [
    { x: 92, y: 62, t: "Borradores de contenido" },
    { x: 418, y: 56, t: "Encuestas de clima" },
    { x: 70, y: 232, t: "Rutas en plataformas" },
    { x: 440, y: 226, t: "Asistentes de carrera" },
    { x: 258, y: 282, t: "Laboratorios internos" },
  ];
  const cx = 258;
  const cy = 148;
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 310" role="img" aria-label="Pilotos sueltos de IA alrededor de la estrategia de formación, sin conectarse con ella">
        <circle cx={cx} cy={cy} r="62" fill="none" stroke={GOLD} strokeDasharray="5 7" strokeWidth="1.6" />
        <circle cx={cx} cy={cy} r="44" fill={MUTED} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={PALE} fontSize="14.5">Estrategia de</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill={PALE} fontSize="14.5">formación</text>
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
        <strong>0 de 7</strong>
        <span>organizaciones tenía un marco coherente para usar la IA en la formación</span>
      </figcaption>
    </figure>
  );
}

/** Hallazgo 2: las barreras son humanas y organizacionales. */
function Barriers() {
  const items = [
    { icon: "users", t: "Talento humano:", d: "ve la IA como \"algo técnico, que no es lo mío\"" },
    { icon: "graduation-cap", t: "Docentes:", d: "tienen acceso, pero no entienden bien cómo funciona" },
    { icon: "sparkles", t: "La moda:", d: "invertir en tecnología sin entender para qué sirve" },
    { icon: "globe", t: "Conectividad:", d: "faltan equipos y datos móviles fuera de las grandes ciudades" },
  ];
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
        <span className={styles.paradoxLabel}>La paradoja</span>
        Quienes deberían liderar la formación en IA son, muchas veces, quienes menos la usan o quienes poco la entienden.
      </figcaption>
    </figure>
  );
}

/** Hallazgo 3: catálogo vs. ruta. */
function Route() {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  const steps = [
    { x: 330, y: 230 },
    { x: 376, y: 186 },
    { x: 422, y: 142 },
    { x: 468, y: 98 },
  ];
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 300" role="img" aria-label="Un catálogo de cursos sin orden frente a una ruta de pasos hacia una meta">
        <text x="120" y="34" textAnchor="middle" fill={PALE} fontSize="15" fontWeight="700">Catálogo</text>
        {cells.map((i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const jitter = ((i * 37) % 9) - 4;
          return (
            <rect key={i} x={40 + col * 34 + jitter} y={64 + row * 40 + (((i * 13) % 7) - 3)} width="24" height="24" rx="6"
              fill="none" stroke={PALE} strokeOpacity={0.18 + ((i * 7) % 5) * 0.06} strokeWidth="1.5" />
          );
        })}
        <text x="120" y="262" textAnchor="middle" fill={PALE} fillOpacity=".7" fontSize="15.5">se apaga</text>

        <line x1="256" y1="50" x2="256" y2="270" stroke={PALE} strokeOpacity=".15" />

        <text x="400" y="34" textAnchor="middle" fill={PALE} fontSize="15" fontWeight="700">Ruta</text>
        <path d={`M${steps.map((s) => `${s.x} ${s.y}`).join(" L")}`} stroke={GOLD} strokeWidth="2.5" fill="none" strokeDasharray="0" />
        {steps.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={i === steps.length - 1 ? 16 : 11} fill={i === steps.length - 1 ? GOLD : MUTED} stroke={GOLD} strokeWidth="1.5" />
            <text x={s.x} y={s.y + 4.5} textAnchor="middle" fill={i === steps.length - 1 ? "#011128" : PALE} fontSize="14.5" fontWeight="700">
              {i === steps.length - 1 ? "★" : i + 1}
            </text>
          </g>
        ))}
        <text x="468" y="66" textAnchor="middle" fill={GOLD} fontSize="15">meta</text>
        <text x="400" y="262" textAnchor="middle" fill={PALE} fillOpacity=".7" fontSize="15.5">avanza</text>
      </svg>
    </figure>
  );
}

/** Hallazgo 4: perfil híbrido alrededor de aprender a aprender. */
function Profile() {
  const cx = 260;
  const cy = 150;
  const nodes = [
    { a: -90, t: "Programar" },
    { a: 0, t: "Entender el negocio" },
    { a: 90, t: "Analizar datos" },
    { a: 180, t: "Liderar y comunicar" },
  ];
  return (
    <figure className={styles.figure}>
      <svg viewBox="0 0 520 300" role="img" aria-label="Perfil híbrido: programar, entender el negocio, analizar datos y liderar y comunicar, alrededor de aprender a aprender">
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
              <text className={styles.svgLabel} x={tx} y={ty} textAnchor={anchor} fill={PALE} fontSize="15.5">{n.t}</text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="54" fill={MUTED} stroke={GOLD} strokeWidth="2" />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={GOLD} fontSize="15" fontWeight="700">Aprender</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fill={GOLD} fontSize="15" fontWeight="700">a aprender</text>
      </svg>
      <ul className={styles.mobileList} aria-hidden="true">
        {nodes.map((n) => (
          <li key={n.t}>{n.t}</li>
        ))}
      </ul>
      <figcaption className={styles.chips}>
        <span>Aprender rápido</span><span>Buscar información</span><span>Verificar si es correcto</span>
      </figcaption>
    </figure>
  );
}

/** Hallazgo 5: preocupaciones y persona en el circuito. */
function Trust() {
  return (
    <figure className={styles.figure}>
      <ul className={styles.concerns}>
        <li>Respuestas que suenan bien y están mal</li>
        <li>Sesgos</li>
        <li>Falta de transparencia</li>
      </ul>
      <svg viewBox="0 0 520 150" role="img" aria-label="Lo que produce la IA pasa por una persona que lo revisa antes de una decisión que afecta a personas">
        <defs>
          <marker id="ar-pale" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 10 5 0 10z" fill={PALE} />
          </marker>
        </defs>
        <rect x="20" y="45" width="120" height="60" rx="30" fill={MUTED} />
        <text x="80" y="80" textAnchor="middle" fill={PALE} fontSize="15.5">IA</text>
        <path d="M146 75 H192" stroke={PALE} strokeWidth="1.5" markerEnd="url(#ar-pale)" />
        <rect x="200" y="35" width="130" height="80" rx="40" fill="none" stroke={GOLD} strokeWidth="2" />
        <text x="265" y="71" textAnchor="middle" fill={GOLD} fontSize="15.5" fontWeight="700">Una persona</text>
        <text x="265" y="90" textAnchor="middle" fill={GOLD} fontSize="15.5" fontWeight="700">revisa</text>
        <path d="M336 75 H382" stroke={PALE} strokeWidth="1.5" markerEnd="url(#ar-pale)" />
        <rect x="390" y="45" width="115" height="60" rx="30" fill={MUTED} />
        <text x="447" y="80" textAnchor="middle" fill={PALE} fontSize="15.5">Decisión</text>
      </svg>
    </figure>
  );
}

/** Hallazgo 6: nadie mide; qué medir. */
function Measure() {
  return (
    <figure className={styles.figure}>
      <div className={styles.measure}>
        <div className={styles.zero}>
          <strong>0</strong>
          <span>planes de evaluación, indicadores o definiciones de éxito entre las empresas participantes</span>
        </div>
        <div className={styles.measureList}>
          <p className={styles.measureHead}>Qué medir</p>
          <ul>
            <li className={styles.no}>Solo cursos completados</li>
            <li>Mejora en el desempeño</li>
            <li>Brechas específicas cerradas</li>
            <li>Avance en la carrera</li>
            <li>Confianza de los aprendices</li>
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function FindingVisual({ kind }: { kind: "pilots" | "barriers" | "route" | "profile" | "trust" | "measure" }) {
  switch (kind) {
    case "pilots":
      return <Pilots />;
    case "barriers":
      return <Barriers />;
    case "route":
      return <Route />;
    case "profile":
      return <Profile />;
    case "trust":
      return <Trust />;
    case "measure":
      return <Measure />;
  }
}
