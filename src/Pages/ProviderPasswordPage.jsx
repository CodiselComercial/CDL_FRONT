import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import ProviderPasswordForm from '../Components/molecules/ProviderPasswordForm/ProviderPasswordForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './ProviderPasswordPage.module.css';
import { changeProviderPassword } from '../services/api.js';

const ProviderPasswordPage = () => {
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSavePassword = async (passwordData) => {
    try {
      let token = localStorage.getItem('jwtToken');
      
      if (!token) {
        setToast({ 
          message: 'No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.', 
          type: 'error' 
        });
        return;
      }
      
      // Limpiar el token de espacios o caracteres extra
      token = token.trim();
      
      console.log('Token obtenido para cambio de contraseña:', token ? 'Token presente' : 'Token ausente');
      console.log('Token completo:', token);
      const userId = localStorage.getItem('userId');
      console.log('UserID desde localStorage:', userId);
      
      const response = await changeProviderPassword(token, passwordData);
      
      // Cerrar el modal inmediatamente
      setIsModalOpen(false);
      
      // Mostrar mensaje de éxito (usar el mensaje de la API si está disponible)
      const successMessage = response?.message || 
                            response?.mensaje || 
                            'Contraseña actualizada correctamente';
      
      setToast({ 
        message: successMessage, 
        type: 'success' 
      });
      
      return response; // Retornar la respuesta para que el formulario sepa que fue exitoso
    } catch (err) {
      console.error('Error al cambiar contraseña:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.mensaje ||
                          err.message || 
                          'Error al cambiar la contraseña. Verifica que la contraseña actual sea correcta.';
      setToast({ 
        message: errorMessage, 
        type: 'error' 
      });
      throw err; // Re-lanzar para que el formulario pueda manejar el error
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Lock className={styles.icon} size={32} />
            <h2 className={styles.title}>Cambiar Contraseña</h2>
          </div>
          <p className={styles.subtitle}>
            Actualiza tu contraseña para mantener tu cuenta segura
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.description}>
              Por seguridad, ingresa tu contraseña actual y luego tu nueva contraseña.
              Asegúrate de usar una contraseña segura que no hayas usado anteriormente.
            </p>
            <button 
              onClick={handleOpenModal}
              className={styles.changePasswordButton}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Cambiar Contraseña"
          size="medium"
        >
          <ProviderPasswordForm
            onSave={handleSavePassword}
            onCancel={handleCloseModal}
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

export default ProviderPasswordPage;

