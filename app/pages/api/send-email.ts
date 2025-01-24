import { NextApiRequest, NextApiResponse } from 'next';
import { applyRateLimit } from "@/app/utils/email/rate-limit";
import sendMail from "@/app/utils/email/send-email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const result = await sendMail(req, res, req.body);
    if (result.success) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(429).json({ message: result.error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
