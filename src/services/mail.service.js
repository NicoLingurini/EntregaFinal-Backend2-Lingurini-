import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM } from '../config/env.js';

let transporter = null;

export function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_PORT === 465,
      auth: MAIL_USER && MAIL_PASS ? { user: MAIL_USER, pass: MAIL_PASS } : undefined
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html }) {
  const t = getTransporter();
  return await t.sendMail({ from: MAIL_FROM, to, subject, html });
}
