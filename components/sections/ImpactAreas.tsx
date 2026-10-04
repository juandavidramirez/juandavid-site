import { impactAreas } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import styles from "./ImpactAreas.module.css";

export function ImpactAreas() {
  return (
    <section id={impactAreas.id} className={styles.section} aria-labelledby="areas-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <Eyebrow>{impactAreas.eyebrow}</Eyebrow>
            <h2 id="areas-title" className={`h2 ${styles.title}`}>
              <RichText value={impactAreas.title} />
            </h2>
          </div>
          <ButtonLink cta={impactAreas.cta} className={styles.cta} />
        </div>

        <ul className={styles.items}>
          {impactAreas.items.map((item) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
