import styles from "./Eyebrow.module.css";

type Props = { children: React.ReactNode; className?: string; as?: "p" | "span" };

export function Eyebrow({ children, className, as: Tag = "p" }: Props) {
  return <Tag className={[styles.eyebrow, className].filter(Boolean).join(" ")}>{children}</Tag>;
}
