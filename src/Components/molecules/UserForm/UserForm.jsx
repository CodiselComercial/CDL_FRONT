import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import styles from './UserForm.module.css';

const UserForm = ({ user, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'proveedor',
    email: '',
    fullName: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // No mostrar contraseña existente
        role: user.role || 'proveedor',
        email: user.email || '',
        fullName: user.fullName || ''
      });
    }
  }, [user]);

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
        <label htmlFor="username" className={styles.label}>
          Usuario *
        </label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Nombre de usuario"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Contraseña {isEditing ? '(dejar vacío para mantener actual)' : '*'}
        </label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder={isEditing ? "Nueva contraseña (opcional)" : "Contraseña"}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="fullName" className={styles.label}>
          Nombre Completo *
        </label>
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Nombre completo del usuario"
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
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role" className={styles.label}>
          Rol *
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className={styles.select}
        >
          <option value="proveedor">Proveedor</option>
          <option value="compras">Compras</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <Button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Usuario
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

export default UserForm;
