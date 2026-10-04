/** "2025-05-11" → "11 MAY, 2025" (Figma format), timezone-safe. */
export function formatPostDate(iso: string, locale = "es-CO") {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const month = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
  return `${d} ${month}, ${y}`;
}
