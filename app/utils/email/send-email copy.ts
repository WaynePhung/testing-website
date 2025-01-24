import { applyRateLimit } from "./rate-limit";
import { NextApiRequest, NextApiResponse } from 'next';
import { FormData } from '@/app/types/form-data';
import nodemailer from 'nodemailer';

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export default async function sendMail(formData: FormData) {
  try {
    await transporter.verify();

    const info = await transporter.sendMail({
      from: formData.email,
      to: SITE_MAIL_RECEIVER,
      subject: formData.subject,
      text: formData.message,
      html: `<p>${formData.message}</p>`,
    });

    console.log('Message Sent', info.messageId);
    console.log('Mail sent to', SITE_MAIL_RECEIVER);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred' };
  }
}

