import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import AddButton from '../Components/atoms/AddButton/AddButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import ProviderForm from '../Components/molecules/ProviderForm/ProviderForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './ProviderCrudPage.module.css';

const ProviderCrudPage = () => {
  const [providers, setProviders] = useState([
    {
      id: 1,
      company: 'Constructora ABC S.A. de C.V.',
      representative: 'Juan Pérez',
      email: 'juan@constructoraabc.com',
      phone: '+52 55 1234 5678',
      address: 'Av. Reforma 123, Col. Centro, CDMX'
    },
    {
      id: 2,
      company: 'Materiales XYZ',
      representative: 'María García',
      email: 'maria@materialesxyz.com',
      phone: '+52 55 9876 5432',
      address: 'Calle Principal 456, Col. Norte, CDMX'
    },
    {
      id: 3,
      company: 'Aceros del Norte',
      representative: 'Carlos López',
      email: 'carlos@acerosnorte.com',
      phone: '+52 55 5555 1234',
      address: 'Blvd. Industrial 789, Zona Industrial, CDMX'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAddProvider = () => {
    setEditingProvider(null);
    setIsModalOpen(true);
  };

  const handleEditProvider = (provider) => {
    setEditingProvider(provider);
    setIsModalOpen(true);
  };

  const handleDeleteProvider = (providerId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      setProviders(prev => prev.filter(p => p.id !== providerId));
      setToast({ message: 'Proveedor eliminado correctamente', type: 'success' });
    }
  };

  const handleSaveProvider = (formData) => {
    if (editingProvider) {
      // Editar proveedor existente
      setProviders(prev => prev.map(p => 
        p.id === editingProvider.id 
          ? { ...p, ...formData }
          : p
      ));
      setToast({ message: 'Proveedor actualizado correctamente', type: 'success' });
    } else {
      // Crear nuevo proveedor
      const newProvider = {
        id: Date.now(), // ID temporal
        ...formData
      };
      setProviders(prev => [...prev, newProvider]);
      setToast({ message: 'Proveedor creado correctamente', type: 'success' });
    }
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProvider(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Building2 className={styles.icon} size={32} />
            <h2 className={styles.title}>CRUD de Proveedores</h2>
          </div>
          <p className={styles.subtitle}>
            Administra los proveedores registrados en el sistema
          </p>
        </div>

        <div className={styles.actionsBar}>
          <AddButton onClick={handleAddProvider}>
            Agregar Proveedor
          </AddButton>
        </div>

        <div className={styles.providersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Empresa</div>
            <div className={styles.headerCell}>Representante</div>
            <div className={styles.headerCell}>Contacto</div>
            <div className={styles.headerCell}>Acciones</div>
          </div>
          <div className={styles.tableBody}>
            {providers.map((provider) => (
              <div key={provider.id} className={styles.providerRow}>
                <div className={styles.companyInfo}>
                  <div className={styles.companyName}>{provider.company}</div>
                  <div className={styles.companyAddress}>{provider.address}</div>
                </div>
                <div className={styles.representative}>{provider.representative}</div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <strong>Email:</strong> {provider.email}
                  </div>
                  <div className={styles.contactItem}>
                    <strong>Tel:</strong> {provider.phone}
                  </div>
                </div>
                <div className={styles.actions}>
                  <ActionButton
                    type="edit"
                    onClick={() => handleEditProvider(provider)}
                    size="small"
                  />
                  <ActionButton
                    type="delete"
                    onClick={() => handleDeleteProvider(provider.id)}
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {providers.length === 0 && (
          <div className={styles.emptyState}>
            <Building2 size={48} className={styles.emptyIcon} />
            <h3>No hay proveedores</h3>
            <p>Agrega tu primer proveedor para comenzar</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingProvider ? 'Editar Proveedor' : 'Agregar Proveedor'}
          size="medium"
        >
          <ProviderForm
            provider={editingProvider}
            onSave={handleSaveProvider}
            onCancel={handleCloseModal}
            isEditing={!!editingProvider}
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

export default ProviderCrudPage;
