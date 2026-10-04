import type { HeroProfile } from "@/content/types";
import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./HeroProfiles.module.css";

/**
 * Professional facets around the hero portrait, always fully visible (icon, title,
 * description). Desktop: placed around the right/middle of the photo. When the photo
 * moves under the text: a 2-column grid (tablet) or a stack (mobile).
 * Rendered inside the portrait box; sizes scale with it (container units).
 */
export function HeroProfiles({ profiles }: { profiles: HeroProfile[] }) {
  return (
    <ul className={styles.list} aria-label="Facetas profesionales">
      {profiles.map((p, i) => (
        <li key={p.title} className={styles.sat} data-orbit={i + 1}>
          <div className={styles.float}>
            <div className={styles.card}>
              <span className={styles.head}>
                <span className={styles.icon}>
                  <AreaIcon icon={p.icon} size={20} />
                </span>
                <span className={styles.title}>{p.title}</span>
              </span>
              <p className={styles.description}>{p.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
