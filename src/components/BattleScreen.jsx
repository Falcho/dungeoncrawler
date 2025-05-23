import React, { useState, useEffect } from "react";
import styles from "./BattleScreen.module.css";
import barracksImg from "../assets/select-background1.png";

const BattleScreen = ({
  gameState,
  currentRoom,
  character,
  monster,
  dungeon,
  loot,
}) => {
  const [bgImg, setBgImg] = useState(barracksImg);

  useEffect(() => {
    if (gameState === "enterRoom" || gameState === "startAdventure") {
      setBgImg(currentRoom?.image);
    } else if (gameState === "barracks") {
      setBgImg(barracksImg);
    }
  }, [gameState, currentRoom]);

  if (!character) {
    return <div className={styles.battleStage}>Loading...</div>;
  }
  return (
    <div
      className={styles.battleStage}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
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

      <div className={styles.infoText}>
        {gameState === "barracks" && (
          <>
            <h1>Barracks</h1>
            <p>This is your barracks, rest up or go on an adventure.</p>
          </>
        )}
        {gameState === "sleeping" && <p>zzz ZZZ zzz ZZZ zzz ZZZ.</p>}
        {gameState === "startAdventure" && (
          <>
            <h1> {dungeon?.name}</h1>
            <p>{dungeon?.description}</p>
          </>
        )}
        {gameState === "enterRoom" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>
          </>
        )}
        {gameState === "encounter" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>
          </>
        )}
        {gameState === "resolveEvent" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>
          </>
        )}
        {gameState === "battleChoice" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>
            {monster && (
              <p>
                You encounter a {monster.name} (Lvl {monster.level})!
              </p>
            )}
            {!monster && <p>You are alone in this room.</p>}
          </>
        )}
        {gameState === "autoBattle" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>

            <p>You fight the {monster?.name}!</p>
          </>
        )}
        {gameState === "battleOutcome" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>{currentRoom?.description}</p>
            {character?.health <= 0 && <p>You died!</p>}
            {character?.health > 0 && <p>You won the battle! {monster?.name} was defeated!</p>}
          </>
        )}
        {gameState === "loot" && (
          <>
            <h1>{currentRoom?.name}</h1>
            {loot && (
              <p>You found {loot}</p>
            )}
          </>
        )}
        {gameState === "continueOrHome" && (
          <>
            <h1>{currentRoom?.name}</h1>
            <p>Push on, or go home and rest?</p>
          </>
        )}
      </div>

      {/* Monster Section */}
      {(gameState === "encounter" ||
        gameState === "battleChoice" ||
        gameState === "autoBattle" ||
        gameState === "battleOutcome") &&
        monster && (
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
        )}
    </div>
  );
};

export default BattleScreen;
