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
      {/* Wide, soft orbit behind the photo (portrait coords, 1000 × 984). */}
      <svg className={styles.orbit} viewBox="0 0 1000 984" aria-hidden="true" focusable="false">
        <defs>
          {/* Panoramic orbits: fade out towards the text column on the left. */}
          <linearGradient id="orbit-fade" gradientUnits="userSpaceOnUse" x1="-320" y1="0" x2="300" y2="0">
            <stop offset="0" stopColor="#71c0fd" stopOpacity="0" />
            <stop offset="1" stopColor="#71c0fd" stopOpacity=".5" />
          </linearGradient>
        </defs>
        <ellipse cx="560" cy="470" rx="820" ry="430" transform="rotate(-10 560 470)" fill="none" stroke="url(#orbit-fade)" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <ellipse cx="560" cy="470" rx="1000" ry="560" transform="rotate(-10 560 470)" fill="none" stroke="url(#orbit-fade)" strokeOpacity=".35" strokeWidth="1" vectorEffect="non-scaling-stroke" />
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
