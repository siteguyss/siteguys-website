// -----------------------------------------------------------------------------
// lib/mailer.ts
//
// WHAT: Thin wrapper around Nodemailer for sending real email over plain SMTP
//       — i.e. through a mailbox you already control (Google Workspace, Zoho
//       Mail, your domain host's mail hosting, etc.), not a third-party email
//       API/account.
// HOW:  Reads connection details from environment variables — credentials are
//       never hardcoded in source or committed to git. `sendMail` builds one
//       shared transporter instance (created lazily, once) and reuses it
//       across requests instead of reconnecting every time.
//
// SETUP REQUIRED — add these to `.env.local` (already gitignored by default
// in a standard Next.js project — double check it is before committing):
//
//   SMTP_HOST=smtp.yourprovider.com
//   SMTP_PORT=465
//   SMTP_SECURE=true            // true for port 465, false for 587/25
//   SMTP_USER=hello@siteguysstudio.com
//   SMTP_PASS=your-mailbox-password-or-app-password
//   SMTP_FROM="Site Guys <hello@siteguysstudio.com>"
//
// Most providers (Google Workspace, Zoho, etc.) require an "app password"
// rather than your normal login password once 2FA is on — check your
// provider's mail/SMTP settings page for the exact host/port to use.
// -----------------------------------------------------------------------------

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing SMTP environment variables — check .env.local against the setup comment in lib/mailer.ts.");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendMail(opts: { to: string; subject: string; html: string }) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const t = getTransporter();
  return t.sendMail({ from, to: opts.to, subject: opts.subject, html: opts.html });
}
