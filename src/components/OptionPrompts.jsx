import React from 'react';
import styles from './OptionPrompts.module.css';

const OptionPrompts = ({ onFight, onFlee, onKickDoor, onLookForTrouble }) => (
  <div className={styles.container}>
    <button className={styles.button} onClick={onFight}>
      Fight
    </button>
    <button className={styles.button} onClick={onFlee}>
      Flee
    </button>
    <button className={styles.button} onClick={onKickDoor}>
      Kick in the Door
    </button>
    <button className={styles.button} onClick={onLookForTrouble}>
      Look for Trouble
    </button>
  </div>
);

export default OptionPrompts;