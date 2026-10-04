import type { HeroProfile } from "@/content/types";
import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./HeroProfiles.module.css";

/**
 * Professional facets orbiting the hero portrait. Desktop: satellites around the
 * photo that expand on hover/focus (pure CSS). Tablet/mobile: a row of chips under
 * the photo that expand on tap (focus). Rendered inside the portrait box.
 */
export function HeroProfiles({ profiles }: { profiles: HeroProfile[] }) {
  return (
    <>
      <svg className={styles.orbit} viewBox="0 0 820 680" aria-hidden="true" focusable="false">
        <ellipse cx="340" cy="320" rx="420" ry="300" transform="rotate(-12 340 320)" fill="none" stroke="#71c0fd" strokeOpacity=".3" strokeDasharray="2 7" strokeLinecap="round" />
        <ellipse cx="340" cy="320" rx="320" ry="215" transform="rotate(-12 340 320)" fill="none" stroke="#cbe4ee" strokeOpacity=".1" />
      </svg>
      <ul className={styles.list} aria-label="Facetas profesionales">
        {profiles.map((p, i) => (
          <li key={p.title} className={styles.sat} data-orbit={i + 1}>
            <div className={styles.float}>
              <div className={styles.body} tabIndex={0}>
                <span className={styles.head}>
                  <span className={styles.icon}>
                    <AreaIcon icon={p.icon} size={18} />
                  </span>
                  <span className={styles.title}>{p.title}</span>
                </span>
                <span className={styles.more}>
                  <span className={styles.description}>{p.description}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
