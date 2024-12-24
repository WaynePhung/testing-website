import React, { useState, useEffect } from 'react';
import './ButtonPlaceholder.scss';

// Interface for ButtonPlaceholder props
interface ButtonPlaceholderProps {
  text: string;
  onClick: () => void;
  isLoading: boolean;
}

export default function ButtonPlaceholder({ text, onClick, isLoading }: ButtonPlaceholderProps) {
  // State to manage button visibility
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Simulate button loading
    if (!isLoading) {
      const timer = setTimeout(() => setShowButton(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Render placeholder or button based on loading state
  return (
    <div className="button-container">
      {isLoading || !showButton ? (
        <div className="button-placeholder"></div>
      ) : (
        <button onClick={onClick} className="button-content fade-in">{text}</button>
      )}
    </div>
  );
}
