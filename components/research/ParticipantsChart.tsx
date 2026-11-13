import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./ParticipantsChart.module.css";

type Group = { label: string; value: number; color: string; icon: string };

/**
 * Parte de un todo con pocas categorías: barra segmentada + una figura por persona.
 * Cada segmento lleva etiqueta directa (nombre y número), así la identidad nunca depende solo del color.
 */
export function ParticipantsChart({ groups, children }: { groups: Group[]; children?: React.ReactNode }) {
  const total = groups.reduce((s, g) => s + g.value, 0);
  return (
    <figure className={styles.chart}>
      <figcaption className={styles.head}>
        <span className={styles.total}>{total}</span>
        <span>personas entrevistadas, por perfil</span>
      </figcaption>

      <div className={styles.bar} role="img" aria-label={groups.map((g) => `${g.label}: ${g.value}`).join(", ")}>
        {groups.map((g) => (
          <span
            key={g.label}
            className={styles.segment}
            style={{ flexGrow: g.value, background: g.color }}
            tabIndex={0}
            aria-label={`${g.label}: ${g.value} de ${total}`}
          >
            <span className={styles.tip}>
              {g.label}: <b>{g.value}</b> de {total}
            </span>
          </span>
        ))}
      </div>

      <ul className={styles.groups}>
        {groups.map((g) => (
          <li key={g.label}>
            <div className={styles.people} aria-hidden="true">
              {Array.from({ length: g.value }, (_, i) => (
                <span key={i} className={styles.person} style={{ color: g.color }}>
                  <svg viewBox="0 0 20 24" width="16" height="20">
                    <circle cx="10" cy="6" r="5" fill="currentColor" />
                    <path d="M1 23c0-5.5 4-9 9-9s9 3.5 9 9z" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
            <div className={styles.label}>
              <span className={styles.icon} style={{ color: g.color }}>
                <AreaIcon icon={g.icon} size={18} />
              </span>
              <span>
                <b>{g.value}</b> {g.label.toLowerCase()}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* El div recorta la tabla: una <table> no respeta width:1px por sí sola. */}
      <div className="visually-hidden">
        <table>
          <caption>Personas entrevistadas por perfil</caption>
          <thead>
            <tr>
              <th>Perfil</th>
              <th>Personas</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.label}>
                <td>{g.label}</td>
                <td>{g.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {children}
    </figure>
  );
}
