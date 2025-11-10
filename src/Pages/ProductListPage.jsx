import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import ProductGrid from '../Components/molecules/ProductGrid/ProductGrid.jsx';
import ProviderList from '../Components/molecules/ProviderList/ProviderList.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import SearchBar from '../Components/molecules/SearchBar/SearchBar.jsx';
import styles from './ProductListPage.module.css';
import { getProductWithProviders } from '../services/api.js';


const ProductListPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        const data = await getProductWithProviders(token);

        const mapped = data.map(p => ({
          id: p.id,
          name: p.nombre,
          unit: p.unidad,
          image: p.foto || null,
          providers: p.proveedores.map(pr => ({
            name: pr.nombre,
            company: `Proveedor ${pr.codigo}`,
            price: parseFloat(pr.precio),
            status: 'activo',
          })),
        }));

        setProducts(mapped);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);




  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.pageContainer}>
      {loading && (
  <div className={styles.loadingOverlay}>
    <div className={styles.loadingModal}>
      <p>Cargando productos...</p>
    </div>
  </div>
)}

      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Package className={styles.icon} size={32} />
            <h2 className={styles.title}>Lista de Productos</h2>
          </div>
          <p className={styles.subtitle}>
            Visualiza todos los productos disponibles y consulta qué proveedores los ofrecen
          </p>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
        />

        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingModal}>
              <p>Cargando productos...</p>
            </div>
          </div>
        )}


        <ProductGrid
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
        />

        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <Package size={48} className={styles.emptyIcon} />
            <h3>No se encontraron productos</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Proveedores de ${selectedProduct?.name}`}
          size="large"
        >
          {selectedProduct && (
            <ProviderList
              providers={selectedProduct.providers}
              productName={selectedProduct.name}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProductListPage;
