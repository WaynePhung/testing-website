import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface TextFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
}

export default function TextField({ label, name, register, error, placeholder }: TextFieldProps) {
  return (
    <div className="text-field">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}