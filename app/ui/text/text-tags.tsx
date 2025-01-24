// components/TextComponents.tsx

import React from 'react';
import TextTag from "./text-tag";

interface MainTagProps {
  id?: string;
  className?: string;
  fontOverride?: 'literata' | 'noto_sans' | 'noto_sans_bold' | 'noto_sans_italic';
  delayTimer?: number;
  placeholder?: boolean;
  children: React.ReactNode;
}

export function PTag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="p" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function SubtitleTag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="subtitle" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function H1Tag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="h1" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function H2Tag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="h2" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function H3Tag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="h3" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function H4Tag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="h4" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function FigcaptionTag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="figcaption" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}

export function SpanTag({ id, className, fontOverride, delayTimer, placeholder, children } : MainTagProps) {
  return (
    <TextTag tag="span" id={id} className={className} fontOverride={fontOverride} delayTimer={delayTimer} placeholder={placeholder && placeholder}>
      {children}
    </TextTag>
  );
}