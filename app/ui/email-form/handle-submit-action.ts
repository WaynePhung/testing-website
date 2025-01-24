"use server";

import { FormData } from "@/app/types/form-data";
import sendMail from "./send-mail";

export async function handleSubmitAction(formData: FormData): Promise<void> {
    try {
      const result = await sendMail(formData);
      if (result.success) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email:", result.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
