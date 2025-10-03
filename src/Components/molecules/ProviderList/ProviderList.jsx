import React from 'react';
import styles from './ProviderList.module.css';

const ProviderList = ({ providers, productName }) => {
  return (
    <div className={styles.providerList}>
      <h4 className={styles.title}>Proveedores de {productName}</h4>
      <div className={styles.providerTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Proveedor</div>
          <div className={styles.headerCell}>Precio</div>
          <div className={styles.headerCell}>Estado</div>
        </div>
        <div className={styles.tableBody}>
          {providers.map((provider, index) => (
            <div key={index} className={styles.providerRow}>
              <div className={styles.providerInfo}>
                <div className={styles.providerName}>{provider.name}</div>
                <div className={styles.providerCompany}>{provider.company}</div>
              </div>
              <div className={styles.price}>${provider.price.toFixed(2)}</div>
              <div className={styles.status}>
                <span className={`${styles.statusBadge} ${styles[provider.status]}`}>
                  {provider.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderList;
