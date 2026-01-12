import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import styles from './UserForm.module.css';
import { getProviderList } from '../../../services/api.js';

const UserForm = ({ user, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'proveedor',
    email: '',
    fullName: '',
    proveedor_id: ''
  });

  const [providers, setProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoadingProviders(true);
      try {
        const token = localStorage.getItem('jwtToken');
        const data = await getProviderList(token, 1, 0);
        setProviders(data);
      } catch (err) {
        console.error('Error al cargar proveedores:', err);
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '', // No mostrar contraseña existente
        role: user.role || 'proveedor',
        email: user.email || '',
        fullName: user.fullName || '',
        proveedor_id: user.proveedor_id || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      // Si cambia el rol y no es "proveedor", limpiar proveedor_id
      if (name === 'role' && value !== 'proveedor') {
        return {
          ...prev,
          [name]: value,
          proveedor_id: ''
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que si el rol es "proveedor", debe tener un proveedor_id
    if (formData.role === 'proveedor' && !formData.proveedor_id) {
      alert('Por favor seleccione un proveedor para usuarios con rol "Proveedor"');
      return;
    }
    
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
          required={!isEditing}
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

      {formData.role === 'proveedor' && (
        <div className={styles.formGroup}>
          <label htmlFor="proveedor_id" className={styles.label}>
            Proveedor *
          </label>
          <select
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={handleInputChange}
            className={styles.select}
            disabled={loadingProviders}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.nombre || provider.empresa || `Proveedor ${provider.id}`}
              </option>
            ))}
          </select>
        </div>
      )}

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
