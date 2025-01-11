import React from 'react';
// import './figure-placeholder.scss';

interface FigureProps {
  id?: string;
  className?: string;
  figcaption?: boolean;
  figcaptionPosition?: "before" | "after" | "";
  children?: React.ReactNode;
}

type FigPHProps = FigureProps & { figcaption: true; figcaptionPosition: "before" | "after" | ""; children: React.ReactNode };

export default function FigurePlaceholder({ id, className, figcaption, figcaptionPosition, children } : FigureProps | FigPHProps) {
  return (
    <figure id={`${id}`} className={`figure-placeholder${className && " " + className}`}>
      { ((figcaption == true) && (figcaptionPosition == "before")) && children }
      <picture className={`${className && " " + className}`}></picture>
      { ((figcaption == true) && (figcaptionPosition == "after")) && children }
    </figure>
  );
}