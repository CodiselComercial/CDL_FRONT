import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import styles from './ProviderForm.module.css';

const ProviderForm = ({ provider, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    company: '',
    representative: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (provider) {
      setFormData({
        company: provider.company || '',
        representative: provider.representative || '',
        email: provider.email || '',
        phone: provider.phone || '',
        address: provider.address || ''
      });
    }
  }, [provider]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="company" className={styles.label}>
          Empresa *
        </label>
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          placeholder="Nombre de la empresa"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="representative" className={styles.label}>
          Nombre del Representante *
        </label>
        <Input
          type="text"
          name="representative"
          value={formData.representative}
          onChange={handleInputChange}
          placeholder="Nombre completo del representante"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Correo Electrónico
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="correo@empresa.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Teléfono
        </label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+52 55 1234 5678"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="address" className={styles.label}>
          Dirección
        </label>
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Dirección completa"
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Proveedor
        </Button>
        <button 
          type="button" 
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProviderForm;
