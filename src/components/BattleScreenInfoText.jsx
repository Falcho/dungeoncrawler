import React from "react";
import styles from "./BattleScreenInfoText.module.css";

const BattleScreenInfoText = ({ gameState, dungeon, currentRoom, loot, character, monster }) => (
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
        <h1>{dungeon?.name}</h1>
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
        {character?.health > 0 && (
          <p>You won the battle! {monster?.name} was defeated!</p>
        )}
      </>
    )}
    {gameState === "loot" && (
      <>
        <h1>{currentRoom?.name}</h1>
        {loot && <p>You found {loot}</p>}
      </>
    )}
    {gameState === "continueOrHome" && (
      <>
        <h1>{currentRoom?.name}</h1>
        <p>Push on, or go home and rest?</p>
      </>
    )}
  </div>
);

export default BattleScreenInfoText;