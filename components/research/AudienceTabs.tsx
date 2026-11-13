"use client";

import { useId, useRef, useState } from "react";
import styles from "./AudienceTabs.module.css";

type Group = { label: string; items: string[] };

/** Selector "Personas / Organizaciones" de la sección Trabajemos juntos. */
export function AudienceTabs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + groups.length) % groups.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Para quién es esta invitación">
        {groups.map((g, i) => (
          <button
            key={g.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {g.label}
          </button>
        ))}
      </div>
      {groups.map((g, i) => (
        <ul
          key={g.label}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          className={styles.chips}
        >
          {g.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}
