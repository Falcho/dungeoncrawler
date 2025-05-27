import React, { useState } from 'react';
import styles from './Login.module.css';

function Login ({ login }) {
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Username"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;

