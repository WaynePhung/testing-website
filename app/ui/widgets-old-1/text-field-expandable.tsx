import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface ExpandableTextFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
}

export default function ExpandableTextField({ label, name, register, error, placeholder }: ExpandableTextFieldProps) {
  return (
    <div className="expandable-text-field">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}