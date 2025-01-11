import type { NextApiRequest, NextApiResponse } from 'next';
import * as SibApiV3Sdk from '@sendinblue/client';

// Initialize the Brevo API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Ensure the API key is set
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error('BREVO_API_KEY is not set in the environment variables');
}
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message, sendCopy } = req.body;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<p>From: ${name} (${email})</p><p>${message}</p>`;
  sendSmtpEmail.sender = { name: "Your Name", email: "your-sender-email@example.com" };
  sendSmtpEmail.to = [{ email: process.env.RECIPIENT_EMAIL as string }];

  if (sendCopy) {
    sendSmtpEmail.cc = [{ email: email }];
  }

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', result);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
