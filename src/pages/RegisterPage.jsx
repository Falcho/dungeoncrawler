import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartPage.module.css';

const RegisterPage = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onRegister(email, password);
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;