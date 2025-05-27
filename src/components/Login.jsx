import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login({ login }) {
  const init = { username: "", password: "" };
  const navigate = useNavigate();
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
        <button
          className={styles.button}
          onClick={() => navigate("/register")}
          type="button"
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
}
export default Login;
