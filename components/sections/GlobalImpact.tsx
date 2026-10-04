import Image from "next/image";
import { globalImpact, impactLocations, impactStats } from "@/content/home";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import { getWorldMap, projectToPercent } from "@/lib/world-map";
import { ImpactMapPins, type PlacedLocation } from "./ImpactMapPins";
import { ImpactStats } from "./ImpactStats";
import styles from "./GlobalImpact.module.css";

export function GlobalImpact() {
  const map = getWorldMap();
  const placed: PlacedLocation[] = impactLocations.map((loc) => ({ ...loc, ...projectToPercent(loc.coordinates) }));

  // Dashed arcs connecting consecutive points (decorative, as in the Figma).
  const arcs = placed.slice(1).map((p, i) => {
    const a = placed[i];
    const [x1, y1] = [(a.x / 100) * map.width, (a.y / 100) * map.height];
    const [x2, y2] = [(p.x / 100) * map.width, (p.y / 100) * map.height];
    const lift = Math.min(120, Math.hypot(x2 - x1, y2 - y1) * 0.35);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${((x1 + x2) / 2).toFixed(1)} ${(Math.min(y1, y2) - lift).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });

  return (
    <section id={globalImpact.id} className={styles.section} aria-labelledby="impact-title">
      {/* Decorative ribbon (Figma image 739). Never intercepts input. */}
      <div className={styles.atmosphere} aria-hidden="true">
        <Image
          className={`${styles.ribbon} ${styles.ribbonMain}`}
          src="/images/decor/wave-hero-lines.webp"
          alt=""
          width={1774}
          height={887}
          sizes="(max-width: 760px) 240vw, 115vw"
        />
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.layout}>
          <div className={styles.heading}>
            <Eyebrow>{globalImpact.eyebrow}</Eyebrow>
            <h2 id="impact-title" className={`h2 h2-lg ${styles.title}`}>
              <RichText value={globalImpact.title} />
            </h2>
          </div>

          <div className={styles.map} style={{ aspectRatio: `${map.width} / ${map.height}` }}>
            <svg
              className={styles.svg}
              viewBox={`0 0 ${map.width} ${map.height}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="land-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0b3fb0" />
                  <stop offset="0.5" stopColor="#072a78" />
                  <stop offset="1" stopColor="#0a46c4" />
                </linearGradient>
                <pattern id="land-dots" width="4" height="4" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.6" fill="#71c0fd" opacity="0.45" />
                </pattern>
                <filter id="land-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#land-glow)">
                <path d={map.land} fill="url(#land-fill)" opacity="0.9" />
              </g>
              <path d={map.land} fill="url(#land-dots)" />
              <path d={map.borders} fill="none" stroke="#71c0fd" strokeOpacity="0.45" strokeWidth="0.6" />
              <g fill="none" stroke="#cbe4ee" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 4">
                {arcs.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            </svg>
            <ImpactMapPins locations={placed} label={globalImpact.mapLabel} closeLabel={globalImpact.closeLabel} />
          </div>
        </div>

        <ImpactStats stats={impactStats} className={styles.stats} />
      </div>
    </section>
  );
}
