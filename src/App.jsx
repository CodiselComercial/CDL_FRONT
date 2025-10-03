import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import PriceListPage from './Pages/PriceListPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/precios" element={<PriceListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
