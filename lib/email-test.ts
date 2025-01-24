"use server";

import { EmailTemplate } from "@/app/ui/widgets-test/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./schema-test";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    const { error } = await resend.emails.send({
      from: `Acme <${process.env.RESEND_FROM_EMAIL}>`,
      to: [emailFormData.email],
      subject: "Welcome",
      react: () => EmailTemplate({ firstName: emailFormData.firstName }),
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

