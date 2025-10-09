import React, { useState } from 'react';
import Header from '../../organisms/Header/Header.jsx';
import PriceListPage from '../../../Pages/PriceListPage.jsx';
import GeneralDataPage from '../../../Pages/GeneralDataPage.jsx';
import ProductListPage from '../../../Pages/ProductListPage.jsx';
import PurchaseOrdersPage from '../../../Pages/PurchaseOrdersPage.jsx';
import ProductCrudPage from '../../../Pages/ProductCrudPage.jsx';
import ProviderCrudPage from '../../../Pages/ProviderCrudPage.jsx';
import UserCrudPage from '../../../Pages/UserCrudPage.jsx';
import styles from './Dashboard.module.css';

const Dashboard = ({ userRole = 'proveedor', onLogout }) => {
  const [currentPage, setCurrentPage] = useState(
    userRole === 'proveedor' ? 'priceList' : 'productList'
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    onLogout(); // Llama a la función onLogout del padre
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      // Páginas para proveedores
      case 'priceList':
        return <PriceListPage />;
      case 'generalData':
        return <GeneralDataPage />;

        
      
      // Páginas para compras
      case 'productList':
        return <ProductListPage />;
      case 'purchaseOrders':
        return <PurchaseOrdersPage />;
      case 'productCrud':
        return <ProductCrudPage />;
      case 'providerCrud':
        return <ProviderCrudPage />;
      case 'userCrud':
        return <UserCrudPage />;
      
      default:
        return userRole === 'proveedor' ? <PriceListPage /> : <ProductListPage />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogout={handleLogout}
        userRole={userRole}
      />
      <main className={styles.mainContent}>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Dashboard;
