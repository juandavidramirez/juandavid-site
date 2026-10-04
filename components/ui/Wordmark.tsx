import styles from "./Wordmark.module.css";

export function Wordmark({ primary, secondary, className }: { primary: string; secondary: string; className?: string }) {
  return (
    <span className={[styles.wordmark, className].filter(Boolean).join(" ")}>
      <span className={styles.primary}>{primary}</span>
      <span className={styles.secondary}>{secondary}</span>
    </span>
  );
}
