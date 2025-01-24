import React from 'react';
import { noto_sans_bold } from "@/app/utils/text-styling/fonts";
import { UseFormRegister, FieldError } from 'react-hook-form';
import { H3Tag, PTag, SpanTag } from "../text/text-tags";
import { literata, noto_sans } from "@/app/utils/text-styling/fonts";
import { useDelayedLoad } from "@/app/hooks/use-delay-load";
import { SafeHTML } from "../text/safe-html";

interface ExpandableTextFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  description?: string;
}

export default function ExpandableTextField({ label, name, register, error, placeholder, description }: ExpandableTextFieldProps) {
  const { isLoaded, hasLoaded, handleLoad } = useDelayedLoad();
  if (!isLoaded && !hasLoaded) {
    return (
      <article className="text-field">
        <label htmlFor={name}>
          <H3Tag>
            {label}
          </H3Tag>
          {description && 
            <PTag>
              <SafeHTML html={`${description}`} />
            </PTag>
          }
        </label>
        <div className={`placeholder input-expandable`}></div>
      </article>
    );
  } else {
    return (
      <article className="expandable-text-field">
        <label htmlFor={name}>
          <H3Tag>
            {label}
          </H3Tag>
        </label>
        {description && 
          <PTag placeholder={false}>
            <SafeHTML html={`${description}`} />
          </PTag>
        }
        <textarea
         className={noto_sans.className}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          />
        {error && 
          <SpanTag fontOverride="noto_sans_bold" className="error-message" placeholder={false}>
            <SafeHTML html={`${error.message}`} />
          </SpanTag>
        }
        {/* {error && <span className="error-message">{error.message}</span>} */}
      </article>
    );
}
}