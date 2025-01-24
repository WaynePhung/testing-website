import { z } from 'zod';

const emailFormSchema = z.object({
    firstName: z.string().min(1, "Your first name cannot be blank. <br> Please type in your first name."),
    lastName: z.string().min(1, "Your last name is required and cannot be blank. <br> Please type in your last name."),
    email: z. string().email("Invalid email address. <br> Please enter a valid and existing email address."),
    subject: z. string()
        .min(1, "Subject is required and cannot be blank. <br> Please type in the subject.")
        .max(200, { message: "The subject has exceeded 200 characters. <br> Please summarize." }),
    message: z.string()
        .superRefine((val, ctx) => {
            if (val.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Message is required and cannot be blank. <br> Please type in the message.",
                });
            } else if (val.length < 10) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Message is too short. <br> Please provide at least 10 characters to ensure clarity.",
                });
            }
        })
});

export default emailFormSchema;