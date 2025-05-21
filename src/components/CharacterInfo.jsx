import React from 'react';
import styles from './CharacterInfo.module.css';

const CharacterInfo = ({ name, heroClass, level, gold }) => (
  <div className={styles.characterInfoContainer}>
    <div className={styles.info}>Name: {name}</div>
    <div className={styles.info}>Class: {heroClass}</div>
    <div className={styles.info}>Level: {level}</div>
    <div className={`${styles.info} ${styles.gold}`}>Gold: {gold}</div>
  </div>
);

export default CharacterInfo;