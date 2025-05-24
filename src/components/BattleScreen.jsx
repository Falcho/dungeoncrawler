import React, { useState, useEffect } from "react";
import autoBattler from "../utils/autoBattler";
import styles from "./BattleScreen.module.css";
import barracksImg from "../assets/select-background1.png";
import BattleScreenInfoText from "./BattleScreenInfoText";

const FLOAT_DURATION = 2500;

const BattleScreen = ({
  gameState,
  currentRoom,
  character,
  monster,
  dungeon,
  loot,
  handleBattleResult,
  addToBattleLog,
}) => {
  const [bgImg, setBgImg] = useState(barracksImg);
  const [floatingNumbers, setFloatingNumbers] = useState([]);

  useEffect(() => {
    if (gameState === "enterRoom" || gameState === "startAdventure") {
      setBgImg(currentRoom?.image);
    } else if (gameState === "barracks") {
      setBgImg(barracksImg);
    }
  }, [gameState, currentRoom]);

  // Run autoBattler and show floating numbers
  useEffect(() => {
    if (
      gameState === "autoBattle" &&
      character &&
      monster &&
      handleBattleResult
    ) {
      // Clone hero and monster so we don't mutate props
      const heroCopy = { ...character };
      const monsterCopy = { ...monster };

      autoBattler(
        heroCopy,
        monsterCopy,
        addToBattleLog,
        ({ target, amount }) => {
          // Add a floating number
          setFloatingNumbers((nums) => [
            ...nums,
            { id: Math.random(), target, amount },
          ]);
        }
      );
      handleBattleResult(heroCopy);

      // Remove floating numbers after animation
      setTimeout(() => setFloatingNumbers([]), FLOAT_DURATION);
    }
  }, [gameState]);

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
        {floatingNumbers
          .filter((n) => n.target === "hero")
          .map((n) => (
            <span
              key={n.id}
              className={styles.floatingNumber}
              style={{
                left: "20%",
                top: "55%",
                animation: "floatInHero 1.2s cubic-bezier(.4,1.7,.5,.9) forwards",
              }}
            >
              -{n.amount}
            </span>
          ))}
      </div>


        <BattleScreenInfoText
          gameState={gameState}
          dungeon={dungeon}
          currentRoom={currentRoom}
          loot={loot}
          character={character}
          monster={monster}
        />

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
            {/* Floating number for monster */}
            {floatingNumbers
              .filter((n) => n.target === "monster")
              .map((n) => (
                <span
                  key={n.id}
                  className={styles.floatingNumber}
                  style={{
                    left: "80%",
                    top: "25%",
                    animation: "floatInMonster 1.2s cubic-bezier(.4,1.7,.5,.9) forwards",
                  }}
                >
                  -{n.amount}
                </span>
              ))}
          </div>
        )}
    </div>
  );
};

export default BattleScreen;
