import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartPage.module.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (onLogin(email, password)) {
      navigate('/start');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
        <button className={styles.button} onClick={handleRegisterRedirect}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;