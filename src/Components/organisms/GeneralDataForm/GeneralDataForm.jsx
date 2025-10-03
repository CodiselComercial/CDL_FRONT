import React from 'react';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';

const GeneralDataForm = ({ data, onChange, onSave, hasChanges, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos Generales</h2>

      <FormField
        label="Razón Social"
        id="businessName"
        value={data.businessName}
        onChange={(e) => onChange('businessName', e.target.value)}
        required
      />

      <FormField
        label="Domicilio Fiscal"
        id="address"
        value={data.address}
        onChange={(e) => onChange('address', e.target.value)}
        required
      />

      <FormField
        label="Teléfono"
        id="phone"
        type="tel"
        value={data.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        required
      />

      <FormField
        label="Correo Electrónico"
        id="email"
        type="email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        required
      />

      <div className="flex justify-end gap-4 mt-6">
        <Button
          onClick={onSave}
          type="button"
          disabled={!hasChanges || loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  );
};

export default GeneralDataForm;
