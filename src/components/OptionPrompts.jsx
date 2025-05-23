import React from "react";
import styles from "./OptionPrompts.module.css";
import Button from "./Button";

const OptionPrompts = ({ gameState, currentRoom, handleAction, character }) => (
  <div className={styles.promptsContainer}>
    {gameState === "barracks" && (
      <>
        <Button
          buttonText="Adventure"
          onclick={() => handleAction("ADVENTURE")}
          disabled={character?.health <= 0}
        />
        <Button buttonText="Sleep" onclick={() => handleAction("SLEEP")} />
      </>
    )}
    {gameState === "sleeping" && (
      <Button buttonText="Wake Up" onclick={() => handleAction("WAKE_UP")} />
    )}
    {(gameState === "enterRoom" || gameState === "startAdventure") && (
      <Button buttonText="Continue" onclick={() => handleAction()} />
    )}
    {gameState === "encounter" && (
      <>
        <Button buttonText="Continue" onclick={() => handleAction("CONTINUE")} />
      </>
    )}
    {gameState === "resolveEvent" && (
      <Button buttonText="Resolve" onclick={() => handleAction("RESOLVE")} />
    )}
    {gameState === "battleChoice" && (
      <>
        <Button buttonText="Flee" onclick={() => handleAction("FLEE")} />
        <Button buttonText="Use Item" onclick={() => handleAction("USE_ITEM")} disabled />
        <Button buttonText="Fight" onclick={() => handleAction("FIGHT")} />
      </>
    )}
    {gameState === "autoBattle" && (
      <Button buttonText="Auto Battle" onclick={() => handleAction()} />
    )}
    {gameState === "battleOutcome" && (
      <>
        <Button buttonText="Continue" onclick={() => handleAction()} />
      </>
    )}
    {gameState === "loot" && (
      <Button buttonText="Get Loot" onclick={() => handleAction()} />
    )}
    {gameState === "continueOrHome" && (
      <>
        <Button
          buttonText="Continue"
          onclick={() =>
            handleAction("CONTINUE", currentRoom.exits[0].roomId || 0)
          }
          disabled={currentRoom.exits.length === 0}
        />
        <Button buttonText="Go Home" onclick={() => handleAction("GO_HOME")} />
      </>
    )}
  </div>
);

export default OptionPrompts;
