import React from 'react';
// import './figure-placeholder.scss';

interface FigureProps {
  className?: string;
}

export default function FigurePlaceholder({ className } : FigureProps) {
  return <div className={`figure-placeholder${className && " " + className}`}></div>;
}