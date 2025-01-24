import React from 'react';

interface CustomToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type }) => {
  return (
    <div className={`custom-toast ${type}`}>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default CustomToast;