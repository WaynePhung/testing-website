import React from 'react';

interface ErrorContainerProps {
  errors: string[];
}

export default function ErrorContainer({ errors }: ErrorContainerProps) {
  return (
    <div className="error-container">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}