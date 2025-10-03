import React, { useState } from 'react';
import GeneralDataForm from '../Components/organisms/GeneralDataForm/GeneralDataForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';

const GeneralDataPage = () => {
  const [initialData] = useState({
    businessName: 'Materiales y Construcción SA de CV',
    address: 'Av. Principal 123, Col. Centro, CP 86000',
    phone: '9931234567',
    email: 'contacto@materiales.com'
  });

  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!data.businessName || !data.address || !data.phone || !data.email) {
      setToast({ message: 'Todos los campos son obligatorios', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setToast({ message: 'Correo electrónico inválido', type: 'error' });
      return;
    }

    if (window.confirm('¿Está seguro de guardar los cambios?')) {
      setLoading(true);
      setTimeout(() => {
        setToast({ message: 'Datos actualizados correctamente', type: 'success' });
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="p-6">
      <GeneralDataForm
        data={data}
        onChange={handleChange}
        onSave={handleSave}
        hasChanges={hasChanges}
        loading={loading}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default GeneralDataPage;
