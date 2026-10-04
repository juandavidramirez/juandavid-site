/** Shared (client + server) validation for the contact form. */

export const LIMITS = { name: 100, email: 200, subject: 150, message: 5000, messageMin: 10 } as const;
/** Submissions faster than this after the form renders are treated as bots. */
export const MIN_FILL_MS = 2500;

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FieldError = "required" | "email" | "tooShort" | "tooLong";
export type ContactErrors = Partial<Record<keyof ContactInput, FieldError>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalize(raw: Record<string, unknown>): ContactInput {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return { name: str(raw.name), email: str(raw.email), subject: str(raw.subject), message: str(raw.message) };
}

export function validate(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name) errors.name = "required";
  else if (input.name.length > LIMITS.name) errors.name = "tooLong";

  if (!input.email) errors.email = "required";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email)) errors.email = "email";

  if (input.subject.length > LIMITS.subject) errors.subject = "tooLong";

  if (!input.message) errors.message = "required";
  else if (input.message.length < LIMITS.messageMin) errors.message = "tooShort";
  else if (input.message.length > LIMITS.message) errors.message = "tooLong";
  return errors;
}
