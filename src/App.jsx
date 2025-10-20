import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Components/templates/Dashboard/Dashboard.jsx';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Dashboard userRole={userRole} onLogout={handleLogout} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard userRole={userRole} onLogout={handleLogout} />} 
        />
        <Route 
          path="/proveedor" 
          element={<Dashboard userRole="proveedor" onLogout={handleLogout} />} 
        />
        <Route 
          path="/compras" 
          element={<Dashboard userRole="compras" onLogout={handleLogout} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
