import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import persistence from "../utils/persistence";
import startPageStyles from "./StartPage.module.css";
import styles from "../components/Login.module.css";

function Register() {
  const init = { username: "", password: "" };
  const navigate = useNavigate();
  const [registerCredentials, setRegisterCredentials] = useState(init);

  const performRegister = (evt) => {
    evt.preventDefault();
    persistence.register(
      registerCredentials.username,
      registerCredentials.password
    );
    navigate("/new-character");
  };

  const onChange = (evt) => {
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={startPageStyles.container}>
      <h1 className={startPageStyles.title}>Welcome to Dungeon Crawler</h1>
      <div className={styles.loginContainer}>
        <h2>Register</h2>
        <form onSubmit={performRegister}>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Username"
            id="username"
            onChange={onChange}
            value={registerCredentials.username}
          />
          <input
            className={styles.inputField}
            type="password"
            placeholder="Password"
            id="password"
            onChange={onChange}
            value={registerCredentials.password}
          />
          <button className={styles.button} type="submit">
            Register
          </button>
          <button
            className={styles.button}
            onClick={() => navigate("/")}
            type="button"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
