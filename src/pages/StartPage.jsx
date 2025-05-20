import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartPage.module.css';

const StartPage = ({ onNewGame, onLoadSave }) => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    //onNewGame();
    navigate('/new-character');
  };

  const handleLoadSave = () => {
    onLoadSave();
    navigate('/game');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Dungeon Crawler</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleNewGame}>
          Start New Game
        </button>
        <button className={styles.button} onClick={handleLoadSave}>
          Load Save
        </button>
      </div>
    </div>
  );
};

export default StartPage;