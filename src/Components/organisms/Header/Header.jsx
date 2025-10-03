import React from 'react';
import { LogOut } from 'lucide-react';
import Button from '../../atoms/Button/Button';

const Header = ({ currentView, onViewChange, onLogout }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portal del Proveedor</h1>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('prices')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentView === 'prices' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Lista de Precios
          </button>
          <button
            onClick={() => onViewChange('general')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentView === 'general' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            Datos Generales
          </button>
          <Button onClick={onLogout} type="button">
            <div className="flex items-center gap-2">
              <LogOut size={18} />
              Salir
            </div>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
