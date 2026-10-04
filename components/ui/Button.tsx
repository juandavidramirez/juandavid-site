import Link from "next/link";
import type { CTA } from "@/content/types";
import { Icon } from "./Icon";
import styles from "./Button.module.css";

type Variant = NonNullable<CTA["variant"]>;

type Props = {
  cta: CTA;
  /** Show the trailing arrow (Figma: primary buttons have it). */
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ cta, arrow = true, className }: Props) {
  const variant: Variant = cta.variant ?? "primary";
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{cta.label}</span>
      {arrow && <Icon name="arrow" size={16} className={styles.arrow} />}
    </>
  );
  if (cta.external) {
    return (
      <a href={cta.href} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={cls}>
      {content}
    </Link>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; arrow?: boolean };

export function Button({ variant = "primary", arrow = false, className, children, ...rest }: ButtonProps) {
  return (
    <button className={[styles.button, styles[variant], className].filter(Boolean).join(" ")} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={16} className={styles.arrow} />}
    </button>
  );
}
