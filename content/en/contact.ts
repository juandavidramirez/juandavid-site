import type { contactPage as EsContactPage } from "../es/contact";

/** Copy for the /en/contact page and the contact form. */
export const contactPage: typeof EsContactPage = {
  metaTitle: "Contact",
  metaDescription: "Write to me to talk about AI strategy, innovation or your organization's impact.",
  eyebrow: "Let's work together",
  title: [{ text: "Let's talk" }],
  description:
    "If you're exploring an idea, need support with an AI strategy, or want to strengthen your organization's impact, let's talk.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@email.com" },
    subject: { label: "Subject (optional)", placeholder: "What would you like to talk about?" },
    message: { label: "Message", placeholder: "Tell me a bit about your idea or project" },
  },
  submit: "Send message",
  sending: "Sending…",
  success: {
    title: "Thanks for reaching out!",
    body: "I got your message and will get back to you soon.",
    again: "Send another message",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid email.",
    tooShort: "Tell me a bit more (at least 10 characters).",
    tooLong: "The text is too long.",
    generic: "The message couldn't be sent. Please try again in a few minutes.",
    rateLimited: "You've sent several messages in a row. Please wait a moment and try again.",
  },
};
