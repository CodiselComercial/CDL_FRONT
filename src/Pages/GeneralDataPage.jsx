import React, { useState, useEffect } from 'react';
import GeneralDataForm from '../Components/organisms/GeneralDataForm/GeneralDataForm.jsx';
import styles from './GeneralDataPage.module.css';

const GeneralDataPage = () => {
  const [generalData, setGeneralData] = useState({
    businessName: 'Constructora ABC S.A. de C.V.',
    fiscalAddress: 'Av. Reforma 123, Col. Centro, CDMX, CP 06000',
    phone: '+52 55 1234 5678',
    email: 'contacto@constructoraabc.com'
  });

  const handleSave = async (newData) => {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        setGeneralData(newData);
        resolve();
      }, 1000);
    });
  };

  return (

    
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Datos Generales</h2>
        <p className={styles.subtitle}>
          Actualiza tu información administrativa y de contacto
        </p>
      </div>

      <GeneralDataForm
        initialData={generalData}
        onSave={handleSave}
      />
    </div>
  );
};

export default GeneralDataPage;