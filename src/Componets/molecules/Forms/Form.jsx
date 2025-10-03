import React from 'react';
import Input from '../../atoms/Input/Input';
import styles from './Form.module.css';

const FormField = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className={styles.fieldContainer}>
      <label className={styles.label}>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default FormField;