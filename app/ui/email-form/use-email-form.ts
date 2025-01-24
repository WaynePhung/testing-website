import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "@/app/types/form-data";
import emailFormSchema from "@/app/utils/email/validation/email-form";
import sendMail from "./send-mail";
import { toast } from "react-hot-toast";
import { noto_sans } from "./../../utils/text-styling/fonts";

export const useEmailForm = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting }
    } = useForm<FormData>({
      resolver: zodResolver(emailFormSchema)
    });
  
    const handleFormSubmit = async (formData: FormData) => {
      const result = await sendMail(formData);
      if (result.success) {
        toast.success('Message sent successfully.', {
          className: `${noto_sans.className} email-submission-message`,
          position: 'bottom-center',
          duration: Infinity,
          icon: null,
          style: { minWidth: 'auto' }
        });
        reset();
      } else {
        let errorMessage = result.error === 'Too many requests from this IP, please try again later.'
          ? 'You have exceeded the rate limit. Please try again later.'
          : `${result.error}`;
        toast.error(errorMessage, {
          className: `${noto_sans.className} email-submission-message`,
          position: 'bottom-center',
          duration: Infinity,
          icon: null,
          style: { minWidth: 'auto' }
        });
      }
    };
  
    return { register, handleSubmit, errors, isSubmitting, handleFormSubmit };
  };