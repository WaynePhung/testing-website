"use server";

import nodemailer from "nodemailer";
import { FormData } from "@/app/types/form-data";
import emailFormSchema from "@/app/utils/email/validation/email-form";
import { getErrorMessage } from "./email-error";

const sendMail = async (formData: FormData) => {
    try {
        // Validate the data
        emailFormSchema.parse(formData);

        // Nodemailer setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            }
        });

        const mailOptions = {
            // from: formData.email,
            from: `"${formData.firstName} ${formData.lastName}" <${formData.email}>`,
            replyTo: formData.email, 
            to: process.env.MAIL_RECEIVER_ADDRESS,
            subject: formData.subject,
            // text: formData.message,
            // html: '',
            text: `From: ${formData.firstName} ${formData.lastName} <${formData.email}>\n\n${formData.message}`,
            html: `
                <p><strong>From:</strong> ${formData.firstName} ${formData.lastName} &lt;${formData.email}&gt;</p>
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
            `,
        }

        // Send email
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: getErrorMessage(error)
        };
    }
};

export default sendMail;
