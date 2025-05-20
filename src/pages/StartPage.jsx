import React from 'react';
import styles from './StartPage.module.css';

const StartPage = ({ onNewGame, onLoadSave }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Dungeon Crawler</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onNewGame}>
          Start New Game
        </button>
        <button className={styles.button} onClick={onLoadSave}>
          Load Save
        </button>
      </div>
    </div>
  );
};

export default StartPage;