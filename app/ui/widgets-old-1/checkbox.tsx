import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
}

export default function Checkbox({ label, name, register }: CheckboxProps) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={name}
        {...register(name)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}