import styles from "./ContinuousSurface.module.css";

/**
 * Shared background for consecutive Home sections (Purpose → Global Impact → Areas).
 * One surface instead of one background per section avoids visible seams where a
 * section's gradient would otherwise be clipped at its edges. Also the blend context
 * for decorative ribbons that cross from one section into the next.
 */
export function ContinuousSurface({ children }: { children: React.ReactNode }) {
  return <div className={styles.surface}>{children}</div>;
}
