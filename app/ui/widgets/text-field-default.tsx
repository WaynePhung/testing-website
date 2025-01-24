import React from 'react';
import { noto_sans } from "@/app/utils/text-styling/fonts";
import { UseFormRegister, FieldError } from 'react-hook-form';
import { H3Tag, PTag, SpanTag } from "../text/text-tags";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";
import { SafeHTML } from "../text/safe-html";

interface TextFieldProps {
  className?: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  description?: string;
}

export default function TextField({ className, label, name, register, error, placeholder, description }: TextFieldProps) {
// export default function TextField({ label, name, register, error, placeholder, description }: TextFieldProps) {
  const { isLoaded, hasLoaded, handleLoad } = useDelayedLoad();
  let combinedClassName = "text-field";
  if (className) {
    combinedClassName += " " + className;
  }
  return (
    <article className={combinedClassName}>
      <label htmlFor={name}>
        <H3Tag>
          {label}
        </H3Tag>
      </label>
      {description && 
        <PTag>
          <SafeHTML html={`${description}`} />
        </PTag>
      }
      {
        (isLoaded == false) ? 
          <div className={`placeholder input`}></div> : 
          <input
            className={noto_sans.className}
            type="text"
            id={name}
            {...register(name)}
            placeholder={placeholder}
          />
      }
      {error && 
        <SpanTag fontOverride="noto_sans_bold" className="error-message" placeholder={false}>
          <SafeHTML html={`${error.message}`} />
        </SpanTag>
      }
    </article>
  );
}