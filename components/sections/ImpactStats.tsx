import type { ImpactStat } from "@/content/types";
import styles from "./ImpactStats.module.css";

export function ImpactStats({ stats, className }: { stats: ImpactStat[]; className?: string }) {
  return (
    <dl className={[styles.stats, className].filter(Boolean).join(" ")}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <dt className={styles.label}>{s.label}</dt>
          <dd className={`${styles.value} ${s.accent ? `accent-${s.accent}` : ""}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
