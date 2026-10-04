"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImpactMapPins, type MapView, type PlacedLocation } from "./ImpactMapPins";
import styles from "./ZoomableMap.module.css";

/**
 * Limited zoom for the impact map. The SVG (server-rendered, passed as children)
 * is scaled with a CSS transform — never re-drawn — while the pins live outside the
 * scaled layer so they keep their size. View translation is stored in % of the box.
 *
 * - Buttons: + / − / reset.
 * - Touch: pinch to zoom; drag to pan only once zoomed (otherwise the page scrolls).
 * - Mouse: drag to pan when zoomed. No wheel zoom (it would hijack page scrolling).
 * - Selecting a point zooms in gently towards it.
 */

const MIN = 1;
const MAX = 3;
const STEP = 1.5;
const FOCUS_SCALE = 2;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Keeps the scaled map covering the whole box (no empty edges). */
function clampView(v: MapView): MapView {
  const scale = clamp(v.scale, MIN, MAX);
  const lo = 100 * (1 - scale);
  return { scale, x: clamp(v.x, lo, 0), y: clamp(v.y, lo, 0) };
}

/** New view after zooming to `scale` around a point (in % of the box). */
function zoomAround(v: MapView, scale: number, cx: number, cy: number): MapView {
  const s = clamp(scale, MIN, MAX);
  const k = s / v.scale;
  return clampView({ scale: s, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
}

type Props = {
  children: React.ReactNode;
  locations: PlacedLocation[];
  labels: { map: string; close: string; zoomIn: string; zoomOut: string; reset: string };
};

export function ZoomableMap({ children, locations, labels }: Props) {
  const [view, setView] = useState<MapView>({ scale: 1, x: 0, y: 0 });
  const [gesture, setGesture] = useState(false);
  const viewRef = useRef(view);
  const boxRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; mid: { x: number; y: number } } | null>(null);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const apply = useCallback((next: MapView) => {
    viewRef.current = next;
    setView(next);
  }, []);

  /** Pointer position in % of the map box. */
  const toPct = (clientX: number, clientY: number) => {
    const r = boxRef.current!.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * 100,
      y: ((clientY - r.top) / r.height) * 100,
      w: r.width,
      h: r.height,
    };
  };

  const zoomBy = (factor: number) => apply(zoomAround(viewRef.current, viewRef.current.scale * factor, 50, 50));
  const reset = () => apply({ scale: 1, x: 0, y: 0 });

  /** Centers a point (in map %) and zooms in at least to FOCUS_SCALE. */
  const focusOn = useCallback(
    (loc: PlacedLocation, opts: { zoom: boolean }) => {
      const v = viewRef.current;
      const scale = opts.zoom ? Math.max(v.scale, FOCUS_SCALE) : v.scale;
      apply(clampView({ scale, x: 50 - loc.x * scale, y: 50 - loc.y * scale }));
    },
    [apply],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const zoomed = viewRef.current.scale > MIN;
    // Mouse/pen only pan when zoomed; touch also needs a second finger to pinch.
    if (e.pointerType === "mouse" && (!zoomed || e.button !== 0)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1 && !zoomed) return; // let one-finger touch scroll the page
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Pointer already released (or synthetic): dragging still works without capture.
    }
    setGesture(true);
    if (pointers.current.size === 2) pinch.current = null;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];

    if (pts.length >= 2) {
      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = toPct((a.x + b.x) / 2, (a.y + b.y) / 2);
      if (pinch.current) {
        const v = viewRef.current;
        const zoomed = zoomAround(v, v.scale * (dist / pinch.current.dist), mid.x, mid.y);
        apply(
          clampView({
            ...zoomed,
            x: zoomed.x + (mid.x - pinch.current.mid.x),
            y: zoomed.y + (mid.y - pinch.current.mid.y),
          }),
        );
      }
      pinch.current = { dist, mid: { x: mid.x, y: mid.y } };
      return;
    }

    if (viewRef.current.scale > MIN) {
      const r = boxRef.current!.getBoundingClientRect();
      const v = viewRef.current;
      apply(
        clampView({
          ...v,
          x: v.x + ((e.clientX - prev.x) / r.width) * 100,
          y: v.y + ((e.clientY - prev.y) / r.height) * 100,
        }),
      );
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    pinch.current = null;
    if (pointers.current.size === 0) setGesture(false);
  };

  const zoomed = view.scale > MIN;

  return (
    <div
      ref={boxRef}
      className={styles.root}
      data-map-root=""
      data-zoomed={zoomed || undefined}
      data-gesture={gesture || undefined}
    >
      <div
        className={styles.clip}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
      >
        <div className={styles.stage} style={{ transform: `translate(${view.x}%, ${view.y}%) scale(${view.scale})` }}>
          {children}
        </div>
      </div>

      <ImpactMapPins
        locations={locations}
        view={view}
        label={labels.map}
        closeLabel={labels.close}
        onSelect={(loc) => focusOn(loc, { zoom: true })}
        onFocusOutside={(loc) => focusOn(loc, { zoom: false })}
      />

      <div className={styles.controls}>
        <button type="button" onClick={() => zoomBy(STEP)} disabled={view.scale >= MAX} aria-label={labels.zoomIn}>
          <span aria-hidden="true">+</span>
        </button>
        <button type="button" onClick={() => zoomBy(1 / STEP)} disabled={!zoomed} aria-label={labels.zoomOut}>
          <span aria-hidden="true">−</span>
        </button>
        {zoomed && (
          <button type="button" onClick={reset} aria-label={labels.reset} className={styles.reset}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v2.8h2.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
