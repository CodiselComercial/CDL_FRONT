import React, { useState, useEffect } from 'react';
import { Building2, Import } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import AddButton from '../Components/atoms/AddButton/AddButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import ProviderForm from '../Components/molecules/ProviderForm/ProviderForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './ProviderCrudPage.module.css';
import SyncButton from '../Components/atoms/SyncButton/SyncButton.jsx';
import { getProviderList, addProvider, editProvider, deleteProvider, syncProviders  } from '../services/api.js';

const ProviderCrudPage = () => {

  const [providers, setProviders] = useState([]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncResult, setSyncResult] = useState(null);


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const data = await getProviderList(token, 1, 0); // puedes ajustar paginación

        const mapped = data.map(p => ({
          id: p.id,
          company: p.empresa || p.nombre || 'Proveedor sin nombre',
          representative: p.representante || '',
          email: p.email || '',
          phone: p.telefono || '',
          address: p.direccion || '',
        }));

        setProviders(mapped);
      } catch (err) {
        console.error('Error al cargar proveedores:', err);
        setToast({ message: 'Error al cargar proveedores', type: 'error' });
      }
    };

    fetchProviders();
  }, []);


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

  const handleDeleteProvider = async (providerId) => {
    if (window.confirm('¿Estás segura de que quieres eliminar este proveedor?')) {
      try {
        const token = localStorage.getItem('jwtToken');
        await deleteProvider(token, providerId);

        setProviders(prev => prev.filter(p => p.id !== providerId));
        setToast({ message: 'Proveedor eliminado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al eliminar proveedor', type: 'error' });
      }
    }
  };


  const handleSaveProvider = async (formData) => {
    const token = localStorage.getItem('jwtToken');

    if (editingProvider) {
      // Editar proveedor en el backend
      try {
        const payload = {
          id: editingProvider.id,
          codigo: formData.codigo || editingProvider.codigo || `PROV-${editingProvider.id}`,
          nombre: formData.company || formData.nombre || editingProvider.company,
        };

        await editProvider(token, editingProvider.id, payload);

        setProviders(prev => prev.map(p =>
          p.id === editingProvider.id ? { ...p, ...formData } : p
        ));
        setToast({ message: 'Proveedor actualizado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al actualizar proveedor', type: 'error' });
      }
    } else {
      // Crear nuevo proveedor en el backend
      try {
        const payload = {
          codigo: formData.codigo || `PROV-${Date.now()}`,
          nombre: formData.company || formData.nombre || 'Proveedor sin nombre',
        };

        await addProvider(token, payload);

        const newProvider = {
          id: Date.now(), // temporal para frontend
          ...formData,
        };

        setProviders(prev => [...prev, newProvider]);
        setToast({ message: 'Proveedor creado correctamente', type: 'success' });
      } catch (err) {
        setToast({ message: 'Error al crear proveedor', type: 'error' });
      }
    }

    setIsModalOpen(false);
    setEditingProvider(null);
  };


  const handleSyncProviders = async () => {
  setIsSyncing(true); 

  try {
    const token = localStorage.getItem('jwtToken');
    const result = await syncProviders(token);
    setSyncResult(result);
    setSyncModalOpen(true); 
  } catch (err) {
    setToast({ message: 'Error al sincronizar proveedores', type: 'error' });
  } finally {
    setIsSyncing(false); 
  }
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


          <SyncButton onClick={handleSyncProviders}>
            Sincronizar Proveedores
          </SyncButton>

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

        <Modal
  isOpen={isSyncing}
  onClose={() => {}}
  title="Sincronizando proveedores..."
  size="small"
>
  <div style={{ padding: '1rem', textAlign: 'center' }}>
    <p>Estamos sincronizando los proveedores con el sistema...</p>
    <div className={styles.spinner} />
  </div>
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

export default ProviderCrudPage;
