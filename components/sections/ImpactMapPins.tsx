"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactLocation } from "@/content/types";
import { ImpactLocationCard } from "./ImpactLocationCard";
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

  /** Closes the card and returns keyboard focus to its pin. */
  const close = () => {
    if (active !== null) pinRefs.current[active]?.focus();
    setActive(null);
  };

  return (
    <div ref={rootRef} className={styles.layer} role="group" aria-label={label}>
      {locations.map((loc, i) => {
        const pos = toScreen(loc, view);
        return (
          <button
            key={`${loc.country}-${loc.city ?? ""}`}
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
            aria-label={[loc.city, loc.country].filter(Boolean).join(", ")}
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
          aria-label={[current.city, current.country].filter(Boolean).join(", ")}
          className={styles.card}
          // Opens away from the zoom controls (bottom-right); a selected pin is centred, so usually left.
          data-side={currentPos.x > 40 ? "left" : "right"}
          data-vert={currentPos.y < 25 ? "down" : currentPos.y > 75 ? "up" : "center"}
          style={{ left: `${currentPos.x}%`, top: `${currentPos.y}%` }}
        >
          <ImpactLocationCard location={current} closeLabel={closeLabel} onClose={close} />
        </div>
      )}
    </div>
  );
}
