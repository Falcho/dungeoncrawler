import React from "react";
import styles from "./OptionPrompts.module.css";
import Button from "./Button";

const OptionPrompts = ({ gameState, currentRoom, handleAction, character }) => (
  <div className={styles.promptsContainer}>
    {gameState === "barracks" && (
      <>
        <Button
          buttonText="Adventure"
          onClick={() => handleAction("ADVENTURE")}
          disabled={character?.health <= 1}
        />
        <Button buttonText="Sleep" onClick={() => handleAction("SLEEP")} />
      </>
    )}
    {gameState === "sleeping" && (
      <Button buttonText="Wake Up" onClick={() => handleAction("WAKE_UP")} />
    )}
    {(gameState === "enterRoom" || gameState === "startAdventure") && (
      <Button buttonText="Continue" onClick={() => handleAction()} />
    )}
    {gameState === "encounter" && (
      <>
        <Button buttonText="Continue" onClick={() => handleAction("CONTINUE")} />
      </>
    )}
    {gameState === "resolveEvent" && (
      <Button buttonText="Resolve" onClick={() => handleAction("RESOLVE")} />
    )}
    {gameState === "battleChoice" && (
      <>
        <Button buttonText="Flee" onClick={() => handleAction("FLEE")} />
        <Button buttonText="Use Item" onClick={() => handleAction("USE_ITEM")} disabled />
        <Button buttonText="Fight" onClick={() => handleAction("FIGHT")} />
      </>
    )}
    {gameState === "autoBattle" && (
      <Button buttonText="Auto Battle" onClick={() => handleAction()} />
    )}
    {gameState === "battleOutcome" && (
      <>
        <Button buttonText="Continue" onClick={() => handleAction()} />
      </>
    )}
    {gameState === "loot" && (
      <Button buttonText="Get Loot" onClick={() => handleAction()} />
    )}
    {gameState === "continueOrHome" && (
      <>
        <Button
          buttonText="Continue"
          onClick={() =>
            handleAction("CONTINUE", currentRoom.exits[0].roomId || 0)
          }
          disabled={currentRoom.exits.length === 0}
        />
        <Button buttonText="Go Home" onClick={() => handleAction("GO_HOME")} />
      </>
    )}
  </div>
);

export default OptionPrompts;
