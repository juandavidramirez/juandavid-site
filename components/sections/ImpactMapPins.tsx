"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactLocation } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./ImpactMapPins.module.css";

/** x/y: position on the unzoomed map, in % of the map box. */
export type PlacedLocation = ImpactLocation & { x: number; y: number };

/** Current zoom: scale plus translation in % of the map box. */
export type MapView = { scale: number; x: number; y: number };

type Props = {
  locations: PlacedLocation[];
  view: MapView;
  label: string;
  closeLabel: string;
  /** Called when a point is opened (the map zooms towards it). */
  onSelect?: (loc: PlacedLocation) => void;
  /** Called when a point outside the visible area receives keyboard focus. */
  onFocusOutside?: (loc: PlacedLocation) => void;
};

/** Where a map point is on screen (in % of the box) for the current zoom. */
const toScreen = (loc: PlacedLocation, v: MapView) => ({ x: loc.x * v.scale + v.x, y: loc.y * v.scale + v.y });
const isVisible = (p: { x: number; y: number }) => p.x >= -1 && p.x <= 101 && p.y >= -1 && p.y <= 101;

export function ImpactMapPins({ locations, view, label, closeLabel, onSelect, onFocusOutside }: Props) {
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
    // Interacting with the map itself (pan, zoom buttons) keeps the card open.
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-map-root]")) setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [active]);

  const current = active !== null ? locations[active] : null;
  const currentPos = current ? toScreen(current, view) : null;

  return (
    <div ref={rootRef} className={styles.layer} role="group" aria-label={label}>
      {locations.map((loc, i) => {
        const pos = toScreen(loc, view);
        return (
          <button
            key={`${loc.city}-${loc.country}`}
            ref={(el) => {
              pinRefs.current[i] = el;
            }}
            type="button"
            className={`${styles.pin} ${active === i ? styles.active : ""}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              // Off-view pins stay focusable (Tab pans the map to them) but invisible.
              ...(isVisible(pos) ? {} : { opacity: 0, pointerEvents: "none" as const }),
            }}
            aria-label={`${loc.city}, ${loc.country}`}
            aria-expanded={active === i}
            aria-controls="impact-map-card"
            onClick={() => {
              const opening = active !== i;
              setActive(opening ? i : null);
              if (opening) onSelect?.(loc);
            }}
            onFocus={() => {
              if (!isVisible(pos)) onFocusOutside?.(loc);
            }}
          >
            <span className={styles.dot} aria-hidden="true" />
          </button>
        );
      })}

      {current && currentPos && isVisible(currentPos) && (
        <div
          id="impact-map-card"
          role="dialog"
          aria-label={`${current.city}, ${current.country}`}
          className={styles.card}
          data-side={currentPos.x > 60 ? "left" : "right"}
          data-vert={currentPos.y > 60 ? "up" : "down"}
          style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
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
