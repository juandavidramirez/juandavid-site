import type { CTA } from "@/content/types";
import { internalLinks } from "@/content/links";
import { ContactModal } from "@/components/contact/ContactModal";
import { ButtonLink } from "./Button";

type Props = { cta: CTA; arrow?: boolean; className?: string };

/**
 * Botón de llamado a la acción del sitio. Los que apuntan al formulario de contacto
 * ("Hablemos") abren el pop-up en vez de navegar a /contact; el resto es un enlace normal.
 */
export function CtaButton({ cta, arrow, className }: Props) {
  if (cta.href === internalLinks.contactForm) {
    return <ContactModal label={cta.label} variant={cta.variant ?? "primary"} className={className} />;
  }
  return <ButtonLink cta={cta} arrow={arrow} className={className} />;
}
