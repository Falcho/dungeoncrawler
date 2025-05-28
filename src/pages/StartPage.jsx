import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartPage.module.css";
import persistence from "../utils/persistence";
import Login from "../components/Login";

const StartPage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoggedIn(persistence.loggedIn());
  }, []);

  const handleNewGame = () => {
    navigate("/new-character");
  };

  const handleLoadSave = () => {
    navigate("/game");
  };

  const handleLogout = () => {
    persistence.logout();
    setLoggedIn(false);
  }

  const performLogin = (user, pass) => {
    setError(""); 
    persistence.login(user, pass).then(() => setLoggedIn(true)).catch((err) => {
      if (err.status===401) {
        setError("Invalid username or password");
      }
      else {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Dungeon Crawler</h1>
      {error && <div className={styles.error}>{error}</div>}
      {!loggedIn ? (
        <Login login={performLogin} error={error}/>
      ) : (
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleNewGame}>
            Start New Game
          </button>
          <button className={styles.button} onClick={handleLoadSave}>
            Load Save
          </button>
          <button className={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default StartPage;
