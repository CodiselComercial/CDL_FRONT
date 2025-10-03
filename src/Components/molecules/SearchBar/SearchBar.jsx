import React from 'react';
import { Search } from 'lucide-react';
import Input from '../../atoms/InputMain/InputMain.jsx';

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }) => (
  <div className="relative w-full">
    <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-12 w-full text-base"
    />
  </div>
);

export default SearchBar;
