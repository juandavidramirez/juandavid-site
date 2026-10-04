"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImpactLocation } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./ImpactLocationCard.module.css";

type Props = {
  /** Stories at this pin (several when they share a city). */
  entries: ImpactLocation[];
  closeLabel: string;
  onClose: () => void;
};

/**
 * Mini-card for a map pin: image + title + city + short description.
 * Content comes from `card` in content/home.ts; ‹ › pages through entries at the same city.
 */
export function ImpactLocationCard({ entries, closeLabel, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const location = entries[index];
  const { card, city, country } = location;
  const many = entries.length > 1;
  const go = (step: number) => setIndex((i) => (i + step + entries.length) % entries.length);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image src={card.image.src} alt={card.image.alt} fill sizes="(max-width: 640px) 90vw, 300px" />
      </div>
      <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
        <Icon name="close" size={14} />
      </button>
      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.city}>{[city, country].filter(Boolean).join(", ")}</p>
      <p className={styles.description} aria-live={many ? "polite" : undefined}>
        {card.description}
      </p>
      {many && (
        <div className={styles.pager}>
          <button type="button" onClick={() => go(-1)} aria-label="Anterior">
            <Icon name="arrow" size={14} className={styles.prev} />
          </button>
          <span>
            {index + 1} / {entries.length}
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Siguiente">
            <Icon name="arrow" size={14} />
          </button>
        </div>
      )}
    </article>
  );
}
