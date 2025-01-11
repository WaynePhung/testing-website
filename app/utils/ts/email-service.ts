import * as SibApiV3Sdk from '@sendinblue/client';

// Initialize the Brevo API client
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error('BREVO_API_KEY is not set in the environment variables');
}
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  sendCopy?: boolean;
}

export async function sendEmail(data: EmailData) {
  const { name, email, subject, message, sendCopy } = data;

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
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}