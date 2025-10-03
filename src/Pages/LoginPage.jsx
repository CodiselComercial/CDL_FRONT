import React from 'react';
import LoginForm from '../Components/organisms/LoginForm/Loginform';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-page-container">
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;