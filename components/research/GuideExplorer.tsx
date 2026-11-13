"use client";

import { useId, useState } from "react";
import { AreaIcon } from "@/components/ui/AreaIcon";
import styles from "./GuideExplorer.module.css";

type Step = { letter: string; name: string; what: string; ai: string[] };
type Principle = { name: string; meaning: string; question: string; icon: string };
type Example = { title: string; text: string; step: number; principles: number[] };

type Props = {
  stepsTitle: string;
  steps: Step[];
  principlesTitle: string;
  principlesIntro: string;
  principles: Principle[];
  example: Example;
};

export function GuideExplorer({ stepsTitle, steps, principlesTitle, principlesIntro, principles, example }: Props) {
  const [active, setActive] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const baseId = useId();
  const step = steps[active];

  const selectStep = (i: number) => {
    setActive(i);
    setShowExample(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + steps.length) % steps.length;
    selectStep(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  const isHighlighted = (stepIdx: number, pIdx: number) =>
    showExample ? stepIdx === example.step && example.principles.includes(pIdx) : stepIdx === active;

  return (
    <div className={styles.wrap}>
      {/* Los cinco pasos */}
      <h3 className={styles.subTitle}>{stepsTitle}</h3>
      <div className={styles.stepper} role="tablist" aria-label={stepsTitle}>
        {steps.map((s, i) => (
          <button
            key={s.name}
            id={`${baseId}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={styles.step}
            onClick={() => selectStep(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.letter}>{s.letter}</span>
            <span className={styles.stepName}>
              <span className={styles.stepNum}>{i + 1}.</span> {s.name}
            </span>
          </button>
        ))}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} className={styles.panel}>
        <div className={styles.panelHead}>
          <p className={styles.panelLabel}>En qué consiste</p>
          <p className={styles.panelWhat}>{step.what}</p>
        </div>
        <div>
          <p className={styles.panelLabel}>Qué hacer con la IA</p>
          <ul className={styles.aiList}>
            {step.ai.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Los cinco principios */}
      <h3 className={`${styles.subTitle} ${styles.principlesTitle}`}>{principlesTitle}</h3>
      <p className={styles.principlesIntro}>{principlesIntro}</p>
      <ol className={styles.principles}>
        {principles.map((p, i) => (
          <li key={p.name} className={styles.principle}>
            <span className={styles.pIcon}>
              <AreaIcon icon={p.icon} size={22} />
            </span>
            <span className={styles.pNum}>Principio {i + 1}</span>
            <h4 className={styles.pName}>{p.name}</h4>
            <p className={styles.pMeaning}>{p.meaning}</p>
            <p className={styles.pQuestion}>{p.question}</p>
          </li>
        ))}
      </ol>

      {/* Matriz: los principios aplican en los cinco pasos */}
      <div className={styles.matrixCard}>
        <div className={styles.matrixCopy}>
          <p className={styles.panelLabel}>Pasos × principios</p>
          <p className={styles.matrixLead}>
            Cada principio es una pregunta de control en cada uno de los cinco pasos. Elige un paso arriba o mira el ejemplo.
          </p>
          <button type="button" className={styles.exampleBtn} aria-pressed={showExample} onClick={() => setShowExample((v) => !v)}>
            {showExample ? "Ocultar el ejemplo" : example.title}
          </button>
          {showExample && <p className={styles.exampleText}>{example.text}</p>}
        </div>

        <div className={styles.matrixScroll}>
          <table className={styles.matrix}>
            <caption className="visually-hidden">Los cinco principios aplican en cada uno de los cinco pasos</caption>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Principio</span>
                </th>
                {steps.map((s, i) => (
                  <th
                    key={s.name}
                    scope="col"
                    className={(showExample ? i === example.step : i === active) ? styles.colOn : undefined}
                  >
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {principles.map((p, pi) => (
                <tr key={p.name}>
                  <th scope="row">{p.name}</th>
                  {steps.map((s, si) => (
                    <td key={s.name}>
                      <span className={`${styles.dot} ${isHighlighted(si, pi) ? styles.dotOn : ""}`}>
                        <span className="visually-hidden">Aplica</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
