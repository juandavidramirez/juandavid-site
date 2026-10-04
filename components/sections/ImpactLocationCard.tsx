import Image from "next/image";
import type { ImpactLocation } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./ImpactLocationCard.module.css";

type Props = {
  location: ImpactLocation;
  closeLabel: string;
  onClose: () => void;
};

/**
 * Mini-card for a map point: image + title + city + short description.
 * Content comes from `card` in content/home.ts. Positioning/anchoring is handled
 * by the parent (ImpactMapPins), so this stays a plain presentational card.
 */
export function ImpactLocationCard({ location, closeLabel, onClose }: Props) {
  const { card, city } = location;
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image src={card.image.src} alt={card.image.alt} fill sizes="(max-width: 640px) 90vw, 300px" />
      </div>
      <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
        <Icon name="close" size={14} />
      </button>
      <h3 className={styles.title}>{card.title}</h3>
      {city && city !== card.title && <p className={styles.city}>{city}</p>}
      <p className={styles.description}>{card.description}</p>
    </article>
  );
}
