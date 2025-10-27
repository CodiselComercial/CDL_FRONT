import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';
import styles from './ProductForm.module.css';

const ProductForm = ({ product, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    imageFile: null, // aquí guardamos el archivo
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        unit: product.unit || '',
        imageFile: null, // no podemos prellenar un archivo
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Nombre del Producto *
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ingresa el nombre del producto"
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="unit" className={styles.label}>
          Unidad de Medida *
        </label>
        <Input
          type="text"
          name="unit"
          id="unit"
          value={formData.unit}
          onChange={handleInputChange}
          placeholder="Ej: Saco 50kg, M³, Pieza"
          autoComplete="off"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image" className={styles.label}>
          Imagen del Producto
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Producto
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

export default ProductForm;
