// components/TextTag.tsx

import React, { useEffect, useState } from 'react';
import Placeholder from "../placeholders/placeholder";
import { literata, noto_sans, noto_sans_italic } from "./../../utils/text-styling/fonts";
import { indefinite } from "@/app/utils/ts/exported-constants";

interface TextTagProps {
  tag: "p" | "h1" | "h2" | "h3" | "h4" | "figcaption" | "span" | "subtitle";
  fontOverride?: 'literata' | 'noto_sans' | 'noto_sans_italic';
  children: React.ReactNode;
  className?: string;
  id?: string;
  delayTimer?: number;
  placeholder?: boolean;
}

export default function TextTag({ tag, fontOverride, children, className, id, delayTimer = indefinite, placeholder }: TextTagProps) {
  const Tag = tag === "subtitle" ? "p" : tag;

  let literataFont = literata.className,
      notoSansFont = noto_sans.className,
      notoSansItalicFont = noto_sans_italic.className,
      setFont;

  if (fontOverride) {
    switch(fontOverride) {
      case('literata'):
        setFont = literataFont;
        break;
      case('noto_sans'):
        setFont = notoSansFont;
        break;
      case('noto_sans_italic'):
        setFont = notoSansItalicFont;
        break;
      default:
        setFont = notoSansFont;
        console.log('Default case, no font override. tag: ' + tag + ' setFont: ' + setFont);
        break;
    }
  } else {
    switch(tag) {
      case "h1":
      case "h2":
      case "h3":
        setFont = literataFont;
        break;
      case "p":
      case "subtitle":
      case "span":
      case "h4":
        setFont = notoSansFont;
        break;
      case "figcaption":
        setFont = notoSansItalicFont;
        break;
      default:
        setFont = notoSansFont;
        console.log('Default case. tag: ' + tag + ' setFont: ' + setFont);
        break;
    }
  }

  // console.log('tag: ' + tag + ' setFont: ' + setFont);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 5500); // Adjust this value to match your fade-in animation duration

    return () => clearTimeout(timer);
  }, []);

  // console.log('delayTimer: ' + delayTimer);

  let combinedClassName = setFont;
  if (tag === "subtitle") {
    combinedClassName += " subtitle";
  }
  if (className) {
    combinedClassName += " " + className;
  }

  if (placeholder == false) {
    return (
      <Tag id={id && id} className={combinedClassName}>
          {children}
      </Tag>
    );
  } else {
    return (
      <Placeholder tag={tag} delayTimer={delayTimer}>
        <Tag id={id && id} className={combinedClassName + (isMounted ? ' fade-in' : '')}>
          {children}
        </Tag>
      </Placeholder>
    );
  }
}
