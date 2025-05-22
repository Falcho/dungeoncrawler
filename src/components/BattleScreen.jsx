import React from "react";
import styles from "./BattleScreen.module.css";

const BattleScreen = ({ gameState, currentRoom, character, monster }) => {
  if (!character) {
    return <div className={styles.battleStage}>Loading...</div>;
  }
  return (
    <div className={styles.battleStage}>
      {/* Hero Section */}
      <div className={styles.heroBox}>
        <img
          src={character.spriteImage}
          alt={character.name}
          className={styles.hero}
        />
        <div className={styles.infoBox}>
          <div className={styles.name}>{character.name}</div>
          <div className={styles.level}>Lvl {character.level}</div>
          <div className={styles.health}>
            Health: {character.health} / {character.maxHealth ?? "??"}{" "}
          </div>
        </div>
      </div>

      <div>
        <h1>Current Room: {currentRoom?.name}</h1>
        <h2>Current State: {gameState}</h2>
        {gameState === "enterRoom" && (
        <p>{currentRoom?.description}</p>
        )}
        {gameState === "encounter" && (
        <p>{monster?.description}</p>
        )}
        {gameState === "battleChoice" && (
        <p>How do you want to handle this monster?</p>
        )}
      </div>

      {/* Monster Section */}
      <div className={styles.monsterBox}>
        <img
          src={monster.image}
          alt={monster.name}
          className={styles.monster}
        />
        <div className={styles.infoBox}>
          <div className={styles.name}>{monster.name}</div>
          <div className={styles.level}>Lvl {monster.level}</div>
          <div className={styles.health}>
            Health: {monster.health} / {monster.maxHealth ?? "??"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleScreen;
