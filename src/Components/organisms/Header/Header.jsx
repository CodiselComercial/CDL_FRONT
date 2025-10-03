import React from 'react';
import { LogOut } from 'lucide-react';
import NavButton from '../../atoms/NavButton/NavButton.jsx';
import styles from './Header.module.css';

const Header = ({ currentPage, onPageChange, onLogout, userRole = 'proveedor' }) => {
  const isProvider = userRole === 'proveedor';
  const isPurchases = userRole === 'compras';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {isProvider ? 'Portal del Proveedor' : 'Portal de Compras'}
        </h1>
        <nav className={styles.navigation}>
          {isProvider && (
            <>
              <NavButton
                active={currentPage === 'priceList'}
                onClick={() => onPageChange('priceList')}
              >
                Lista de Precios
              </NavButton>
              <NavButton
                active={currentPage === 'generalData'}
                onClick={() => onPageChange('generalData')}
              >
                Datos Generales
              </NavButton>
            </>
          )}
          
          {isPurchases && (
            <>
              <NavButton
                active={currentPage === 'productList'}
                onClick={() => onPageChange('productList')}
              >
                Lista de Productos
              </NavButton>
              <NavButton
                active={currentPage === 'purchaseOrders'}
                onClick={() => onPageChange('purchaseOrders')}
              >
                Órdenes de Compra
              </NavButton>
              <NavButton
                active={currentPage === 'productCrud'}
                onClick={() => onPageChange('productCrud')}
              >
                CRUD Productos
              </NavButton>
              <NavButton
                active={currentPage === 'providerCrud'}
                onClick={() => onPageChange('providerCrud')}
              >
                CRUD Proveedores
              </NavButton>
              <NavButton
                active={currentPage === 'userCrud'}
                onClick={() => onPageChange('userCrud')}
              >
                CRUD Usuarios
              </NavButton>
            </>
          )}
          
          <NavButton
            variant="logout"
            onClick={onLogout}
          >
            <LogOut size={18} />
            Salir
          </NavButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
