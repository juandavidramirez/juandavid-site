import type { Metadata } from "next";
import Image from "next/image";
import { research } from "@/content/research";
import { externalLinks } from "@/content/links";
import { RichText } from "@/components/ui/RichText";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { ParticipantsChart } from "@/components/research/ParticipantsChart";
import { FindingVisual, SkillsShift } from "@/components/research/Visuals";
import styles from "./pdf.module.css";

/**
 * Versión imprimible del reporte (/investigacion). No es para navegar: es la fuente del PDF descargable.
 * Usa el mismo contenido que la página web (content/research.ts), así que si cambia un texto, basta con
 * regenerar el PDF:  npm run report:pdf  (con el servidor corriendo).
 */
export const metadata: Metadata = {
  title: `${research.metaTitle} (PDF)`,
  robots: { index: false, follow: false },
};

// El PDF se comparte fuera del sitio: los enlaces siempre apuntan al dominio público,
// aunque el PDF se genere desde localhost.
const PUBLIC_URL = "https://www.juandavidramirez.com";
const siteHost = "juandavidramirez.com";
const reportUrl = `${PUBLIC_URL}/investigacion`;

export default function ResearchPdf() {
  const { hero, why, method, findingsIntro, findings, guide, conclusion, next, collaborate } = research;
  const ex = guide.example;

  return (
    <div className={styles.doc}>
      {/* ───────── Portada ───────── */}
      <section className={styles.cover}>
        <img className={styles.coverWave} src="/images/decor/wave-hero-lines.webp" alt="" aria-hidden="true" />
        <p className={styles.wordmark}>
          <b>JuanDavid</b>
          <span>Ramírez</span>
        </p>
        <div className={styles.coverBody}>
          <p className={styles.eyebrowDark}>{hero.eyebrow}</p>
          <h1 className={styles.coverTitle}>
            <RichText value={hero.title} />
          </h1>
          <p className={styles.coverSubtitle}>{hero.subtitle}</p>
          <p className={styles.coverTagline}>{hero.tagline}</p>
          <p className={styles.coverMeta}>{hero.meta}</p>
          <dl className={styles.coverStats}>
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <p className={styles.coverFoot}>
          Versión web interactiva: <a href={reportUrl}>{`${siteHost}/investigacion`}</a>
        </p>
      </section>

      {/* ───────── Contenido ───────── */}
      <nav className={`${styles.block} ${styles.toc}`} aria-label="Contenido">
        <p className={styles.eyebrow}>Contenido</p>
        <ol>
          {[
            why.eyebrow,
            method.eyebrow,
            findingsIntro.eyebrow,
            ...findings.map((f) => `${f.number}. ${f.short}`),
            guide.eyebrow,
            conclusion.eyebrow,
            next.eyebrow,
            collaborate.eyebrow,
          ].map((t, i) => (
            <li key={t} className={i >= 3 && i < 3 + findings.length ? styles.tocSub : undefined}>
              {t}
            </li>
          ))}
        </ol>
      </nav>

      {/* ───────── Por qué ───────── */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>{why.eyebrow}</p>
        <h2 className={styles.h2}>
          <RichText value={why.title} />
        </h2>
        <div className={styles.whyGrid}>
          <div>
            {why.paragraphs.map((p) => (
              <p key={p} className={styles.body}>
                {p}
              </p>
            ))}
          </div>
          <Image
            className={styles.photo}
            src="/images/Research/Juan_Research_Defense.png"
            alt="Juan David Ramírez presentando la defensa de su tesis de maestría en Malmö University"
            width={1672}
            height={941}
            sizes="360px"
            loading="eager"
          />
        </div>
        <div className={`${styles.twoCol} ${styles.block}`}>
          <div className={`${styles.darkCard} ${styles.visual}`}>
            <SkillsShift up={why.upskilling} re={why.reskilling} />
          </div>
          <div className={styles.lightCard}>
            <p className={styles.mini}>La promesa de la IA generativa</p>
            <ul className={styles.pills}>
              {why.promise.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={`${styles.mini} ${styles.mt}`}>Lo que quise entender en Colombia</p>
            <ol className={styles.questions}>
              {why.question.map((q, i) => (
                <li key={q}>
                  <span>{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── Cómo ───────── */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>{method.eyebrow}</p>
        <h2 className={styles.h2}>
          <RichText value={method.title} />
        </h2>
        {method.paragraphs.map((p) => (
          <p key={p} className={styles.body}>
            {p}
          </p>
        ))}
        <div className={`${styles.block} ${styles.chartWide}`}>
          <ParticipantsChart groups={method.people}>
            <div className={styles.orgs}>
              <p className={styles.miniDark}>7 organizaciones que forman talento tecnológico</p>
              <ul>
                {method.orgs.map((o) => (
                  <li key={o.label}>
                    <span className={styles.iconDark}>
                      <AreaIcon icon={o.icon} size={14} />
                    </span>
                    <span>
                      <b>{o.label}</b>
                      {o.detail && ` ${o.detail}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ParticipantsChart>
        </div>
        <div className={`${styles.lightCard} ${styles.block} ${styles.methodCard}`}>
          <div>
            <p className={styles.mini}>Tres fuentes contrastadas</p>
            <ol className={styles.sources}>
              {method.sources.map((s, i) => (
                <li key={s.label}>
                  <span className={styles.numSm}>{i + 1}</span>
                  <span>
                    <b>{s.label}</b>
                    <br />
                    {s.detail}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className={styles.mini}>Análisis temático</p>
            <ol className={styles.funnel}>
              {method.analysis.map((a) => (
                <li key={a.label}>
                  <b>{a.value}</b>
                  <span>{a.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── Hallazgos ───────── */}
      <section className={`${styles.block} ${styles.mtLg}`}>
        <p className={styles.eyebrow}>{findingsIntro.eyebrow}</p>
        <h2 className={styles.h2}>
          <RichText value={findingsIntro.title} />
        </h2>
        <ol className={styles.findIndex}>
          {findings.map((f) => (
            <li key={f.id}>
              <span className={styles.findIndexNum}>{f.number}</span>
              <span className={styles.iconDark}>
                <AreaIcon icon={f.icon} size={16} />
              </span>
              <span>{f.short}</span>
            </li>
          ))}
        </ol>
      </section>

      {findings.map((f) => (
        <article key={f.id} className={styles.finding}>
          <header className={styles.findHead}>
            <span className={styles.bigNum}>{f.number}</span>
            <h3>
              <RichText value={f.title} />
            </h3>
          </header>
          <div className={styles.findBody}>
            <div>
              <p className={styles.mini}>{findingsIntro.labels.found}</p>
              {f.found.map((p) => (
                <p key={p} className={styles.body}>
                  {p}
                </p>
              ))}
              {f.highlight && (
                <blockquote className={styles.quote}>
                  <p>“{f.highlight.text}”</p>
                  <footer>{f.highlight.source}</footer>
                </blockquote>
              )}
            </div>
            <div className={`${styles.darkCard} ${styles.visual}`}>
              <FindingVisual kind={f.visual} />
            </div>
          </div>
          <div className={styles.takeaways}>
            <div className={styles.means}>
              <p className={styles.mini}>{findingsIntro.labels.means}</p>
              <p>{f.means}</p>
            </div>
            <div className={styles.recommend}>
              <p className={styles.miniGold}>{findingsIntro.labels.recommend}</p>
              <p>{f.recommend}</p>
            </div>
          </div>
        </article>
      ))}

      {/* ───────── La guía ───────── */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>{guide.eyebrow}</p>
        <h2 className={styles.h2}>
          <RichText value={guide.title} />
        </h2>
        <div className={styles.twoCol}>
          <div>
            <p className={styles.body}>{guide.intro}</p>
            <ul className={styles.parts}>
              {guide.parts.map((p) => (
                <li key={p.label}>
                  <b>{p.label}</b>, que {p.text}
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.lightCard}>
            <p className={styles.mini}>{guide.origin.title}</p>
            <p className={styles.small}>{guide.origin.text}</p>
          </aside>
        </div>

        <h3 className={styles.h3}>{guide.stepsTitle}</h3>
        <ol className={styles.steps}>
          {guide.steps.map((s, i) => (
            <li key={s.name} className={styles.step}>
              <span className={styles.letter}>{s.letter}</span>
              <div>
                <p className={styles.stepName}>
                  {i + 1}. {s.name}
                  <span>{s.what}</span>
                </p>
                <ul>
                  {s.ai.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className={styles.h3}>{guide.principlesTitle}</h3>
        <p className={styles.body}>{guide.principlesIntro}</p>
        <ol className={styles.principles}>
          {guide.principles.map((p, i) => (
            <li key={p.name}>
              <span className={styles.iconDark}>
                <AreaIcon icon={p.icon} size={16} />
              </span>
              <div>
                <p className={styles.pName}>
                  <span>Principio {i + 1}</span>
                  {p.name}
                </p>
                <p className={styles.small}>{p.meaning}</p>
                <p className={styles.pQuestion}>{p.question}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={`${styles.matrixCard} ${styles.block}`}>
          <div>
            <p className={styles.miniDark}>Pasos × principios</p>
            <p className={styles.matrixTitle}>{ex.title}</p>
            <p className={styles.smallDark}>{ex.text}</p>
          </div>
          <table className={styles.matrix}>
            <thead>
              <tr>
                <th scope="col">
                  <span className={styles.srOnly}>Principio</span>
                </th>
                {guide.steps.map((s, si) => (
                  <th key={s.name} scope="col" className={si === ex.step ? styles.colOn : undefined}>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.principles.map((p, pi) => (
                <tr key={p.name}>
                  <th scope="row">{p.name}</th>
                  {guide.steps.map((s, si) => (
                    <td key={s.name}>
                      <span
                        className={`${styles.dot} ${si === ex.step && ex.principles.includes(pi) ? styles.dotOn : ""}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───────── Conclusión y lo que sigue ───────── */}
      <section className={styles.mtLg}>
        <p className={styles.eyebrow}>{conclusion.eyebrow}</p>
        <h2 className={styles.h2}>
          <RichText value={conclusion.title} />
        </h2>
        <p className={styles.body}>{conclusion.text}</p>
        <ol className={styles.conditions}>
          {conclusion.conditions.map((c, i) => (
            <li key={c}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ol>
        <blockquote className={styles.bigQuote}>
          <p>{conclusion.question}</p>
        </blockquote>

        <div className={styles.block}>
          <p className={`${styles.eyebrow} ${styles.mtLg}`}>{next.eyebrow}</p>
          <h2 className={styles.h2}>
            <RichText value={next.title} />
          </h2>
          <div className={styles.twoCol}>
            <p className={styles.body}>{next.text}</p>
            <div className={styles.lightCard}>
              <ol className={styles.timeline}>
                {next.timeline.map((t) => (
                  <li key={t.label} className={t.current ? styles.current : undefined}>
                    <b>{t.when}</b>
                    <span>{t.label}</span>
                  </li>
                ))}
              </ol>
              <ul className={styles.pills}>
                {next.checks.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trabajemos juntos (cierre en navy) ───────── */}
      <section className={styles.closing}>
        <p className={styles.eyebrowDark}>{collaborate.eyebrow}</p>
        <h2 className={styles.closingTitle}>
          <RichText value={collaborate.title} />
        </h2>
        <p className={styles.closingIntro}>{collaborate.intro}</p>
        <ol className={styles.ladder}>
          {collaborate.options.map((o, i) => (
            <li key={o.label}>
              <span className={i === collaborate.options.length - 1 ? styles.ladderDotOn : styles.ladderDot}>{i + 1}</span>
              <div>
                <p className={styles.ladderTitle}>{o.label}</p>
                <p>{o.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.audiences}>
          {collaborate.audiences.map((a) => (
            <div key={a.label}>
              <p className={styles.miniDark}>{a.label}</p>
              <ul>
                {a.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.contact}>
          <p className={styles.contactHand}>{collaborate.closing}</p>
          <p>
            <span className={styles.tag}>Hablemos</span>
            <a href={`${PUBLIC_URL}/contact`}>{`${siteHost}/contact`}</a>
          </p>
          <p>
            <span className={styles.tag}>LinkedIn</span>
            <a href={externalLinks.linkedin}>linkedin.com/in/juandaramirezj</a>
          </p>
          <p>
            <span className={styles.tag}>Reporte web</span>
            <a href={reportUrl}>{`${siteHost}/investigacion`}</a>
          </p>
        </div>
        <p className={styles.closingWordmark}>
          <b>JuanDavid</b>
          <span>Ramírez</span>
          <em>{collaborate.author} · Malmö University · 2025</em>
        </p>
      </section>
    </div>
  );
}
