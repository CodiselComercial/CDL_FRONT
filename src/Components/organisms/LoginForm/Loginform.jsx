import React, { useState } from 'react';
import Title from '../../atoms/Title/Title';
import FormField from '../../molecules/Forms/Form';
import Button from '../../atoms/Button/Button';
import styles from '../LoginForm/Loginform.module.css';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', credentials);
    
    // Simular autenticación con roles
    let userRole = 'proveedor'; // Por defecto
    if (credentials.username.includes('compras') || credentials.username.includes('admin')) {
      userRole = 'compras';
    }
    
    alert(`Bienvenido, ${credentials.username}! Rol: ${userRole}`);
    onLogin(userRole); // 👈 Pasa el rol al padre
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.logoContainer}>
        <img 
          src="https://codisel.com.mx/wp-content/uploads/2019/02/logo-codisel-web-1.png" 
          alt="Logo de Codisel" 
          className={styles.logo}
        />
      </div>

      <FormField
        label="Correo electrónico" 
        type="email"
        placeholder="Correo electrónico"
        name="username" 
        value={credentials.username}
        onChange={handleChange}
      />
      <FormField
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button type="submit">Acceder</Button>
    </form>
  );
};

export default LoginForm;
