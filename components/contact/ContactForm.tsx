"use client";

import { useEffect, useRef, useState } from "react";
import { contactPage as copy } from "@/content/contact";
import { LIMITS, normalize, validate, type ContactErrors, type ContactInput } from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "success" | "error";
const FIELDS = ["name", "email", "subject", "message"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return; // double-submit guard

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const input: ContactInput = normalize(data);
    const found = validate(input);
    setErrors(found);
    setServerError(null);
    const first = FIELDS.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: data.company ?? "", startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        setServerError(json.error === "rateLimited" ? copy.errors.rateLimited : copy.errors.generic);
        setStatus("error");
        return;
      }
      setStatus("success");
      formRef.current?.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setServerError(copy.errors.generic);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} className={styles.success} role="status">
        <p className={styles.successTitle}>{copy.success.title}</p>
        <p>{copy.success.body}</p>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
        >
          {copy.success.again}
        </Button>
      </div>
    );
  }

  const field = (name: (typeof FIELDS)[number], opts: { type?: string; multiline?: boolean; autoComplete?: string }) => {
    const err = errors[name];
    const id = `contact-${name}`;
    const common = {
      id,
      name,
      placeholder: copy.fields[name].placeholder,
      maxLength: LIMITS[name],
      required: name !== "subject",
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${id}-error` : undefined,
      className: styles.input,
      autoComplete: opts.autoComplete,
    };
    return (
      <div className={styles.field}>
        <label htmlFor={id} className={styles.label}>
          {copy.fields[name].label}
        </label>
        {opts.multiline ? <textarea rows={6} {...common} /> : <input type={opts.type ?? "text"} {...common} />}
        {err && (
          <p id={`${id}-error`} className={styles.error}>
            {copy.errors[err]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
      <div className={styles.row}>
        {field("name", { autoComplete: "name" })}
        {field("email", { type: "email", autoComplete: "email" })}
      </div>
      {field("subject", {})}
      {field("message", { multiline: true })}

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.actions}>
        <Button type="submit" arrow disabled={status === "sending"}>
          {status === "sending" ? copy.sending : copy.submit}
        </Button>
        <div aria-live="polite" className={styles.serverError}>
          {serverError}
        </div>
      </div>
    </form>
  );
}
