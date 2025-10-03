import React, { useState } from 'react';
import Title from '../../atoms/Title/Title';
import FormField from '../../molecules/Forms/Form';
import Button from '../../atoms/Button/Button';
import styles from '../LoginForm/Loginform.module.css';

const LoginForm = () => {
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
    // Enviar datos a un servidor
    console.log('Datos enviados:', credentials);
    alert(`Bienvenido, ${credentials.username}!`);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <Title text="Iniciar Sesión" />
      <FormField
        label="Usuario"
        type="text"
        placeholder="ej. juanperez"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <FormField
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <Button type="submit">Ingresar</Button>
    </form>
  );
};

export default LoginForm;