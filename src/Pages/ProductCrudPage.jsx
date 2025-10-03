import React, { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import AddButton from '../Components/atoms/AddButton/AddButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import ProductForm from '../Components/molecules/ProductForm/ProductForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './ProductCrudPage.module.css';

const ProductCrudPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Cemento Portland',
      unit: 'Saco 50kg',
      image: null
    },
    {
      id: 2,
      name: 'Varilla 3/8"',
      unit: 'Pieza 6m',
      image: null
    },
    {
      id: 3,
      name: 'Arena de río',
      unit: 'M³',
      image: null
    },
    {
      id: 4,
      name: 'Grava',
      unit: 'M³',
      image: null
    },
    {
      id: 5,
      name: 'Ladrillo rojo',
      unit: 'Millar',
      image: null
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setToast({ message: 'Producto eliminado correctamente', type: 'success' });
    }
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      // Editar producto existente
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData }
          : p
      ));
      setToast({ message: 'Producto actualizado correctamente', type: 'success' });
    } else {
      // Crear nuevo producto
      const newProduct = {
        id: Date.now(), // ID temporal
        ...formData
      };
      setProducts(prev => [...prev, newProduct]);
      setToast({ message: 'Producto creado correctamente', type: 'success' });
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Package className={styles.icon} size={32} />
            <h2 className={styles.title}>CRUD de Productos</h2>
          </div>
          <p className={styles.subtitle}>
            Administra los productos disponibles en el sistema
          </p>
        </div>

        <div className={styles.actionsBar}>
          <AddButton onClick={handleAddProduct}>
            Agregar Producto
          </AddButton>
        </div>

        <div className={styles.productsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Imagen</div>
            <div className={styles.headerCell}>Nombre</div>
            <div className={styles.headerCell}>Unidad</div>
            <div className={styles.headerCell}>Acciones</div>
          </div>
          <div className={styles.tableBody}>
            {products.map((product) => (
              <div key={product.id} className={styles.productRow}>
                <div className={styles.imageCell}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <Package size={24} />
                    </div>
                  )}
                </div>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productUnit}>{product.unit}</div>
                <div className={styles.actions}>
                  <ActionButton
                    type="edit"
                    onClick={() => handleEditProduct(product)}
                    size="small"
                  />
                  <ActionButton
                    type="delete"
                    onClick={() => handleDeleteProduct(product.id)}
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <Package size={48} className={styles.emptyIcon} />
            <h3>No hay productos</h3>
            <p>Agrega tu primer producto para comenzar</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingProduct ? 'Editar Producto' : 'Agregar Producto'}
          size="medium"
        >
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCloseModal}
            isEditing={!!editingProduct}
          />
        </Modal>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCrudPage;
