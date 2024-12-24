
import React from 'react';
import "./loading-spinner.css";

interface LoadingSpinnerProps {
  children?: React.ReactNode;
}

export default function LoadingSpinner({ children }: LoadingSpinnerProps) {
  return (
    <figure className="loading-spinner">
      {children && children}
    </figure>
  );
}
