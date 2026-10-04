import Image from "next/image";
import { blog } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { RichText } from "@/components/ui/RichText";
import { formatPostDate } from "@/lib/format";
import styles from "./BlogPreview.module.css";

export function BlogPreview() {
  return (
    <section id={blog.id} className={styles.section} aria-labelledby="blog-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <Eyebrow>{blog.eyebrow}</Eyebrow>
          <h2 id="blog-title" className={`h2 ${styles.title}`}>
            <RichText value={blog.title} />
          </h2>
          <ButtonLink cta={blog.cta} className={styles.cta} />
        </div>

        <ul className={styles.cards}>
          {blog.posts.map((post) => (
            <li key={post.title}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={post.image.width}
                    height={post.image.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1100px) 45vw, 260px"
                  />
                </div>
                <div className={styles.body}>
                  <p className={styles.tag}>{post.category}</p>
                  <h3 className={styles.cardTitle}>
                    {/* The whole card is clickable through this link's ::after overlay. */}
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {post.title}
                      <span className="visually-hidden"> ({blog.readLabel})</span>
                    </a>
                  </h3>
                  <div className={styles.meta}>
                    <time dateTime={post.date} className={styles.date}>
                      {formatPostDate(post.date)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                    <span className={styles.go} aria-hidden="true">
                      <Icon name="arrow" size={14} />
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
