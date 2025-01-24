import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: {
            name: process.env.SENDER_NAME,
            email: process.env.SENDER_EMAIL,
          },
          to: [{ email: process.env.TARGET_EMAIL }],
          subject: 'New Contact Form Submission',
          htmlContent: `
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        },
        {
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
        }
      )

      res.status(200).json({ message: 'Email sent successfully!', data: response.data })
    } catch (error: any) {
      console.error('Error sending email:', error)
      res.status(500).json({ error: 'Failed to send email', details: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
    console.error(`Method ${req.method} Not Allowed`)
  }
}
