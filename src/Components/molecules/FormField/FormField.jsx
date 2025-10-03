import React from 'react';
import Label from '../../atoms/Label/Label.jsx';
import Input from '../../atoms/Input/Input.jsx';

const FormField = ({ label, id, type = 'text', value, onChange, required = false, error = '' }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} required={required}>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        name={id}
        placeholder={label}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
