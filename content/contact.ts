import type { RichText } from "./types";

/** Copy for the /contact page and its form. */
export const contactPage: {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: RichText;
  description: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    subject: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  submit: string;
  sending: string;
  success: { title: string; body: string; again: string };
  errors: {
    required: string;
    email: string;
    tooShort: string;
    tooLong: string;
    generic: string;
    rateLimited: string;
  };
} = {
  metaTitle: "Contacto",
  metaDescription: "Escríbeme para conversar sobre estrategia de IA, innovación o el impacto de tu organización.",
  eyebrow: "Trabajemos juntos",
  title: [{ text: "Hablemos" }],
  description:
    "Si estás explorando una idea, necesitas apoyo en una estrategia de IA, o quieres fortalecer el impacto de tu organización, conversemos.",
  fields: {
    name: { label: "Nombre", placeholder: "Tu nombre" },
    email: { label: "Email", placeholder: "tu@correo.com" },
    subject: { label: "Asunto (opcional)", placeholder: "¿Sobre qué quieres conversar?" },
    message: { label: "Mensaje", placeholder: "Cuéntame un poco sobre tu idea o proyecto" },
  },
  submit: "Enviar mensaje",
  sending: "Enviando…",
  success: {
    title: "¡Gracias por escribir!",
    body: "Recibí tu mensaje y te responderé pronto.",
    again: "Enviar otro mensaje",
  },
  errors: {
    required: "Este campo es obligatorio.",
    email: "Escribe un email válido.",
    tooShort: "Cuéntame un poco más (mínimo 10 caracteres).",
    tooLong: "El texto es demasiado largo.",
    generic: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
    rateLimited: "Has enviado varios mensajes seguidos. Espera un momento e inténtalo de nuevo.",
  },
};
