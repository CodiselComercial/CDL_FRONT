import React, { useState, useEffect } from 'react';
import { Package, Plus } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import AddButton from '../Components/atoms/AddButton/AddButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import ProductForm from '../Components/molecules/ProductForm/ProductForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './ProductCrudPage.module.css';
import { addProduct, getProductList, editProduct, deleteProduct, syncProducts  } from '../services/api.js';


const ProductCrudPage = () => {
  const [products, setProducts] = useState([]);

  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncResult, setSyncResult] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const data = await getProductList(token);

        const mapped = data.map(p => ({
          id: p.id,
          name: p.nombre,
          unit: p.unidad,
          image: null, // si luego tienes imágenes, las puedes mapear aquí
        }));

        setProducts(mapped);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setToast({ message: 'Error al cargar productos', type: 'error' });
      }
    };

    fetchProducts();
  }, []);


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

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás segura de que quieres eliminar este producto?')) {
      try {
        const token = localStorage.getItem('jwtToken');
        await deleteProduct(token, productId);

        setProducts(prev => prev.filter(p => p.id !== productId));
        setToast({ message: 'Producto eliminado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al eliminar producto', type: 'error' });
      }
    }
  };




  const handleSaveProduct = async (formData) => {
    const token = localStorage.getItem('jwtToken');

    if (editingProduct) {
      // Editar producto en el backend
      try {
        const payload = {
          codigo: formData.codigo || `PROD-${Date.now()}`,
          nombre: formData.name,
          unidad: formData.unit,
          foto: formData.imageFile,
        };

        await editProduct(token, editingProduct.id, payload);

        setProducts(prev => prev.map(p =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        ));
        setToast({ message: 'Producto actualizado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al actualizar producto', type: 'error' });
      }
    } else {
      // Crear nuevo producto
      try {
        const payload = {
          codigo: formData.codigo || `PROD-${Date.now()}`,
          nombre: formData.name,
          unidad: formData.unit,
          foto: formData.imageFile, // asegúrate que venga del <input type="file" />
        };


        await addProduct(token, payload);

        const newProduct = {
          id: Date.now(),
          ...formData,
        };

        setProducts(prev => [...prev, newProduct]);
        setToast({ message: 'Producto creado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al crear producto', type: 'error' });
      }
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };


  const handleSyncProducts = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const result = await syncProducts(token);
      setSyncResult(result);
      setSyncModalOpen(true);
    } catch (err) {
      setToast({ message: 'Error al sincronizar productos', type: 'error' });
    }
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

          <AddButton onClick={handleSyncProducts}>
            Sincronizar Productos
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

        <Modal
          isOpen={syncModalOpen}
          onClose={() => setSyncModalOpen(false)}
          title="Resultado de sincronización"
          size="large"
        >
          {syncResult ? (
            <div className={styles.syncResult}>
              <pre>{JSON.stringify(syncResult, null, 2)}</pre>
            </div>
          ) : (
            <p>No se recibió respuesta del servidor.</p>
          )}
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
