"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactLocation } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./ImpactMapPins.module.css";

export type PlacedLocation = ImpactLocation & { x: number; y: number };

type Props = { locations: PlacedLocation[]; label: string; closeLabel: string };

export function ImpactMapPins({ locations, label, closeLabel }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        pinRefs.current[active]?.focus();
        setActive(null);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [active]);

  const current = active !== null ? locations[active] : null;

  return (
    <div ref={rootRef} className={styles.layer} role="group" aria-label={label}>
      {locations.map((loc, i) => (
        <button
          key={`${loc.city}-${loc.country}`}
          ref={(el) => {
            pinRefs.current[i] = el;
          }}
          type="button"
          className={`${styles.pin} ${active === i ? styles.active : ""}`}
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          aria-label={`${loc.city}, ${loc.country}`}
          aria-expanded={active === i}
          aria-controls="impact-map-card"
          onClick={() => setActive(active === i ? null : i)}
        >
          <span className={styles.dot} aria-hidden="true" />
        </button>
      ))}

      {current && (
        <div
          id="impact-map-card"
          role="dialog"
          aria-label={`${current.city}, ${current.country}`}
          className={styles.card}
          data-side={current.x > 60 ? "left" : "right"}
          data-vert={current.y > 60 ? "up" : "down"}
          style={{ left: `${current.x}%`, top: `${current.y}%` }}
        >
          <button type="button" className={styles.close} onClick={() => setActive(null)} aria-label={closeLabel}>
            <Icon name="close" size={16} />
          </button>
          {current.category && <p className={styles.category}>{current.category}</p>}
          <p className={styles.place}>
            {current.city}
            <span>, {current.country}</span>
          </p>
          {current.title && current.title !== current.country && <p className={styles.cardTitle}>{current.title}</p>}
          {current.description && <p className={styles.description}>{current.description}</p>}
          {current.year && <p className={styles.year}>{current.year}</p>}
        </div>
      )}
    </div>
  );
}
