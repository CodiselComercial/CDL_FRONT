import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Toast from '../../atoms/Toast/Toast.jsx';
import styles from './GeneralDataForm.module.css';

const GeneralDataForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    fiscalAddress: '',
    phone: '',
    email: ''
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.businessName.trim()) {
      errors.businessName = 'La razón social es obligatoria';
    }
    
    if (!formData.fiscalAddress.trim()) {
      errors.fiscalAddress = 'El domicilio fiscal es obligatorio';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Formato de teléfono inválido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Formato de correo electrónico inválido';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setToast({ 
        message: 'Por favor, corrige los errores en el formulario', 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      setHasChanges(false);
      setToast({ 
        message: 'Datos actualizados correctamente', 
        type: 'success' 
      });
    } catch (error) {
      setToast({ 
        message: 'Error al actualizar los datos', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="businessName" className={styles.label}>
            Razón Social *
          </label>
          <Input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="Ingresa la razón social"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fiscalAddress" className={styles.label}>
            Domicilio Fiscal *
          </label>
          <Input
            type="text"
            name="fiscalAddress"
            value={formData.fiscalAddress}
            onChange={handleInputChange}
            placeholder="Ingresa el domicilio fiscal"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Teléfono *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Ej: +52 55 1234 5678"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Correo Electrónico *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="ejemplo@empresa.com"
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            disabled={!hasChanges || loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default GeneralDataForm;