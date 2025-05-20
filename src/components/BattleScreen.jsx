import React from 'react';
import styles from './BattleScreen.module.css';

const BattleScreen = ({ character, monster }) => (
  <div className={styles.container}>
    {/* Character Section */}
    <div className={styles.character}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.name}>{character.name}</div>
        <div className={styles.level}>Level: {character.level}</div>
      </div>
    </div>

    {/* Monster Section */}
    <div className={styles.monster}>
      <img
        src={monster.image}
        alt={monster.name}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.name}>{monster.name}</div>
        <div className={styles.level}>Level: {monster.level}</div>
      </div>
    </div>
  </div>
);

export default BattleScreen;