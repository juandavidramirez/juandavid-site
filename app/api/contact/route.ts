import { Resend } from "resend";
import { MIN_FILL_MS, normalize, validate } from "@/lib/contact";

/**
 * POST /api/contact — validates and forwards the message by email (Resend).
 * Env: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (see .env.example).
 */

// Basic in-memory rate limit (per server instance): 5 messages / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot + time trap: pretend success so bots don't retry.
  const startedAt = Number(body.startedAt);
  if (body.company || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rateLimited" }, { status: 429 });
  }

  const input = normalize(body);
  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: "invalid", fields: errors }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return Response.json({ ok: false, error: "config" }, { status: 500 });
  }

  const subject = input.subject ? `[Web] ${input.subject}` : `[Web] Nuevo mensaje de ${input.name}`;
  const text = `Nombre: ${input.name}\nEmail: ${input.email}\nAsunto: ${input.subject || "—"}\n\n${input.message}`;
  const html = `<p><strong>Nombre:</strong> ${escapeHtml(input.name)}<br/><strong>Email:</strong> ${escapeHtml(input.email)}<br/><strong>Asunto:</strong> ${escapeHtml(input.subject || "—")}</p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL || "Sitio web <onboarding@resend.dev>",
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      replyTo: input.email,
      subject,
      text,
      html,
    });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Send failed", err);
    return Response.json({ ok: false, error: "send" }, { status: 502 });
  }
}
