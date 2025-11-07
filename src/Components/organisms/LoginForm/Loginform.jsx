import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../atoms/Title/Title';
import FormField from '../../molecules/Forms/Form';
import Button from '../../atoms/Button/Button';
import styles from './LoginForm.module.css';
import { login, getUserData } from '../../../services/api';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Autenticación
    const loginResponse = await login(credentials.username, credentials.password);
    console.log('Respuesta del login:', loginResponse);

    // Verifica si el token viene como JWT, token, o algo más
    const token = loginResponse.token || loginResponse.JWT || loginResponse.jwt || null;
    console.log('Token extraído:', token);

    if (!token) {
      setError('No se recibió token. Verifica credenciales o formato de respuesta.');
      setLoading(false);
      return;
    }

      localStorage.setItem('jwtToken', token);
   

    
      // Obtener datos del usuario
      const userData = await getUserData(token);
      console.log('Datos del usuario:', userData);
      const userRole = userData.perfil === 1 ? 'proveedor' : 'compras';

      // Navegar y pasar el rol al padre si aplica
      onLogin?.(userRole);
      navigate(`/${userRole}`);
    } catch (err) {
      console.error('Error en login o getUserData:', err);
      setError('Credenciales inválidas o error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.logoContainer}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/10871/10871903.png"
          //src="https://codisel.com.mx/wp-content/uploads/2019/02/logo-codisel-web-1.png" 
          alt="Logo de Codisel" 
          className={styles.logo}
        />
      </div>

      <Title text="Iniciar sesión" />

      <FormField
        label="Usuario"
        type="text"
        placeholder="Usuario"
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Acceder'}
      </Button>
    </form>
  );
};

export default LoginForm;
