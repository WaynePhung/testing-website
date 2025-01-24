"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "@/app/types/form-data";
import emailFormSchema from "@/app/utils/email/validation/email-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sendMail from "./send-mail";
import { Toaster, toast } from "react-hot-toast";
import { useEmailForm } from "./use-email-form";

import { H2Tag, PTag } from "../text/text-tags";
import TextField from "../widgets/text-field-default";
import ExpandableTextField from "../widgets/text-field-expandable";
import ButtonComponent from "../buttons/button";
import { noto_sans } from "./../../utils/text-styling/fonts";
import { handleSubmitAction } from "./handle-submit-action";

export default function ContactForm({ onSubmitAction }: { onSubmitAction: (formData: FormData) => Promise<void> }) {
    const { register, handleSubmit, errors, isSubmitting, handleFormSubmit } = useEmailForm();

    useEffect(() => {
      // toast.success('Success message!', {
      //   className: `${noto_sans.className} email-submission-message`,
      //   position: 'bottom-center',
      //   duration: Infinity,
      //   icon: null,
      //   style: {
      //     minWidth: 'auto',
      //   }
      // });

      // const handleLoad = () => {
      // };
      // window.addEventListener('load', handleLoad);
      // return () => {
      //   window.removeEventListener('load', handleLoad);
      // };
    }, []);

    return (
        <section className="form-container">
          {/* <article> */}
            <H2Tag className="width100 height-auto">Contact Me</H2Tag>
            {/* <article>
              <PTag className="width100">You can select one of these buttons to start a conversation in the platform of your choice:</PTag>
              <div className="contactButtons">
                <ButtonComponent 
                    group="link-global"
                    alias="linkedIn" 
                    anchorLink={false}
                    icon={true} 
                    imagePosition="before" 
                    showBuffer={false}
                    buttonType="primary" 
                />
                <ButtonComponent 
                    group="link-global"
                    alias="email" 
                    anchorLink={false}
                    icon={true} 
                    imagePosition="before" 
                    showBuffer={false}
                    buttonType="primary" 
                />
              </div>
              <PTag className="width100">Or you can fill out this contact form. All fields below are required to be filled in.</PTag>
            </article> */}
          {/* </article> */}
            <article className="paddingB-16">
              <PTag className="width100">Buttons to contact: </PTag>
              <ButtonComponent 
                    group="link-global"
                    alias="linkedIn" 
                    anchorLink={false}
                    icon={true} 
                    imagePosition="before" 
                    showBuffer={false}
                    buttonType="primary" 
                />
                <ButtonComponent 
                    group="link-global"
                    alias="email" 
                    anchorLink={false}
                    icon={true} 
                    imagePosition="before" 
                    showBuffer={false}
                    buttonType="primary" 
                />
              <PTag className="width100">All fields below this contact form are required to be filled in.</PTag>
            </article>
          <form>
            <TextField
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
              placeholder="John Dewey"
              // description="If you prefer to include your middle name, include it after your first name."
            />
            <TextField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
              placeholder="Smith"
            />
            <TextField
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="youremail@email.com"
            />
            <TextField
              className="width100"
              label="Subject"
              name="subject"
              register={register}
              error={errors.subject}
              placeholder="Enter your subject here."
              description="The subject cannot exceed 200 characters."
            />
            <ExpandableTextField
              label="Message"
              name="message"
              register={register}
              error={errors.message}
              placeholder="Enter your message here."
              description="Your message must be at least 10 characters long."

            />
            <ButtonComponent
              group="link-global"
              alias="sendEmail" 
              anchorLink={false}
              icon={true}
              imagePosition="after"
              showBuffer={false} 
              buttonType="primary" 
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(handleFormSubmit)();
              }}
            >
              {/* Submit */}
              {isSubmitting ? 'Processing Submission' : 'Send Email'}
            </ButtonComponent>
            <Toaster />
          </form>
          {/* <button
              type="submit"
              disabled={isSubmitting}
          >
              {isSubmitting ? 'Processing' : 'Submit'}
          </button> */}
        </section>
    );
}
