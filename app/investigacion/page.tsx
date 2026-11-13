import type { Metadata } from "next";
import Image from "next/image";
import { research } from "@/content/research";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText, richTextToString } from "@/components/ui/RichText";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { ParticipantsChart } from "@/components/research/ParticipantsChart";
import { FindingVisual, SkillsShift } from "@/components/research/Visuals";
import { GuideExplorer } from "@/components/research/GuideExplorer";
import { HeroActions } from "@/components/research/HeroActions";
import { AudienceTabs } from "@/components/research/AudienceTabs";
import { ContactModal } from "@/components/contact/ContactModal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: research.metaTitle,
  description: research.metaDescription,
  alternates: { canonical: "/investigacion" },
  openGraph: { title: research.metaTitle, description: research.metaDescription, url: "/investigacion" },
};

export default function ResearchPage() {
  const { hero, why, method, findingsIntro, findings, guide, conclusion, next, collaborate } = research;

  return (
    <>
      {/* ───────── Hero ───────── */}
      <header className={styles.hero}>
        <img className={styles.heroWave} src="/images/decor/wave-hero-lines.webp" alt="" aria-hidden="true" />
        <div className={`container ${styles.heroTop}`}>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <HeroActions report={hero.actions.report} thesis={hero.actions.thesis} />
        </div>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <RichText value={hero.title} />
            </h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>
            <p className={styles.heroTagline}>{hero.tagline}</p>
            <p className={styles.heroMeta}>{hero.meta}</p>
          </div>
          <dl className={styles.heroStats}>
            {hero.stats.map((s) => (
              <div key={s.label} className={styles.heroStat}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <nav className={`container ${styles.index}`} aria-label="Secciones del reporte">
          {hero.index.map((l) => (
            <a key={l.href} href={l.href} className={"cta" in l && l.cta ? styles.indexCta : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ───────── Por qué ───────── */}
      <section id="por-que" className={styles.section} aria-labelledby="why-title">
        <div className={`container ${styles.split}`}>
          <div>
            <Eyebrow>{why.eyebrow}</Eyebrow>
            <h2 id="why-title" className={`h2 ${styles.title}`}>
              <RichText value={why.title} />
            </h2>
            {why.paragraphs.map((p) => (
              <p key={p} className={styles.lead}>
                {p}
              </p>
            ))}
          </div>
          <div className={styles.media}>
            <Image
              src="/images/Research/Juan_Research_Defense.png"
              alt="Juan David Ramírez presentando la defensa de su tesis de maestría en Malmö University"
              width={1672}
              height={941}
              sizes="(max-width: 900px) 92vw, 600px"
              quality={85}
            />
          </div>
        </div>

        <div className={`container ${styles.whyVisual}`}>
          <div className={styles.panel}>
            <SkillsShift up={why.upskilling} re={why.reskilling} />
          </div>
          <div className={styles.promise}>
            <p className={styles.miniLabel}>La promesa de la IA generativa</p>
            <ul className={styles.pills}>
              {why.promise.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className={`${styles.miniLabel} ${styles.mtLg}`}>Lo que quise entender en Colombia</p>
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
      <section id="como" className={`${styles.section} ${styles.glowLeft}`} aria-labelledby="method-title">
        <div className="container">
          <Eyebrow>{method.eyebrow}</Eyebrow>
          <h2 id="method-title" className={`h2 ${styles.title}`}>
            <RichText value={method.title} />
          </h2>
          {method.paragraphs.map((p) => (
            <p key={p} className={styles.lead}>
              {p}
            </p>
          ))}

          <div className={styles.methodGrid}>
            <ParticipantsChart groups={method.people}>
              <div className={styles.methodOrgs}>
                <p className={styles.miniLabel}>7 organizaciones que forman talento tecnológico</p>
                <ul className={styles.orgs}>
                  {method.orgs.map((o) => (
                    <li key={o.label}>
                      <span className={styles.iconCircle}>
                        <AreaIcon icon={o.icon} size={20} />
                      </span>
                      <span>
                        <b>{o.label}</b>
                        {o.detail && <span className={styles.muted}> {o.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ParticipantsChart>
            <div className={styles.panel}>
              <p className={styles.miniLabel}>Tres fuentes contrastadas</p>
              <ol className={styles.sources}>
                {method.sources.map((s, i) => (
                  <li key={s.label}>
                    <span className={styles.sourceNum}>{i + 1}</span>
                    <span>
                      <b>{s.label}</b>
                      <span className={styles.muted}>{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className={`${styles.miniLabel} ${styles.mtLg}`}>Análisis temático</p>
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
        </div>
      </section>

      {/* ───────── Hallazgos ───────── */}
      <section id="hallazgos" className={styles.section} aria-labelledby="findings-title">
        <div className="container">
          <Eyebrow>{findingsIntro.eyebrow}</Eyebrow>
          <h2 id="findings-title" className={`h2 ${styles.title}`}>
            <RichText value={findingsIntro.title} />
          </h2>
          <ol className={styles.findingsIndex}>
            {findings.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`}>
                  <span className={styles.findNum}>{f.number}</span>
                  <span className={styles.findIcon}>
                    <AreaIcon icon={f.icon} size={22} />
                  </span>
                  <span className={styles.findShort}>{f.short}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {findings.map((f, idx) => (
          <article
            key={f.id}
            id={f.id}
            className={`${styles.finding} ${idx % 2 ? styles.findingAlt : ""}`}
            aria-labelledby={`${f.id}-title`}
          >
            <div className="container">
              <div className={styles.findingHead}>
                <span className={styles.bigNum}>{f.number}</span>
                <h3 id={`${f.id}-title`} className={styles.findingTitle}>
                  <RichText value={f.title} />
                </h3>
              </div>

              <div className={`${styles.findingBody} ${idx % 2 ? styles.reverse : ""}`}>
                <div className={styles.findingText}>
                  <p className={styles.miniLabel}>{findingsIntro.labels.found}</p>
                  {f.found.map((p) => (
                    <p key={p} className={styles.bodyText}>
                      {p}
                    </p>
                  ))}
                  {f.highlight && (
                    <blockquote className={styles.quote}>
                      <p>{f.highlight.text}</p>
                      <footer>{f.highlight.source}</footer>
                    </blockquote>
                  )}
                </div>
                <div className={styles.findingVisual}>
                  <FindingVisual kind={f.visual} />
                </div>
              </div>

              <div className={styles.takeaways}>
                <div className={styles.means}>
                  <p className={styles.miniLabel}>{findingsIntro.labels.means}</p>
                  <p>{f.means}</p>
                </div>
                <div className={styles.recommend}>
                  <p className={styles.miniLabel}>
                    <span className={styles.recIcon} aria-hidden="true">
                      <AreaIcon icon="lightbulb" size={16} />
                    </span>
                    {findingsIntro.labels.recommend}
                  </p>
                  <p>{f.recommend}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ───────── La guía ───────── */}
      <section id="guia" className={`${styles.section} ${styles.glowRight}`} aria-labelledby="guide-title">
        <div className="container">
          <Eyebrow>{guide.eyebrow}</Eyebrow>
          <h2 id="guide-title" className={`h2 ${styles.title}`}>
            <RichText value={guide.title} />
          </h2>
          <div className={styles.guideIntro}>
            <div>
              <p className={styles.lead}>{guide.intro}</p>
              <ul className={styles.parts}>
                {guide.parts.map((p) => (
                  <li key={p.label}>
                    <b>{p.label}</b>, que {p.text}
                  </li>
                ))}
              </ul>
            </div>
            <aside className={styles.origin}>
              <p className={styles.miniLabel}>{guide.origin.title}</p>
              <p>{guide.origin.text}</p>
            </aside>
          </div>

          <GuideExplorer
            stepsTitle={guide.stepsTitle}
            steps={guide.steps}
            principlesTitle={guide.principlesTitle}
            principlesIntro={guide.principlesIntro}
            principles={guide.principles}
            example={guide.example}
          />
        </div>
      </section>

      {/* ───────── Conclusión ───────── */}
      <section id="conclusion" className={`${styles.section} ${styles.conclusion}`} aria-labelledby="conclusion-title">
        <div className="container">
          <Eyebrow>{conclusion.eyebrow}</Eyebrow>
          <h2 id="conclusion-title" className={`h2 ${styles.title}`}>
            <RichText value={conclusion.title} />
          </h2>
          <p className={styles.lead}>{conclusion.text}</p>
          <ul className={styles.conditions}>
            {conclusion.conditions.map((c, i) => (
              <li key={c}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ul>
          <blockquote className={styles.bigQuote}>
            <p>{conclusion.question}</p>
          </blockquote>
        </div>
      </section>

      {/* ───────── Lo que sigue ───────── */}
      <section className={styles.section} aria-labelledby="next-title">
        <div className={`container ${styles.split}`}>
          <div>
            <Eyebrow>{next.eyebrow}</Eyebrow>
            <h2 id="next-title" className={`h2 ${styles.title}`}>
              <RichText value={next.title} />
            </h2>
            <p className={styles.lead}>{next.text}</p>
          </div>
          <div className={styles.panel}>
            <ol className={styles.timeline}>
              {next.timeline.map((t) => (
                <li key={t.label} className={t.current ? styles.current : undefined}>
                  <span className={styles.when}>{t.when}</span>
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
      </section>

      {/* ───────── Trabajemos juntos ───────── */}
      <section id="trabajemos" className={`${styles.section} ${styles.collab}`} aria-labelledby="collab-title">
        <div className={`container ${styles.collabGrid}`}>
          <div className={styles.collabLeft}>
            <Eyebrow>{collaborate.eyebrow}</Eyebrow>
            <h2 id="collab-title" className={`h2 ${styles.title}`}>
              <RichText value={collaborate.title} />
            </h2>
            <p className={styles.lead}>{collaborate.intro}</p>
            <AudienceTabs groups={collaborate.audiences} />
<div className={styles.collabActions}>
              <ContactModal label={collaborate.cta} />
              <HeroActions report={hero.actions.report} thesis={hero.actions.thesis} reportVariant="outline" />
            </div>
            <p className={styles.handNote}>
              <Image src="/images/decor/hand-arrow.svg" alt="" width={95} height={108} className={styles.handArrow} />
              {collaborate.closing}
            </p>
          </div>

          <div>
            <ol className={styles.ladder} aria-label="Formas de trabajar juntos">
              {collaborate.options.map((o, i) => (
                <li key={o.label} className={styles.ladderStep}>
                  <span className={styles.ladderDot} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className={styles.ladderBody}>
                    <h3>{o.label}</h3>
                    <p>{o.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // Datos estructurados del reporte para buscadores.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Report",
            name: richTextToString(hero.title),
            author: { "@type": "Person", name: collaborate.author },
            datePublished: "2025",
            inLanguage: "es",
            publisher: { "@type": "CollegeOrUniversity", name: "Malmö University" },
          }),
        }}
      />
    </>
  );
}
