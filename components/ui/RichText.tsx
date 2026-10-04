import type { RichText as RichTextType } from "@/content/types";

/** Renders heading segments; `accent` maps to a color class. Newlines in text become line breaks via CSS (pre-line). */
export function RichText({ value }: { value: RichTextType }) {
  return (
    <>
      {value.map((segment, i) =>
        segment.accent ? (
          <span key={i} className={`accent-${segment.accent}`}>
            {segment.text}
          </span>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  );
}

/** Plain-text version of a rich text value (for alt/aria/meta). */
export function richTextToString(value: RichTextType) {
  return value.map((s) => s.text).join("").replace(/\n/g, " ");
}
